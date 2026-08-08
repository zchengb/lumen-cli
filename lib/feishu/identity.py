from __future__ import annotations

from typing import Any

from feishu.messenger import FeishuMessenger


def _resolve_one(
    *,
    store: Any,
    messenger: FeishuMessenger,
    identity_id: str,
    identity_type: str,
) -> str:
    cached = store.get_feishu_display_name(identity_id)
    if cached:
        return cached
    if identity_type == "user":
        name = messenger.safe_get_user_name(identity_id)
    else:
        name = messenger.safe_get_chat_name(identity_id)
    if name:
        store.upsert_feishu_identity(identity_id=identity_id, identity_type=identity_type, display_name=name)
    return name


def enrich_feishu_identities(
    *,
    user_ids: list[str],
    chat_ids: list[str],
    store: Any,
    agent_id: str = "dylan",
) -> dict[str, Any]:
    users: list[dict[str, str]] = []
    chats: list[dict[str, str]] = []
    names: dict[str, str] = {}
    try:
        messenger = FeishuMessenger(agent_id)
    except Exception:
        messenger = None
    for user_id in user_ids:
        uid = str(user_id or "").strip()
        if not uid:
            continue
        name = store.get_feishu_display_name(uid)
        if not name and messenger is not None:
            name = _resolve_one(store=store, messenger=messenger, identity_id=uid, identity_type="user")
        users.append({"id": uid, "name": name or ""})
        if name:
            names[uid] = name
    for chat_id in chat_ids:
        cid = str(chat_id or "").strip()
        if not cid:
            continue
        name = store.get_feishu_display_name(cid)
        if not name and messenger is not None:
            name = _resolve_one(store=store, messenger=messenger, identity_id=cid, identity_type="chat")
        chats.append({"id": cid, "name": name or ""})
        if name:
            names[cid] = name
    return {"users": users, "chats": chats, "names": names}
