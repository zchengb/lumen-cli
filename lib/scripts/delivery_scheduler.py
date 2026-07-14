#!/usr/bin/env python3
"""Select one delivery-ready Story and invoke the normal Lumen delivery runner."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any

from delivery_workspace import workspace_lumen_dir
from jira_sync import parse_twg_json, run_twg, twg_ready


def normalized(value: Any) -> str:
    return str(value or "").strip().casefold()


def story_candidates(docs_dir: Path) -> list[tuple[Path, dict[str, Any]]]:
    stories_dir = docs_dir / "stories"
    if not stories_dir.is_dir():
        return []
    candidates: list[tuple[Path, dict[str, Any]]] = []
    for story_dir in sorted(path for path in stories_dir.iterdir() if path.is_dir()):
        metadata_path = story_dir / "metadata.json"
        try:
            metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        if not isinstance(metadata, dict):
            continue
        if normalized(metadata.get("businessStatus")) != "ready":
            continue
        if normalized(metadata.get("technicalStatus")) != "approved":
            continue
        if normalized(metadata.get("deliveryStatus")) not in {"", "not_started", "blocked"}:
            continue
        if not str(metadata.get("jiraKey") or "").strip():
            continue
        candidates.append((story_dir, metadata))
    return candidates


def current_jira_status(jira_key: str) -> str:
    ready, reason = twg_ready()
    if not ready:
        raise RuntimeError(reason)
    code, output = run_twg(["jira", "workitem", "get", jira_key, "-o", "json"])
    if code != 0:
        raise RuntimeError((output or f"Unable to read JIRA {jira_key}").strip()[-500:])
    payload = parse_twg_json(output) or {}
    data = payload.get("data") if isinstance(payload, dict) else {}
    if isinstance(data, list):
        data = data[0] if data else {}
    if isinstance(data, dict) and isinstance(data.get("items"), list) and data["items"]:
        item = data["items"][0]
        data = item.get("data", item) if isinstance(item, dict) else {}
    status = data.get("status") if isinstance(data, dict) else {}
    if isinstance(status, dict):
        return str(status.get("name") or "").strip()
    return str(status or "").strip()


def sync_docs_checkout(docs_dir: Path) -> None:
    status = subprocess.run(["git", "-C", str(docs_dir), "status", "--porcelain"], capture_output=True, text=True)
    if status.returncode != 0:
        raise RuntimeError(f"Docs directory is not a git repository: {docs_dir}")
    if status.stdout.strip():
        raise RuntimeError("Docs workspace has uncommitted changes; scheduled delivery will not pull or run")
    pull = subprocess.run(["git", "-C", str(docs_dir), "pull", "--ff-only"], capture_output=True, text=True)
    if pull.returncode != 0:
        raise RuntimeError((pull.stderr or pull.stdout or "git pull --ff-only failed").strip()[-500:])


def delivery_lock_exists(docs_dir: Path) -> bool:
    return (workspace_lumen_dir(docs_dir) / "locks" / "delivery-run").is_dir()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--docs-dir", required=True)
    parser.add_argument("--jira-status", default="Ready for Dev")
    parser.add_argument("--lumen-bin", default="lumen")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    docs_dir = Path(args.docs_dir).expanduser().resolve()
    if not docs_dir.is_dir():
        print(f"Error: docs directory not found: {docs_dir}", file=sys.stderr)
        return 1
    if delivery_lock_exists(docs_dir):
        print("Delivery already running; scheduler skipped this poll.")
        return 0
    try:
        sync_docs_checkout(docs_dir)
    except RuntimeError as exc:
        print(f"Scheduler skipped: {exc}")
        return 0

    expected_status = normalized(args.jira_status)
    for story_dir, metadata in story_candidates(docs_dir):
        jira_key = str(metadata.get("jiraKey")).strip()
        try:
            status = current_jira_status(jira_key)
        except RuntimeError as exc:
            print(f"Scheduler skipped {jira_key}: {exc}")
            return 0
        if normalized(status) != expected_status:
            print(f"Skipped {jira_key}: JIRA status is '{status}', expected '{args.jira_status}'.")
            continue

        lumen_bin = shutil.which(args.lumen_bin) if "/" not in args.lumen_bin else args.lumen_bin
        if not lumen_bin:
            print(f"Error: lumen executable not found: {args.lumen_bin}", file=sys.stderr)
            return 1
        command = [str(lumen_bin), "delivery", "run", str(docs_dir), "--story", story_dir.name]
        if args.dry_run:
            command.append("--dry-run")
        print(f"Starting scheduled delivery for {jira_key}: {story_dir.name}")
        return subprocess.run(command, check=False).returncode

    print("No eligible delivery Story found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
