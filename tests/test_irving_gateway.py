#!/usr/bin/env python3
from __future__ import annotations

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.definitions import ensure_definitions_loaded, get_definition
from feishu.client_registry import GATEWAY_AGENTS


class IrvingGatewayTests(unittest.TestCase):
    def test_gateway_includes_irving(self) -> None:
        self.assertIn("irving", GATEWAY_AGENTS)

    def test_irving_definition_loads(self) -> None:
        ensure_definitions_loaded()
        definition = get_definition("irving")
        self.assertIsNotNone(definition)
        self.assertEqual(definition.id, "irving")
        self.assertIn("risk.read", definition.capabilities.actions)


if __name__ == "__main__":
    unittest.main()
