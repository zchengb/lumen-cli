#!/usr/bin/env python3
"""Remove a completed Story's feature worktrees while retaining delivery history."""

from __future__ import annotations

import argparse
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

from delivery_workspace import load_story_context, read_json, write_json


def cleanup(docs_dir: Path, story_ref: str) -> list[str]:
    context = load_story_context(docs_dir, story_ref, validate_gates=False)
    messages: list[str] = []
    for repo in context.repos:
        target = repo.worktree_path
        if not target.exists():
            messages.append(f"{repo.name}: worktree already absent")
            continue
        remove = subprocess.run(
            ["git", "-C", str(repo.path), "worktree", "remove", "--force", str(target)],
            capture_output=True,
            text=True,
        )
        if remove.returncode != 0:
            detail = (remove.stderr or remove.stdout or "git worktree remove failed").strip()
            raise RuntimeError(f"{repo.name}: {detail}")
        subprocess.run(["git", "-C", str(repo.path), "worktree", "prune"], capture_output=True, text=True)
        messages.append(f"{repo.name}: removed {target}")

    metadata = read_json(context.metadata_path)
    metadata["deliveryWorktreesCleanedAt"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    write_json(context.metadata_path, metadata)
    return messages


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", required=True)
    args = parser.parse_args()
    try:
        for message in cleanup(Path(args.docs_dir), args.story):
            print(message)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
