from __future__ import annotations

from typing import Any, Optional


def is_chat_allowed(chat_id: str, config: Optional[dict[str, Any]] = None) -> bool:
    data = config if isinstance(config, dict) else {}
    agents = data.get("agents") if isinstance(data.get("agents"), dict) else data
    allow = agents.get("allowed_chat_ids") if isinstance(agents, dict) else None
    if not allow:
        return True
    if not isinstance(allow, list):
        return True
    allowed = {str(item).strip() for item in allow if str(item).strip()}
    if not allowed:
        return True
    return str(chat_id or "").strip() in allowed
