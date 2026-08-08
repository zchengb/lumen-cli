#!/usr/bin/env python3
from __future__ import annotations

import sys
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.definitions import ensure_definitions_loaded, get_definition
from agents.security.access_policy import classify_authorization_intent
from agents.security.actions import ActionRequest
from agents.security.broker import CapabilityBroker
from agents.security.policy import is_action_allowed_for_agent
from agents.runtime.final_response import prefer_action_summary


class JiraActionTests(unittest.TestCase):
    def test_intent_create_jira_card(self) -> None:
        self.assertEqual(
            classify_authorization_intent("Please create the jira card for this issue"),
            "mutate_explicit",
        )
        self.assertEqual(classify_authorization_intent("update jira MBPAS-1 summary"), "mutate_explicit")
        self.assertEqual(classify_authorization_intent("how's MBPAS-1491 going?"), "read")

    def test_milchick_allowed_others_denied(self) -> None:
        self.assertTrue(is_action_allowed_for_agent("milchick", "jira.workitem.create"))
        self.assertTrue(is_action_allowed_for_agent("milchick", "jira.workitem.update"))
        self.assertFalse(is_action_allowed_for_agent("dylan", "jira.workitem.create"))
        self.assertFalse(is_action_allowed_for_agent("mark", "jira.workitem.update"))

    def test_definition_lists_jira_actions(self) -> None:
        ensure_definitions_loaded()
        milchick = get_definition("milchick")
        assert milchick is not None
        self.assertIn("jira.workitem.create", milchick.capabilities.actions)
        self.assertIn("jira.workitem.update", milchick.capabilities.allowed_mutations)

    def test_create_adapter_uses_twg(self) -> None:
        from agents.security.adapters import jira as jira_adapter

        with mock.patch.object(jira_adapter, "_jira_config", return_value={"project_key": "MBPAS", "issue_type": "Bug"}):
            with mock.patch("jira_sync.twg_ready", return_value=(True, "")):
                with mock.patch(
                    "jira_sync.run_twg",
                    return_value=(0, '{"key":"MBPAS-2001","self":"https://example.atlassian.net/browse/MBPAS-2001"}'),
                ) as run:
                    with mock.patch("jira_sync.parse_issue_key", return_value=("MBPAS-2001", "https://example.atlassian.net/browse/MBPAS-2001")):
                        with mock.patch("jira_sync.jira_browse_url_from_config", return_value="https://example.atlassian.net/browse/MBPAS-2001"):
                            with mock.patch("jira_sync.site_args", return_value=[]):
                                result = jira_adapter.execute_jira_action(
                                    ActionRequest(
                                        agent_id="milchick",
                                        action="jira.workitem.create",
                                        project_slug="mbpass",
                                        actor_user_id="ou_1",
                                        chat_id="oc_1",
                                        thread_id="",
                                        source_message_id="om_1",
                                        trace_id="tr_1",
                                        arguments={
                                            "summary": "Preview mismatch",
                                            "description": "Backend preview != APP",
                                        },
                                    )
                                )
        self.assertEqual(result["status"], "completed")
        self.assertEqual(result["issue_key"], "MBPAS-2001")
        self.assertIn("https://", result["url"])
        cmd = run.call_args[0][0]
        self.assertEqual(cmd[:3], ["jira", "workitem", "create"])
        self.assertIn("--summary", cmd)
        self.assertIn("Preview mismatch", cmd)

    def test_update_adapter_requires_fields(self) -> None:
        from agents.security.adapters import jira as jira_adapter
        from agents.security.errors import ResourceDenied

        with self.assertRaises(ResourceDenied):
            jira_adapter.execute_jira_action(
                ActionRequest(
                    agent_id="milchick",
                    action="jira.workitem.update",
                    project_slug="mbpass",
                    actor_user_id="ou_1",
                    chat_id="oc_1",
                    thread_id="",
                    source_message_id="om_1",
                    trace_id="tr_1",
                    arguments={"issue_key": "MBPAS-1"},
                )
            )

    def test_prefer_summary_for_jira_create(self) -> None:
        receipts = [
            {
                "action": "jira.workitem.create",
                "status": "succeeded",
                "result": {
                    "status": "completed",
                    "issue_key": "MBPAS-2001",
                    "summary": "Preview mismatch",
                    "url": "https://example.atlassian.net/browse/MBPAS-2001",
                },
            }
        ]
        text = prefer_action_summary("I'll create the card now.", receipts)
        self.assertIn("Created MBPAS-2001: Preview mismatch", text)
        self.assertIn("https://example.atlassian.net/browse/MBPAS-2001", text)
        self.assertNotIn("I'll create", text)

    def test_broker_denies_dylan(self) -> None:
        receipt = CapabilityBroker(config={"access": {"mutation_allowed_user_ids": ["ou_owner"]}}).execute(
            ActionRequest(
                agent_id="dylan",
                action="jira.workitem.create",
                project_slug="mbpass",
                actor_user_id="ou_owner",
                chat_id="oc1",
                thread_id="",
                source_message_id="om1",
                trace_id="tr1",
                arguments={"summary": "x"},
                explicit_authorization=True,
            )
        )
        self.assertEqual(receipt.status, "denied")


if __name__ == "__main__":
    unittest.main()
