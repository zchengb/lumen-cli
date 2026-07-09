#!/usr/bin/env python3
"""Write a delivery.started payload for notification."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from delivery_workspace import load_story_context


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("docs_dir")
    parser.add_argument("output")
    parser.add_argument("--story", default="")
    args = parser.parse_args()

    context = load_story_context(Path(args.docs_dir), args.story)
    payload = {
        "delivery_status": "in_progress",
        "docs_dir": str(context.docs_dir),
        "workspace_root": str(context.workspace_root),
        "story_id": context.metadata.get("storyId") or context.story_dir.name,
        "story_path": str(context.story_dir.relative_to(context.docs_dir)),
        "jira_key": context.metadata.get("jiraKey", ""),
        "branch": context.branch_name,
        "repos_touched": [{"name": repo.name} for repo in context.repos],
        "pr_urls": [],
        "verification_results": [],
    }
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
