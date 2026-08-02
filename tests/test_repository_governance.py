from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace


LIB_DIR = Path(__file__).resolve().parents[1] / "lib" / "scripts"
if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))

from dashboard_server import save_repositories, workspace_payload  # noqa: E402
from delivery_workspace import repository_delivery_disabled_reasons  # noqa: E402
from auto_fix_sync import is_pr_candidate  # noqa: E402
from patch_runner import select_repository  # noqa: E402


class RepositoryGovernanceTests(unittest.TestCase):
    def make_workspace(self, root: Path) -> tuple[Path, Path]:
        workspace = root / "lumen"
        config = workspace / "config"
        repository = root / "repos" / "service"
        subprocess.run(["git", "init", "-b", "main", str(repository)], check=True, capture_output=True)
        (repository / ".nvmrc").write_text("20\n", encoding="utf-8")
        (repository / "build.gradle.kts").write_text("java { toolchain { languageVersion.set(JavaLanguageVersion.of(21)) } }", encoding="utf-8")
        (repository / "package.json").write_text(json.dumps({"scripts": {"lint": "eslint .", "test": "vitest"}}), encoding="utf-8")
        config.mkdir(parents=True)
        (config / "runtime-profiles.json").write_text(json.dumps({"local-java-review-only": {}}), encoding="utf-8")
        (config / "delivery.json").write_text(json.dumps({"verification": {"steps": {}}}), encoding="utf-8")
        (config / "repos.json").write_text(json.dumps({"repositories": [{
            "name": "service", "path": str(repository), "default_branch": "main", "runtime_profile": "local-java-review-only",
            "validation_commands": ["unused command"], "allow_auto_fix": True, "allow_pr": True,
            "runtime": {"visual_auth_credential": "secret", "node_version": "20"},
            "automation": {"delivery": {"enabled": False}, "patch": {"enabled": False}},
        }]}), encoding="utf-8")
        return workspace, repository

    def test_payload_detects_tooling_and_redacts_runtime_secret(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            workspace, _ = self.make_workspace(Path(directory))
            repository = workspace_payload(workspace)["repositories"][0]
            self.assertNotIn("runtime", repository)
            self.assertTrue(repository["runtime_configured"])
            self.assertEqual("21", repository["health"]["java_version"])
            self.assertEqual("20", repository["health"]["node_version"])
            self.assertIn("Gradle", repository["health"]["build_tools"])
            self.assertFalse(repository["automation"]["delivery"]["enabled"])
            self.assertFalse(repository["automation"]["patch"]["enabled"])

    def test_missing_patch_permission_defaults_to_enabled_without_scan_pr_permission(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            workspace, _ = self.make_workspace(Path(directory))
            config_path = workspace / "config" / "repos.json"
            config = json.loads(config_path.read_text(encoding="utf-8"))
            config["repositories"][0].pop("automation")
            config["repositories"][0].pop("allow_pr", None)
            config_path.write_text(json.dumps(config), encoding="utf-8")

            repository = workspace_payload(workspace)["repositories"][0]
            self.assertTrue(repository["automation"]["patch"]["enabled"])
            self.assertNotIn("allow_pr", repository)
            selected, _ = select_repository(workspace.parent, {"fields": {"labels": ["service"]}})
            self.assertEqual("service", selected["name"])
            finding = {"severity": "High", "auto_fix": {"status": "committed"}}
            self.assertTrue(is_pr_candidate(finding, {"automation": {"scan": {"allow_auto_fix": True, "allow_pr": False}}}))

    def test_save_removes_unused_validation_commands_and_preserves_runtime(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            workspace, repository = self.make_workspace(Path(directory))
            save_repositories(workspace, [{
                "name": "service", "path": str(repository), "default_branch": "main", "runtime_profile": "local-java-review-only",
                "automation": {"scan": {"allow_auto_fix": False, "allow_pr": False}, "delivery": {"enabled": True}, "patch": {"enabled": True}},
                "delivery_commands": ["./gradlew test"],
            }])
            saved = json.loads((workspace / "config" / "repos.json").read_text(encoding="utf-8"))["repositories"][0]
            self.assertNotIn("validation_commands", saved)
            self.assertEqual("secret", saved["runtime"]["visual_auth_credential"])
            self.assertTrue(saved["automation"]["patch"]["enabled"])
            self.assertFalse(saved["allow_auto_fix"])

    def test_save_persists_auto_patch_disabled(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            workspace, repository = self.make_workspace(Path(directory))
            save_repositories(workspace, [{
                "name": "service", "path": str(repository), "default_branch": "main", "runtime_profile": "local-java-review-only",
                "automation": {"scan": {"allow_auto_fix": True}, "delivery": {"enabled": True}, "patch": {"enabled": False}},
            }])
            saved = json.loads((workspace / "config" / "repos.json").read_text(encoding="utf-8"))["repositories"][0]
            self.assertFalse(saved["automation"]["patch"]["enabled"])
            self.assertFalse(workspace_payload(workspace)["repositories"][0]["automation"]["patch"]["enabled"])
            selected, reason = select_repository(workspace.parent, {"fields": {"labels": ["service"]}})
            self.assertIsNone(selected)
            self.assertIn("Auto Patch is disabled", reason)

    def test_patch_and_delivery_respect_repository_authorization(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            workspace, repository = self.make_workspace(Path(directory))
            item = {"fields": {"labels": ["service"]}}
            selected, reason = select_repository(workspace.parent, item)
            self.assertIsNone(selected)
            self.assertIn("Auto Patch is disabled", reason)
            context = SimpleNamespace(workspace_root=workspace.parent, repos=[SimpleNamespace(name="service")])
            self.assertEqual(["repository 'service' is not authorized for Auto Delivery"], repository_delivery_disabled_reasons(context))


if __name__ == "__main__":
    unittest.main()
