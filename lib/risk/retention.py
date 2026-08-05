from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from risk.store import RiskStore


def apply_retention(store: RiskStore, *, keep_days: int = 90) -> dict[str, int]:
    cutoff = (datetime.now(timezone.utc) - timedelta(days=max(keep_days, 1))).replace(microsecond=0)
    cutoff_iso = cutoff.isoformat().replace("+00:00", "Z")
    old_runs = store.fetchall(
        "SELECT id FROM scan_run WHERE completed_at IS NOT NULL AND completed_at < ?",
        (cutoff_iso,),
    )
    deleted_runs = 0
    deleted_occurrences = 0
    for row in old_runs:
        run_id = str(row["id"])
        cursor = store.execute("DELETE FROM finding_occurrence WHERE scan_run_id = ?", (run_id,))
        deleted_occurrences += cursor.rowcount if cursor.rowcount and cursor.rowcount > 0 else 0
        store.execute("DELETE FROM scan_run WHERE id = ?", (run_id,))
        deleted_runs += 1
    # Keep open/reopened findings even if old; prune resolved findings with no recent occurrence and resolved long ago
    stale_resolved = store.fetchall(
        """
        SELECT f.id FROM finding f
        WHERE f.status = 'Resolved'
          AND f.resolved_at IS NOT NULL
          AND f.resolved_at < ?
          AND NOT EXISTS (
            SELECT 1 FROM finding_occurrence o WHERE o.finding_id = f.id AND o.detected_at >= ?
          )
        """,
        (cutoff_iso, cutoff_iso),
    )
    deleted_findings = 0
    for row in stale_resolved:
        finding_id = str(row["id"])
        store.execute("DELETE FROM finding_occurrence WHERE finding_id = ?", (finding_id,))
        store.execute("DELETE FROM severity_adjustment WHERE finding_id = ?", (finding_id,))
        store.execute("DELETE FROM external_link WHERE finding_id = ?", (finding_id,))
        store.execute("DELETE FROM finding_event WHERE finding_id = ?", (finding_id,))
        store.execute("DELETE FROM ignore_policy WHERE finding_id = ?", (finding_id,))
        store.execute("DELETE FROM finding WHERE id = ?", (finding_id,))
        deleted_findings += 1
    store.commit()
    return {
        "deleted_runs": deleted_runs,
        "deleted_occurrences": deleted_occurrences,
        "deleted_findings": deleted_findings,
    }
