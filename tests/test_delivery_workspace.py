from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path


SCRIPTS = Path(__file__).resolve().parents[1] / "lib" / "scripts"
PROJECTS_REGISTRY = SCRIPTS / "projects_registry.py"
sys.path.insert(0, str(SCRIPTS))

from delivery_workspace import (  # noqa: E402
    RepoTarget,
    discover_git_repos,
    ensure_feature_worktree,
    load_workspace_config,
    story_worktrees_dir,
    validate_story_gates,
)
from render_delivery_dashboard import render  # noqa: E402
from init_delivery_docs import init_docs  # noqa: E402
from sync_workspace_repositories import sync as sync_scan_repositories  # noqa: E402


def git(path: Path, *args: str) -> None:
    completed = subprocess.run(["git", "-C", str(path), *args], capture_output=True, text=True)
    if completed.returncode != 0:
        raise AssertionError(completed.stderr or completed.stdout)


class DeliveryWorkspaceTests(unittest.TestCase):
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

            repo = RepoTarget("service", source, workspace / ".lumen" / "worktrees" / "service")
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

            second_repo = RepoTarget("service", source, workspace / ".lumen" / "worktrees" / "service")
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
            (docs / ".lumen" / "config").mkdir(parents=True)
            subprocess.run(["git", "init", str(repo)], check=True, capture_output=True)
            (docs / ".lumen" / "config" / "workspace.json").write_text(
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
            history = workspace / ".lumen" / "history" / "delivery"
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
            common = workspace / ".lumen" / "config" / "common.json"
            common.parent.mkdir(parents=True)
            common.write_text('{"scan": "preserved"}\n', encoding="utf-8")

            with redirect_stdout(StringIO()):
                init_docs(workspace, "Demo", "DEMO-001", force=False, merge=True, no_example=True)

            self.assertEqual('{"scan": "preserved"}\n', common.read_text(encoding="utf-8"))
            self.assertTrue((workspace / "AGENTS.md").is_file())
            self.assertFalse((workspace / "stories" / "mini-web-welcome").exists())
            self.assertTrue((workspace / ".lumen" / "config" / "delivery.json").is_file())

    def test_repos_directory_is_shared_with_auto_scan(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            workspace = Path(temp) / "workspace"
            repo = workspace / "repos" / "service"
            (workspace / ".lumen" / "config").mkdir(parents=True)
            subprocess.run(["git", "init", "-b", "main", str(repo)], check=True, capture_output=True)

            repositories = sync_scan_repositories(workspace)
            saved = json.loads((workspace / ".lumen" / "config" / "repos.json").read_text(encoding="utf-8"))

            self.assertEqual("service", repositories[0]["name"])
            self.assertEqual(str(repo.resolve()), saved["repositories"][0]["path"])


if __name__ == "__main__":
    unittest.main()
