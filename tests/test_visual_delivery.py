from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPTS = Path(__file__).resolve().parents[1] / "lib" / "scripts"
sys.path.insert(0, str(SCRIPTS))

from visual_delivery import (  # noqa: E402
    compare_png,
    configured_node_version,
    dependencies_installed,
    detect_runtime,
    merge_visual_result,
    matching_scenarios,
    redact,
    resolve_visual_auth_credential,
    runtime_command,
    set_visual_auth_credential,
    validate_contract,
    visual_contract,
    web_auth_auto_login_configured,
    web_auth_ready,
    write_diff,
)
from delivery_workspace import validate_story_gates  # noqa: E402


PLAN = """# Technical Plan

## Visual Delivery Contract

### Design Source

| Screen | Figma file | Node ID | Approved reference |
|---|---|---|---|
| Today | App | `123:456` | `assets/today.png` |

### Runtime

| Property | Value |
|---|---|
| Repository | app |
| Runtime profile | web-visual |
| Platform | web |
| Navigation | /today |
| Authentication | playwright-storage-state |

### Visual State Matrix

| Screen | State | Fixture | Reference | Stable marker | Maestro flow |
|---|---|---|---|---|---|
| Today | Default | today-default | `assets/today.png` | today-screen | `maestro/today.yaml` |

### Figma-to-Code Component Mapping

| Figma component | Existing implementation | Delivery action |
|---|---|---|
| Button/Primary | src/Button.tsx | Reuse |

### Platform Rules

- Preserve responsive behavior and focus states.

### Visual Verification

| Screen | State | Comparison | Maximum difference |
|---|---|---|---|
| Today | Default | Full content area | `1%` |
"""


class VisualDeliveryTests(unittest.TestCase):
    def test_contract_is_optional_and_validates_ui_plan(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "technical-plan.md"
            path.write_text("# Technical Plan\n\n## Goal\n\nBackend only.\n", encoding="utf-8")
            self.assertIsNone(visual_contract(path))
            path.write_text(PLAN, encoding="utf-8")
            contract = visual_contract(path)
            self.assertIsNotNone(contract)
            self.assertEqual([], validate_contract(contract or {}))
            self.assertEqual(0.01, contract["scenarios"][0]["maximum_difference_ratio"])
            self.assertEqual("maestro/today.yaml", contract["scenarios"][0]["maestro_flow"])
            self.assertEqual(["Today"], [item["screen"] for item in matching_scenarios(contract, "Today", "Default")])
            self.assertEqual([], matching_scenarios(contract, "Missing", "Default"))

    def test_web_runtime_detection_remains_draft_after_tooling_is_found(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            (repo / "package.json").write_text(
                json.dumps({"scripts": {"dev": "vite"}, "devDependencies": {"vite": "1"}}), encoding="utf-8"
            )
            (repo / "package-lock.json").write_text("{}", encoding="utf-8")
            (repo / "vite.config.ts").write_text("export default {}", encoding="utf-8")
            profile, detected = detect_runtime(repo) or ("", {})
            self.assertEqual("web-visual", profile)
            self.assertEqual("incomplete", detected["runtime_status"])
            (repo / "playwright.config.ts").write_text("export default {}", encoding="utf-8")
            self.assertEqual("incomplete", (detect_runtime(repo) or ("", {}))[1]["runtime_status"])

    def test_create_react_app_start_dev_is_detected(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            (repo / "package.json").write_text(
                json.dumps({"scripts": {"start:dev": "react-scripts start"}, "dependencies": {"react-scripts": "5"}}),
                encoding="utf-8",
            )
            (repo / "yarn.lock").write_text("", encoding="utf-8")
            profile, detected = detect_runtime(repo) or ("", {})
            self.assertEqual("web-visual", profile)
            self.assertEqual("yarn start:dev", detected["runtime"]["start_command"])
            self.assertEqual("http://127.0.0.1:3000", detected["runtime"]["base_url"])

    def test_dependency_detection_uses_the_worktree_node_modules(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            self.assertFalse(dependencies_installed(repo))
            (repo / "node_modules").mkdir()
            self.assertTrue(dependencies_installed(repo))

    def test_node_version_prefers_runtime_then_project_file(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            (repo / ".nvmrc").write_text("16\n", encoding="utf-8")
            self.assertEqual("16", configured_node_version(repo, {}))
            self.assertEqual("20.20.2", configured_node_version(repo, {"node_version": "20.20.2"}))

    def test_runtime_command_preserves_environment_assignments(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            repo = Path(temp)
            nvm = Path.home() / ".nvm" / "nvm.sh"
            if nvm.is_file():
                command = runtime_command(repo, {"node_version": "16"}, "PORT=3000 yarn start")
                self.assertIn("bash -lc 'PORT=3000 yarn start'", command[-1])


    def test_png_comparison_writes_diff_and_ratio(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            expected, actual, diff = root / "expected.png", root / "actual.png", root / "diff.png"
            write_diff(expected, 2, 1, b"\x00\x00\x00\x00\x00\x00")
            write_diff(actual, 2, 1, b"\xff\x00\x00\x00\x00\x00")
            self.assertEqual(0.5, compare_png(expected, actual, diff))
            self.assertTrue(diff.is_file())

    def test_visual_result_is_optional_and_contains_no_environment(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            result = Path(temp) / "delivery-result.json"
            result.write_text('{"delivery_status":"ready_for_finalize"}\n', encoding="utf-8")
            merge_visual_result(result, "web-visual", [{"repository": "app", "screen": "Today", "state": "Default", "status": "passed", "difference_ratio": 0.0}])
            payload = json.loads(result.read_text(encoding="utf-8"))
            self.assertEqual("passed", payload["visual_verification"]["status"])
            self.assertNotIn("environment", json.dumps(payload).lower())

    def test_secret_redaction_covers_visual_runtime_values(self) -> None:
        self.assertEqual(
            "login failed for [REDACTED]",
            redact("login failed for secret-token", {"LUMEN_VISUAL_ACCESS_TOKEN": "secret-token"}),
        )

    def test_web_auth_requires_credential_in_repos_runtime(self) -> None:
        runtime = {
            "auth_strategy": "playwright-storage-state",
            "auth_login_path": "/oauth-proxy-api/auth/admin/fake",
        }
        self.assertFalse(web_auth_auto_login_configured(runtime, {}))
        runtime["visual_auth_credential"] = "TESTWIW"
        self.assertTrue(web_auth_auto_login_configured(runtime, {}))
        self.assertTrue(web_auth_ready(runtime, {}))

    def test_web_auth_prefers_repos_runtime_credential(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            lumen = root / "lumen"
            (lumen / "config").mkdir(parents=True)
            (lumen / "config" / "repos.json").write_text(
                json.dumps(
                    {
                        "repositories": [
                            {
                                "name": "digital-platform-admin",
                                "runtime": {
                                    "visual_auth_credential": "FILE-WIW",
                                    "auth_login_path": "/oauth-proxy-api/auth/admin/fake",
                                },
                            }
                        ]
                    }
                ),
                encoding="utf-8",
            )
            runtime = {
                "auth_strategy": "playwright-storage-state",
                "visual_auth_credential": "FILE-WIW",
                "auth_login_path": "/oauth-proxy-api/auth/admin/fake",
            }
            self.assertEqual("FILE-WIW", resolve_visual_auth_credential(runtime, {}))
            self.assertTrue(web_auth_auto_login_configured(runtime, {}))

    def test_set_visual_auth_writes_runtime_credential_to_repos_json(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            lumen = root / "lumen"
            (lumen / "config").mkdir(parents=True)
            (lumen / "config" / "repos.json").write_text(
                json.dumps({"repositories": [{"name": "digital-platform-admin", "runtime": {}}]}),
                encoding="utf-8",
            )
            set_visual_auth_credential(lumen, "digital-platform-admin", "STORED-WIW")
            payload = json.loads((lumen / "config" / "repos.json").read_text(encoding="utf-8"))
            self.assertEqual(
                "STORED-WIW",
                payload["repositories"][0]["runtime"]["visual_auth_credential"],
            )

    def test_web_auth_requires_storage_file_without_auto_login(self) -> None:
        runtime = {"auth_strategy": "playwright-storage-state"}
        self.assertFalse(web_auth_ready(runtime, {}))

    def test_approved_ui_story_is_blocked_when_visual_contract_is_incomplete(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            story, plan = root / "story.md", root / "technical-plan.md"
            story.write_text("# Story\n\n" + "Business context. " * 10, encoding="utf-8")
            plan.write_text(PLAN.replace("| app |", "| TBD |"), encoding="utf-8")
            errors = validate_story_gates(
                {"businessStatus": "ready", "technicalStatus": "approved"}, story, plan
            )
            self.assertIn("target repository", " ".join(errors))


if __name__ == "__main__":
    unittest.main()
