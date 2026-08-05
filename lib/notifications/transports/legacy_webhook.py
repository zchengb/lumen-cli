from __future__ import annotations

import json
import urllib.request
from typing import Any, Callable, Optional

from notifications.events import NotificationEvent

_SendFn = Callable[[dict, str], None]


def default_send_feishu(card: dict, webhook_url: str) -> None:
    payload = json.dumps(card).encode("utf-8")
    request = urllib.request.Request(
        webhook_url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read().decode("utf-8")
        if response.status >= 400:
            raise RuntimeError(f"Feishu webhook returned HTTP {response.status}: {body}")
        parsed = json.loads(body)
        if parsed.get("code") not in (0, None):
            if parsed.get("StatusCode") not in (0, None) and parsed.get("code") is None:
                return
            if parsed.get("code") not in (0,):
                raise RuntimeError(f"Feishu webhook error: {body}")


class LegacyWebhookTransport:
    name = "legacy_webhook"

    def __init__(self, send_fn: Optional[_SendFn] = None) -> None:
        self._send_fn = send_fn or default_send_feishu

    def send(self, event: NotificationEvent) -> dict[str, Any]:
        webhook = str(event.webhook_url or "").strip()
        if not webhook:
            return {
                "transport": self.name,
                "status": "skipped",
                "detail": "FEISHU_WEBHOOK_URL not set",
            }
        if event.card is None:
            return {
                "transport": self.name,
                "status": "skipped",
                "detail": "no card payload",
            }
        self._send_fn(event.card, webhook)
        return {
            "transport": self.name,
            "status": "sent",
            "event": event.event_type,
        }
