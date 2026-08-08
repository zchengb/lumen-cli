#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.dylan.autonomous import handle_autonomous_conversation
from agents.dylan.autonomous_runtime import AgentRunResult, CursorAgentRuntime
from agents.dylan.session_bootstrap import build_bootstrap_prompt, build_resume_prompt
from agents.dylan.session_store import (
    PROTOCOL_VERSION,
    SOUL_VERSION,
    SessionStore,
    conversation_scope_id,
    session_contract_current,
)
from agents.dylan.soul_loader import load_soul
from agents.dylan.workspace_contract import ensure_workspace_contract
from risk.lifecycle import mark_not_observed
from risk.models import STATUS_OPEN, STATUS_RESOLVED
from risk.store import GlobalAgentStore, RiskStore, utc_now
from risk.verification import apply_finding_verification, display_status, mark_remediated


def _seed_finding(store: RiskStore, finding_id: str = "FIND-demo000001") -> str:
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
            'Retry race', 'payment', 'High', 'High', 'Open',
            ?, ?, NULL, 0, 0, 1, 1, 'observed', 'none',
            'scan-1', 80.0, 'high')
        """,
        (finding_id, now, now),
    )
    store.commit()
    return finding_id


class FakeRuntime(CursorAgentRuntime):
    def __init__(self, results: list[AgentRunResult]) -> None:
        super().__init__(model="fake")
        self.results = list(results)
        self.calls: list[dict] = []

    def run(self, *, workspace, prompt, provider_session_id=None, trace=None, obs=None):  # type: ignore[override]
        self.calls.append(
            {
                "workspace": str(workspace),
                "prompt": prompt,
                "provider_session_id": provider_session_id,
            }
        )
        if not self.results:
            return AgentRunResult(text="", provider_session_id="", status="failed", error="no fake result")
        return self.results.pop(0)


class SoulV3Tests(unittest.TestCase):
    def test_soul_has_proactive_closure(self) -> None:
        soul = load_soul()
        self.assertIn("Humor", soul)
        self.assertIn("Soul Version: **5**", soul)
        self.assertIn("Meta-awareness", soul)
        self.assertNotIn("restrained, precise, slightly uneasy", soul)

    def test_bootstrap_lists_write_commands(self) -> None:
        prompt = build_bootstrap_prompt(
            project_slug="demo",
            workspace_path="/tmp/ws",
            user_message="hi",
        )
        self.assertIn("mark-remediated", prompt)
        self.assertIn("scan verify", prompt)
        self.assertIn(f"Soul version: {SOUL_VERSION}", prompt)

    def test_resume_mentions_proactive_closure(self) -> None:
        prompt = build_resume_prompt(user_message="修好了", project_slug="demo")
        self.assertIn("progress / explicit resolve", prompt)
        self.assertIn("do not ask for Verification", prompt)


class StatusDisplayTests(unittest.TestCase):
    def test_canonical_labels(self) -> None:
        self.assertEqual(
            display_status(
                {
                    "status": "Open",
                    "remediation_status": "remediated",
                    "verification_status": "pending_verification",
                }
            ),
            "Open",
        )
        self.assertEqual(
            display_status({"status": "Resolved", "verification_status": "verified_clean"}),
            "Resolved",
        )
        self.assertEqual(
            display_status(
                {
                    "status": "Open",
                    "remediation_status": "remediated",
                    "verification_status": "verification_failed",
                }
            ),
            "Open",
        )


class RemediationVerificationTests(unittest.TestCase):
    def test_mark_remediated_idempotent_and_verify_clean(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            (workspace / "config" / "common.json").write_text(
                json.dumps({"project": {"slug": "demo"}}),
                encoding="utf-8",
            )
            store = RiskStore(workspace)
            finding_id = _seed_finding(store)
            first = mark_remediated(
                store,
                finding_id,
                actor="u1",
                reason="User reported the fix completed",
                source_message_id="om_1",
                trace_id="tr_1",
            )
            self.assertEqual(first["status"], "ok")
            self.assertFalse(first["idempotent"])
            self.assertEqual(first["display_status"], "Open")
            second = mark_remediated(
                store,
                finding_id,
                actor="u1",
                reason="User reported the fix completed",
                source_message_id="om_1",
                trace_id="tr_1",
            )
            self.assertTrue(second["idempotent"])
            clean = apply_finding_verification(store, finding_id, observed=False, actor="dylan")
            self.assertEqual(clean["status"], "verified_clean")
            row = dict(store.get_finding(finding_id))
            self.assertEqual(row["status"], STATUS_RESOLVED)
            self.assertEqual(row["verification_status"], "verified_clean")
            store.close()

    def test_verification_failed_keeps_open(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            store = RiskStore(workspace)
            finding_id = _seed_finding(store)
            mark_remediated(
                store,
                finding_id,
                actor="u1",
                reason="fixed",
                source_message_id="om_2",
                trace_id="tr_2",
            )
            failed = apply_finding_verification(store, finding_id, observed=True)
            self.assertEqual(failed["status"], "verification_failed")
            row = dict(store.get_finding(finding_id))
            self.assertEqual(row["status"], STATUS_OPEN)
            self.assertEqual(row["verification_status"], "verification_failed")
            store.close()

    def test_incremental_miss_is_not_resolved(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            store = RiskStore(workspace)
            finding_id = _seed_finding(store)
            mark_not_observed(store, "demo", set(), utc_now())
            row = dict(store.get_finding(finding_id))
            self.assertEqual(row["verification_status"], "not_observed")
            self.assertEqual(row["status"], STATUS_OPEN)
            store.close()


class WorkspaceContractTests(unittest.TestCase):
    def test_managed_block_upsert(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "AGENTS.md").write_text("# Custom\n\nKeep me\n", encoding="utf-8")
            ensure_workspace_contract(workspace=root, project_slug="demo")
            text = (root / "AGENTS.md").read_text(encoding="utf-8")
            self.assertIn("Keep me", text)
            self.assertIn("LUMEN MANAGED START version=5", text)
            self.assertIn("mark-remediated", text)
            ensure_workspace_contract(workspace=root, project_slug="demo")
            text2 = (root / "AGENTS.md").read_text(encoding="utf-8")
            self.assertEqual(text.count("LUMEN MANAGED START"), 1)
            self.assertEqual(text2.count("LUMEN MANAGED START"), 1)


class SessionContractUpgradeTests(unittest.TestCase):
    def test_old_soul_session_reboots(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            os.environ["LUMEN_AGENTS_HOME"] = tmp
            agents_home = Path(tmp)
            store = SessionStore(GlobalAgentStore(agents_home / "agents.sqlite3"))
            scope = conversation_scope_id(chat_id="oc1", thread_id="om_root", project_slug="mbpass")
            old = store.create(
                chat_id="oc1",
                conversation_scope_id=scope,
                workspace_path=str(agents_home / "ws"),
                project_slug="mbpass",
                soul_version="2",
                protocol_version="1",
                provider_session_id="cursor-old",
            )
            self.assertFalse(session_contract_current(old))
            workspace = agents_home / "ws"
            workspace.mkdir()
            (workspace / "config").mkdir()
            (workspace / "config" / "common.json").write_text(
                json.dumps({"project": {"slug": "mbpass"}}),
                encoding="utf-8",
            )
            runtime = FakeRuntime(
                [
                    AgentRunResult(
                        text="hello from v3",
                        provider_session_id="cursor-new",
                        status="succeeded",
                        request_id="r1",
                        duration_ms=10,
                    )
                ]
            )
            with patch("agents.dylan.autonomous._resolve_workspace", return_value=("mbpass", workspace)):
                with patch("agents.dylan.autonomous.resolve_project", return_value={"slug": "mbpass", "workspace": str(workspace)}):
                    with patch("agents.dylan.autonomous.known_project_slugs", return_value=["mbpass"]):
                        with patch("agents.dylan.autonomous.load_chat_project_map", return_value={}):
                            out = handle_autonomous_conversation(
                                text="hi",
                                meta={
                                    "chat_id": "oc1",
                                    "thread_id": "om_root",
                                    "user_id": "u1",
                                    "message_id": "om_msg",
                                },
                                common={
                                    "project": {"slug": "mbpass"},
                                    "agents": {
                                        "dylan": {
                                            "conversation_v4": {
                                                "enabled": True,
                                                "mode": "autonomous_workspace",
                                                "provider": {"type": "cursor_cli", "model": "fake"},
                                                "session": {"scope": "thread_shared"},
                                            }
                                        }
                                    },
                                },
                                runtime=runtime,
                            )
            self.assertEqual(out["status"], "ok")
            self.assertTrue(out.get("bootstrap"))
            self.assertEqual(len(runtime.calls), 1)
            self.assertIsNone(runtime.calls[0]["provider_session_id"])
            self.assertIn("[DYLAN SESSION BOOTSTRAP]", runtime.calls[0]["prompt"])
            closed = store.get(old["session_id"])
            self.assertEqual(closed["status"], "closed")
            active = store.get_active(conversation_scope_id=scope)
            self.assertIsNotNone(active)
            self.assertEqual(active["soul_version"], SOUL_VERSION)
            self.assertEqual(active["protocol_version"], PROTOCOL_VERSION)
            store.close()


class CliWriteTests(unittest.TestCase):
    def test_mark_and_verify_cli(self) -> None:
        import importlib.util

        spec = importlib.util.spec_from_file_location(
            "run_agent_json_cli",
            ROOT / "lib" / "scripts" / "run-agent-json-cli.py",
        )
        assert spec is not None and spec.loader is not None
        cli = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cli)

        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            agents_home = Path(tmp) / "agents-home"
            agents_home.mkdir()
            (agents_home / "config.json").write_text(
                json.dumps(
                    {
                        "enabled": True,
                        "access": {
                            "mutation_allowed_user_ids": ["u1"],
                            "admin_user_ids": ["u1"],
                        },
                    }
                ),
                encoding="utf-8",
            )
            os.environ["LUMEN_AGENTS_HOME"] = str(agents_home)
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
            finding_id = _seed_finding(store)
            store.close()
            code = cli.main(
                [
                    "risk",
                    "finding",
                    "mark-remediated",
                    finding_id,
                    "--workspace",
                    str(workspace),
                    "--project",
                    "demo",
                    "--actor",
                    "u1",
                    "--reason",
                    "fixed",
                    "--source-message-id",
                    "om_cli",
                    "--trace-id",
                    "tr_cli",
                    "--json",
                ]
            )
            self.assertEqual(code, 0)
            code = cli.main(
                [
                    "scan",
                    "verify",
                    "--workspace",
                    str(workspace),
                    "--finding",
                    finding_id,
                    "--json",
                ]
            )
            self.assertEqual(code, 1)
            store = RiskStore(workspace)
            row = dict(store.get_finding(finding_id))
            self.assertEqual(row["status"], STATUS_OPEN)
            self.assertEqual(row["verification_status"], "pending_verification")
            store.close()
            os.environ["LUMEN_TEST_MODE"] = "1"
            try:
                code = cli.main(
                    [
                        "scan",
                        "verify",
                        "--workspace",
                        str(workspace),
                        "--finding",
                        finding_id,
                        "--actor",
                        "u1",
                        "--source-message-id",
                        "om_v",
                        "--trace-id",
                        "tr_v",
                        "--json",
                    ]
                )
                self.assertEqual(code, 0)
                store = RiskStore(workspace)
                row = dict(store.get_finding(finding_id))
                self.assertEqual(row["status"], STATUS_RESOLVED)
                self.assertEqual(row["verification_status"], "verified_clean")
                store.close()
            finally:
                os.environ.pop("LUMEN_TEST_MODE", None)
                os.environ.pop("LUMEN_AGENTS_HOME", None)


if __name__ == "__main__":
    unittest.main()
