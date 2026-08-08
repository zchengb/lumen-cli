from __future__ import annotations

from typing import Any, Optional

from agents.security.actions import DYLAN_ACTIONS, MARK_ACTIONS, MILCHICK_ACTIONS
from feishu.config import load_agents_config


ROLE_ACTIONS: dict[str, tuple[str, ...]] = {
    "dylan": DYLAN_ACTIONS,
    "mark": MARK_ACTIONS,
    "milchick": MILCHICK_ACTIONS,
}


def load_access_config(config: Optional[dict[str, Any]] = None) -> dict[str, Any]:
    data = config if isinstance(config, dict) else load_agents_config()
    access = data.get("access") if isinstance(data.get("access"), dict) else {}
    legacy = access.get("legacy") if isinstance(access.get("legacy"), dict) else {}
    src = legacy if legacy else access
    return {
        "allowed_chat_ids": [str(x).strip() for x in (src.get("allowed_chat_ids") or access.get("allowed_chat_ids") or []) if str(x).strip()],
        "allowed_user_ids": [str(x).strip() for x in (src.get("allowed_user_ids") or access.get("allowed_user_ids") or []) if str(x).strip()],
        "mutation_allowed_user_ids": [
            str(x).strip()
            for x in (src.get("mutation_allowed_user_ids") or access.get("mutation_allowed_user_ids") or [])
            if str(x).strip()
        ],
        "admin_user_ids": [str(x).strip() for x in (src.get("admin_user_ids") or access.get("admin_user_ids") or []) if str(x).strip()],
        "default_policy": str(access.get("default_policy") or "legacy_allow"),
        "owners": [str(x).strip() for x in (access.get("owners") or []) if str(x).strip()],
        "admins": [str(x).strip() for x in (access.get("admins") or access.get("admin_user_ids") or []) if str(x).strip()],
    }


def agent_allowed_actions(agent_id: str) -> frozenset[str]:
    key = str(agent_id or "").strip().lower()
    try:
        from agents.definitions import ensure_definitions_loaded, get_definition

        ensure_definitions_loaded()
        definition = get_definition(key)
        if definition is not None and definition.capabilities.actions:
            return frozenset(definition.capabilities.actions)
    except Exception:
        pass
    return frozenset(ROLE_ACTIONS.get(key, ()))


def is_action_allowed_for_agent(agent_id: str, action: str) -> bool:
    return str(action or "").strip() in agent_allowed_actions(agent_id)
