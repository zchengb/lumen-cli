from __future__ import annotations

import json
from typing import Any, Optional

from risk.store import GlobalAgentStore


def load_context(
    store: GlobalAgentStore,
    *,
    chat_id: str,
    thread_id: str = "",
    user_id: str = "",
) -> dict[str, Any]:
    row = store.get_conversation_context(chat_id=chat_id, thread_id=thread_id, user_id=user_id)
    if row is None:
        return {}
    data = dict(row)
    try:
        data["last_result_ids"] = json.loads(str(data.get("last_result_ids_json") or "[]"))
    except Exception:
        data["last_result_ids"] = []
    try:
        data["recent_entities"] = json.loads(str(data.get("recent_entities_json") or "{}"))
    except Exception:
        data["recent_entities"] = {}
    return data


def resolve_previous_result(context: dict[str, Any], *, index: Optional[int] = None) -> Optional[str]:
    ids = context.get("last_result_ids") if isinstance(context.get("last_result_ids"), list) else []
    if not ids:
        return None
    if index is None:
        return str(context.get("last_finding_id") or ids[0])
    if index < 0 or index >= len(ids):
        return None
    return str(ids[index])


def resolve_project_slug(
    *,
    explicit: str = "",
    context: Optional[dict[str, Any]] = None,
    chat_id: str = "",
    store: Optional[GlobalAgentStore] = None,
    default_slug: str = "",
) -> tuple[str, str]:
    if explicit:
        return explicit, "explicit"
    ctx = context or {}
    if str(ctx.get("project_slug") or "").strip():
        return str(ctx["project_slug"]).strip(), "thread_context"
    if store is not None and chat_id:
        mapped = store.get_chat_project(chat_id)
        if mapped:
            return mapped, "chat_map"
        recent = store.resolve_recent_run(chat_id=chat_id, user_id=str(ctx.get("user_id") or ""))
        if recent is not None and recent["project_slug"]:
            return str(recent["project_slug"]), "recent_run"
    if default_slug:
        return default_slug, "default"
    return "", "unresolved"


def save_context(store: GlobalAgentStore, payload: dict[str, Any]) -> None:
    store.upsert_conversation_context(payload)
