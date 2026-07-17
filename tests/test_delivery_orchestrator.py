from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

SCRIPTS = Path(__file__).resolve().parents[1] / "lib" / "scripts"
REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS))

from delivery_command import run_command  # noqa: E402
from delivery_env import load_delivery_environment, parse_env_file  # noqa: E402
from delivery_lock import DeliveryLockError, delivery_lock  # noqa: E402
from delivery_orchestrator import DeliveryFailure, DeliveryOrchestrator, orchestrate  # noqa: E402
from delivery_runtime import build_run_context, runtime_values  # noqa: E402


class DeliveryEnvTests(unittest.TestCase):
    def test_missing_env_files_leave_base_env(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            env = load_delivery_environment(docs, "lumen", base_env={"PATH": "/bin"})
        self.assertEqual("/bin", env["PATH"])

    def test_local_overrides_common(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            (docs / "lumen").mkdir()
            (docs / "lumen" / ".env.common").write_text('FOO="from-common"\n', encoding="utf-8")
            (docs / "lumen" / ".env.local").write_text("FOO=from-local\n", encoding="utf-8")
            env = load_delivery_environment(docs, "lumen", base_env={})
        self.assertEqual("from-local", env["FOO"])

    def test_docs_root_env_overrides_workspace_compat_files(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            (docs / "lumen").mkdir()
            (docs / "lumen" / ".env.common").write_text("TOKEN=workspace-common\n", encoding="utf-8")
            (docs / ".env.common").write_text("TOKEN=docs-common\n", encoding="utf-8")
            (docs / ".env.local").write_text("TOKEN=docs-local\n", encoding="utf-8")
            env = load_delivery_environment(docs, "lumen", base_env={})
        self.assertEqual("docs-local", env["TOKEN"])

    def test_parse_env_file_supports_quoted_values(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / ".env.local"
            path.write_text('SECRET="quoted-value"\n', encoding="utf-8")
            values = parse_env_file(path)
        self.assertEqual("quoted-value", values["SECRET"])


class DeliveryLockTests(unittest.TestCase):
    def test_acquire_and_release_lock(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            lock_dir = docs / "lumen" / "locks" / "delivery-run"
            with delivery_lock(lock_dir, docs_dir=docs, story="DEMO-1"):
                self.assertTrue(lock_dir.is_dir())
                self.assertTrue((lock_dir / "lock.json").is_file())
            self.assertFalse(lock_dir.exists())

    def test_second_lock_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            lock_dir = docs / "lumen" / "locks" / "delivery-run"
            with delivery_lock(lock_dir, docs_dir=docs, story="DEMO-1"):
                with self.assertRaises(DeliveryLockError):
                    with delivery_lock(lock_dir, docs_dir=docs, story="DEMO-2"):
                        pass

    def test_lock_released_after_exception(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            lock_dir = docs / "lumen" / "locks" / "delivery-run"
            with self.assertRaises(RuntimeError):
                with delivery_lock(lock_dir, docs_dir=docs, story="DEMO-1"):
                    raise RuntimeError("boom")
            self.assertFalse(lock_dir.exists())

    def test_stale_lock_metadata_is_reported(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            lock_dir = docs / "lumen" / "locks" / "delivery-run"
            lock_dir.mkdir(parents=True)
            (lock_dir / "lock.json").write_text(
                json.dumps({"pid": 999999, "started_at": "2026-01-01T00:00:00Z", "story": "DEMO-1"}),
                encoding="utf-8",
            )
            with self.assertRaises(DeliveryLockError) as ctx:
                with delivery_lock(lock_dir, docs_dir=docs, story="DEMO-1"):
                    pass
            self.assertIn("pid=999999", str(ctx.exception))


class DeliveryCommandTests(unittest.TestCase):
    def test_returns_child_exit_code(self) -> None:
        result = run_command([sys.executable, "-c", "import sys; sys.exit(7)"], stream=False)
        self.assertEqual(7, result.exit_code)

    def test_writes_output_to_log_file(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            log_file = Path(temp) / "run.log"
            result = run_command(
                [sys.executable, "-c", "print('hello-log')"],
                log_file=log_file,
                stream=False,
            )
            self.assertEqual(0, result.exit_code)
            self.assertIn("hello-log", log_file.read_text(encoding="utf-8"))

    def test_capture_mode_collects_stdout(self) -> None:
        result = run_command(
            [sys.executable, "-c", "print('captured')"],
            stream=False,
            capture=True,
        )
        self.assertEqual(0, result.exit_code)
        self.assertIn("captured", result.stdout)


class DeliveryRuntimeTests(unittest.TestCase):
    def _workspace(self, root: Path, dirname: str = "lumen") -> None:
        (root / "stories").mkdir()
        workspace = root / dirname
        (workspace / "config").mkdir(parents=True)
        (workspace / "config" / "workspace.json").write_text('{"workspace_root":"."}\n', encoding="utf-8")

    def test_story_flag_and_dry_run(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            self._workspace(docs)
            values = runtime_values([str(docs), "--story", "DEMO-1", "--dry-run"])
        self.assertEqual("DEMO-1", values["STORY_REF"])
        self.assertEqual("1", values["DRY_RUN"])

    def test_positional_story_argument(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            self._workspace(docs)
            values = runtime_values([str(docs), "DEMO-2"])
        self.assertEqual("DEMO-2", values["STORY_REF"])

    def test_legacy_lumen_workspace_resolution(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            self._workspace(docs, ".lumen")
            context = build_run_context([str(docs), "--story", "DEMO-legacy"], SCRIPTS)
        self.assertEqual(".lumen", context.workspace_dir_name)

    def test_build_run_context_paths(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            self._workspace(docs)
            context = build_run_context([str(docs), "--story", "DEMO-3"], SCRIPTS)
        self.assertTrue(str(context.log_file).endswith(".log"))
        self.assertEqual(context.result_file.name, "delivery-result.json")


class DeliveryOrchestratorWorkflowTests(unittest.TestCase):
    def _docs_workspace(self, root: Path) -> Path:
        (root / "stories" / "DEMO-story").mkdir(parents=True)
        (root / "stories" / "DEMO-story" / "metadata.json").write_text(
            json.dumps(
                {
                    "storyId": "DEMO-1",
                    "businessStatus": "ready",
                    "technicalStatus": "approved",
                    "deliveryStatus": "not_started",
                    "linkedRepos": ["service"],
                    "jiraKey": "DEMO-1",
                }
            ),
            encoding="utf-8",
        )
        (root / "stories" / "DEMO-story" / "story.md").write_text("x" * 100, encoding="utf-8")
        (root / "stories" / "DEMO-story" / "technical-plan.md").write_text("y" * 100, encoding="utf-8")
        repo = root / "repos" / "service"
        repo.mkdir(parents=True)
        subprocess.run(["git", "init", "-b", "main", str(repo)], check=True, capture_output=True)
        (repo / "README.md").write_text("demo\n", encoding="utf-8")
        subprocess.run(["git", "-C", str(repo), "add", "README.md"], check=True, capture_output=True)
        subprocess.run(
            ["git", "-C", str(repo), "-c", "user.email=lumen@test", "-c", "user.name=Lumen", "commit", "-m", "init"],
            check=True,
            capture_output=True,
        )
        workspace = root / "lumen"
        for sub in ("config", "results", "logs/delivery", "locks", "worktrees"):
            (workspace / sub).mkdir(parents=True, exist_ok=True)
        (workspace / "config" / "workspace.json").write_text(
            json.dumps({"workspace_root": ".", "repos_dir": "repos"}),
            encoding="utf-8",
        )
        (workspace / "config" / "delivery.json").write_text(
            json.dumps({"execution": {"model": "composer-2.5"}}),
            encoding="utf-8",
        )
        return root

    def test_successful_dry_run_with_mocks(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            argv = [str(docs), "--story", "DEMO-story", "--dry-run"]

            def fake_dry_run_python(self: DeliveryOrchestrator, script: str, *args: str, check: bool = True) -> mock.Mock:
                if script == "dry_run_delivery.py":
                    assert self.context.result_file is not None
                    self.context.result_file.write_text('{"delivery_status":"completed","dry_run":true}\n', encoding="utf-8")
                return mock.Mock(exit_code=0)

            with (
                mock.patch.object(DeliveryOrchestrator, "sync_references"),
                mock.patch.object(DeliveryOrchestrator, "run_prepare"),
                mock.patch.object(DeliveryOrchestrator, "archive_result") as archive_mock,
                mock.patch.object(DeliveryOrchestrator, "run_python", fake_dry_run_python),
                mock.patch.object(DeliveryOrchestrator, "render_notification"),
            ):
                exit_code = orchestrate(argv, scripts_dir=SCRIPTS)
            self.assertEqual(0, exit_code)
            archive_mock.assert_called_once()

    def test_agent_failure_archives_and_returns_nonzero(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            argv = [str(docs), "--story", "DEMO-story"]

            def fake_run(self: DeliveryOrchestrator) -> int:
                raise DeliveryFailure("agent failed")

            with (
                mock.patch.object(DeliveryOrchestrator, "ensure_agent_ready"),
                mock.patch.object(DeliveryOrchestrator, "init_progress"),
                mock.patch.object(DeliveryOrchestrator, "sync_references"),
                mock.patch.object(DeliveryOrchestrator, "run_prepare"),
                mock.patch.object(DeliveryOrchestrator, "run", fake_run),
                mock.patch.object(DeliveryOrchestrator, "write_failure") as failure_mock,
                mock.patch.object(DeliveryOrchestrator, "archive_result") as archive_mock,
                mock.patch.object(DeliveryOrchestrator, "sync_metadata"),
                mock.patch.object(DeliveryOrchestrator, "render_notification"),
            ):
                exit_code = orchestrate(argv, scripts_dir=SCRIPTS)
            self.assertEqual(1, exit_code)
            failure_mock.assert_called_once()
            archive_mock.assert_called_once()

    def test_verification_failure_then_successful_remediation(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            orchestrator = DeliveryOrchestrator(build_run_context([str(docs), "--story", "DEMO-story"], SCRIPTS))
            orchestrator.context.env = os.environ.copy()
            orchestrator.context.finalize_paths()
            verification_calls = iter([False, True])

            with (
                mock.patch.object(DeliveryOrchestrator, "remediation_max_attempts", return_value=2),
                mock.patch.object(DeliveryOrchestrator, "run_verification", side_effect=lambda: next(verification_calls)),
                mock.patch.object(DeliveryOrchestrator, "remediation_prepare"),
                mock.patch.object(DeliveryOrchestrator, "run_agent"),
                mock.patch.object(DeliveryOrchestrator, "remediation_restore"),
                mock.patch.object(DeliveryOrchestrator, "remediation_complete") as complete_mock,
                mock.patch.object(DeliveryOrchestrator, "load_prompt", return_value="prompt"),
            ):
                orchestrator.context.result_file.write_text("{}", encoding="utf-8")
                orchestrator.verify_with_bounded_remediation()
            complete_mock.assert_called_once()

    def test_verification_failure_after_max_remediation(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            orchestrator = DeliveryOrchestrator(build_run_context([str(docs), "--story", "DEMO-story"], SCRIPTS))
            orchestrator.context.env = os.environ.copy()
            with (
                mock.patch.object(DeliveryOrchestrator, "remediation_max_attempts", return_value=1),
                mock.patch.object(DeliveryOrchestrator, "run_verification", return_value=False),
                mock.patch.object(DeliveryOrchestrator, "remediation_prepare"),
                mock.patch.object(DeliveryOrchestrator, "load_prompt", return_value="prompt"),
                mock.patch.object(DeliveryOrchestrator, "run_agent", side_effect=DeliveryFailure("agent broke")),
            ):
                with self.assertRaises(DeliveryFailure):
                    orchestrator.verify_with_bounded_remediation()

    def test_successful_real_orchestration_with_mocks(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            argv = [str(docs), "--story", "DEMO-story"]
            orchestrator = DeliveryOrchestrator(build_run_context(argv, SCRIPTS))
            orchestrator.context.env = os.environ.copy()
            orchestrator.context.finalize_paths()
            orchestrator.context.result_file.write_text('{"delivery_status":"ready_for_finalize"}\n', encoding="utf-8")

            with (
                mock.patch.object(DeliveryOrchestrator, "ensure_agent_ready"),
                mock.patch.object(DeliveryOrchestrator, "init_progress"),
                mock.patch.object(DeliveryOrchestrator, "sync_references"),
                mock.patch.object(DeliveryOrchestrator, "run_prepare"),
                mock.patch.object(DeliveryOrchestrator, "capture_jira_context"),
                mock.patch.object(DeliveryOrchestrator, "send_started_notification"),
                mock.patch.object(DeliveryOrchestrator, "load_prompt", return_value="prompt"),
                mock.patch.object(DeliveryOrchestrator, "print_runtime_notices"),
                mock.patch.object(DeliveryOrchestrator, "run_agent"),
                mock.patch.object(DeliveryOrchestrator, "verify_with_bounded_remediation"),
                mock.patch.object(DeliveryOrchestrator, "finalize_delivery"),
                mock.patch.object(DeliveryOrchestrator, "render_notification") as notify_mock,
                mock.patch.object(DeliveryOrchestrator, "sync_metadata"),
                mock.patch.object(DeliveryOrchestrator, "archive_result"),
                mock.patch.object(DeliveryOrchestrator, "cleanup_worktrees"),
            ):
                exit_code = orchestrator.run_real_delivery()
            self.assertEqual(0, exit_code)
            notify_mock.assert_called_once()

    def test_finalize_failure_returns_nonzero(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            orchestrator = DeliveryOrchestrator(build_run_context([str(docs), "--story", "DEMO-story"], SCRIPTS))
            orchestrator.context.env = os.environ.copy()
            orchestrator.context.finalize_paths()
            with mock.patch.object(
                DeliveryOrchestrator,
                "run_python",
                return_value=mock.Mock(exit_code=3),
            ):
                with self.assertRaises(DeliveryFailure):
                    orchestrator.finalize_delivery()

    def test_notification_failure_does_not_replace_successful_delivery(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            orchestrator = DeliveryOrchestrator(build_run_context([str(docs), "--story", "DEMO-story"], SCRIPTS))
            orchestrator.context.env = os.environ.copy()
            orchestrator.context.finalize_paths()
            orchestrator.context.result_file.write_text('{"delivery_status":"completed"}\n', encoding="utf-8")
            with (
                mock.patch.object(DeliveryOrchestrator, "ensure_agent_ready"),
                mock.patch.object(DeliveryOrchestrator, "init_progress"),
                mock.patch.object(DeliveryOrchestrator, "sync_references"),
                mock.patch.object(DeliveryOrchestrator, "run_prepare"),
                mock.patch.object(DeliveryOrchestrator, "capture_jira_context"),
                mock.patch.object(DeliveryOrchestrator, "send_started_notification"),
                mock.patch.object(DeliveryOrchestrator, "load_prompt", return_value="prompt"),
                mock.patch.object(DeliveryOrchestrator, "print_runtime_notices"),
                mock.patch.object(DeliveryOrchestrator, "run_agent"),
                mock.patch.object(DeliveryOrchestrator, "verify_with_bounded_remediation"),
                mock.patch.object(DeliveryOrchestrator, "finalize_delivery"),
                mock.patch.object(DeliveryOrchestrator, "render_notification", side_effect=RuntimeError("notify down")),
                mock.patch.object(DeliveryOrchestrator, "sync_metadata"),
                mock.patch.object(DeliveryOrchestrator, "archive_result"),
                mock.patch.object(DeliveryOrchestrator, "cleanup_worktrees"),
            ):
                exit_code = orchestrator.run_real_delivery()
            self.assertEqual(0, exit_code)

        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            lock_dir = docs / "lumen" / "locks" / "delivery-run"
            with mock.patch.object(DeliveryOrchestrator, "run", side_effect=DeliveryFailure("boom")):
                exit_code = orchestrate([str(docs), "--story", "DEMO-story"], scripts_dir=SCRIPTS)
            self.assertEqual(1, exit_code)
            self.assertFalse(lock_dir.exists())


class RunDeliveryShellWrapperTests(unittest.TestCase):
    def test_wrapper_forwards_arguments_and_exit_code(self) -> None:
        wrapper = SCRIPTS / "run-delivery.sh"
        completed = subprocess.run(
            ["bash", str(wrapper), "--help"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
        )
        self.assertIn(completed.returncode, {0, 2})


if __name__ == "__main__":
    unittest.main()
