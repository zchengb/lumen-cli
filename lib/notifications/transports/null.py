from __future__ import annotations

from typing import Any

from notifications.events import NotificationEvent


class NullTransport:
    name = "null"

    def send(self, event: NotificationEvent) -> dict[str, Any]:
        detail = event.skip_detail or "null transport"
        return {"transport": self.name, "status": "skipped", "detail": detail}
