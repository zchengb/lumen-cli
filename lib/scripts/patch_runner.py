#!/usr/bin/env python3
"""Run one bounded Auto Patch cycle."""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

from capture_patch_context import capture
from compose_patch_prompt import compose
from patch_jira import add_comment, blocked_comment, transition_issue
from patch_runtime import (
    comments,
    blocked_statuses,
    comment_fingerprint,
    empty_progress,
    get_workitem,
    has_external_reply,
    history_dir,
    jira_fields,
    jira_key,
    jira_status,
    jira_summary,
    load_registry,
    logs_dir,
    new_progress,
    patch_config,
    prepare_worktree,
    progress_path,
    query_candidates,
    remove_worktrees,
    repo_registry,
    result_path,
    results_dir,
    save_progress,
    save_registry,
    set_phase,
    utc_now,
    workspace_lumen_dir,
    write_json,
)


def load_env(workspace: Path) -> None:
    for path in (workspace / ".env.common", workspace / ".env.local", workspace_lumen_dir(workspace) / ".env.common", workspace_lumen_dir(workspace) / ".env.local"):
        if not path.is_file():
            continue
        for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def lock_path(workspace: Path) -> Path:
    return workspace_lumen_dir(workspace) / "locks" / "patch-run"


def select_repository(workspace: Path, item: dict[str, Any]) -> tuple[dict[str, Any] | None, str]:
    repositories = repo_registry(workspace)
    def enabled(repo: dict[str, Any]) -> bool:
        automation = repo.get("automation") if isinstance(repo.get("automation"), dict) else {}
        patch = automation.get("patch") if isinstance(automation.get("patch"), dict) else {}
        return bool(patch.get("enabled", True))

    eligible = [repo for repo in repositories if enabled(repo)]
    if not eligible:
        return None, "Auto Patch is disabled for every registered repository."
    if len(eligible) == 1:
        repo = eligible[0]
        return repo, "Only one Auto Patch-authorized repository is available."
    raw = json.dumps(item, ensure_ascii=False).casefold()
    labels = jira_fields(item).get("labels") or []
    label_text = " ".join(str(value) for value in labels) if isinstance(labels, list) else str(labels)
    matches = [repo for repo in repositories if str(repo.get("name") or "").casefold() in raw or str(repo.get("name") or "").casefold() in label_text.casefold()]
    if len(matches) == 1:
        if enabled(matches[0]):
            return matches[0], f"Repository name appears in Jira context: {matches[0].get('name')}."
        return None, f"Auto Patch is disabled for registered repository '{matches[0].get('name')}'."
    if not repositories:
        return None, "No registered repository is available."
    return None, "Jira context does not identify exactly one registered repository."


def result_from_progress(progress: dict[str, Any], status: str, summary: str, question: str = "", failures: list[dict[str, Any]] | None = None) -> dict[str, Any]:
    return {
        "schema_version": "1.0",
        "patch_status": status,
        "jira_key": progress.get("jira_key", ""),
        "jira_summary": progress.get("jira_summary", ""),
        "jira_status": progress.get("jira_status", ""),
        "summary": summary,
        "repository_decision": progress.get("repository_decision", {}),
        "repos_touched": progress.get("repositories", []),
        "self_checks": progress.get("self_checks", []),
        "question": question,
        "failures": failures or [],
        "jira": progress.get("jira", {}),
        "blocked_at": progress.get("blocked_at", ""),
        "started_at": progress.get("started_at", ""),
        "finished_at": utc_now(),
    }


def validate_result(result: dict[str, Any], key: str) -> str:
    if result.get("schema_version") != "1.0":
        return "Agent result schema_version must be 1.0"
    if str(result.get("jira_key") or "").strip().upper() != key:
        return f"Agent result jira_key must be {key}"
    status = str(result.get("patch_status") or "").strip()
    if status not in {"completed", "blocked", "skipped", "failed"}:
        return "Agent result patch_status must be completed, blocked, skipped, or failed"
    if not isinstance(result.get("self_checks"), list):
        return "Agent result self_checks must be an array"
    if status == "completed" and not isinstance(result.get("repos_touched"), list):
        return "Completed Agent results must contain repos_touched as an array"
    if status in {"blocked", "failed"} and not str(result.get("question") or "").strip():
        return "Blocked or failed Agent results must contain one question"
    return ""


def write_terminal(workspace: Path, progress: dict[str, Any], result: dict[str, Any]) -> None:
    progress.update({"patch_status": result.get("patch_status"), "finished_at": result.get("finished_at", utc_now()), "question": result.get("question", ""), "failures": result.get("failures", []), "self_checks": result.get("self_checks", [])})
    save_progress(workspace, progress)
    write_json(result_path(workspace), result)
    history_dir(workspace).mkdir(parents=True, exist_ok=True)
    write_json(history_dir(workspace) / f"{progress.get('run_id')}.json", {"progress": progress, "patch": result})


def notify(workspace: Path, event: str) -> None:
    renderer = Path(__file__).with_name("render-delivery-and-notify.py")
    if not renderer.is_file():
        return
    subprocess.run([sys.executable, str(renderer), str(result_path(workspace)), "--event", event], env=os.environ.copy(), capture_output=True, text=True, check=False)


def block(workspace: Path, progress: dict[str, Any], question: str, reason: str) -> int:
    key = str(progress.get("jira_key") or "")
    progress["blocked_at"] = utc_now()
    transition_result = "sent"
    comment_result = "sent"
    try:
        progress["jira_status"] = transition_issue(workspace, key, str(patch_config(workspace).get("blocked_status", "Block")))
    except Exception as exc:
        transition_result = "failed"
        progress.setdefault("failures", []).append({"stage": "jira", "detail": str(exc)})
    try:
        add_comment(workspace, key, blocked_comment(reason, question), "html")
    except Exception as exc:
        comment_result = "failed"
        progress.setdefault("failures", []).append({"stage": "jira_comment", "detail": str(exc)})
    progress["jira"] = {
        "status": "sent" if comment_result == "sent" else "failed",
        "event": "patch.blocked",
        "transition": transition_result,
        "comment": comment_result,
    }
    registry = load_registry(workspace)
    registry.setdefault("issues", {})[key] = {"status": "blocked", "blocked_at": utc_now(), "question_hash": comment_fingerprint({"body": question}), "updated": registry.get("issues", {}).get(key, {}).get("updated", "")}
    save_registry(workspace, registry)
    result = result_from_progress(progress, "blocked", reason, question, progress.get("failures"))
    write_terminal(workspace, progress, result)
    notify(workspace, "patch.blocked")
    remove_worktrees(progress.get("repositories") or [])
    return 0


def run_agent(workspace: Path, prompt: str, log_file: Path) -> int:
    execution = (workspace_lumen_dir(workspace) / "config" / "delivery.json")
    config: dict[str, Any] = {}
    try:
        config = json.loads(execution.read_text(encoding="utf-8")) if execution.is_file() else {}
    except (OSError, json.JSONDecodeError):
        pass
    execution_config = config.get("execution", {}) if isinstance(config.get("execution"), dict) else {}
    model = str(execution_config.get("patch_model") or execution_config.get("model") or os.environ.get("CURSOR_AGENT_MODEL") or "cursor-grok-4.5-medium")
    sandbox = os.environ.get("CURSOR_AGENT_SANDBOX", "disabled")
    output_format = os.environ.get("CURSOR_AGENT_OUTPUT_FORMAT", "stream-json")
    args = ["agent", "--workspace", str(workspace), "--sandbox", sandbox, "--trust", "-p", "-f", "--output-format", output_format, "--model", model, prompt]
    log_file.parent.mkdir(parents=True, exist_ok=True)
    with log_file.open("w", encoding="utf-8") as handle:
        completed = subprocess.run(args, stdout=handle, stderr=subprocess.STDOUT, env=os.environ.copy(), check=False)
    return completed.returncode


def write_idle_state(workspace: Path, message: str) -> str:
    idle = empty_progress()
    idle.update({"patch_status": "idle", "current_step": message, "finished_at": utc_now()})
    save_progress(workspace, idle)
    write_json(result_path(workspace), {"schema_version": "1.0", "patch_status": "idle", "jira_key": "", "summary": message, "finished_at": idle["finished_at"]})
    return message


def choose_item(workspace: Path, requested: str) -> tuple[dict[str, Any] | None, bool]:
    registry = load_registry(workspace).get("issues", {})
    candidates = query_candidates(workspace, include_blocked=True)
    if requested:
        candidates = [candidate for candidate in candidates if jira_key(candidate) == requested]
    for candidate in candidates:
        key = jira_key(candidate)
        item = get_workitem(workspace, key)
        record = registry.get(key, {}) if isinstance(registry, dict) else {}
        blocked = jira_status(item).casefold() in {status.casefold() for status in blocked_statuses(workspace)}
        waiting_for_reply = blocked or record.get("status") == "blocked"
        resumed = False
        if waiting_for_reply:
            if not has_external_reply(item, record):
                continue
            resumed = record.get("status") == "blocked"
        if record.get("status") in {"completed", "skipped"} and record.get("updated") == str(jira_fields(item).get("updated") or ""):
            continue
        _, reason = select_repository(workspace, item)
        if reason.startswith("Auto Patch is disabled"):
            continue
        return item, resumed
    return None, False


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workspace")
    parser.add_argument("--jira-key", default="")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    workspace = Path(args.workspace).expanduser().resolve()
    load_env(workspace)
    lock = lock_path(workspace)
    lock.parent.mkdir(parents=True, exist_ok=True)
    try:
        lock.mkdir()
    except FileExistsError:
        print("Auto Patch already running; skipped this cycle.")
        return 0
    try:
        (lock / "pid").write_text(str(os.getpid()), encoding="utf-8")
        progress: dict[str, Any] | None = None
        try:
            item, resumed = choose_item(workspace, args.jira_key.strip().upper())
        except RuntimeError as exc:
            if str(exc) == "No active sprint found for the configured Jira board":
                message = write_idle_state(workspace, "No active sprint found for the configured Jira board.")
                print(message)
                return 0
            raise
        if not item:
            message = write_idle_state(workspace, "No eligible Auto Patch Jira card found in the current active sprint.")
            print(message)
            return 0
        key = jira_key(item)
        progress = new_progress(datetime.now().strftime("%Y%m%d-%H%M%S"), item, workspace)
        save_progress(workspace, progress)
        set_phase(workspace, progress, "capture", "in_progress", f"Selected {key}")
        set_phase(workspace, progress, "capture", "completed", "Primary Jira workitem captured")
        if resumed:
            progress["messages"] = [{"at": utc_now(), "message": "New external Jira reply detected; restarting Auto Patch."}]
        set_phase(workspace, progress, "screen", "in_progress", "Checking issue type, status, and actionable scope")
        fields = jira_fields(item)
        current_type = str(fields.get("issuetype", {}).get("name") if isinstance(fields.get("issuetype"), dict) else fields.get("issuetype") or "").strip()
        from patch_runtime import issue_types
        if current_type.casefold() not in {value.casefold() for value in issue_types(workspace)}:
            result = result_from_progress(progress, "skipped", f"Issue type {current_type or 'unknown'} is outside Auto Patch scope")
            write_terminal(workspace, progress, result)
            notify(workspace, "patch.completed")
            return 0
        set_phase(workspace, progress, "screen", "completed", "Deterministic Jira gates passed")
        if args.dry_run:
            set_phase(workspace, progress, "context", "in_progress", "Dry run: reading Jira context")
            context_path = capture(workspace, key)
            set_phase(workspace, progress, "context", "completed", f"Context captured at {context_path}")
            repo, repo_reason = select_repository(workspace, item)
            if repo is None:
                result = result_from_progress(progress, "blocked", "Dry run could not resolve one registered repository", "Which registered repository should Auto Patch modify?")
                write_terminal(workspace, progress, result)
                return 0
            progress["repository_decision"] = {"repositories": [repo.get("name")], "reason": repo_reason}
            prompt = compose(workspace, key, jira_summary(item), context_path, [repo])
            prompt_path = results_dir(workspace) / "patch-prompt.txt"
            prompt_path.write_text(prompt, encoding="utf-8")
            progress["prompt_path"] = str(prompt_path)
            set_phase(workspace, progress, "repository", "completed", f"Dry run mapped {repo.get('name')}")
            set_phase(workspace, progress, "agent", "skipped", "Dry run")
            result = result_from_progress(progress, "skipped", f"Dry run completed; composed prompt at {prompt_path}")
            write_terminal(workspace, progress, result)
            return 0
        try:
            progress["jira_status"] = transition_issue(workspace, key, str(patch_config(workspace).get("in_progress_status", "In Progress")))
        except Exception as exc:
            return block(workspace, progress, f"Can Auto Patch transition {key} to the configured In Progress status?", str(exc))
        save_progress(workspace, progress)
        result_path(workspace).unlink(missing_ok=True)
        write_json(result_path(workspace), result_from_progress(progress, "running", f"Auto Patch started for {key}"))
        notify(workspace, "patch.started")
        set_phase(workspace, progress, "context", "in_progress", "Reading primary and related Jira context")
        context_path = capture(workspace, key)
        set_phase(workspace, progress, "context", "completed", f"Context captured at {context_path}")
        set_phase(workspace, progress, "repository", "in_progress", "Resolving one registered repository")
        repo, repo_reason = select_repository(workspace, item)
        if repo is None:
            return block(workspace, progress, "Which registered repository should Auto Patch modify?", repo_reason)
        progress["repository_decision"] = {"repositories": [repo.get("name")], "reason": repo_reason}
        prepared = prepare_worktree(workspace, key, jira_summary(item), repo)
        progress["repositories"] = [prepared]
        progress["branch"] = prepared.get("branch", "")
        save_progress(workspace, progress)
        set_phase(workspace, progress, "repository", "completed", f"Prepared {prepared.get('worktree_path')}")
        set_phase(workspace, progress, "agent", "in_progress", "Running Auto Patch Agent")
        prompt = compose(workspace, key, jira_summary(item), context_path, [repo])
        log_file = logs_dir(workspace) / f"run-{progress['run_id']}.log"
        progress["log_file"] = str(log_file)
        save_progress(workspace, progress)
        exit_code = run_agent(workspace, prompt, log_file)
        set_phase(workspace, progress, "agent", "completed" if exit_code == 0 else "failed", f"Agent exited with {exit_code}")
        if exit_code != 0:
            return block(workspace, progress, "Should Auto Patch retry after the Agent failed?", f"Agent exited with code {exit_code}; see {log_file}")
        result = json.loads(result_path(workspace).read_text(encoding="utf-8")) if result_path(workspace).is_file() else {}
        if not isinstance(result, dict):
            return block(workspace, progress, "Can the Agent write the required patch-result.json contract?", "Agent result is not a JSON object")
        validation_error = validate_result(result, key)
        if validation_error:
            return block(workspace, progress, "Can the Agent provide a valid patch-result.json contract?", validation_error)
        status = str(result.get("patch_status") or "").strip()
        if status == "blocked":
            progress["question"] = str(result.get("question") or "Please clarify the expected behavior.")
            progress["self_checks"] = result.get("self_checks") or []
            return block(workspace, progress, progress["question"], str(result.get("summary") or "Agent could not determine a safe patch"))
        if status == "skipped":
            progress["self_checks"] = result.get("self_checks") or []
            write_terminal(workspace, progress, result)
            notify(workspace, "patch.completed")
            return 0
        if status != "completed":
            return block(workspace, progress, "Should Auto Patch retry after the Agent reported a failure?", str(result.get("question") or result.get("summary") or "Agent reported a failure"))
        progress["self_checks"] = result.get("self_checks") or []
        set_phase(workspace, progress, "self_check", "completed", "Agent self-check evidence recorded")
        set_phase(workspace, progress, "publish", "in_progress", "Committing and publishing changes")
        finalize = subprocess.run([sys.executable, str(Path(__file__).with_name("finalize_patch.py")), str(workspace)], capture_output=True, text=True, check=False)
        if finalize.returncode != 0:
            return block(workspace, progress, "Should Auto Patch retry the failed publish operation?", (finalize.stderr or finalize.stdout or "Patch finalization failed").strip()[-1000:])
        result = json.loads(result_path(workspace).read_text(encoding="utf-8"))
        progress["self_checks"] = result.get("self_checks") or progress.get("self_checks", [])
        set_phase(workspace, progress, "publish", "completed", "Changes published")
        set_phase(workspace, progress, "jira_notify", "in_progress", "Updating Jira and Feishu")
        done_status = str(patch_config(workspace).get("done_status", "Done"))
        progress["jira_status"] = transition_issue(workspace, key, done_status)
        pr_lines = ", ".join(result.get("pr_urls") or []) or ", ".join(item.get("sha", "") for item in result.get("commits") or [])
        add_comment(workspace, key, f"Lumen Auto Patch · Completed\n\n- Summary: {result.get('summary', '')}\n- Publish: {pr_lines or 'completed'}")
        registry = load_registry(workspace)
        registry.setdefault("issues", {})[key] = {"status": "completed", "updated": str(jira_fields(item).get("updated") or ""), "finished_at": utc_now()}
        save_registry(workspace, registry)
        set_phase(workspace, progress, "jira_notify", "completed", "Jira and Feishu updates sent")
        write_terminal(workspace, progress, result)
        notify(workspace, "patch.completed")
        remove_worktrees(progress.get("repositories") or [])
        return 0
    except Exception as exc:
        print(f"Auto Patch error: {exc}", file=sys.stderr)
        if args.dry_run and progress:
            result = result_from_progress(progress, "failed", "Dry run failed before prompt composition", "What should Auto Patch adjust before the next dry run?", [{"stage": "dry_run", "detail": str(exc)}])
            write_terminal(workspace, progress, result)
            return 0
        if progress and progress.get("jira_key"):
            return block(workspace, progress, "What should Auto Patch do to continue safely?", str(exc))
        return 1
    finally:
        shutil.rmtree(lock, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
