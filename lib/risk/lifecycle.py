from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Optional

from risk.models import STATUS_IGNORED, STATUS_OPEN, STATUS_REOPENED, STATUS_RESOLVED
from risk.store import RiskStore, utc_now


def _parse_ts(value: str | None) -> Optional[datetime]:
    raw = str(value or "").strip()
    if not raw:
        return None
    if raw.endswith("Z"):
        raw = raw[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(raw)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def map_registry_status(status: str) -> str:
    value = str(status or "").strip().lower()
    if value in {"ignored", "accepted_risk", "false_positive"}:
        return STATUS_IGNORED
    if value in {"resolved"}:
        return STATUS_RESOLVED
    return STATUS_OPEN


def apply_seen(
    store: RiskStore,
    finding_id: str,
    previous_status: str,
    seen_at: str,
    *,
    scan_run_id: str = "",
) -> str:
    if previous_status == STATUS_RESOLVED:
        store.execute(
            """
            UPDATE finding SET status = ?, last_seen_at = ?, reopened_count = reopened_count + 1,
                recurrence_count = recurrence_count + 1, occurrence_count = occurrence_count + 1,
                consecutive_seen_count = 1, verification_status = 'observed',
                last_seen_scan_run_id = ?, resolved_at = NULL
            WHERE id = ?
            """,
            (STATUS_REOPENED, seen_at, scan_run_id or None, finding_id),
        )
        store.insert_event(
            finding_id,
            "reopened",
            previous_status=previous_status,
            new_status=STATUS_REOPENED,
            reason="finding reappeared in scan",
            occurred_at=seen_at,
        )
        return STATUS_REOPENED
    if previous_status == STATUS_IGNORED:
        store.execute(
            """
            UPDATE finding SET last_seen_at = ?, occurrence_count = occurrence_count + 1,
                consecutive_seen_count = consecutive_seen_count + 1,
                verification_status = 'observed', last_seen_scan_run_id = ?
            WHERE id = ?
            """,
            (seen_at, scan_run_id or None, finding_id),
        )
        return STATUS_IGNORED
    next_status = STATUS_OPEN if previous_status == STATUS_OPEN else previous_status
    if previous_status == STATUS_REOPENED:
        next_status = STATUS_REOPENED
    store.execute(
        """
        UPDATE finding SET status = ?, last_seen_at = ?,
            occurrence_count = occurrence_count + 1,
            consecutive_seen_count = consecutive_seen_count + 1,
            verification_status = 'observed', last_seen_scan_run_id = ?
        WHERE id = ?
        """,
        (next_status, seen_at, scan_run_id or None, finding_id),
    )
    return next_status


def mark_not_observed(
    store: RiskStore,
    project_slug: str,
    seen_ids: set[str],
    completed_at: str,
) -> list[str]:
    marked: list[str] = []
    for row in store.list_findings(project_slug, [STATUS_OPEN, STATUS_REOPENED]):
        finding_id = str(row["id"])
        if finding_id in seen_ids:
            continue
        store.execute(
            """
            UPDATE finding SET verification_status = 'not_observed', consecutive_seen_count = 0
            WHERE id = ?
            """,
            (finding_id,),
        )
        store.insert_event(
            finding_id,
            "not_observed",
            previous_status=str(row["status"]),
            new_status=str(row["status"]),
            reason="absent from latest incremental scan",
            occurred_at=completed_at,
        )
        marked.append(finding_id)
    return marked


def verify_resolved(
    store: RiskStore,
    project_slug: str,
    seen_ids: set[str],
    completed_at: str,
    *,
    scan_run_id: str = "",
    verification_scan: bool = False,
) -> list[str]:
    if not verification_scan:
        return []
    resolved: list[str] = []
    for row in store.list_findings(project_slug, [STATUS_OPEN, STATUS_REOPENED]):
        finding_id = str(row["id"])
        remediation = str(row["remediation_status"] or "none")
        verification = str(row["verification_status"] or "")
        if finding_id in seen_ids:
            if remediation == "remediated" or verification == "pending_verification":
                store.execute(
                    """
                    UPDATE finding SET verification_status = 'verification_failed',
                        last_verified_at = ?, last_verification_run_id = ?
                    WHERE id = ?
                    """,
                    (completed_at, scan_run_id or None, finding_id),
                )
                store.insert_event(
                    finding_id,
                    "verification_failed",
                    previous_status=str(row["status"]),
                    new_status=str(row["status"]),
                    reason="verification scan still found the issue",
                    occurred_at=completed_at,
                )
            continue
        if remediation != "remediated" and verification != "pending_verification":
            continue
        store.execute(
            """
            UPDATE finding SET status = ?, resolved_at = ?,
                verification_status = 'verified_clean', consecutive_seen_count = 0,
                last_verified_at = ?, last_verification_run_id = ?
            WHERE id = ?
            """,
            (STATUS_RESOLVED, completed_at, completed_at, scan_run_id or None, finding_id),
        )
        store.insert_event(
            finding_id,
            "resolved",
            previous_status=str(row["status"]),
            new_status=STATUS_RESOLVED,
            reason="verified clean by verification scan",
            occurred_at=completed_at,
        )
        resolved.append(finding_id)
    return resolved


def resolve_missing(
    store: RiskStore,
    project_slug: str,
    seen_ids: set[str],
    completed_at: str,
    *,
    scan_run_id: str = "",
    verification_scan: bool = False,
) -> list[str]:
    mark_not_observed(store, project_slug, seen_ids, completed_at)
    return verify_resolved(
        store,
        project_slug,
        seen_ids,
        completed_at,
        scan_run_id=scan_run_id,
        verification_scan=verification_scan,
    )


def invalidate_ignore_if_needed(
    store: RiskStore,
    finding_id: str,
    *,
    severity_upgraded: bool,
    score_delta: float,
    reopened: bool,
    score_threshold: float = 15.0,
    critical_module_hit: bool = False,
    blast_radius_expanded: bool = False,
) -> bool:
    policy = store.fetchone("SELECT * FROM ignore_policy WHERE finding_id = ?", (finding_id,))
    if policy is None:
        return False
    expires = _parse_ts(str(policy["expires_at"] or ""))
    now = datetime.now(timezone.utc)
    expired = expires is not None and expires <= now
    if (
        expired
        or severity_upgraded
        or score_delta >= score_threshold
        or reopened
        or critical_module_hit
        or blast_radius_expanded
    ):
        store.execute("DELETE FROM ignore_policy WHERE finding_id = ?", (finding_id,))
        store.execute(
            "UPDATE finding SET status = ? WHERE id = ? AND status = ?",
            (STATUS_OPEN, finding_id, STATUS_IGNORED),
        )
        store.insert_event(
            finding_id,
            "ignore_invalidated",
            previous_status=STATUS_IGNORED,
            new_status=STATUS_OPEN,
            reason="ignore policy invalidated",
        )
        return True
    return False


def default_ignore_expiry(ignored_at: Optional[str] = None) -> str:
    base = _parse_ts(ignored_at) or datetime.now(timezone.utc)
    return (base + timedelta(days=30)).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def upsert_ignore_policy(
    store: RiskStore,
    finding_id: str,
    *,
    ignored_by: str = "operator",
    reason: str = "",
    expires_at: str = "",
) -> None:
    store.execute(
        """
        INSERT INTO ignore_policy(finding_id, ignored_by, ignored_at, expires_at, invalidation_rules, reason)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(finding_id) DO UPDATE SET
            ignored_by=excluded.ignored_by,
            ignored_at=excluded.ignored_at,
            expires_at=excluded.expires_at,
            reason=excluded.reason
        """,
        (
            finding_id,
            ignored_by,
            utc_now(),
            expires_at or default_ignore_expiry(),
            "severity_up,score_delta,reopen,expiry,critical_module",
            reason,
        ),
    )
    store.execute(
        "UPDATE finding SET status = ? WHERE id = ?",
        (STATUS_IGNORED, finding_id),
    )
