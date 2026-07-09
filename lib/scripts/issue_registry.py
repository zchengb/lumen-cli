#!/usr/bin/env python3
"""Read and update the Lumen issue registry."""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def load_json(path: Path, default: Any) -> Any:
    if not path.is_file():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return default


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def registry_path(workspace: Path) -> Path:
    common = load_json(workspace / "config" / "common.json", {})
    paths = common.get("paths", {}) if isinstance(common.get("paths"), dict) else {}
    relative = str(paths.get("issue_registry", "state/issue-registry.json"))
    return workspace / relative


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def find_issue(registry: dict[str, Any], issue_id: str) -> dict[str, Any] | None:
    for issue in registry.get("issues", []):
        if not isinstance(issue, dict):
            continue
        if str(issue.get("id", "")) == issue_id:
            return issue
    return None


def set_issue_status(
    workspace: Path,
    issue_id: str,
    status: str,
    reason: str = "",
) -> dict[str, Any]:
    path = registry_path(workspace)
    registry = load_json(path, {"schema_version": "1.0", "issues": []})
    issue = find_issue(registry, issue_id)
    if issue is None:
        raise ValueError(f"Issue not found: {issue_id}")

    issue["status"] = status
    issue["last_seen_at"] = utc_now()
    if status == "ignored":
        issue["ignored_at"] = utc_now()
        if reason:
            issue["ignore_reason"] = reason
    if status == "resolved":
        issue["resolved_at"] = utc_now()
        if reason:
            issue["resolution_reason"] = reason

    registry["updated_at"] = utc_now()
    write_json(path, registry)
    return issue


def main() -> int:
    parser = argparse.ArgumentParser(description="Update Lumen issue registry.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    set_parser = subparsers.add_parser("set-status")
    set_parser.add_argument("workspace")
    set_parser.add_argument("issue_id")
    set_parser.add_argument("status")
    set_parser.add_argument("--reason", default="")

    args = parser.parse_args()
    workspace = Path(args.workspace).expanduser().resolve()

    try:
        if args.command == "set-status":
            issue = set_issue_status(workspace, args.issue_id, args.status, args.reason)
            print(json.dumps(issue, indent=2, ensure_ascii=False))
    except (OSError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
