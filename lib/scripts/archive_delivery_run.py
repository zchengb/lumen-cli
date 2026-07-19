#!/usr/bin/env python3
"""Archive a delivery result and progress snapshot without exposing secrets."""

from __future__ import annotations

import argparse
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from delivery_workspace import delivery_history_dir, read_json, workspace_lumen_dir, write_json


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace-root", required=True)
    parser.add_argument("--result", default="")
    parser.add_argument("--progress", default="")
    parser.add_argument("--log-file", default="")
    args = parser.parse_args()

    workspace_root = Path(args.workspace_root).expanduser().resolve()
    result = read_json(Path(args.result).expanduser().resolve(), {}) if args.result else {}
    progress = read_json(Path(args.progress).expanduser().resolve(), {}) if args.progress else {}
    run_id = str(result.get("run_id") or progress.get("run_id") or "").strip()
    if not run_id:
        run_id = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")

    payload: dict[str, Any] = {
        "run_id": run_id,
        "archived_at": utc_now(),
        "delivery": result,
        "progress": progress,
        "log_file": args.log_file,
    }
    trace = result.get("agent_trace") if isinstance(result.get("agent_trace"), dict) else {}
    trace_source = workspace_lumen_dir(workspace_root) / str(trace.get("path") or "")
    if trace_source.is_dir():
        trace_target = delivery_history_dir(workspace_root) / run_id / "agent-trace"
        shutil.copytree(trace_source, trace_target, dirs_exist_ok=True)
        payload["agent_trace_path"] = str(trace_target)
    target = delivery_history_dir(workspace_root) / f"{run_id}.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    write_json(target, payload)
    print(target)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
