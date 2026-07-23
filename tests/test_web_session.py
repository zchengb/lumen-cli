from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

SCRIPTS = Path(__file__).resolve().parents[1] / "lib" / "scripts"
sys.path.insert(0, str(SCRIPTS))

from web_session import auth_env_name, auth_strategy, credential_for, stop_sessions  # noqa: E402


class WebSessionTests(unittest.TestCase):
    def test_authentication_aliases_are_backward_compatible(self) -> None:
        self.assertEqual("storage-state", auth_strategy({"auth_strategy": "playwright-storage-state"}))
        self.assertEqual("existing-session", auth_strategy({"auth_strategy": "saved-session"}))
        self.assertEqual("login-endpoint", auth_strategy({"auth_strategy": "fake-login"}))

    def test_auth_env_name_is_stable_and_configurable(self) -> None:
        self.assertEqual("LUMEN_VISUAL_AUTH_DIGITAL_PLATFORM_ADMIN", auth_env_name("digital-platform-admin", {}))
        self.assertEqual("CUSTOM_AUTH", auth_env_name("repo", {"auth_credential_env": "CUSTOM_AUTH"}))

    def test_credentials_prefer_project_env_over_workspace_env(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            project = root / "digital-platform-admin"
            project.mkdir()
            (project / ".env.local").write_text("LUMEN_VISUAL_USERNAME=PROJECT\n", encoding="utf-8")
            workspace = root / "workspace"
            (workspace / "lumen").mkdir(parents=True)
            (workspace / "lumen" / ".env.local").write_text("LUMEN_VISUAL_USERNAME=WORKSPACE\n", encoding="utf-8")

            self.assertEqual(
                "PROJECT",
                credential_for(
                    workspace,
                    project,
                    "digital-platform-admin",
                    {"auth_credential_env": "LUMEN_VISUAL_USERNAME"},
                    {},
                ),
            )

    def test_stop_writes_secret_free_summary_and_does_not_need_live_server(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp) / "run"
            session = root / "web-session-run-app"
            session.mkdir(parents=True)
            (session / "session.json").write_text(json.dumps({"session_id": "s1", "repository": "app", "session_dir": str(session)}), encoding="utf-8")
            (session / "server.json").write_text("{}\n", encoding="utf-8")
            (root / "session-context.json").write_text(json.dumps({"run_id": "run", "sessions": [{"session_id": "s1", "repository": "app", "session_dir": str(session)}]}), encoding="utf-8")
            with patch("web_session.os.killpg"):
                summary = stop_sessions(root)
            serialized = json.dumps(summary)
            self.assertEqual("completed", summary["status"])
            self.assertNotIn("credential", serialized.lower())
            self.assertEqual("completed", json.loads((session / "session.json").read_text())["status"])


if __name__ == "__main__":
    unittest.main()
