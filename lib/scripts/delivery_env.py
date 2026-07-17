#!/usr/bin/env python3
"""Load delivery workspace environment files without exposing secrets."""

from __future__ import annotations

import os
import subprocess
from pathlib import Path


class DeliveryEnvLoadError(RuntimeError):
    pass


_ENV_LOADER_SCRIPT = """set -a
for file in "$@"; do
  source "$file"
done
env -0
"""


def delivery_env_paths(docs_dir: Path, workspace_dir_name: str) -> list[Path]:
    return [
        docs_dir / workspace_dir_name / ".env.common",
        docs_dir / workspace_dir_name / ".env.local",
        docs_dir / ".env.common",
        docs_dir / ".env.local",
    ]


def parse_env_null_output(raw: bytes) -> dict[str, str]:
    env: dict[str, str] = {}
    for item in raw.split(b"\0"):
        if not item:
            continue
        if b"=" not in item:
            continue
        key, _, value = item.partition(b"=")
        env[key.decode(errors="replace")] = value.decode(errors="replace")
    return env


def load_delivery_environment(
    docs_dir: Path,
    workspace_dir_name: str,
    base_env: dict[str, str] | None = None,
) -> dict[str, str]:
    env = dict(base_env if base_env is not None else os.environ)
    files = [path for path in delivery_env_paths(docs_dir, workspace_dir_name) if path.is_file()]
    if not files:
        return env

    completed = subprocess.run(
        ["bash", "-c", _ENV_LOADER_SCRIPT, "lumen-env-loader", *[str(path) for path in files]],
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if completed.returncode != 0:
        detail = completed.stderr.decode(errors="replace").strip() or "unknown environment load error"
        raise DeliveryEnvLoadError(f"Failed to load delivery environment files: {detail}")

    env.update(parse_env_null_output(completed.stdout))
    return env
