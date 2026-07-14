#!/usr/bin/env python3
"""Render a static Delivery history dashboard for one workspace."""

from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path
from typing import Any

from delivery_workspace import delivery_config_path, delivery_history_dir, read_json, workspace_lumen_dir


def relative(root: Path, value: str) -> str:
    if not value:
        return ""
    try:
        return str(Path(value).resolve().relative_to(root))
    except (OSError, ValueError):
        return value


def run_for_dashboard(root: Path, item: dict[str, Any], source: Path) -> dict[str, Any]:
    delivery = item.get("delivery") if isinstance(item.get("delivery"), dict) else {}
    progress = item.get("progress") if isinstance(item.get("progress"), dict) else {}
    verification = delivery.get("verification_results") or progress.get("verification") or []
    repos = delivery.get("repos_touched") or progress.get("repositories") or []
    return {
        "run_id": item.get("run_id") or source.stem,
        "archived_at": item.get("archived_at", ""),
        "status": delivery.get("delivery_status") or progress.get("delivery_status") or "unknown",
        "story": delivery.get("story_id") or progress.get("story_id") or "",
        "jira_key": delivery.get("jira_key") or progress.get("jira_key") or "",
        "branch": delivery.get("branch") or progress.get("branch") or "",
        "repos": repos,
        "prs": delivery.get("pr_urls") or [],
        "verification": verification,
        "failures": delivery.get("failures") or [],
        "log": relative(root, str(item.get("log_file", ""))),
        "started_at": delivery.get("started_at") or progress.get("started_at") or "",
        "finished_at": delivery.get("finished_at") or progress.get("finished_at") or "",
    }


def render(workspace_root: Path) -> tuple[Path, Path]:
    workspace_root = workspace_root.expanduser().resolve()
    history_dir = delivery_history_dir(workspace_root)
    runs = []
    if history_dir.is_dir():
        for source in sorted(history_dir.glob("*.json"), key=lambda path: path.stat().st_mtime, reverse=True):
            data = read_json(source, {})
            if data:
                runs.append(run_for_dashboard(workspace_root, data, source))
    lumen_dir = workspace_lumen_dir(workspace_root)
    current = read_json(lumen_dir / "results" / "delivery-progress.json", {})
    delivery_config = read_json(delivery_config_path(workspace_root), {})
    payload = {
        "workspace_root": str(workspace_root),
        "current": current,
        "runs": runs,
        "config": {
            "model": delivery_config.get("execution", {}).get("model", "composer-2.5"),
            "jira_enabled": delivery_config.get("jira", {}).get("enabled", False),
            "docker_mode": delivery_config.get("verification", {}).get("docker", {}).get("mode", "host_testcontainers"),
        },
    }
    data_path = lumen_dir / "delivery-dashboard-data.js"
    data_path.write_text("window.LUMEN_DELIVERY_DATA = " + json.dumps(payload, ensure_ascii=False) + ";\n", encoding="utf-8")
    template = Path(__file__).resolve().parents[1] / "templates" / "delivery-dashboard.html"
    html_path = lumen_dir / "delivery-dashboard.html"
    shutil.copy2(template, html_path)
    return html_path, data_path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace-root", required=True)
    args = parser.parse_args()
    html, data = render(Path(args.workspace_root))
    print(json.dumps({"html": str(html), "data": str(data)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
