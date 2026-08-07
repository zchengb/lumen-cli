from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class AgentCapabilities:
    direct_workspace_write: bool = False
    allowed_workflows: tuple[str, ...] = ()
    allowed_mutations: tuple[str, ...] = ()
    external_side_effects: tuple[str, ...] = ()
