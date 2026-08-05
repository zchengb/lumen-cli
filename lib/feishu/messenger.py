from __future__ import annotations

import json
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

    def _post(self, url: str, token: str, payload: dict[str, Any]) -> dict[str, Any]:
        data = json.dumps(payload).encode("utf-8")
        request = urllib.request.Request(
            url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Feishu API HTTP {exc.code}: {detail}") from exc

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
            import logging
            logging.getLogger("lumen.feishu.channel").warning(
                "reply_text failed message_id=%s err=%s", message_id, exc
            )
            return None
