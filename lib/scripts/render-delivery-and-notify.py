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

from delivery_workspace import delivery_config_path, read_json, workspace_lumen_dir, write_json
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


def format_duration(started_at: object, finished_at: object) -> str:
    if not isinstance(started_at, str) or not isinstance(finished_at, str):
        return ""
    try:
        start = datetime.fromisoformat(started_at.replace("Z", "+00:00"))
        finish = datetime.fromisoformat(finished_at.replace("Z", "+00:00"))
    except ValueError:
        return ""
    seconds = max(0, int((finish - start).total_seconds()))
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    if hours:
        return f"{hours}h {minutes:02d}m"
    if minutes:
        return f"{minutes}m {seconds:02d}s"
    return f"{seconds}s"


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


def jira_assignee(workspace_root: Path, story_path: object) -> str:
    story_name = Path(str(story_path or "")).name
    if not story_name:
        return ""
    snapshot = read_json(workspace_lumen_dir(workspace_root) / "context" / story_name / "jira-context.json")
    workitem = snapshot.get("workitem") if isinstance(snapshot, dict) else {}
    item = workitem[0] if isinstance(workitem, list) and workitem else workitem
    assignee = item.get("assignee") if isinstance(item, dict) else {}
    if isinstance(assignee, dict):
        return str(assignee.get("displayName") or assignee.get("display_name") or assignee.get("name") or "").strip()
    return ""


def align_delivery_timing(delivery: dict[str, Any], workspace_root: Path) -> None:
    """Use the run-level start time for the notification and dashboard history."""
    progress = read_json(workspace_lumen_dir(workspace_root) / "results" / "delivery-progress.json")
    if not isinstance(progress, dict):
        return
    if progress.get("story_id") != delivery.get("story_id"):
        return
    started_at = str(progress.get("started_at") or "").strip()
    if started_at:
        delivery["started_at"] = started_at


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
    jira_url = str(story_metadata.get("jiraUrl") or "").strip()
    pr_urls = [str(url).strip() for url in delivery.get("pr_urls") or [] if str(url).strip()]
    verification = [item for item in delivery.get("verification_results") or [] if isinstance(item, dict)]
    passed = [item for item in verification if item.get("status") == "passed"]
    failed = [item for item in verification if item.get("status") == "failed"]
    skipped = [item for item in verification if item.get("status") == "skipped"]

    event_titles = {
        "delivery.started": "Delivery Started",
        "delivery.dev_done": "Delivery Completed",
        "delivery.failed": "Delivery Needs Attention",
        "delivery.blocked": "Delivery Blocked",
    }
    event_templates = {
        "delivery.started": "blue",
        "delivery.dev_done": "green",
        "delivery.failed": "red",
        "delivery.blocked": "orange",
    }
    event_title = f"Lumen · {event_titles.get(event, 'Delivery Update')}"
    template = event_templates.get(event, "grey")

    status_label = {
        "in_progress": "In progress",
        "completed": "Completed",
        "ready_for_finalize": "Ready for finalization",
        "failed": "Failed",
        "blocked": "Blocked",
    }.get(status, status.replace("_", " ").title())
    duration = format_duration(delivery.get("started_at"), delivery.get("finished_at"))
    assignee = str(delivery.get("jira_assignee") or "").strip()

    overview = [
        f"**Status:**  {status_label}",
        f"**Assignee:**  {assignee or 'Unassigned'}",
        f"**Scope:**  {repos or 'No repository recorded'}",
    ]
    if branch:
        overview.append(f"**Branch:**  `{branch}`")
    if duration:
        overview.append(f"**Duration:**  {duration}")

    elements: list[dict[str, Any]] = [
        {"tag": "markdown", "content": "\n".join(overview)},
        {"tag": "hr"},
    ]

    if event == "delivery.started":
        elements.append(
            {
                "tag": "markdown",
                "content": "**What happens next**\nLumen has prepared isolated feature worktrees and started the implementation agent.",
            }
        )
    elif event == "delivery.failed":
        failed_labels = ", ".join(str(item.get("label") or "verification") for item in failed) or "Delivery verification"
        failure_detail = "The full verification profile did not pass. No commit or pull request was created."
        if any("suitable driver class" in str(item.get("summary", "")).lower() for item in failed):
            failure_detail = "The full test suite could not initialise its test database configuration. No commit or pull request was created."
        elements.append(
            {
                "tag": "markdown",
                "content": f"**Action required**\n{failure_detail}\n\n**Failed check**  {failed_labels}",
            }
        )
    else:
        summary = f"**Verification**\nPassed: **{len(passed)}**"
        if failed:
            summary += f"  |  Failed: **{len(failed)}**"
        if skipped:
            summary += f"  |  Skipped: **{len(skipped)}**"
        elements.append({"tag": "markdown", "content": summary})

    if pr_urls:
        elements.extend([
            {"tag": "hr"},
            {"tag": "markdown", "content": f"**Pull requests**\n" + "\n".join(pr_urls)},
        ])

    card: dict[str, Any] = {
        "msg_type": "interactive",
        "card": {
            "schema": "2.0",
            "header": {
                "title": {"tag": "plain_text", "content": event_title},
                "subtitle": {"tag": "plain_text", "content": " · ".join(part for part in (jira_key, title) if part)},
                "template": template,
            },
            "body": {
                "elements": elements
            },
        },
    }
    if jira_url:
        card["card"]["card_link"] = {"url": jira_url}
    return card


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
    align_delivery_timing(delivery, workspace_root)
    story_path = delivery.get("story_path")
    if story_path:
        metadata_path = (docs_dir / str(story_path) / "metadata.json").resolve()
    else:
        metadata_path = docs_dir / "stories" / "metadata.json"

    story_metadata = read_json(metadata_path) if metadata_path.is_file() else {}
    delivery["jira_assignee"] = jira_assignee(workspace_root, story_path)
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
