from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


SCRIPTS = Path(__file__).resolve().parents[1] / "lib" / "scripts"
sys.path.insert(0, str(SCRIPTS))

import delivery_preflight  # noqa: E402
import delivery_scheduler  # noqa: E402


class DeliveryCursorAuthTests(unittest.TestCase):
    def test_scheduled_delivery_rejects_missing_api_key_without_agent_status(self) -> None:
        with patch.object(delivery_preflight, "check") as check:
            error = delivery_preflight.cursor_auth_error(
                scheduled=True,
                api_key="",
                env_local=Path("/workspace/lumen/.env.local"),
            )

        self.assertIn("CURSOR_API_KEY is required for scheduled delivery", error)
        self.assertIn("/workspace/lumen/.env.local", error)
        check.assert_not_called()

    def test_interactive_delivery_checks_agent_status_without_api_key(self) -> None:
        with patch.object(delivery_preflight, "check", return_value="Cursor authentication: not logged in") as check:
            error = delivery_preflight.cursor_auth_error(
                scheduled=False,
                api_key="",
                env_local=Path("/workspace/lumen/.env.local"),
            )

        self.assertEqual("Cursor authentication: not logged in", error)
        check.assert_called_once_with(["agent", "status"], "Cursor authentication")

    def test_api_key_skips_agent_status(self) -> None:
        with patch.object(delivery_preflight, "check") as check:
            error = delivery_preflight.cursor_auth_error(
                scheduled=True,
                api_key="secret",
                env_local=Path("/workspace/lumen/.env.local"),
            )

        self.assertEqual("", error)
        check.assert_not_called()

    def test_scheduler_marks_child_delivery_as_scheduled(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs_dir = Path(temp)
            story_dir = docs_dir / "stories" / "MBPAS-1-demo"
            story_dir.mkdir(parents=True)
            (story_dir / "metadata.json").write_text(
                json.dumps(
                    {
                        "businessStatus": "ready",
                        "technicalStatus": "approved",
                        "deliveryStatus": "not_started",
                        "jiraKey": "MBPAS-1",
                    }
                ),
                encoding="utf-8",
            )
            activity_file = docs_dir / "activity.jsonl"
            with (
                patch.object(delivery_scheduler, "sync_docs_checkout"),
                patch.object(delivery_scheduler, "current_jira_status", return_value="Ready for Dev"),
                patch.object(delivery_scheduler.shutil, "which", return_value="/usr/local/bin/lumen"),
                patch.object(delivery_scheduler.subprocess, "run") as run,
            ):
                run.return_value.returncode = 0
                with patch.object(
                    sys,
                    "argv",
                    [
                        "delivery_scheduler.py",
                        "--docs-dir",
                        str(docs_dir),
                        "--lumen-bin",
                        "lumen",
                        "--activity-file",
                        str(activity_file),
                    ],
                ):
                    result = delivery_scheduler.main()

        self.assertEqual(0, result)
        environment = run.call_args.kwargs["env"]
        self.assertEqual("scheduled", environment["LUMEN_DELIVERY_TRIGGER"])


if __name__ == "__main__":
    unittest.main()
