#!/usr/bin/env python3
from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.parser import parse_dylan_text
from feishu.dedup import MessageDeduper
from feishu.handlers import extract_text, should_handle
from feishu.client_registry import FeishuClientConfig
from agents.profiles import PROFILES


class AgentBridgeScanTests(unittest.TestCase):
    def test_parse_scan_run_with_days_and_project(self) -> None:
        action = parse_dylan_text("扫描一下 mbpass 最近七天的代码", known_slugs={"mbpass"})
        self.assertEqual(action.name, "scan.run")
        self.assertEqual(action.params.get("project"), "mbpass")
        self.assertEqual(action.params.get("window_days"), 7)

    def test_parse_status(self) -> None:
        action = parse_dylan_text("刚才的 Scan 完成了吗？")
        self.assertEqual(action.name, "scan.status")

    def test_parse_cancel(self) -> None:
        action = parse_dylan_text("取消刚才的 Scan")
        self.assertEqual(action.name, "scan.cancel")

    def test_dedup_claim_once(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            deduper = MessageDeduper(Path(tmp) / "dedup.sqlite3")
            self.assertTrue(deduper.claim("msg-1"))
            self.assertFalse(deduper.claim("msg-1"))
            self.assertTrue(deduper.seen("msg-1"))

    def test_extract_text_from_json_content(self) -> None:
        event = {
            "event": {
                "message": {
                    "content": '{"text":"@Dylan 扫描 mbpass"}',
                    "chat_type": "group",
                    "mentions": [{"id": "bot"}],
                }
            }
        }
        self.assertIn("扫描", extract_text(event))

    def test_should_handle_requires_mention_in_group(self) -> None:
        client = FeishuClientConfig(
            agent_id="dylan",
            app_id="cli_x",
            app_secret="secret",
            profile=PROFILES["dylan"],
        )
        bare = {"event": {"message": {"chat_type": "group", "mentions": []}}}
        self.assertFalse(should_handle(bare, client))
        mentioned = {"event": {"message": {"chat_type": "group", "mentions": [{"name": "Dylan"}]}}}
        self.assertTrue(should_handle(mentioned, client))

    def test_should_handle_only_mentioned_agent(self) -> None:
        dylan = FeishuClientConfig(
            agent_id="dylan",
            app_id="cli_d",
            app_secret="secret",
            profile=PROFILES["dylan"],
        )
        mark = FeishuClientConfig(
            agent_id="mark",
            app_id="cli_m",
            app_secret="secret",
            profile=PROFILES["mark"],
        )
        only_mark = {"event": {"message": {"chat_type": "group", "mentions": [{"name": "Mark"}]}}}
        self.assertFalse(should_handle(only_mark, dylan))
        self.assertTrue(should_handle(only_mark, mark))

    def test_should_handle_dylan_thread_reply_without_mention(self) -> None:
        import tempfile
        from pathlib import Path
        from unittest.mock import patch

        from agents.dylan.reply_anchor import remember_outbound
        from feishu.handlers import extract_message_meta

        dylan = FeishuClientConfig(
            agent_id="dylan",
            app_id="cli_x",
            app_secret="secret",
            profile=PROFILES["dylan"],
        )
        mark = FeishuClientConfig(
            agent_id="mark",
            app_id="cli_m",
            app_secret="secret",
            profile=PROFILES["mark"],
        )
        with tempfile.TemporaryDirectory() as tmp:
            with patch("agents.dylan.reply_anchor.agents_home", return_value=Path(tmp)):
                remember_outbound(
                    message_id="om_dylan_1",
                    text="Want me to verify?",
                    reply_to="om_user_1",
                    agent_id="dylan",
                )
                reply = {
                    "event": {
                        "message": {
                            "chat_type": "group",
                            "mentions": [],
                            "parent_id": "om_dylan_1",
                            "root_id": "om_user_1",
                            "content": '{"text":"可以，跑一下"}',
                        }
                    }
                }
                self.assertTrue(should_handle(reply, dylan))
                self.assertFalse(should_handle(reply, mark))
                meta = extract_message_meta(
                    {
                        "event": {
                            "message": {
                                "thread_id": "omt_topic_1",
                                "root_id": "om_root",
                                "parent_id": "om_parent",
                            }
                        }
                    }
                )
                self.assertEqual(meta["thread_id"], "omt_topic_1")
                self.assertEqual(meta["root_id"], "om_root")
                meta_no_thread = extract_message_meta(
                    {"event": {"message": {"root_id": "om_root", "parent_id": "om_parent"}}}
                )
                self.assertEqual(meta_no_thread["thread_id"], "")
                self.assertEqual(meta_no_thread["root_id"], "om_root")


if __name__ == "__main__":
    unittest.main()
