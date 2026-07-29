#!/usr/bin/env python3
"""Small Git sync helpers shared by workspace commit/publish flows."""

from __future__ import annotations

import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def run_git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        check=False,
        capture_output=True,
        text=True,
    )


def conflict_path(state_root: Path) -> Path:
    return state_root / "git-sync-conflict.json"


def read_conflict(state_root: Path) -> dict[str, Any]:
    path = conflict_path(state_root)
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    return payload if isinstance(payload, dict) else {}


def save_conflict(
    state_root: Path,
    *,
    repo: Path,
    branch: str,
    remote_oid: str,
    local_oid: str,
    reason: str,
    subject: str = "",
) -> dict[str, Any]:
    state_root.mkdir(parents=True, exist_ok=True)
    payload = {
        "repo": str(repo),
        "branch": branch,
        "remote_oid": remote_oid,
        "local_oid": local_oid,
        "reason": reason,
        "subject": subject,
        "created_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
    }
    path = conflict_path(state_root)
    temporary = path.with_suffix(".tmp")
    temporary.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)
    return payload


def clear_conflict(state_root: Path) -> None:
    try:
        conflict_path(state_root).unlink()
    except FileNotFoundError:
        pass


def force_push_conflict(state_root: Path) -> str:
    conflict = read_conflict(state_root)
    repo_value = str(conflict.get("repo") or "").strip()
    branch = str(conflict.get("branch") or "").strip()
    remote_oid = str(conflict.get("remote_oid") or "").strip()
    if not repo_value or not branch or not remote_oid:
        raise RuntimeError("Git sync conflict is incomplete; retry the delivery to rebuild it")
    repo = Path(repo_value).expanduser().resolve()
    fetched = run_git(repo, "fetch", "origin", branch)
    if fetched.returncode != 0:
        raise RuntimeError((fetched.stderr or fetched.stdout or "git fetch failed").strip()[-500:])
    pushed = run_git(
        repo,
        "push",
        "--force-with-lease=refs/heads/" + branch + ":" + remote_oid,
        "origin",
        f"HEAD:{branch}",
    )
    if pushed.returncode != 0:
        current_remote = run_git(repo, "rev-parse", f"origin/{branch}").stdout.strip()
        save_conflict(
            state_root,
            repo=repo,
            branch=branch,
            remote_oid=current_remote or remote_oid,
            local_oid=run_git(repo, "rev-parse", "HEAD").stdout.strip(),
            reason="Remote changed again while waiting for confirmation.",
            subject=str(conflict.get("subject") or ""),
        )
        raise RuntimeError((pushed.stderr or pushed.stdout or "force push failed").strip()[-500:])
    clear_conflict(state_root)
    return run_git(repo, "rev-parse", "HEAD").stdout.strip()
