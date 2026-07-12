#!/usr/bin/env python3
"""Persist a delivery failure result so notification and history remain complete."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path

from delivery_workspace import load_story_context, read_json, write_json


def now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    parser.add_argument("--result", required=True)
    parser.add_argument("--run-id", default="")
    parser.add_argument("--phase", default="")
    parser.add_argument("--message", required=True)
    args = parser.parse_args()

    result_path = Path(args.result).expanduser().resolve()
    payload = read_json(result_path, {})
    try:
        context = load_story_context(Path(args.docs_dir), args.story, validate_gates=False)
        payload.setdefault("docs_dir", str(context.docs_dir))
        payload.setdefault("workspace_root", str(context.workspace_root))
        payload.setdefault("story_id", context.metadata.get("storyId") or context.story_dir.name)
        payload.setdefault("story_path", str(context.story_dir.relative_to(context.docs_dir)))
        payload.setdefault("jira_key", context.metadata.get("jiraKey", ""))
        payload.setdefault("branch", context.branch_name)
        payload.setdefault("repos_touched", [{"name": repo.name} for repo in context.repos])
    except Exception:
        pass
    payload.setdefault("started_at", now())
    payload["finished_at"] = now()
    payload["run_id"] = args.run_id or payload.get("run_id", "")
    payload["delivery_status"] = "failed"
    failures = payload.get("failures") if isinstance(payload.get("failures"), list) else []
    failures.append({"stage": args.phase or "delivery", "detail": args.message})
    payload["failures"] = failures
    write_json(result_path, payload)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
