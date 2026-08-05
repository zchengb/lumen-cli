from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Optional


@dataclass
class TriggerContext:
    source: str = "cli"
    app_id: str = ""
    agent_id: str = ""
    user_id: str = ""
    chat_id: str = ""
    thread_id: str = ""
    message_id: str = ""
    chat_type: str = ""
    extra: dict[str, Any] = field(default_factory=dict)


@dataclass
class RunContext:
    run_id: str
    workflow: str
    project: str = ""
    jira_key: str = ""
    story_key: str = ""
    owner_agent: str = ""
    origin_agent: str = ""
    trigger: Optional[TriggerContext] = None
    params: dict[str, Any] = field(default_factory=dict)
