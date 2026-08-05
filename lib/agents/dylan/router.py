from __future__ import annotations

import re
from typing import Any, Optional

from agents.dylan.normalizer import NormalizedMessage
from agents.dylan.schemas import RouterResult, ToolCall
from agents.parser import extract_window_days

_ORDINAL = {
    "第一": 0, "第二个": 1, "第二個": 1, "第二": 1, "第三个": 2, "第三個": 2, "第三": 2,
    "第一个": 0, "第一個": 0, "上一个": -1, "上一個": -1,
}


def _tool(name: str, **kwargs: Any) -> ToolCall:
    return ToolCall(name=name, arguments=kwargs)


def route_message(
    message: NormalizedMessage,
    *,
    context: Optional[dict[str, Any]] = None,
    known_slugs: Optional[set[str]] = None,
) -> RouterResult:
    text = message.normalized_text
    ctx = context or {}
    params: dict[str, Any] = {}
    days = extract_window_days(message.original_text) or extract_window_days(text)
    if days is not None:
        params["window_days"] = days
    if message.project_slug:
        params["project"] = message.project_slug
    if message.finding_id:
        params["finding_id"] = message.finding_id
    if message.run_id:
        params["run_id"] = message.run_id

    if not text:
        return RouterResult(
            intent="clarification.reference",
            confidence=0.9,
            source="empty",
            needs_clarification=True,
            clarification_question="你想问扫描状态、风险，还是某个 Finding？",
        )

    if re.search(r"^(你好|您好|hi|hello)[\s!！.。]*$", text):
        return RouterResult(
            intent="conversation.greeting",
            confidence=0.95,
            source="rule:greeting",
            tool_calls=[_tool("get_agent_profile", agent_id="dylan"), _tool("get_thread_context")],
            params=params,
        )

    if re.search(r"(谢谢|多謝|多谢|thanks|thank you)", text):
        return RouterResult(intent="conversation.thanks", confidence=0.9, source="rule:thanks", params=params)

    if re.search(r"(你是谁|你是誰|介绍一下你自己|介紹一下你自己|who are you)", text):
        return RouterResult(
            intent="conversation.agent_identity",
            confidence=0.92,
            source="rule:identity",
            tool_calls=[_tool("get_agent_profile", agent_id="dylan"), _tool("list_agent_capabilities", agent_id="dylan")],
            params=params,
        )

    if re.search(r"(你会什么|你會什麼|能做什么|能做什麼|capabilities)", text):
        return RouterResult(
            intent="conversation.capabilities",
            confidence=0.9,
            source="rule:capabilities",
            tool_calls=[_tool("list_agent_capabilities", agent_id="dylan")],
            params=params,
        )

    rel = re.search(r"(和|跟|与|與)\s*(mark|milchick|irving|dylan)\s*(关系|關係|相处|相處)", text, re.I)
    if rel or re.search(r"(mark|milchick|irving).*(关系|關係)", text, re.I):
        other = "mark"
        for name in ("mark", "milchick", "irving", "dylan"):
            if name in text:
                other = name
                break
        return RouterResult(
            intent="conversation.agent_relationship",
            confidence=0.93,
            source="rule:relationship",
            tool_calls=[_tool("get_agent_relationship", agent_id="dylan", other_id=other)],
            params={**params, "other_agent": other},
        )

    for token, index in _ORDINAL.items():
        if token in message.original_text or token in text:
            finding_id = None
            ids = ctx.get("last_result_ids") if isinstance(ctx.get("last_result_ids"), list) else []
            if not ids:
                return RouterResult(
                    intent="clarification.reference",
                    confidence=0.8,
                    source="rule:follow_up",
                    needs_clarification=True,
                    clarification_question="我还没有上一轮 Finding 列表。你想看哪个 Finding？",
                    reference={"type": "previous_result", "index": index if index >= 0 else 0},
                    params=params,
                )
            if index == -1:
                finding_id = str(ids[0])
            elif 0 <= index < len(ids):
                finding_id = str(ids[index])
            else:
                return RouterResult(
                    intent="clarification.reference",
                    confidence=0.85,
                    source="rule:follow_up",
                    needs_clarification=True,
                    clarification_question=f"上一轮只返回了 {len(ids)} 个 Finding，没有第 {index + 1} 个。",
                    reference={"type": "previous_result", "index": index},
                    params=params,
                )
            return RouterResult(
                intent="conversation.follow_up",
                confidence=0.9,
                source="rule:follow_up",
                finding_id=finding_id,
                reference={"type": "previous_result", "index": index if index >= 0 else 0},
                tool_calls=[_tool("explain_finding", finding_id=finding_id or ""), _tool("get_finding_links", finding_id=finding_id or "")],
                params={**params, "finding_id": finding_id},
            )

    if re.search(r"(它|这个|這個|该问题|該問題).*(有\s*pr|pr\s*了|pull\s*request)", text) or re.search(r"(有没有pr|有沒有pr|有 pr 了吗|有 pr 了嗎)", text):
        finding_id = message.finding_id or str(ctx.get("last_finding_id") or "")
        if not finding_id:
            return RouterResult(
                intent="clarification.finding",
                confidence=0.75,
                source="rule:finding_links",
                needs_clarification=True,
                clarification_question="你指的是哪个 Finding？可以说编号，或先问最近最大的风险。",
            )
        return RouterResult(
            intent="risk.finding_links",
            confidence=0.9,
            source="rule:finding_links",
            finding_id=finding_id,
            tool_calls=[_tool("get_finding_links", finding_id=finding_id), _tool("get_finding_status", finding_id=finding_id)],
            params={**params, "finding_id": finding_id},
        )

    if re.search(r"(取消|cancel|停下|stop)", text):
        return RouterResult(intent="scan.cancel", confidence=0.92, source="rule:cancel", params=params)

    if re.search(r"(完成了吗|状态|status|刚才.*吗|剛才.*嗎|刚纔.*吗)", text) and not re.search(r"(风险|風險|finding)", text):
        return RouterResult(
            intent="scan.status",
            confidence=0.9,
            source="rule:status",
            reference={"type": "last_run"},
            tool_calls=[_tool("get_recent_scan_status", scope="thread")],
            params=params,
        )

    if re.search(r"(为什么.*(提升|升成|变成).*high|为何.*severity|why.*severity|为什么被升)", text):
        finding_id = message.finding_id or str(ctx.get("last_finding_id") or "")
        return RouterResult(
            intent="risk.why_severity",
            confidence=0.88,
            source="rule:why_sev",
            finding_id=finding_id or None,
            tool_calls=[_tool("explain_finding", finding_id=finding_id)] if finding_id else [],
            needs_clarification=not bool(finding_id),
            clarification_question=None if finding_id else "你想解释哪个 Finding 的 Severity？",
            params={**params, "finding_id": finding_id},
        )

    if re.search(r"(超过七天|逾期|长期没有处理|没处理|overdue)", text):
        return RouterResult(
            intent="risk.overdue",
            confidence=0.88,
            source="rule:overdue",
            tool_calls=[_tool("query_overdue_high")],
            params=params,
        )
    if re.search(r"(反复出现|复發|复发|reopen|recurring)", text):
        return RouterResult(
            intent="risk.recurring",
            confidence=0.88,
            source="rule:recurring",
            tool_calls=[_tool("query_recurring_findings")],
            params=params,
        )
    if re.search(r"(上升还是下降|风险趋势|比上週|比上周|更糟|trend)", text):
        return RouterResult(
            intent="risk.trend",
            confidence=0.88,
            source="rule:trend",
            tool_calls=[_tool("query_project_trend")],
            params=params,
        )
    if re.search(r"(最大的?(工程)?风险|top\s*risk|最值得注意|最严重|最近.*风险|最近.*風險)", text):
        return RouterResult(
            intent="risk.top",
            confidence=0.9,
            source="rule:top",
            tool_calls=[_tool("query_top_risks", limit=5)],
            params=params,
        )
    if message.finding_id and re.search(r"(解释|為什麼|为什么|explain|怎么回事|狀態|状态)", text):
        return RouterResult(
            intent="risk.explain",
            confidence=0.86,
            source="rule:explain",
            finding_id=message.finding_id,
            tool_calls=[_tool("explain_finding", finding_id=message.finding_id)],
            params=params,
        )

    if re.search(r"(扫描|扫一下|scan|看看代码|代码审查)", text) or (params.get("project") and re.search(r"(扫|scan)", text)):
        return RouterResult(
            intent="scan.run",
            confidence=0.85 if re.search(r"(扫描|扫一下|scan)", text) else 0.75,
            source="rule:scan",
            project_slug=message.project_slug,
            params=params,
        )

    if re.search(r"(闲聊|天气|吃饭|笑话)", text):
        return RouterResult(intent="conversation.small_talk", confidence=0.7, source="rule:small_talk", params=params)

    return RouterResult(
        intent="unsupported",
        confidence=0.45,
        source="fallback",
        needs_clarification=True,
        clarification_question="我可以帮你看扫描状态、项目风险，或解释某个 Finding。你具体想问哪一类？",
        params=params,
    )
