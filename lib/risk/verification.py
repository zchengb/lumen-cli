from __future__ import annotations

from risk.models import STATUS_OPEN, STATUS_REOPENED
from risk.store import RiskStore


def mark_remediated(store: RiskStore, finding_id: str, *, occurred_at: str = "") -> None:
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
        "remediated",
        previous_status=None,
        new_status=None,
        reason="PR merged; awaiting verification scan",
        occurred_at=occurred_at or None,
    )


def is_verification_scan(scan: dict) -> bool:
    if bool(scan.get("verification_scan")):
        return True
    mode = str(scan.get("scan_mode") or scan.get("mode") or "").strip().lower()
    return mode in {"verification", "verify", "full_verification"}
