from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Optional


def agents_home() -> Path:
    override = os.environ.get("LUMEN_AGENTS_HOME", "").strip()
    if override:
        return Path(override).expanduser()
    return Path.home() / ".lumen" / "agents"


def outbound_path() -> Path:
    return agents_home() / "dylan_outbound.jsonl"


def remember_outbound(*, message_id: str, text: str, chat_id: str = "", agent_id: str = "dylan") -> None:
    mid = str(message_id or "").strip()
    body = str(text or "").strip()
    if not mid or not body:
        return
    path = outbound_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    row = {
        "message_id": mid,
        "chat_id": str(chat_id or ""),
        "agent_id": str(agent_id or "dylan"),
        "text": body[:8000],
    }
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(row, ensure_ascii=False) + "\n")
    # ponytail: truncate file when huge; ceiling ~500 rows, rewrite if larger
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
        if len(lines) > 600:
            path.write_text("\n".join(lines[-500:]) + "\n", encoding="utf-8")
    except Exception:
        pass


def lookup_outbound(message_id: str) -> str:
    mid = str(message_id or "").strip()
    if not mid:
        return ""
    path = outbound_path()
    if not path.is_file():
        return ""
    found = ""
    try:
        for line in path.read_text(encoding="utf-8").splitlines():
            if mid not in line:
                continue
            try:
                row = json.loads(line)
            except Exception:
                continue
            if str(row.get("message_id") or "") == mid and row.get("text"):
                found = str(row["text"])
    except Exception:
        return found
    return found


def extract_content_text(msg_type: str, content: Any) -> str:
    raw = content
    if isinstance(content, dict):
        raw = json.dumps(content, ensure_ascii=False)
    text = str(raw or "").strip()
    if not text:
        return ""
    try:
        parsed = json.loads(text)
    except Exception:
        return text
    if not isinstance(parsed, dict):
        return text
    if msg_type == "text" or "text" in parsed:
        return str(parsed.get("text") or "").strip()
    # interactive card (schema 1 or 2)
    chunks: list[str] = []
    body = parsed.get("body") if isinstance(parsed.get("body"), dict) else {}
    elements = body.get("elements") if isinstance(body.get("elements"), list) else parsed.get("elements")
    if isinstance(elements, list):
        for el in elements:
            if not isinstance(el, dict):
                continue
            if el.get("tag") == "markdown" and el.get("content"):
                chunks.append(str(el["content"]))
            text_obj = el.get("text") if isinstance(el.get("text"), dict) else {}
            if text_obj.get("content"):
                chunks.append(str(text_obj["content"]))
    header = parsed.get("header") if isinstance(parsed.get("header"), dict) else {}
    title = header.get("title") if isinstance(header.get("title"), dict) else {}
    if title.get("content"):
        chunks.insert(0, str(title["content"]))
    return "\n".join(c.strip() for c in chunks if str(c).strip()).strip() or text[:2000]


def resolve_reply_anchor(*, messenger: Any, parent_id: str) -> str:
    mid = str(parent_id or "").strip()
    if not mid:
        return ""
    cached = lookup_outbound(mid)
    if cached:
        return cached
    try:
        msg = messenger.get_message(mid)
    except Exception:
        return ""
    if not isinstance(msg, dict):
        return ""
    data = msg.get("data") if isinstance(msg.get("data"), dict) else msg
    items = data.get("items") if isinstance(data.get("items"), list) else None
    row = items[0] if items else data
    if not isinstance(row, dict):
        return ""
    msg_type = str(row.get("msg_type") or "")
    body = row.get("body") if isinstance(row.get("body"), dict) else {}
    content = body.get("content") if body else row.get("content")
    return extract_content_text(msg_type, content)[:6000]


def format_anchored_user_message(*, user_message: str, parent_id: str = "", anchor_text: str = "") -> str:
    text = str(user_message or "").strip()
    anchor = str(anchor_text or "").strip()
    pid = str(parent_id or "").strip()
    if not anchor:
        return text
    return (
        "[FEISHU REPLY ANCHOR]\n"
        "The user is replying to the PRIOR message below (not necessarily the latest topic in this chat).\n"
        "If they say follow/accept/do your suggestion, apply the suggestion from THAT prior message only.\n"
        f"Prior message_id: {pid or '(unknown)'}\n"
        "Prior message content:\n"
        "-----\n"
        f"{anchor}\n"
        "-----\n\n"
        "[USER REPLY]\n"
        f"{text}\n"
    )
