#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.dylan.conversation import handle_conversation
from agents.dylan.guard import validate_response
from agents.dylan.safe_formatter import format_safe
from agents.dylan.schemas import RouterResult
from agents.dylan.semantic_router import heuristic_classify, semantic_route
from agents.dylan.thinking import ThinkingSession
from feishu.messenger import extract_message_id
from risk.ingestion import ingest_scan_risk
from risk.queries import unresolved
from risk.store import RiskStore


class SemanticRouterTests(unittest.TestCase):
    def test_english_paraphrases(self) -> None:
        cases = [
            ("What is the largest risk now?", "risk.top"),
            ("What should we worry about most?", "risk.top"),
            ("Have we now still exists any unresolved issues?", "risk.unresolved"),
            ("Anything still open?", "risk.unresolved"),
            ("Is risk getting worse?", "risk.trend"),
            ("Who are you?", "conversation.agent_identity"),
            ("How do you work with Mark?", "conversation.agent_relationship"),
        ]
        for text, intent in cases:
            result = heuristic_classify({"message": text, "known_projects": ["mbpass"], "context": {}})
            self.assertEqual(result.intent, intent, text)

    def test_follow_up_english_ordinal(self) -> None:
        result = heuristic_classify(
            {
                "message": "What about the second one?",
                "context": {"last_result_ids": ["FIND-a", "FIND-b"], "last_finding_id": "FIND-a"},
                "known_projects": ["mbpass"],
            }
        )
        self.assertEqual(result.intent, "conversation.follow_up")
        self.assertEqual(result.finding_id, "FIND-b")


class UnresolvedToolTests(unittest.TestCase):
    def test_unresolved_excludes_resolved(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            (workspace / "state").mkdir()
            common = {"project": {"slug": "demo"}, "agents": {"dylan": {"risk_analyst": {"enabled": True}}}}
            finding = {
                "title": "Open bug",
                "severity": "High",
                "repository": "app",
                "file": "a.py",
                "trigger": "x",
                "root_cause": "y",
            }
            ingest_scan_risk(
                workspace=workspace,
                scan={"scan_status": "completed", "finished_at": "2026-08-01T00:00:00Z", "findings": [finding]},
                registry={"issues": []},
                common=common,
                result_path=workspace / "results" / "a.json",
            )
            store = RiskStore(workspace)
            data = unresolved(store, "demo")
            self.assertGreaterEqual(data["total"], 1)
            self.assertTrue(all(item["status"] in {"Open", "Reopened"} for item in data["items"]))
            store.close()


class GroundingHardeningTests(unittest.TestCase):
    def test_empty_facts_reject_invented_jira(self) -> None:
        result = validate_response(
            "Jira MBPAS-999 exists",
            [{"tool": "get_finding_links", "data": {"jira": None, "pull_request": None}}],
        )
        self.assertFalse(result["valid"])

    def test_safe_formatter_after_reject(self) -> None:
        text = format_safe(
            intent="risk.top",
            router=RouterResult(intent="risk.top", confidence=0.9, source="test"),
            tool_results=[{"tool": "query_top_risks", "data": {"items": []}}],
            language="en",
        )
        self.assertIn("no stored risk data", text.lower())


class ThinkingAndMessengerTests(unittest.TestCase):
    def test_extract_message_id(self) -> None:
        self.assertEqual(extract_message_id({"data": {"message_id": "om_1"}}), "om_1")
        self.assertEqual(extract_message_id({"data": {"message": {"message_id": "om_2"}}}), "om_2")

    def test_thinking_complete_updates_placeholder(self) -> None:
        messenger = MagicMock()
        messenger.reply_text.return_value = {"data": {"message_id": "ph_1"}}
        messenger.safe_update_text.return_value = {"ok": True}
        from agents.dylan.schemas import TypingConfig

        session = ThinkingSession(
            messenger=messenger,
            source_message_id="src_1",
            language="en",
            config=TypingConfig(enabled=True, delay_ms=0),
        )
        session.start()
        out = session.complete("final answer")
        self.assertEqual(out["mode"], "updated")
        messenger.safe_update_text.assert_called()


class ConversationSemanticIntegrationTests(unittest.TestCase):
    def test_unresolved_english_question(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            os.environ["LUMEN_AGENTS_HOME"] = tmp
            workspace = Path(tmp) / "ws"
            (workspace / "config").mkdir(parents=True)
            (workspace / "state").mkdir()
            common = {
                "project": {"slug": "mbpass"},
                "agents": {
                    "dylan": {
                        "risk_analyst": {
                            "enabled": True,
                            "conversation_v2": {
                                "enabled": True,
                                "llm_router_enabled": False,
                                "llm_response_enabled": False,
                                "grounding_guard_enabled": True,
                            },
                        }
                    }
                },
            }
            (workspace / "config" / "common.json").write_text(json.dumps(common), encoding="utf-8")
            finding = {
                "title": "Retry race",
                "severity": "High",
                "repository": "app",
                "file": "payment/a.py",
                "trigger": "race",
                "root_cause": "lock",
            }
            ingest_scan_risk(
                workspace=workspace,
                scan={"scan_status": "completed", "finished_at": "2026-08-01T00:00:00Z", "findings": [finding]},
                registry={"issues": []},
                common=common,
                result_path=workspace / "results" / "a.json",
            )
            # monkeypatch workspace resolver by setting chat map + using known slug via explicit text
            from risk.store import GlobalAgentStore
            from unittest.mock import patch

            gs = GlobalAgentStore(Path(tmp) / "agents.sqlite3")
            gs.set_chat_project("c1", "mbpass")
            gs.close()

            with patch("agents.dylan.conversation._resolve_workspace", return_value=workspace):
                with patch("agents.dylan.conversation._default_project_slug", return_value="mbpass"):
                    out = handle_conversation(
                        text="Have we now still exists any unresolved issues?",
                        meta={"chat_id": "c1", "thread_id": "t1", "user_id": "u1"},
                        common=common,
                        agents_config=common["agents"],
                        known_slugs={"mbpass"},
                    )
            self.assertEqual(out["action"], "risk.unresolved")
            self.assertIn("Unresolved", out["text"])
            os.environ.pop("LUMEN_AGENTS_HOME", None)


if __name__ == "__main__":
    unittest.main()
