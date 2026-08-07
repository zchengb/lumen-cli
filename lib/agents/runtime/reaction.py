from __future__ import annotations

from typing import Any, Optional

from agents.runtime.observability import Observability, TraceContext
from feishu.messenger import FeishuMessenger
from risk.store import utc_now


class ReactionThinkingSession:
    def __init__(
        self,
        *,
        messenger: FeishuMessenger,
        source_message_id: str,
        emoji_type: str,
        trace: TraceContext,
        obs: Observability,
        enabled: bool = True,
        remove_on_success: bool = True,
        remove_on_failure: bool = True,
    ) -> None:
        self.messenger = messenger
        self.source_message_id = source_message_id
        self.emoji_type = emoji_type or "Typing"
        self.trace = trace
        self.obs = obs
        self.enabled = enabled
        self.remove_on_success = remove_on_success
        self.remove_on_failure = remove_on_failure
        self.reaction_id = ""
        self.add_status = "skipped"
        self.remove_status = "skipped"
        self.add_attempts = 0
        self.remove_attempts = 0
        self.last_error = ""

    def start(self) -> None:
        if not self.enabled or not self.source_message_id:
            return
        self.obs.emit(self.trace, "reaction.add.started", emoji_type=self.emoji_type)
        self.add_attempts += 1
        try:
            response = self.messenger.safe_add_reaction(self.source_message_id, self.emoji_type)
            reaction_id = ""
            if isinstance(response, dict):
                data = response.get("data") if isinstance(response.get("data"), dict) else {}
                reaction_id = str(
                    response.get("reaction_id")
                    or data.get("reaction_id")
                    or (data.get("reaction") or {}).get("reaction_id")
                    or ""
                )
            self.reaction_id = reaction_id
            self.add_status = "succeeded" if reaction_id or response is not None else "failed"
            self.obs.emit(
                self.trace,
                "reaction.add.succeeded" if self.add_status == "succeeded" else "reaction.add.failed",
                reaction_id=self.reaction_id,
                emoji_type=self.emoji_type,
            )
            self.obs.record_reaction(
                self.trace,
                source_message_id=self.source_message_id,
                reaction_id=self.reaction_id,
                emoji_type=self.emoji_type,
                status="active" if self.add_status == "succeeded" else "add_failed",
                add_attempts=self.add_attempts,
                added_at=utc_now(),
                last_error="" if self.add_status == "succeeded" else "add_failed",
            )
            self.obs.upsert_trace(self.trace, reaction_status=self.add_status)
        except Exception as exc:
            self.add_status = "failed"
            self.last_error = str(exc)[:200]
            self.obs.emit(self.trace, "reaction.add.failed", error=self.last_error, level="WARN")

    def finish(self, *, success: bool) -> None:
        should_remove = self.remove_on_success if success else self.remove_on_failure
        if not should_remove or not self.reaction_id:
            return
        self.obs.emit(self.trace, "reaction.remove.started", reaction_id=self.reaction_id)
        self.remove_attempts += 1
        try:
            result = self.messenger.safe_delete_reaction(self.source_message_id, self.reaction_id)
            self.remove_status = "succeeded" if result is not None else "failed"
            self.obs.emit(
                self.trace,
                "reaction.remove.succeeded" if self.remove_status == "succeeded" else "reaction.remove.failed",
                reaction_id=self.reaction_id,
            )
            self.obs.record_reaction(
                self.trace,
                source_message_id=self.source_message_id,
                reaction_id=self.reaction_id,
                emoji_type=self.emoji_type,
                status="removed" if self.remove_status == "succeeded" else "remove_failed",
                add_attempts=self.add_attempts,
                remove_attempts=self.remove_attempts,
                removed_at=utc_now() if self.remove_status == "succeeded" else None,
                last_error="" if self.remove_status == "succeeded" else "remove_failed",
            )
            self.obs.upsert_trace(self.trace, reaction_status=self.remove_status)
        except Exception as exc:
            self.remove_status = "failed"
            self.last_error = str(exc)[:200]
            self.obs.emit(self.trace, "reaction.remove.failed", error=self.last_error, level="WARN")
