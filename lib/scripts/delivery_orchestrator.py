#!/usr/bin/env python3
"""Orchestrate the Lumen delivery workflow from Python."""

from __future__ import annotations

import json
import os
import shutil
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path
from typing import Any

from capture_jira_context import capture as capture_jira_snapshot
from cleanup_delivery_worktrees import cleanup as cleanup_worktrees
from compose_delivery_prompt import compose_delivery_prompt
from delivery_command import CommandResult, run_command, run_command_with_formatter
from delivery_env import load_delivery_environment
from delivery_lock import DeliveryLockError, delivery_lock
from delivery_progress import (
    append_message,
    enrich_progress,
    finish_progress,
    init_progress,
    print_progress_report,
    set_phase,
)
from delivery_runtime import DeliveryRunContext, build_run_context
from delivery_workspace import (
    delivery_results_dir,
    ensure_workspace_lumen_dirs,
    load_story_context,
    prepare_story_for_delivery,
    read_json,
    write_json,
)


class DeliveryPhase(str, Enum):
    PREFLIGHT = "preflight"
    WORKTREES = "worktrees"
    JIRA_START = "jira_start"
    AGENT = "agent"
    VERIFICATION = "verification"
    FINALIZE = "finalize"
    JIRA_DONE = "jira_done"
    NOTIFY = "notify"


class DeliveryFailure(RuntimeError):
    pass


@dataclass
class AgentConfig:
    model: str
    sandbox: str
    output_format: str
    stream_partial: bool


class DeliveryOrchestrator:
    def __init__(self, context: DeliveryRunContext) -> None:
        self.context = context
        self._phase = DeliveryPhase.NOTIFY

    @property
    def current_phase_id(self) -> str:
        return self._phase.value

    def set_current_phase(self, phase: DeliveryPhase) -> None:
        self._phase = phase
        self.context.current_phase = phase.value

    def progress_phase(self, phase: DeliveryPhase, status: str, detail: str = "", step: str = "") -> None:
        self.set_current_phase(phase)
        set_phase(self.context.workspace_root, phase.value, status, detail=detail, current_step=step)

    def progress_message(self, message: str) -> None:
        append_message(self.context.workspace_root, message)

    def log(self, message: str) -> None:
        line = message if message.endswith("\n") else f"{message}\n"
        if self.context.log_file is not None:
            with self.context.log_file.open("a", encoding="utf-8") as handle:
                handle.write(line)
        sys.stdout.write(line)
        sys.stdout.flush()

    def run_python(self, script: str, *args: str, check: bool = True) -> CommandResult:
        assert self.context.env is not None
        result = run_command(
            [sys.executable, str(self.context.scripts_dir / script), *args],
            cwd=self.context.docs_dir,
            env=self.context.env,
            log_file=self.context.log_file,
            stream=True,
            capture=False,
        )
        if check and result.exit_code != 0:
            raise DeliveryFailure(f"{script} failed with exit code {result.exit_code}")
        return result

    def model_from_config(self) -> str:
        if not self.context.delivery_config_path.is_file():
            return ""
        try:
            config = json.loads(self.context.delivery_config_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            return ""
        execution = config.get("execution", {})
        if isinstance(execution, dict):
            return str(execution.get("model", "") or "").strip()
        return ""

    def agent_config(self) -> AgentConfig:
        assert self.context.env is not None
        model = self.context.env.get("CURSOR_AGENT_MODEL", "") or self.model_from_config() or "composer-2.5"
        sandbox = self.context.env.get("CURSOR_AGENT_SANDBOX", "disabled")
        output_format = self.context.env.get("CURSOR_AGENT_OUTPUT_FORMAT", "stream-json")
        stream_partial = self.context.env.get("CURSOR_AGENT_STREAM_PARTIAL", "1") not in {"0", "false", "no"}
        return AgentConfig(model=model, sandbox=sandbox, output_format=output_format, stream_partial=stream_partial)

    def remediation_max_attempts(self) -> int:
        if not self.context.delivery_config_path.is_file():
            return 2
        try:
            config = json.loads(self.context.delivery_config_path.read_text(encoding="utf-8"))
            remediation = config.get("verification", {}).get("remediation", {})
            if not isinstance(remediation, dict) or not remediation.get("enabled", True):
                return 0
            return max(0, int(remediation.get("max_attempts", 2)))
        except (OSError, json.JSONDecodeError, TypeError, ValueError):
            return 2

    def ensure_runtime_dirs(self) -> None:
        ensure_workspace_lumen_dirs(self.context.workspace_root)
        for path in (
            self.context.workspace_dir / "logs" / "delivery",
            delivery_results_dir(self.context.workspace_root),
            self.context.workspace_dir / "config",
            self.context.workspace_dir / "worktrees",
            self.context.workspace_dir / "locks",
        ):
            path.mkdir(parents=True, exist_ok=True)

    def init_progress(self) -> None:
        assert self.context.log_file is not None
        init_progress(
            self.context.workspace_root,
            self.context.docs_dir,
            self.context.story_ref,
            self.context.run_id,
            log_file=str(self.context.log_file),
        )
        print_progress_report(self.context.workspace_root)

    def sync_references(self) -> None:
        result = run_command(
            [sys.executable, str(self.context.scripts_dir / "sync_delivery_workspace.py"), str(self.context.docs_dir), "--story", self.context.story_ref],
            cwd=self.context.docs_dir,
            env=self.context.env,
            log_file=self.context.log_file,
            stream=True,
            capture=False,
        )
        if result.exit_code != 0:
            raise DeliveryFailure(f"Delivery reference sync failed. See log: {self.context.log_file}")

    def prepare_worktrees(self) -> dict[str, Any]:
        context = load_story_context(self.context.docs_dir, self.context.story_ref)
        if self.context.dry_run:
            messages: list[str] = []
        else:
            messages = prepare_story_for_delivery(context)
        payload = {
            "docs_dir": str(context.docs_dir),
            "workspace_root": str(context.workspace_root),
            "story_dir": str(context.story_dir),
            "story_ref": context.story_dir.name,
            "branch_name": context.branch_name,
            "jira_key": context.metadata.get("jiraKey", ""),
            "repos": [
                {
                    "name": repo.name,
                    "path": str(repo.path),
                    "worktree_path": str(repo.worktree_path),
                    "default_branch": repo.default_branch,
                }
                for repo in context.repos
            ],
            "messages": messages,
        }
        for message in messages:
            self.log(message)
        self.log(json.dumps(payload, indent=2, ensure_ascii=False))
        enrich_progress(self.context.workspace_root, payload)
        return payload

    def run_prepare(self) -> None:
        try:
            self.prepare_worktrees()
        except Exception as exc:
            self.progress_phase(DeliveryPhase.PREFLIGHT, "failed", "Story gates or worktree preparation failed")
            raise DeliveryFailure(str(exc)) from exc

    def capture_jira_context(self) -> None:
        try:
            path, _payload = capture_jira_snapshot(self.context.docs_dir, self.context.story_ref)
            self.log(f"Captured JIRA context: {path}")
        except Exception as exc:
            self.log(
                "Warning: JIRA context snapshot was not captured. "
                "The Story and approved plan remain authoritative."
            )
            sys.stderr.write(f"Warning: {exc}\n")

    def write_started_payload(self) -> None:
        assert self.context.started_file is not None
        context = load_story_context(self.context.docs_dir, self.context.story_ref, validate_gates=False)
        payload = {
            "delivery_status": "in_progress",
            "docs_dir": str(context.docs_dir),
            "workspace_root": str(context.workspace_root),
            "story_id": context.metadata.get("storyId") or context.story_dir.name,
            "story_path": str(context.story_dir.relative_to(context.docs_dir)),
            "jira_key": context.metadata.get("jiraKey", ""),
            "branch": context.branch_name,
            "repos_touched": [{"name": repo.name} for repo in context.repos],
            "pr_urls": [],
            "verification_results": [],
        }
        write_json(self.context.started_file, payload)

    def send_started_notification(self) -> None:
        starter = self.context.scripts_dir / "write_delivery_started.py"
        renderer = self.context.scripts_dir / "render-delivery-and-notify.py"
        if not starter.is_file() or not renderer.is_file() or self.context.started_file is None:
            return
        try:
            self.write_started_payload()
            self.run_python("render-delivery-and-notify.py", str(self.context.started_file), "--event", "delivery.started", check=False)
        except Exception:
            return

    def load_prompt(self, remediation: bool = False) -> str:
        context = load_story_context(self.context.docs_dir, self.context.story_ref)
        return compose_delivery_prompt(context, remediation=remediation)

    def run_agent(self, prompt: str, stage_label: str) -> None:
        assert self.context.env is not None
        agent_bin = shutil.which("agent")
        if not agent_bin:
            raise DeliveryFailure("Cursor CLI 'agent' was not found in PATH.")

        config = self.agent_config()
        self.log(f"Starting {stage_label} at {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')} UTC...")
        agent_args = [
            agent_bin,
            "--workspace",
            str(self.context.workspace_root),
            "--sandbox",
            config.sandbox,
            "--trust",
            "-p",
            "-f",
            "--output-format",
            config.output_format,
            "--model",
            config.model,
        ]
        if config.output_format == "stream-json" and config.stream_partial:
            agent_args.append("--stream-partial-output")
        agent_args.append(prompt)

        formatter = self.context.scripts_dir / "format_scan_log.py"
        if config.output_format == "stream-json" and formatter.is_file():
            result = run_command_with_formatter(
                agent_args,
                [sys.executable, str(formatter)],
                cwd=self.context.docs_dir,
                env=self.context.env,
                log_file=self.context.log_file,
            )
        else:
            result = run_command(
                agent_args,
                cwd=self.context.docs_dir,
                env=self.context.env,
                log_file=self.context.log_file,
            )
        if result.exit_code != 0:
            raise DeliveryFailure(
                f"{stage_label} exited with status {result.exit_code}. See log: {self.context.log_file}"
            )

    def ensure_agent_ready(self) -> None:
        assert self.context.env is not None
        if shutil.which("agent") is None:
            raise DeliveryFailure("Cursor CLI 'agent' was not found in PATH.")
        if self.context.env.get("CURSOR_API_KEY"):
            return
        auth = run_command(["agent", "status"], env=self.context.env, stream=False, capture=True)
        if auth.exit_code != 0:
            raise DeliveryFailure(
                f"Cursor agent is not authenticated. Add CURSOR_API_KEY to {self.context.docs_dir}/.env.local."
            )

    def run_verification(self) -> bool:
        assert self.context.result_file is not None
        result = self.run_python(
            "run_delivery_verification.py",
            str(self.context.docs_dir),
            "--story",
            self.context.story_ref,
            "--result",
            str(self.context.result_file),
            "--workspace-root",
            str(self.context.workspace_root),
            check=False,
        )
        return result.exit_code == 0

    def remediation_prepare(self, attempt: int, max_attempts: int) -> None:
        assert self.context.result_file is not None
        result = self.run_python(
            "prepare_delivery_remediation.py",
            "--result",
            str(self.context.result_file),
            "--attempt",
            str(attempt),
            "--max-attempts",
            str(max_attempts),
            check=False,
        )
        if result.exit_code != 0:
            raise DeliveryFailure("Failed to prepare remediation attempt")

    def remediation_restore(self) -> None:
        assert self.context.result_file is not None
        result = self.run_python(
            "prepare_delivery_remediation.py",
            "--result",
            str(self.context.result_file),
            "--restore",
            check=False,
        )
        if result.exit_code != 0:
            raise DeliveryFailure("Failed to restore remediation evidence")

    def remediation_complete(self) -> None:
        assert self.context.result_file is not None
        self.run_python(
            "prepare_delivery_remediation.py",
            "--result",
            str(self.context.result_file),
            "--complete",
            check=False,
        )

    def verify_with_bounded_remediation(self) -> None:
        self.progress_phase(DeliveryPhase.VERIFICATION, "in_progress", "Compile, PMD, unit and integration tests")
        self.log("\n[delivery] Phase 5/8 — Verification")
        if self.run_verification():
            self.progress_phase(DeliveryPhase.VERIFICATION, "completed", "All verification checks passed")
            return

        max_attempts = self.remediation_max_attempts()
        if max_attempts <= 0 or not self.run_remediation_loop(max_attempts):
            self.progress_phase(
                DeliveryPhase.VERIFICATION,
                "failed",
                "Verification failed after bounded remediation attempts",
            )
            raise DeliveryFailure(
                f"Delivery verification failed after bounded remediation. See log: {self.context.log_file}"
            )
        self.progress_phase(DeliveryPhase.VERIFICATION, "completed", "All verification checks passed")

    def run_remediation_loop(self, max_attempts: int) -> bool:
        for attempt in range(1, max_attempts + 1):
            self.progress_message(
                f"Verification failed; starting bounded remediation attempt {attempt}/{max_attempts}"
            )
            self.progress_phase(
                DeliveryPhase.AGENT,
                "in_progress",
                f"Remediation attempt {attempt}/{max_attempts}: diagnose and minimally fix verification failures",
            )
            self.remediation_prepare(attempt, max_attempts)
            prompt = self.load_prompt(remediation=True)
            try:
                self.run_agent(prompt, f"Lumen delivery remediation {attempt}/{max_attempts}")
            except DeliveryFailure:
                self.progress_phase(
                    DeliveryPhase.AGENT,
                    "failed",
                    f"Remediation agent exited during attempt {attempt}/{max_attempts}",
                )
                return False
            assert self.context.result_file is not None
            if not self.context.result_file.is_file():
                return False
            self.remediation_restore()
            self.progress_phase(
                DeliveryPhase.AGENT,
                "completed",
                f"Remediation attempt {attempt}/{max_attempts} finished; result updated",
            )
            self.progress_phase(
                DeliveryPhase.VERIFICATION,
                "in_progress",
                f"Verification after remediation attempt {attempt}/{max_attempts}",
            )
            self.log(f"\n[delivery] Verification after remediation {attempt}/{max_attempts}")
            if self.run_verification():
                self.remediation_complete()
                self.progress_message(f"Verification passed after remediation attempt {attempt}/{max_attempts}")
                return True
        return False

    def finalize_delivery(self) -> None:
        assert self.context.result_file is not None
        self.progress_phase(
            DeliveryPhase.FINALIZE,
            "in_progress",
            "Commit verified changes, push feature branches, and create PRs",
        )
        self.log("\n[delivery] Phase 6/8 — Commit, push, and PR")
        finalize_py = self.context.scripts_dir / "finalize_delivery.py"
        if not finalize_py.is_file():
            self.progress_phase(DeliveryPhase.FINALIZE, "failed", "Finalization runner not installed")
            raise DeliveryFailure(f"Delivery finalization runner not found: {finalize_py}")
        result = self.run_python(
            "finalize_delivery.py",
            str(self.context.docs_dir),
            "--story",
            self.context.story_ref,
            "--result",
            str(self.context.result_file),
            check=False,
        )
        if result.exit_code != 0:
            self.progress_phase(DeliveryPhase.FINALIZE, "failed", "Commit, push, or PR creation failed")
            raise DeliveryFailure(f"Delivery finalization failed. See log: {self.context.log_file}")
        self.progress_phase(DeliveryPhase.FINALIZE, "completed", "Feature branches pushed and PRs opened")

    def render_notification(self, result_path: Path, event: str, *, dry_run: bool = False) -> None:
        assert self.context.env is not None
        env = dict(self.context.env)
        if dry_run:
            env["LUMEN_DRY_RUN"] = "1"
        run_command(
            [
                sys.executable,
                str(self.context.scripts_dir / "render-delivery-and-notify.py"),
                str(result_path),
                "--event",
                event,
            ],
            cwd=self.context.docs_dir,
            env=env,
            log_file=self.context.log_file,
        )

    def sync_metadata(self) -> None:
        result = self.run_python(
            "sync_delivery_docs.py",
            str(self.context.docs_dir),
            "--story",
            self.context.story_ref,
            check=False,
        )
        if result.exit_code != 0:
            self.progress_message("Warning: delivery metadata commit/push failed; see log")
            sys.stderr.write(f"Warning: delivery metadata commit/push failed. See log: {self.context.log_file}\n")
        else:
            self.progress_message("Delivery metadata committed and pushed to docs repository")

    def archive_result(self) -> None:
        archive_py = self.context.scripts_dir / "archive_delivery_run.py"
        if not archive_py.is_file() or self.context.result_file is None:
            return
        progress_path = delivery_results_dir(self.context.workspace_root) / "delivery-progress.json"
        run_command(
            [
                sys.executable,
                str(archive_py),
                "--workspace-root",
                str(self.context.workspace_root),
                "--result",
                str(self.context.result_file),
                "--progress",
                str(progress_path),
                "--log-file",
                str(self.context.log_file or ""),
            ],
            env=self.context.env,
            stream=False,
        )

    def cleanup_worktrees(self) -> None:
        try:
            for message in cleanup_worktrees(self.context.docs_dir, self.context.story_ref):
                self.log(message)
        except Exception as exc:
            sys.stderr.write(
                f"Warning: completed delivery worktree cleanup failed. See log: {self.context.log_file}\n"
            )
            sys.stderr.write(f"Warning: {exc}\n")

    def write_failure(self, message: str) -> None:
        assert self.context.result_file is not None
        self.run_python(
            "write_delivery_failure.py",
            str(self.context.docs_dir),
            "--story",
            self.context.story_ref,
            "--result",
            str(self.context.result_file),
            "--run-id",
            self.context.run_id,
            "--phase",
            self.context.current_phase or "delivery",
            "--message",
            message,
            check=False,
        )

    def handle_failure(self, message: str) -> None:
        phase = self.context.current_phase or DeliveryPhase.NOTIFY.value
        set_phase(self.context.workspace_root, phase, "failed", detail=message)
        finish_progress(self.context.workspace_root, "failed", detail=message)
        print_progress_report(self.context.workspace_root)
        try:
            self.write_failure(message)
            assert self.context.result_file is not None
            self.render_notification(self.context.result_file, "delivery.failed", dry_run=False)
        except Exception as secondary:
            sys.stderr.write(f"Warning: failure notification step failed: {secondary}\n")
        try:
            self.sync_metadata()
        except Exception as secondary:
            sys.stderr.write(f"Warning: metadata sync during failure failed: {secondary}\n")
        try:
            self.archive_result()
        except Exception as secondary:
            sys.stderr.write(f"Warning: archive during failure failed: {secondary}\n")

    def print_runtime_notices(self) -> None:
        assert self.context.env is not None
        config = self.agent_config()
        self.log(f"Docs repository: {self.context.docs_dir}")
        self.log(f"Workspace root: {self.context.workspace_root}")
        self.log(f"Cursor model: {config.model}")
        self.log(f"Run log: {self.context.log_file}")
        self.progress_message(f"Model={config.model}; sandbox={config.sandbox}")
        if not self.context.env.get("FEISHU_WEBHOOK_URL"):
            self.log("Notice: FEISHU_WEBHOOK_URL is not set. Delivery Feishu notifications will be skipped.")
        if shutil.which("gh") is None:
            self.log("Notice: GitHub CLI (gh) is not installed. PR creation may be skipped by the agent.")
        else:
            auth = run_command(["gh", "auth", "status"], env=self.context.env, stream=False, capture=True)
            if auth.exit_code != 0:
                self.log("Notice: GitHub CLI is not authenticated. PR creation may be skipped by the agent.")

    def run_dry_delivery(self) -> int:
        self.init_progress()
        self.progress_phase(DeliveryPhase.PREFLIGHT, "in_progress", "Validate story gates and metadata")
        self.log("\n[delivery] Phase 1/5 — Sync references and preflight")
        self.sync_references()
        self.progress_phase(DeliveryPhase.WORKTREES, "in_progress", "Prepare feature worktrees")
        self.log("[delivery] Phase 2/5 — Feature worktrees")
        self.run_prepare()
        self.progress_phase(DeliveryPhase.PREFLIGHT, "completed", "Gates passed")
        self.progress_phase(DeliveryPhase.WORKTREES, "completed", "Worktrees ready")
        self.progress_phase(DeliveryPhase.AGENT, "skipped", "Dry run — agent not started")
        self.progress_phase(DeliveryPhase.VERIFICATION, "skipped", "Dry run — verification not executed")
        self.progress_phase(DeliveryPhase.JIRA_START, "skipped", "Dry run")
        self.progress_phase(DeliveryPhase.JIRA_DONE, "skipped", "Dry run")
        self.log("[delivery] Phase 3/5 — Dry-run result")
        if (
            self.run_python(
                "dry_run_delivery.py",
                str(self.context.docs_dir),
                self.context.story_ref,
                self.context.run_id,
                check=False,
            ).exit_code
            != 0
        ):
            raise DeliveryFailure("Dry run delivery helper failed")
        assert self.context.result_file is not None
        if not self.context.result_file.is_file():
            raise DeliveryFailure(f"Dry run did not produce {self.context.result_file}")
        self.progress_phase(DeliveryPhase.NOTIFY, "in_progress", "Dry-run notification preview")
        self.render_notification(self.context.result_file, "delivery.dev_done", dry_run=True)
        self.progress_phase(DeliveryPhase.NOTIFY, "completed", "Dry-run notification preview sent")
        finish_progress(self.context.workspace_root, "completed", detail="Dry run finished")
        self.archive_result()
        self.log("\nDry-run delivery finished. No Cursor agent, commits, or PRs were created.")
        return 0

    def run_real_delivery(self) -> int:
        self.ensure_agent_ready()
        self.init_progress()

        self.progress_phase(DeliveryPhase.PREFLIGHT, "in_progress", "Validate story gates and metadata")
        self.log("\n[delivery] Phase 1/8 — Sync references and preflight")
        self.sync_references()
        self.progress_phase(DeliveryPhase.WORKTREES, "in_progress", "Create or refresh feature worktrees")
        self.log("[delivery] Phase 2/8 — Feature worktrees")
        self.run_prepare()
        self.progress_phase(DeliveryPhase.PREFLIGHT, "completed", "Gates passed")
        self.progress_phase(DeliveryPhase.WORKTREES, "completed", "Worktrees ready")

        self.progress_phase(DeliveryPhase.JIRA_START, "in_progress", "Notify JIRA IN DEV")
        self.log("[delivery] Phase 3/8 — JIRA IN DEV")
        self.capture_jira_context()
        self.send_started_notification()
        self.progress_phase(DeliveryPhase.JIRA_START, "completed", "Started notification sent")

        prompt = self.load_prompt()
        self.print_runtime_notices()

        self.progress_phase(DeliveryPhase.AGENT, "in_progress", "Cursor implementation agent")
        self.log("\n[delivery] Phase 4/8 — Implementation agent")
        self.log(f"Starting Lumen delivery agent at {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')} UTC...")
        try:
            self.run_agent(prompt, "Lumen delivery implementation agent")
        except DeliveryFailure as exc:
            self.progress_phase(DeliveryPhase.AGENT, "failed", "Agent exited with a non-zero status")
            raise DeliveryFailure(
                f"Lumen delivery agent exited with a non-zero status. See log: {self.context.log_file}"
            ) from exc
        assert self.context.result_file is not None
        if not self.context.result_file.is_file():
            raise DeliveryFailure(f"Delivery agent did not write {self.context.result_file}")
        self.progress_phase(DeliveryPhase.AGENT, "completed", "Agent finished; result written")

        self.verify_with_bounded_remediation()
        self.finalize_delivery()

        self.progress_phase(DeliveryPhase.JIRA_DONE, "in_progress", "Sync JIRA DEV DONE")
        self.progress_phase(DeliveryPhase.NOTIFY, "in_progress", "Feishu and metadata updates")
        self.log("[delivery] Phase 7/8 — JIRA DEV DONE")
        self.log("[delivery] Phase 8/8 — Notifications")
        try:
            self.render_notification(self.context.result_file, "delivery.dev_done", dry_run=False)
        except Exception as exc:
            sys.stderr.write(f"Warning: delivery notification step failed. See log for details.\n")
            sys.stderr.write(f"Warning: {exc}\n")
        self.sync_metadata()
        self.progress_phase(DeliveryPhase.JIRA_DONE, "completed", "JIRA sync attempted")
        self.progress_phase(DeliveryPhase.NOTIFY, "completed", "Notifications sent")
        finish_progress(self.context.workspace_root, "completed", detail="Delivery run finished")
        self.archive_result()
        self.cleanup_worktrees()
        self.log(f"\nLumen delivery run finished at {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')} UTC.")
        return 0

    def run(self) -> int:
        os.chdir(self.context.docs_dir)
        if self.context.dry_run:
            return self.run_dry_delivery()
        return self.run_real_delivery()


def orchestrate(argv: list[str] | None = None, scripts_dir: Path | None = None) -> int:
    argv = list(argv if argv is not None else sys.argv[1:])
    scripts = scripts_dir or Path(__file__).resolve().parent
    context = build_run_context(argv, scripts_dir=scripts)
    context.env = load_delivery_environment(
        context.docs_dir,
        context.workspace_dir_name,
        base_env=os.environ.copy(),
    )
    os.environ.update(context.env)

    orchestrator = DeliveryOrchestrator(context)
    orchestrator.ensure_runtime_dirs()

    assert context.lock_dir is not None
    try:
        with delivery_lock(context.lock_dir, docs_dir=context.docs_dir, story=context.story_ref):
            try:
                return orchestrator.run()
            except DeliveryFailure as exc:
                orchestrator.handle_failure(str(exc))
                sys.stderr.write(f"Error: {exc}\n")
                return 1
            except KeyboardInterrupt:
                orchestrator.handle_failure("Delivery run interrupted")
                sys.stderr.write("Error: Delivery run interrupted\n")
                return 130
    except DeliveryLockError as exc:
        sys.stderr.write(f"Error: {exc}\n")
        return 1


def main() -> int:
    return orchestrate()


if __name__ == "__main__":
    raise SystemExit(main())
