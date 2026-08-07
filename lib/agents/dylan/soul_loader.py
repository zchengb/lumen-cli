from __future__ import annotations

from agents.soul_store import load_agent_soul


def load_soul() -> str:
    text, _source = load_agent_soul("dylan")
    if text.strip():
        return text.strip()
    return "Dylan is an Engineering Risk Analyst. Be precise and evidence-based."
