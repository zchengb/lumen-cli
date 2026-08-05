from __future__ import annotations

from typing import Any

from agents.dylan.directory import get_agent_profile as dir_profile
from agents.dylan.directory import get_agent_relationship as dir_relationship
from agents.dylan.directory import list_agent_capabilities as dir_capabilities
from agents.dylan.tools.common import envelope


def get_agent_profile(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    agent_id = str(arguments.get("agent_id") or "dylan")
    return envelope("get_agent_profile", dir_profile(agent_id), freshness={"source": "agent_directory"})


def get_agent_relationship(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    agent_id = str(arguments.get("agent_id") or "dylan")
    other_id = str(arguments.get("other_id") or "mark")
    return envelope(
        "get_agent_relationship",
        dir_relationship(agent_id, other_id),
        freshness={"source": "agent_directory"},
    )


def list_agent_capabilities(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    agent_id = str(arguments.get("agent_id") or "dylan")
    return envelope("list_agent_capabilities", dir_capabilities(agent_id), freshness={"source": "agent_directory"})
