from __future__ import annotations

import json
import logging
import os
import urllib.error
import urllib.request
from typing import Any, Optional

from agents.registry import APP_ID_ENV

APP_SECRET_ENV = {
    "dylan": "FEISHU_DYLAN_APP_SECRET",
    "irving": "FEISHU_IRVING_APP_SECRET",
    "mark": "FEISHU_MARK_APP_SECRET",
    "milchick": "FEISHU_MILCHICK_APP_SECRET",
}

TOKEN_URL = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
REPLY_URL = "https://open.feishu.cn/open-apis/im/v1/messages/{message_id}/reply"
CREATE_URL = "https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id"
UPDATE_URL = "https://open.feishu.cn/open-apis/im/v1/messages/{message_id}"
REACTION_URL = "https://open.feishu.cn/open-apis/im/v1/messages/{message_id}/reactions"
REACTION_DELETE_URL = "https://open.feishu.cn/open-apis/im/v1/messages/{message_id}/reactions/{reaction_id}"

_LOG = logging.getLogger("lumen.feishu.channel")


def extract_message_id(response: dict[str, Any] | None) -> str:
    if not isinstance(response, dict):
        return ""
    data = response.get("data") if isinstance(response.get("data"), dict) else {}
    message = data.get("message") if isinstance(data.get("message"), dict) else {}
    return str(
        response.get("message_id")
        or data.get("message_id")
        or message.get("message_id")
        or ""
    ).strip()


class FeishuMessenger:
    def __init__(self, agent_id: str = "dylan") -> None:
        self.agent_id = str(agent_id or "dylan").strip().lower()

    def credentials(self) -> tuple[str, str]:
        app_id = os.environ.get(APP_ID_ENV.get(self.agent_id, ""), "").strip()
        app_secret = os.environ.get(APP_SECRET_ENV.get(self.agent_id, ""), "").strip()
        return app_id, app_secret

    def tenant_token(self) -> str:
        app_id, app_secret = self.credentials()
        if not app_id or not app_secret:
            raise RuntimeError(f"Missing Feishu credentials for {self.agent_id}")
        payload = json.dumps({"app_id": app_id, "app_secret": app_secret}).encode("utf-8")
        request = urllib.request.Request(
            TOKEN_URL,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=30) as response:
            body = json.loads(response.read().decode("utf-8"))
        token = str(body.get("tenant_access_token") or "").strip()
        if not token:
            raise RuntimeError(f"Feishu token error: {body.get('msg') or body}")
        return token

    def _request(self, method: str, url: str, token: str, payload: Optional[dict[str, Any]] = None) -> dict[str, Any]:
        data = None if payload is None else json.dumps(payload).encode("utf-8")
        request = urllib.request.Request(
            url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}",
            },
            method=method.upper(),
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                raw = response.read().decode("utf-8")
                return json.loads(raw) if raw.strip() else {}
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Feishu API HTTP {exc.code}: {detail}") from exc

    def _post(self, url: str, token: str, payload: dict[str, Any]) -> dict[str, Any]:
        return self._request("POST", url, token, payload)

    def add_reaction(self, message_id: str, emoji_type: str) -> dict[str, Any]:
        token = self.tenant_token()
        return self._post(
            REACTION_URL.format(message_id=message_id),
            token,
            {"reaction_type": {"emoji_type": str(emoji_type or "OnIt")}},
        )

    def delete_reaction(self, message_id: str, reaction_id: str) -> dict[str, Any]:
        token = self.tenant_token()
        return self._request(
            "DELETE",
            REACTION_DELETE_URL.format(message_id=message_id, reaction_id=reaction_id),
            token,
            None,
        )

    def safe_add_reaction(self, message_id: str, emoji_type: str) -> Optional[dict[str, Any]]:
        try:
            return self.add_reaction(message_id, emoji_type)
        except Exception as exc:
            _LOG.warning("add_reaction failed message_id=%s err=%s", message_id, exc)
            return None

    def safe_delete_reaction(self, message_id: str, reaction_id: str) -> Optional[dict[str, Any]]:
        try:
            return self.delete_reaction(message_id, reaction_id)
        except Exception as exc:
            _LOG.warning("delete_reaction failed message_id=%s reaction_id=%s err=%s", message_id, reaction_id, exc)
            return None

    def reply_text(self, message_id: str, text: str) -> dict[str, Any]:
        token = self.tenant_token()
        return self._post(
            REPLY_URL.format(message_id=message_id),
            token,
            {"content": json.dumps({"text": text}, ensure_ascii=False), "msg_type": "text"},
        )

    def reply_card(self, message_id: str, card_envelope: dict[str, Any]) -> dict[str, Any]:
        token = self.tenant_token()
        card = card_envelope.get("card", card_envelope)
        return self._post(
            REPLY_URL.format(message_id=message_id),
            token,
            {
                "content": json.dumps(card, ensure_ascii=False),
                "msg_type": "interactive",
            },
        )

    def update_text(self, message_id: str, text: str) -> dict[str, Any]:
        token = self.tenant_token()
        return self._request(
            "PUT",
            UPDATE_URL.format(message_id=message_id),
            token,
            {"msg_type": "text", "content": json.dumps({"text": text}, ensure_ascii=False)},
        )

    def safe_update_text(self, message_id: str, text: str) -> Optional[dict[str, Any]]:
        try:
            return self.update_text(message_id, text)
        except Exception as exc:
            _LOG.warning("update_text failed message_id=%s err=%s", message_id, exc)
            return None

    def send_text(self, chat_id: str, text: str) -> dict[str, Any]:
        token = self.tenant_token()
        return self._post(
            CREATE_URL,
            token,
            {
                "receive_id": chat_id,
                "msg_type": "text",
                "content": json.dumps({"text": text}, ensure_ascii=False),
            },
        )

    def send_card(self, chat_id: str, card: dict[str, Any]) -> dict[str, Any]:
        token = self.tenant_token()
        return self._post(
            CREATE_URL,
            token,
            {
                "receive_id": chat_id,
                "msg_type": "interactive",
                "content": json.dumps(card, ensure_ascii=False),
            },
        )

    def safe_reply_text(self, message_id: str, text: str) -> Optional[dict[str, Any]]:
        try:
            return self.reply_text(message_id, text)
        except Exception as exc:
            _LOG.warning("reply_text failed message_id=%s err=%s", message_id, exc)
            return None
