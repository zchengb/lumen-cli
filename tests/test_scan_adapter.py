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

from workflows.scan_adapter import ScanAdapter


class ScanAdapterTests(unittest.TestCase):
    def test_build_command(self) -> None:
        adapter = ScanAdapter(lumen_bin="/tmp/lumen")
        self.assertEqual(
            adapter.build_command("mbpass"),
            ["/tmp/lumen", "scan", "--project", "mbpass"],
        )
        self.assertEqual(
            adapter.build_command("mbpass", dry_run=True),
            ["/tmp/lumen", "scan", "--project", "mbpass", "--dry-run"],
        )

    def test_start_invokes_subprocess(self) -> None:
        adapter = ScanAdapter(lumen_bin="/tmp/lumen")
        fake_project = {"slug": "mbpass", "workspace": "/tmp/does-not-need-to-exist-mbpass"}

        class Result:
            returncode = 0
            stdout = "ok"
            stderr = ""

        with patch("workflows.scan_adapter.resolve_slug", return_value=fake_project), \
                patch("workflows.scan_adapter.subprocess.run", return_value=Result()) as run:
            payload = adapter.start(project_slug="mbpass", window_days=3, dry_run=True)
        self.assertEqual(payload["status"], "completed")
        self.assertEqual(payload["command"][-1], "--dry-run")
        run.assert_called_once()
        self.assertTrue(str(payload["run_id"]).startswith("scan-"))

    def test_window_days_restored(self) -> None:
        adapter = ScanAdapter(lumen_bin="/tmp/lumen")
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            (workspace / "config" / "common.json").write_text(
                '{"execution": {"scan_window_days": 7}}\n',
                encoding="utf-8",
            )
            fake_project = {"slug": "demo", "workspace": str(workspace)}

            class Result:
                returncode = 0
                stdout = ""
                stderr = ""

            with patch("workflows.scan_adapter.resolve_slug", return_value=fake_project), \
                    patch("workflows.scan_adapter.subprocess.run", return_value=Result()):
                adapter.start(project_slug="demo", window_days=3, dry_run=True)
            common = json.loads((workspace / "config" / "common.json").read_text(encoding="utf-8"))
            self.assertEqual(common["execution"]["scan_window_days"], 7)


if __name__ == "__main__":
    unittest.main()
