#!/usr/bin/env python3
"""Parse delivery arguments and resolve the workspace runtime paths."""

from __future__ import annotations

import argparse
import os
import shlex
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from delivery_workspace import load_workspace_config, resolve_docs_dir, workspace_lumen_dir


@dataclass
class DeliveryRunContext:
    docs_dir: Path
    workspace_root: Path
    workspace_dir: Path
    workspace_dir_name: str
    story_ref: str
    dry_run: bool
    delivery_config_path: Path
    scripts_dir: Path
    run_id: str = ""
    log_file: Path | None = None
    result_file: Path | None = None
    started_file: Path | None = None
    lock_dir: Path | None = None
    env: dict[str, str] | None = None
    current_phase: str | None = None

    def finalize_paths(self) -> None:
        if self.run_id:
            return
        self.run_id = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
        log_dir = self.workspace_dir / "logs" / "delivery"
        self.log_file = log_dir / f"run-{self.run_id}.log"
        self.result_file = self.workspace_dir / "results" / "delivery-result.json"
        self.started_file = self.workspace_dir / "results" / "delivery-started.json"
        self.lock_dir = self.workspace_dir / "locks" / "delivery-run"


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
    dry_run = args.dry_run or dry_run_env.strip().lower() in {"1", "true", "yes"}
    return {
        "DOCS_DIR": str(docs_dir),
        "STORY_REF": story_ref,
        "DRY_RUN": "1" if dry_run else "0",
        "WORKSPACE_ROOT": str(workspace_root),
        "WORKSPACE_DIR_NAME": workspace_dir.name,
        "WORKSPACE_DIR": str(workspace_dir),
        "DELIVERY_CONFIG": str(workspace_dir / "config" / "delivery.json"),
    }


def build_run_context(argv: list[str], scripts_dir: Path | None = None) -> DeliveryRunContext:
    values = runtime_values(argv, os.environ.get("LUMEN_DRY_RUN", "0"))
    scripts = scripts_dir or Path(__file__).resolve().parent
    context = DeliveryRunContext(
        docs_dir=Path(values["DOCS_DIR"]),
        workspace_root=Path(values["WORKSPACE_ROOT"]),
        workspace_dir=Path(values["WORKSPACE_DIR"]),
        workspace_dir_name=values["WORKSPACE_DIR_NAME"],
        story_ref=values["STORY_REF"],
        dry_run=values["DRY_RUN"] == "1",
        delivery_config_path=Path(values["DELIVERY_CONFIG"]),
        scripts_dir=scripts,
    )
    context.finalize_paths()
    return context


def main() -> int:
    values = runtime_values(sys.argv[1:], os.environ.get("LUMEN_DRY_RUN", "0"))
    print("\n".join(f"{key}={shlex.quote(value)}" for key, value in values.items()))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
