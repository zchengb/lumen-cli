from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import importlib.util
import unittest
import threading
import urllib.error
import urllib.request
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path


SCRIPTS = Path(__file__).resolve().parents[1] / "lib" / "scripts"
REPO_ROOT = Path(__file__).resolve().parents[1]
PROJECTS_REGISTRY = SCRIPTS / "projects_registry.py"
sys.path.insert(0, str(SCRIPTS))

from delivery_workspace import (  # noqa: E402
    RepoTarget,
    StoryContext,
    discover_git_repos,
    ensure_feature_worktree,
    load_workspace_config,
    story_worktrees_dir,
    validate_story_gates,
)
from render_delivery_dashboard import render  # noqa: E402
from init_delivery_docs import init_docs  # noqa: E402
from sync_workspace_repositories import sync as sync_scan_repositories  # noqa: E402
from delivery_scheduler import current_jira_status, story_candidates  # noqa: E402
from delivery_launchd import interval_minutes_from_cron  # noqa: E402
from scan_launchd import launchd_schedule_from_cron  # noqa: E402
from cleanup_delivery_worktrees import cleanup as cleanup_delivery_worktrees  # noqa: E402
from compose_delivery_prompt import compose_delivery_prompt, compose_snippets  # noqa: E402
from delivery_progress import print_progress_report  # noqa: E402
from compose_scan_prompt import compose_prompt  # noqa: E402
from dashboard_server import DashboardServer, delivery_payload  # noqa: E402
from capture_jira_context import image_urls, values_for_keys  # noqa: E402
from jira_delivery_sync import completion_comment  # noqa: E402


def load_delivery_notification_renderer():
    path = SCRIPTS / "render-delivery-and-notify.py"
    spec = importlib.util.spec_from_file_location("delivery_notification_renderer_test", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Unable to load delivery notification renderer")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def git(path: Path, *args: str) -> None:
    completed = subprocess.run(["git", "-C", str(path), *args], capture_output=True, text=True)
    if completed.returncode != 0:
        raise AssertionError(completed.stderr or completed.stdout)


class DeliveryWorkspaceTests(unittest.TestCase):
    def test_jira_completion_comment_includes_repo_named_prs_and_verification(self) -> None:
        comment = completion_comment(
            {
                "branch": "feature/NOVA-42-contract",
                "started_at": "2026-07-14T06:00:00Z",
                "finished_at": "2026-07-14T06:14:30Z",
                "repos_touched": [
                    {"name": "portal", "pr_url": "https://example.test/org/portal/pull/7"},
                    {"name": "service", "pr_url": "https://example.test/org/service/pull/9"},
                ],
                "verification_results": [{"status": "passed"}, {"status": "passed"}, {"status": "skipped"}],
            }
        )

        self.assertIn("Duration: 14m", comment)
        self.assertIn("Verification: 2 passed, 0 failed, 1 skipped", comment)
        self.assertIn("portal: https://example.test/org/portal/pull/7", comment)
        self.assertIn("service: https://example.test/org/service/pull/9", comment)

    def test_jira_context_extracts_nested_comments_and_image_urls(self) -> None:
        payload = {
            "fields": {
                "comments": [{"body": "A decision"}],
                "attachments": [{"content": "https://example.test/diagram.png"}],
            }
        }

        self.assertEqual([[{"body": "A decision"}]], values_for_keys(payload, {"comments", "comment"}))
        self.assertEqual(["https://example.test/diagram.png"], image_urls(payload))

    def test_dashboard_current_delivery_prefers_terminal_result(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            results = workspace / "results"
            results.mkdir()
            (results / "delivery-progress.json").write_text(
                json.dumps({"delivery_status": "in_progress", "current_phase": "notify", "story_id": "NOVA-42"}),
                encoding="utf-8",
            )
            (results / "delivery-result.json").write_text(
                json.dumps(
                    {
                        "delivery_status": "completed",
                        "story_id": "NOVA-42",
                        "finished_at": "2026-07-14T06:00:00Z",
                        "verification_results": [{"status": "passed"}],
                    }
                ),
                encoding="utf-8",
            )

            current = delivery_payload(workspace)["current"]

            self.assertEqual("completed", current["delivery_status"])
            self.assertEqual("completed", current["current_phase"])
            self.assertEqual("2026-07-14T06:00:00Z", current["finished_at"])
            self.assertEqual("passed", current["verification"][0]["status"])

    def test_dashboard_serves_report_artifacts_without_exposing_workspace(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            reports = workspace / "reports"
            reports.mkdir()
            (reports / "scan.html").write_text("<h1>Scan report</h1>", encoding="utf-8")
            (reports / "scan.pdf").write_bytes(b"%PDF-demo")
            (workspace / "config").mkdir()
            (workspace / "config" / "common.json").write_text("{}\n", encoding="utf-8")
            (workspace / "config" / "repos.json").write_text('{"repositories": []}\n', encoding="utf-8")
            server = DashboardServer(("127.0.0.1", 0), workspace, "demo", "lumen", str(REPO_ROOT))
            thread = threading.Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                base_url = f"http://127.0.0.1:{server.server_port}"
                with urllib.request.urlopen(f"{base_url}/reports/scan.html") as response:
                    self.assertEqual("text/html", response.headers.get_content_type())
                    self.assertIn("Scan report", response.read().decode("utf-8"))
                with urllib.request.urlopen(f"{base_url}/reports/scan.pdf") as response:
                    self.assertEqual("application/pdf", response.headers.get_content_type())
                    self.assertEqual(b"%PDF-demo", response.read())
                with self.assertRaises(urllib.error.HTTPError) as error:
                    urllib.request.urlopen(f"{base_url}/reports/../config/common.json")
                self.assertEqual(404, error.exception.code)
            finally:
                server.shutdown()
                server.server_close()
                thread.join(timeout=2)

    def test_dashboard_ignore_api_updates_only_local_issue_registry(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            (workspace / "config").mkdir()
            (workspace / "state").mkdir()
            (workspace / "config" / "common.json").write_text(
                json.dumps({"paths": {"issue_registry": "state/issue-registry.json"}}),
                encoding="utf-8",
            )
            (workspace / "config" / "repos.json").write_text('{"repositories": []}\n', encoding="utf-8")
            (workspace / "state" / "issue-registry.json").write_text(
                json.dumps({"issues": [{"id": "ISSUE-1", "status": "open", "title": "Demo"}]}),
                encoding="utf-8",
            )
            server = DashboardServer(("127.0.0.1", 0), workspace, "demo", "lumen", str(REPO_ROOT))
            thread = threading.Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                request = urllib.request.Request(
                    f"http://127.0.0.1:{server.server_port}/api/issue/ignore",
                    data=json.dumps({"issue_id": "ISSUE-1", "reason": "Not applicable"}).encode("utf-8"),
                    headers={"Content-Type": "application/json"},
                    method="POST",
                )
                with urllib.request.urlopen(request) as response:
                    payload = json.loads(response.read().decode("utf-8"))
            finally:
                server.shutdown()
                server.server_close()
                thread.join(timeout=2)

            self.assertEqual("ignored", payload["issue"]["status"])
            registry = json.loads((workspace / "state" / "issue-registry.json").read_text(encoding="utf-8"))
            self.assertEqual("ignored", registry["issues"][0]["status"])
            self.assertEqual("Not applicable", registry["issues"][0]["ignore_reason"])

    def test_delivery_report_prefers_terminal_result_over_stale_progress(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            results = workspace / "lumen" / "results"
            results.mkdir(parents=True)
            (results / "delivery-progress.json").write_text(
                json.dumps(
                    {
                        "run_id": "20260714-040321",
                        "delivery_status": "in_progress",
                        "current_phase": "verification",
                        "current_step": "old failed test",
                        "verification": [{"label": "Old Test", "status": "failed"}],
                    }
                ),
                encoding="utf-8",
            )
            (results / "delivery-result.json").write_text(
                json.dumps(
                    {
                        "delivery_status": "completed",
                        "finished_at": "2026-07-14T05:42:59Z",
                        "verification_results": [{"label": "Full Test Suite", "status": "passed"}],
                    }
                ),
                encoding="utf-8",
            )

            output = StringIO()
            with redirect_stdout(output):
                print_progress_report(workspace)

            report = output.getvalue()
            self.assertIn("Status:      completed", report)
            self.assertIn("✓ [] Full Test Suite", report)
            self.assertNotIn("Current:", report)
            self.assertNotIn("Old Test", report)

    def test_delivery_prompt_is_separate_from_scan_prompt_assets(self) -> None:
        delivery_prompt = compose_snippets()
        scan_manifest = json.loads(
            (REPO_ROOT / "lib" / "templates" / "prompts" / "scan" / "manifest.json").read_text(encoding="utf-8")
        )
        self.assertIn("# Delivery Agent Role", delivery_prompt)
        for scan_snippet in scan_manifest["snippets"]:
            self.assertNotIn(scan_snippet, delivery_prompt)

    def test_workspace_prompt_overrides_are_mode_isolated(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            scan_dir = workspace / "lumen" / "prompts" / "scan"
            delivery_dir = workspace / "lumen" / "prompts" / "delivery"
            scan_dir.mkdir(parents=True)
            delivery_dir.mkdir(parents=True)
            (workspace / "lumen" / "config").mkdir(exist_ok=True)
            (workspace / "lumen" / "config" / "common.json").write_text("{}\n", encoding="utf-8")
            (scan_dir / "manifest.json").write_text('{"snippets":["scan.md"]}\n', encoding="utf-8")
            (scan_dir / "scan.md").write_text("# Workspace Scan Prompt\n", encoding="utf-8")
            (delivery_dir / "manifest.json").write_text('{"snippets":["delivery.md"]}\n', encoding="utf-8")
            (delivery_dir / "delivery.md").write_text("# Workspace Delivery Prompt\n", encoding="utf-8")

            context = StoryContext(
                docs_dir=workspace,
                workspace_root=workspace,
                story_dir=workspace / "stories" / "demo",
                story_md=workspace / "stories" / "demo" / "story.md",
                technical_plan=workspace / "stories" / "demo" / "technical-plan.md",
                metadata_path=workspace / "stories" / "demo" / "metadata.json",
                metadata={},
                repos=[],
                branch_name="feature/DEMO-1",
                delivery_config={},
                workspace_config={},
            )

            self.assertIn("# Workspace Scan Prompt", compose_prompt(workspace / "lumen"))
            self.assertNotIn("Delivery Prompt", compose_prompt(workspace / "lumen"))
            self.assertEqual("# Workspace Delivery Prompt", compose_snippets(context))

    def test_workspace_coding_guideline_overrides_cli_default_for_delivery(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            story_dir = workspace / "stories" / "NOVA-101-demo"
            story_dir.mkdir(parents=True)
            (workspace / "lumen" / "prompts" / "delivery").mkdir(parents=True)
            (workspace / "lumen" / "prompts" / "delivery" / "coding-guideline.md").write_text(
                "# Workspace Coding Guideline\n\nUse the local rule.\n",
                encoding="utf-8",
            )
            story_md = story_dir / "story.md"
            plan = story_dir / "technical-plan.md"
            metadata = story_dir / "metadata.json"
            story_md.write_text("# Story\n", encoding="utf-8")
            plan.write_text("# Plan\n", encoding="utf-8")
            metadata.write_text("{}\n", encoding="utf-8")
            context = StoryContext(
                docs_dir=workspace,
                workspace_root=workspace,
                story_dir=story_dir,
                story_md=story_md,
                technical_plan=plan,
                metadata_path=metadata,
                metadata={},
                repos=[],
                branch_name="feature/NOVA-101-demo",
                delivery_config={},
                workspace_config={},
            )

            from compose_delivery_prompt import render_context_block

            self.assertIn("Use the local rule.", render_context_block(context))

    def test_remediation_prompt_contains_only_failed_verification_evidence(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            story_dir = workspace / "stories" / "MBPAS-100-demo"
            story_dir.mkdir(parents=True)
            story_md = story_dir / "story.md"
            plan = story_dir / "technical-plan.md"
            metadata = story_dir / "metadata.json"
            story_md.write_text("# Story\n\nContext\n", encoding="utf-8")
            plan.write_text("# Plan\n\nApproved work\n", encoding="utf-8")
            metadata.write_text("{}\n", encoding="utf-8")
            result = workspace / "lumen" / "results" / "delivery-result.json"
            result.parent.mkdir(parents=True)
            result.write_text(
                json.dumps(
                    {
                        "remediation": {"attempt": 1, "max_attempts": 2},
                        "verification_results": [
                            {"label": "Full test suite", "status": "failed", "summary": "Context failed"},
                            {"label": "PMD", "status": "passed", "summary": "Passed"},
                        ],
                    }
                ),
                encoding="utf-8",
            )
            context = StoryContext(
                docs_dir=workspace,
                workspace_root=workspace,
                story_dir=story_dir,
                story_md=story_md,
                technical_plan=plan,
                metadata_path=metadata,
                metadata={},
                repos=[],
                branch_name="feature/MBPAS-100-demo",
                delivery_config={},
                workspace_config={},
            )

            prompt = compose_delivery_prompt(context, remediation=True)
            self.assertIn("# Verification Remediation Context", prompt)
            self.assertIn("Full test suite", prompt)
            self.assertNotIn('"label": "PMD"', prompt)

    def test_remediation_attempt_archives_previous_failures(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            result = Path(temp) / "delivery-result.json"
            result.write_text(
                json.dumps(
                    {
                        "delivery_status": "ready_for_finalize",
                        "verification_results": [{"label": "Tests", "status": "failed"}],
                    }
                ),
                encoding="utf-8",
            )
            subprocess.run(
                [
                    sys.executable,
                    str(SCRIPTS / "prepare_delivery_remediation.py"),
                    "--result",
                    str(result),
                    "--attempt",
                    "1",
                    "--max-attempts",
                    "2",
                ],
                check=True,
                capture_output=True,
                text=True,
            )
            payload = json.loads(result.read_text(encoding="utf-8"))
            self.assertEqual("in_progress", payload["delivery_status"])
            self.assertEqual([], payload["verification_results"])
            self.assertEqual("in_progress", payload["remediation"]["status"])
            self.assertEqual("Tests", payload["remediation"]["attempts"][0]["failed_verification"][0]["label"])

            result.write_text(json.dumps({"delivery_status": "ready_for_finalize"}), encoding="utf-8")
            subprocess.run(
                [
                    sys.executable,
                    str(SCRIPTS / "prepare_delivery_remediation.py"),
                    "--result",
                    str(result),
                    "--restore",
                ],
                check=True,
                capture_output=True,
                text=True,
            )
            restored = json.loads(result.read_text(encoding="utf-8"))
            self.assertEqual(1, restored["remediation"]["attempt"])

    def test_remediation_prompt_reads_archived_failures_after_prepare(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            story_dir = workspace / "stories" / "MBPAS-100-demo"
            story_dir.mkdir(parents=True)
            story_md = story_dir / "story.md"
            plan = story_dir / "technical-plan.md"
            metadata = story_dir / "metadata.json"
            story_md.write_text("# Story\n\nContext\n", encoding="utf-8")
            plan.write_text("# Plan\n\nApproved work\n", encoding="utf-8")
            metadata.write_text("{}\n", encoding="utf-8")
            result = workspace / "lumen" / "results" / "delivery-result.json"
            result.parent.mkdir(parents=True)
            result.write_text(
                json.dumps(
                    {
                        "delivery_status": "ready_for_finalize",
                        "verification_results": [
                            {
                                "repository": "mbpass-data-proxy",
                                "label": "Language Grammar Check",
                                "status": "failed",
                                "summary": "compileJava FAILED",
                            },
                            {"repository": "mbpass-admin", "label": "PMD", "status": "passed"},
                        ],
                    }
                ),
                encoding="utf-8",
            )
            subprocess.run(
                [
                    sys.executable,
                    str(SCRIPTS / "prepare_delivery_remediation.py"),
                    "--result",
                    str(result),
                    "--attempt",
                    "1",
                    "--max-attempts",
                    "2",
                ],
                check=True,
                capture_output=True,
                text=True,
            )
            payload = json.loads(result.read_text(encoding="utf-8"))
            self.assertEqual([], payload["verification_results"])

            context = StoryContext(
                docs_dir=workspace,
                workspace_root=workspace,
                story_dir=story_dir,
                story_md=story_md,
                technical_plan=plan,
                metadata_path=metadata,
                metadata={},
                repos=[],
                branch_name="feature/MBPAS-100-demo",
                delivery_config={},
                workspace_config={},
            )
            prompt = compose_delivery_prompt(context, remediation=True)
            self.assertIn("Language Grammar Check", prompt)
            self.assertIn("mbpass-data-proxy", prompt)
            self.assertNotIn('"label": "PMD"', prompt)

    def test_delivery_docs_sync_commits_only_story_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            remote = root / "remote.git"
            docs = root / "docs"
            subprocess.run(["git", "init", "--bare", str(remote)], check=True, capture_output=True)
            subprocess.run(["git", "init", "-b", "main", str(docs)], check=True, capture_output=True)
            git(docs, "config", "user.email", "lumen@example.test")
            git(docs, "config", "user.name", "Lumen Test")
            (docs / ".gitignore").write_text("repos/\n", encoding="utf-8")
            story = docs / "stories" / "MBPAS-100-demo"
            story.mkdir(parents=True)
            (story / "story.md").write_text("# Story\n", encoding="utf-8")
            (story / "technical-plan.md").write_text("# Plan\n", encoding="utf-8")
            metadata = story / "metadata.json"
            metadata.write_text(
                json.dumps({"jiraKey": "MBPAS-100", "deliveryStatus": "not_started", "linkedRepos": ["service"]}),
                encoding="utf-8",
            )
            git(docs, "add", ".")
            git(docs, "commit", "-m", "Initialize story")
            git(docs, "remote", "add", "origin", str(remote))
            git(docs, "push", "-u", "origin", "main")

            service = docs / "repos" / "service"
            subprocess.run(["git", "init", "-b", "main", str(service)], check=True, capture_output=True)
            git(service, "config", "user.email", "lumen@example.test")
            git(service, "config", "user.name", "Lumen Test")
            (service / "README.md").write_text("service\n", encoding="utf-8")
            git(service, "add", "README.md")
            git(service, "commit", "-m", "Initialize service")
            metadata.write_text(
                json.dumps({"jiraKey": "MBPAS-100", "deliveryStatus": "dev_done", "linkedRepos": ["service"]}),
                encoding="utf-8",
            )
            unrelated = docs / "notes.md"
            unrelated.write_text("Leave me alone\n", encoding="utf-8")
            subprocess.run(
                [sys.executable, str(SCRIPTS / "sync_delivery_docs.py"), str(docs), "--story", "MBPAS-100-demo"],
                check=True,
                capture_output=True,
                text=True,
            )
            log = subprocess.run(
                ["git", "-C", str(docs), "log", "-1", "--format=%s"],
                check=True,
                capture_output=True,
                text=True,
            )
            self.assertEqual("Update MBPAS-100 delivery status", log.stdout.strip())
            status = subprocess.run(
                ["git", "-C", str(docs), "status", "--short"],
                check=True,
                capture_output=True,
                text=True,
            )
            self.assertEqual("?? notes.md", status.stdout.strip())

    def test_delivery_notification_uses_a_card_level_jira_link(self) -> None:
        renderer = load_delivery_notification_renderer()
        card = renderer.build_delivery_feishu_card(
            "delivery.started",
            {
                "jira_key": "MBPAS-1456",
                "delivery_status": "in_progress",
                "branch": "feature/MBPAS-1456-demo",
                "repos_touched": [{"name": "mbpass-admin"}],
            },
            {
                "title": "Tailor-made audience setting",
                "jiraUrl": "https://inspire.atlassian.net/browse/MBPAS-1456",
            },
            Path("/tmp"),
        )
        rendered = json.dumps(card, ensure_ascii=False)
        self.assertEqual("MBPAS-1456 · Tailor-made audience setting", card["card"]["header"]["subtitle"]["content"])
        self.assertEqual(
            {"url": "https://inspire.atlassian.net/browse/MBPAS-1456"},
            card["card"]["card_link"],
        )
        self.assertIn("**Status:**", rendered)
        self.assertIn("**Scope:**", rendered)
        self.assertIn("**Branch:**", rendered)
        self.assertNotIn("Open MBPAS-1456", rendered)

    def test_completed_delivery_notification_includes_duration(self) -> None:
        renderer = load_delivery_notification_renderer()
        card = renderer.build_delivery_feishu_card(
            "delivery.dev_done",
            {
                "delivery_status": "completed",
                "started_at": "2026-07-13T11:35:00Z",
                "finished_at": "2026-07-13T11:49:25Z",
                "repos_touched": [],
            },
            {"title": "Demo"},
            Path("/tmp"),
        )
        overview = card["card"]["body"]["elements"][0]["content"]
        self.assertIn("**Duration:**  14m 25s", overview)

    def test_installer_copies_delivery_coding_guideline(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            lumen_home = root / "lumen-home"
            bin_dir = root / "bin"
            completed = subprocess.run(
                ["bash", str(REPO_ROOT / "install.sh")],
                check=True,
                capture_output=True,
                text=True,
                env={**os.environ, "LUMEN_HOME": str(lumen_home), "LUMEN_BIN_DIR": str(bin_dir)},
            )
            self.assertEqual(0, completed.returncode)
            self.assertTrue((lumen_home / "lib" / "standards" / "coding-guideline.md").is_file())

    def test_scheduled_delivery_selects_only_ready_and_approved_unstarted_stories(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            stories = Path(temp) / "stories"
            ready = stories / "MBPAS-100-ready"
            changed = stories / "MBPAS-101-changed"
            active = stories / "MBPAS-102-active"
            for directory, metadata in (
                (ready, {"jiraKey": "MBPAS-100", "businessStatus": "ready", "technicalStatus": "approved", "deliveryStatus": "not_started"}),
                (changed, {"jiraKey": "MBPAS-101", "businessStatus": "changed", "technicalStatus": "approved", "deliveryStatus": "not_started"}),
                (active, {"jiraKey": "MBPAS-102", "businessStatus": "ready", "technicalStatus": "approved", "deliveryStatus": "in_progress"}),
            ):
                directory.mkdir(parents=True)
                (directory / "metadata.json").write_text(json.dumps(metadata), encoding="utf-8")

            selected = story_candidates(Path(temp))
            self.assertEqual([ready], [story for story, _ in selected])

    def test_scheduler_reads_twg_list_shaped_workitem_status(self) -> None:
        import delivery_scheduler

        original_ready = delivery_scheduler.twg_ready
        original_run = delivery_scheduler.run_twg
        try:
            delivery_scheduler.twg_ready = lambda: (True, "")
            delivery_scheduler.run_twg = lambda _args: (
                0,
                json.dumps({"data": [{"key": "MBPAS-100", "status": {"name": "Ready for Dev"}}]}),
            )
            self.assertEqual("Ready for Dev", current_jira_status("MBPAS-100"))
        finally:
            delivery_scheduler.twg_ready = original_ready
            delivery_scheduler.run_twg = original_run

    def test_launchd_interval_accepts_every_n_minutes_cron(self) -> None:
        self.assertEqual(5, interval_minutes_from_cron("*/5 * * * *"))
        self.assertIsNone(interval_minutes_from_cron("0 9 * * *"))

    def test_scan_launchd_translates_common_cron_expressions(self) -> None:
        self.assertEqual(
            ({"StartInterval": 300}, "every 5 minutes"),
            launchd_schedule_from_cron("*/5 * * * *"),
        )
        self.assertEqual(
            ({"StartCalendarInterval": {"Minute": 0, "Hour": 9}}, "daily at 09:00"),
            launchd_schedule_from_cron("0 9 * * *"),
        )

    def test_completed_delivery_worktrees_are_removed(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            repo = workspace / "repos" / "service"
            remote = workspace / "remote.git"
            subprocess.run(["git", "init", "--bare", str(remote)], check=True, capture_output=True)
            subprocess.run(["git", "init", "-b", "main", str(repo)], check=True, capture_output=True)
            git(repo, "config", "user.email", "lumen@example.test")
            git(repo, "config", "user.name", "Lumen Test")
            (repo / "README.md").write_text("base\n", encoding="utf-8")
            git(repo, "add", "README.md")
            git(repo, "commit", "-m", "initial commit")
            git(repo, "remote", "add", "origin", str(remote))
            git(repo, "push", "-u", "origin", "main")
            story_dir = workspace / "stories" / "MBPAS-999-cleanup"
            story_dir.mkdir(parents=True)
            (story_dir / "story.md").write_text("# Story\n\n" + "Business context. " * 10, encoding="utf-8")
            (story_dir / "technical-plan.md").write_text("# Plan\n\n" + "Implementation detail. " * 10, encoding="utf-8")
            (story_dir / "metadata.json").write_text(
                json.dumps(
                    {
                        "jiraKey": "MBPAS-999",
                        "businessStatus": "ready",
                        "technicalStatus": "approved",
                        "linkedRepos": ["service"],
                    }
                ),
                encoding="utf-8",
            )
            context = load_workspace_config(workspace)
            self.assertEqual(workspace.resolve(), context[0])
            target = RepoTarget("service", repo, workspace / "lumen" / "worktrees" / "MBPAS-999" / "service")
            ok, detail = ensure_feature_worktree(target, "feature/MBPAS-999-cleanup", workspace, {"jiraKey": "MBPAS-999"}, story_dir)
            self.assertTrue(ok, detail)
            self.assertTrue(target.worktree_path.exists())

            cleanup_delivery_worktrees(workspace, "MBPAS-999")
            self.assertFalse(target.worktree_path.exists())
            metadata = json.loads((story_dir / "metadata.json").read_text(encoding="utf-8"))
            self.assertIn("deliveryWorktreesCleanedAt", metadata)

    def test_project_registry_remove_clears_registration_and_default_only(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            workspace = root / "project" / ".lumen"
            (workspace / "config").mkdir(parents=True)
            (workspace / "config" / "common.json").write_text(
                json.dumps({"project": {"display_name": "Legacy MBPass"}}), encoding="utf-8"
            )
            lumen_home = root / "lumen-home"
            env = {**os.environ, "LUMEN_HOME": str(lumen_home)}

            added = subprocess.run(
                [sys.executable, str(PROJECTS_REGISTRY), "add", str(workspace)],
                check=True,
                capture_output=True,
                text=True,
                env=env,
            )
            project = json.loads(added.stdout)
            subprocess.run(
                [sys.executable, str(PROJECTS_REGISTRY), "set-default", project["slug"]],
                check=True,
                capture_output=True,
                text=True,
                env=env,
            )
            subprocess.run(
                [sys.executable, str(PROJECTS_REGISTRY), "remove", project["slug"]],
                check=True,
                capture_output=True,
                text=True,
                env=env,
            )

            registry = json.loads((lumen_home / "projects.json").read_text(encoding="utf-8"))
            self.assertEqual([], registry["projects"])
            config = json.loads((lumen_home / "config.json").read_text(encoding="utf-8"))
            self.assertNotIn("default_project_id", config)
            self.assertTrue(workspace.exists())

    def test_project_registry_can_reclaim_a_slug_after_old_project_removal(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            lumen_home = root / "lumen-home"
            env = {**os.environ, "LUMEN_HOME": str(lumen_home)}
            workspaces = [root / "old" / ".lumen", root / "current" / ".lumen"]
            for workspace in workspaces:
                (workspace / "config").mkdir(parents=True)
                (workspace / "config" / "common.json").write_text(
                    json.dumps({"project": {"display_name": "MBPass"}}), encoding="utf-8"
                )

            old = subprocess.run(
                [sys.executable, str(PROJECTS_REGISTRY), "add", str(workspaces[0])],
                check=True, capture_output=True, text=True, env=env,
            )
            current = subprocess.run(
                [sys.executable, str(PROJECTS_REGISTRY), "add", str(workspaces[1])],
                check=True, capture_output=True, text=True, env=env,
            )
            old_project = json.loads(old.stdout)
            current_project = json.loads(current.stdout)
            self.assertEqual("mbpass-2", current_project["slug"])
            subprocess.run(
                [sys.executable, str(PROJECTS_REGISTRY), "remove", old_project["slug"]],
                check=True, capture_output=True, text=True, env=env,
            )
            renamed = subprocess.run(
                [sys.executable, str(PROJECTS_REGISTRY), "set-slug", current_project["slug"], "--slug", "mbpass"],
                check=True, capture_output=True, text=True, env=env,
            )
            self.assertEqual("mbpass", json.loads(renamed.stdout)["slug"])

    def test_metadata_is_the_single_delivery_gate_source(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            story = root / "story.md"
            plan = root / "technical-plan.md"
            story.write_text("# Story\n\n" + "Business context. " * 10, encoding="utf-8")
            plan.write_text("# Technical Plan\n\n" + "Implementation detail. " * 10, encoding="utf-8")
            errors = validate_story_gates(
                {"businessStatus": "ready", "technicalStatus": "approved"}, story, plan
            )
            self.assertEqual([], errors)

    def test_story_worktrees_support_parallel_stories_without_touching_dirty_source(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            remote = root / "remote.git"
            source = root / "source"
            workspace = root / "workspace"
            subprocess.run(["git", "init", "--bare", str(remote)], check=True, capture_output=True)
            subprocess.run(["git", "init", "-b", "main", str(source)], check=True, capture_output=True)
            git(source, "config", "user.email", "lumen@example.test")
            git(source, "config", "user.name", "Lumen Test")
            (source / "README.md").write_text("base\n", encoding="utf-8")
            git(source, "add", "README.md")
            git(source, "commit", "-m", "initial commit")
            git(source, "remote", "add", "origin", str(remote))
            git(source, "push", "-u", "origin", "main")
            (source / "README.md").write_text("dirty local edit\n", encoding="utf-8")

            repo = RepoTarget("service", source, workspace / "lumen" / "worktrees" / "service")
            metadata = {"jiraKey": "DEMO-123"}
            story_dir = root / "stories" / "demo-story"
            story_dir.mkdir(parents=True)
            expected = story_worktrees_dir(workspace, metadata, story_dir) / "service"

            ok, detail = ensure_feature_worktree(
                repo,
                "feature/DEMO-123-demo",
                workspace,
                metadata,
                story_dir,
            )

            self.assertTrue(ok, detail)
            self.assertEqual(expected.resolve(), repo.worktree_path)
            self.assertEqual("dirty local edit\n", (source / "README.md").read_text(encoding="utf-8"))
            self.assertEqual("base\n", (repo.worktree_path / "README.md").read_text(encoding="utf-8"))
            self.assertTrue((repo.worktree_path / ".git").exists())

            second_repo = RepoTarget("service", source, workspace / "lumen" / "worktrees" / "service")
            second_metadata = {"jiraKey": "DEMO-124"}
            second_story = root / "stories" / "another-story"
            second_story.mkdir()
            ok, detail = ensure_feature_worktree(
                second_repo,
                "feature/DEMO-124-another",
                workspace,
                second_metadata,
                second_story,
            )

            self.assertTrue(ok, detail)
            self.assertNotEqual(repo.worktree_path, second_repo.worktree_path)
            self.assertTrue(second_repo.worktree_path.is_dir())
            self.assertEqual("dirty local edit\n", (source / "README.md").read_text(encoding="utf-8"))

    def test_docs_repo_is_the_default_workspace_and_discovers_repos_directory(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            docs = root / "docs"
            repo = docs / "repos" / "service"
            (docs / "stories").mkdir(parents=True)
            (docs / "lumen" / "config").mkdir(parents=True)
            subprocess.run(["git", "init", str(repo)], check=True, capture_output=True)
            (docs / "lumen" / "config" / "workspace.json").write_text(
                """{
  "schema_version": "1.0",
  "layout": "nested",
  "workspace_root": ".",
  "docs_repo": ".",
  "repos_dir": "repos",
  "repositories": []
}
""",
                encoding="utf-8",
            )

            workspace_root, config = load_workspace_config(docs)
            repos = discover_git_repos(workspace_root, config)

            self.assertEqual(docs.resolve(), workspace_root)
            self.assertEqual("nested", config["layout"])
            self.assertEqual(repo.resolve(), repos["service"])

    def test_delivery_dashboard_renders_archived_history(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp)
            history = workspace / "lumen" / "history" / "delivery"
            history.mkdir(parents=True)
            (history / "DEMO-1.json").write_text(
                """{
  "run_id": "DEMO-1",
  "delivery": {"delivery_status": "completed", "story_id": "DEMO-1", "pr_urls": []},
  "progress": {"delivery_status": "completed", "repositories": []},
  "log_file": ""
}
""",
                encoding="utf-8",
            )
            html, data = render(workspace)
            self.assertTrue(html.is_file())
            self.assertTrue(data.is_file())
            self.assertIn("DEMO-1", data.read_text(encoding="utf-8"))

    def test_init_merges_delivery_assets_into_an_existing_scan_workspace(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp) / "workspace"
            common = workspace / "lumen" / "config" / "common.json"
            common.parent.mkdir(parents=True)
            common.write_text('{"scan": "preserved"}\n', encoding="utf-8")

            with redirect_stdout(StringIO()):
                init_docs(workspace, "Demo", "DEMO-001", force=False, merge=True, no_example=True)

            self.assertEqual('{"scan": "preserved"}\n', common.read_text(encoding="utf-8"))
            self.assertTrue((workspace / "AGENTS.md").is_file())
            self.assertFalse((workspace / "stories" / "mini-web-welcome").exists())
            self.assertTrue((workspace / "lumen" / "config" / "delivery.json").is_file())

    def test_repos_directory_is_shared_with_auto_scan(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp) / "workspace"
            repo = workspace / "repos" / "service"
            (workspace / "lumen" / "config").mkdir(parents=True)
            subprocess.run(["git", "init", "-b", "main", str(repo)], check=True, capture_output=True)

            repositories = sync_scan_repositories(workspace)
            saved = json.loads((workspace / "lumen" / "config" / "repos.json").read_text(encoding="utf-8"))

            self.assertEqual("service", repositories[0]["name"])
            self.assertEqual(str(repo.resolve()), saved["repositories"][0]["path"])


if __name__ == "__main__":
    unittest.main()
