from __future__ import annotations

from typing import Any

from agents.actions.scan import load_recent_run, save_recent_run, scan_lock_exists
from agents.models import TriggerContext
from agents.parser import parse_dylan_text
from agents.permissions import is_chat_allowed
from agents.project_resolver import known_project_slugs, load_chat_project_map, resolve_project
from feishu.cards import ack_card, progress_card, scan_summary_card
from feishu.config import load_agents_config
from feishu.messenger import FeishuMessenger
from workflows.scan_adapter import ScanAdapter


def handle_agent_message(*, agent_id: str, text: str, meta: dict[str, str]) -> dict[str, Any]:
    agent = str(agent_id or "").strip().lower()
    if agent != "dylan":
        return {"status": "ignored", "detail": f"agent {agent} not enabled in MVP"}

    config = load_agents_config()
    chat_id = str(meta.get("chat_id") or "").strip()
    if not is_chat_allowed(chat_id, config):
        return {"status": "denied", "detail": "chat not allowed"}

    messenger = FeishuMessenger(agent)
    message_id = str(meta.get("message_id") or "").strip()
    known = known_project_slugs()
    action = parse_dylan_text(text, known)

    if action.name == "scan.help":
        if message_id:
            messenger.safe_reply_text(
                message_id,
                "我可以帮你扫描代码。试试：扫描 mbpass 最近七天",
            )
        return {"status": "help", "action": action.name}

    if action.name == "scan.status":
        recent = load_recent_run() or {}
        detail = (
            f"最近 Run: {recent.get('run_id', '无')}\n"
            f"状态: {recent.get('status', 'unknown')}\n"
            f"项目: {recent.get('project', '-')}"
        )
        if message_id:
            messenger.safe_reply_text(message_id, detail)
        return {"status": "ok", "action": action.name, "recent": recent}

    if action.name == "scan.cancel":
        recent = load_recent_run() or {}
        workspace = str(recent.get("workspace") or "").strip()
        if workspace and scan_lock_exists(workspace):
            reply = f"Scan {recent.get('run_id')} 仍在运行；V1 请在本机结束对应进程后重试。"
        else:
            reply = "没有正在运行的 Scan。"
        if message_id:
            messenger.safe_reply_text(message_id, reply)
        return {"status": "ok", "action": action.name}

    mapping = load_chat_project_map()
    project = resolve_project(
        slug=str(action.params.get("project") or ""),
        chat_id=chat_id,
        mapping=mapping,
    )
    if project is None:
        if message_id:
            messenger.safe_reply_text(message_id, "无法解析项目。请写明 slug，例如：扫描 mbpass")
        return {"status": "error", "detail": "project not resolved"}

    slug = str(project.get("slug") or "")
    workspace = str(project.get("workspace") or "")
    if message_id:
        try:
            messenger.reply_card(message_id, ack_card(action.name, slug))
        except Exception:
            messenger.safe_reply_text(message_id, f"已收到，开始扫描 {slug}")

    if workspace and scan_lock_exists(workspace):
        if message_id:
            messenger.safe_reply_text(message_id, f"{slug} 已有 Scan 在运行，请稍后再试。")
        return {"status": "blocked", "detail": "scan lock exists"}

    trigger = TriggerContext(
        source="feishu",
        app_id=str(meta.get("app_id") or ""),
        agent_id=agent,
        user_id=str(meta.get("user_id") or ""),
        chat_id=chat_id,
        thread_id=str(meta.get("thread_id") or ""),
        message_id=message_id,
        chat_type=str(meta.get("chat_type") or ""),
    )
    adapter = ScanAdapter()
    run = adapter.start(
        project_slug=slug,
        window_days=action.params.get("window_days"),
        trigger=trigger,
        dry_run=False,
    )
    save_recent_run({
        "run_id": run.get("run_id"),
        "status": run.get("status"),
        "project": slug,
        "workspace": workspace,
        "result_path": run.get("result_path"),
    })
    if message_id:
        if run.get("status") == "completed":
            scan = run.get("scan") if isinstance(run.get("scan"), dict) else {}
            try:
                messenger.reply_card(message_id, scan_summary_card(str(run.get("run_id")), scan))
            except Exception:
                messenger.safe_reply_text(message_id, f"Scan 完成: {run.get('run_id')}")
        else:
            try:
                messenger.reply_card(
                    message_id,
                    progress_card(str(run.get("run_id")), str(run.get("status")), str(run.get("detail") or "")),
                )
            except Exception:
                messenger.safe_reply_text(
                    message_id,
                    f"Scan {run.get('status')}: {run.get('detail') or run.get('run_id')}",
                )
    return {"status": "ok", "action": action.name, "run": run}
