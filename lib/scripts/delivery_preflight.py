#!/usr/bin/env python3
"""Fail fast on delivery integrations before worktrees or an agent are started."""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

from delivery_progress import docker_available
from delivery_workspace import load_story_context, read_json, workspace_lumen_dir
from jira_sync import refresh_twg_auth


def check(command: list[str], label: str, cwd: Path | None = None) -> str:
    if not shutil.which(command[0]):
        return f"{label}: {command[0]} is not installed"
    result = subprocess.run(command, cwd=cwd, capture_output=True, text=True, timeout=30)
    if result.returncode:
        detail = (result.stderr or result.stdout or "command failed").strip().splitlines()[-1]
        return f"{label}: {detail}"
    return ""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", required=True)
    args = parser.parse_args()
    docs_dir = Path(args.docs_dir).expanduser().resolve()
    try:
        context = load_story_context(docs_dir, args.story)
        config = read_json(workspace_lumen_dir(context.workspace_root) / "config" / "delivery.json", {})
        errors: list[str] = []

        if not shutil.which("agent"):
            errors.append("Cursor CLI 'agent' is not installed")
        elif not os.environ.get("CURSOR_API_KEY"):
            error = check(["agent", "status"], "Cursor authentication")
            if error:
                errors.append(error)

        jira = config.get("jira") if isinstance(config.get("jira"), dict) else {}
        if jira.get("enabled") is not False:
            ready, reason = refresh_twg_auth(force=True)
            if not ready:
                errors.append(f"TWG/Jira connectivity: {reason}")

        publish = config.get("publish") if isinstance(config.get("publish"), dict) else {}
        publish_mode = str(publish.get("mode") or "pr").strip().lower()
        if publish_mode in {"pr", "merge"}:
            error = check(["gh", "auth", "status"], "GitHub authentication")
            if error:
                errors.append(error)

        for repo in context.repos:
            error = check(["git", "ls-remote", "origin", "HEAD"], f"Git remote ({repo.name})", repo.path)
            if error:
                errors.append(error)

        verification = config.get("verification") if isinstance(config.get("verification"), dict) else {}
        steps = verification.get("steps") if isinstance(verification.get("steps"), dict) else {}
        docker_required = any(
            isinstance(step, dict) and (step.get("requires_docker") is True or str(step.get("id")) in set(verification.get("docker", {}).get("required_for", [])))
            for repo_steps in steps.values() if isinstance(repo_steps, list) for step in repo_steps
        )
        if docker_required and bool((verification.get("docker") or {}).get("check_before_run", True)):
            available, reason = docker_available()
            if not available and not bool((verification.get("docker") or {}).get("skip_if_unavailable")):
                errors.append(f"Docker/Colima connectivity: {reason}")

        if errors:
            print("Delivery preflight failed:", file=sys.stderr)
            for error in errors:
                print(f"- {error}", file=sys.stderr)
            return 1
        print("Delivery preflight passed: Cursor, TWG/Jira, Git remotes, GitHub, and required verification services are reachable.")
        return 0
    except Exception as exc:
        print(f"Delivery preflight failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
