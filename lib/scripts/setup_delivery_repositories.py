#!/usr/bin/env python3
"""Clone or register code repositories under a delivery docs project."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Any

from delivery_workspace import read_json, write_json, workspace_config_path


def repos_dir_for_docs(docs_dir: Path, workspace_config: dict[str, Any]) -> Path:
    repos_dir_name = str(workspace_config.get("repos_dir", "repos")).strip() or "repos"
    return docs_dir / repos_dir_name


def load_workspace_config(docs_dir: Path) -> dict[str, Any]:
    path = workspace_config_path(docs_dir)
    if path.is_file():
        payload = read_json(path, {})
        return payload if isinstance(payload, dict) else {}
    return {
        "schema_version": "1.0",
        "layout": "nested",
        "workspace_root": str(docs_dir),
        "docs_repo": ".",
        "repos_dir": "repos",
        "repositories": [],
    }


def relative_repo_path(docs_dir: Path, repo_path: Path) -> str:
    resolved = repo_path.expanduser().resolve()
    try:
        return str(resolved.relative_to(docs_dir.resolve()))
    except ValueError:
        return str(resolved)


def default_branch(repo_path: Path) -> str:
    for command in (
        ["git", "-C", str(repo_path), "symbolic-ref", "--short", "refs/remotes/origin/HEAD"],
        ["git", "-C", str(repo_path), "symbolic-ref", "--short", "HEAD"],
    ):
        completed = subprocess.run(command, check=False, capture_output=True, text=True)
        if completed.returncode != 0:
            continue
        value = completed.stdout.strip()
        if value.startswith("origin/"):
            return value.split("/", 1)[1]
        if value and value != "HEAD":
            return value
    return "main"


def clone_repository(clone_url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and any(destination.iterdir()):
        raise FileExistsError(f"Destination is not empty: {destination}")
    completed = subprocess.run(
        ["git", "clone", clone_url, str(destination)],
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "git clone failed").strip()
        raise RuntimeError(detail)


def upsert_repository(
    docs_dir: Path,
    name: str,
    repo_path: Path,
    branch: str = "",
    clone_url: str = "",
) -> dict[str, Any]:
    docs_dir = docs_dir.expanduser().resolve()
    workspace_config = load_workspace_config(docs_dir)
    repos_root = repos_dir_for_docs(docs_dir, workspace_config)
    repos_root.mkdir(parents=True, exist_ok=True)
    (repos_root / ".gitkeep").touch()

    destination = repo_path.expanduser()
    if not destination.is_absolute():
        destination = (docs_dir / destination).resolve()
    else:
        destination = destination.resolve()

    if clone_url:
        if destination.exists() and (destination / ".git").is_dir():
            raise FileExistsError(f"Repository already exists: {destination}")
        clone_repository(clone_url, destination)
    elif not (destination / ".git").is_dir():
        raise FileNotFoundError(f"Repository not found: {destination}")

    branch_name = branch.strip() or default_branch(destination)
    entry = {
        "name": name,
        "path": relative_repo_path(docs_dir, destination),
        "default_branch": branch_name,
    }

    repositories = workspace_config.get("repositories")
    if not isinstance(repositories, list):
        repositories = []
    updated = False
    for index, item in enumerate(repositories):
        if isinstance(item, dict) and str(item.get("name", "")).strip() == name:
            repositories[index] = entry
            updated = True
            break
    if not updated:
        repositories.append(entry)

    workspace_config.update(
        {
            "layout": "nested",
            "workspace_root": str(docs_dir),
            "docs_repo": ".",
            "repos_dir": str(workspace_config.get("repos_dir", "repos") or "repos"),
            "repositories": repositories,
        }
    )
    write_json(workspace_config_path(docs_dir), workspace_config)
    return entry


def import_repositories(docs_dir: Path, repositories: list[dict[str, Any]]) -> list[dict[str, Any]]:
    saved: list[dict[str, Any]] = []
    for item in repositories:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name", "")).strip()
        if not name:
            continue
        path_value = str(item.get("path", "")).strip() or f"repos/{name}"
        branch = str(item.get("default_branch", "")).strip()
        clone_url = str(item.get("clone_url", "")).strip()
        saved.append(
            upsert_repository(
                docs_dir,
                name,
                Path(path_value),
                branch=branch,
                clone_url=clone_url,
            )
        )
    return saved


def main() -> int:
    parser = argparse.ArgumentParser(description="Set up delivery docs code repositories.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add")
    add_parser.add_argument("--docs-dir", required=True)
    add_parser.add_argument("--name", required=True)
    add_parser.add_argument("--path", default="")
    add_parser.add_argument("--branch", default="")
    add_parser.add_argument("--clone-url", default="")

    import_parser = subparsers.add_parser("import")
    import_parser.add_argument("--docs-dir", required=True)
    import_parser.add_argument("--repos-json", required=True)

    args = parser.parse_args()
    docs_dir = Path(args.docs_dir).expanduser().resolve()

    try:
        if args.command == "add":
            repos_dir = repos_dir_for_docs(docs_dir, load_workspace_config(docs_dir))
            default_path = repos_dir / args.name
            repo_path = Path(args.path).expanduser() if args.path else default_path
            entry = upsert_repository(
                docs_dir,
                args.name,
                repo_path,
                branch=args.branch,
                clone_url=args.clone_url,
            )
            print(json.dumps(entry, indent=2, ensure_ascii=False))
            return 0

        if args.command == "import":
            payload = json.loads(args.repos_json)
            if not isinstance(payload, list):
                raise ValueError("repos-json must be a JSON array")
            saved = import_repositories(docs_dir, payload)
            print(json.dumps(saved, indent=2, ensure_ascii=False))
            return 0
    except (OSError, ValueError, RuntimeError, json.JSONDecodeError, FileExistsError, FileNotFoundError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
