from __future__ import annotations

import re
from typing import Any

from agents.dylan.schemas import ALLOWED_INTENTS, INTENT_TOOLS, RouterResult, ToolCall


def _tool(name: str, **kwargs: Any) -> ToolCall:
    return ToolCall(name=name, arguments=kwargs)


def validate_router_result(result: RouterResult) -> RouterResult:
    if result.intent not in ALLOWED_INTENTS:
        return RouterResult(
            intent="unsupported",
            confidence=0.2,
            source=f"{result.source}:invalid_intent",
            needs_clarification=True,
            clarification_question="I can help with scan status, project risk, or a specific finding. Which one?",
        )
    allowed_tools = INTENT_TOOLS.get(result.intent)
    if allowed_tools is not None:
        cleaned = []
        for call in result.tool_calls:
            if call.name in allowed_tools:
                cleaned.append(call)
        result.tool_calls = cleaned
    if result.confidence < 0.60 and not result.needs_clarification:
        result.needs_clarification = True
        result.clarification_question = result.clarification_question or (
            "I want to be sure I answer the right thing. Do you mean top risks, unresolved findings, or scan status?"
        )
    return result


def heuristic_classify(request: dict[str, Any]) -> RouterResult:
    message = str(request.get("message") or "").strip().lower()
    context = request.get("context") if isinstance(request.get("context"), dict) else {}
    known = {str(x).lower() for x in (request.get("known_projects") or [])}

    def has(*words: str) -> bool:
        return any(w in message for w in words)

    project = None
    for slug in known:
        if slug and slug in message:
            project = slug
            break

    if re.fullmatch(r"(hi|hello|hey|你好|您好)[!!.。？?\s]*", message):
        return validate_router_result(
            RouterResult(
                intent="conversation.greeting",
                confidence=0.95,
                source="heuristic:greeting",
                tool_calls=[_tool("get_agent_profile", agent_id="dylan")],
            )
        )
    if has("who are you", "what do you do", "你是谁", "你是誰", "介绍一下", "介紹一下"):
        return validate_router_result(
            RouterResult(
                intent="conversation.agent_identity",
                confidence=0.9,
                source="heuristic:identity",
                tool_calls=[_tool("get_agent_profile", agent_id="dylan"), _tool("list_agent_capabilities", agent_id="dylan")],
            )
        )
    if has("mark", "milchick", "irving") and has("work with", "relationship", "关系", "關係", "相处", "相處"):
        other = "mark"
        for name in ("mark", "milchick", "irving"):
            if name in message:
                other = name
                break
        return validate_router_result(
            RouterResult(
                intent="conversation.agent_relationship",
                confidence=0.9,
                source="heuristic:relationship",
                tool_calls=[_tool("get_agent_relationship", agent_id="dylan", other_id=other)],
                params={"other_agent": other},
            )
        )

    ordinal = None
    if has("second one", "number two", "the second", "第二个", "第二個", "第二"):
        ordinal = 1
    elif has("first one", "number one", "the first", "第一个", "第一個", "第一"):
        ordinal = 0
    elif has("third one", "number three", "the third", "第三个", "第三個", "第三"):
        ordinal = 2
    elif has("last one", "the last", "最后一个", "最後一個"):
        ids = context.get("last_result_ids") if isinstance(context.get("last_result_ids"), list) else []
        ordinal = len(ids) - 1 if ids else None
    if ordinal is not None:
        ids = context.get("last_result_ids") if isinstance(context.get("last_result_ids"), list) else []
        finding_id = str(ids[ordinal]) if ids and 0 <= ordinal < len(ids) else None
        pending = str(context.get("pending_intent") or "")
        intent = pending if pending.startswith("risk.") else "conversation.follow_up"
        tools = [_tool("explain_finding", finding_id=finding_id or ""), _tool("get_finding_summary", finding_id=finding_id or "")]
        if pending == "risk.finding_links" or has("pr", "pull request"):
            intent = "risk.finding_links"
            tools = [_tool("get_finding_links", finding_id=finding_id or "")]
        return validate_router_result(
            RouterResult(
                intent=intent if finding_id else "clarification.reference",
                confidence=0.9 if finding_id else 0.7,
                source="heuristic:ordinal",
                finding_id=finding_id,
                reference={"type": "previous_result", "index": ordinal},
                needs_clarification=not bool(finding_id),
                clarification_question=None if finding_id else "Which finding from the previous list?",
                tool_calls=tools if finding_id else [],
                params={"finding_id": finding_id, "project": project},
            )
        )

    if has("unresolved", "still open", "still outstanding", "remains unfixed", "未解决", "未解決", "没处理", "沒處理", "还有问题", "還有問題"):
        return validate_router_result(
            RouterResult(
                intent="risk.unresolved",
                confidence=0.9,
                source="heuristic:unresolved",
                project_slug=project,
                tool_calls=[_tool("query_unresolved_findings", project_slug=project or "", limit=10)],
                params={"project": project},
            )
        )
    if has("largest risk", "biggest risk", "worry about", "main concern", "dangerous", "top risk", "最值得注意", "最大的", "最严重", "最嚴重", "工程风险", "工程風險"):
        return validate_router_result(
            RouterResult(
                intent="risk.top",
                confidence=0.9,
                source="heuristic:top",
                project_slug=project,
                tool_calls=[_tool("query_top_risks", limit=5, project_slug=project or "")],
                params={"project": project},
            )
        )
    if has("getting worse", "improving", "compare with last", "trend", "上升", "下降", "趋势", "趨勢"):
        return validate_router_result(
            RouterResult(
                intent="risk.trend",
                confidence=0.88,
                source="heuristic:trend",
                project_slug=project,
                tool_calls=[_tool("query_project_trend", project_slug=project or "")],
                params={"project": project},
            )
        )
    if has("recurring", "reopen", "keep coming", "反复", "復发", "复发", "復發"):
        return validate_router_result(
            RouterResult(
                intent="risk.recurring",
                confidence=0.88,
                source="heuristic:recurring",
                project_slug=project,
                tool_calls=[_tool("query_recurring_findings", project_slug=project or "")],
                params={"project": project},
            )
        )
    if has("overdue", "too long", "逾期", "超过七天", "超過七天"):
        return validate_router_result(
            RouterResult(
                intent="risk.overdue",
                confidence=0.88,
                source="heuristic:overdue",
                project_slug=project,
                tool_calls=[_tool("query_overdue_high", project_slug=project or "")],
                params={"project": project},
            )
        )
    if (has("pr", "pull request") or has("jira")) and (has("it", "that", "this", "它", "这个", "這個", "该问题", "該問題") or context.get("last_finding_id")):
        finding_id = str(context.get("last_finding_id") or "")
        return validate_router_result(
            RouterResult(
                intent="risk.finding_links" if finding_id else "clarification.finding",
                confidence=0.86 if finding_id else 0.7,
                source="heuristic:links",
                finding_id=finding_id or None,
                needs_clarification=not bool(finding_id),
                clarification_question=None if finding_id else "Which finding—first or second from my previous answer?",
                tool_calls=[_tool("get_finding_links", finding_id=finding_id)] if finding_id else [],
                params={"finding_id": finding_id, "pending_intent": "risk.finding_links"},
            )
        )
    if has("finished", "completed", "done yet", "status", "完成了", "好了吗", "好了嗎"):
        return validate_router_result(
            RouterResult(
                intent="scan.status",
                confidence=0.85,
                source="heuristic:status",
                tool_calls=[_tool("get_recent_scan_status", scope="thread")],
            )
        )
    return validate_router_result(
        RouterResult(
            intent="unsupported",
            confidence=0.4,
            source="heuristic:fallback",
            needs_clarification=True,
            clarification_question="I can help with scan status, unresolved findings, or top risks. Which do you mean?",
        )
    )


def semantic_route(
    request: dict[str, Any],
    *,
    model_client: Any,
    llm_enabled: bool,
) -> RouterResult:
    heuristic = heuristic_classify(request)
    if heuristic.confidence >= 0.82 and heuristic.intent not in {"unsupported", "clarification.reference"}:
        return heuristic
    if llm_enabled and model_client is not None:
        try:
            result = model_client.classify(request)
            validated = validate_router_result(result)
            if validated.confidence >= heuristic.confidence:
                return validated
        except Exception:
            pass
    return heuristic
