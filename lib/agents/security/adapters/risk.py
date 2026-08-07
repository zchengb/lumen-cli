from __future__ import annotations

from typing import Any

from agents.security.actions import ActionRequest
from agents.security.errors import CapabilityDenied, ResourceDenied


def execute_risk_action(request: ActionRequest) -> dict[str, Any]:
    action = request.action
    args = dict(request.arguments or {})
    resource = dict(request.resource or {})
    finding_id = str(resource.get("finding_id") or args.get("finding_id") or "").strip()
    project = str(request.project_slug or args.get("project") or "").strip()

    from risk.store import GlobalRiskStore

    store = GlobalRiskStore()
    try:
        if action in {"risk.read", "scan.read"}:
            if finding_id:
                row = store.get_finding(finding_id)
                return {"finding": dict(row) if row is not None else None}
            if not project:
                raise ResourceDenied("project required for risk.read listing")
            rows = store.list_findings(project)
            limit = max(1, min(int(args.get("limit") or 20), 100))
            return {"findings": [dict(row) for row in rows[:limit]]}

        if action == "risk.mark_remediated":
            if not finding_id:
                raise ResourceDenied("finding_id required")
            from risk.verification import mark_remediated

            return mark_remediated(
                store,
                finding_id,
                actor=request.actor_user_id,
                reason=str(args.get("reason") or "brokered mark_remediated"),
                source_message_id=request.source_message_id,
                trace_id=request.trace_id,
            )

        if action == "risk.resolve":
            if not finding_id:
                raise ResourceDenied("finding_id required")
            from risk.resolution import resolve_finding

            return resolve_finding(
                store,
                finding_id,
                actor=request.actor_user_id,
                basis=str(args.get("basis") or "user_confirmed"),
                reason=str(args.get("reason") or "brokered resolve"),
                source_message_id=request.source_message_id,
                chat_id=request.chat_id,
                trace_id=request.trace_id,
                override=bool(args.get("override")),
            )

        if action == "scan.verify.request":
            if not finding_id:
                raise ResourceDenied("finding_id required")
            return {
                "status": "accepted",
                "finding_id": finding_id,
                "message": "Verification requested; continue with lumen scan verify",
            }

        if action == "risk.reconcile":
            return {"status": "accepted", "message": "reconcile delegated to risk store maintenance"}

        raise CapabilityDenied(f"unsupported risk action: {action}")
    finally:
        store.close()
