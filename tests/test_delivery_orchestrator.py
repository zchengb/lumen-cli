from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import textwrap
import unittest
from io import StringIO
from pathlib import Path
from unittest import mock

SCRIPTS = Path(__file__).resolve().parents[1] / "lib" / "scripts"
REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS))

from delivery_command import CommandResult, run_command, run_command_with_formatter  # noqa: E402
from delivery_env import DeliveryEnvLoadError, load_delivery_environment  # noqa: E402
from delivery_lock import DeliveryLockError, delivery_lock  # noqa: E402
from delivery_orchestrator import DeliveryFailure, DeliveryOrchestrator, orchestrate  # noqa: E402
from delivery_progress import load_progress  # noqa: E402
from delivery_runtime import build_run_context, runtime_values  # noqa: E402


class DeliveryEnvTests(unittest.TestCase):
    def test_missing_env_files_leave_base_env(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            env = load_delivery_environment(docs, "lumen", base_env={"PATH": "/bin"})
        self.assertEqual("/bin", env["PATH"])

    def test_shell_compatible_env_semantics(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            (docs / "lumen").mkdir()
            (docs / "lumen" / ".env.common").write_text(
                textwrap.dedent(
                    """
                    export CURSOR_API_KEY="abc"
                    BASE_URL="https://example.com"
                    JIRA_URL="${BASE_URL}/jira"
                    TOKEN='value with spaces'
                    """
                ).strip()
                + "\n",
                encoding="utf-8",
            )
            env = load_delivery_environment(docs, "lumen", base_env={})
        self.assertEqual("abc", env["CURSOR_API_KEY"])
        self.assertEqual("https://example.com", env["BASE_URL"])
        self.assertEqual("https://example.com/jira", env["JIRA_URL"])
        self.assertEqual("value with spaces", env["TOKEN"])

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

    def test_env_path_with_spaces(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            spaced = docs / "lumen" / "env files"
            spaced.mkdir(parents=True)
            (spaced / ".env.common").write_text('VALUE="spaced path"\n', encoding="utf-8")
            env = load_delivery_environment(docs, "lumen/env files", base_env={})
        self.assertEqual("spaced path", env["VALUE"])

    def test_sourcing_failure_raises_clear_error(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            (docs / "lumen").mkdir()
            (docs / "lumen" / ".env.common").write_text("exit 1\n", encoding="utf-8")
            with self.assertRaises(DeliveryEnvLoadError):
                load_delivery_environment(docs, "lumen", base_env={})

    def test_secrets_are_not_printed_during_env_load(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            (docs / "lumen").mkdir()
            (docs / "lumen" / ".env.local").write_text('SECRET_TOKEN="super-secret-value"\n', encoding="utf-8")
            stdout = StringIO()
            stderr = StringIO()
            with mock.patch("sys.stdout", stdout), mock.patch("sys.stderr", stderr):
                env = load_delivery_environment(docs, "lumen", base_env={})
        self.assertEqual("super-secret-value", env["SECRET_TOKEN"])
        self.assertNotIn("super-secret-value", stdout.getvalue())
        self.assertNotIn("super-secret-value", stderr.getvalue())


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

    def test_lock_metadata_write_failure_does_not_leave_lock_dir(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = Path(temp)
            lock_dir = docs / "lumen" / "locks" / "delivery-run"
            real_write_text = Path.write_text

            def guarded_write_text(self: Path, *args, **kwargs):  # type: ignore[no-untyped-def]
                if self.name == "lock.json":
                    raise OSError("disk full")
                return real_write_text(self, *args, **kwargs)

            with mock.patch.object(Path, "write_text", guarded_write_text):
                with self.assertRaises(OSError):
                    with delivery_lock(lock_dir, docs_dir=docs, story="DEMO-1"):
                        pass
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

    def test_formatter_exit_codes_follow_agent_exit_code(self) -> None:
        cases = [
            (0, 0, 0),
            (0, 1, 0),
            (7, 0, 7),
            (7, 1, 7),
        ]
        for agent_exit, formatter_exit, expected in cases:
            with self.subTest(agent_exit=agent_exit, formatter_exit=formatter_exit):
                agent = [
                    sys.executable,
                    "-c",
                    f"import sys; print('agent-output'); sys.exit({agent_exit})",
                ]
                formatter = [
                    sys.executable,
                    "-c",
                    f"import sys; [sys.stdout.write(line) for line in sys.stdin]; sys.exit({formatter_exit})",
                ]
                result = run_command_with_formatter(agent, formatter)
                self.assertEqual(expected, result.exit_code)
                self.assertEqual(formatter_exit, result.formatter_exit_code)
                if formatter_exit != 0 and agent_exit == 0:
                    self.assertTrue(result.formatter_warning)

    def test_formatter_early_exit_drains_agent_without_deadlock(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            log_file = Path(temp) / "run.log"
            agent = [
                sys.executable,
                "-c",
                "import sys\n"
                "for i in range(4000):\n"
                "    print(f'line-{i}')\n"
                "    sys.stdout.flush()\n",
            ]
            formatter = [sys.executable, "-c", "import sys; sys.exit(1)"]
            result = run_command_with_formatter(agent, formatter, log_file=log_file)
            self.assertEqual(0, result.exit_code)
            self.assertEqual(1, result.formatter_exit_code)
            log_text = log_file.read_text(encoding="utf-8")
            self.assertIn("line-0", log_text)
            self.assertIn("line-3999", log_text)


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
                mock.patch.object(
                    DeliveryOrchestrator,
                    "render_notification",
                    return_value=CommandResult(exit_code=0),
                ),
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
                mock.patch.object(
                    DeliveryOrchestrator,
                    "render_notification",
                    return_value=CommandResult(exit_code=0),
                ),
            ):
                exit_code = orchestrate(argv, scripts_dir=SCRIPTS)
            self.assertEqual(1, exit_code)
            failure_mock.assert_called_once()
            archive_mock.assert_called_once()

    def test_unexpected_exception_enters_failure_lifecycle(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            argv = [str(docs), "--story", "DEMO-story"]
            stderr = StringIO()
            with (
                mock.patch.object(DeliveryOrchestrator, "ensure_agent_ready"),
                mock.patch.object(DeliveryOrchestrator, "init_progress"),
                mock.patch.object(DeliveryOrchestrator, "sync_references"),
                mock.patch.object(DeliveryOrchestrator, "run_prepare"),
                mock.patch.object(DeliveryOrchestrator, "load_prompt", side_effect=RuntimeError("unexpected failure")),
                mock.patch.object(DeliveryOrchestrator, "write_failure") as failure_mock,
                mock.patch.object(DeliveryOrchestrator, "archive_result") as archive_mock,
                mock.patch.object(DeliveryOrchestrator, "sync_metadata"),
                mock.patch.object(
                    DeliveryOrchestrator,
                    "render_notification",
                    return_value=CommandResult(exit_code=0),
                ),
                mock.patch("sys.stderr", stderr),
            ):
                exit_code = orchestrate(argv, scripts_dir=SCRIPTS)
            self.assertEqual(1, exit_code)
            failure_mock.assert_called_once()
            archive_mock.assert_called_once()
            self.assertIn("Unexpected delivery failure", stderr.getvalue())
            self.assertNotIn("Traceback (most recent call last)", stderr.getvalue())

    def test_failure_cleanup_continues_after_progress_error(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            orchestrator = DeliveryOrchestrator(build_run_context([str(docs), "--story", "DEMO-story"], SCRIPTS))
            orchestrator.context.finalize_paths()
            with (
                mock.patch("delivery_orchestrator.set_phase", side_effect=OSError("progress broken")),
                mock.patch.object(DeliveryOrchestrator, "write_failure") as failure_mock,
                mock.patch.object(DeliveryOrchestrator, "archive_result") as archive_mock,
                mock.patch.object(DeliveryOrchestrator, "sync_metadata") as sync_mock,
                mock.patch.object(
                    DeliveryOrchestrator,
                    "render_notification",
                    return_value=CommandResult(exit_code=0),
                ),
            ):
                orchestrator.handle_failure("primary failure")
            failure_mock.assert_called_once()
            archive_mock.assert_called_once()
            sync_mock.assert_called_once()

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

    def test_notification_nonzero_exit_is_reported_but_delivery_succeeds(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            orchestrator = DeliveryOrchestrator(build_run_context([str(docs), "--story", "DEMO-story"], SCRIPTS))
            orchestrator.context.env = os.environ.copy()
            orchestrator.context.finalize_paths()
            orchestrator.context.result_file.write_text('{"delivery_status":"completed"}\n', encoding="utf-8")
            stderr = StringIO()
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
                mock.patch.object(
                    DeliveryOrchestrator,
                    "render_notification",
                    return_value=CommandResult(exit_code=5),
                ),
                mock.patch.object(DeliveryOrchestrator, "sync_metadata"),
                mock.patch.object(DeliveryOrchestrator, "archive_result"),
                mock.patch.object(DeliveryOrchestrator, "cleanup_worktrees"),
                mock.patch("sys.stderr", stderr),
            ):
                exit_code = orchestrator.run_real_delivery()
            self.assertEqual(0, exit_code)
            self.assertIn("exit code 5", stderr.getvalue())
            progress = load_progress(orchestrator.context.workspace_root)
            notify_phase = next(phase for phase in progress["phases"] if phase["id"] == "notify")
            self.assertEqual("Notification attempted with warnings", notify_phase["detail"])

    def test_lock_is_released_after_orchestrate_failure(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            docs = self._docs_workspace(Path(temp))
            lock_dir = docs / "lumen" / "locks" / "delivery-run"
            with mock.patch.object(DeliveryOrchestrator, "run", side_effect=DeliveryFailure("boom")):
                exit_code = orchestrate([str(docs), "--story", "DEMO-story"], scripts_dir=SCRIPTS)
            self.assertEqual(1, exit_code)
            self.assertFalse(lock_dir.exists())


class RunDeliveryShellWrapperTests(unittest.TestCase):
    def test_wrapper_forwards_arguments_and_exit_code(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            stub = Path(temp) / "stub_orchestrator.py"
            stub.write_text(
                textwrap.dedent(
                    """
                    import sys
                    print("ARGS:" + "|".join(sys.argv[1:]))
                    sys.exit(7)
                    """
                ).strip()
                + "\n",
                encoding="utf-8",
            )
            wrapper = SCRIPTS / "run-delivery.sh"
            completed = subprocess.run(
                [
                    "bash",
                    str(wrapper),
                    "/tmp/docs",
                    "--story",
                    "DEMO-story",
                    "--dry-run",
                ],
                cwd=REPO_ROOT,
                env={**os.environ, "LUMEN_DELIVERY_ORCHESTRATOR_PY": str(stub)},
                capture_output=True,
                text=True,
            )
            self.assertEqual(7, completed.returncode)
            self.assertIn("ARGS:/tmp/docs|--story|DEMO-story|--dry-run", completed.stdout)


if __name__ == "__main__":
    unittest.main()
