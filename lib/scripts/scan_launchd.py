#!/usr/bin/env python3
"""Manage macOS launchd timers for Lumen scans."""

from __future__ import annotations

import argparse
import json
import os
import plistlib
import re
import subprocess
import sys
from pathlib import Path
from typing import Any


def launchd_schedule_from_cron(expression: str) -> tuple[dict[str, Any], str] | None:
    parts = expression.strip().split()
    if len(parts) != 5:
        return None
    minute, hour, day, month, weekday = parts
    if (match := re.fullmatch(r"\*/([1-9][0-9]*)", minute)) and [hour, day, month, weekday] == ["*", "*", "*", "*"]:
        minutes = int(match.group(1))
        return {"StartInterval": minutes * 60}, f"every {minutes} minutes"
    if not (minute.isdigit() and hour.isdigit() and day == "*" and month == "*"):
        return None
    if not (0 <= int(minute) <= 59 and 0 <= int(hour) <= 23):
        return None
    base = {"Minute": int(minute), "Hour": int(hour)}
    if weekday == "*":
        return {"StartCalendarInterval": base}, f"daily at {int(hour):02d}:{int(minute):02d}"
    if weekday == "1-5":
        # launchd uses 1=Monday through 5=Friday.
        return {"StartCalendarInterval": [{**base, "Weekday": value} for value in range(1, 6)]}, f"weekdays at {int(hour):02d}:{int(minute):02d}"
    return None


def label_for(slug: str) -> str:
    return f"com.lumen.scan.{slug}"


def plist_path(label: str) -> Path:
    return Path.home() / "Library" / "LaunchAgents" / f"{label}.plist"


def launchctl(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["launchctl", *args], capture_output=True, text=True, check=False)


def install(args: argparse.Namespace) -> int:
    parsed = launchd_schedule_from_cron(args.cron)
    if parsed is None:
        print("Error: unsupported launchd scan schedule. Use */N * * * *, M H * * *, or M H * * 1-5.", file=sys.stderr)
        return 1
    timing, description = parsed
    label = label_for(args.project)
    path = plist_path(label)
    path.parent.mkdir(parents=True, exist_ok=True)
    arguments = [args.lumen_bin, "scan", "--project", args.project]
    if args.dry_run:
        arguments.append("--dry-run")
    payload: dict[str, Any] = {
        "Label": label,
        "ProgramArguments": arguments,
        "EnvironmentVariables": {
            "PATH": args.path,
            "HOME": str(Path.home()),
            "LUMEN_HOME": args.lumen_home,
            "AGENT_CLI_CREDENTIAL_STORE": "file",
        },
        "StandardOutPath": args.log_file,
        "StandardErrorPath": args.log_file,
        "ProcessType": "Background",
        "RunAtLoad": False,
        **timing,
    }
    path.write_bytes(plistlib.dumps(payload, fmt=plistlib.FMT_XML, sort_keys=False))
    domain = f"gui/{os.getuid()}"
    launchctl("bootout", domain, str(path))
    loaded = launchctl("bootstrap", domain, str(path))
    if loaded.returncode != 0:
        print(f"Error: {(loaded.stderr or loaded.stdout or 'launchctl bootstrap failed').strip()}", file=sys.stderr)
        return 1
    print(json.dumps({"path": str(path), "description": description}))
    return 0


def remove(args: argparse.Namespace) -> int:
    path = plist_path(label_for(args.project))
    launchctl("bootout", f"gui/{os.getuid()}", str(path))
    if path.exists():
        path.unlink()
    return 0


def status(args: argparse.Namespace) -> int:
    path = plist_path(label_for(args.project))
    if not path.exists():
        print("")
        return 0
    try:
        payload = plistlib.loads(path.read_bytes())
        if "StartInterval" in payload:
            description = f"every {int(payload['StartInterval']) // 60} minutes"
        else:
            calendar = payload.get("StartCalendarInterval", {})
            if isinstance(calendar, list):
                description = f"weekdays at {calendar[0]['Hour']:02d}:{calendar[0]['Minute']:02d}"
            else:
                description = f"daily at {calendar['Hour']:02d}:{calendar['Minute']:02d}"
    except (OSError, ValueError, KeyError, TypeError, plistlib.InvalidFileException):
        description = "launchd schedule"
    print(json.dumps({"path": str(path), "description": description}))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    add = subparsers.add_parser("add")
    add.add_argument("--project", required=True)
    add.add_argument("--cron", required=True)
    add.add_argument("--lumen-bin", required=True)
    add.add_argument("--lumen-home", required=True)
    add.add_argument("--path", required=True)
    add.add_argument("--log-file", required=True)
    add.add_argument("--dry-run", action="store_true")
    remove_parser = subparsers.add_parser("remove")
    remove_parser.add_argument("--project", required=True)
    status_parser = subparsers.add_parser("status")
    status_parser.add_argument("--project", required=True)
    args = parser.parse_args()
    return {"add": install, "remove": remove, "status": status}[args.command](args)


if __name__ == "__main__":
    raise SystemExit(main())
