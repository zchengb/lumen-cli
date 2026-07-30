#!/usr/bin/env python3
"""Run one Auto Patch cycle and record bounded scheduler activity."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

from delivery_workspace import workspace_lumen_dir


def record(workspace: Path, outcome: str, message: str) -> None:
    path = workspace_lumen_dir(workspace) / "state" / "patch-scheduler-activity.jsonl"
    path.parent.mkdir(parents=True, exist_ok=True)
    lines = path.read_text(encoding="utf-8", errors="replace").splitlines() if path.is_file() else []
    at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    lines = [*lines[-199:], json.dumps({"at": at, "outcome": outcome, "message": message}, ensure_ascii=False)]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workspace")
    parser.add_argument("--jira-key", default="")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    command = [sys.executable, str(Path(__file__).with_name("patch_runner.py")), args.workspace]
    if args.jira_key:
        command.extend(["--jira-key", args.jira_key])
    if args.dry_run:
        command.append("--dry-run")
    completed = subprocess.run(command, check=False)
    root = Path(args.workspace).expanduser().resolve()
    result_path = workspace_lumen_dir(root) / "results" / "patch-result.json"
    try:
        result = json.loads(result_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        result = {}
    outcome = str(result.get("patch_status") or ("completed" if completed.returncode == 0 else "failed"))
    record(root, outcome, f"Auto Patch cycle exited with {completed.returncode}")
    return completed.returncode


if __name__ == "__main__":
    raise SystemExit(main())
