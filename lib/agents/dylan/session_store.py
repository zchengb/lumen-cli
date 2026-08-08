from __future__ import annotations

from typing import Any, Optional

from agents.runtime.session_store import (
    SessionStore as _RuntimeSessionStore,
    conversation_scope_id as _runtime_scope,
    session_contract_current as _runtime_contract,
)

PROTOCOL_VERSION = "5"
SOUL_VERSION = "5"


def conversation_scope_id(
    *,
    chat_id: str,
    thread_id: str = "",
    project_slug: str = "",
    user_id: str = "",
    scope: str = "thread_shared",
    agent_id: str = "dylan",
) -> str:
    return _runtime_scope(
        agent_id=agent_id,
        chat_id=chat_id,
        thread_id=thread_id,
        project_slug=project_slug,
        user_id=user_id,
        scope=scope,
    )


def session_contract_current(session: dict[str, Any] | None) -> bool:
    return _runtime_contract(
        session,
        soul_version=SOUL_VERSION,
        protocol_version=PROTOCOL_VERSION,
    )


class SessionStore(_RuntimeSessionStore):
    def get_active(
        self,
        *,
        agent_id: str = "dylan",
        conversation_scope_id: str,
    ) -> Optional[dict[str, Any]]:
        return super().get_active(agent_id=agent_id, conversation_scope_id=conversation_scope_id)
