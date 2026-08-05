from __future__ import annotations

import sqlite3
import time
from pathlib import Path


class MessageDeduper:
    def __init__(self, db_path: Path) -> None:
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    def _connect(self) -> sqlite3.Connection:
        return sqlite3.connect(str(self.db_path))

    def _init_db(self) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS seen_messages (
                    message_id TEXT PRIMARY KEY,
                    seen_at REAL NOT NULL
                )
                """
            )
            conn.commit()

    def seen(self, message_id: str) -> bool:
        key = str(message_id or "").strip()
        if not key:
            return False
        with self._connect() as conn:
            row = conn.execute(
                "SELECT 1 FROM seen_messages WHERE message_id = ?",
                (key,),
            ).fetchone()
        return row is not None

    def mark(self, message_id: str) -> bool:
        key = str(message_id or "").strip()
        if not key:
            return False
        with self._connect() as conn:
            try:
                conn.execute(
                    "INSERT INTO seen_messages(message_id, seen_at) VALUES (?, ?)",
                    (key, time.time()),
                )
                conn.commit()
                return True
            except sqlite3.IntegrityError:
                return False

    def claim(self, message_id: str) -> bool:
        return self.mark(message_id)
