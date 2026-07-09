#!/usr/bin/env python3
"""Generate a mock delivery result for dry runs."""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from delivery_workspace import delivery_result_path, ensure_workspace_lumen_dirs, load_story_context


def main() -> int:
    if len(sys.argv) not in {2, 3, 4}:
        print("Usage: dry_run_delivery.py <docs-dir> [story-ref] [run-id]", file=sys.stderr)
        return 1

    docs_dir = Path(sys.argv[1])
    story_ref = sys.argv[2] if len(sys.argv) >= 3 else ""
    run_id = sys.argv[3] if len(sys.argv) >= 4 else datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")

    try:
        context = load_story_context(docs_dir, story_ref)
    except (OSError, ValueError, FileNotFoundError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    result = {
        "delivery_status": "completed",
        "dry_run": True,
        "docs_dir": str(context.docs_dir),
        "workspace_root": str(context.workspace_root),
        "story_id": context.metadata.get("storyId") or context.story_dir.name,
        "story_path": str(context.story_dir.relative_to(context.docs_dir)),
        "jira_key": context.metadata.get("jiraKey", ""),
        "branch": context.branch_name,
        "repos_touched": [
            {
                "name": repo.name,
                "path": str(repo.path),
                "branch": context.branch_name,
                "files_changed": ["(dry-run)"],
            }
            for repo in context.repos
        ],
        "commits": [],
        "pr_urls": [],
        "verification_results": [
            {
                "repository": repo.name,
                "command": "(dry-run)",
                "exit_code": 0,
                "summary": "Skipped in dry run",
            }
            for repo in context.repos
        ],
        "failures": [],
        "started_at": now,
        "finished_at": now,
        "run_id": run_id,
    }

    ensure_workspace_lumen_dirs(context.workspace_root)
    output_path = delivery_result_path(context.workspace_root)
    with output_path.open("w", encoding="utf-8") as handle:
        json.dump(result, handle, indent=2, ensure_ascii=False)
        handle.write("\n")
    print(str(output_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
