from __future__ import annotations

import re
from dataclasses import dataclass


_PLANNING_PREFIX = re.compile(
    r"^(?:I'll |I will |Let me |I'm going to |I am going to |Pulling |Checking |Looking |Atlassian |"
    r"Using |Running |Searching |Reading |Investigating ).{0,240}?\n+",
    re.IGNORECASE | re.MULTILINE,
)

_FINAL_ENVELOPE = re.compile(
    r"<FINAL_RESPONSE>\s*(.*?)\s*</FINAL_RESPONSE>",
    re.IGNORECASE | re.DOTALL,
)


@dataclass
class FinalResponseParse:
    text: str
    mode: str
    valid: bool
    fallback_used: bool
    error_code: str = ""


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


def extract_final_response(raw: str) -> FinalResponseParse:
    text = str(raw or "").strip()
    if not text:
        return FinalResponseParse(
            text="",
            mode="empty",
            valid=False,
            fallback_used=True,
            error_code="EMPTY_RESPONSE",
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
            )
    cleaned = sanitize_feishu_answer(text)
    return FinalResponseParse(
        text=cleaned,
        mode="legacy_sanitizer",
        valid=bool(cleaned),
        fallback_used=True,
        error_code="" if cleaned else "SANITIZE_EMPTY",
    )
