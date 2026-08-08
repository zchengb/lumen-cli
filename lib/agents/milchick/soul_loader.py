from __future__ import annotations

from agents.soul_store import load_agent_soul


def load_soul() -> str:
    text, _source = load_agent_soul("milchick")
    return text
