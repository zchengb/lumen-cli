#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.dylan.feishu_format import extract_final_response
from agents.dylan.session_bootstrap import build_bootstrap_prompt, build_resume_prompt
from agents.dylan.session_store import PROTOCOL_VERSION, SOUL_VERSION
from agents.dylan.workspace_contract import ensure_workspace_contract
from risk.resolution import resolve_finding
from risk.resolution_policy import ResolutionPolicy
from risk.store import RiskStore, utc_now
from risk.verification import apply_verification_receipt, display_status, mark_remediated
from risk.verification_runner import FakeVerificationAdapter, run_verification


def _seed_finding(store: RiskStore, finding_id: str = "FIND-demo000001", *, severity: str = "Medium") -> str:
    now = utc_now()
    store.execute(
        """
        INSERT INTO finding(
            id, project_slug, canonical_fingerprint, registry_issue_id, repository, module,
            title, category, source_severity, effective_severity, status,
            first_seen_at, last_seen_at, resolved_at, reopened_count, recurrence_count,
            occurrence_count, consecutive_seen_count, verification_status, remediation_status,
            last_seen_scan_run_id, current_risk_score, current_risk_band
        ) VALUES (?, 'demo', 'fp-demo-1', NULL, 'repo', 'pay',
            'Retry race', 'payment', ?, ?, 'Open',
            ?, ?, NULL, 0, 0, 1, 1, 'observed', 'none',
            'scan-1', 80.0, 'medium')
        """,
        (finding_id, severity, severity, now, now),
    )
    store.commit()
    return finding_id


class ContractV4Tests(unittest.TestCase):
    def test_protocol_versions(self) -> None:
        self.assertEqual(SOUL_VERSION, "5")
        self.assertEqual(PROTOCOL_VERSION, "5")

    def test_bootstrap_classifies_intents(self) -> None:
        prompt = build_bootstrap_prompt(project_slug="demo", workspace_path="/tmp", user_message="hi")
        self.assertIn("Explicit resolve", prompt)
        self.assertIn("Never pass or infer --observed", prompt)
        self.assertIn("FINAL_RESPONSE", prompt)
        self.assertIn("lumen risk finding resolve", prompt)
        self.assertNotIn("--observed false|true", prompt)

    def test_resume_contract(self) -> None:
        prompt = build_resume_prompt(user_message="Mark it resolved.")
        self.assertIn("Do not ask for confirmation twice", prompt)
        self.assertIn("Never pass or infer --observed", prompt)

    def test_workspace_managed_v4(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            ensure_workspace_contract(workspace=root, project_slug="demo")
            text = (root / "AGENTS.md").read_text(encoding="utf-8")
            self.assertIn("version=5", text)
            self.assertIn("resolve <id>", text)
            self.assertIn("Never pass --observed", text)


class FinalResponseTests(unittest.TestCase):
    def test_envelope_wins(self) -> None:
        raw = "I'll look up the code.Pulling MCP.\n<FINAL_RESPONSE>\nNice work.\n</FINAL_RESPONSE>"
        parsed = extract_final_response(raw)
        self.assertTrue(parsed.valid)
        self.assertEqual(parsed.mode, "final_response_envelope")
        self.assertEqual(parsed.text, "Nice work.")
        self.assertNotIn("I'll look up", parsed.text)

    def test_legacy_fallback(self) -> None:
        parsed = extract_final_response("I'll check the path.\n\n## Answer\nDone.")
        self.assertTrue(parsed.fallback_used)
        self.assertIn("Answer", parsed.text)


class ResolutionAuthorityTests(unittest.TestCase):
    def test_medium_owner_confirmed(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            store = RiskStore(workspace)
            finding_id = _seed_finding(store, severity="Medium")
            out = resolve_finding(
                store,
                finding_id,
                basis="user_confirmed",
                actor="u1",
                reason="Owner confirmed repair",
                source_message_id="om_1",
                trace_id="tr_1",
            )
            self.assertEqual(out["status"], "ok")
            self.assertEqual(out["display_status"], "Resolved")
            row = dict(store.get_finding(finding_id))
            self.assertEqual(row["resolution_basis"], "user_confirmed")
            self.assertEqual(row["verification_status"], "pending_verification")
            store.close()

    def test_high_requires_verification(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            store = RiskStore(workspace)
            finding_id = _seed_finding(store, severity="High")
            out = resolve_finding(
                store,
                finding_id,
                basis="user_confirmed",
                actor="u1",
                reason="please resolve",
                source_message_id="om_2",
                trace_id="tr_2",
            )
            self.assertEqual(out["status"], "error")
            self.assertEqual(out["code"], "VERIFICATION_REQUIRED_HIGH")
            store.close()

    def test_policy_override(self) -> None:
        decision = ResolutionPolicy(
            {"risk": {"resolution_policy": {"require_verification_for": ["High"], "allow_policy_override": True}}}
        ).evaluate(
            finding={"effective_severity": "High", "status": "Open"},
            actor_id="u1",
            requested_basis="policy_override",
            override=True,
        )
        self.assertTrue(decision.allowed)


class VerificationRunnerTests(unittest.TestCase):
    def test_verify_clean_and_reopen(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            (workspace / "config" / "common.json").write_text(
                json.dumps({"project": {"slug": "demo"}}),
                encoding="utf-8",
            )
            (workspace / "config" / "repos.json").write_text(
                json.dumps({"repositories": [{"name": "repo"}]}),
                encoding="utf-8",
            )
            store = RiskStore(workspace)
            finding_id = _seed_finding(store, severity="Medium")
            resolve_finding(
                store,
                finding_id,
                actor="u1",
                reason="fixed",
                source_message_id="om_r",
                trace_id="tr_r",
            )
            clean = run_verification(
                store,
                workspace,
                finding_id,
                actor="u1",
                source_message_id="om_v",
                trace_id="tr_v",
                scan_adapter=FakeVerificationAdapter(observed=False),
            )
            self.assertEqual(clean["status"], "verified_clean")
            self.assertEqual(clean["display_status"], "Resolved")
            self.assertIn("receipt", clean)
            failed = apply_verification_receipt(
                store,
                finding_id,
                result="verification_failed",
                observed=True,
                scan_run_id="verify-fail-1",
            )
            self.assertEqual(failed["status"], "verification_failed")
            self.assertEqual(failed["display_status"], "Reopened")
            store.close()

    def test_public_cli_rejects_observed(self) -> None:
        spec = importlib.util.spec_from_file_location(
            "run_agent_json_cli",
            ROOT / "lib" / "scripts" / "run-agent-json-cli.py",
        )
        assert spec is not None and spec.loader is not None
        cli = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cli)
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            code = cli.main(
                [
                    "scan",
                    "verify",
                    "--workspace",
                    str(workspace),
                    "--finding",
                    "FIND-x",
                    "--observed",
                    "false",
                    "--json",
                ]
            )
            self.assertEqual(code, 1)


class DisplayStatusM20Tests(unittest.TestCase):
    def test_user_confirmed_label(self) -> None:
        self.assertEqual(
            display_status(
                {
                    "status": "Resolved",
                    "resolution_basis": "user_confirmed",
                    "verification_status": "pending_verification",
                }
            ),
            "Resolved",
        )


if __name__ == "__main__":
    unittest.main()
