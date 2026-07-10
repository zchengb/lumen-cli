#!/usr/bin/env python3
"""Compose the Lumen scan agent prompt from modular snippet files."""

from __future__ import annotations

import json
import sys
from datetime import date, timedelta
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from github_auth_context import prompt_lines as github_prompt_lines


def load_json(path: Path, default: dict | None = None) -> dict:
    if not path.is_file():
        return default or {}
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
        return payload if isinstance(payload, dict) else (default or {})
    except (OSError, json.JSONDecodeError):
        return default or {}


def runtime_context_section(workspace_root: Path) -> str:
    common = load_json(workspace_root / "config" / "common.json")
    execution = common.get("execution", {}) if isinstance(common.get("execution"), dict) else {}
    scan_window_days = execution.get("scan_window_days", 7)
    try:
        scan_window_days = int(scan_window_days)
    except (TypeError, ValueError):
        scan_window_days = 7
    if scan_window_days < 1:
        scan_window_days = 1
    shallow_since = (date.today() - timedelta(days=scan_window_days)).isoformat()

    script_dir = Path(__file__).resolve().parent
    worktree_script = script_dir / "prepare_scan_worktrees.py"
    shell_script = script_dir / "prepare-scan-worktrees.sh"
    lines = [
        "## Runtime Scan Context (generated)\n",
        f"- **Scan window:** last **{scan_window_days}** days (`execution.scan_window_days` in `config/common.json`).\n",
        f"- **Shallow fetch:** worktree refresh uses `git fetch --shallow-since={shallow_since}` (derived from the scan window).\n",
        f"- **Worktree preparation script:** `{worktree_script}`\n",
        f"- **Shell wrapper:** `bash {shell_script} {workspace_root} refresh`\n",
        "- The scan wrapper runs worktree refresh before and after the agent when possible.\n",
        "- If worktrees are missing, dirty, or out of date, run the refresh command yourself before reviewing repositories.\n",
        "- After the scan completes, run the refresh command again so the next scan starts from clean, up-to-date worktrees.\n",
    ]
    lines.extend(f"{line}\n" for line in github_prompt_lines(workspace_root))
    return "".join(lines)


def compose_prompt(workspace_root: Path) -> str:
    config_dir = workspace_root / "config"
    prompts_dir = config_dir / "prompts"
    manifest_path = prompts_dir / "manifest.json"
    legacy_prompt = config_dir / "scan-prompt.md"

    parts: list[str] = [runtime_context_section(workspace_root)]

    if manifest_path.is_file():
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        snippets = manifest.get("snippets", [])
        if not snippets:
            raise ValueError(f"No snippets listed in {manifest_path}")

        for name in snippets:
            snippet_path = prompts_dir / name
            if not snippet_path.is_file():
                raise FileNotFoundError(f"Prompt snippet not found: {snippet_path}")
            parts.append(snippet_path.read_text(encoding="utf-8").strip())

        return "\n\n".join(parts) + "\n"

    if legacy_prompt.is_file():
        parts.append(legacy_prompt.read_text(encoding="utf-8").strip())
        return "\n\n".join(parts) + "\n"

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
