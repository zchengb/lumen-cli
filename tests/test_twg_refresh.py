from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

LIB_DIR = Path(__file__).resolve().parents[1] / "lib" / "scripts"
if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))

import jira_sync  # noqa: E402


class TwgRefreshTests(unittest.TestCase):
    def test_refresh_skips_when_scan_jira_disabled(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            (workspace / "config" / "common.json").write_text(
                json.dumps({"notifications": {"jira": {"enabled": False}}}),
                encoding="utf-8",
            )
            with patch.object(jira_sync, "refresh_twg_auth") as refresh:
                ok, reason = jira_sync.refresh_twg_for_scan_workspace(workspace)
            self.assertTrue(ok)
            self.assertEqual(reason, "")
            refresh.assert_not_called()

    def test_refresh_runs_when_scan_jira_enabled(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "config").mkdir()
            (workspace / "config" / "common.json").write_text(
                json.dumps({"notifications": {"jira": {"enabled": True}}}),
                encoding="utf-8",
            )
            with patch.object(jira_sync, "refresh_twg_auth", return_value=(True, "")) as refresh:
                ok, reason = jira_sync.refresh_twg_for_scan_workspace(workspace)
            self.assertTrue(ok)
            refresh.assert_called_once_with(force=True)

    def test_refresh_twg_auth_calls_twg_cli(self) -> None:
        with patch.object(jira_sync, "twg_ready", return_value=(True, "")), patch.object(
            jira_sync, "run_twg", return_value=(0, '{"data":{"status":"refreshed"}}')
        ) as run_twg:
            ok, reason = jira_sync.refresh_twg_auth(force=True)
        self.assertTrue(ok)
        self.assertEqual(reason, "")
        run_twg.assert_called_once_with(["auth", "refresh", "--force"])


if __name__ == "__main__":
    unittest.main()
