#!/usr/bin/env python3
"""GitHub CLI auth helpers for Lumen scan workspaces."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse


def load_json(path: Path, default: dict | None = None) -> dict:
    if not path.is_file():
        return default or {}
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
        return payload if isinstance(payload, dict) else (default or {})
    except (OSError, json.JSONDecodeError):
        return default or {}


def host_from_remote(url: str) -> str:
    value = str(url or "").strip()
    if not value:
        return ""
    if value.startswith("git@"):
        host = value.split("@", 1)[1].split(":", 1)[0]
        return host.strip().lower()
    parsed = urlparse(value)
    return (parsed.hostname or "").strip().lower()


def detect_github_host(workspace: Path) -> str:
    env_host = str(os.environ.get("GH_HOST", "")).strip()
    if env_host:
        return env_host

    repos_config = load_json(workspace / "config" / "repos.json")
    repositories = repos_config.get("repositories", [])
    if not isinstance(repositories, list):
        return ""

    hosts: list[str] = []
    for repo in repositories:
        if not isinstance(repo, dict):
            continue
        repo_path = Path(str(repo.get("path", ""))).expanduser()
        if not repo_path.is_dir():
            continue
        completed = subprocess.run(
            ["git", "-C", str(repo_path), "remote", "get-url", "origin"],
            check=False,
            capture_output=True,
            text=True,
        )
        if completed.returncode != 0:
            continue
        host = host_from_remote(completed.stdout.strip())
        if host and host not in hosts:
            hosts.append(host)

    if len(hosts) == 1:
        return hosts[0]
    if len(hosts) > 1:
        for host in hosts:
            if host.endswith(".ghe.com"):
                return host
        return hosts[0]
    return ""


def gh_auth_ok(gh_host: str = "") -> bool:
    args = ["gh", "auth", "status"]
    if gh_host:
        args.extend(["-h", gh_host])
    completed = subprocess.run(args, check=False, capture_output=True, text=True)
    if completed.returncode != 0:
        return False
    output = f"{completed.stdout}\n{completed.stderr}"
    return "Logged in to" in output or "✓" in output


def has_env_token() -> bool:
    return bool(str(os.environ.get("GH_TOKEN", "")).strip() or str(os.environ.get("GITHUB_TOKEN", "")).strip())


def preflight_notice(workspace: Path) -> int:
    if not shutil_which("gh"):
        print("Notice: GitHub CLI (gh) is not installed. Scanning can continue, but automated PR creation will be skipped.")
        return 0

    gh_host = detect_github_host(workspace)
    if gh_host and not os.environ.get("GH_HOST"):
        os.environ["GH_HOST"] = gh_host

    if gh_auth_ok(gh_host):
        label = gh_host or "GitHub"
        print(f"Notice: GitHub CLI is authenticated for {label}.")
        return 0

    label = gh_host or "GitHub"
    print(f"Notice: GitHub CLI is not authenticated for {label}. Scanning can continue, but automated PR creation will be skipped.")
    if not sys.stdin.isatty() or not has_env_token():
        print(f"  Scheduled and non-interactive scans cannot rely on macOS Keychain for gh auth.")
        print(f"  Add GH_TOKEN and GH_HOST to {workspace}/.env.local")
        print(f"  Example: lumen config set-gh-token <token> --host {gh_host or 'mercedes-benz.ghe.com'} --project <slug>")
    elif gh_host:
        print(f"  Run: gh auth login -h {gh_host}")
    else:
        print("  Run: gh auth login")
    return 0


def shutil_which(command: str) -> str | None:
    for path in os.environ.get("PATH", "").split(":"):
        candidate = Path(path) / command
        if candidate.is_file() and os.access(candidate, os.X_OK):
            return str(candidate)
    return None


def prompt_lines(workspace: Path) -> list[str]:
    gh_host = detect_github_host(workspace)
    token_ready = has_env_token()
    lines = []
    if gh_host:
        lines.append(f"- **GitHub host:** `{gh_host}` (from repository remotes or `GH_HOST`).")
        lines.append(f"- **Auth check:** run `gh auth status -h {gh_host}` before creating PRs.")
    else:
        lines.append("- **Auth check:** run `gh auth status` before creating PRs.")
    if token_ready:
        lines.append("- **GH_TOKEN:** present in the environment (`.env.local`). Use it for `gh` in non-interactive runs.")
    else:
        lines.append(
            "- **GH_TOKEN:** not set. For scheduled scans, add `GH_TOKEN` and `GH_HOST` to `.env.local` "
            "(interactive `gh auth login` / macOS keyring is not available under cron)."
        )
    return lines


def main() -> int:
    parser = argparse.ArgumentParser(description="GitHub auth helpers for Lumen.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    preflight_parser = subparsers.add_parser("preflight")
    preflight_parser.add_argument("workspace")

    host_parser = subparsers.add_parser("detect-host")
    host_parser.add_argument("workspace")

    args = parser.parse_args()
    workspace = Path(args.workspace).expanduser().resolve()

    if args.command == "preflight":
        return preflight_notice(workspace)
    if args.command == "detect-host":
        print(detect_github_host(workspace), end="")
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
