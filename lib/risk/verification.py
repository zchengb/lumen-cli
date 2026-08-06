from __future__ import annotations

from typing import Any, Optional

from risk.models import STATUS_IGNORED, STATUS_OPEN, STATUS_REOPENED, STATUS_RESOLVED
from risk.store import RiskStore, utc_now


def display_status(finding: dict[str, Any] | Any) -> str:
    row = dict(finding) if finding is not None else {}
    status = str(row.get("status") or "").strip()
    remediation = str(row.get("remediation_status") or "none").strip().lower()
    verification = str(row.get("verification_status") or "").strip().lower()
    if status == STATUS_IGNORED:
        return "Ignored"
    if status == STATUS_REOPENED:
        return "Reopened"
    if status == STATUS_RESOLVED and verification == "verified_clean":
        return "Resolved · Verified clean"
    if status == STATUS_RESOLVED:
        return "Resolved"
    if remediation == "remediated" and verification == "pending_verification":
        return "Remediated · Pending verification"
    if verification == "verification_failed":
        return "Verification failed · Open"
    if status == STATUS_OPEN or not status:
        return "Open"
    return status or "Open"


def _meta_reason(reason: str, *, source_message_id: str = "", trace_id: str = "") -> str:
    parts = [str(reason or "User reported the fix completed").strip() or "User reported the fix completed"]
    if source_message_id:
        parts.append(f"source_message_id={source_message_id}")
    if trace_id:
        parts.append(f"trace_id={trace_id}")
    return " | ".join(parts)


def _idempotent_remediation(store: RiskStore, finding_id: str, source_message_id: str) -> bool:
    if not source_message_id:
        return False
    row = store.fetchone(
        """
        SELECT 1 FROM finding_event
        WHERE finding_id = ?
          AND event_type = 'remediation_reported'
          AND reason LIKE ?
        LIMIT 1
        """,
        (finding_id, f"%source_message_id={source_message_id}%"),
    )
    return row is not None


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

    if source_message_id and _idempotent_remediation(store, finding_id, source_message_id):
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
            "source_message_id": source_message_id,
            "trace_id": trace_id,
        }

    when = occurred_at or utc_now()
    store.execute(
        """
        UPDATE finding SET remediation_status = 'remediated',
            verification_status = 'pending_verification'
        WHERE id = ?
        """,
        (finding_id,),
    )
    store.insert_event(
        finding_id,
        "remediation_reported",
        previous_status=str(data.get("status")),
        new_status=str(data.get("status")),
        actor_type="user" if actor else "system",
        actor_id=actor or "risk-engine",
        reason=_meta_reason(reason, source_message_id=source_message_id, trace_id=trace_id),
        occurred_at=when,
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
        "source_message_id": source_message_id,
        "trace_id": trace_id,
        "occurred_at": when,
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
    row = store.get_finding(finding_id)
    if row is None:
        return {"status": "not_found", "code": "FINDING_NOT_FOUND", "finding_id": finding_id}

    data = dict(row)
    remediation = str(data.get("remediation_status") or "none").strip().lower()
    verification = str(data.get("verification_status") or "").strip().lower()
    if remediation != "remediated" and verification != "pending_verification":
        return {
            "status": "error",
            "code": "NOT_PENDING_VERIFICATION",
            "message": "Finding must be Remediated · Pending verification before Verification Scan",
            "finding_id": finding_id,
            "display_status": display_status(data),
        }

    when = occurred_at or utc_now()
    run_id = scan_run_id or f"verify-{finding_id}-{when.replace(':', '').replace('-', '')[:20]}"
    actor_id = actor or "verification-scan"
    meta = _meta_reason(
        reason or ("verification scan still found the issue" if observed else "verified clean by verification scan"),
        source_message_id=source_message_id,
        trace_id=trace_id,
    )

    if observed:
        store.execute(
            """
            UPDATE finding SET verification_status = 'verification_failed',
                last_verified_at = ?, last_verification_run_id = ?
            WHERE id = ?
            """,
            (when, run_id, finding_id),
        )
        store.insert_event(
            finding_id,
            "verification_failed",
            previous_status=str(data.get("status")),
            new_status=str(data.get("status")),
            actor_type="system",
            actor_id=actor_id,
            reason=meta,
            occurred_at=when,
        )
        store.commit()
        refreshed = store.get_finding(finding_id)
        payload = dict(refreshed) if refreshed is not None else data
        payload["verification_status"] = "verification_failed"
        return {
            "status": "verification_failed",
            "finding_id": finding_id,
            "scan_run_id": run_id,
            "observed": True,
            "evidence": evidence or [],
            "finding_status": str(payload.get("status") or STATUS_OPEN),
            "remediation_status": str(payload.get("remediation_status") or "remediated"),
            "verification_status": "verification_failed",
            "display_status": display_status(payload),
            "completed_at": when,
        }

    store.execute(
        """
        UPDATE finding SET status = ?, resolved_at = ?,
            verification_status = 'verified_clean', consecutive_seen_count = 0,
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
        reason=meta,
        occurred_at=when,
    )
    store.commit()
    refreshed = store.get_finding(finding_id)
    payload = dict(refreshed) if refreshed is not None else data
    payload["status"] = STATUS_RESOLVED
    payload["verification_status"] = "verified_clean"
    return {
        "status": "verified_clean",
        "finding_id": finding_id,
        "scan_run_id": run_id,
        "observed": False,
        "coverage": coverage or {"repositories": [], "files": [], "detectors": []},
        "finding_status": STATUS_RESOLVED,
        "remediation_status": str(payload.get("remediation_status") or "remediated"),
        "verification_status": "verified_clean",
        "display_status": display_status(payload),
        "completed_at": when,
    }


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
