#!/usr/bin/env python3
"""Prepare a delivery run: validate gates, update metadata, create worktrees."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from delivery_workspace import load_story_context, prepare_story_for_delivery


def main() -> int:
    parser = argparse.ArgumentParser(description="Prepare a Lumen delivery run.")
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    parser.add_argument("--json", action="store_true", help="Print machine-readable context")
    args = parser.parse_args()

    try:
        context = load_story_context(Path(args.docs_dir), args.story)
        messages = prepare_story_for_delivery(context)
        payload = {
            "docs_dir": str(context.docs_dir),
            "workspace_root": str(context.workspace_root),
            "story_dir": str(context.story_dir),
            "story_ref": context.story_dir.name,
            "branch_name": context.branch_name,
            "jira_key": context.metadata.get("jiraKey", ""),
            "repos": [
                {
                    "name": repo.name,
                    "path": str(repo.path),
                    "worktree_path": str(repo.worktree_path),
                    "default_branch": repo.default_branch,
                }
                for repo in context.repos
            ],
            "messages": messages,
        }
        if args.json:
            print(json.dumps(payload, indent=2, ensure_ascii=False))
        else:
            for message in messages:
                print(message)
    except (OSError, ValueError, FileNotFoundError, RuntimeError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
