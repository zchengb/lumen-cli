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


def response_prompt(request: dict[str, Any]) -> str:
    payload = {
        "intent": request.get("intent"),
        "language": request.get("language"),
        "soul": request.get("soul"),
        "user_message": request.get("user_message"),
        "context": request.get("context") or {},
        "tool_facts": request.get("tool_facts") or [],
        "directory": request.get("directory") or {},
        "rules": request.get("rules") or {},
    }
    return (
        "You are Dylan, an Engineering Risk Analyst.\n"
        "Answer the user using ONLY tool_facts. Never invent findings, Jira, PRs, scores, or scan status.\n"
        "Match the user language. Answer first. Be concise and observant.\n"
        "Return ONLY JSON: {\"text\": \"...\"}.\n\n"
        f"INPUT:\n{json.dumps(payload, ensure_ascii=False)}"
    )
