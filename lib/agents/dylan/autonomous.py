from __future__ import annotations

from dataclasses import replace
from pathlib import Path
from typing import Any, Optional

from agents.definitions import ensure_definitions_loaded, get_definition
from agents.dylan.session_bootstrap import build_bootstrap_prompt, build_resume_prompt
from agents.dylan.workspace_contract import ensure_workspace_contract
from agents.project_resolver import known_project_slugs, load_chat_project_map, resolve_project
from agents.runtime.autonomous import (
    AutonomousUnavailableError,
    _user_facing_agent_error,
    handle_autonomous_conversation as _shared_handle,
)
from agents.runtime.cursor_runtime import AgentRunResult, CursorAgentRuntime
from agents.runtime.observability import Observability, TraceContext
import agents.runtime.autonomous as _runtime_autonomous


def _resolve_workspace(project_slug: str, chat_id: str) -> tuple[str, Path]:
    project = resolve_project(slug=project_slug, chat_id=chat_id, mapping=load_chat_project_map())
    if project is None and not project_slug:
        known = sorted(known_project_slugs())
        if len(known) == 1:
            project = resolve_project(slug=known[0], mapping=load_chat_project_map())
    if project is None or not project.get("workspace"):
        raise AutonomousUnavailableError("workspace not resolved")
    slug = str(project.get("slug") or project_slug or "").strip()
    workspace = Path(str(project["workspace"])).expanduser().resolve()
    if not workspace.is_dir():
        raise AutonomousUnavailableError(f"workspace missing: {workspace}")
    return slug, workspace


def handle_autonomous_conversation(
    *,
    text: str,
    meta: dict[str, str],
    common: dict[str, Any] | None = None,
    agents_config: dict[str, Any] | None = None,
    runtime: CursorAgentRuntime | None = None,
    obs: Observability | None = None,
    trace: TraceContext | None = None,
) -> dict[str, Any]:
    ensure_definitions_loaded()
    base = get_definition("dylan")
    if base is None:
        raise AutonomousUnavailableError("dylan definition missing")
    definition = replace(
        base,
        resolve_workspace=_resolve_workspace,
        ensure_workspace_contract=ensure_workspace_contract,
        build_bootstrap_prompt=build_bootstrap_prompt,
        build_resume_prompt=build_resume_prompt,
    )
    saved = {
        "resolve_project": _runtime_autonomous.resolve_project,
        "known_project_slugs": _runtime_autonomous.known_project_slugs,
        "load_chat_project_map": _runtime_autonomous.load_chat_project_map,
    }
    _runtime_autonomous.resolve_project = resolve_project
    _runtime_autonomous.known_project_slugs = known_project_slugs
    _runtime_autonomous.load_chat_project_map = load_chat_project_map
    try:
        return _shared_handle(
            definition=definition,
            text=text,
            meta=meta,
            common=common,
            agents_config=agents_config,
            runtime=runtime,
            obs=obs,
            trace=trace,
        )
    finally:
        for key, value in saved.items():
            setattr(_runtime_autonomous, key, value)


__all__ = [
    "AutonomousUnavailableError",
    "AgentRunResult",
    "CursorAgentRuntime",
    "Observability",
    "TraceContext",
    "_resolve_workspace",
    "_user_facing_agent_error",
    "handle_autonomous_conversation",
    "known_project_slugs",
    "load_chat_project_map",
    "resolve_project",
]
