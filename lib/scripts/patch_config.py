#!/usr/bin/env python3
"""Small Auto Patch configuration mutator used by the CLI and Dashboard."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("path")
    parser.add_argument("--enabled", choices=("true", "false"), required=True)
    parser.add_argument("--interval", type=int)
    args = parser.parse_args()
    path = Path(args.path).expanduser().resolve()
    data = json.loads(path.read_text(encoding="utf-8")) if path.is_file() else {}
    if args.enabled == "true":
        common_path = path.parent / "common.json"
        common = json.loads(common_path.read_text(encoding="utf-8")) if common_path.is_file() else {}
        jira = ((common.get("notifications") or {}).get("jira") or {}) if isinstance(common, dict) else {}
        if not str(jira.get("project_key") or "").strip():
            parser.error("shared Jira project key is required in config/common.json before enabling Auto Patch")
    patch = data.setdefault("automation", {}).setdefault("scheduled_auto_patch", {})
    patch["enabled"] = args.enabled == "true"
    if args.interval is not None:
        patch["poll_interval_minutes"] = max(1, args.interval)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
