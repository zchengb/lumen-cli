from __future__ import annotations

from typing import Any

from agents.dylan.directory import get_agent_profile
from agents.dylan.schemas import RouterResult
from agents.dylan.soul_loader import load_soul


def _tool_data(results: list[dict[str, Any]], name: str) -> dict[str, Any]:
    for item in results:
        if item.get("tool") == name:
            data = item.get("data")
            return data if isinstance(data, dict) else {}
    return {}


def compose_response(
    *,
    intent: str,
    router: RouterResult,
    tool_results: list[dict[str, Any]],
    language: str = "zh-Hans",
    context: dict[str, Any] | None = None,
) -> dict[str, Any]:
    soul = load_soul().splitlines()[0] if load_soul() else "Dylan"
    ctx = context or {}

    if router.needs_clarification and router.clarification_question:
        return {"text": router.clarification_question, "mode": "clarification"}

    if intent == "conversation.greeting":
        profile = _tool_data(tool_results, "get_agent_profile") or get_agent_profile("dylan")
        recent = ""
        if ctx.get("project_slug") and ctx.get("last_run_id"):
            recent = f"\n\n刚才的 {ctx['project_slug']} 相关工作还在上下文里，你可以直接问状态或风险。"
        return {
            "text": (
                f"你好。\n\n我是 {profile.get('display_name') or 'Dylan'}。"
                f"我负责追踪那些看起来已经结束、但可能还没有真正消失的工程风险。"
                f"{recent}"
            ),
            "mode": "deterministic",
        }

    if intent == "conversation.agent_identity":
        profile = _tool_data(tool_results, "get_agent_profile") or get_agent_profile("dylan")
        return {
            "text": (
                f"我是 {profile.get('display_name') or 'Dylan'}，{profile.get('role') or 'Engineering Risk Analyst'}。\n"
                f"{profile.get('responsibility') or ''}"
            ).strip(),
            "mode": "deterministic",
        }

    if intent == "conversation.agent_relationship":
        data = _tool_data(tool_results, "get_agent_relationship")
        other = data.get("other") if isinstance(data.get("other"), dict) else {}
        name = other.get("display_name") or router.params.get("other_agent") or "Mark"
        if str(name).lower() == "mark" or str(other.get("id") or "").lower() == "mark":
            return {
                "text": (
                    "我们的工作方向不同，但合作得不错。\n\n"
                    "Mark 负责把需求推向交付；我负责确认交付之后，有没有留下反复出现的裂缝。\n\n"
                    "他比较在意事情是否完成，我比较在意它是不是真的结束了。"
                ),
                "mode": "deterministic",
            }
        return {
            "text": (
                f"我和 {name} 职责不同。"
                f"{name}：{other.get('responsibility') or '协作伙伴'}。"
                "我更关注长期风险是否真正消失。"
            ),
            "mode": "deterministic",
        }

    if intent == "conversation.capabilities":
        caps = _tool_data(tool_results, "list_agent_capabilities").get("capabilities") or []
        lines = ["我可以帮你："] + [f"- {c}" for c in caps]
        return {"text": "\n".join(lines), "mode": "deterministic"}

    if intent == "conversation.thanks":
        return {"text": "好。有新的风险信号时再叫我。", "mode": "deterministic"}

    if intent == "conversation.small_talk":
        return {"text": f"{soul}：可以，不过我更擅长看风险有没有真的结束。", "mode": "deterministic"}

    if intent == "scan.status":
        data = _tool_data(tool_results, "get_recent_scan_status") or _tool_data(tool_results, "get_scan_summary")
        if not data:
            return {"text": "我这边还没有可对照的 Scan Run。你可以先发起一次扫描。", "mode": "deterministic"}
        summary = data.get("summary") if isinstance(data.get("summary"), dict) else {}
        result = _tool_data(tool_results, "get_scan_result")
        high = result.get("high")
        medium = result.get("medium")
        counts = ""
        if high is not None or medium is not None:
            counts = f"\n结果：{high or 0} 个 High、{medium or 0} 个 Medium。"
        elif summary:
            counts = f"\n摘要：{summary}"
        status = str(data.get("status") or "unknown")
        done = status.lower() in {"completed", "success", "done"}
        lead = "完成了。" if done else f"当前状态：{status}。"
        return {
            "text": (
                f"{lead}\n\n"
                f"项目：{data.get('project_slug') or data.get('project') or '-'}\n"
                f"Run ID：{data.get('run_id') or '-'}\n"
                f"状态：{status}{counts}"
            ),
            "mode": "deterministic",
        }

    if intent == "risk.top":
        items = (_tool_data(tool_results, "query_top_risks").get("items") or [])
        if not items:
            return {"text": "当前没有 Open / Reopened Finding。", "mode": "deterministic"}
        lines = ["目前真正值得注意的不是数量，而是这些高分项："]
        for item in items[:5]:
            lines.append(
                f"- [{item.get('effective_severity')}/{item.get('current_risk_band')}] "
                f"{item.get('title')} (score={item.get('current_risk_score')}, id={item.get('id')})"
            )
        return {"text": "\n".join(lines), "mode": "deterministic"}

    if intent == "risk.unresolved":
        data = _tool_data(tool_results, "query_unresolved_findings")
        items = data.get("items") if isinstance(data.get("items"), list) else []
        if not items:
            return {"text": "No open or reopened findings right now.", "mode": "deterministic"}
        lines = [
            f"Unresolved findings: {data.get('total')} "
            f"(High={data.get('high')}, Medium={data.get('medium')}, Low={data.get('low')}, Reopened={data.get('reopened')})"
        ]
        for item in items[:8]:
            lines.append(f"- [{item.get('effective_severity')}] {item.get('title')} ({item.get('id')})")
        return {"text": "\n".join(lines), "mode": "deterministic"}

    if intent in {"risk.explain", "risk.why_severity", "conversation.follow_up"}:
        data = _tool_data(tool_results, "explain_finding")
        if data.get("status") != "ok":
            status_data = _tool_data(tool_results, "get_finding_status")
            if status_data:
                data = {"status": "ok", "finding": status_data, "links": [], "severity_adjustments": []}
            else:
                return {"text": "找不到对应的 Finding。", "mode": "deterministic"}
        finding = data.get("finding") or {}
        idx = None
        if router.reference and router.reference.get("type") == "previous_result":
            idx = router.reference.get("index")
        prefix = f"第{int(idx) + 1}个是 " if isinstance(idx, int) and idx >= 0 else ""
        lines = [
            f"{prefix}{finding.get('id')}：{finding.get('title')}",
            f"技术 Severity={finding.get('source_severity')}，effective={finding.get('effective_severity')}",
            f"Risk Score={finding.get('current_risk_score')}（{finding.get('current_risk_band')}）",
            f"Recurrence={finding.get('recurrence_count')}，Reopened={finding.get('reopened_count')}，"
            f"Occurrence={finding.get('occurrence_count')}",
        ]
        adjustments = data.get("severity_adjustments") or []
        if adjustments:
            latest = adjustments[0]
            lines.append(
                f"Severity adjustment: {latest.get('source_severity')} → {latest.get('effective_severity')} "
                f"({latest.get('reason_codes')})"
            )
        return {"text": "\n".join(lines), "mode": "deterministic"}

    if intent == "risk.finding_links":
        links = _tool_data(tool_results, "get_finding_links")
        jira = links.get("jira")
        pr = links.get("pull_request")
        if pr:
            return {"text": f"目前有关联 PR：{pr.get('url') or pr.get('external_id')}", "mode": "deterministic"}
        if jira:
            return {
                "text": (
                    f"目前没有关联的修复 PR。\n\n"
                    f"Risk Store 里只看到 Jira {jira.get('external_id') or ''}，"
                    f"状态是 {jira.get('status') or 'unknown'}。"
                ).strip(),
                "mode": "deterministic",
            }
        return {"text": "目前没有关联的修复 PR，也没有看到 Jira 链接。", "mode": "deterministic"}

    if intent == "risk.trend":
        payload = _tool_data(tool_results, "query_project_trend")
        if payload.get("status") != "ok":
            return {"text": "目前还没有足够的 Project Risk 历史。", "mode": "deterministic"}
        return {
            "text": (
                f"当前 Project Risk 为 {payload.get('latest_score')}（{payload.get('latest_band')}），"
                f"相对上次 Δ {payload.get('delta')}，趋势 {payload.get('direction')}。"
                f" Open High={payload.get('open_high')}, Reopened={payload.get('reopened')}, "
                f"Overdue High={payload.get('overdue_high')}。"
            ),
            "mode": "deterministic",
        }

    if intent == "risk.recurring":
        items = _tool_data(tool_results, "query_recurring_findings").get("items") or []
        if not items:
            return {"text": "没有观察到明显的复发 Finding。", "mode": "deterministic"}
        lines = ["这些模式在重复出现："]
        for item in items[:5]:
            lines.append(
                f"- {item.get('title')} (recurrence={item.get('recurrence_count')}, "
                f"reopened={item.get('reopened_count')})"
            )
        return {"text": "\n".join(lines), "mode": "deterministic"}

    if intent == "risk.overdue":
        items = _tool_data(tool_results, "query_overdue_high").get("items") or []
        if not items:
            return {"text": "没有超过逾期阈值的 High Finding。", "mode": "deterministic"}
        lines = ["这些 High 已经拖得够久了："]
        for item in items[:5]:
            lines.append(f"- {item.get('title')} ({item.get('age_days')} days, id={item.get('id')})")
        return {"text": "\n".join(lines), "mode": "deterministic"}

    if intent == "unsupported":
        return {
            "text": router.clarification_question
            or "我可以帮你看扫描状态、项目风险，或解释某个 Finding。你具体想问哪一类？",
            "mode": "clarification",
        }

    return {"text": f"{soul}：我只能基于已存储的风险证据回答。", "mode": "deterministic"}
