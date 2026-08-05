from __future__ import annotations

from typing import Any, Callable, Optional

from feishu.client_registry import FeishuClientConfig, configured_agents
from feishu.config import agents_home
from feishu.dedup import MessageDeduper
from feishu.handlers import handle_message_event


class FeishuChannel:
    def __init__(
        self,
        clients: Optional[list[FeishuClientConfig]] = None,
        on_event: Optional[Callable[[dict[str, Any], FeishuClientConfig], None]] = None,
    ) -> None:
        self.clients = clients if clients is not None else configured_agents(["dylan"])
        self.on_event = on_event or handle_message_event
        self.deduper = MessageDeduper(agents_home() / "dedup.sqlite3")

    def process_event(self, event: dict[str, Any], client: FeishuClientConfig) -> None:
        message_id = ""
        event_body = event.get("event") if isinstance(event.get("event"), dict) else event
        message = event_body.get("message") if isinstance(event_body, dict) else {}
        if isinstance(message, dict):
            message_id = str(message.get("message_id") or "").strip()
        if message_id and not self.deduper.claim(message_id):
            return
        self.on_event(event, client)

    def start(self) -> None:
        if not self.clients:
            raise RuntimeError(
                "No Feishu agent credentials configured. Set FEISHU_DYLAN_APP_ID and FEISHU_DYLAN_APP_SECRET."
            )
        try:
            import lark_oapi as lark
            from lark_oapi.event.dispatcher_handler import EventDispatcherHandler
            from lark_oapi.ws import Client as WsClient
        except ImportError as exc:
            raise RuntimeError(
                "lark-oapi is required for Agent Gateway. Install with: pip install lark-oapi"
            ) from exc

        for client in self.clients:
            self._start_client(client, lark, EventDispatcherHandler, WsClient)

    def _start_client(self, client: FeishuClientConfig, lark, EventDispatcherHandler, WsClient) -> None:
        channel = self

        def on_message(data: Any) -> None:
            raw = data
            if hasattr(data, "event"):
                payload = {
                    "event": data.event if isinstance(data.event, dict) else getattr(data, "__dict__", {}),
                }
                if hasattr(data, "header"):
                    payload["header"] = data.header if isinstance(data.header, dict) else {}
                raw = payload
            elif not isinstance(data, dict):
                raw = {"event": getattr(data, "__dict__", {})}
            channel.process_event(raw, client)

        handler = (
            EventDispatcherHandler.builder("", "")
            .register_p2_im_message_receive_v1(on_message)
            .build()
        )
        ws = WsClient(
            client.app_id,
            client.app_secret,
            event_handler=handler,
            log_level=lark.LogLevel.INFO,
        )
        print(f"Lumen agent gateway listening as {client.agent_id} ({client.app_id[:6]}…)")
        ws.start()
