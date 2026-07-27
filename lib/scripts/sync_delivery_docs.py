#!/usr/bin/env python3
"""Commit and push Lumen-owned docs changes without touching unrelated user edits."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

from delivery_workspace import load_story_context

METADATA_PATH = re.compile(r"^stories/[^/]+/metadata\.json$")
CONFIG_PATH = re.compile(r"^lumen/config/.+\.json$")


def run_git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        check=False,
        capture_output=True,
        text=True,
    )


def failure_text(result: subprocess.CompletedProcess[str], fallback: str) -> str:
    return (result.stderr or result.stdout or fallback).strip()


def lumen_commit_subject(ticket: str, summary: str, *, kind: str = "feat") -> str:
    key = str(ticket or "").strip().lstrip("#") or "N/A"
    change = str(kind or "feat").strip().lower() or "feat"
    text = " ".join(str(summary or "").strip().split())
    if not text:
        text = "update delivery docs"
    return f"[lumen] #{key} {change}: {text}"


def porcelain_paths(docs_dir: Path) -> list[str]:
    status = run_git(docs_dir, "status", "--porcelain")
    if status.returncode != 0:
        raise RuntimeError(f"Docs directory is not a git repository: {docs_dir}")
    paths: list[str] = []
    for line in status.stdout.splitlines():
        if len(line) < 4:
            continue
        path = line[3:].strip()
        if " -> " in path:
            path = path.split(" -> ", 1)[1].strip()
        if path.startswith('"') and path.endswith('"'):
            path = path[1:-1]
        if path:
            paths.append(path)
    return paths


def classify_dirty_paths(docs_dir: Path) -> tuple[list[str], list[str], list[str]]:
    metadata: list[str] = []
    config: list[str] = []
    foreign: list[str] = []
    for path in porcelain_paths(docs_dir):
        if METADATA_PATH.match(path):
            metadata.append(path)
        elif CONFIG_PATH.match(path):
            config.append(path)
        else:
            foreign.append(path)
    return metadata, config, foreign


def ticket_from_metadata_file(docs_dir: Path, relative_path: str) -> str:
    try:
        payload = json.loads((docs_dir / relative_path).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return ""
    if not isinstance(payload, dict):
        return ""
    return str(payload.get("jiraKey") or payload.get("storyId") or "").strip()


def current_branch(docs_dir: Path) -> str:
    branch = run_git(docs_dir, "branch", "--show-current")
    name = branch.stdout.strip()
    if branch.returncode != 0 or not name:
        raise RuntimeError(failure_text(branch, "Docs repository is not on a branch"))
    return name


def integrate_remote_and_push(docs_dir: Path, branch_name: str) -> str:
    """Rebase onto remote updates when needed, then push. Raises on conflict."""
    fetch = run_git(docs_dir, "fetch", "origin", branch_name)
    if fetch.returncode != 0:
        # First push / missing remote branch — try push anyway.
        detail = failure_text(fetch, "fetch failed")
        pushed = run_git(docs_dir, "push", "-u", "origin", f"HEAD:{branch_name}")
        if pushed.returncode != 0:
            raise RuntimeError(failure_text(pushed, f"git push failed after fetch error: {detail}"))
        return "pushed"

    remote_ref = f"origin/{branch_name}"
    if run_git(docs_dir, "rev-parse", "--verify", remote_ref).returncode != 0:
        pushed = run_git(docs_dir, "push", "-u", "origin", f"HEAD:{branch_name}")
        if pushed.returncode != 0:
            raise RuntimeError(failure_text(pushed, "git push failed"))
        return "pushed"

    counts = run_git(docs_dir, "rev-list", "--left-right", "--count", f"HEAD...{remote_ref}")
    if counts.returncode != 0:
        raise RuntimeError(failure_text(counts, "Unable to compare local and remote docs branches"))
    parts = counts.stdout.strip().split()
    ahead = int(parts[0]) if parts else 0
    behind = int(parts[1]) if len(parts) > 1 else 0
    if behind > 0:
        rebase = run_git(docs_dir, "rebase", remote_ref)
        if rebase.returncode != 0:
            run_git(docs_dir, "rebase", "--abort")
            raise RuntimeError(
                "Remote docs branch has updates that conflict with local Lumen commits; "
                "resolve the docs repository manually, then retry"
            )
    if ahead == 0 and behind == 0:
        return "up to date"
    pushed = run_git(docs_dir, "push", "origin", f"HEAD:{branch_name}")
    if pushed.returncode != 0:
        raise RuntimeError(failure_text(pushed, "git push failed"))
    return "rebased and pushed" if behind > 0 else "pushed"


def commit_paths(docs_dir: Path, paths: list[str], subject: str, *, push: bool = True) -> str:
    if not paths:
        return "skipped"
    if not (docs_dir / ".git").exists():
        raise RuntimeError(f"Docs directory is not a Git repository: {docs_dir}")
    added = run_git(docs_dir, "add", "--", *paths)
    if added.returncode != 0:
        raise RuntimeError(failure_text(added, "git add failed"))
    committed = run_git(docs_dir, "commit", "--only", "-m", subject, "--", *paths)
    if committed.returncode != 0:
        raise RuntimeError(failure_text(committed, "git commit failed"))
    sha = run_git(docs_dir, "rev-parse", "HEAD").stdout.strip()
    if not push:
        return f"committed: {sha} {subject}"
    branch_name = current_branch(docs_dir)
    sync = integrate_remote_and_push(docs_dir, branch_name)
    return f"committed: {sha} {subject} ({sync})"


def commit_story_metadata(docs_dir: Path, story_ref: str = "", *, push: bool = True) -> str:
    context = load_story_context(docs_dir, story_ref, validate_gates=False)
    relative_metadata = str(context.metadata_path.relative_to(context.docs_dir))
    changed = run_git(context.docs_dir, "diff", "--quiet", "--", relative_metadata)
    staged = run_git(context.docs_dir, "diff", "--cached", "--quiet", "--", relative_metadata)
    if changed.returncode == 0 and staged.returncode == 0:
        return "skipped: metadata.json has no delivery changes"
    if changed.returncode not in {0, 1} or staged.returncode not in {0, 1}:
        raise RuntimeError("Unable to inspect docs metadata change")
    story_key = str(context.metadata.get("jiraKey") or context.metadata.get("storyId") or context.story_dir.name)
    subject = lumen_commit_subject(story_key, f"update {story_key} delivery status")
    return commit_paths(context.docs_dir, [relative_metadata], subject, push=push)


def commit_dirty_config(docs_dir: Path, summary: str = "update delivery config", *, push: bool = True) -> str:
    _, config, _ = classify_dirty_paths(docs_dir)
    if not config:
        return "skipped"
    return commit_paths(docs_dir, config, lumen_commit_subject("N/A", summary), push=push)


def heal_lumen_owned_docs_dirt(docs_dir: Path, *, push: bool = True) -> list[str]:
    """Commit Lumen-owned dirt so delivery can proceed. Raises if unrelated files are dirty."""
    metadata, config, foreign = classify_dirty_paths(docs_dir)
    if foreign:
        preview = ", ".join(foreign[:5])
        raise RuntimeError(
            f"Docs workspace has uncommitted changes; scheduled delivery will not pull or run ({preview})"
        )
    messages: list[str] = []
    for path in metadata:
        ticket = ticket_from_metadata_file(docs_dir, path) or path.split("/")[1]
        subject = lumen_commit_subject(ticket, f"update {ticket} delivery status")
        messages.append(commit_paths(docs_dir, [path], subject, push=push))
    if config:
        messages.append(commit_dirty_config(docs_dir, push=push))
    return messages


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    parser.add_argument("--heal", action="store_true", help="Commit all Lumen-owned dirty docs paths")
    args = parser.parse_args()

    try:
        docs_dir = Path(args.docs_dir).expanduser().resolve()
        if args.heal:
            messages = heal_lumen_owned_docs_dirt(docs_dir)
            if not messages:
                print("skipped: no Lumen-owned docs changes")
            else:
                for message in messages:
                    print(message)
            return 0
        print(commit_story_metadata(docs_dir, args.story))
        return 0
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
