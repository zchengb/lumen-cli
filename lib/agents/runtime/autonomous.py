from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any, Optional

from agents.definitions import AgentDefinition
from agents.dylan.schemas import ConversationFlags
from agents.project_resolver import known_project_slugs, load_chat_project_map, resolve_project
from agents.runtime.cursor_runtime import CursorAgentRuntime
from agents.runtime.final_response import extract_final_response
from agents.runtime.observability import Observability, TraceContext, new_trace_id
from agents.runtime.reply_anchor import format_anchored_user_message, resolve_reply_anchor
from agents.runtime.session_store import SessionStore, conversation_scope_id, session_contract_current
from feishu.messenger import FeishuMessenger


class AutonomousUnavailableError(RuntimeError):
    pass


_RESUME_RETRY_TOKENS = (
    "resume",
    "session",
    "not found",
    "invalid",
    "no result event",
    "stream-json",
    "failed to reach",
    "cursor api",
    "empty stream",
)


def _user_facing_agent_error(error: str, trace_id: str) -> str:
    lower = (error or "").lower()
    if any(tok in lower for tok in ("failed to reach", "cursor api", "proxy", "https_proxy")):
        return (
            "I couldn't reach the Cursor Agent service just now, so I couldn't finish that turn.\n"
            f"Trace ID: {trace_id}"
        )
    if "no result event" in lower or "stream-json" in lower or "empty stream" in lower:
        return (
            "My workspace agent run ended without a usable answer. Retrying after `/new` usually helps.\n"
            f"Trace ID: {trace_id}"
        )
    if "timed_out" in lower or "timeout" in lower:
        return (
            "That investigation took too long and was stopped before I could answer.\n"
            f"Trace ID: {trace_id}"
        )
    return (
        "I couldn't finish this turn cleanly.\n"
        f"Trace ID: {trace_id}"
    )


def handle_autonomous_conversation(
    *,
    definition: AgentDefinition,
    text: str,
    meta: dict[str, str],
    common: dict[str, Any] | None = None,
    agents_config: dict[str, Any] | None = None,
    runtime: CursorAgentRuntime | None = None,
    obs: Observability | None = None,
    trace: TraceContext | None = None,
) -> dict[str, Any]:
    agent_id = str(definition.id or "").strip().lower()
    flags = ConversationFlags.from_common(common, agents_config, agent_id=agent_id)
    if not flags.autonomous:
        raise AutonomousUnavailableError("autonomous_workspace mode disabled")

    chat_id = str(meta.get("chat_id") or "")
    thread_id = str(meta.get("thread_id") or "")
    user_id = str(meta.get("user_id") or "")
    message_id = str(meta.get("message_id") or "")
    stripped = text.strip()
    reset = stripped.lower() in {"/new", "新开话题", "重新开始", "new session"}

    mapped = resolve_project(chat_id=chat_id, mapping=load_chat_project_map())
    project_slug = str((mapped or {}).get("slug") or "")
    if not project_slug:
        known = sorted(known_project_slugs())
        project_slug = known[0] if len(known) == 1 else ""
    slug, workspace = definition.resolve_workspace(project_slug, chat_id)
    definition.ensure_workspace_contract(workspace=workspace, project_slug=slug)

    scope = conversation_scope_id(
        agent_id=agent_id,
        chat_id=chat_id,
        thread_id=thread_id,
        project_slug=slug,
        user_id=user_id,
        scope=flags.session_scope,
    )

    owned_obs = obs is None
    obs = obs or Observability(agent_id=agent_id)
    store = SessionStore(obs.store)
    parent_id = str(meta.get("parent_id") or "").strip()
    root_id = str(meta.get("root_id") or "").strip()
    anchored_text = text
    if parent_id or root_id:
        messenger = FeishuMessenger(agent_id)
        anchor = resolve_reply_anchor(
            messenger=messenger,
            parent_id=parent_id,
            root_id=root_id,
            agent_id=agent_id,
        )
        if anchor:
            anchored_text = format_anchored_user_message(
                user_message=text,
                parent_id=parent_id or root_id,
                anchor_text=anchor,
            )
    if trace is None:
        trace = TraceContext(
            trace_id=new_trace_id(),
            message_id=message_id,
            chat_id=chat_id,
            thread_id=thread_id,
            user_id=user_id,
            project_slug=slug,
            provider="cursor_cli",
            model=flags.model.model_name,
            agent_id=agent_id,
            role=definition.role,
            workflow=str(definition.workflow or ""),
        )
    else:
        trace.project_slug = slug
        trace.provider = "cursor_cli"
        trace.model = flags.model.model_name
        trace.agent_id = agent_id
        trace.role = definition.role
        trace.workflow = str(definition.workflow or "")
    if parent_id and anchored_text != text:
        obs.emit(trace, "reply.anchor.resolved", parent_id=parent_id)
    elif root_id and anchored_text != text:
        obs.emit(trace, "reply.anchor.resolved", parent_id=root_id)

    lock = store.lock_for(scope)
    with lock:
        try:
            obs.emit(trace, "agent.message.received")
            obs.upsert_trace(trace, state="queued", project_slug=slug)
            session = store.get_active(agent_id=agent_id, conversation_scope_id=scope)
            if reset and session:
                store.close_session(session["session_id"])
                session = None
            if session and not session_contract_current(
                session,
                soul_version=definition.soul_version,
                protocol_version=definition.protocol_version,
            ):
                obs.emit(
                    trace,
                    "agent.session.contract_mismatch",
                    soul_version=session.get("soul_version"),
                    protocol_version=session.get("protocol_version"),
                    expected_soul=definition.soul_version,
                    expected_protocol=definition.protocol_version,
                )
                store.close_session(session["session_id"])
                session = None

            is_new = session is None
            if is_new:
                session = store.create(
                    agent_id=agent_id,
                    chat_id=chat_id,
                    conversation_scope_id=scope,
                    workspace_path=str(workspace),
                    project_slug=slug,
                    user_id=user_id,
                    soul_version=definition.soul_version,
                    protocol_version=definition.protocol_version,
                )
                prompt = definition.build_bootstrap_prompt(
                    project_slug=slug,
                    workspace_path=str(workspace),
                    user_message=anchored_text,
                )
                provider_session_id = None
            else:
                if str(Path(session["workspace_path"]).resolve()) != str(workspace):
                    store.close_session(session["session_id"])
                    session = store.create(
                        agent_id=agent_id,
                        chat_id=chat_id,
                        conversation_scope_id=scope,
                        workspace_path=str(workspace),
                        project_slug=slug,
                        user_id=user_id,
                        soul_version=definition.soul_version,
                        protocol_version=definition.protocol_version,
                    )
                    prompt = definition.build_bootstrap_prompt(
                        project_slug=slug,
                        workspace_path=str(workspace),
                        user_message=anchored_text,
                    )
                    provider_session_id = None
                    is_new = True
                else:
                    checkpoint = None
                    if session.get("checkpoint_json"):
                        try:
                            checkpoint = json.loads(session["checkpoint_json"])
                        except Exception:
                            checkpoint = None
                    prompt = definition.build_resume_prompt(
                        user_message=anchored_text,
                        project_slug=slug,
                        checkpoint=checkpoint,
                    )
                    provider_session_id = session.get("provider_session_id") or None

            runner = runtime or CursorAgentRuntime(
                model=flags.model.model_name,
                soft_timeout_seconds=flags.soft_timeout_seconds,
                hard_timeout_seconds=flags.hard_timeout_seconds,
            )
            obs.upsert_trace(trace, state="running", project_slug=slug)
            result = runner.run(
                workspace=workspace,
                prompt=prompt,
                provider_session_id=provider_session_id,
                trace=trace,
                obs=obs,
            )

            if (
                result.status == "failed"
                and provider_session_id
                and any(tok in (result.error or "").lower() for tok in _RESUME_RETRY_TOKENS)
            ):
                obs.emit(trace, "agent.session.invalidated", provider_session_id=provider_session_id)
                store.invalidate_provider(session["session_id"])
                session = store.create(
                    agent_id=agent_id,
                    chat_id=chat_id,
                    conversation_scope_id=scope,
                    workspace_path=str(workspace),
                    project_slug=slug,
                    user_id=user_id,
                    soul_version=definition.soul_version,
                    protocol_version=definition.protocol_version,
                )
                prompt = definition.build_bootstrap_prompt(
                    project_slug=slug,
                    workspace_path=str(workspace),
                    user_message=anchored_text,
                )
                result = runner.run(
                    workspace=workspace,
                    prompt=prompt,
                    provider_session_id=None,
                    trace=trace,
                    obs=obs,
                )
                is_new = True

            if result.provider_session_id and result.status == "succeeded":
                store.update(
                    session["session_id"],
                    provider_session_id=result.provider_session_id,
                    status="active",
                    last_trace_id=trace.trace_id,
                    last_request_id=result.request_id or None,
                    failure_count=0,
                    checkpoint_json=json.dumps(
                        {
                            "project_slug": slug,
                            "last_user_message_hash": hashlib.sha256(text.encode("utf-8")).hexdigest()[:16],
                            "last_answer_summary": (result.text or "")[:240],
                        },
                        ensure_ascii=False,
                    ),
                )
            elif result.status != "succeeded":
                store.update(
                    session["session_id"],
                    status="active",
                    last_trace_id=trace.trace_id,
                    failure_count=int(session.get("failure_count") or 0) + 1,
                )

            if result.status != "succeeded" or not result.text:
                obs.upsert_trace(trace, state="failed", error_code=result.status or "agent_failed")
                return {
                    "status": "error",
                    "action": "autonomous.failed",
                    "text": _user_facing_agent_error(result.error or result.status, trace.trace_id),
                    "trace_id": trace.trace_id,
                    "session_id": session["session_id"],
                    "provider_session_id": result.provider_session_id,
                    "agent_id": agent_id,
                    "tool_events": [e.__dict__ for e in result.tool_events],
                    "typing": {"enabled": False},
                    "flags": {"conversation_v4": True, "mode": "autonomous_workspace"},
                }

            obs.upsert_trace(trace, state="completed", latency_ms=result.duration_ms, project_slug=slug)
            parsed = extract_final_response(result.text)
            return {
                "status": "ok",
                "action": "autonomous.reply",
                "text": parsed.text,
                "final_response_mode": parsed.mode,
                "final_response_valid": parsed.valid,
                "trace_id": trace.trace_id,
                "session_id": session["session_id"],
                "provider_session_id": result.provider_session_id,
                "project_slug": slug,
                "workspace": str(workspace),
                "agent_id": agent_id,
                "latency_ms": result.duration_ms,
                "tool_events": [e.__dict__ for e in result.tool_events],
                "bootstrap": is_new,
                "typing": {"enabled": False},
                "flags": {"conversation_v4": True, "mode": "autonomous_workspace"},
            }
        finally:
            if owned_obs:
                obs.close()
