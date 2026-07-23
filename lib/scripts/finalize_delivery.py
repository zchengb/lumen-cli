#!/usr/bin/env python3
"""Create delivery commits and publish them by PR, merge, or direct push."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from delivery_result_merge import stabilize_delivery_result
from delivery_workspace import delivery_config_path, load_story_context, read_json, write_json

PUBLISH_RETRY_ATTEMPTS = 3
PUBLISH_RETRY_DELAYS_SECONDS = (2, 5)


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


def command_failure(repo_name: str, stage: str, command: str, result: subprocess.CompletedProcess[str], fallback: str) -> str:
    output = failure_text(result, fallback)
    return f"{repo_name}: {stage} failed ({command}): {output}"


def changed_files(repo: Path) -> list[str]:
    completed = run_git(repo, "status", "--porcelain")
    if completed.returncode != 0:
        raise RuntimeError(failure_text(completed, "Unable to inspect worktree"))
    files: list[str] = []
    for line in completed.stdout.splitlines():
        if len(line) >= 4:
            files.append(line[3:].split(" -> ")[-1])
    return files


def branch_has_commits(repo: Path, base: str, repo_name: str = "", base_ref: str = "") -> bool:
    repo_name = repo_name or repo.name
    comparison = base_ref or f"origin/{base}"
    completed = run_git(repo, "rev-list", "--count", f"{comparison}..HEAD")
    if completed.returncode != 0:
        raise RuntimeError(
            command_failure(
                repo_name,
                "compare branch",
                f"git rev-list --count {comparison}..HEAD",
                completed,
                f"Unable to compare feature branch with origin/{base}",
            )
        )
    return int(completed.stdout.strip() or "0") > 0


def commit_subject(result: dict[str, Any], repo_name: str) -> str:
    for item in result.get("repos_touched") or []:
        if isinstance(item, dict) and str(item.get("name", "")) == repo_name:
            subject = str(item.get("commit_subject", "")).strip()
            if subject:
                return subject
    raise RuntimeError(
        f"{repo_name}: Agent did not provide commit_subject in delivery-result.json. "
        "Remediation must preserve commit_subject entries for every repository with changes."
    )


def ensure_branch(repo: Path, branch: str, repo_name: str) -> None:
    completed = run_git(repo, "branch", "--show-current")
    current = completed.stdout.strip()
    if completed.returncode != 0 or current != branch:
        raise RuntimeError(f"{repo_name}: expected feature branch {branch}, found {current or 'detached HEAD'}")


def commit_changes(repo: Path, subject: str, repo_name: str) -> str:
    added = run_git(repo, "add", "-A")
    if added.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "git add", "git add -A", added, "git add failed"))
    committed = run_git(repo, "commit", "-m", subject)
    if committed.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "git commit", f"git commit -m {subject!r}", committed, "git commit failed"))
    sha = run_git(repo, "rev-parse", "HEAD")
    if sha.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "read commit", "git rev-parse HEAD", sha, "Unable to read commit SHA"))
    return sha.stdout.strip()


def existing_pr_url(repo: Path, branch: str) -> str:
    completed = run_gh(repo, "pr", "list", "--head", branch, "--json", "url", "--jq", ".[0].url")
    if completed.returncode != 0:
        return ""
    return completed.stdout.strip()


def publish_retriable(message: str) -> bool:
    lowered = message.casefold()
    markers = (
        "timeout",
        "timed out",
        "connection reset",
        "connection refused",
        "temporarily unavailable",
        "503",
        "502",
        "504",
        "429",
        "rate limit",
        "eof",
        "broken pipe",
        "network",
        "internal server error",
    )
    return any(marker in lowered for marker in markers)


def open_pr(repo: Path, branch: str, base: str, title: str, body: str, repo_name: str) -> str:
    pushed = run_git(repo, "push", "--no-verify", "-u", "origin", branch)
    if pushed.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "git push", f"git push -u origin {branch}", pushed, "git push failed"))
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
        output = failure_text(created, "gh pr create failed")
        if "already exists" in output.casefold():
            existing = existing_pr_url(repo, branch)
            if existing:
                return existing
        raise RuntimeError(command_failure(repo_name, "gh pr create", f"gh pr create --base {base} --head {branch}", created, "gh pr create failed"))
    url = created.stdout.strip()
    if not url:
        raise RuntimeError(f"{repo_name}: gh pr create completed without returning a URL")
    return url


def open_pr_with_retry(repo: Path, branch: str, base: str, title: str, body: str, repo_name: str) -> str:
    last_error = ""
    for attempt in range(1, PUBLISH_RETRY_ATTEMPTS + 1):
        try:
            return open_pr(repo, branch, base, title, body, repo_name)
        except RuntimeError as exc:
            last_error = str(exc)
            if attempt >= PUBLISH_RETRY_ATTEMPTS or not publish_retriable(last_error):
                break
            delay = PUBLISH_RETRY_DELAYS_SECONDS[min(attempt - 1, len(PUBLISH_RETRY_DELAYS_SECONDS) - 1)]
            print(
                f"Warning: {repo_name}: publish attempt {attempt}/{PUBLISH_RETRY_ATTEMPTS} failed; retrying in {delay}s",
                file=sys.stderr,
            )
            print(last_error, file=sys.stderr)
            time.sleep(delay)
    raise RuntimeError(f"{repo_name}: publish failed after {PUBLISH_RETRY_ATTEMPTS} attempt(s): {last_error}")


def merge_pr(repo: Path, url: str, repo_name: str) -> None:
    merged = run_gh(repo, "pr", "merge", url, "--merge", "--delete-branch")
    if merged.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "gh pr merge", f"gh pr merge {url}", merged, "gh pr merge failed"))


def push_default_branch(repo: Path, base: str, repo_name: str) -> None:
    pushed = run_git(repo, "push", "--no-verify", "origin", f"HEAD:{base}")
    if pushed.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "git push default branch", f"git push origin HEAD:{base}", pushed, "git push failed"))


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


def record_failure(result: dict[str, Any], detail: str) -> None:
    failures = result.get("failures") if isinstance(result.get("failures"), list) else []
    failures.append({"stage": "finalize", "detail": detail})
    result["failures"] = failures
    result["delivery_status"] = "blocked"


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
        if publish_mode not in {"pr", "merge", "direct"}:
            raise RuntimeError("Delivery publish mode must be 'pr', 'merge', or 'direct'")
        if str(result.get("delivery_status", "")).strip() not in {"completed", "ready_for_finalize"}:
            raise RuntimeError("Agent result must be completed or ready_for_finalize before finalization")
        result = stabilize_delivery_result(result, context, result_path)
        commits: list[dict[str, str]] = []
        pr_urls: list[str] = []
        touched: list[dict[str, Any]] = []
        body = (
            f"Story: {context.metadata.get('title') or context.story_dir.name}\n\n"
            f"JIRA: {context.metadata.get('jiraUrl') or context.metadata.get('jiraKey') or 'Not linked'}\n\n"
            "Verification is recorded by Lumen in the delivery result."
        ) + visual_pr_summary(result)

        base_commit = str(context.metadata.get("baseCommit") or context.metadata.get("base_commit") or "").strip()
        for repo in context.repos:
            ensure_branch(repo.worktree_path, context.branch_name, repo.name)
            files = changed_files(repo.worktree_path)
            item: dict[str, Any] = {
                "name": repo.name,
                "path": str(repo.worktree_path),
                "branch": context.branch_name,
                "files_changed": files,
            }
            subject = commit_subject(result, repo.name) if files else ""
            if files:
                sha = commit_changes(repo.worktree_path, subject, repo.name)
                commits.append({"repository": repo.name, "sha": sha, "subject": subject})
                item["commit_subject"] = subject
            else:
                head = run_git(repo.worktree_path, "rev-parse", "HEAD")
                if head.returncode == 0:
                    item["existing_head"] = head.stdout.strip()

            if not branch_has_commits(repo.worktree_path, repo.default_branch, repo.name, base_commit):
                item["publish_status"] = "skipped"
                item["publish_reason"] = "No commits differ from the base branch"
                touched.append(item)
                continue

            if args.dry_run:
                item["pr_url"] = "(dry-run)"
                item["publish_status"] = "dry_run"
            else:
                if publish_mode == "direct":
                    push_default_branch(repo.worktree_path, repo.default_branch, repo.name)
                    item["publish_status"] = "direct"
                else:
                    pr_title = subject or f"{context.metadata.get('jiraKey') or context.story_dir.name}: delivery"
                    url = open_pr_with_retry(
                        repo.worktree_path,
                        context.branch_name,
                        repo.default_branch,
                        pr_title,
                        body,
                        repo.name,
                    )
                    item["pr_url"] = url
                    item["publish_status"] = "pr_open"
                    pr_urls.append(url)
                    if publish_mode == "merge":
                        merge_pr(repo.worktree_path, url, repo.name)
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
        detail = str(exc).strip() or exc.__class__.__name__
        record_failure(result, detail)
        update_result(result_path, result)
        print(f"Error: {detail}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
