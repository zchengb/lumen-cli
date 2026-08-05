#!/usr/bin/env python3
from __future__ import annotations

import sys
import unittest
from pathlib import Path
from unittest.mock import MagicMock

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from notifications.events import NotificationEvent
from notifications.router import publish_notification
from notifications.transports.legacy_webhook import LegacyWebhookTransport
from notifications.transports.null import NullTransport
from notifications.transports.feishu_app import FeishuAppTransport


class NotificationRouterTests(unittest.TestCase):
    def test_legacy_default_sends_webhook(self) -> None:
        sent = []

        def send_fn(card, url):
            sent.append((card, url))

        result = publish_notification(
            NotificationEvent(
                event_type="scan.completed",
                workflow="auto_scan",
                owner_agent="dylan",
                card={"ok": True},
                webhook_url="https://example.test/hook",
            ),
            config={"notifications": {"mode": "legacy"}},
            legacy_transport=LegacyWebhookTransport(send_fn=send_fn),
        )
        self.assertEqual(result["status"], "sent")
        self.assertEqual(len(sent), 1)

    def test_missing_webhook_skipped(self) -> None:
        result = publish_notification(
            NotificationEvent(
                event_type="patch.completed",
                workflow="auto_patch",
                owner_agent="irving",
                card={"ok": True},
                webhook_url="",
            ),
            config={"notifications": {"mode": "legacy"}},
        )
        self.assertEqual(result["status"], "skipped")

    def test_dry_run_uses_null(self) -> None:
        result = publish_notification(
            NotificationEvent(
                event_type="delivery.dev_done",
                workflow="auto_delivery",
                owner_agent="mark",
                dry_run=True,
            ),
        )
        self.assertEqual(result["status"], "dry_run")

    def test_transport_failure_does_not_raise(self) -> None:
        def boom(_card, _url):
            raise RuntimeError("webhook down")

        result = publish_notification(
            NotificationEvent(
                event_type="scan.completed",
                workflow="auto_scan",
                card={"ok": True},
                webhook_url="https://example.test/hook",
            ),
            legacy_transport=LegacyWebhookTransport(send_fn=boom),
        )
        self.assertEqual(result["status"], "failed")

    def test_dual_calls_app_and_legacy(self) -> None:
        legacy_calls = []
        app = MagicMock(spec=FeishuAppTransport)
        app.send.return_value = {"transport": "feishu_app", "status": "sent", "event": "scan.completed"}

        def send_fn(card, url):
            legacy_calls.append(url)

        result = publish_notification(
            NotificationEvent(
                event_type="scan.completed",
                workflow="auto_scan",
                owner_agent="dylan",
                card={"ok": True},
                webhook_url="https://example.test/hook",
            ),
            config={"notifications": {"mode": "dual"}},
            legacy_transport=LegacyWebhookTransport(send_fn=send_fn),
            app_transport=app,
        )
        self.assertEqual(result["status"], "sent")
        self.assertEqual(len(legacy_calls), 1)
        app.send.assert_called_once()

    def test_owner_agent_inferred_from_workflow(self) -> None:
        event = NotificationEvent(
            event_type="scan.completed",
            workflow="auto_scan",
            skip=True,
            skip_detail="x",
        )
        publish_notification(event, null_transport=NullTransport())
        self.assertEqual(event.owner_agent, "dylan")


if __name__ == "__main__":
    unittest.main()
