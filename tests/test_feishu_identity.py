#!/usr/bin/env python3
from __future__ import annotations

import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from feishu.handlers import extract_message_meta, remember_message_identities
from feishu.identity import enrich_feishu_identities
from risk.store import GlobalAgentStore


class FeishuIdentityTests(unittest.TestCase):
    def test_remember_mentions_and_enrich(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            os.environ["LUMEN_AGENTS_HOME"] = tmp
            store = GlobalAgentStore()
            try:
                event = {
                    "header": {"app_id": "cli_x"},
                    "event": {
                        "sender": {"sender_id": {"open_id": "ou_alice"}},
                        "message": {
                            "message_id": "om_1",
                            "chat_id": "oc_team",
                            "chat_type": "group",
                            "mentions": [
                                {"id": {"open_id": "ou_alice"}, "name": "Alice"},
                                {"id": {"open_id": "ou_bob"}, "name": "Bob"},
                            ],
                        },
                    },
                }
                meta = extract_message_meta(event)
                self.assertEqual(meta["user_id"], "ou_alice")
                self.assertEqual(meta["user_name"], "Alice")
                remember_message_identities(event, meta)
                self.assertEqual(store.get_feishu_display_name("ou_alice"), "Alice")
                self.assertEqual(store.get_feishu_display_name("ou_bob"), "Bob")
                with mock.patch("feishu.identity.FeishuMessenger") as messenger_cls:
                    messenger_cls.side_effect = RuntimeError("no network")
                    enriched = enrich_feishu_identities(
                        user_ids=["ou_alice", "ou_missing"],
                        chat_ids=["oc_team"],
                        store=store,
                    )
                self.assertEqual(enriched["names"]["ou_alice"], "Alice")
                self.assertEqual(enriched["users"][0]["name"], "Alice")
                self.assertEqual(enriched["users"][1]["name"], "")
            finally:
                store.close()


if __name__ == "__main__":
    unittest.main()
