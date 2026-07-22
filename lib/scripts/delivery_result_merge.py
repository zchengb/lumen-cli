#!/usr/bin/env python3
"""Merge delivery-result repos_touched across remediation rewrites."""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path
from typing import Any

from delivery_workspace import StoryContext, load_story_context, read_json, workspace_lumen_dir, write_json


def remediation_state_path(result_path: Path) -> Path:
    return result_path.with_name("delivery-remediation.json")


def run_git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        check=False,
        capture_output=True,
        text=True,
    )


def changed_files(repo: Path) -> list[str]:
    completed = run_git(repo, "status", "--porcelain")
    if completed.returncode != 0:
        return []
    files: list[str] = []
    for line in completed.stdout.splitlines():
        if len(line) >= 4:
            files.append(line[3:].split(" -> ")[-1])
    return files


def latest_branch_commit_subject(repo_path: Path, default_branch: str) -> str:
    completed = run_git(repo_path, "log", f"origin/{default_branch}..HEAD", "-n", "1", "--format=%s")
    if completed.returncode != 0:
        return ""
    return completed.stdout.strip()


def index_repos_touched(items: list[Any]) -> dict[str, dict[str, Any]]:
    indexed: dict[str, dict[str, Any]] = {}
    for item in items:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name", "")).strip()
        if name:
            indexed[name] = dict(item)
    return indexed


def merge_repos_touched(
    current: list[Any],
    baseline: list[Any],
    context: StoryContext | None = None,
) -> list[dict[str, Any]]:
    merged = index_repos_touched(baseline)
    for item in current or []:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name", "")).strip()
        if not name:
            continue
        if name not in merged:
            merged[name] = dict(item)
            continue
        combined = dict(merged[name])
        for key, value in item.items():
            if value in (None, "", []):
                continue
            combined[key] = value
        if not str(combined.get("commit_subject", "")).strip():
            subject = str(item.get("commit_subject", "")).strip() or str(merged[name].get("commit_subject", "")).strip()
            if subject:
                combined["commit_subject"] = subject
        merged[name] = combined

    if context is not None:
        order = [repo.name for repo in context.repos]
        for repo in context.repos:
            entry = merged.get(repo.name, {"name": repo.name})
            files = changed_files(repo.worktree_path)
            if files:
                entry["path"] = str(repo.worktree_path)
                entry["branch"] = context.branch_name
                entry["files_changed"] = files
            if not str(entry.get("commit_subject", "")).strip():
                subject = latest_branch_commit_subject(repo.worktree_path, repo.default_branch)
                if subject:
                    entry["commit_subject"] = subject
            if files or entry.get("commit_subject") or entry.get("files_changed"):
                merged[repo.name] = entry
    else:
        order = list(merged)

    return [merged[name] for name in order if name in merged]


def stabilize_delivery_result(
    result: dict[str, Any],
    context: StoryContext | None,
    result_path: Path,
) -> dict[str, Any]:
    if not str(result.get("run_id") or "").strip() and context is not None:
        progress = read_json(workspace_lumen_dir(context.workspace_root) / "results" / "delivery-progress.json", {})
        run_id = str(progress.get("run_id") or "").strip()
        if run_id:
            result["run_id"] = run_id
    remediation = read_json(remediation_state_path(result_path), {})
    snapshot = remediation.get("repos_touched_snapshot")
    baseline = snapshot if isinstance(snapshot, list) and snapshot else result.get("repos_touched") or []
    current = result.get("repos_touched") or []
    result["repos_touched"] = merge_repos_touched(current, baseline if isinstance(baseline, list) else [], context)
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--result", required=True)
    parser.add_argument("--docs-dir", default="")
    parser.add_argument("--story", default="")
    args = parser.parse_args()

    result_path = Path(args.result).expanduser().resolve()
    result = read_json(result_path)
    if not result:
        print(f"Error: delivery result not found or invalid: {result_path}", file=sys.stderr)
        return 1

    context = None
    if args.docs_dir:
        try:
            context = load_story_context(Path(args.docs_dir), args.story, validate_gates=False)
        except (OSError, ValueError) as exc:
            print(f"Warning: unable to load story context for merge: {exc}", file=sys.stderr)

    stabilized = stabilize_delivery_result(result, context, result_path)
    write_json(result_path, stabilized)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
