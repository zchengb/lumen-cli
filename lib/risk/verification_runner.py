from __future__ import annotations

import json
import os
import subprocess
import uuid
from pathlib import Path
from typing import Any, Optional

from risk.store import RiskStore, utc_now
from risk.verification import (
    apply_verification_receipt,
    display_status,
    finding_observed_in_scan_result,
    is_verification_scan,
)


def build_verification_scope(finding: dict[str, Any]) -> dict[str, Any]:
    return {
        "finding_id": str(finding.get("id") or ""),
        "repositories": [str(finding.get("repository") or "").strip()] if finding.get("repository") else [],
        "files": [],
        "detectors": [str(finding.get("category") or "default")],
        "fingerprint": str(finding.get("canonical_fingerprint") or ""),
        "remediation_after": str(finding.get("remediation_reported_at") or finding.get("owner_resolved_at") or ""),
        "original_scan_run_id": str(finding.get("last_seen_scan_run_id") or ""),
        "module": str(finding.get("module") or ""),
    }


def _coverage_ok(scope: dict[str, Any], scan: dict[str, Any]) -> bool:
    repos = {str(r).strip() for r in (scope.get("repositories") or []) if str(r).strip()}
    if not repos:
        return True
    covered: set[str] = set()
    for key in ("repositories", "repos", "scanned_repositories"):
        raw = scan.get(key)
        if isinstance(raw, list):
            covered.update(str(item).strip() for item in raw if str(item).strip())
    findings = scan.get("findings") if isinstance(scan.get("findings"), list) else []
    for item in findings:
        if isinstance(item, dict) and item.get("repository"):
            covered.add(str(item["repository"]).strip())
    coverage = scan.get("coverage") if isinstance(scan.get("coverage"), dict) else {}
    for item in coverage.get("repositories") or []:
        covered.add(str(item).strip())
    if scan.get("verification_scan") or is_verification_scan(scan):
        if not covered and repos:
            # dry verification scans may omit repo lists; accept detector flag
            return True
    return bool(repos & covered) or bool(scan.get("verification_scan"))


def create_verification_request(
    store: RiskStore,
    finding: dict[str, Any],
    *,
    actor: str = "",
    source_message_id: str = "",
    trace_id: str = "",
) -> dict[str, Any]:
    request_id = f"verify_req_{uuid.uuid4().hex[:16]}"
    scope = build_verification_scope(finding)
    when = utc_now()
    snapshot = {
        "status": finding.get("status"),
        "remediation_status": finding.get("remediation_status"),
        "verification_status": finding.get("verification_status"),
        "resolution_basis": finding.get("resolution_basis"),
        "remediation_reported_at": finding.get("remediation_reported_at"),
        "owner_resolved_at": finding.get("owner_resolved_at"),
    }
    store.execute(
        """
        INSERT INTO verification_request(
            id, finding_id, project_slug, requested_by, source_message_id, trace_id,
            requested_at, status, policy_json, scope_json, remediation_snapshot_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'queued', NULL, ?, ?)
        """,
        (
            request_id,
            str(finding.get("id") or ""),
            str(finding.get("project_slug") or ""),
            actor or None,
            source_message_id or None,
            trace_id or None,
            when,
            json.dumps(scope, ensure_ascii=False),
            json.dumps(snapshot, ensure_ascii=False),
        ),
    )
    store.commit()
    return {"request_id": request_id, "scope": scope, "requested_at": when}


def _run_verification_scan(workspace: Path, finding_id: str, *, force_observed: bool = False) -> tuple[Optional[Path], Optional[dict[str, Any]], str]:
    env = os.environ.copy()
    env["LUMEN_DRY_RUN"] = "1"
    env["LUMEN_VERIFICATION_FINDING"] = finding_id
    env["LUMEN_VERIFICATION_SCAN"] = "1"
    if force_observed:
        env["LUMEN_VERIFY_FORCE_OBSERVED"] = "1"
    else:
        env.pop("LUMEN_VERIFY_FORCE_OBSERVED", None)
    lib = Path(__file__).resolve().parents[1] / "scripts"
    dry = lib / "dry_run_scan.py"
    run_id = f"verify-{utc_now().replace(':', '').replace('-', '')[:15]}"
    completed = subprocess.run(
        ["python3", str(dry), str(workspace), run_id],
        capture_output=True,
        text=True,
        env=env,
        check=False,
    )
    if completed.returncode != 0:
        return None, None, completed.stderr.strip() or completed.stdout.strip() or "dry verification failed"
    results = workspace / "results"
    candidates = sorted(results.glob("**/scan-result.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not candidates:
        return None, None, "verification scan result missing"
    path = candidates[0]
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        return path, None, str(exc)
    if not isinstance(data, dict):
        return path, None, "invalid verification scan payload"
    data["verification_scan"] = True
    data["scan_mode"] = "verification"
    data.setdefault("run_id", run_id)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return path, data, ""


def run_verification(
    store: RiskStore,
    workspace: Path,
    finding_id: str,
    *,
    actor: str = "",
    source_message_id: str = "",
    trace_id: str = "",
    force_observed: bool = False,
) -> dict[str, Any]:
    row = store.get_finding(finding_id)
    if row is None:
        return {"status": "not_found", "code": "FINDING_NOT_FOUND", "finding_id": finding_id}
    finding = dict(row)
    rem = str(finding.get("remediation_status") or "").lower()
    ver = str(finding.get("verification_status") or "").lower()
    status = str(finding.get("status") or "")
    if rem != "remediated" and ver != "pending_verification" and status != "Resolved":
        return {
            "status": "error",
            "code": "NOT_READY_FOR_VERIFICATION",
            "message": "Finding must be remediated, pending verification, or owner-resolved first",
            "finding_id": finding_id,
            "display_status": display_status(finding),
        }

    created = create_verification_request(
        store,
        finding,
        actor=actor,
        source_message_id=source_message_id,
        trace_id=trace_id,
    )
    request_id = created["request_id"]
    scope = created["scope"]
    started = utc_now()
    store.execute(
        "UPDATE verification_request SET status = 'running' WHERE id = ?",
        (request_id,),
    )
    store.commit()

    path, scan, err = _run_verification_scan(workspace, finding_id, force_observed=force_observed)
    run_id = f"verify_run_{uuid.uuid4().hex[:12]}"
    if scan is None:
        store.execute(
            """
            INSERT INTO verification_run(
                id, request_id, finding_id, scan_run_id, detector, started_at, completed_at,
                result, observed, coverage_json, evidence_json, result_path, error_code
            ) VALUES (?, ?, ?, NULL, NULL, ?, ?, 'runner_failed', NULL, NULL, NULL, ?, ?)
            """,
            (run_id, request_id, finding_id, started, utc_now(), str(path) if path else None, err[:300]),
        )
        store.execute("UPDATE verification_request SET status = 'failed' WHERE id = ?", (request_id,))
        store.commit()
        return {
            "status": "runner_failed",
            "code": "VERIFICATION_RUNNER_FAILED",
            "message": err or "verification runner failed",
            "request_id": request_id,
            "verification_run_id": run_id,
            "finding_id": finding_id,
        }

    remediated_at = str(finding.get("remediation_reported_at") or finding.get("owner_resolved_at") or "")
    completed_at = str(scan.get("finished_at") or scan.get("completed_at") or utc_now())
    scan_run_id = str(scan.get("run_id") or scan.get("scan_run_id") or run_id)
    fresh = True
    if remediated_at and completed_at and completed_at < remediated_at:
        fresh = False
    covered = _coverage_ok(scope, scan)
    observed = finding_observed_in_scan_result(scan, finding)

    if not fresh or not covered:
        result = "inconclusive"
    elif observed:
        result = "verification_failed"
    else:
        result = "verified_clean"

    coverage = {
        "repositories": scope.get("repositories") or [],
        "files": scope.get("files") or [],
        "detectors": scope.get("detectors") or [],
        "fresh": fresh,
        "covered": covered,
    }
    applied = apply_verification_receipt(
        store,
        finding_id,
        result=result,
        observed=observed if result != "inconclusive" else None,
        scan_run_id=scan_run_id,
        coverage=coverage,
        evidence=[],
        actor=actor or "verification-runner",
        source_message_id=source_message_id,
        trace_id=trace_id,
        occurred_at=completed_at,
    )
    store.execute(
        """
        INSERT INTO verification_run(
            id, request_id, finding_id, scan_run_id, detector, started_at, completed_at,
            result, observed, coverage_json, evidence_json, result_path, error_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
        """,
        (
            run_id,
            request_id,
            finding_id,
            scan_run_id,
            ",".join(scope.get("detectors") or []),
            started,
            completed_at,
            result,
            None if result == "inconclusive" else (1 if observed else 0),
            json.dumps(coverage, ensure_ascii=False),
            json.dumps([], ensure_ascii=False),
            str(path) if path else None,
        ),
    )
    store.execute("UPDATE verification_request SET status = 'completed' WHERE id = ?", (request_id,))
    store.commit()
    receipt = {
        "request_id": request_id,
        "verification_run_id": run_id,
        "scan_run_id": scan_run_id,
        "finding_id": finding_id,
        "result": result,
        "observed": None if result == "inconclusive" else observed,
        "coverage": coverage,
        "evidence": [],
        "started_at": started,
        "completed_at": completed_at,
        "result_path": str(path) if path else None,
    }
    out = dict(applied)
    out["request_id"] = request_id
    out["verification_run_id"] = run_id
    out["receipt"] = receipt
    return out
