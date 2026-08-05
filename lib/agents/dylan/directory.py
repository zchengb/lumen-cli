from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Optional

_DIR_PATH = Path(__file__).resolve().parent.parent / "directory.json"
_CACHE: Optional[dict[str, Any]] = None


def load_directory() -> dict[str, Any]:
    global _CACHE
    if _CACHE is not None:
        return _CACHE
    try:
        data = json.loads(_DIR_PATH.read_text(encoding="utf-8"))
        _CACHE = data if isinstance(data, dict) else {}
    except Exception:
        _CACHE = {}
    return _CACHE


def get_agent_profile(agent_id: str) -> dict[str, Any]:
    data = load_directory()
    key = str(agent_id or "").strip().lower()
    profile = data.get(key)
    return dict(profile) if isinstance(profile, dict) else {}


def get_agent_relationship(agent_id: str, other_id: str) -> dict[str, Any]:
    left = get_agent_profile(agent_id)
    right = get_agent_profile(other_id)
    return {
        "self": {"id": agent_id, **left},
        "other": {"id": other_id, **right},
    }


def list_agent_capabilities(agent_id: str = "dylan") -> dict[str, Any]:
    profile = get_agent_profile(agent_id)
    return {
        "agent": agent_id,
        "profile": profile,
        "capabilities": [
            "scan.run",
            "scan.status",
            "risk.top",
            "risk.trend",
            "risk.recurring",
            "risk.overdue",
            "risk.explain",
            "weekly brief",
        ],
    }
