#!/usr/bin/env python3
"""Commit and push one Story's delivery metadata without touching other docs changes."""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

from delivery_workspace import load_story_context


def run_git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        check=False,
        capture_output=True,
        text=True,
    )


def failure_text(result: subprocess.CompletedProcess[str], fallback: str) -> str:
    return (result.stderr or result.stdout or fallback).strip()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    args = parser.parse_args()

    try:
        context = load_story_context(Path(args.docs_dir), args.story, validate_gates=False)
        metadata_path = context.metadata_path
        relative_metadata = metadata_path.relative_to(context.docs_dir)
        if not (context.docs_dir / ".git").exists():
            raise RuntimeError(f"Docs directory is not a Git repository: {context.docs_dir}")

        changed = run_git(context.docs_dir, "diff", "--quiet", "--", str(relative_metadata))
        staged = run_git(context.docs_dir, "diff", "--cached", "--quiet", "--", str(relative_metadata))
        if changed.returncode == 0 and staged.returncode == 0:
            print("skipped: metadata.json has no delivery changes")
            return 0
        if changed.returncode not in {0, 1} or staged.returncode not in {0, 1}:
            raise RuntimeError("Unable to inspect docs metadata change")

        added = run_git(context.docs_dir, "add", "--", str(relative_metadata))
        if added.returncode != 0:
            raise RuntimeError(failure_text(added, "git add metadata failed"))

        story_key = str(context.metadata.get("jiraKey") or context.metadata.get("storyId") or context.story_dir.name)
        subject = f"Update {story_key} delivery status"
        committed = run_git(context.docs_dir, "commit", "--only", "-m", subject, "--", str(relative_metadata))
        if committed.returncode != 0:
            raise RuntimeError(failure_text(committed, "git commit metadata failed"))

        branch = run_git(context.docs_dir, "branch", "--show-current")
        branch_name = branch.stdout.strip()
        if branch.returncode != 0 or not branch_name:
            raise RuntimeError(failure_text(branch, "Docs repository is not on a branch"))
        pushed = run_git(context.docs_dir, "push", "origin", f"HEAD:{branch_name}")
        if pushed.returncode != 0:
            raise RuntimeError(failure_text(pushed, "git push metadata failed"))

        sha = run_git(context.docs_dir, "rev-parse", "HEAD")
        print(f"committed: {sha.stdout.strip()} {subject}")
        return 0
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
