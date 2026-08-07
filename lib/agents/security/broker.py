from __future__ import annotations

from typing import Any, Callable, Optional

from agents.security.actions import (
    MUTATION_ACTIONS,
    ActionReceipt,
    ActionRequest,
    arguments_hash,
    new_receipt_id,
    utc_now,
)
from agents.security.audit import emit_security_event, write_receipt
from agents.security.authorization import assert_mutation_authorized, is_chat_authorized, is_user_authorized
from agents.security.errors import AuthorizationDenied, CapabilityDenied, SecurityError
from agents.security.policy import is_action_allowed_for_agent
from feishu.config import load_agents_config

Executor = Callable[[ActionRequest], dict[str, Any]]


class CapabilityBroker:
    def __init__(
        self,
        *,
        config: Optional[dict[str, Any]] = None,
        executors: Optional[dict[str, Executor]] = None,
    ) -> None:
        self.config = config if isinstance(config, dict) else load_agents_config()
        self.executors = executors if executors is not None else default_executors()

    def execute(self, request: ActionRequest) -> ActionReceipt:
        started = utc_now()
        receipt_id = new_receipt_id()
        action = str(request.action or "").strip()
        agent_id = str(request.agent_id or "").strip().lower()
        try:
            if not action:
                raise CapabilityDenied("action is required")
            if not is_action_allowed_for_agent(agent_id, action):
                emit_security_event(
                    "security.capability.denied",
                    agent_id=agent_id,
                    action=action,
                    actor_user_id=request.actor_user_id,
                    chat_id=request.chat_id,
                    trace_id=request.trace_id,
                )
                raise CapabilityDenied(f"action {action} not allowed for agent {agent_id}")
            if not is_chat_authorized(request.chat_id, self.config):
                emit_security_event(
                    "security.unauthorized_user",
                    reason="chat",
                    agent_id=agent_id,
                    action=action,
                    chat_id=request.chat_id,
                    actor_user_id=request.actor_user_id,
                    trace_id=request.trace_id,
                )
                raise AuthorizationDenied("chat not authorized")
            if not is_user_authorized(request.actor_user_id, self.config):
                emit_security_event(
                    "security.unauthorized_user",
                    reason="user",
                    agent_id=agent_id,
                    action=action,
                    chat_id=request.chat_id,
                    actor_user_id=request.actor_user_id,
                    trace_id=request.trace_id,
                )
                raise AuthorizationDenied("user not authorized")
            if action in MUTATION_ACTIONS:
                assert_mutation_authorized(
                    user_id=request.actor_user_id,
                    chat_id=request.chat_id,
                    action=action,
                    config=self.config,
                )
                if not request.explicit_authorization and action in {
                    "risk.resolve",
                    "scan.schedule.update",
                    "delivery.start",
                    "delivery.cancel",
                }:
                    raise AuthorizationDenied("explicit authorization required for this mutation")
            executor = self.executors.get(action)
            if executor is None:
                raise CapabilityDenied(f"no executor registered for {action}")
            result = executor(request)
            if not isinstance(result, dict):
                result = {"value": result}
            completed = utc_now()
            receipt = ActionReceipt(
                receipt_id=receipt_id,
                status="succeeded",
                action=action,
                agent_id=agent_id,
                actor=request.actor_user_id,
                resource=dict(request.resource or {}),
                trace_id=request.trace_id,
                executed_at=completed,
                authorization_result="allowed",
                result=result,
                started_at=started,
                completed_at=completed,
                chat_id=request.chat_id,
                thread_id=request.thread_id,
                source_message_id=request.source_message_id,
                arguments_hash=arguments_hash(request.arguments),
            )
            write_receipt(receipt)
            return receipt
        except SecurityError as exc:
            completed = utc_now()
            emit_security_event(
                "security.action.denied",
                code=exc.code,
                message=str(exc),
                agent_id=agent_id,
                action=action,
                actor_user_id=request.actor_user_id,
                chat_id=request.chat_id,
                trace_id=request.trace_id,
            )
            receipt = ActionReceipt(
                receipt_id=receipt_id,
                status="denied",
                action=action,
                agent_id=agent_id,
                actor=request.actor_user_id,
                resource=dict(request.resource or {}),
                trace_id=request.trace_id,
                executed_at=completed,
                authorization_result="denied",
                error_code=exc.code,
                error=str(exc)[:500],
                started_at=started,
                completed_at=completed,
                chat_id=request.chat_id,
                thread_id=request.thread_id,
                source_message_id=request.source_message_id,
                arguments_hash=arguments_hash(request.arguments),
            )
            write_receipt(receipt)
            return receipt
        except Exception as exc:
            completed = utc_now()
            receipt = ActionReceipt(
                receipt_id=receipt_id,
                status="failed",
                action=action,
                agent_id=agent_id,
                actor=request.actor_user_id,
                resource=dict(request.resource or {}),
                trace_id=request.trace_id,
                executed_at=completed,
                authorization_result="allowed",
                error_code="EXECUTOR_ERROR",
                error=str(exc)[:500],
                started_at=started,
                completed_at=completed,
                chat_id=request.chat_id,
                thread_id=request.thread_id,
                source_message_id=request.source_message_id,
                arguments_hash=arguments_hash(request.arguments),
            )
            write_receipt(receipt)
            return receipt


def default_executors() -> dict[str, Executor]:
    from agents.security.adapters.delivery import execute_delivery_action
    from agents.security.adapters.risk import execute_risk_action
    from agents.security.adapters.schedule import execute_schedule_action

    mapping: dict[str, Executor] = {}
    for action in (
        "risk.read",
        "risk.resolve",
        "risk.mark_remediated",
        "risk.reconcile",
        "scan.verify.request",
        "scan.read",
    ):
        mapping[action] = execute_risk_action
    for action in ("scan.schedule.read", "scan.schedule.update"):
        mapping[action] = execute_schedule_action
    for action in (
        "delivery.readiness",
        "delivery.status",
        "delivery.result",
        "delivery.start",
        "delivery.cancel",
        "story.read",
        "technical_plan.read",
    ):
        mapping[action] = execute_delivery_action
    return mapping
