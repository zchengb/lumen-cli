#!/usr/bin/env python3
"""Manage macOS launchd timers for Lumen delivery polling."""

from __future__ import annotations

import argparse
import json
import os
import plistlib
import subprocess
import sys
from pathlib import Path


def interval_minutes_from_cron(expression: str) -> int | None:
    parts = expression.strip().split()
    if len(parts) != 5 or parts[1:] != ["*", "*", "*", "*"]:
        return None
    minute = parts[0]
    if not minute.startswith("*/"):
        return None
    try:
        value = int(minute[2:])
    except ValueError:
        return None
    return value if value > 0 else None


def label_for(slug: str) -> str:
    return f"com.lumen.delivery.{slug}"


def plist_path(label: str) -> Path:
    return Path.home() / "Library" / "LaunchAgents" / f"{label}.plist"


def launchctl(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["launchctl", *args], capture_output=True, text=True, check=False)


def install(args: argparse.Namespace) -> int:
    interval = interval_minutes_from_cron(args.cron)
    if interval is None:
        print("Error: launchd supports delivery schedules of the form '*/N * * * *'.", file=sys.stderr)
        return 1
    label = label_for(args.project)
    path = plist_path(label)
    path.parent.mkdir(parents=True, exist_ok=True)
    environment = {
        "PATH": args.path,
        "HOME": str(Path.home()),
        "LUMEN_HOME": args.lumen_home,
        "AGENT_CLI_CREDENTIAL_STORE": "file",
    }
    payload = {
        "Label": label,
        "ProgramArguments": [
            args.lumen_bin,
            "delivery",
            "schedule",
            "run",
            "--project",
            args.project,
            "--jira-status",
            args.jira_status,
        ],
        "EnvironmentVariables": environment,
        "StartInterval": interval * 60,
        "StandardOutPath": args.log_file,
        "StandardErrorPath": args.log_file,
        "ProcessType": "Background",
        "RunAtLoad": False,
    }
    path.write_bytes(plistlib.dumps(payload, fmt=plistlib.FMT_XML, sort_keys=False))
    domain = f"gui/{os.getuid()}"
    launchctl("bootout", domain, str(path))
    loaded = launchctl("bootstrap", domain, str(path))
    if loaded.returncode != 0:
        detail = (loaded.stderr or loaded.stdout or "launchctl bootstrap failed").strip()
        print(f"Error: {detail}", file=sys.stderr)
        return 1
    print(path)
    return 0


def remove(args: argparse.Namespace) -> int:
    label = label_for(args.project)
    path = plist_path(label)
    launchctl("bootout", f"gui/{os.getuid()}", str(path))
    if path.exists():
        path.unlink()
    return 0


def status(args: argparse.Namespace) -> int:
    path = plist_path(label_for(args.project))
    if not path.exists():
        print("")
        return 0
    payload: dict = {}
    try:
        payload = plistlib.loads(path.read_bytes())
        interval = int(payload.get("StartInterval") or 0)
    except (OSError, ValueError, plistlib.InvalidFileException):
        interval = 0
    arguments = payload.get("ProgramArguments") if isinstance(payload, dict) else []
    jira_status = ""
    if isinstance(arguments, list):
        try:
            jira_status = str(arguments[arguments.index("--jira-status") + 1])
        except (ValueError, IndexError):
            pass
    print(json.dumps({"path": str(path), "interval_seconds": interval, "jira_status": jira_status}))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    add = subparsers.add_parser("add")
    add.add_argument("--project", required=True)
    add.add_argument("--cron", required=True)
    add.add_argument("--jira-status", required=True)
    add.add_argument("--lumen-bin", required=True)
    add.add_argument("--lumen-home", required=True)
    add.add_argument("--path", required=True)
    add.add_argument("--log-file", required=True)
    remove_parser = subparsers.add_parser("remove")
    remove_parser.add_argument("--project", required=True)
    status_parser = subparsers.add_parser("status")
    status_parser.add_argument("--project", required=True)
    args = parser.parse_args()
    return {"add": install, "remove": remove, "status": status}[args.command](args)


if __name__ == "__main__":
    raise SystemExit(main())
