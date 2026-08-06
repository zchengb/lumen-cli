from __future__ import annotations

import json
import threading
import uuid
from pathlib import Path
from typing import Any, Optional

from risk.store import GlobalAgentStore, utc_now

PROTOCOL_VERSION = "5"
SOUL_VERSION = "4"


def session_contract_current(session: dict[str, Any] | None) -> bool:
    if not session:
        return False
    return (
        str(session.get("soul_version") or "") == SOUL_VERSION
        and str(session.get("protocol_version") or "") == PROTOCOL_VERSION
    )


def conversation_scope_id(
    *,
    chat_id: str,
    thread_id: str = "",
    project_slug: str = "",
    user_id: str = "",
    scope: str = "thread_shared",
) -> str:
    chat = str(chat_id or "").strip()
    thread = str(thread_id or "").strip()
    project = str(project_slug or "").strip()
    user = str(user_id or "").strip()
    if thread:
        if scope == "thread_per_user" and user:
            return f"thread:{chat}:{thread}:user:{user}"
        return f"thread:{chat}:{thread}"
    # p2p / no thread: long-lived per chat+project
    return f"dm:{chat}:project:{project or '_'}"


class SessionStore:
    def __init__(self, store: Optional[GlobalAgentStore] = None) -> None:
        self._owned = store is None
        self.store = store or GlobalAgentStore()
        self._locks: dict[str, threading.Lock] = {}
        self._guard = threading.Lock()

    def close(self) -> None:
        if self._owned:
            self.store.close()

    def lock_for(self, scope_id: str) -> threading.Lock:
        with self._guard:
            if scope_id not in self._locks:
                self._locks[scope_id] = threading.Lock()
            return self._locks[scope_id]

    def get_active(
        self,
        *,
        agent_id: str = "dylan",
        conversation_scope_id: str,
    ) -> Optional[dict[str, Any]]:
        row = self.store.conn.execute(
            """
            SELECT * FROM agent_session
            WHERE agent_id = ? AND conversation_scope_id = ? AND status IN ('active', 'idle')
            ORDER BY last_active_at DESC LIMIT 1
            """,
            (agent_id, conversation_scope_id),
        ).fetchone()
        return dict(row) if row is not None else None

    def get(self, session_id: str) -> Optional[dict[str, Any]]:
        row = self.store.conn.execute(
            "SELECT * FROM agent_session WHERE session_id = ?",
            (session_id,),
        ).fetchone()
        return dict(row) if row is not None else None

    def list_sessions(self, *, agent_id: str = "dylan", limit: int = 20) -> list[dict[str, Any]]:
        rows = self.store.conn.execute(
            """
            SELECT * FROM agent_session
            WHERE agent_id = ?
            ORDER BY last_active_at DESC
            LIMIT ?
            """,
            (agent_id, limit),
        ).fetchall()
        return [dict(row) for row in rows]

    def create(
        self,
        *,
        agent_id: str = "dylan",
        provider: str = "cursor_cli",
        chat_id: str,
        conversation_scope_id: str,
        workspace_path: str,
        project_slug: str = "",
        user_id: str = "",
        soul_version: str = SOUL_VERSION,
        protocol_version: str = PROTOCOL_VERSION,
        provider_session_id: str = "",
    ) -> dict[str, Any]:
        session_id = f"sess_{uuid.uuid4().hex[:20]}"
        now = utc_now()
        self.store.conn.execute(
            """
            INSERT INTO agent_session(
                session_id, agent_id, provider, provider_session_id, chat_id, conversation_scope_id,
                user_id, project_slug, workspace_path, soul_version, protocol_version, status,
                created_at, last_active_at, failure_count, checkpoint_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, 0, NULL)
            """,
            (
                session_id,
                agent_id,
                provider,
                provider_session_id or None,
                chat_id,
                conversation_scope_id,
                user_id or None,
                project_slug or None,
                str(Path(workspace_path).expanduser().resolve()),
                soul_version,
                protocol_version,
                now,
                now,
            ),
        )
        self.store.conn.commit()
        return self.get(session_id) or {"session_id": session_id}

    def update(self, session_id: str, **fields: Any) -> None:
        allowed = {
            "provider_session_id",
            "status",
            "last_active_at",
            "expires_at",
            "last_trace_id",
            "last_request_id",
            "failure_count",
            "checkpoint_json",
            "project_slug",
            "workspace_path",
            "soul_version",
            "protocol_version",
        }
        sets = []
        values: list[Any] = []
        for key, value in fields.items():
            if key not in allowed:
                continue
            sets.append(f"{key} = ?")
            values.append(value)
        if not sets:
            return
        if "last_active_at" not in fields:
            sets.append("last_active_at = ?")
            values.append(utc_now())
        values.append(session_id)
        self.store.conn.execute(
            f"UPDATE agent_session SET {', '.join(sets)} WHERE session_id = ?",
            values,
        )
        self.store.conn.commit()

    def close_session(self, session_id: str) -> None:
        self.update(session_id, status="closed")

    def invalidate_provider(self, session_id: str) -> None:
        self.update(session_id, status="invalid", provider_session_id=None)

    def save_checkpoint(self, session_id: str, checkpoint: dict[str, Any]) -> None:
        self.update(session_id, checkpoint_json=json.dumps(checkpoint, ensure_ascii=False))
