from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from typing import Any


_PLANNING_PREFIX = re.compile(
    r"^(?:I'll |I will |Let me |I'm going to |I am going to |Pulling |Checking |Looking |Atlassian |"
    r"Using |Running |Searching |Reading |Investigating ).{0,240}?\n+",
    re.IGNORECASE | re.MULTILINE,
)

_FINAL_ENVELOPE = re.compile(
    r"<FINAL_RESPONSE>\s*(.*?)\s*</FINAL_RESPONSE>",
    re.IGNORECASE | re.DOTALL,
)

_ACTION_ENVELOPE = re.compile(
    r"<ACTION_REQUEST>\s*(.*?)\s*</ACTION_REQUEST>",
    re.IGNORECASE | re.DOTALL,
)

_FORGED_IDENTITY_KEYS = frozenset(
    {
        "actor_user_id",
        "actor",
        "chat_id",
        "thread_id",
        "source_message_id",
        "trace_id",
        "explicit_authorization",
        "agent_id",
        "project_slug",
    }
)


@dataclass
class FinalResponseParse:
    text: str
    mode: str
    valid: bool
    fallback_used: bool
    error_code: str = ""
    action_requests: list[dict[str, Any]] = field(default_factory=list)


def sanitize_feishu_answer(text: str) -> str:
    raw = str(text or "").strip()
    if not raw:
        return raw
    cleaned = raw
    for _ in range(6):
        nxt = _PLANNING_PREFIX.sub("", cleaned, count=1).lstrip()
        if nxt == cleaned:
            break
        cleaned = nxt
    if "### " in cleaned or "## " in cleaned:
        for marker in ("\n### ", "\n## ", "\n**"):
            idx = cleaned.find(marker)
            if idx > 40:
                head = cleaned[:idx].strip()
                if any(tok in head.lower() for tok in ("i'll ", "pulling ", "checking ", "looking ", "via `", "mcp")):
                    cleaned = cleaned[idx + 1 :].lstrip()
                    break
    return cleaned.strip() or raw


def _strip_forged_identity(payload: dict[str, Any]) -> dict[str, Any]:
    cleaned = {k: v for k, v in payload.items() if k not in _FORGED_IDENTITY_KEYS}
    resource = cleaned.get("resource")
    if isinstance(resource, dict):
        cleaned["resource"] = {k: v for k, v in resource.items() if k not in _FORGED_IDENTITY_KEYS}
    arguments = cleaned.get("arguments")
    if isinstance(arguments, dict):
        cleaned["arguments"] = {k: v for k, v in arguments.items() if k not in _FORGED_IDENTITY_KEYS}
    return cleaned


def extract_action_requests(raw: str) -> list[dict[str, Any]]:
    text = str(raw or "")
    requests: list[dict[str, Any]] = []
    for match in _ACTION_ENVELOPE.finditer(text):
        body = match.group(1).strip()
        if not body:
            continue
        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            continue
        if not isinstance(payload, dict):
            continue
        action = str(payload.get("action") or "").strip()
        if not action:
            continue
        cleaned = _strip_forged_identity(payload)
        cleaned["action"] = action
        if "resource" not in cleaned or not isinstance(cleaned.get("resource"), dict):
            cleaned["resource"] = {}
        if "arguments" not in cleaned or not isinstance(cleaned.get("arguments"), dict):
            cleaned["arguments"] = {}
        requests.append(cleaned)
    return requests


def extract_final_response(raw: str) -> FinalResponseParse:
    text = str(raw or "").strip()
    actions = extract_action_requests(text)
    if not text:
        return FinalResponseParse(
            text="",
            mode="empty",
            valid=False,
            fallback_used=True,
            error_code="EMPTY_RESPONSE",
            action_requests=actions,
        )
    match = _FINAL_ENVELOPE.search(text)
    if match:
        body = match.group(1).strip()
        if body:
            return FinalResponseParse(
                text=body,
                mode="final_response_envelope",
                valid=True,
                fallback_used=False,
                action_requests=actions,
            )
    without_actions = _ACTION_ENVELOPE.sub("", text).strip()
    cleaned = sanitize_feishu_answer(without_actions or text)
    return FinalResponseParse(
        text=cleaned,
        mode="legacy_sanitizer",
        valid=bool(cleaned),
        fallback_used=True,
        error_code="" if cleaned else "SANITIZE_EMPTY",
        action_requests=actions,
    )


def format_action_receipts_summary(receipts: list[dict[str, Any]]) -> str:
    if not receipts:
        return ""
    lines = []
    for receipt in receipts:
        action = receipt.get("action") or "action"
        status = receipt.get("status") or "unknown"
        if status == "succeeded":
            lines.append(f"- {action}: succeeded")
        else:
            err = receipt.get("error") or receipt.get("error_code") or status
            lines.append(f"- {action}: {status} ({err})")
    return "Action results:\n" + "\n".join(lines)
