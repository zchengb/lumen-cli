from __future__ import annotations

import threading
import time
from typing import Optional

from agents.runtime.observability import Observability
from feishu.messenger import FeishuMessenger
from risk.store import utc_now

_CLEANUP_THREAD: Optional[threading.Thread] = None
_STOP = threading.Event()
_MAX_REMOVE_ATTEMPTS = 5


def cleanup_stale_reactions(*, older_than_seconds: int = 120, messenger: Optional[FeishuMessenger] = None) -> int:
    obs = Observability()
    cleaned = 0
    try:
        rows = obs.list_stale_reactions(older_than_seconds=older_than_seconds)
        if not rows:
            return 0
        msg = messenger or FeishuMessenger("dylan")
        for row in rows:
            reaction_id = str(row.get("reaction_id") or "").strip()
            source_id = str(row.get("source_message_id") or "").strip()
            if not reaction_id or not source_id:
                continue
            attempts = int(row.get("remove_attempts") or 0)
            if attempts >= _MAX_REMOVE_ATTEMPTS:
                obs.store.conn.execute(
                    """
                    UPDATE reaction_session
                    SET status = 'abandoned', removed_at = ?, last_error = ?,
                        remove_attempts = COALESCE(remove_attempts, 0)
                    WHERE id = ?
                    """,
                    (utc_now(), f"abandoned after {attempts} remove attempts", row["id"]),
                )
                obs.store.conn.commit()
                continue
            result = msg.safe_delete_reaction(source_id, reaction_id)
            if result is not None:
                obs.store.conn.execute(
                    """
                    UPDATE reaction_session
                    SET status = 'removed', removed_at = ?, remove_attempts = COALESCE(remove_attempts, 0) + 1
                    WHERE id = ?
                    """,
                    (utc_now(), row["id"]),
                )
                obs.store.conn.commit()
                cleaned += 1
            else:
                obs.store.conn.execute(
                    """
                    UPDATE reaction_session
                    SET status = 'remove_failed',
                        remove_attempts = COALESCE(remove_attempts, 0) + 1,
                        last_error = 'delete_reaction failed'
                    WHERE id = ?
                    """,
                    (row["id"],),
                )
                obs.store.conn.commit()
                # ponytail: pause after a failed delete so we don't burn ephemeral ports
                time.sleep(2)
    finally:
        obs.close()
    return cleaned


def start_reaction_cleanup_worker(*, interval_seconds: int = 300, older_than_seconds: int = 120) -> None:
    global _CLEANUP_THREAD
    if _CLEANUP_THREAD is not None and _CLEANUP_THREAD.is_alive():
        return

    def _loop() -> None:
        while not _STOP.wait(interval_seconds):
            try:
                cleanup_stale_reactions(older_than_seconds=older_than_seconds)
            except Exception:
                pass

    _STOP.clear()
    _CLEANUP_THREAD = threading.Thread(target=_loop, name="dylan-reaction-cleanup", daemon=True)
    _CLEANUP_THREAD.start()


def stop_reaction_cleanup_worker() -> None:
    _STOP.set()
