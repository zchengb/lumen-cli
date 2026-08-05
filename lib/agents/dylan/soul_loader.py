from __future__ import annotations

from pathlib import Path


def load_soul() -> str:
    path = Path(__file__).resolve().parent / "soul.md"
    if path.is_file():
        return path.read_text(encoding="utf-8").strip()
    return "Dylan is an Engineering Risk Analyst. Be precise and evidence-based."
