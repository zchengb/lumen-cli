from __future__ import annotations

import re


_PLANNING_PREFIX = re.compile(
    r"^(?:I'll |I will |Let me |I'm going to |I am going to |Pulling |Checking |Looking |Atlassian |"
    r"Using |Running |Searching |Reading |Investigating ).{0,240}?\n+",
    re.IGNORECASE | re.MULTILINE,
)


def sanitize_feishu_answer(text: str) -> str:
    raw = str(text or "").strip()
    if not raw:
        return raw
    # Drop leading investigation-narration paragraphs before the real answer.
    cleaned = raw
    for _ in range(6):
        nxt = _PLANNING_PREFIX.sub("", cleaned, count=1).lstrip()
        if nxt == cleaned:
            break
        cleaned = nxt
    # If the model mixed narration into one blob, prefer from first markdown heading/list.
    if "### " in cleaned or "## " in cleaned:
        for marker in ("\n### ", "\n## ", "\n**"):
            idx = cleaned.find(marker)
            if idx > 40:
                head = cleaned[:idx].strip()
                if any(tok in head.lower() for tok in ("i'll ", "pulling ", "checking ", "looking ", "via `", "mcp")):
                    cleaned = cleaned[idx + 1 :].lstrip()
                    break
    return cleaned.strip() or raw
