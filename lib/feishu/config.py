from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Optional


def agents_home() -> Path:
    override = os.environ.get("LUMEN_AGENTS_HOME", "").strip()
    if override:
        path = Path(override).expanduser().resolve()
    else:
        path = Path.home() / ".lumen" / "agents"
    path.mkdir(parents=True, exist_ok=True)
    return path


def load_agents_config() -> dict[str, Any]:
    path = agents_home() / "config.json"
    if not path.is_file():
        return {"enabled": False}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {"enabled": False}
    except Exception:
        return {"enabled": False}


def agents_enabled(config: Optional[dict[str, Any]] = None) -> bool:
    data = config if config is not None else load_agents_config()
    env = os.environ.get("LUMEN_AGENTS_ENABLED", "").strip().casefold()
    if env in {"1", "true", "yes"}:
        return True
    if env in {"0", "false", "no"}:
        return False
    return bool(data.get("enabled"))
