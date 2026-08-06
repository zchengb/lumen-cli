from __future__ import annotations

import json
from typing import Any, Optional

from risk.models import STATUS_IGNORED, STATUS_OPEN, STATUS_REOPENED, STATUS_RESOLVED
from risk.store import RiskStore, utc_now


def display_status(finding: dict[str, Any] | Any) -> str:
    row = dict(finding) if finding is not None else {}
    status = str(row.get("status") or "").strip()
    remediation = str(row.get("remediation_status") or "none").strip().lower()
    verification = str(row.get("verification_status") or "").strip().lower()
    basis = str(row.get("resolution_basis") or "").strip().lower()
    if status == STATUS_IGNORED:
        return "Ignored"
    if status == STATUS_REOPENED and verification == "verification_failed":
        return "Reopened · Verification failed"
    if status == STATUS_REOPENED:
        return "Reopened"
    if status == STATUS_RESOLVED and verification == "verified_clean":
        return "Resolved · Verified clean"
    if status == STATUS_RESOLVED and basis == "policy_override":
        return "Resolved · Policy override"
    if status == STATUS_RESOLVED and basis in {"user_confirmed", "owner_confirmed"}:
        label = "User confirmed" if basis == "user_confirmed" else "Owner confirmed"
        return f"Resolved · {label}"
    if status == STATUS_RESOLVED:
        return "Resolved"
    if remediation == "remediated" and verification == "pending_verification":
        return "Remediated · Pending verification"
    if verification == "verification_failed":
        return "Verification failed · Open"
    if status == STATUS_OPEN or not status:
        return "Open"
    return status or "Open"


def mark_remediated(
    store: RiskStore,
    finding_id: str,
    *,
    actor: str = "",
    reason: str = "",
    source_message_id: str = "",
    trace_id: str = "",
    occurred_at: str = "",
) -> dict[str, Any]:
    row = store.get_finding(finding_id)
    if row is None:
        return {"status": "not_found", "code": "FINDING_NOT_FOUND", "finding_id": finding_id}

    data = dict(row)
    if str(data.get("status") or "") == STATUS_RESOLVED:
        return {
            "status": "error",
            "code": "ALREADY_RESOLVED",
            "message": "Finding is already Resolved; do not mark remediated",
            "finding_id": finding_id,
            "display_status": display_status(data),
        }

    source = str(source_message_id or "").strip()
    if source:
        existing = store.fetchone(
            """
            SELECT 1 FROM finding_event
            WHERE finding_id = ?
              AND event_type = 'remediation_reported'
              AND (
                idempotency_key = ?
                OR source_message_id = ?
                OR reason LIKE ?
              )
            LIMIT 1
            """,
            (finding_id, f"remediate:{source}", source, f"%source_message_id={source}%"),
        )
        if existing is not None:
            refreshed = store.get_finding(finding_id)
            payload = dict(refreshed) if refreshed is not None else data
            return {
                "status": "ok",
                "idempotent": True,
                "finding_id": finding_id,
                "remediation_status": str(payload.get("remediation_status") or "remediated"),
                "verification_status": str(payload.get("verification_status") or "pending_verification"),
                "finding_status": str(payload.get("status") or STATUS_OPEN),
                "display_status": display_status(payload),
                "source_message_id": source,
                "trace_id": trace_id,
            }

    when = occurred_at or utc_now()
    store.execute(
        """
        UPDATE finding SET remediation_status = 'remediated',
            verification_status = 'pending_verification',
            remediation_reported_at = ?
        WHERE id = ?
        """,
        (when, finding_id),
    )
    store.insert_event(
        finding_id,
        "remediation_reported",
        previous_status=str(data.get("status")),
        new_status=str(data.get("status")),
        actor_type="user" if actor else "system",
        actor_id=actor or "risk-engine",
        reason=str(reason or "User reported the fix completed").strip(),
        occurred_at=when,
        source_message_id=source or None,
        trace_id=str(trace_id or "").strip() or None,
        idempotency_key=f"remediate:{source}" if source else None,
        metadata_json=json.dumps({"action": "mark_remediated"}, ensure_ascii=False),
    )
    store.commit()
    refreshed = store.get_finding(finding_id)
    payload = dict(refreshed) if refreshed is not None else data
    payload["remediation_status"] = "remediated"
    payload["verification_status"] = "pending_verification"
    return {
        "status": "ok",
        "idempotent": False,
        "finding_id": finding_id,
        "remediation_status": "remediated",
        "verification_status": "pending_verification",
        "finding_status": str(payload.get("status") or STATUS_OPEN),
        "display_status": display_status(payload),
        "actor": actor,
        "source_message_id": source,
        "trace_id": trace_id,
        "occurred_at": when,
    }


def apply_verification_receipt(
    store: RiskStore,
    finding_id: str,
    *,
    result: str,
    observed: bool | None = None,
    scan_run_id: str = "",
    coverage: Optional[dict[str, Any]] = None,
    evidence: Optional[list[Any]] = None,
    actor: str = "",
    source_message_id: str = "",
    trace_id: str = "",
    occurred_at: str = "",
) -> dict[str, Any]:
    row = store.get_finding(finding_id)
    if row is None:
        return {"status": "not_found", "code": "FINDING_NOT_FOUND", "finding_id": finding_id}

    data = dict(row)
    when = occurred_at or utc_now()
    run_id = scan_run_id or f"verify-{finding_id}-{when.replace(':', '').replace('-', '')[:20]}"
    actor_id = actor or "verification-runner"
    outcome = str(result or "").strip().lower()
    if outcome not in {"verified_clean", "verification_failed", "inconclusive", "runner_failed"}:
        if observed is True:
            outcome = "verification_failed"
        elif observed is False:
            outcome = "verified_clean"
        else:
            outcome = "inconclusive"

    if outcome in {"inconclusive", "runner_failed"}:
        store.execute(
            """
            UPDATE finding SET verification_status = 'pending_verification',
                last_verified_at = ?, last_verification_run_id = ?
            WHERE id = ?
            """,
            (when, run_id, finding_id),
        )
        store.insert_event(
            finding_id,
            "verification_inconclusive" if outcome == "inconclusive" else "verification_runner_failed",
            previous_status=str(data.get("status")),
            new_status=str(data.get("status")),
            actor_type="system",
            actor_id=actor_id,
            reason=outcome,
            occurred_at=when,
            source_message_id=source_message_id or None,
            trace_id=trace_id or None,
            metadata_json=json.dumps({"coverage": coverage or {}, "evidence": evidence or []}, ensure_ascii=False),
        )
        store.commit()
        refreshed = store.get_finding(finding_id)
        payload = dict(refreshed) if refreshed is not None else data
        return {
            "status": outcome,
            "finding_id": finding_id,
            "scan_run_id": run_id,
            "observed": None,
            "coverage": coverage or {},
            "evidence": evidence or [],
            "finding_status": str(payload.get("status") or ""),
            "verification_status": "pending_verification",
            "display_status": display_status(payload),
            "completed_at": when,
        }

    if outcome == "verification_failed":
        previous = str(data.get("status") or STATUS_OPEN)
        next_status = STATUS_REOPENED if previous == STATUS_RESOLVED else previous
        if next_status not in {STATUS_OPEN, STATUS_REOPENED}:
            next_status = STATUS_OPEN
        store.execute(
            """
            UPDATE finding SET status = ?,
                verification_status = 'verification_failed',
                resolved_at = CASE WHEN ? = ? THEN NULL ELSE resolved_at END,
                reopened_count = CASE WHEN ? = ? THEN reopened_count + 1 ELSE reopened_count END,
                recurrence_count = CASE WHEN ? = ? THEN recurrence_count + 1 ELSE recurrence_count END,
                last_verified_at = ?, last_verification_run_id = ?
            WHERE id = ?
            """,
            (
                next_status,
                previous,
                STATUS_RESOLVED,
                previous,
                STATUS_RESOLVED,
                previous,
                STATUS_RESOLVED,
                when,
                run_id,
                finding_id,
            ),
        )
        store.insert_event(
            finding_id,
            "verification_failed",
            previous_status=previous,
            new_status=next_status,
            actor_type="system",
            actor_id=actor_id,
            reason="verification scan still found the issue",
            occurred_at=when,
            source_message_id=source_message_id or None,
            trace_id=trace_id or None,
            metadata_json=json.dumps({"evidence": evidence or []}, ensure_ascii=False),
        )
        store.commit()
        refreshed = store.get_finding(finding_id)
        payload = dict(refreshed) if refreshed is not None else data
        payload["status"] = next_status
        payload["verification_status"] = "verification_failed"
        return {
            "status": "verification_failed",
            "finding_id": finding_id,
            "scan_run_id": run_id,
            "observed": True,
            "evidence": evidence or [],
            "finding_status": next_status,
            "verification_status": "verification_failed",
            "display_status": display_status(payload),
            "completed_at": when,
        }

    store.execute(
        """
        UPDATE finding SET status = ?, resolved_at = ?,
            verification_status = 'verified_clean', consecutive_seen_count = 0,
            resolution_basis = 'verified_clean',
            last_verified_at = ?, last_verification_run_id = ?
        WHERE id = ?
        """,
        (STATUS_RESOLVED, when, when, run_id, finding_id),
    )
    store.insert_event(
        finding_id,
        "resolved",
        previous_status=str(data.get("status")),
        new_status=STATUS_RESOLVED,
        actor_type="system",
        actor_id=actor_id,
        reason="verified clean by verification scan",
        occurred_at=when,
        source_message_id=source_message_id or None,
        trace_id=trace_id or None,
        metadata_json=json.dumps({"coverage": coverage or {}}, ensure_ascii=False),
    )
    store.commit()
    refreshed = store.get_finding(finding_id)
    payload = dict(refreshed) if refreshed is not None else data
    payload["status"] = STATUS_RESOLVED
    payload["verification_status"] = "verified_clean"
    payload["resolution_basis"] = "verified_clean"
    return {
        "status": "verified_clean",
        "finding_id": finding_id,
        "scan_run_id": run_id,
        "observed": False,
        "coverage": coverage or {"repositories": [], "files": [], "detectors": []},
        "finding_status": STATUS_RESOLVED,
        "resolution_basis": "verified_clean",
        "verification_status": "verified_clean",
        "display_status": display_status(payload),
        "completed_at": when,
    }


def apply_finding_verification(
    store: RiskStore,
    finding_id: str,
    *,
    observed: bool,
    scan_run_id: str = "",
    actor: str = "",
    reason: str = "",
    source_message_id: str = "",
    trace_id: str = "",
    occurred_at: str = "",
    coverage: Optional[dict[str, Any]] = None,
    evidence: Optional[list[Any]] = None,
) -> dict[str, Any]:
    return apply_verification_receipt(
        store,
        finding_id,
        result="verification_failed" if observed else "verified_clean",
        observed=observed,
        scan_run_id=scan_run_id,
        coverage=coverage,
        evidence=evidence,
        actor=actor,
        source_message_id=source_message_id,
        trace_id=trace_id,
        occurred_at=occurred_at,
    )


def is_verification_scan(scan: dict) -> bool:
    if bool(scan.get("verification_scan")):
        return True
    mode = str(scan.get("scan_mode") or scan.get("mode") or "").strip().lower()
    return mode in {"verification", "verify", "full_verification"}


def finding_observed_in_scan_result(scan: dict[str, Any], finding: dict[str, Any]) -> bool:
    finding_id = str(finding.get("id") or "").strip()
    fingerprint = str(finding.get("canonical_fingerprint") or "").strip()
    items = scan.get("findings") if isinstance(scan.get("findings"), list) else []
    if not items and isinstance(scan.get("data"), dict):
        nested = scan["data"].get("findings")
        if isinstance(nested, list):
            items = nested
    from risk.correlation import canonical_fingerprint

    for item in items:
        if not isinstance(item, dict):
            continue
        if finding_id and str(item.get("id") or "").strip() == finding_id:
            return True
        if fingerprint:
            try:
                if canonical_fingerprint(item) == fingerprint:
                    return True
            except Exception:
                pass
            if str(item.get("canonical_fingerprint") or "").strip() == fingerprint:
                return True
    return False
