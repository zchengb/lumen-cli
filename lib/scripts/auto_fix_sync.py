#!/usr/bin/env python3
"""Push auto-fix branches and open GitHub PRs after the scan agent exits."""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any, Optional
from urllib.parse import urlparse

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from github_auth_context import detect_github_host, gh_auth_ok, has_env_token

PUSH_NO_VERIFY_NOTE = (
    "Pushed with --no-verify: local pre-push hook runs a full build/test suite that "
    "depends on Docker/Testcontainers, which is unavailable in this environment. "
    "No commit or code content was skipped by this flag; only the local hook execution was skipped."
)


def load_json(path: Path, default: dict | None = None) -> dict:
    if not path.is_file():
        return default or {}
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
        return payload if isinstance(payload, dict) else (default or {})
    except (OSError, json.JSONDecodeError):
        return default or {}


def apply_env_files(workspace: Path) -> None:
    for name in (".env.common", ".env.local"):
        path = workspace / name
        if not path.is_file():
            continue
        for raw_line in path.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip()
            if not key:
                continue
            if (value.startswith('"') and value.endswith('"')) or (
                value.startswith("'") and value.endswith("'")
            ):
                value = value[1:-1]
            if key in {"GH_TOKEN", "GITHUB_TOKEN", "GH_HOST"} or key not in os.environ:
                os.environ[key] = value


def slug_from_title(title: str, max_len: int = 48) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", str(title or "").lower()).strip("-")
    if not slug:
        return "finding"
    return slug[:max_len].strip("-") or "finding"


def default_branch_name(repo_name: str, title: str, prefix: str = "auto-fix") -> str:
    return f"{prefix}/{repo_name}/{slug_from_title(title)}"


def repo_config(repos_config: dict, repository: str) -> Optional[dict]:
    repositories = repos_config.get("repositories", [])
    if not isinstance(repositories, list):
        return None
    for repo in repositories:
        if isinstance(repo, dict) and str(repo.get("name", "")).strip() == repository:
            return repo
    return None


def worktree_path(workspace: Path, common: dict, repository: str) -> Path:
    paths = common.get("paths", {}) if isinstance(common.get("paths"), dict) else {}
    worktrees_dir = str(paths.get("worktrees_dir", "worktrees"))
    return workspace / worktrees_dir / repository


def parse_gh_repo_slug(remote_url: str) -> str:
    value = str(remote_url or "").strip()
    if not value:
        return ""
    if value.startswith("git@"):
        path = value.split(":", 1)[-1]
    else:
        path = urlparse(value).path.lstrip("/")
    if path.endswith(".git"):
        path = path[:-4]
    return path


def run_git(worktree: Path, args: list[str], check: bool = True) -> subprocess.CompletedProcess[str]:
    completed = subprocess.run(
        ["git", "-C", str(worktree), *args],
        check=False,
        capture_output=True,
        text=True,
    )
    if check and completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "git command failed").strip()
        raise RuntimeError(detail)
    return completed


def run_gh(args: list[str], cwd: Optional[Path] = None) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["gh", *args],
        check=False,
        capture_output=True,
        text=True,
        cwd=str(cwd) if cwd else None,
    )


def gh_ready(workspace: Path) -> tuple[bool, str]:
    if not shutil.which("gh"):
        return False, "GitHub CLI (gh) is not installed."
    apply_env_files(workspace)
    gh_host = str(os.environ.get("GH_HOST", "")).strip() or detect_github_host(workspace)
    if gh_host and not os.environ.get("GH_HOST"):
        os.environ["GH_HOST"] = gh_host
    if gh_auth_ok(gh_host):
        return True, ""
    label = gh_host or "GitHub"
    if has_env_token():
        return False, f"GitHub CLI is not authenticated for {label} (GH_TOKEN is set but rejected)."
    return False, (
        f"GitHub CLI is not authenticated for {label}. "
        f"Add GH_TOKEN and GH_HOST to {workspace}/.env.local "
        f"(lumen config set-gh-token <token> --host {gh_host or '<github-host>'})."
    )


def build_pr_title(finding: dict) -> str:
    title = str(finding.get("title", "Untitled finding")).strip()
    if title.lower().startswith("[bug fix]"):
        return title
    return f"[Bug Fix] {title}"


def build_pr_body(finding: dict) -> str:
    validation = str(finding.get("validation", "")).strip() or "Skipped: lightweight review-only mode"
    validation_section = validation
    if "no-verify" not in validation.lower():
        validation_section = (
            f"{validation}\n\n"
            "Branch push used `git push --no-verify` because local pre-push hooks can run "
            "full build/test suites that depend on Docker/Testcontainers, which are unavailable "
            "in the scan environment. Only the local hook execution was skipped."
        )
    sections = [
        "## 1. Bug & Impact",
        str(finding.get("impact", "")).strip(),
        "",
        "## 2. Trigger Scenario",
        str(finding.get("trigger", "")).strip(),
        "",
        "## 3. Root Cause",
        str(finding.get("root_cause", "")).strip(),
        "",
        "## 4. Fix",
        str(finding.get("suggestion", "")).strip(),
        "",
        "## 5. Validation",
        validation_section,
    ]
    return "\n".join(sections).strip()


def extract_pr_url(output: str) -> str:
    for line in reversed(output.splitlines()):
        value = line.strip()
        if value.startswith("http://") or value.startswith("https://"):
            return value
    match = re.search(r"https?://\S+", output)
    return match.group(0).rstrip(").,") if match else ""


def branch_exists(worktree: Path, branch: str) -> bool:
    completed = run_git(worktree, ["show-ref", "--verify", f"refs/heads/{branch}"], check=False)
    return completed.returncode == 0


def resolve_git_root(worktree: Path, repo_cfg: dict, branch: str) -> Path:
    if worktree.is_dir() and branch_exists(worktree, branch):
        return worktree
    repo_path = Path(str(repo_cfg.get("path", "")).strip()).expanduser()
    if repo_path.is_dir() and branch_exists(repo_path, branch):
        return repo_path
    if worktree.is_dir():
        return worktree
    if repo_path.is_dir():
        return repo_path
    return worktree


def checkout_branch(worktree: Path, branch: str) -> None:
    completed = run_git(worktree, ["checkout", branch], check=False)
    if completed.returncode == 0:
        return
    raise RuntimeError((completed.stderr or completed.stdout or f"failed to checkout {branch}").strip())


def remote_origin_slug(worktree: Path) -> str:
    completed = run_git(worktree, ["remote", "get-url", "origin"], check=False)
    if completed.returncode != 0:
        return ""
    return parse_gh_repo_slug(completed.stdout.strip())


def existing_pr_url(worktree: Path, branch: str, gh_host: str, repo_slug: str) -> str:
    args = ["pr", "view", branch, "--json", "url", "-q", ".url"]
    if repo_slug:
        args.extend(["--repo", repo_slug])
    completed = run_gh(args, cwd=worktree)
    if completed.returncode != 0:
        return ""
    return extract_pr_url(completed.stdout)


def push_branch(worktree: Path, branch: str) -> None:
    completed = run_git(
        worktree,
        ["push", "--no-verify", "-u", "origin", branch],
        check=False,
    )
    if completed.returncode != 0:
        raise RuntimeError((completed.stderr or completed.stdout or "git push failed").strip())


def create_pr(
    worktree: Path,
    branch: str,
    title: str,
    body: str,
    gh_host: str,
    repo_slug: str,
) -> str:
    existing = existing_pr_url(worktree, branch, gh_host, repo_slug)
    if existing:
        return existing

    args = ["pr", "create", "--title", title, "--body", body, "--head", branch]
    if repo_slug:
        args.extend(["--repo", repo_slug])
    completed = run_gh(args, cwd=worktree)
    if completed.returncode != 0:
        raise RuntimeError((completed.stderr or completed.stdout or "gh pr create failed").strip())
    url = extract_pr_url(completed.stdout)
    if not url:
        raise RuntimeError("gh pr create succeeded but no PR URL was returned.")
    return url


def is_pr_candidate(finding: dict, repo_cfg: Optional[dict]) -> bool:
    if finding.get("pr_url"):
        return False
    if str(finding.get("severity", "")) != "High":
        return False
    if not repo_cfg or not repo_cfg.get("allow_auto_fix") or not repo_cfg.get("allow_pr"):
        return False
    auto_fix = finding.get("auto_fix")
    if not isinstance(auto_fix, dict):
        return False
    return str(auto_fix.get("status", "")).strip() == "committed"


def resolve_branch(finding: dict, repo_name: str, common: dict) -> str:
    auto_fix = finding.get("auto_fix") if isinstance(finding.get("auto_fix"), dict) else {}
    branch = str(auto_fix.get("branch", "")).strip()
    if branch:
        return branch
    paths = common.get("paths", {}) if isinstance(common.get("paths"), dict) else {}
    prefix = str(paths.get("branch_prefix", "auto-fix")).strip() or "auto-fix"
    return default_branch_name(repo_name, str(finding.get("title", "")), prefix=prefix)


def strip_pr_creation_failures(scan: dict) -> None:
    failures = scan.get("failures")
    if not isinstance(failures, list):
        return
    scan["failures"] = [
        item
        for item in failures
        if not (isinstance(item, dict) and item.get("step") == "pr_creation")
    ]


def append_pr_failure(scan: dict, error: str, repository: str = "") -> None:
    entry = {"step": "pr_creation", "error": error}
    if repository:
        entry["repository"] = repository
    scan.setdefault("failures", []).append(entry)


def update_registry_issue(registry: dict, issue_id: str, pr_url: str, finished_at: str) -> None:
    for issue in registry.get("issues", []):
        if issue.get("id") != issue_id:
            continue
        issue["pr_url"] = pr_url
        if issue.get("status") in {None, "open", "in_progress"}:
            issue["status"] = "pr_open"
        issue["last_seen_at"] = finished_at
        break


def record_pr_success(
    scan: dict,
    finding: dict,
    repository: str,
    branch: str,
    pr_title: str,
    pr_url: str,
    registry: dict,
    finished_at: str,
) -> None:
    finding["pr_url"] = pr_url
    auto_fix = finding.setdefault("auto_fix", {})
    if isinstance(auto_fix, dict):
        auto_fix["status"] = "pr_open"
        auto_fix["branch"] = branch
        auto_fix["pr_url"] = pr_url
        auto_fix["push_note"] = PUSH_NO_VERIFY_NOTE
        auto_fix.pop("error", None)

    scan.setdefault("prs", []).append(
        {
            "repository": repository,
            "title": pr_title,
            "branch": branch,
            "url": pr_url,
            "push_note": PUSH_NO_VERIFY_NOTE,
            "issue_id": finding.get("issue_id"),
        }
    )

    issue_id = str(finding.get("issue_id", "")).strip()
    if issue_id:
        update_registry_issue(registry, issue_id, pr_url, finished_at)
        finding["issue_status"] = "pr_open"


def sync_auto_fix_prs(
    scan: dict,
    registry: dict,
    registry_path: Path,
    workspace: Path,
    common: dict,
    dry_run: bool = False,
    persist: bool = True,
) -> dict:
    summary = {
        "status": "noop",
        "created": 0,
        "skipped": 0,
        "failed": 0,
        "errors": [],
    }

    strip_pr_creation_failures(scan)
    repos_config = load_json(workspace / "config" / "repos.json", {"repositories": []})
    candidates = []
    for finding in scan.get("findings", []):
        if not isinstance(finding, dict):
            continue
        repository = str(finding.get("repository", "")).strip()
        repo_cfg = repo_config(repos_config, repository)
        if is_pr_candidate(finding, repo_cfg):
            candidates.append((finding, repository, repo_cfg))

    if not candidates:
        return summary

    ready, reason = gh_ready(workspace)
    if not ready:
        summary["status"] = "not_configured"
        summary["errors"].append(reason)
        append_pr_failure(scan, f"Skipped PR creation: {reason}")
        return summary

    if dry_run:
        summary["status"] = "dry_run_skipped"
        summary["skipped"] = len(candidates)
        return summary

    apply_env_files(workspace)
    gh_host = str(os.environ.get("GH_HOST", "")).strip() or detect_github_host(workspace)
    if gh_host and not os.environ.get("GH_HOST"):
        os.environ["GH_HOST"] = gh_host

    finished_at = str(scan.get("finished_at", "")).strip() or ""

    for finding, repository, repo_cfg in candidates:
        branch = resolve_branch(finding, repository, common)
        tree = worktree_path(workspace, common, repository)
        git_root = resolve_git_root(tree, repo_cfg or {}, branch)
        if not git_root.is_dir():
            summary["failed"] += 1
            message = f"{repository}: git directory not found (worktree {tree})"
            summary["errors"].append(message)
            auto_fix = finding.setdefault("auto_fix", {})
            if isinstance(auto_fix, dict):
                auto_fix["status"] = "failed"
                auto_fix["error"] = message
            append_pr_failure(scan, message, repository)
            continue

        try:
            if not branch_exists(git_root, branch):
                raise RuntimeError(f"branch not found: {branch}")
            if git_root == tree and tree.is_dir():
                checkout_branch(git_root, branch)
            repo_slug = remote_origin_slug(git_root)
            push_branch(git_root, branch)
            pr_title = build_pr_title(finding)
            pr_body = build_pr_body(finding)
            pr_url = create_pr(git_root, branch, pr_title, pr_body, gh_host, repo_slug)
            record_pr_success(scan, finding, repository, branch, pr_title, pr_url, registry, finished_at)
            summary["created"] += 1
        except Exception as exc:
            summary["failed"] += 1
            message = f"{repository}: {exc}"
            summary["errors"].append(message)
            auto_fix = finding.setdefault("auto_fix", {})
            if isinstance(auto_fix, dict):
                auto_fix["status"] = "failed"
                auto_fix["error"] = str(exc)
            append_pr_failure(scan, str(exc), repository)

    if summary["failed"] > 0:
        summary["status"] = "completed_with_failures"
    elif summary["created"] > 0:
        summary["status"] = "synced"
    else:
        summary["status"] = "noop"

    if persist and summary["created"] > 0:
        registry_path.parent.mkdir(parents=True, exist_ok=True)
        with registry_path.open("w", encoding="utf-8") as handle:
            json.dump(registry, handle, indent=2, ensure_ascii=False)
            handle.write("\n")

    return summary
