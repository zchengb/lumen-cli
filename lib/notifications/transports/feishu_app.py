from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from typing import Any

from agents.registry import APP_ID_ENV
from notifications.events import NotificationEvent

APP_SECRET_ENV = {
    "dylan": "FEISHU_DYLAN_APP_SECRET",
    "irving": "FEISHU_IRVING_APP_SECRET",
    "mark": "FEISHU_MARK_APP_SECRET",
    "milchick": "FEISHU_MILCHICK_APP_SECRET",
}

TOKEN_URL = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
REPLY_URL = "https://open.feishu.cn/open-apis/im/v1/messages/{message_id}/reply"
CREATE_URL = "https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id"


class FeishuAppTransport:
    name = "feishu_app"

    def __init__(self, agent_id: str = "") -> None:
        self.agent_id = str(agent_id or "").strip().lower()

    def _credentials(self, agent_id: str) -> tuple[str, str]:
        app_id = os.environ.get(APP_ID_ENV.get(agent_id, ""), "").strip()
        app_secret = os.environ.get(APP_SECRET_ENV.get(agent_id, ""), "").strip()
        return app_id, app_secret

    def _tenant_token(self, app_id: str, app_secret: str) -> str:
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

    def _post_json(self, url: str, token: str, payload: dict[str, Any]) -> dict[str, Any]:
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

    def send(self, event: NotificationEvent) -> dict[str, Any]:
        agent_id = self.agent_id or str(event.owner_agent or "").strip().lower()
        if not agent_id:
            return {"transport": self.name, "status": "skipped", "detail": "no owner_agent"}
        app_id, app_secret = self._credentials(agent_id)
        if not app_id or not app_secret:
            return {
                "transport": self.name,
                "status": "skipped",
                "detail": f"missing credentials for {agent_id}",
            }
        if event.card is None and not event.summary:
            return {"transport": self.name, "status": "skipped", "detail": "no card or summary"}

        if event.card is not None:
            msg_type = "interactive"
            content_json = json.dumps(event.card, ensure_ascii=False)
        else:
            msg_type = "text"
            content_json = json.dumps({"text": event.summary or event.event_type}, ensure_ascii=False)

        token = self._tenant_token(app_id, app_secret)
        reply_to = str(event.reply_message_id or event.source_message_id or "").strip()
        if reply_to:
            body = self._post_json(
                REPLY_URL.format(message_id=reply_to),
                token,
                {"content": content_json, "msg_type": msg_type},
            )
        else:
            chat_id = str(event.chat_id or "").strip()
            if not chat_id:
                return {
                    "transport": self.name,
                    "status": "skipped",
                    "detail": "no chat_id or reply target",
                }
            body = self._post_json(
                CREATE_URL,
                token,
                {
                    "receive_id": chat_id,
                    "msg_type": msg_type,
                    "content": content_json,
                },
            )
        if body.get("code") not in (0, None):
            raise RuntimeError(f"Feishu app send error: {body}")
        return {
            "transport": self.name,
            "status": "sent",
            "event": event.event_type,
            "agent": agent_id,
        }
