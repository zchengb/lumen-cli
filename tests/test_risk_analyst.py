#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from risk.alerts import evaluate_alerts
from risk.correlation import canonical_fingerprint, correlate_finding
from risk.ingestion import ingest_scan_risk
from risk.lifecycle import apply_seen, map_registry_status
from risk.models import STATUS_OPEN, STATUS_REOPENED, STATUS_RESOLVED, RiskConfig
from risk.scoring import compute_effective_severity, score_finding
from risk.store import RiskStore


class RiskAnalystTests(unittest.TestCase):
    def test_fingerprint_stable(self) -> None:
        finding = {
            "repository": "mbpass-app",
            "file": "src/payment/Retry.java",
            "title": "Inconsistent payment retry state",
            "root_cause": "payment retry race",
            "trigger": "status flipped without lock",
        }
        self.assertEqual(canonical_fingerprint(finding), canonical_fingerprint(dict(finding)))

    def test_exact_correlation(self) -> None:
        finding = {
            "repository": "repo",
            "file": "a/b/c.py",
            "title": "Null deref",
            "root_cause": "null",
            "trigger": "x is null",
        }
        fp = canonical_fingerprint(finding)
        row = {"canonical_fingerprint": fp, "id": "FIND-1", "repository": "repo", "title": "Null deref", "category": "null"}
        outcome, matched, conf = correlate_finding(finding, [row])
        self.assertEqual(outcome, "exact_match")
        self.assertEqual(matched["id"], "FIND-1")
        self.assertEqual(conf, 1.0)

    def test_severity_upgrade_requires_two_signals(self) -> None:
        sev, reasons = compute_effective_severity(
            "Medium",
            recurrence_count=2,
            reopened_count=0,
            module="payment",
            critical_modules=["payment"],
            category="payment",
            title="retry inconsistency",
        )
        self.assertEqual(sev, "High")
        self.assertGreaterEqual(len(reasons), 2)

    def test_score_breakdown(self) -> None:
        config = RiskConfig(critical_modules=["payment"])
        breakdown = score_finding(
            effective_severity="High",
            recurrence_count=2,
            reopened_count=1,
            module="payment",
            first_seen_at="2026-01-01T00:00:00Z",
            has_jira=False,
            has_pr=False,
            config=config,
            category="payment",
        )
        self.assertGreater(breakdown.total, 50)
        self.assertIn("severity", breakdown.parts)

    def test_ingest_and_reopen(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            (workspace / "state").mkdir()
            common = {
                "project": {"slug": "demo"},
                "agents": {"dylan": {"risk_analyst": {"enabled": True}}},
                "risk": {"critical_modules": ["payment"], "overdue_days": 7},
            }
            (workspace / "config" / "common.json").write_text(json.dumps(common), encoding="utf-8")
            finding = {
                "title": "Payment retry race",
                "severity": "High",
                "repository": "pay",
                "file": "payment/Retry.java",
                "line_range": "10-20",
                "trigger": "unlocked flip",
                "root_cause": "payment race",
                "issue_id": "ISSUE-1",
            }
            scan1 = {
                "scan_status": "completed_with_findings",
                "started_at": "2026-08-01T00:00:00Z",
                "finished_at": "2026-08-01T01:00:00Z",
                "findings": [finding],
            }
            registry = {"issues": [{"id": "ISSUE-1", "status": "open", **finding}]}
            result = ingest_scan_risk(
                workspace=workspace,
                scan=scan1,
                registry=registry,
                common=common,
                result_path=workspace / "results" / "scan-result.json",
                dry_run=False,
            )
            self.assertEqual(result["status"], "updated")
            store = RiskStore(workspace)
            rows = store.list_findings("demo")
            self.assertEqual(len(rows), 1)
            finding_id = rows[0]["id"]
            apply_seen(store, finding_id, STATUS_RESOLVED, "2026-08-05T00:00:00Z")
            store.commit()
            row = store.get_finding(finding_id)
            self.assertEqual(row["status"], STATUS_REOPENED)
            alerts = evaluate_alerts(
                store,
                project_slug="demo",
                events=[{"type": "new_finding", "finding_id": finding_id, "severity": "High"}],
                config=RiskConfig.from_common(common),
            )
            self.assertTrue(any(item["event_type"] == "new_finding" for item in alerts))
            store.record_alert("demo", alerts[0]["event_key"], alerts[0]["event_type"], finding_id)
            store.commit()
            alerts2 = evaluate_alerts(
                store,
                project_slug="demo",
                events=[{"type": "new_finding", "finding_id": finding_id, "severity": "High"}],
                config=RiskConfig.from_common(common),
            )
            self.assertEqual(alerts2, [])
            store.close()

    def test_disabled_flag_skips(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            result = ingest_scan_risk(
                workspace=workspace,
                scan={"findings": []},
                registry={"issues": []},
                common={"agents": {"dylan": {"risk_analyst": {"enabled": False}}}},
                result_path=Path(tmp) / "scan-result.json",
            )
            self.assertEqual(result["status"], "disabled")

    def test_map_registry_status(self) -> None:
        self.assertEqual(map_registry_status("ignored"), "Ignored")
        self.assertEqual(map_registry_status("resolved"), "Resolved")
        self.assertEqual(map_registry_status("open"), "Open")


class RiskParserTests(unittest.TestCase):
    def test_risk_intents(self) -> None:
        from agents.parser import parse_dylan_text

        self.assertEqual(parse_dylan_text("最近最大的风险是什么？").name, "risk.top")
        self.assertEqual(parse_dylan_text("风险在上升还是下降？").name, "risk.trend")
        self.assertEqual(parse_dylan_text("哪些问题反复出现？").name, "risk.recurring")
        self.assertEqual(parse_dylan_text("有哪些 High 超过七天没处理？").name, "risk.overdue")
        self.assertEqual(parse_dylan_text("扫描 mbpass 最近七天", known_slugs={"mbpass"}).name, "scan.run")


class HookIsolationTests(unittest.TestCase):
    def test_process_scan_failure_isolated(self) -> None:
        from agents.dylan.analyst import process_scan_for_dylan

        with patch("agents.dylan.analyst.ingest_scan_risk", side_effect=RuntimeError("boom")):
            with self.assertRaises(RuntimeError):
                process_scan_for_dylan(
                    workspace=Path("/tmp"),
                    scan={},
                    registry={},
                    common={"agents": {"dylan": {"risk_analyst": {"enabled": True}}}},
                    result_path=Path("/tmp/x.json"),
                )


if __name__ == "__main__":
    unittest.main()
