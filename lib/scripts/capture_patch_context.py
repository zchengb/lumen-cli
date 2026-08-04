#!/usr/bin/env python3
"""Capture a Jira workitem and a bounded set of related workitems for Auto Patch."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from jira_sync import parse_twg_json, run_twg, site_args
from patch_runtime import get_workitem, jira_config, jira_fields, jira_key, jira_summary, workspace_lumen_dir


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def nested_keys(value: Any) -> list[str]:
    found: list[str] = []
    if isinstance(value, dict):
        for key, item in value.items():
            lowered = key.casefold()
            if lowered in {"parent", "parentissue", "parentkey", "issuelinks", "linkedissues", "subtasks", "children", "duplicates", "duplicatedby"}:
                found.extend(extract_keys(item))
            found.extend(nested_keys(item))
    elif isinstance(value, list):
        for item in value:
            found.extend(nested_keys(item))
    return found


def extract_keys(value: Any) -> list[str]:
    text = json.dumps(value, ensure_ascii=False) if not isinstance(value, str) else value
    return sorted(set(re.findall(r"\b[A-Z][A-Z0-9_]+-\d+\b", text)))


def related_candidates(workspace: Path, item: dict[str, Any]) -> list[str]:
    keys = [key for key in nested_keys(item) if key != jira_key(item)]
    keys.extend(key for key in extract_keys(item) if key != jira_key(item))
    summary = jira_summary(item)
    project = str(jira_config(workspace).get("project_key") or "").strip()
    ignored = {"after", "auto", "bug", "error", "fix", "issue", "legacy", "lumen", "migration", "task"}
    words = []
    for word in re.findall(r"[A-Za-z0-9_-]{4,}", summary):
        if word.casefold() in ignored or word.casefold() in {entry.casefold() for entry in words}:
            continue
        words.append(word)
    words = words[:6]
    if project and words:
        clauses = " OR ".join('text ~ "' + word.replace('"', '') + '"' for word in words)
        current_key = jira_key(item)
        exclude = f" AND key != {current_key}" if current_key else ""
        jql = f"project = {project}{exclude} AND ({clauses}) ORDER BY updated DESC"
        code, output = run_twg(["jira", "workitem", "query", "--jql", jql, "--limit", "10", "-o", "json", *site_args(jira_config(workspace))])
        if code == 0:
            payload = parse_twg_json(output) or {}
            data = payload.get("data", payload) if isinstance(payload, dict) else payload
            issues = data.get("issues", []) if isinstance(data, dict) else data
            if isinstance(issues, list):
                keys.extend(str(entry.get("key") or "").strip().upper() for entry in issues if isinstance(entry, dict))
    return sorted({key for key in keys if re.fullmatch(r"[A-Z][A-Z0-9_]+-\d+", key) and key != jira_key(item)})[:10]


def capture(workspace: Path, key: str) -> Path:
    item = get_workitem(workspace, key)
    related = []
    for related_key in related_candidates(workspace, item):
        try:
            related.append(get_workitem(workspace, related_key))
        except RuntimeError as exc:
            related.append({"key": related_key, "capture_error": str(exc)})
    payload = {
        "schema_version": "1.0",
        "captured_at": utc_now(),
        "jira_key": jira_key(item) or key,
        "workitem": item,
        "related_workitems": related,
        "related_keys": [jira_key(entry) or str(entry.get("key") or "") for entry in related if isinstance(entry, dict)],
    }
    path = workspace_lumen_dir(workspace) / "context" / "patch" / f"{key}.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workspace")
    parser.add_argument("--jira-key", required=True)
    args = parser.parse_args()
    try:
        path = capture(Path(args.workspace).expanduser().resolve(), args.jira_key.strip().upper())
    except (OSError, RuntimeError, ValueError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    print(json.dumps({"path": str(path)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
