#!/usr/bin/env python3
"""Create delivery commits, push feature branches, and open one PR per repository."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from delivery_workspace import delivery_config_path, load_story_context, read_json, write_json


def run_git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        check=False,
        capture_output=True,
        text=True,
    )


def run_gh(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["gh", *args],
        cwd=str(repo),
        check=False,
        capture_output=True,
        text=True,
    )


def failure_text(result: subprocess.CompletedProcess[str], fallback: str) -> str:
    return (result.stderr or result.stdout or fallback).strip()


def changed_files(repo: Path) -> list[str]:
    completed = run_git(repo, "status", "--porcelain")
    if completed.returncode != 0:
        raise RuntimeError(failure_text(completed, "Unable to inspect worktree"))
    files: list[str] = []
    for line in completed.stdout.splitlines():
        if len(line) >= 4:
            files.append(line[3:].split(" -> ")[-1])
    return files


def branch_has_commits(repo: Path, base: str) -> bool:
    completed = run_git(repo, "rev-list", "--count", f"origin/{base}..HEAD")
    if completed.returncode != 0:
        raise RuntimeError(failure_text(completed, "Unable to compare feature branch with base"))
    return int(completed.stdout.strip() or "0") > 0


def commit_subject(result: dict[str, Any], repo_name: str) -> str:
    for item in result.get("repos_touched") or []:
        if isinstance(item, dict) and str(item.get("name", "")) == repo_name:
            subject = str(item.get("commit_subject", "")).strip()
            if subject:
                return subject
    raise RuntimeError(
        f"Agent did not provide commit_subject for {repo_name}. "
        "It must inspect repository history and record a matching subject."
    )


def ensure_branch(repo: Path, branch: str) -> None:
    completed = run_git(repo, "branch", "--show-current")
    current = completed.stdout.strip()
    if completed.returncode != 0 or current != branch:
        raise RuntimeError(f"Expected feature branch {branch}, found {current or 'detached HEAD'}")


def commit_changes(repo: Path, subject: str) -> str:
    added = run_git(repo, "add", "-A")
    if added.returncode != 0:
        raise RuntimeError(failure_text(added, "git add failed"))
    committed = run_git(repo, "commit", "-m", subject)
    if committed.returncode != 0:
        raise RuntimeError(failure_text(committed, "git commit failed"))
    sha = run_git(repo, "rev-parse", "HEAD")
    if sha.returncode != 0:
        raise RuntimeError(failure_text(sha, "Unable to read commit SHA"))
    return sha.stdout.strip()


def existing_pr_url(repo: Path, branch: str) -> str:
    completed = run_gh(repo, "pr", "view", "--head", branch, "--json", "url", "--jq", ".url")
    return completed.stdout.strip() if completed.returncode == 0 else ""


def open_pr(repo: Path, branch: str, base: str, title: str, body: str) -> str:
    pushed = run_git(repo, "push", "--no-verify", "-u", "origin", branch)
    if pushed.returncode != 0:
        raise RuntimeError(failure_text(pushed, "git push failed"))
    existing = existing_pr_url(repo, branch)
    if existing:
        return existing
    created = run_gh(
        repo,
        "pr",
        "create",
        "--base",
        base,
        "--head",
        branch,
        "--title",
        title,
        "--body",
        body,
    )
    if created.returncode != 0:
        raise RuntimeError(failure_text(created, "gh pr create failed"))
    url = created.stdout.strip()
    if not url:
        raise RuntimeError("gh pr create completed without returning a URL")
    return url


def merge_pr(repo: Path, url: str) -> None:
    merged = run_gh(repo, "pr", "merge", url, "--merge", "--delete-branch")
    if merged.returncode != 0:
        raise RuntimeError(failure_text(merged, "gh pr merge failed"))


def update_result(path: Path, payload: dict[str, Any]) -> None:
    payload["finished_at"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    write_json(path, payload)


def visual_pr_summary(result: dict[str, Any]) -> str:
    visual = result.get("visual_verification")
    if not isinstance(visual, dict):
        return ""
    lines = ["\n\n## Visual Verification\n", "| Screen | State | Platform | Result | Difference |", "|---|---|---|---|---|"]
    for item in visual.get("results", []):
        if not isinstance(item, dict):
            continue
        ratio = item.get("difference_ratio")
        difference = f"{float(ratio):.2%}" if isinstance(ratio, (int, float)) else "N/A"
        lines.append(
            f"| {item.get('screen', '')} | {item.get('state', '')} | {item.get('platform', '')} | "
            f"{str(item.get('status', '')).title()} | {difference} |"
        )
    lines.append("\nReference, implementation, and diff images are retained in Lumen delivery history.")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    parser.add_argument("--result", required=True)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    result_path = Path(args.result).expanduser().resolve()
    result = read_json(result_path)
    if not result:
        print(f"Error: delivery result not found or invalid: {result_path}", file=sys.stderr)
        return 1

    try:
        context = load_story_context(Path(args.docs_dir), args.story, validate_gates=False)
        config = read_json(delivery_config_path(context.workspace_root), {})
        publish = config.get("publish") if isinstance(config.get("publish"), dict) else {}
        publish_mode = str(publish.get("mode", "pr")).strip().lower() or "pr"
        if publish_mode not in {"pr", "merge"}:
            raise RuntimeError("Delivery publish mode must be 'pr' or 'merge'")
        if str(result.get("delivery_status", "")).strip() not in {"completed", "ready_for_finalize"}:
            raise RuntimeError("Agent result must be completed or ready_for_finalize before finalization")
        commits: list[dict[str, str]] = []
        pr_urls: list[str] = []
        touched: list[dict[str, Any]] = []
        body = (
            f"Story: {context.metadata.get('title') or context.story_dir.name}\n\n"
            f"JIRA: {context.metadata.get('jiraUrl') or context.metadata.get('jiraKey') or 'Not linked'}\n\n"
            "Verification is recorded by Lumen in the delivery result."
        ) + visual_pr_summary(result)

        for repo in context.repos:
            ensure_branch(repo.worktree_path, context.branch_name)
            files = changed_files(repo.worktree_path)
            item: dict[str, Any] = {
                "name": repo.name,
                "path": str(repo.worktree_path),
                "branch": context.branch_name,
                "files_changed": files,
            }
            subject = commit_subject(result, repo.name) if files else ""
            if files:
                sha = commit_changes(repo.worktree_path, subject)
                commits.append({"repository": repo.name, "sha": sha, "subject": subject})
                item["commit_subject"] = subject
            else:
                head = run_git(repo.worktree_path, "rev-parse", "HEAD")
                if head.returncode == 0:
                    item["existing_head"] = head.stdout.strip()

            if not branch_has_commits(repo.worktree_path, repo.default_branch):
                item["publish_status"] = "skipped"
                item["publish_reason"] = "No commits differ from the base branch"
                touched.append(item)
                continue

            if args.dry_run:
                item["pr_url"] = "(dry-run)"
                item["publish_status"] = "dry_run"
            else:
                pr_title = subject or f"{context.metadata.get('jiraKey') or context.story_dir.name}: delivery"
                url = open_pr(repo.worktree_path, context.branch_name, repo.default_branch, pr_title, body)
                item["pr_url"] = url
                item["publish_status"] = "pr_open"
                pr_urls.append(url)
                if publish_mode == "merge":
                    merge_pr(repo.worktree_path, url)
                    item["merged"] = True
                    item["publish_status"] = "merged"
            touched.append(item)

        result["repos_touched"] = touched
        result["commits"] = commits
        result["pr_urls"] = pr_urls
        result["publish_mode"] = publish_mode
        result["delivery_status"] = "completed"
        update_result(result_path, result)
        print(json.dumps({"commits": commits, "pr_urls": pr_urls}, indent=2, ensure_ascii=False))
        return 0
    except Exception as exc:
        failures = result.get("failures") if isinstance(result.get("failures"), list) else []
        failures.append({"stage": "finalize", "detail": str(exc)})
        result["failures"] = failures
        result["delivery_status"] = "blocked"
        update_result(result_path, result)
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
