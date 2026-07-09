#!/usr/bin/env python3
"""Read and update the Lumen issue registry."""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

OPEN_STATUSES = {"open", "in_progress", "pr_open"}
RESOLVED_STATUSES = {"resolved", "accepted_risk", "false_positive"}


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


def load_registry(workspace: Path) -> dict[str, Any]:
    return load_json(registry_path(workspace), {"schema_version": "1.0", "issues": []})


def find_issue(registry: dict[str, Any], issue_id: str) -> dict[str, Any] | None:
    for issue in registry.get("issues", []):
        if not isinstance(issue, dict):
            continue
        if str(issue.get("id", "")) == issue_id:
            return issue
    return None


def issue_matches_status(issue: dict[str, Any], status_filter: str) -> bool:
    status = str(issue.get("status", "")).strip().lower()
    if status_filter == "all":
        return True
    if status_filter == "open":
        return status in OPEN_STATUSES
    if status_filter == "resolved":
        return status in RESOLVED_STATUSES
    if status_filter == "ignored":
        return status == "ignored"
    return status == status_filter


def list_issues(workspace: Path, status_filter: str = "open") -> list[dict[str, Any]]:
    registry = load_registry(workspace)
    issues = registry.get("issues", [])
    if not isinstance(issues, list):
        return []

    filtered: list[dict[str, Any]] = []
    for issue in issues:
        if not isinstance(issue, dict):
            continue
        if issue_matches_status(issue, status_filter):
            filtered.append(issue)

    filtered.sort(
        key=lambda item: (
            str(item.get("severity", "")),
            str(item.get("last_seen_at", "")),
            str(item.get("id", "")),
        ),
        reverse=True,
    )
    return filtered


def format_issue_table(issues: list[dict[str, Any]]) -> str:
    if not issues:
        return "No issues matched the filter."

    lines = [
        f"{'ID':<18} {'SEV':<8} {'STATUS':<12} {'REPOSITORY':<24} TITLE",
        "-" * 110,
    ]
    for issue in issues:
        title = str(issue.get("title", "")).replace("\n", " ")
        if len(title) > 48:
            title = title[:45] + "..."
        lines.append(
            f"{str(issue.get('id', '')):<18} "
            f"{str(issue.get('severity', '')):<8} "
            f"{str(issue.get('status', '')):<12} "
            f"{str(issue.get('repository', '')):<24} "
            f"{title}"
        )
    return "\n".join(lines)


def set_issue_status(
    workspace: Path,
    issue_id: str,
    status: str,
    reason: str = "",
) -> dict[str, Any]:
    path = registry_path(workspace)
    registry = load_registry(workspace)
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
    parser = argparse.ArgumentParser(description="Read and update the Lumen issue registry.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_parser = subparsers.add_parser("list", help="List tracked issues")
    list_parser.add_argument("workspace")
    list_parser.add_argument(
        "--status",
        default="open",
        choices=["open", "ignored", "resolved", "all"],
        help="Filter by issue status (default: open)",
    )
    list_parser.add_argument("--json", action="store_true")

    set_parser = subparsers.add_parser("set-status", help="Update issue status")
    set_parser.add_argument("workspace")
    set_parser.add_argument("issue_id")
    set_parser.add_argument("status")
    set_parser.add_argument("--reason", default="")

    args = parser.parse_args()
    workspace = Path(args.workspace).expanduser().resolve()

    try:
        if args.command == "list":
            issues = list_issues(workspace, args.status)
            if args.json:
                print(json.dumps({"workspace": str(workspace), "issues": issues}, indent=2, ensure_ascii=False))
            else:
                print(format_issue_table(issues))
            return 0
        if args.command == "set-status":
            issue = set_issue_status(workspace, args.issue_id, args.status, args.reason)
            print(json.dumps(issue, indent=2, ensure_ascii=False))
    except (OSError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
