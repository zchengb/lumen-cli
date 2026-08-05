from __future__ import annotations

import json
import logging
import threading
import traceback
from typing import Any, Callable, Optional

from feishu.client_registry import FeishuClientConfig, configured_agents
from feishu.config import agents_home
from feishu.dedup import MessageDeduper
from feishu.handlers import handle_message_event

_LOG = logging.getLogger("lumen.feishu.channel")


def _setup_logging() -> None:
    log_path = agents_home() / "gateway.log"
    if _LOG.handlers:
        return
    _LOG.setLevel(logging.INFO)
    handler = logging.FileHandler(log_path, encoding="utf-8")
    handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    _LOG.addHandler(handler)
    stream = logging.StreamHandler()
    stream.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    _LOG.addHandler(stream)


def event_to_dict(data: Any) -> dict[str, Any]:
    if isinstance(data, dict):
        return data
    try:
        import lark_oapi as lark

        raw = lark.JSON.marshal(data)
        parsed = json.loads(raw)
        if isinstance(parsed, dict):
            return parsed
    except Exception:
        _LOG.exception("failed to marshal feishu event")
    event_obj = getattr(data, "event", None)
    header_obj = getattr(data, "header", None)
    payload: dict[str, Any] = {}
    if header_obj is not None:
        payload["header"] = header_obj if isinstance(header_obj, dict) else getattr(header_obj, "__dict__", {})
    if event_obj is not None:
        if isinstance(event_obj, dict):
            payload["event"] = event_obj
        else:
            message = getattr(event_obj, "message", None)
            sender = getattr(event_obj, "sender", None)
            payload["event"] = {
                "message": message if isinstance(message, dict) else getattr(message, "__dict__", {}),
                "sender": sender if isinstance(sender, dict) else getattr(sender, "__dict__", {}),
            }
    return payload


class FeishuChannel:
    def __init__(
        self,
        clients: Optional[list[FeishuClientConfig]] = None,
        on_event: Optional[Callable[[dict[str, Any], FeishuClientConfig], None]] = None,
    ) -> None:
        _setup_logging()
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
            _LOG.info("skip duplicate message_id=%s", message_id)
            return
        _LOG.info(
            "dispatch agent=%s message_id=%s chat_type=%s",
            client.agent_id,
            message_id or "-",
            (message.get("chat_type") if isinstance(message, dict) else "") or "-",
        )
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
            try:
                raw = event_to_dict(data)
                _LOG.info("received im.message.receive_v1 keys=%s", list(raw.keys()))
                # Feishu requires return within ~3s; run work on bounded pool.
                from agents.dylan.runtime import get_executor

                get_executor().submit(channel._safe_process, raw, client)
            except Exception:
                _LOG.error("on_message failed\n%s", traceback.format_exc())

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
        _LOG.info("starting ws client for %s app_id=%s…", client.agent_id, client.app_id[:8])
        ws.start()

    def _safe_process(self, event: dict[str, Any], client: FeishuClientConfig) -> None:
        try:
            self.process_event(event, client)
        except Exception:
            _LOG.error("process_event failed\n%s", traceback.format_exc())
