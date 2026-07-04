#!/usr/bin/env python3
"""Compose the Lumen scan agent prompt from modular snippet files."""

from __future__ import annotations

import json
import sys
from pathlib import Path


def compose_prompt(workspace_root: Path) -> str:
    config_dir = workspace_root / "config"
    prompts_dir = config_dir / "prompts"
    manifest_path = prompts_dir / "manifest.json"
    legacy_prompt = config_dir / "scan-prompt.md"

    if manifest_path.is_file():
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        snippets = manifest.get("snippets", [])
        if not snippets:
            raise ValueError(f"No snippets listed in {manifest_path}")

        parts: list[str] = []
        for name in snippets:
            snippet_path = prompts_dir / name
            if not snippet_path.is_file():
                raise FileNotFoundError(f"Prompt snippet not found: {snippet_path}")
            parts.append(snippet_path.read_text(encoding="utf-8").strip())

        return "\n\n".join(parts) + "\n"

    if legacy_prompt.is_file():
        return legacy_prompt.read_text(encoding="utf-8")

    raise FileNotFoundError(
        f"No scan prompt found. Expected {manifest_path} or {legacy_prompt}."
    )


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: compose_scan_prompt.py <workspace-dir>", file=sys.stderr)
        return 1

    workspace = Path(sys.argv[1]).expanduser().resolve()
    try:
        print(compose_prompt(workspace), end="")
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
