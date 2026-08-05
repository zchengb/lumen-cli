from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Optional

from feishu.config import agents_home


def recent_run_path() -> Path:
    return agents_home() / "dylan-recent-run.json"


def save_recent_run(payload: dict[str, Any]) -> None:
    path = recent_run_path()
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def load_recent_run() -> Optional[dict[str, Any]]:
    path = recent_run_path()
    if not path.is_file():
        return None
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else None
    except Exception:
        return None


def scan_lock_exists(workspace: Path) -> bool:
    lock_dir = Path(workspace) / "state" / "run.lock"
    if not lock_dir.is_dir():
        return False
    pid_file = lock_dir / "pid"
    if not pid_file.is_file():
        return True
    try:
        pid = int(pid_file.read_text(encoding="utf-8").strip())
    except Exception:
        return True
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False
