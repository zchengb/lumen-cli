from __future__ import annotations

import threading
import time
from typing import Any, Callable, Optional


CATCHUP_SECONDS = 12.0
CATCHUP_DEBOUNCE_SECONDS = 1.5
STALE_SKEW_SECONDS = 3.0


def message_create_time(message: dict[str, Any] | None) -> float:
    if not isinstance(message, dict):
        return 0.0
    raw = message.get("create_time") or message.get("create_time_ms") or ""
    try:
        value = float(str(raw).strip())
    except Exception:
        return 0.0
    if value > 1e12:
        value /= 1000.0
    return value if value > 0 else 0.0


def is_outdated_message(*, create_time: float, started_at: float, now: float | None = None) -> bool:
    if create_time <= 0:
        return False
    boot = float(started_at or 0.0)
    if boot <= 0:
        return False
    return create_time < (boot - STALE_SKEW_SECONDS)


class StartupCatchup:
    def __init__(
        self,
        *,
        started_at: float | None = None,
        on_flush: Callable[[dict[str, Any], Any], None],
        mark_seen: Callable[[str], None] | None = None,
        catchup_seconds: float = CATCHUP_SECONDS,
        debounce_seconds: float = CATCHUP_DEBOUNCE_SECONDS,
    ) -> None:
        self.started_at = float(started_at if started_at is not None else time.time())
        self.on_flush = on_flush
        self.mark_seen = mark_seen
        self.catchup_seconds = float(catchup_seconds)
        self.debounce_seconds = float(debounce_seconds)
        self._lock = threading.Lock()
        self._buffers: dict[tuple[str, str], dict[str, Any]] = {}
        self._timers: dict[tuple[str, str], threading.Timer] = {}

    def in_catchup(self, now: float | None = None) -> bool:
        stamp = time.time() if now is None else float(now)
        return (stamp - self.started_at) < self.catchup_seconds

    def offer(
        self,
        *,
        agent_id: str,
        chat_id: str,
        message_id: str,
        create_time: float,
        event: dict[str, Any],
        client: Any,
        now: float | None = None,
    ) -> str:
        stamp = time.time() if now is None else float(now)
        if not self.in_catchup(stamp):
            if is_outdated_message(create_time=create_time, started_at=self.started_at, now=stamp):
                self._see(message_id)
                return "outdated"
            return "pass"
        key = (str(agent_id or "").strip().lower(), str(chat_id or message_id or "").strip())
        with self._lock:
            prev = self._buffers.get(key)
            incoming_ts = float(create_time or 0.0)
            if prev is not None and incoming_ts < float(prev.get("create_time") or 0.0):
                self._see(message_id)
                return "catchup_drop"
            if prev is not None:
                prev_id = str(prev.get("message_id") or "").strip()
                if prev_id and prev_id != message_id:
                    self._see(prev_id)
            self._buffers[key] = {
                "event": event,
                "client": client,
                "message_id": message_id,
                "create_time": incoming_ts,
            }
            old = self._timers.pop(key, None)
            if old is not None:
                old.cancel()
            timer = threading.Timer(self.debounce_seconds, self._flush, args=(key,))
            timer.daemon = True
            self._timers[key] = timer
            timer.start()
        return "catchup_buffer"

    def _see(self, message_id: str) -> None:
        mid = str(message_id or "").strip()
        if not mid or self.mark_seen is None:
            return
        try:
            self.mark_seen(mid)
        except Exception:
            pass

    def _flush(self, key: tuple[str, str]) -> None:
        with self._lock:
            item = self._buffers.pop(key, None)
            self._timers.pop(key, None)
        if not item:
            return
        event = item.get("event")
        client = item.get("client")
        if not isinstance(event, dict) or client is None:
            return
        self.on_flush(event, client)
