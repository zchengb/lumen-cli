from __future__ import annotations

import threading
import uuid
from typing import Any, Optional

from risk.store import GlobalAgentStore, utc_now


class ConversationJobStore:
    def __init__(self, store: Optional[GlobalAgentStore] = None) -> None:
        self._owned = store is None
        self.store = store or GlobalAgentStore()

    def close(self) -> None:
        if self._owned:
            self.store.close()

    def get_by_message_id(self, message_id: str) -> Optional[dict[str, Any]]:
        row = self.store.conn.execute(
            "SELECT * FROM conversation_job WHERE message_id = ?",
            (message_id,),
        ).fetchone()
        return dict(row) if row is not None else None

    def create(self, payload: dict[str, Any]) -> dict[str, Any]:
        job_id = str(payload.get("id") or uuid.uuid4().hex)
        now = utc_now()
        self.store.conn.execute(
            """
            INSERT INTO conversation_job(
                id, message_id, chat_id, thread_id, user_id, project_slug, state, intent,
                placeholder_message_id, started_at, updated_at, completed_at, error_code, error_detail
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL)
            """,
            (
                job_id,
                payload["message_id"],
                payload.get("chat_id"),
                payload.get("thread_id"),
                payload.get("user_id"),
                payload.get("project_slug"),
                payload.get("state", "received"),
                payload.get("intent"),
                payload.get("placeholder_message_id"),
                now,
                now,
            ),
        )
        self.store.conn.commit()
        return self.get_by_message_id(str(payload["message_id"])) or {"id": job_id}

    def update(self, message_id: str, **fields: Any) -> None:
        allowed = {
            "state",
            "intent",
            "project_slug",
            "placeholder_message_id",
            "completed_at",
            "error_code",
            "error_detail",
        }
        sets = []
        values: list[Any] = []
        for key, value in fields.items():
            if key not in allowed:
                continue
            sets.append(f"{key} = ?")
            values.append(value)
        sets.append("updated_at = ?")
        values.append(utc_now())
        values.append(message_id)
        self.store.conn.execute(
            f"UPDATE conversation_job SET {', '.join(sets)} WHERE message_id = ?",
            values,
        )
        self.store.conn.commit()

    def active_for_scope(self, chat_id: str, thread_id: str) -> Optional[dict[str, Any]]:
        row = self.store.conn.execute(
            """
            SELECT * FROM conversation_job
            WHERE chat_id = ? AND COALESCE(thread_id, '') = ?
              AND state NOT IN ('completed', 'failed', 'timed_out')
            ORDER BY started_at DESC LIMIT 1
            """,
            (chat_id, thread_id or ""),
        ).fetchone()
        return dict(row) if row is not None else None


class ScopeLockManager:
    def __init__(self) -> None:
        self._locks: dict[str, threading.Lock] = {}
        self._guard = threading.Lock()

    def lock_for(self, chat_id: str, thread_id: str) -> threading.Lock:
        key = f"{chat_id}::{thread_id or ''}"
        with self._guard:
            if key not in self._locks:
                self._locks[key] = threading.Lock()
            return self._locks[key]
