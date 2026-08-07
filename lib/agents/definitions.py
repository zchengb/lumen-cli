from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Optional

from agents.capabilities import AgentCapabilities


@dataclass(frozen=True)
class AgentDefinition:
    id: str
    display_name: str
    role: str
    soul_path: Path
    soul_version: str
    protocol_version: str
    workflow: str | None
    result_contract: str | None
    permission_profile: str
    capabilities: AgentCapabilities
    build_bootstrap_prompt: Callable[..., str]
    build_resume_prompt: Callable[..., str]
    ensure_workspace_contract: Callable[..., Path]
    resolve_workspace: Callable[..., tuple[str, Path]]
    action_adapter: object | None = None
    config_key: str = ""

    @property
    def agent_id(self) -> str:
        return self.id


_REGISTRY: dict[str, AgentDefinition] = {}


def register_definition(definition: AgentDefinition) -> AgentDefinition:
    _REGISTRY[str(definition.id).strip().lower()] = definition
    return definition


def get_definition(agent_id: str) -> Optional[AgentDefinition]:
    return _REGISTRY.get(str(agent_id or "").strip().lower())


def ensure_definitions_loaded() -> None:
    if _REGISTRY:
        return
    from agents.dylan.definition import DYLAN_DEFINITION
    from agents.mark.definition import MARK_DEFINITION

    register_definition(DYLAN_DEFINITION)
    register_definition(MARK_DEFINITION)


def list_definitions() -> list[AgentDefinition]:
    ensure_definitions_loaded()
    return list(_REGISTRY.values())
