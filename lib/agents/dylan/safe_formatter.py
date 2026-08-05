from __future__ import annotations

from typing import Any

from agents.dylan.locales import t
from agents.dylan.schemas import RouterResult


def _items(tool_results: list[dict[str, Any]], tool: str) -> list[dict[str, Any]]:
    for result in tool_results:
        if result.get("tool") == tool:
            data = result.get("data") if isinstance(result.get("data"), dict) else {}
            items = data.get("items")
            return items if isinstance(items, list) else []
    return []


def _data(tool_results: list[dict[str, Any]], tool: str) -> dict[str, Any]:
    for result in tool_results:
        if result.get("tool") == tool:
            data = result.get("data")
            return data if isinstance(data, dict) else {}
    return {}


def format_safe(
    *,
    intent: str,
    router: RouterResult,
    tool_results: list[dict[str, Any]],
    language: str,
    context: dict[str, Any] | None = None,
) -> str:
    if router.needs_clarification and router.clarification_question:
        return router.clarification_question
    if intent == "conversation.greeting":
        return t(language, "greeting")
    if intent == "conversation.agent_identity":
        return t(language, "identity")
    if intent == "conversation.agent_relationship":
        other = (router.params or {}).get("other_agent") or "Mark"
        if str(other).lower() == "mark":
            if language.startswith("zh"):
                return (
                    "我们的工作方向不同，但合作得不错。\n\n"
                    "Mark 负责把需求推向交付；我负责确认交付之后，有没有留下反复出现的裂缝。\n\n"
                    "他比较在意事情是否完成，我比较在意它是不是真的结束了。"
                    if language != "zh-Hant" and "Hant" not in language
                    else (
                        "我們的工作方向不同，但合作得不錯。\n\n"
                        "Mark 負責把需求推向交付；我負責確認交付之後，有沒有留下反覆出現的裂縫。\n\n"
                        "他比較在意事情是否完成，我比較在意它是不是真的結束了。"
                    )
                )
            return (
                "We work in different directions, but well together.\n\n"
                "Mark pushes delivery forward; I check whether problems truly ended afterward.\n\n"
                "He cares whether something is finished. I care whether it stayed finished."
            )
        return f"Dylan and {other} have different responsibilities. I focus on long-horizon engineering risk."
    if intent == "risk.top":
        items = _items(tool_results, "query_top_risks")
        if not items:
            return t(language, "no_risk_data")
        lines = ["Top concerns right now:" if language == "en" else "目前真正值得注意的是："]
        for item in items[:5]:
            lines.append(
                f"- [{item.get('effective_severity')}/{item.get('current_risk_band')}] "
                f"{item.get('title')} (score={item.get('current_risk_score')}, id={item.get('id')})"
            )
        return "\n".join(lines)
    if intent == "risk.unresolved":
        data = _data(tool_results, "query_unresolved_findings")
        items = data.get("items") if isinstance(data.get("items"), list) else []
        if not items:
            return "No open or reopened findings right now." if language == "en" else "目前没有 Open / Reopened Finding。"
        lines = [
            f"Unresolved findings: {data.get('total')} (High={data.get('high')}, Medium={data.get('medium')}, "
            f"Low={data.get('low')}, Reopened={data.get('reopened')})"
        ]
        for item in items[:8]:
            lines.append(f"- [{item.get('effective_severity')}] {item.get('title')} ({item.get('id')})")
        return "\n".join(lines)
    if intent == "risk.trend":
        payload = _data(tool_results, "query_project_trend")
        if payload.get("status") != "ok":
            return t(language, "no_risk_data")
        return (
            f"Project risk {payload.get('latest_score')} ({payload.get('latest_band')}), "
            f"Δ {payload.get('delta')}, trend {payload.get('direction')}."
        )
    if intent in {"risk.explain", "risk.why_severity", "conversation.follow_up"}:
        data = _data(tool_results, "explain_finding") or _data(tool_results, "get_finding_summary")
        finding = data.get("finding") if isinstance(data.get("finding"), dict) else data
        if not finding or not finding.get("id"):
            return t(language, "no_finding")
        return (
            f"{finding.get('id')}: {finding.get('title')}\n"
            f"Severity {finding.get('source_severity')} → {finding.get('effective_severity')}\n"
            f"Score {finding.get('current_risk_score')} ({finding.get('current_risk_band')})\n"
            f"Status {finding.get('status')}"
        )
    if intent == "risk.finding_links":
        links = _data(tool_results, "get_finding_links")
        pr = links.get("pull_request")
        jira = links.get("jira")
        if pr:
            return f"Linked PR: {pr.get('url') or pr.get('external_id')}"
        if jira:
            return f"No linked PR. Jira {jira.get('external_id') or ''} status={jira.get('status') or 'unknown'}".strip()
        return "No linked PR or Jira in the risk store."
    if intent == "scan.status":
        data = _data(tool_results, "get_recent_scan_status")
        if not data:
            return t(language, "scan_not_found")
        return (
            f"Run {data.get('run_id') or '-'} status={data.get('status') or 'unknown'} "
            f"project={data.get('project_slug') or data.get('project') or '-'}"
        )
    if intent == "clarification.project":
        return t(language, "no_project")
    if intent.startswith("clarification."):
        return router.clarification_question or t(language, "no_finding")
    if any(r.get("status") == "error" for r in tool_results):
        return t(language, "tool_unavailable")
    return t(language, "no_risk_data")
