#!/usr/bin/env python3
"""Prepare isolated Lumen scan worktrees: remove stale trees, recreate, pull latest."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from datetime import date, timedelta
from pathlib import Path
from typing import Any

DEFAULT_SCAN_WINDOW_DAYS = 7


def load_json(path: Path, default: Any) -> Any:
    if not path.is_file():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return default


def run_git(repo_path: Path, args: list[str], check: bool = True) -> subprocess.CompletedProcess[str]:
    completed = subprocess.run(
        ["git", "-C", str(repo_path), *args],
        check=False,
        capture_output=True,
        text=True,
    )
    if check and completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "git command failed").strip()
        raise RuntimeError(detail)
    return completed


def get_scan_window_days(workspace: Path) -> int:
    common = load_json(workspace / "config" / "common.json", {})
    execution = common.get("execution", {}) if isinstance(common.get("execution"), dict) else {}
    try:
        days = int(execution.get("scan_window_days", DEFAULT_SCAN_WINDOW_DAYS))
    except (TypeError, ValueError):
        days = DEFAULT_SCAN_WINDOW_DAYS
    if days < 1:
        days = 1
    return days


def resolve_shallow_since(workspace: Path, override: str | None = None) -> str:
    if override:
        return override.strip()
    days = get_scan_window_days(workspace)
    return (date.today() - timedelta(days=days)).isoformat()


def fetch_origin_branch(repo_path: Path, branch: str, shallow_since: str) -> None:
    shallow = run_git(
        repo_path,
        ["fetch", f"--shallow-since={shallow_since}", "origin", branch],
        check=False,
    )
    if shallow.returncode == 0:
        return

    fallback = run_git(repo_path, ["fetch", "origin", branch], check=False)
    if fallback.returncode != 0:
        run_git(repo_path, ["fetch", "origin"], check=False)


def worktree_registered(repo_path: Path, worktree_path: Path) -> bool:
    completed = run_git(repo_path, ["worktree", "list", "--porcelain"], check=False)
    if completed.returncode != 0:
        return False
    target = str(worktree_path.resolve())
    for line in completed.stdout.splitlines():
        if line.startswith("worktree "):
            listed = line[len("worktree ") :].strip()
            if listed == target:
                return True
    return False


def remove_worktree(repo_path: Path, worktree_path: Path) -> str:
    if worktree_path.exists() or worktree_registered(repo_path, worktree_path):
        completed = run_git(
            repo_path,
            ["worktree", "remove", "--force", str(worktree_path)],
            check=False,
        )
        if completed.returncode != 0 and worktree_path.exists():
            shutil.rmtree(worktree_path, ignore_errors=True)
        run_git(repo_path, ["worktree", "prune"], check=False)
        return "removed"
    if worktree_path.exists():
        shutil.rmtree(worktree_path, ignore_errors=True)
        return "removed_untracked_directory"
    return "absent"


def remote_branch_ref(repo_path: Path, branch: str, shallow_since: str) -> str:
    fetch_origin_branch(repo_path, branch, shallow_since)
    verify = run_git(repo_path, ["rev-parse", "--verify", f"origin/{branch}"], check=False)
    if verify.returncode == 0:
        return f"origin/{branch}"
    verify_local = run_git(repo_path, ["rev-parse", "--verify", branch], check=False)
    if verify_local.returncode == 0:
        return branch
    raise RuntimeError(f"branch not found locally or on origin: {branch}")


def refresh_worktree(
    repo_path: Path,
    worktree_path: Path,
    branch: str,
    shallow_since: str,
) -> str:
    if not (repo_path / ".git").exists():
        raise RuntimeError(f"not a git repository: {repo_path}")

    previous = remove_worktree(repo_path, worktree_path)
    worktree_path.parent.mkdir(parents=True, exist_ok=True)
    ref = remote_branch_ref(repo_path, branch, shallow_since)
    add = run_git(
        repo_path,
        ["worktree", "add", "--force", str(worktree_path), ref],
        check=False,
    )
    if add.returncode != 0:
        raise RuntimeError((add.stderr or add.stdout or "worktree add failed").strip())

    if ref.startswith("origin/"):
        sync = run_git(worktree_path, ["reset", "--hard", ref], check=False)
        if sync.returncode != 0:
            run_git(worktree_path, ["checkout", "--detach", ref], check=False)

    head = run_git(worktree_path, ["rev-parse", "--short", "HEAD"], check=False)
    revision = head.stdout.strip() if head.returncode == 0 else "unknown"
    return f"{previous} -> refreshed at {revision} (shallow since {shallow_since})"


def refresh_workspace(
    workspace: Path,
    remove_only: bool = False,
    shallow_since: str | None = None,
) -> list[dict[str, Any]]:
    common = load_json(workspace / "config" / "common.json", {})
    repos_config = load_json(workspace / "config" / "repos.json", {"repositories": []})
    paths = common.get("paths", {}) if isinstance(common.get("paths"), dict) else {}
    worktrees_dir = workspace / str(paths.get("worktrees_dir", "worktrees"))
    worktrees_dir.mkdir(parents=True, exist_ok=True)
    resolved_shallow_since = resolve_shallow_since(workspace, shallow_since)

    results: list[dict[str, Any]] = []
    repositories = repos_config.get("repositories", [])
    if not isinstance(repositories, list):
        repositories = []

    for repo in repositories:
        if not isinstance(repo, dict):
            continue
        name = str(repo.get("name", "")).strip()
        repo_path = Path(str(repo.get("path", "")).strip()).expanduser()
        branch = str(repo.get("default_branch", "main")).strip() or "main"
        worktree_path = worktrees_dir / name
        if not name or not repo_path.is_dir():
            results.append(
                {
                    "repository": name or "unknown",
                    "status": "skipped",
                    "detail": f"repository path not found: {repo_path}",
                }
            )
            continue
        try:
            if remove_only:
                detail = remove_worktree(repo_path, worktree_path)
                status = "removed"
            else:
                detail = refresh_worktree(repo_path, worktree_path, branch, resolved_shallow_since)
                status = "ready"
            results.append(
                {
                    "repository": name,
                    "status": status,
                    "worktree_path": str(worktree_path),
                    "branch": branch,
                    "shallow_since": resolved_shallow_since,
                    "detail": detail,
                }
            )
        except (OSError, RuntimeError) as exc:
            results.append(
                {
                    "repository": name,
                    "status": "failed",
                    "worktree_path": str(worktree_path),
                    "branch": branch,
                    "detail": str(exc),
                }
            )
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description="Prepare Lumen scan worktrees.")
    parser.add_argument("command", choices=["refresh", "remove"])
    parser.add_argument("workspace")
    parser.add_argument(
        "--shallow-since",
        help="Limit fetch depth (YYYY-MM-DD). Defaults to today minus execution.scan_window_days.",
    )
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    workspace = Path(args.workspace).expanduser().resolve()
    if not workspace.is_dir():
        print(f"Error: workspace not found: {workspace}", file=sys.stderr)
        return 1

    results = refresh_workspace(
        workspace,
        remove_only=args.command == "remove",
        shallow_since=args.shallow_since,
    )
    failed = [item for item in results if item.get("status") == "failed"]
    payload = {
        "workspace": str(workspace),
        "shallow_since": resolve_shallow_since(workspace, args.shallow_since),
        "results": results,
    }

    if args.json:
        print(json.dumps(payload, indent=2, ensure_ascii=False))
    else:
        print(
            f"[worktrees] shallow fetch since {payload['shallow_since']}",
            flush=True,
        )
        for item in results:
            icon = {"ready": "✓", "removed": "-", "failed": "✗", "skipped": "○"}.get(
                str(item.get("status", "")),
                "?",
            )
            print(
                f"[worktrees] {icon} {item.get('repository', '')}: {item.get('detail', '')}",
                flush=True,
            )

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
