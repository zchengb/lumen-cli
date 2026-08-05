from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Optional

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
) -> str:
    if previous_status == STATUS_RESOLVED:
        store.execute(
            """
            UPDATE finding SET status = ?, last_seen_at = ?, reopened_count = reopened_count + 1,
                recurrence_count = recurrence_count + 1, resolved_at = NULL
            WHERE id = ?
            """,
            (STATUS_REOPENED, seen_at, finding_id),
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
            "UPDATE finding SET last_seen_at = ?, recurrence_count = recurrence_count + 1 WHERE id = ?",
            (seen_at, finding_id),
        )
        return STATUS_IGNORED
    store.execute(
        """
        UPDATE finding SET status = ?, last_seen_at = ?, recurrence_count = recurrence_count + 1
        WHERE id = ?
        """,
        (STATUS_OPEN if previous_status == STATUS_OPEN else previous_status, seen_at, finding_id),
    )
    if previous_status == STATUS_REOPENED:
        return STATUS_REOPENED
    return STATUS_OPEN


def resolve_missing(
    store: RiskStore,
    project_slug: str,
    seen_ids: set[str],
    completed_at: str,
) -> list[str]:
    resolved: list[str] = []
    for row in store.list_findings(project_slug, [STATUS_OPEN, STATUS_REOPENED]):
        finding_id = str(row["id"])
        if finding_id in seen_ids:
            continue
        store.execute(
            "UPDATE finding SET status = ?, resolved_at = ? WHERE id = ?",
            (STATUS_RESOLVED, completed_at, finding_id),
        )
        store.insert_event(
            finding_id,
            "resolved",
            previous_status=str(row["status"]),
            new_status=STATUS_RESOLVED,
            reason="absent from latest scan",
            occurred_at=completed_at,
        )
        resolved.append(finding_id)
    return resolved


def invalidate_ignore_if_needed(
    store: RiskStore,
    finding_id: str,
    *,
    severity_upgraded: bool,
    score_delta: float,
    reopened: bool,
) -> bool:
    policy = store.fetchone("SELECT * FROM ignore_policy WHERE finding_id = ?", (finding_id,))
    if policy is None:
        return False
    expires = _parse_ts(str(policy["expires_at"] or ""))
    now = datetime.now(timezone.utc)
    expired = expires is not None and expires <= now
    if expired or severity_upgraded or score_delta >= 15 or reopened:
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
