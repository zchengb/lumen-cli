from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Optional


@dataclass
class NotificationEvent:
    event_type: str
    workflow: str
    owner_agent: str = ""
    run_id: str = ""
    summary: str = ""
    card: Optional[dict[str, Any]] = None
    webhook_url: str = ""
    source_message_id: str = ""
    chat_id: str = ""
    thread_id: str = ""
    reply_message_id: str = ""
    dry_run: bool = False
    skip: bool = False
    skip_detail: str = ""
    meta: dict[str, Any] = field(default_factory=dict)
