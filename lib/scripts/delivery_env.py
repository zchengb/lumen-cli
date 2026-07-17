#!/usr/bin/env python3
"""Load delivery workspace environment files without exposing secrets."""

from __future__ import annotations

import os
from pathlib import Path


def parse_env_file(path: Path) -> dict[str, str]:
    if not path.is_file():
        return {}
    values: dict[str, str] = {}
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
        values[key] = value
    return values


def delivery_env_paths(docs_dir: Path, workspace_dir_name: str) -> list[Path]:
    return [
        docs_dir / workspace_dir_name / ".env.common",
        docs_dir / workspace_dir_name / ".env.local",
        docs_dir / ".env.common",
        docs_dir / ".env.local",
    ]


def load_delivery_environment(
    docs_dir: Path,
    workspace_dir_name: str,
    base_env: dict[str, str] | None = None,
) -> dict[str, str]:
    env = dict(base_env if base_env is not None else os.environ)
    for path in delivery_env_paths(docs_dir, workspace_dir_name):
        env.update(parse_env_file(path))
    return env
