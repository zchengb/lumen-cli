#!/usr/bin/env python3
"""Build or send a safe, synthetic Feishu delivery notification."""

from __future__ import annotations

import argparse
import importlib.util
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from delivery_workspace import load_story_context


def load_renderer():
    path = SCRIPT_DIR / "render-delivery-and-notify.py"
    spec = importlib.util.spec_from_file_location("delivery_notification_renderer", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Unable to load delivery notification renderer")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.build_delivery_feishu_card, module.send_feishu


def sample_delivery(context: Any, event: str) -> dict[str, Any]:
    status_by_event = {
        "delivery.started": "in_progress",
        "delivery.dev_done": "completed",
        "delivery.failed": "failed",
        "delivery.blocked": "blocked",
    }
    delivery: dict[str, Any] = {
        "delivery_status": status_by_event[event],
        "docs_dir": str(context.docs_dir),
        "workspace_root": str(context.workspace_root),
        "story_id": context.metadata.get("storyId") or context.story_dir.name,
        "story_path": str(context.story_dir.relative_to(context.docs_dir)),
        "jira_key": context.metadata.get("jiraKey", ""),
        "branch": context.branch_name,
        "repos_touched": [{"name": repo.name} for repo in context.repos],
        "pr_urls": [],
        "verification_results": [],
    }
    if event != "delivery.started":
        finished_at = datetime.now(timezone.utc).replace(microsecond=0)
        delivery["started_at"] = (finished_at - timedelta(minutes=14, seconds=25)).strftime("%Y-%m-%dT%H:%M:%SZ")
        delivery["finished_at"] = finished_at.strftime("%Y-%m-%dT%H:%M:%SZ")
    if event == "delivery.dev_done":
        delivery["verification_results"] = [
            {"label": "Compile", "status": "passed"},
            {"label": "PMD Check", "status": "passed"},
            {"label": "Unit and integration tests", "status": "passed"},
        ]
    elif event == "delivery.failed":
        delivery["verification_results"] = [
            {"label": "Compile", "status": "passed"},
            {"label": "PMD Check", "status": "passed"},
            {
                "label": "Unit, Integration, And Architecture Tests",
                "status": "failed",
                "summary": "Failed to determine a suitable driver class",
            },
        ]
    return delivery


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", required=True)
    parser.add_argument(
        "--event",
        required=True,
        choices=["started", "completed", "failed", "blocked"],
    )
    parser.add_argument("--send", action="store_true", help="Post the card to FEISHU_WEBHOOK_URL.")
    args = parser.parse_args()

    event = {
        "started": "delivery.started",
        "completed": "delivery.dev_done",
        "failed": "delivery.failed",
        "blocked": "delivery.blocked",
    }[args.event]
    context = load_story_context(Path(args.docs_dir), args.story, validate_gates=False)
    build_card, send_feishu = load_renderer()
    delivery = sample_delivery(context, event)
    card = build_card(event, delivery, context.metadata, context.docs_dir)

    result: dict[str, Any] = {"event": event, "sent": False, "card": card}
    if args.send:
        webhook = os.environ.get("FEISHU_WEBHOOK_URL", "").strip()
        if not webhook:
            raise RuntimeError("FEISHU_WEBHOOK_URL is not configured in .lumen/.env.local")
        send_feishu(card, webhook)
        result["sent"] = True
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)
