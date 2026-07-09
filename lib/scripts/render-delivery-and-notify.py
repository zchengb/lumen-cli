#!/usr/bin/env python3
"""Post-process delivery runs: metadata, JIRA, and Feishu notifications."""

from __future__ import annotations

import importlib.util
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from delivery_workspace import delivery_config_path, read_json, write_json
from delivery_progress import set_phase, update_notifications
from jira_delivery_sync import sync_delivery_jira


def load_render_helpers():
    module_path = SCRIPT_DIR / "render-report-and-notify.py"
    spec = importlib.util.spec_from_file_location("render_report_and_notify", module_path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load helpers from {module_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.send_feishu, module.redact


send_feishu, redact = load_render_helpers()


def load_delivery_result(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        payload = json.load(handle)
    return payload if isinstance(payload, dict) else {}


def resolve_docs_dir(delivery: dict[str, Any], result_path: Path) -> Path:
    docs_dir = str(delivery.get("docs_dir", "")).strip()
    if docs_dir:
        return Path(docs_dir).expanduser().resolve()

    workspace_root = result_path.parent.parent.resolve()
    if (workspace_root / "stories").is_dir():
        return workspace_root
    for child in sorted(workspace_root.iterdir()):
        if child.is_dir() and (child / "stories").is_dir():
            return child.resolve()
    return workspace_root


def build_delivery_feishu_card(
    event: str,
    delivery: dict[str, Any],
    story_metadata: dict[str, Any],
    docs_dir: Path,
) -> dict[str, Any]:
    jira_key = str(delivery.get("jira_key") or story_metadata.get("jiraKey") or "").strip()
    title = str(story_metadata.get("title") or delivery.get("story_id") or "Delivery").strip()
    status = str(delivery.get("delivery_status") or story_metadata.get("deliveryStatus") or "unknown")
    branch = str(delivery.get("branch") or story_metadata.get("deliveryBranch") or "").strip()
    repos = ", ".join(
        str(item.get("name", "")).strip()
        for item in delivery.get("repos_touched", [])
        if isinstance(item, dict) and item.get("name")
    )
    pr_urls = delivery.get("pr_urls") or []
    pr_text = "\n".join(str(url) for url in pr_urls if str(url).strip()) or "None"
    verification = delivery.get("verification_results") or []
    verification_text = "; ".join(
        f"{item.get('command', 'check')}={item.get('exit_code', '?')}"
        for item in verification
        if isinstance(item, dict)
    ) or "Not recorded"

    event_titles = {
        "delivery.started": "🚀 Delivery Started",
        "delivery.dev_done": "✅ Delivery Completed",
        "delivery.failed": "❌ Delivery Failed",
        "delivery.blocked": "⛔ Delivery Blocked",
    }
    event_title = event_titles.get(event, f"📦 {event}")

    body = (
        f"**Status:** {status}\n"
        f"**Story:** {title}\n"
        f"**Branch:** {branch or 'n/a'}\n"
        f"**Repos:** {repos or 'n/a'}\n"
        f"**Verification:** {verification_text}\n"
        f"**PR:** {pr_text}\n"
        f"**Docs:** {docs_dir}"
    )
    if jira_key:
        body += f"\n**JIRA:** {jira_key}"

    return {
        "msg_type": "interactive",
        "card": {
            "schema": "2.0",
            "header": {
                "title": {"tag": "plain_text", "content": event_title},
                "subtitle": {"tag": "plain_text", "content": jira_key or title},
                "template": "blue" if event == "delivery.started" else "green",
            },
            "body": {
                "elements": [
                    {
                        "tag": "markdown",
                        "content": body,
                    }
                ]
            },
        },
    }


def update_story_metadata(
    metadata_path: Path,
    delivery: dict[str, Any],
    pr_urls: list[str],
) -> dict[str, Any]:
    metadata = read_json(metadata_path)
    status = str(delivery.get("delivery_status", "")).strip()
    if status == "completed":
        metadata["deliveryStatus"] = "pr_open" if pr_urls else "dev_done"
    elif status == "blocked":
        metadata["deliveryStatus"] = "blocked"
    elif status == "failed":
        metadata["deliveryStatus"] = "blocked"
    metadata["updatedAt"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    if pr_urls:
        metadata["prUrl"] = pr_urls[0]
        metadata["jira_pr_url"] = pr_urls[0]
    logs = metadata.get("logs")
    if not isinstance(logs, list):
        logs = []
    logs.append(
        {
            "type": "delivery.run",
            "at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "status": metadata.get("deliveryStatus"),
            "result": delivery.get("delivery_status"),
        }
    )
    metadata["logs"] = logs[-20:]
    write_json(metadata_path, metadata)
    return metadata


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: render-delivery-and-notify.py <delivery-result.json> [--event delivery.dev_done]", file=sys.stderr)
        return 1

    result_path = Path(sys.argv[1]).resolve()
    event = "delivery.dev_done"
    if len(sys.argv) >= 4 and sys.argv[2] == "--event":
        event = sys.argv[3]

    if not result_path.is_file():
        print(f"Error: delivery result not found: {result_path}", file=sys.stderr)
        return 1

    dry_run = os.environ.get("LUMEN_DRY_RUN", "").strip().lower() in {"1", "true", "yes"}
    delivery = load_delivery_result(result_path)
    docs_dir = resolve_docs_dir(delivery, result_path)
    workspace_root = Path(str(delivery.get("workspace_root", "")).strip() or docs_dir).expanduser().resolve()
    delivery_config = read_json(delivery_config_path(workspace_root))
    story_path = delivery.get("story_path")
    if story_path:
        metadata_path = (docs_dir / str(story_path) / "metadata.json").resolve()
    else:
        metadata_path = docs_dir / "stories" / "metadata.json"

    story_metadata = read_json(metadata_path) if metadata_path.is_file() else {}
    webhook = os.environ.get("FEISHU_WEBHOOK_URL", "").strip()
    pr_urls = [str(url).strip() for url in delivery.get("pr_urls", []) if str(url).strip()]

    if not dry_run and metadata_path.is_file():
        story_metadata = update_story_metadata(metadata_path, delivery, pr_urls)

    jira_result = sync_delivery_jira(
        delivery,
        delivery_config,
        story_metadata,
        dry_run=dry_run,
        event=event,
    )
    delivery["jira"] = jira_result

    feishu_result = {"status": "skipped", "detail": "FEISHU_WEBHOOK_URL not set"}
    notifications = delivery_config.get("notifications", {})
    feishu_enabled = True
    if isinstance(notifications, dict):
        feishu_cfg = notifications.get("feishu", {})
        if isinstance(feishu_cfg, dict) and "enabled" in feishu_cfg:
            feishu_enabled = bool(feishu_cfg.get("enabled"))

    if webhook and feishu_enabled and not dry_run:
        try:
            card = build_delivery_feishu_card(event, delivery, story_metadata, docs_dir)
            send_feishu(card, webhook)
            feishu_result = {"status": "sent", "event": event}
        except Exception as exc:
            feishu_result = {"status": "failed", "detail": redact(str(exc))}
    elif dry_run:
        feishu_result = {"status": "dry_run", "event": event}

    delivery["feishu"] = feishu_result
    try:
        update_notifications(workspace_root, jira_result, feishu_result)
        if event == "delivery.started":
            set_phase(workspace_root, "jira_start", "completed", str(jira_result.get("detail", "")))
        elif event == "delivery.dev_done":
            set_phase(workspace_root, "jira_done", "completed", str(jira_result.get("detail", "")))
            set_phase(workspace_root, "notify", "completed", str(feishu_result.get("status", "")))
    except Exception:
        pass
    write_json(result_path, delivery)
    print(json.dumps({"jira": jira_result, "feishu": feishu_result}, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
