from __future__ import annotations

import threading
import time
from typing import Any, Optional

from agents.dylan.locales import t
from agents.dylan.schemas import TypingConfig
from feishu.messenger import FeishuMessenger, extract_message_id


class ThinkingSession:
    def __init__(
        self,
        *,
        messenger: FeishuMessenger,
        source_message_id: str,
        language: str,
        config: TypingConfig,
        reply_in_thread: bool = False,
    ) -> None:
        self.messenger = messenger
        self.source_message_id = source_message_id
        self.language = language
        self.config = config
        self.reply_in_thread = bool(reply_in_thread)
        self.placeholder_message_id = ""
        self.started_at = time.time()
        self.last_update_at = 0.0
        self.update_count = 0
        self.completed = False
        self._timer: Optional[threading.Timer] = None
        self._progress_timer: Optional[threading.Timer] = None
        self._long_timer: Optional[threading.Timer] = None
        self._lock = threading.Lock()
        self._started_placeholder = False

    def schedule_start(self) -> None:
        if not self.config.enabled or not self.source_message_id:
            return
        delay = max(self.config.delay_ms, 0) / 1000.0
        self._timer = threading.Timer(delay, self.start)
        self._timer.daemon = True
        self._timer.start()

    def start(self) -> None:
        with self._lock:
            if self.completed or self._started_placeholder or not self.source_message_id:
                return
            self._started_placeholder = True
        try:
            response = self.messenger.reply_text(
                self.source_message_id,
                t(self.language, "thinking_initial"),
                reply_in_thread=self.reply_in_thread,
            )
            self.placeholder_message_id = extract_message_id(response)
            self.last_update_at = time.time()
            self.update_count = 1
        except Exception:
            self.placeholder_message_id = ""
            return
        if self.placeholder_message_id:
            self._progress_timer = threading.Timer(self.config.progress_after_ms / 1000.0, lambda: self.update("risk"))
            self._progress_timer.daemon = True
            self._progress_timer.start()
            self._long_timer = threading.Timer(self.config.long_wait_after_ms / 1000.0, lambda: self.update("long"))
            self._long_timer.daemon = True
            self._long_timer.start()

    def update(self, stage: str) -> None:
        with self._lock:
            if self.completed or not self.placeholder_message_id:
                return
            if self.update_count >= self.config.max_updates:
                return
        key = "thinking_risk" if stage == "risk" else "thinking_long" if stage == "long" else "thinking_initial"
        if self.messenger.safe_update_text(self.placeholder_message_id, t(self.language, key)):
            self.last_update_at = time.time()
            self.update_count += 1

    def _cancel_timers(self) -> None:
        for timer in (self._timer, self._progress_timer, self._long_timer):
            if timer is not None:
                timer.cancel()

    def complete(self, final_text: str) -> dict[str, Any]:
        with self._lock:
            if self.completed:
                return {"mode": "already_completed"}
            self.completed = True
        self._cancel_timers()
        text = str(final_text or "").strip() or t(self.language, "no_risk_data")
        if self.placeholder_message_id:
            updated = self.messenger.safe_update_text(self.placeholder_message_id, text)
            if updated is not None:
                return {"mode": "updated", "placeholder_message_id": self.placeholder_message_id}
            try:
                self.messenger.reply_text(self.source_message_id, text, reply_in_thread=self.reply_in_thread)
                self.messenger.safe_update_text(self.placeholder_message_id, t(self.language, "completed_see_below"))
                return {"mode": "reply_fallback", "placeholder_message_id": self.placeholder_message_id}
            except Exception:
                return {"mode": "failed"}
        if self.source_message_id:
            try:
                response = self.messenger.reply_text(self.source_message_id, text, reply_in_thread=self.reply_in_thread)
                return {"mode": "direct_reply", "message_id": extract_message_id(response)}
            except Exception:
                return {"mode": "failed"}
        return {"mode": "no_target"}

    def fail(self, user_text: str) -> dict[str, Any]:
        return self.complete(user_text)
