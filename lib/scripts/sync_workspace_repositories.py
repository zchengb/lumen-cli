#!/usr/bin/env python3
"""Register repos/ checkouts for auto-scan without duplicating delivery config."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from discover_repos import discover
from delivery_workspace import read_json, workspace_lumen_dir, write_json
from visual_delivery import detect_runtime


def scan_entry(repo: dict[str, Any], existing: dict[str, Any]) -> dict[str, Any]:
    entry = {
        "name": repo["name"],
        "path": repo["path"],
        "default_branch": repo.get("default_branch") or "main",
        "runtime_profile": repo.get("runtime_profile") or "local-generic-review-only",
        "validation_commands": existing.get("validation_commands", []),
        "allow_auto_fix": existing.get("allow_auto_fix", True),
        "allow_pr": existing.get("allow_pr", True),
    }
    if isinstance(existing.get("runtime"), dict):
        entry["runtime_profile"] = existing.get("runtime_profile", entry["runtime_profile"])
        entry["runtime"] = existing["runtime"]
        entry["runtime_status"] = existing.get("runtime_status", "incomplete")
    else:
        detected = detect_runtime(Path(repo["path"]))
        if detected:
            entry["runtime_profile"], values = detected
            entry.update(values)
    return entry


def sync(workspace_root: Path) -> list[dict[str, Any]]:
    workspace_root = workspace_root.expanduser().resolve()
    repos_root = workspace_root / "repos"
    config_path = workspace_lumen_dir(workspace_root) / "config" / "repos.json"
    config = read_json(config_path, {"repositories": []})
    existing_items = config.get("repositories") if isinstance(config.get("repositories"), list) else []
    existing = {
        str(item.get("name", "")).strip(): item
        for item in existing_items
        if isinstance(item, dict) and str(item.get("name", "")).strip()
    }
    repositories = [scan_entry(repo, existing.get(repo["name"], {})) for repo in discover(str(repos_root))]
    config["repositories"] = repositories
    write_json(config_path, config)
    return repositories


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workspace_root")
    args = parser.parse_args()
    repositories = sync(Path(args.workspace_root))
    print(json.dumps({"repositories": repositories}, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
