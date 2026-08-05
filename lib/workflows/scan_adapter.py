from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any, Optional

SCRIPT_DIR = Path(__file__).resolve().parent.parent / "scripts"
LIB_DIR = Path(__file__).resolve().parent.parent
if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from agents.models import TriggerContext
from projects_registry import resolve_slug
from workflows.base import AdapterResult, build_run_context, new_run_id
from workspace_config import get_scan_window_days, set_scan_window_days


class ScanAdapter:
    def __init__(self, lumen_bin: str = "") -> None:
        self.lumen_bin = lumen_bin or os.environ.get("LUMEN_CLI_BIN") or "lumen"

    def build_command(
        self,
        project_slug: str,
        *,
        dry_run: bool = False,
    ) -> list[str]:
        cmd = [self.lumen_bin, "scan", "--project", project_slug]
        if dry_run:
            cmd.append("--dry-run")
        return cmd

    def start(
        self,
        *,
        project_slug: str,
        window_days: Optional[int] = None,
        trigger: Optional[TriggerContext] = None,
        dry_run: bool = False,
    ) -> dict[str, Any]:
        project = resolve_slug(project_slug)
        workspace = Path(str(project.get("workspace") or "")).expanduser().resolve()
        run_id = new_run_id("scan")
        context = build_run_context(
            workflow="auto_scan",
            project=str(project.get("slug") or project_slug),
            owner_agent="dylan",
            trigger=trigger,
            params={"window_days": window_days, "dry_run": dry_run},
            run_id=run_id,
        )

        previous_days = None
        if window_days is not None and workspace.is_dir():
            try:
                previous_days = get_scan_window_days(workspace)
                if int(window_days) != previous_days:
                    set_scan_window_days(workspace, int(window_days))
                else:
                    previous_days = None
            except Exception:
                previous_days = None

        cmd = self.build_command(str(project.get("slug") or project_slug), dry_run=dry_run)
        env = os.environ.copy()
        env["LUMEN_AGENT_RUN_ID"] = context.run_id
        env["LUMEN_OWNER_AGENT"] = "dylan"
        try:
            completed = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                env=env,
                check=False,
            )
        finally:
            if previous_days is not None:
                try:
                    set_scan_window_days(workspace, previous_days)
                except Exception:
                    pass

        result_path = workspace / "results" / "scan-result.json"
        scan: dict[str, Any] = {}
        if result_path.is_file():
            try:
                loaded = json.loads(result_path.read_text(encoding="utf-8"))
                if isinstance(loaded, dict):
                    scan = loaded
            except Exception:
                scan = {}

        status = "completed" if completed.returncode == 0 else "failed"
        detail = ""
        if completed.returncode != 0:
            detail = (completed.stderr or completed.stdout or "").strip()[:500]
        return AdapterResult(
            run_id=context.run_id,
            status=status,
            detail=detail,
            result_path=str(result_path) if result_path.is_file() else "",
            exit_code=completed.returncode,
            data={"scan": scan, "command": cmd},
        ).as_dict()
