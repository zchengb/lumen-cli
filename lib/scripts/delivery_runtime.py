#!/usr/bin/env python3
"""Parse delivery arguments and resolve the workspace runtime paths."""

from __future__ import annotations

import argparse
import os
import shlex
import sys
from pathlib import Path

from delivery_workspace import load_workspace_config, resolve_docs_dir, workspace_lumen_dir


def runtime_values(argv: list[str], dry_run_env: str = "0") -> dict[str, str]:
    parser = argparse.ArgumentParser(usage="run-delivery.sh <docs-dir> [--story <slug>] [--dry-run]")
    parser.add_argument("docs_dir")
    parser.add_argument("story_ref", nargs="?")
    parser.add_argument("--story", default="")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args(argv)

    docs_dir = resolve_docs_dir(Path(args.docs_dir))
    workspace_root, _ = load_workspace_config(docs_dir)
    workspace_dir = workspace_lumen_dir(workspace_root)
    story_ref = args.story or args.story_ref or ""
    return {
        "DOCS_DIR": str(docs_dir),
        "STORY_REF": story_ref,
        "DRY_RUN": "1" if args.dry_run else dry_run_env,
        "WORKSPACE_ROOT": str(workspace_root),
        "WORKSPACE_DIR_NAME": workspace_dir.name,
        "WORKSPACE_DIR": str(workspace_dir),
        "DELIVERY_CONFIG": str(workspace_dir / "config" / "delivery.json"),
    }


def main() -> int:
    values = runtime_values(sys.argv[1:], os.environ.get("LUMEN_DRY_RUN", "0"))
    print("\n".join(f"{key}={shlex.quote(value)}" for key, value in values.items()))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
