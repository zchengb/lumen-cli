from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Optional

from agents.profiles import AgentProfile, PROFILES
from agents.registry import APP_ID_ENV, get_profile_by_app_id


@dataclass
class FeishuClientConfig:
    agent_id: str
    app_id: str
    app_secret: str
    profile: AgentProfile


APP_SECRET_ENV = {
    "dylan": "FEISHU_DYLAN_APP_SECRET",
    "irving": "FEISHU_IRVING_APP_SECRET",
    "mark": "FEISHU_MARK_APP_SECRET",
    "milchick": "FEISHU_MILCHICK_APP_SECRET",
}


def load_client_config(agent_id: str) -> Optional[FeishuClientConfig]:
    key = str(agent_id or "").strip().lower()
    profile = PROFILES.get(key)
    if profile is None:
        return None
    app_id = os.environ.get(APP_ID_ENV.get(key, ""), "").strip()
    app_secret = os.environ.get(APP_SECRET_ENV.get(key, ""), "").strip()
    if not app_id or not app_secret:
        return None
    return FeishuClientConfig(
        agent_id=key,
        app_id=app_id,
        app_secret=app_secret,
        profile=profile,
    )


def configured_agents(only: Optional[list[str]] = None) -> list[FeishuClientConfig]:
    wanted = only or ["dylan"]
    clients: list[FeishuClientConfig] = []
    for agent_id in wanted:
        config = load_client_config(agent_id)
        if config is not None:
            clients.append(config)
    return clients


def resolve_agent(app_id: str) -> Optional[AgentProfile]:
    return get_profile_by_app_id(app_id)
