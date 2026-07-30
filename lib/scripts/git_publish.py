#!/usr/bin/env python3
"""Small Git/GitHub publishing primitives shared by automation runners."""

from __future__ import annotations

import subprocess
import time
from pathlib import Path


PUBLISH_RETRY_ATTEMPTS = 3
PUBLISH_RETRY_DELAYS_SECONDS = (2, 5)


def run_git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["git", "-C", str(repo), *args], check=False, capture_output=True, text=True)


def run_gh(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["gh", *args], cwd=str(repo), check=False, capture_output=True, text=True)


def failure_text(result: subprocess.CompletedProcess[str], fallback: str) -> str:
    return (result.stderr or result.stdout or fallback).strip()


def command_failure(repo_name: str, stage: str, command: str, result: subprocess.CompletedProcess[str], fallback: str) -> str:
    return f"{repo_name}: {stage} failed ({command}): {failure_text(result, fallback)}"


def changed_files(repo: Path) -> list[str]:
    completed = run_git(repo, "status", "--porcelain")
    if completed.returncode != 0:
        raise RuntimeError(failure_text(completed, "Unable to inspect worktree"))
    return [line[3:].split(" -> ")[-1] for line in completed.stdout.splitlines() if len(line) >= 4]


def branch_has_commits(repo: Path, base: str, repo_name: str = "", base_ref: str = "") -> bool:
    comparison = base_ref or f"origin/{base}"
    completed = run_git(repo, "rev-list", "--count", f"{comparison}..HEAD")
    if completed.returncode != 0:
        raise RuntimeError(command_failure(repo_name or repo.name, "compare branch", f"git rev-list --count {comparison}..HEAD", completed, "Unable to compare branch"))
    return int(completed.stdout.strip() or "0") > 0


def ensure_branch(repo: Path, branch: str, repo_name: str) -> None:
    completed = run_git(repo, "branch", "--show-current")
    current = completed.stdout.strip()
    if completed.returncode != 0 or current != branch:
        raise RuntimeError(f"{repo_name}: expected branch {branch}, found {current or 'detached HEAD'}")


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
    return completed.stdout.strip() if completed.returncode == 0 else ""


def publish_retriable(message: str) -> bool:
    return any(marker in message.casefold() for marker in (
        "timeout", "timed out", "connection reset", "connection refused", "temporarily unavailable",
        "503", "502", "504", "429", "rate limit", "eof", "broken pipe", "network",
        "internal server error",
    ))


def open_pr(repo: Path, branch: str, base: str, title: str, body: str, repo_name: str) -> str:
    pushed = run_git(repo, "push", "--no-verify", "-u", "origin", branch)
    if pushed.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "git push", f"git push -u origin {branch}", pushed, "git push failed"))
    existing = existing_pr_url(repo, branch)
    if existing:
        return existing
    created = run_gh(repo, "pr", "create", "--base", base, "--head", branch, "--title", title, "--body", body)
    if created.returncode != 0:
        output = failure_text(created, "gh pr create failed")
        if "already exists" in output.casefold() and (existing := existing_pr_url(repo, branch)):
            return existing
        raise RuntimeError(command_failure(repo_name, "gh pr create", f"gh pr create --base {base} --head {branch}", created, "gh pr create failed"))
    url = created.stdout.strip()
    if not url:
        raise RuntimeError(f"{repo_name}: gh pr create completed without returning a URL")
    return url


def open_pr_with_retry(repo: Path, branch: str, base: str, title: str, body: str, repo_name: str, opener=None) -> str:
    opener = opener or open_pr
    last_error = ""
    for attempt in range(1, PUBLISH_RETRY_ATTEMPTS + 1):
        try:
            return opener(repo, branch, base, title, body, repo_name)
        except RuntimeError as exc:
            last_error = str(exc)
            if attempt >= PUBLISH_RETRY_ATTEMPTS or not publish_retriable(last_error):
                break
            time.sleep(PUBLISH_RETRY_DELAYS_SECONDS[min(attempt - 1, len(PUBLISH_RETRY_DELAYS_SECONDS) - 1)])
    raise RuntimeError(f"{repo_name}: publish failed after {PUBLISH_RETRY_ATTEMPTS} attempt(s): {last_error}")


def push_default_branch(repo: Path, base: str, repo_name: str) -> None:
    pushed = run_git(repo, "push", "--no-verify", "origin", f"HEAD:{base}")
    if pushed.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "git push default branch", f"git push origin HEAD:{base}", pushed, "git push failed"))


def merge_pr(repo: Path, url: str, repo_name: str) -> None:
    merged = run_gh(repo, "pr", "merge", url, "--merge", "--delete-branch")
    if merged.returncode != 0:
        raise RuntimeError(command_failure(repo_name, "gh pr merge", f"gh pr merge {url}", merged, "gh pr merge failed"))
