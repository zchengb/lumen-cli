from __future__ import annotations

from typing import Any, Optional

from agents.security.actions import MUTATION_ACTIONS
from agents.security.errors import AuthorizationDenied
from agents.security.policy import load_access_config


def _as_set(values: list[str]) -> set[str]:
    return {str(item).strip() for item in values if str(item).strip()}


def is_chat_authorized(chat_id: str, config: Optional[dict[str, Any]] = None) -> bool:
    access = load_access_config(config)
    allowed = _as_set(access["allowed_chat_ids"])
    if not allowed:
        return True
    return str(chat_id or "").strip() in allowed


def is_user_authorized(user_id: str, config: Optional[dict[str, Any]] = None) -> bool:
    access = load_access_config(config)
    allowed = _as_set(access["allowed_user_ids"])
    admins = _as_set(access["admin_user_ids"])
    if not allowed and not admins:
        return True
    actor = str(user_id or "").strip()
    return actor in allowed or actor in admins


def is_mutation_authorized(
    *,
    user_id: str,
    chat_id: str,
    action: str,
    config: Optional[dict[str, Any]] = None,
) -> bool:
    if str(action or "").strip() not in MUTATION_ACTIONS:
        return True
    access = load_access_config(config)
    actor = str(user_id or "").strip()
    chat = str(chat_id or "").strip()
    if not is_chat_authorized(chat, config):
        return False
    admins = _as_set(access["admin_user_ids"])
    mutators = _as_set(access["mutation_allowed_user_ids"])
    # Fail closed: unconfigured mutation allowlist denies all mutations.
    if not mutators and not admins:
        return False
    return actor in mutators or actor in admins


def assert_mutation_authorized(
    *,
    user_id: str,
    chat_id: str,
    action: str,
    config: Optional[dict[str, Any]] = None,
) -> None:
    if not is_mutation_authorized(user_id=user_id, chat_id=chat_id, action=action, config=config):
        raise AuthorizationDenied(
            f"mutation denied for user={user_id or '-'} chat={chat_id or '-'} action={action}"
        )
