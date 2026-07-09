#!/usr/bin/env python3
"""Resolve delivery workspace root from a docs repository path."""

from __future__ import annotations

import sys
from pathlib import Path

from delivery_workspace import load_workspace_config, resolve_docs_dir


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: resolve_delivery_workspace.py <docs-dir>", file=sys.stderr)
        return 1
    try:
        docs_dir = resolve_docs_dir(Path(sys.argv[1]))
        workspace_root, _ = load_workspace_config(docs_dir)
        print(workspace_root, end="")
    except (OSError, ValueError, FileNotFoundError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
