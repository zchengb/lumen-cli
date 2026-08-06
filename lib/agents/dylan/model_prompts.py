from __future__ import annotations

import json
from typing import Any


def router_prompt(request: dict[str, Any]) -> str:
    payload = {
        "message": request.get("message"),
        "language": request.get("language"),
        "available_intents": request.get("available_intents"),
        "context": request.get("context") or {},
        "known_projects": request.get("known_projects") or [],
    }
    return (
        "You are Dylan's intent router for an Engineering Risk Analyst.\n"
        "Classify the user message into exactly one allowlisted intent.\n"
        "Return ONLY compact JSON with keys: intent, confidence, project_slug, finding_id, run_id, "
        "reference, needs_clarification, clarification_question, tool_calls.\n"
        "tool_calls is an array of {name, arguments}. Use only read-only tools.\n"
        "Do not invent Finding IDs, Jira keys, or PRs.\n"
        "If unsure below 0.60 confidence, set needs_clarification=true.\n\n"
        f"INPUT:\n{json.dumps(payload, ensure_ascii=False)}"
    )


def planner_prompt(request: dict[str, Any]) -> str:
    payload = {
        "message": request.get("message"),
        "language": request.get("language"),
        "available_intents": request.get("available_intents"),
        "known_projects": request.get("known_projects") or [],
        "context": request.get("context") or {},
        "soul": request.get("soul") or "",
        "intent_tools": {
            "risk.recent": ["query_recent_findings", "query_unresolved_findings", "get_recent_scan_status"],
            "risk.unresolved": ["query_unresolved_findings"],
            "risk.top": ["query_top_risks"],
            "risk.trend": ["query_project_trend"],
            "risk.compare_period": ["compare_project_risk", "query_recent_findings"],
            "scan.summary": ["get_scan_summary", "get_scan_result", "query_recent_findings"],
            "conversation.agent_identity": ["get_agent_profile", "list_agent_capabilities"],
            "conversation.agent_relationship": ["get_agent_relationship"],
        },
    }
    return (
        "You are Dylan's planner for an Engineering Risk Analyst.\n"
        "Understand the user message and return a task list. Support multiple tasks in one message.\n"
        "Return ONLY compact JSON with keys: language, confidence, needs_clarification, "
        "clarification_question, tasks.\n"
        "Each task: {task_id, intent, project_slug?, finding_id?, params?, tool_calls}.\n"
        "tool_calls is an array of {name, arguments}. Use only read-only tools from intent_tools.\n"
        "For any risk.* or scan.* factual question, tool_calls MUST be non-empty.\n"
        "For 'past N days / summarize findings / what happened recently', use intent risk.recent "
        "with query_recent_findings(window_days=N) plus query_unresolved_findings.\n"
        "Use allowlisted intents only. Do not invent Finding IDs, Jira keys, or PRs.\n"
        "If a scan should start, use intent scan.run with params.window_days.\n"
        "If unsure, set needs_clarification=true and leave tasks empty or minimal.\n\n"
        f"INPUT:\n{json.dumps(payload, ensure_ascii=False)}"
    )


def response_prompt(request: dict[str, Any]) -> str:
    payload = {
        "intent": request.get("intent"),
        "language": request.get("language"),
        "soul": request.get("soul"),
        "user_message": request.get("user_message"),
        "tasks": request.get("tasks") or [],
        "context": request.get("context") or {},
        "tool_facts": request.get("tool_facts") or [],
        "directory": request.get("directory") or {},
        "rules": request.get("rules") or {},
    }
    return (
        "You are Dylan, an Engineering Risk Analyst.\n"
        "Answer the user using ONLY tool_facts. Never invent findings, Jira, PRs, scores, or scan status.\n"
        "If multiple tasks exist, answer them coherently in one reply.\n"
        "Match the user language. Answer first. Be concise and observant.\n"
        "Return ONLY JSON: {\"text\": \"...\"}.\n\n"
        f"INPUT:\n{json.dumps(payload, ensure_ascii=False)}"
    )
