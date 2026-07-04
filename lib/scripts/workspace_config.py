#!/usr/bin/env python3
"""Read and update workspace configuration values in config/common.json."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

DEFAULT_SCAN_WINDOW_DAYS = 7
MIN_SCAN_WINDOW_DAYS = 1
MAX_SCAN_WINDOW_DAYS = 365


def common_json_path(workspace: Path) -> Path:
    return workspace / "config" / "common.json"


def load_common(workspace: Path) -> dict:
    path = common_json_path(workspace)
    if not path.is_file():
        raise FileNotFoundError(f"Workspace config not found: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def save_common(workspace: Path, common: dict) -> None:
    path = common_json_path(workspace)
    path.write_text(json.dumps(common, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def get_scan_window_days(workspace: Path) -> int:
    common = load_common(workspace)
    value = common.get("execution", {}).get("scan_window_days", DEFAULT_SCAN_WINDOW_DAYS)
    try:
        days = int(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"Invalid scan_window_days in common.json: {value!r}") from exc
    return days


def set_scan_window_days(workspace: Path, days: int) -> int:
    if days < MIN_SCAN_WINDOW_DAYS or days > MAX_SCAN_WINDOW_DAYS:
        raise ValueError(
            f"Scan window must be between {MIN_SCAN_WINDOW_DAYS} and {MAX_SCAN_WINDOW_DAYS} days."
        )
    common = load_common(workspace)
    execution = common.setdefault("execution", {})
    execution["scan_window_days"] = days
    save_common(workspace, common)
    return days


def read_webhook_url(workspace: Path) -> str | None:
    env_file = workspace / ".env.local"
    if not env_file.is_file():
        return None
    for line in env_file.read_text(encoding="utf-8").splitlines():
        match = re.match(r'^FEISHU_WEBHOOK_URL=(?:"([^"]*)"|\'([^\']*)\'|(\S+))', line.strip())
        if match:
            return next(group for group in match.groups() if group is not None)
    return None


def mask_webhook(url: str) -> str:
    if len(url) <= 16:
        return "[set]"
    return f"{url[:12]}...{url[-4:]}"


def cmd_show(workspace: Path) -> int:
    common_path = common_json_path(workspace)
    print(f"Workspace: {workspace}")
    print(f"Config file: {common_path}")
    print()

    try:
        common = load_common(workspace)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    execution = common.get("execution", {})
    project = common.get("project", {})
    scan_window = execution.get("scan_window_days", DEFAULT_SCAN_WINDOW_DAYS)
    model = execution.get("model", "")
    display_name = project.get("display_name", "")

    print(f"project.display_name: {display_name or '(not set)'}")
    print(f"execution.scan_window_days: {scan_window}")
    if model:
        print(f"execution.model: {model}")

    webhook = read_webhook_url(workspace)
    env_file = workspace / ".env.local"
    print()
    if webhook:
        print(f"FEISHU_WEBHOOK_URL: {mask_webhook(webhook)}  ({env_file})")
    else:
        print(f"FEISHU_WEBHOOK_URL: (not set)  ({env_file})")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Lumen workspace configuration helper")
    subparsers = parser.add_subparsers(dest="command", required=True)

    show_parser = subparsers.add_parser("show", help="Print workspace configuration summary")
    show_parser.add_argument("workspace")

    get_parser = subparsers.add_parser("get-scan-window", help="Print scan_window_days")
    get_parser.add_argument("workspace")

    set_parser = subparsers.add_parser("set-scan-window", help="Set scan_window_days")
    set_parser.add_argument("workspace")
    set_parser.add_argument("days", type=int)

    args = parser.parse_args()
    workspace = Path(args.workspace).expanduser().resolve()

    try:
        if args.command == "show":
            return cmd_show(workspace)
        if args.command == "get-scan-window":
            print(get_scan_window_days(workspace))
            return 0
        if args.command == "set-scan-window":
            days = set_scan_window_days(workspace, args.days)
            print(days)
            return 0
    except FileNotFoundError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    except ValueError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
