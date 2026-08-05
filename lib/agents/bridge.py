from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from agents.actions.scan import load_recent_run, save_recent_run, scan_lock_exists
from agents.dylan.schemas import ConversationFlags
from agents.models import TriggerContext
from agents.parser import parse_dylan_text
from agents.permissions import is_chat_allowed
from agents.project_resolver import known_project_slugs, load_chat_project_map, resolve_project
from feishu.cards import ack_card, progress_card, scan_summary_card
from feishu.config import load_agents_config
from feishu.messenger import FeishuMessenger
from workflows.scan_adapter import ScanAdapter


def _load_workspace_common(workspace: str) -> dict[str, Any]:
    common_path = Path(workspace) / "config" / "common.json"
    if not Path(workspace).is_dir() or not common_path.is_file():
        return {}
    try:
        data = json.loads(common_path.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def _conversation_enabled(config: dict[str, Any], common: dict[str, Any]) -> bool:
    return ConversationFlags.from_common(common, config).enabled


def _persist_agent_run(run: dict[str, Any], *, meta: dict[str, str], slug: str, action: str) -> None:
    try:
        from risk.store import GlobalAgentStore

        gs = GlobalAgentStore()
        scan = run.get("scan") if isinstance(run.get("scan"), dict) else {}
        findings = scan.get("findings") if isinstance(scan.get("findings"), list) else []
        gs.save_agent_run(
            {
                "run_id": run.get("run_id"),
                "agent_id": "dylan",
                "project_slug": slug,
                "chat_id": meta.get("chat_id"),
                "thread_id": meta.get("thread_id"),
                "user_id": meta.get("user_id"),
                "action": action,
                "status": run.get("status"),
                "started_at": scan.get("started_at"),
                "completed_at": scan.get("finished_at"),
                "result_path": run.get("result_path"),
                "summary": {
                    "finding_count": len(findings),
                    "high": sum(1 for f in findings if isinstance(f, dict) and str(f.get("severity")) == "High"),
                    "medium": sum(1 for f in findings if isinstance(f, dict) and str(f.get("severity")) == "Medium"),
                },
                "error": run.get("detail") if run.get("status") not in {"completed", "success"} else None,
            }
        )
        if meta.get("chat_id"):
            gs.set_chat_project(str(meta["chat_id"]), slug)
            gs.upsert_conversation_context(
                {
                    "chat_id": meta.get("chat_id"),
                    "thread_id": meta.get("thread_id"),
                    "user_id": meta.get("user_id"),
                    "project_slug": slug,
                    "last_intent": action,
                    "last_run_id": run.get("run_id"),
                    "recent_entities": {"window_days": run.get("window_days")},
                }
            )
        gs.close()
    except Exception:
        pass


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

    # Probe common from chat-mapped project for feature flags when possible.
    mapped = resolve_project(chat_id=chat_id, mapping=load_chat_project_map())
    probe_common = _load_workspace_common(str(mapped.get("workspace") or "")) if mapped else {}
    if _conversation_enabled(config, probe_common):
        from agents.dylan.conversation import handle_conversation

        result = handle_conversation(
            text=text,
            meta=meta,
            common=probe_common,
            agents_config=config,
            known_slugs=known,
        )
        if result.get("status") == "delegate":
            action_name = str(result.get("action") or "")
            params = result.get("params") if isinstance(result.get("params"), dict) else {}
            if action_name == "scan.cancel":
                recent = load_recent_run() or {}
                workspace = str(recent.get("workspace") or "").strip()
                if workspace and scan_lock_exists(workspace):
                    reply = f"Scan {recent.get('run_id')} 仍在运行；V1 请在本机结束对应进程后重试。"
                else:
                    reply = "没有正在运行的 Scan。"
                if message_id:
                    messenger.safe_reply_text(message_id, reply)
                return {"status": "ok", "action": action_name}
            # fall through to scan.run with params
            from agents.parser import ParsedAction

            action = ParsedAction(name="scan.run", confidence=0.9, source="conversation_v2", params=params)
        else:
            if message_id:
                messenger.safe_reply_text(message_id, str(result.get("text") or "暂无数据。"))
            return result
    else:
        action = parse_dylan_text(text, known)

        if action.name.startswith("risk."):
            project = resolve_project(
                slug=str(action.params.get("project") or ""),
                chat_id=chat_id,
                mapping=load_chat_project_map(),
            )
            if project is None:
                if message_id:
                    messenger.safe_reply_text(message_id, "无法解析项目。请写明 slug，例如：mbpass 最近最大的风险是什么？")
                return {"status": "error", "detail": "project not resolved"}
            workspace = str(project.get("workspace") or "")
            common = _load_workspace_common(workspace)
            project_meta = common.setdefault("project", {})
            if isinstance(project_meta, dict) and not project_meta.get("slug"):
                project_meta["slug"] = str(project.get("slug") or "")
            from agents.dylan.conversation import answer_risk_query

            result = answer_risk_query(
                workspace=Path(workspace),
                common=common,
                action=action.name,
                params={**action.params, "project": str(project.get("slug") or "")},
            )
            if message_id:
                messenger.safe_reply_text(message_id, str(result.get("text") or "暂无风险数据。"))
            try:
                from risk.store import GlobalAgentStore

                gs = GlobalAgentStore()
                gs.set_chat_project(chat_id, str(project.get("slug") or ""))
                gs.close()
            except Exception:
                pass
            return result

        if action.name == "scan.help":
            if message_id:
                messenger.safe_reply_text(
                    message_id,
                    "我是 Dylan（Engineering Risk Analyst）。\n"
                    "可以：扫描 mbpass 最近七天\n"
                    "或问：最近最大的风险是什么？风险在上升还是下降？哪些问题反复出现？",
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
    _persist_agent_run(run, meta=meta, slug=slug, action="scan.run")
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
