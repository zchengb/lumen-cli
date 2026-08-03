from __future__ import annotations

import argparse
import json
import plistlib
import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from unittest.mock import patch

LIB_DIR = Path(__file__).resolve().parents[1] / "lib" / "scripts"
import sys

if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))

from patch_launchd import interval_minutes_from_cron, status as patch_schedule_status  # noqa: E402
from jira_sync import workspace_jira_config  # noqa: E402
from patch_runtime import (  # noqa: E402
    candidate_jql,
    has_external_reply,
    jira_config,
    patch_branch,
    patch_worktree_path,
)


class AutoPatchTests(unittest.TestCase):
    def test_candidate_jql_filters_configured_types_and_statuses(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            workspace = Path(directory)
            with patch("patch_runtime.jira_config", return_value={"project_key": "DEMO"}), patch(
                "patch_runtime.eligible_statuses", return_value=["To Do", "Ready"]
            ), patch("patch_runtime.issue_types", return_value=["Task", "Bug"]):
                query = candidate_jql(workspace)
        self.assertEqual(
            'project = DEMO AND issuetype in ("Task", "Bug") AND status in ("To Do", "Ready") ORDER BY priority DESC, updated ASC',
            query,
        )

    def test_jira_project_key_comes_from_shared_common_config(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "lumen" / "config").mkdir(parents=True)
            (root / "lumen" / "config" / "common.json").write_text(
                json.dumps({"notifications": {"jira": {"project_key": "COMMON"}}}), encoding="utf-8"
            )
            (root / "lumen" / "config" / "delivery.json").write_text(
                json.dumps({"jira": {"project_key": "LEGACY"}}), encoding="utf-8"
            )
            self.assertEqual("COMMON", jira_config(root)["project_key"])
            self.assertEqual("COMMON", workspace_jira_config(root)["project_key"])

    def test_blocked_card_requires_new_external_reply(self) -> None:
        item = {"fields": {"comment": {"comments": [
            {"body": "Lumen Auto Patch · Blocked", "created": "2026-07-30T10:00:00Z"},
            {"body": "I meant the API repository", "created": "2026-07-30T10:05:00Z"},
        ]}}}
        self.assertTrue(has_external_reply(item, {"blocked_at": "2026-07-30T10:01:00Z"}))
        self.assertFalse(has_external_reply(item, {"blocked_at": "2026-07-30T10:06:00Z"}))

    def test_patch_branch_and_worktree_are_deterministic(self) -> None:
        self.assertEqual("patch/DEMO-123-fix-login-timeout", patch_branch("DEMO-123", "Fix login timeout"))
        self.assertEqual(Path("/tmp/lumen/patch/DEMO-123/service"), patch_worktree_path(Path("/tmp"), "DEMO-123", "service"))

    def test_launchd_interval_parser_is_strict(self) -> None:
        self.assertEqual(5, interval_minutes_from_cron("*/5 * * * *"))
        self.assertIsNone(interval_minutes_from_cron("5 * * * *"))
        self.assertIsNone(interval_minutes_from_cron("*/0 * * * *"))

    def test_launchd_status_reports_an_installed_patch_schedule_as_enabled(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "patch.plist"
            path.write_bytes(plistlib.dumps({"StartInterval": 300}))
            output = StringIO()
            with patch("patch_launchd.plist_path", return_value=path), redirect_stdout(output):
                self.assertEqual(0, patch_schedule_status(argparse.Namespace(project="demo")))
        self.assertTrue(json.loads(output.getvalue())["enabled"])


if __name__ == "__main__":
    unittest.main()
