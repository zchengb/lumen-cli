from __future__ import annotations

import json
from typing import Any

from risk.models import STATUS_OPEN, STATUS_REOPENED, STATUS_RESOLVED
from risk.resolution_policy import ResolutionPolicy
from risk.store import RiskStore, utc_now
from risk.verification import display_status


def resolve_finding(
    store: RiskStore,
    finding_id: str,
    *,
    basis: str = "user_confirmed",
    actor: str = "",
    reason: str = "",
    source_message_id: str = "",
    trace_id: str = "",
    chat_id: str = "",
    override: bool = False,
    contradictory_evidence: bool = False,
    common: dict[str, Any] | None = None,
    occurred_at: str = "",
) -> dict[str, Any]:
    row = store.get_finding(finding_id)
    if row is None:
        return {"status": "not_found", "code": "FINDING_NOT_FOUND", "finding_id": finding_id}

    data = dict(row)
    actor_id = str(actor or "").strip()
    source = str(source_message_id or "").strip()
    tid = str(trace_id or "").strip()
    if not actor_id or not source or not tid:
        return {
            "status": "error",
            "code": "WRITE_META_REQUIRED",
            "message": "resolve requires --actor, --source-message-id, and --trace-id",
            "finding_id": finding_id,
        }

    requested_basis = str(basis or "user_confirmed").strip() or "user_confirmed"
    if override:
        requested_basis = "policy_override"
    if requested_basis == "policy_override" and not str(reason or "").strip():
        return {
            "status": "error",
            "code": "REASON_REQUIRED",
            "message": "policy_override requires --reason",
            "finding_id": finding_id,
        }

    idem = f"resolve:{source}:{requested_basis}"
    existing = store.fetchone(
        """
        SELECT 1 FROM finding_event
        WHERE finding_id = ? AND event_type = 'owner_resolved' AND idempotency_key = ?
        LIMIT 1
        """,
        (finding_id, idem),
    )
    if existing is not None:
        refreshed = store.get_finding(finding_id)
        payload = dict(refreshed) if refreshed is not None else data
        return {
            "status": "ok",
            "idempotent": True,
            "finding_id": finding_id,
            "finding_status": str(payload.get("status") or ""),
            "resolution_basis": str(payload.get("resolution_basis") or requested_basis),
            "verification_status": str(payload.get("verification_status") or ""),
            "display_status": display_status(payload),
        }

    policy = ResolutionPolicy(common)
    decision = policy.evaluate(
        finding=data,
        actor_id=actor_id,
        chat_id=chat_id,
        requested_basis=requested_basis,
        override=override,
        contradictory_evidence=contradictory_evidence,
    )
    if not decision.allowed:
        return {
            "status": "error",
            "code": decision.reason_code,
            "message": decision.explanation,
            "requires_verification": decision.requires_verification,
            "override_allowed": decision.override_allowed,
            "finding_id": finding_id,
            "display_status": display_status(data),
            "policy": {
                "allowed": decision.allowed,
                "reason_code": decision.reason_code,
                "requires_verification": decision.requires_verification,
                "override_allowed": decision.override_allowed,
            },
        }

    when = occurred_at or utc_now()
    store.execute(
        """
        UPDATE finding SET
            status = ?,
            resolved_at = ?,
            remediation_status = CASE
                WHEN remediation_status IS NULL OR remediation_status IN ('', 'none') THEN 'remediated'
                ELSE remediation_status
            END,
            verification_status = 'pending_verification',
            resolution_basis = ?,
            resolved_by = ?,
            resolved_source_message_id = ?,
            resolved_trace_id = ?,
            owner_resolved_at = ?,
            remediation_reported_at = COALESCE(remediation_reported_at, ?)
        WHERE id = ?
        """,
        (
            STATUS_RESOLVED,
            when,
            requested_basis,
            actor_id,
            source,
            tid,
            when,
            when,
            finding_id,
        ),
    )
    store.insert_event(
        finding_id,
        "owner_resolved",
        previous_status=str(data.get("status") or STATUS_OPEN),
        new_status=STATUS_RESOLVED,
        actor_type="user",
        actor_id=actor_id,
        reason=str(reason or "Owner confirmed repair").strip(),
        occurred_at=when,
        source_message_id=source,
        trace_id=tid,
        idempotency_key=idem,
        metadata_json=json.dumps(
            {
                "resolution_basis": requested_basis,
                "policy_reason": decision.reason_code,
                "override": bool(override),
            },
            ensure_ascii=False,
        ),
    )
    store.commit()
    refreshed = store.get_finding(finding_id)
    payload = dict(refreshed) if refreshed is not None else data
    return {
        "status": "ok",
        "idempotent": False,
        "finding_id": finding_id,
        "finding_status": STATUS_RESOLVED,
        "resolution_basis": requested_basis,
        "remediation_status": str(payload.get("remediation_status") or "remediated"),
        "verification_status": "pending_verification",
        "display_status": display_status(payload),
        "actor": actor_id,
        "source_message_id": source,
        "trace_id": tid,
        "occurred_at": when,
        "policy": {
            "allowed": True,
            "reason_code": decision.reason_code,
            "requires_verification": decision.requires_verification,
            "override_allowed": decision.override_allowed,
        },
    }
