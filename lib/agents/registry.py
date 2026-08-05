from __future__ import annotations

import os
from typing import Optional

from agents.profiles import PROFILES, AgentProfile

WORKFLOW_TO_AGENT = {
    "auto_scan": "dylan",
    "auto_patch": "irving",
    "auto_delivery": "mark",
}

APP_ID_ENV = {
    "dylan": "FEISHU_DYLAN_APP_ID",
    "irving": "FEISHU_IRVING_APP_ID",
    "mark": "FEISHU_MARK_APP_ID",
    "milchick": "FEISHU_MILCHICK_APP_ID",
}


def get_profile(agent_id: str) -> AgentProfile:
    key = str(agent_id or "").strip().lower()
    profile = PROFILES.get(key)
    if profile is None:
        raise KeyError(f"Unknown agent: {agent_id}")
    return profile


def get_profile_by_workflow(workflow: str) -> Optional[AgentProfile]:
    agent_id = WORKFLOW_TO_AGENT.get(str(workflow or "").strip())
    if not agent_id:
        return None
    return PROFILES[agent_id]


def get_profile_by_app_id(app_id: str) -> Optional[AgentProfile]:
    value = str(app_id or "").strip()
    if not value:
        return None
    for agent_id, env_name in APP_ID_ENV.items():
        configured = os.environ.get(env_name, "").strip()
        if configured and configured == value:
            return PROFILES[agent_id]
    return None


def resolve_owner_agent(workflow: str, explicit: str = "") -> str:
    if explicit:
        return str(explicit).strip().lower()
    profile = get_profile_by_workflow(workflow)
    return profile.id if profile else ""
