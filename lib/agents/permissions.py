from __future__ import annotations

from typing import Any, Optional

from agents.security.authorization import is_chat_authorized, is_user_authorized


def is_chat_allowed(chat_id: str, config: Optional[dict[str, Any]] = None) -> bool:
    return is_chat_authorized(chat_id, config)


def is_user_allowed(user_id: str, config: Optional[dict[str, Any]] = None) -> bool:
    return is_user_authorized(user_id, config)
