from __future__ import annotations

import re
from typing import Any

from feishu.client_registry import GATEWAY_AGENTS, load_client_config
from feishu.config import ensure_lumen_env_loaded
from feishu.messenger import FeishuMessenger

_OPEN_USER_RE = re.compile(r"^ou_[a-fA-F0-9]{16,}$")
_OPEN_CHAT_RE = re.compile(r"^oc_[a-fA-F0-9]{16,}$")


def is_feishu_open_user_id(value: str) -> bool:
    return bool(_OPEN_USER_RE.fullmatch(str(value or "").strip()))


def is_feishu_open_chat_id(value: str) -> bool:
    return bool(_OPEN_CHAT_RE.fullmatch(str(value or "").strip()))


def _messenger_for(agent_id: str) -> FeishuMessenger | None:
    if load_client_config(agent_id) is None:
        return None
    try:
        return FeishuMessenger(agent_id)
    except Exception:
        return None


def _resolve_one(
    *,
    store: Any,
    identity_id: str,
    identity_type: str,
) -> str:
    cached = store.get_feishu_display_name(identity_id)
    if cached:
        return cached
    for agent_id in GATEWAY_AGENTS:
        messenger = _messenger_for(agent_id)
        if messenger is None:
            continue
        if identity_type == "user":
            name = messenger.safe_get_user_name(identity_id)
        else:
            name = messenger.safe_get_chat_name(identity_id)
        if name:
            store.upsert_feishu_identity(
                identity_id=identity_id,
                identity_type=identity_type,
                display_name=name,
            )
            return name
    return ""


def enrich_feishu_identities(
    *,
    user_ids: list[str],
    chat_ids: list[str],
    store: Any,
    agent_id: str = "dylan",
) -> dict[str, Any]:
    ensure_lumen_env_loaded()
    users: list[dict[str, str]] = []
    chats: list[dict[str, str]] = []
    names: dict[str, str] = {}
    project_names: dict[str, str] = {}
    try:
        for row in store.conn.execute(
            "SELECT chat_id, project_slug FROM chat_project_map WHERE chat_id != ''"
        ).fetchall():
            chat = str(row["chat_id"] if hasattr(row, "keys") else row[0] or "").strip()
            slug = str(row["project_slug"] if hasattr(row, "keys") else row[1] or "").strip()
            if chat and slug:
                project_names[chat] = slug
    except Exception:
        project_names = {}

    for user_id in user_ids:
        uid = str(user_id or "").strip()
        if not uid or not is_feishu_open_user_id(uid):
            continue
        name = store.get_feishu_display_name(uid) or _resolve_one(
            store=store,
            identity_id=uid,
            identity_type="user",
        )
        users.append({"id": uid, "name": name or ""})
        if name:
            names[uid] = name

    for chat_id in chat_ids:
        cid = str(chat_id or "").strip()
        if not cid:
            continue
        if not is_feishu_open_chat_id(cid):
            alias = project_names.get(cid) or ""
            if alias:
                chats.append({"id": cid, "name": alias, "kind": "alias"})
                names[cid] = alias
            continue
        name = store.get_feishu_display_name(cid) or _resolve_one(
            store=store,
            identity_id=cid,
            identity_type="chat",
        )
        if not name and cid in project_names:
            name = project_names[cid]
        chats.append({"id": cid, "name": name or "", "kind": "chat"})
        if name:
            names[cid] = name

    return {"users": users, "chats": chats, "names": names}
