#!/usr/bin/env python3
"""Fetch delivery docs and linked repositories without changing working trees."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Any

from delivery_workspace import load_story_context


def git_snapshot(path: Path) -> dict[str, Any]:
    status = subprocess.run(["git", "-C", str(path), "status", "--porcelain"], capture_output=True, text=True)
    fetch = subprocess.run(["git", "-C", str(path), "fetch", "--prune", "origin"], capture_output=True, text=True)
    return {
        "path": str(path),
        "dirty": bool(status.stdout.strip()) if status.returncode == 0 else None,
        "fetch": "ok" if fetch.returncode == 0 else "failed",
        "detail": (fetch.stderr or fetch.stdout).strip()[-500:] if fetch.returncode != 0 else "",
    }


def sync_workspace(docs_dir: Path, story_ref: str = "") -> int:
    try:
        context = load_story_context(docs_dir, story_ref, validate_gates=False)
        targets = [{"name": "docs", **git_snapshot(context.docs_dir)}]
        for repo in context.repos:
            targets.append({"name": repo.name, **git_snapshot(repo.path)})
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    print(json.dumps(targets, indent=2, ensure_ascii=False))
    return 1 if any(item["fetch"] == "failed" for item in targets) else 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    args = parser.parse_args()
    return sync_workspace(Path(args.docs_dir), args.story)


if __name__ == "__main__":
    raise SystemExit(main())
