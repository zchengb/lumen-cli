#!/usr/bin/env python3
from __future__ import annotations

import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.soul_store import apply_agent_settings, agents_settings_payload, load_agent_soul
from agents.dylan.soul_loader import load_soul as load_dylan_soul


class AgentSettingsTests(unittest.TestCase):
    def test_save_soul_override_and_flags(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            os.environ["LUMEN_AGENTS_HOME"] = tmp
            before = agents_settings_payload()
            self.assertFalse(before["enabled"])
            dylan = next(agent for agent in before["agents"] if agent["id"] == "dylan")
            self.assertTrue(dylan["soul"])
            self.assertEqual(dylan["soul_source"], "packaged")
            payload = apply_agent_settings(
                {
                    "enabled": True,
                    "agents": [
                        {
                            "id": "dylan",
                            "conversation_enabled": True,
                            "model": "cursor-grok-4.5-medium",
                            "soft_timeout_seconds": 80,
                            "hard_timeout_seconds": 240,
                            "reaction_enabled": False,
                            "max_concurrent_jobs": 2,
                            "soul_version": "4",
                            "soul": "# Dylan override\n\nBe concise.\n",
                            "role": "scan",
                            "workflow": "auto_scan",
                        },
                        {
                            "id": "mark",
                            "conversation_enabled": True,
                            "model": "cursor-grok-4.5-medium",
                            "soft_timeout_seconds": 90,
                            "hard_timeout_seconds": 300,
                            "reaction_enabled": True,
                            "max_concurrent_jobs": 3,
                            "soul_version": "1",
                            "soul": "# Mark override\n\nStay calm.\n",
                            "role": "delivery",
                            "workflow": "auto_delivery",
                        },
                    ],
                }
            )
            self.assertTrue(payload["enabled"])
            dylan_after = next(agent for agent in payload["agents"] if agent["id"] == "dylan")
            self.assertTrue(dylan_after["conversation_enabled"])
            self.assertEqual(dylan_after["soft_timeout_seconds"], 80)
            self.assertFalse(dylan_after["reaction_enabled"])
            self.assertEqual(dylan_after["soul_source"], "override")
            self.assertIn("Dylan override", dylan_after["soul"])
            text, source = load_agent_soul("dylan")
            self.assertEqual(source, "override")
            self.assertIn("Dylan override", text)
            self.assertIn("Dylan override", load_dylan_soul())


if __name__ == "__main__":
    unittest.main()
