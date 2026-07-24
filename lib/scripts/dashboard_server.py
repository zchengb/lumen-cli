#!/usr/bin/env python3
"""Serve Lumen's local interactive dashboard on loopback only."""

from __future__ import annotations

import argparse
import importlib.util
import json
import mimetypes
import os
import re
import shutil
import signal
import shlex
import subprocess
import sys
import time
from datetime import datetime, timedelta, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, unquote, urlparse

from delivery_launchd import install as install_delivery_schedule
from delivery_launchd import remove as remove_delivery_schedule
from delivery_launchd import status as delivery_schedule_status
from cleanup_delivery_worktrees import cleanup as cleanup_delivery_worktrees
from delivery_workspace import load_story_context, read_json as read_delivery_json, workspace_lumen_dir
from jira_delivery_sync import add_delivery_comment, jira_delivery_config, should_sync_jira, transition_issue
from jira_sync import parse_twg_json, refresh_twg_auth, run_twg, twg_ready
from issue_registry import set_issue_status
from projects_registry import find_by_slug, load_registry
from scan_launchd import install as install_scan_schedule
from scan_launchd import remove as remove_scan_schedule
from scan_launchd import status as scan_schedule_status
from discover_repos import default_branch, infer_profile


SCRIPT_DIR = Path(__file__).resolve().parent
WORKSPACE_STATIC_DIRECTORIES = {"assets", "dashboard-app", "reports", "logs", "results"}


def load_dashboard_renderer() -> Any:
    spec = importlib.util.spec_from_file_location("lumen_dashboard_renderer", SCRIPT_DIR / "render-dashboard.py")
    if spec is None or spec.loader is None:
        raise RuntimeError("Dashboard renderer is unavailable")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


RENDERER = load_dashboard_renderer()


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def terminate_process_tree(pid: int) -> None:
    try:
        children = subprocess.run(["pgrep", "-P", str(pid)], capture_output=True, text=True, check=False).stdout.split()
    except OSError:
        children = []
    for child in children:
        try:
            terminate_process_tree(int(child))
        except ValueError:
            continue
    try:
        os.kill(pid, signal.SIGTERM)
    except (ProcessLookupError, OSError):
        pass


def load_json(path: Path, default: dict[str, Any]) -> dict[str, Any]:
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return default
    return payload if isinstance(payload, dict) else default


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def prompt_files(workspace: Path) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for mode in ("scan", "delivery"):
        root = workspace / "prompts" / mode
        if not root.is_dir():
            continue
        for path in sorted(root.rglob("*.md")):
            items.append({"mode": mode, "path": str(path.relative_to(root))})
    return items


def safe_prompt_path(workspace: Path, mode: str, relative: str) -> Path:
    if mode not in {"scan", "delivery"}:
        raise ValueError("Unknown prompt mode")
    root = (workspace / "prompts" / mode).resolve()
    path = (root / relative).resolve()
    if root not in path.parents or path.suffix != ".md":
        raise ValueError("Invalid prompt path")
    return path


def safe_workspace_static_path(workspace: Path, request_path: str) -> Path:
    """Resolve a dashboard artifact without exposing the rest of the workspace."""
    relative = Path(unquote(request_path).lstrip("/"))
    if not relative.parts or relative.parts[0] not in WORKSPACE_STATIC_DIRECTORIES:
        raise ValueError("Unknown workspace artifact")
    root = (workspace / relative.parts[0]).resolve()
    path = (workspace / relative).resolve()
    try:
        path.relative_to(root)
    except ValueError as exc:
        raise ValueError("Invalid workspace artifact path") from exc
    return path


def schedule_payload(workspace: Path, project: str) -> dict[str, Any]:
    scan_raw = capture_schedule_status(scan_schedule_status, project)
    delivery_raw = capture_schedule_status(delivery_schedule_status, project)
    delivery_config = load_json(workspace / "config" / "delivery.json", {})
    automation = delivery_config.get("automation") if isinstance(delivery_config.get("automation"), dict) else {}
    scheduled = automation.get("scheduled_delivery") if isinstance(automation.get("scheduled_delivery"), dict) else {}
    jira = delivery_config.get("jira") if isinstance(delivery_config.get("jira"), dict) else {}
    if delivery_raw is None:
        delivery_raw = {"enabled": False}
    delivery_raw.setdefault("enabled", True)
    delivery_raw["jira_status"] = delivery_raw.get("jira_status") or scheduled.get("required_jira_status", "")
    delivery_raw["in_dev_status"] = jira.get("in_dev_status", "")
    delivery_raw["dev_done_status"] = jira.get("dev_done_status", "")
    delivery_raw["blocked_status"] = jira.get("blocked_status", "Block")
    return {
        "scan": scan_raw,
        "delivery": delivery_raw,
        "platform": "launchd" if sys.platform == "darwin" else "unsupported",
    }


def jira_status_options(workspace: Path) -> dict[str, Any]:
    """Use an existing Story as the workflow probe; cache reads to keep dashboard refreshes cheap."""
    cache_path = workspace / "state" / "jira-workflow-statuses.json"
    cached = load_json(cache_path, {})
    cached_at = cached.get("fetched_at", "")
    try:
        fresh = datetime.now(timezone.utc) - datetime.fromisoformat(str(cached_at).replace("Z", "+00:00")) < timedelta(minutes=5)
    except ValueError:
        fresh = False
    if fresh and isinstance(cached.get("options"), list):
        return cached

    ready, detail = twg_ready()
    if not ready:
        return {"options": [], "detail": detail}
    stories = workspace.parent / "stories"
    metadata_paths = sorted(stories.glob("*/metadata.json")) if stories.is_dir() else []
    metadata = next((load_json(path, {}) for path in metadata_paths if str(load_json(path, {}).get("jiraKey", "")).strip()), {})
    jira_key = str(metadata.get("jiraKey", "")).strip()
    if not jira_key:
        return {"options": [], "detail": "No JIRA-backed Story is available to inspect the workflow."}
    code, output = run_twg(["jira", "workitem", "get", jira_key, "-o", "json"])
    if code != 0:
        return {"options": [], "detail": "Unable to read JIRA workflow status."}
    payload = parse_twg_json(output) or {}
    data = payload.get("data") if isinstance(payload, dict) else {}
    item = data[0] if isinstance(data, list) and data else data
    if not isinstance(item, dict) or not item.get("id"):
        return {"options": [], "detail": "JIRA workflow probe returned no work item."}
    current = item.get("status") if isinstance(item.get("status"), dict) else {}
    current_name = str(current.get("name", "")).strip()
    code, output = run_twg(["jira", "workitem", "transitions", "query", "--id", str(item["id"]), "-o", "json"])
    if code != 0:
        return {"options": [current_name] if current_name else [], "source_jira_key": jira_key, "detail": "Unable to read available Jira transitions."}
    transitions_payload = parse_twg_json(output) or {}
    transition_data = transitions_payload.get("data") if isinstance(transitions_payload, dict) else {}
    transitions = transition_data.get("transitions") if isinstance(transition_data, dict) else []
    names = [current_name] + [str(item.get("toName") or item.get("name") or "").strip() for item in transitions if isinstance(item, dict)]
    result = {"options": list(dict.fromkeys(name for name in names if name)), "source_jira_key": jira_key, "fetched_at": utc_now()}
    write_json(cache_path, result)
    return result


def capture_schedule_status(func: Any, project: str) -> dict[str, Any] | None:
    parser = argparse.Namespace(project=project)
    from contextlib import redirect_stdout
    from io import StringIO

    output = StringIO()
    with redirect_stdout(output):
        func(parser)
    text = output.getvalue().strip()
    if not text:
        return None
    try:
        payload = json.loads(text)
    except json.JSONDecodeError:
        return {"detail": text}
    return payload if isinstance(payload, dict) else None


def workspace_payload(workspace: Path) -> dict[str, Any]:
    common = load_json(workspace / "config" / "common.json", {})
    env_local = workspace / ".env.local"
    configured_keys: list[str] = []
    if env_local.is_file():
        for line in env_local.read_text(encoding="utf-8", errors="replace").splitlines():
            if "=" not in line or line.lstrip().startswith("#"):
                continue
            key, value = line.split("=", 1)
            if value.strip().strip('"').strip("'"):
                configured_keys.append(key.strip())
    repos_config = load_json(workspace / "config" / "repos.json", {"repositories": []})
    profiles = load_json(workspace / "config" / "runtime-profiles.json", {})
    delivery_config = load_json(workspace / "config" / "delivery.json", {})
    verification = delivery_config.get("verification") if isinstance(delivery_config.get("verification"), dict) else {}
    steps = verification.get("steps") if isinstance(verification.get("steps"), dict) else {}
    repositories = repos_config.get("repositories") if isinstance(repos_config.get("repositories"), list) else []
    enriched_repositories = []
    for repository in repositories:
        if not isinstance(repository, dict):
            continue
        entry = dict(repository)
        runtime = entry.get("runtime")
        if isinstance(runtime, dict):
            runtime_view = dict(runtime)
            configured = bool(str(runtime_view.pop("visual_auth_credential", "")).strip())
            if configured:
                runtime_view["visual_auth_configured"] = True
            entry["runtime"] = runtime_view
        entry["delivery_steps"] = steps.get(str(entry.get("name", "")), [])
        entry["branches"] = repository_branches(Path(str(entry.get("path", ""))), str(entry.get("default_branch", "main")))
        enriched_repositories.append(entry)
    return {
        "path": str(workspace),
        "scan_window_days": (common.get("execution") or {}).get("scan_window_days", 7),
        "configured_integrations": sorted(key for key in configured_keys if key),
        "repositories": enriched_repositories,
        "runtime_profiles": profiles,
        "publish": {
            "scan": str(((common.get("auto_fix") or {}).get("publish_mode") or "pr")),
            "delivery": str(((delivery_config.get("publish") or {}).get("mode") or "pr")),
        },
        "models": {
            "scan": str((common.get("execution") or {}).get("model") or "composer-2.5"),
            "delivery": str((delivery_config.get("execution") or {}).get("model") or "composer-2.5"),
        },
    }


def repository_branches(repository: Path, default: str) -> list[str]:
    if not repository.is_dir() or not (repository / ".git").exists():
        return [default] if default else []
    branches: list[str] = []
    for args in (("for-each-ref", "--format=%(refname:short)", "refs/heads"), ("for-each-ref", "--format=%(refname:short)", "refs/remotes/origin")):
        completed = subprocess.run(["git", *args], cwd=repository, capture_output=True, text=True)
        if completed.returncode != 0:
            continue
        for branch in completed.stdout.splitlines():
            name = branch.strip().removeprefix("origin/")
            if name and name != "HEAD" and not name.endswith("/HEAD") and name not in branches:
                branches.append(name)
    if default and default not in branches:
        branches.insert(0, default)
    return branches


def repository_name_from_url(url: str) -> str:
    candidate = url.rstrip("/").rsplit("/", 1)[-1].rsplit(":", 1)[-1]
    name = candidate.removesuffix(".git")
    if not re.fullmatch(r"[A-Za-z0-9._-]+", name):
        raise ValueError("Repository URL must end with a repository name")
    return name


def save_repositories(workspace: Path, repositories: object) -> dict[str, Any]:
    if not isinstance(repositories, list):
        raise ValueError("Repositories must be a list")
    profiles = load_json(workspace / "config" / "runtime-profiles.json", {})
    cleaned = []
    delivery = load_json(workspace / "config" / "delivery.json", {})
    existing_config = load_json(workspace / "config" / "repos.json", {"repositories": []})
    existing_repositories = existing_config.get("repositories") if isinstance(existing_config.get("repositories"), list) else []
    verification = delivery.setdefault("verification", {})
    steps = verification.setdefault("steps", {})
    seen = set()
    for repository in repositories:
        if not isinstance(repository, dict):
            raise ValueError("Each repository must be an object")
        name = str(repository.get("name", "")).strip()
        path = Path(str(repository.get("path", "")).strip()).expanduser()
        branch = str(repository.get("default_branch", "")).strip() or "main"
        profile = str(repository.get("runtime_profile", "")).strip() or "local-generic-review-only"
        if not name or name in seen:
            raise ValueError("Repository names must be unique")
        if profile not in profiles:
            raise ValueError(f"Unknown runtime profile: {profile}")
        if not path.is_dir() or not (path / ".git").exists():
            raise ValueError(f"Repository is not a local Git checkout: {path}")
        seen.add(name)
        cleaned.append({
            "name": name,
            "path": str(path.resolve()),
            "remote_url": str(repository.get("remote_url", "")).strip(),
            "default_branch": branch,
            "runtime_profile": profile,
            "validation_commands": [str(item) for item in repository.get("validation_commands", []) if str(item).strip()],
            "allow_auto_fix": bool(repository.get("allow_auto_fix", True)),
            "allow_pr": bool(repository.get("allow_pr", True)),
        })
        if "generate_tests" in repository:
            cleaned[-1]["generate_tests"] = bool(repository.get("generate_tests"))
        runtime = repository.get("runtime")
        existing = next((item for item in existing_repositories if isinstance(item, dict) and str(item.get("name", "")).strip() == name), {})
        existing_runtime = existing.get("runtime") if isinstance(existing, dict) and isinstance(existing.get("runtime"), dict) else {}
        if runtime is not None or existing_runtime:
            if runtime is not None and not isinstance(runtime, dict):
                raise ValueError(f"Runtime configuration for {name} must be an object")
            stored_runtime = dict(existing_runtime)
            if isinstance(runtime, dict):
                stored_runtime.update({key: value for key, value in runtime.items() if key != "visual_auth_configured"})
            try:
                json.dumps(stored_runtime)
            except (TypeError, ValueError) as exc:
                raise ValueError(f"Runtime configuration for {name} must contain JSON values") from exc
            cleaned[-1]["runtime"] = stored_runtime
        if "runtime_status" in repository:
            runtime_status = str(repository.get("runtime_status") or "").strip()
            if runtime_status not in {"ready", "incomplete"}:
                raise ValueError(f"Runtime status for {name} must be ready or incomplete")
            cleaned[-1]["runtime_status"] = runtime_status
        if "delivery_commands" in repository:
            commands = repository["delivery_commands"]
            lines = commands.splitlines() if isinstance(commands, str) else commands
            if not isinstance(lines, list):
                raise ValueError("Delivery commands must be a list or text")
            parsed = [shlex.split(str(command)) for command in lines if str(command).strip()]
            steps[name] = [
                {"id": f"configured-{index + 1}", "label": f"Configured verification {index + 1}", "command": command, "optional": False}
                for index, command in enumerate(parsed)
            ]
    write_json(workspace / "config" / "repos.json", {"repositories": cleaned})
    write_json(workspace / "config" / "delivery.json", delivery)
    return workspace_payload(workspace)


def clone_repository(workspace: Path, url: object) -> dict[str, Any]:
    remote_url = str(url).strip()
    if not remote_url:
        raise ValueError("Repository clone URL is required")
    name = repository_name_from_url(remote_url)
    destination = workspace.parent / "repos" / name
    if destination.exists():
        raise ValueError(f"Repository destination already exists: {destination}")
    destination.parent.mkdir(parents=True, exist_ok=True)
    completed = subprocess.run(["git", "clone", remote_url, str(destination)], capture_output=True, text=True)
    if completed.returncode != 0:
        raise RuntimeError((completed.stderr or completed.stdout or "git clone failed").strip())
    config_path = workspace / "config" / "repos.json"
    config = load_json(config_path, {"repositories": []})
    repositories = config.get("repositories") if isinstance(config.get("repositories"), list) else []
    repositories.append({
        "name": name,
        "path": str(destination.resolve()),
        "remote_url": remote_url,
        "default_branch": default_branch(destination),
        "runtime_profile": infer_profile(destination),
        "validation_commands": [],
        "allow_auto_fix": True,
        "allow_pr": True,
    })
    return save_repositories(workspace, repositories)


def save_delivery_steps(workspace: Path, repository: str, commands: object) -> dict[str, Any]:
    name = str(repository).strip()
    if not name or not isinstance(commands, list):
        raise ValueError("Repository and commands are required")
    parsed = [shlex.split(str(command)) for command in commands if str(command).strip()]
    if any(not command for command in parsed):
        raise ValueError("Verification commands cannot be empty")
    path = workspace / "config" / "delivery.json"
    config = load_json(path, {})
    verification = config.setdefault("verification", {})
    steps = verification.setdefault("steps", {})
    steps[name] = [
        {"id": f"configured-{index + 1}", "label": f"Configured verification {index + 1}", "command": command, "optional": False}
        for index, command in enumerate(parsed)
    ]
    write_json(path, config)
    return workspace_payload(workspace)


def save_publish_policy(workspace: Path, scan_mode: object, delivery_mode: object) -> dict[str, Any]:
    modes = {"pr", "merge", "direct"}
    if scan_mode not in modes or delivery_mode not in modes:
        raise ValueError("Publish mode must be PR, Merge, or Direct push")
    common_path = workspace / "config" / "common.json"
    common = load_json(common_path, {})
    common.setdefault("auto_fix", {})["publish_mode"] = scan_mode
    write_json(common_path, common)
    delivery_path = workspace / "config" / "delivery.json"
    delivery = load_json(delivery_path, {})
    delivery.setdefault("publish", {})["mode"] = delivery_mode
    write_json(delivery_path, delivery)
    return workspace_payload(workspace)


def integration_value(workspace: Path, key: str) -> str:
    if not key or not key.replace("_", "").isalnum() or key.upper() != key:
        raise ValueError("Integration key must use uppercase letters, numbers, and underscores")
    path = workspace / ".env.local"
    if not path.is_file():
        raise ValueError("No local integration values are configured")
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        if line.lstrip().startswith("#") or "=" not in line:
            continue
        candidate, value = line.split("=", 1)
        if candidate.strip() == key:
            try:
                parsed = shlex.split(value, posix=True)
            except ValueError:
                return value
            return parsed[0] if len(parsed) == 1 else value
    raise ValueError(f"Integration key is not configured: {key}")


def update_env_value(workspace: Path, key: str, value: str) -> None:
    if not key or not key.replace("_", "").isalnum() or key.upper() != key:
        raise ValueError("Integration key must use uppercase letters, numbers, and underscores")
    path = workspace / ".env.local"
    lines = path.read_text(encoding="utf-8").splitlines() if path.is_file() else []
    serialized = value if value and not re.search(r"[\s#'\"\\]", value) else shlex.quote(value)
    entry = f"{key}={serialized}"
    for index, line in enumerate(lines):
        if line.split("=", 1)[0].strip() == key:
            lines[index] = entry
            break
    else:
        lines.append(entry)
    path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def parse_delivery_timestamp(value: object) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError:
        return None


def delivery_duration(started_at: object, finished_at: object) -> str:
    started = parse_delivery_timestamp(started_at)
    finished = parse_delivery_timestamp(finished_at)
    if not started or not finished or finished < started:
        return "—"
    seconds = int((finished - started).total_seconds())
    if seconds < 60:
        return f"{seconds}s"
    return f"{seconds // 60}m {seconds % 60:02d}s"


def phase_intervals(phase: dict[str, Any]) -> tuple[list[tuple[datetime, datetime]], bool]:
    attempts = phase.get("attempts")
    if isinstance(attempts, list):
        intervals = [
            (start, finish)
            for item in attempts
            if isinstance(item, dict)
            for start, finish in [(parse_delivery_timestamp(item.get("started_at")), parse_delivery_timestamp(item.get("finished_at")))]
            if start and finish and finish >= start
        ]
        return intervals, True
    start = parse_delivery_timestamp(phase.get("started_at"))
    finish = parse_delivery_timestamp(phase.get("finished_at"))
    return ([(start, finish)] if start and finish and finish >= start else []), False


def phase_attempt_records(phase: dict[str, Any]) -> list[tuple[datetime, datetime | None]]:
    raw_attempts = phase.get("attempts")
    if not isinstance(raw_attempts, list):
        raw_attempts = [{"started_at": phase.get("started_at"), "finished_at": phase.get("finished_at")}]
    records: list[tuple[datetime, datetime | None]] = []
    for item in raw_attempts:
        if not isinstance(item, dict):
            continue
        start = parse_delivery_timestamp(item.get("started_at"))
        finish = parse_delivery_timestamp(item.get("finished_at"))
        if start and (finish is None or finish >= start):
            records.append((start, finish))
    return records


def intervals_duration(intervals: list[tuple[datetime, datetime]]) -> str:
    seconds = sum(int((finish - start).total_seconds()) for start, finish in intervals)
    if seconds < 60:
        return f"{seconds}s"
    return f"{seconds // 60}m {seconds % 60:02d}s"


def story_title(workspace: Path, delivery: dict[str, Any], progress: dict[str, Any]) -> str:
    story_path = str(delivery.get("story_path") or progress.get("story_path") or "").strip()
    embedded_title = str(delivery.get("story_title") or progress.get("story_title") or "").strip()
    if embedded_title:
        return embedded_title
    if not story_path:
        return ""
    configured_docs = Path(str(delivery.get("docs_dir") or progress.get("docs_dir") or workspace.parent)).expanduser()
    for docs_dir in dict.fromkeys((configured_docs, workspace.parent)):
        metadata = read_delivery_json(docs_dir / story_path / "metadata.json", {})
        title = str(metadata.get("title") or "").strip()
        if title:
            return title
    return ""


def delivery_stages(phases: object) -> list[dict[str, Any]]:
    source = [phase for phase in phases or [] if isinstance(phase, dict)]
    definitions = [
        ("preflight", "Preflight", {"preflight", "worktrees", "jira_start"}),
        ("implement", "Implement", {"agent"}),
        ("verification", "Verification", {"verification"}),
        ("pr", "PR", {"finalize", "jira_done"}),
        ("notification", "Notification", {"notify"}),
    ]
    stages: list[dict[str, Any]] = []
    for stage_id, label, phase_ids in definitions:
        matched = [phase for phase in source if str(phase.get("id") or "") in phase_ids]
        statuses = [str(phase.get("status") or "pending").lower() for phase in matched]
        if any(status in {"failed", "blocked"} for status in statuses):
            status = "failed"
        elif any(status in {"in_progress", "running"} for status in statuses):
            status = "in_progress"
        elif matched and all(status in {"completed", "skipped"} for status in statuses):
            status = "completed"
        else:
            status = "pending"
        interval_sets = [phase_intervals(phase) for phase in matched]
        intervals = [interval for values, _ in interval_sets for interval in values]
        starts = [start for start, _ in intervals]
        finishes = [finish for _, finish in intervals]
        all_attempts = [attempt for phase in matched for attempt in phase_attempt_records(phase)]
        started_at = min((start for start, _ in all_attempts), default=min(starts) if starts else None)
        started_at = started_at.isoformat().replace("+00:00", "Z") if started_at else ""
        finished_at = max(finishes).isoformat().replace("+00:00", "Z") if finishes else ""
        detail = " · ".join(dict.fromkeys(str(phase.get("detail") or "").strip() for phase in matched if phase.get("detail")))
        attempts = [
            {
                "number": index + 1,
                "started_at": start.isoformat().replace("+00:00", "Z"),
                "finished_at": finish.isoformat().replace("+00:00", "Z") if finish else "",
                "duration": delivery_duration(start, finish) if finish else "Running",
            }
            for index, (start, finish) in enumerate(all_attempts)
        ]
        stages.append({
            "id": stage_id,
            "label": label,
            "status": status,
            "started_at": started_at,
            "finished_at": finished_at,
            "duration": intervals_duration(intervals) if intervals else "—",
            "duration_kind": "active" if matched and all(has_attempts for _, has_attempts in interval_sets) else "span",
            "active_started_at": next((start.isoformat().replace("+00:00", "Z") for start, finish in reversed(all_attempts) if finish is None), ""),
            "attempts": attempts,
            "detail": detail,
        })
    return stages


def delivery_payload(workspace: Path) -> dict[str, Any]:
    history_dir = workspace / "history" / "delivery"
    runs: list[dict[str, Any]] = []
    if history_dir.is_dir():
        for source in sorted(history_dir.glob("*.json"), key=lambda path: path.stat().st_mtime, reverse=True)[:20]:
            item = read_delivery_json(source, {})
            delivery = item.get("delivery") if isinstance(item.get("delivery"), dict) else {}
            progress = item.get("progress") if isinstance(item.get("progress"), dict) else {}
            touched = delivery.get("repos_touched") if isinstance(delivery.get("repos_touched"), list) else []
            pull_requests = [
                {"repository": str(repo.get("name") or "Repository"), "url": str(repo.get("pr_url"))}
                for repo in touched
                if isinstance(repo, dict) and str(repo.get("pr_url") or "").strip()
            ]
            if not pull_requests:
                pull_requests = [
                    {"repository": "Pull request", "url": str(url)}
                    for url in delivery.get("pr_urls") or []
                    if str(url).strip()
                ]
            runs.append(
                {
                    "run_id": item.get("run_id") or source.stem,
                    "status": delivery.get("delivery_status") or progress.get("delivery_status") or "unknown",
                    "story": delivery.get("story_id") or progress.get("story_id") or "",
                    "story_title": story_title(workspace, delivery, progress),
                    "jira_key": delivery.get("jira_key") or progress.get("jira_key") or "",
                    "branch": delivery.get("branch") or progress.get("branch") or "",
                    "pull_requests": pull_requests,
                    "verification": delivery.get("verification_results") or progress.get("verification") or [],
                    "started_at": progress.get("started_at") or delivery.get("started_at") or "",
                    "finished_at": progress.get("finished_at") or delivery.get("finished_at") or "",
                    "log_file": item.get("log_file") or progress.get("log_file") or "",
                    "agent_trace": delivery.get("agent_trace") or {},
                }
            )
    progress = read_delivery_json(workspace / "results" / "delivery-progress.json", {})
    result = read_delivery_json(workspace / "results" / "delivery-result.json", {})
    terminal_states = {"completed", "failed", "blocked", "dev_done", "pr_open"}
    progress_run_id = str(progress.get("run_id") or "").strip()
    result_run_id = str(result.get("run_id") or "").strip()
    result_matches_progress = not progress_run_id or result_run_id == progress_run_id
    if progress_run_id and not result_run_id:
        result_matches_progress = bool(
            result.get("started_at") and result.get("started_at") == progress.get("started_at")
        )
    if str(result.get("delivery_status") or "") in terminal_states and (
        result_matches_progress
    ):
        current = {**progress, **result}
        current["started_at"] = progress.get("started_at") or result.get("started_at") or ""
        current["finished_at"] = result.get("finished_at") or progress.get("finished_at") or ""
        current["current_phase"] = "completed" if result.get("delivery_status") == "completed" else result.get("delivery_status")
        current["verification"] = result.get("verification_results") or progress.get("verification") or []
    else:
        current = progress
    lock = workspace / "locks" / "delivery-run"
    pid_path = lock / "pid"
    active = False
    try:
        pid = int(pid_path.read_text(encoding="utf-8").strip())
        os.kill(pid, 0)
        active = True
    except (OSError, ValueError):
        pass
    if str(current.get("delivery_status") or "").lower() in {"in_progress", "running"} and not active:
        current = dict(current)
        current["delivery_status"] = "failed"
        current["finished_at"] = current.get("updated_at") or current.get("started_at") or ""
        current["current_step"] = "Delivery process is no longer running"
    remediation = read_delivery_json(workspace / "results" / "delivery-remediation.json", {})
    if not remediation and isinstance(result.get("remediation"), dict):
        remediation = result["remediation"]
    if str(current.get("delivery_status") or "").lower() == "blocked" and str(current.get("current_step") or "").lower() == "stopped from dashboard":
        remediation = {}
    if remediation:
        current["remediation"] = remediation
    if isinstance(result.get("agent_trace"), dict):
        current["agent_trace"] = result["agent_trace"]
    current["story_title"] = story_title(workspace, result, progress)
    current["stages"] = delivery_stages(current.get("phases"))
    activity_path = workspace / "state" / "delivery-scheduler-activity.jsonl"
    activity: list[dict[str, Any]] = []
    if activity_path.is_file():
        for line in activity_path.read_text(encoding="utf-8", errors="replace").splitlines()[-24:]:
            try:
                event = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(event, dict):
                activity.append(event)
    return {
        "current": current,
        "runs": runs,
        "available_stories": available_delivery_stories(workspace, current),
        "scheduler_activity": list(reversed(activity)),
        "scheduler_log_available": (workspace / "logs" / "delivery-schedule.log").is_file(),
        "config": read_delivery_json(workspace / "config" / "delivery.json", {}),
    }


def available_delivery_stories(workspace: Path, current: dict[str, Any]) -> list[dict[str, str]]:
    docs_value = str(current.get("docs_dir") or "").strip()
    if docs_value:
        docs_dir = Path(docs_value).expanduser()
    else:
        workspace_config = load_json(workspace / "config" / "workspace.json", {})
        docs_dir = Path(str(workspace_config.get("docs_repo") or workspace.parent)).expanduser()
    stories = docs_dir / "stories"
    if not stories.is_dir():
        return []
    result: list[dict[str, str]] = []
    for story_dir in sorted(item for item in stories.iterdir() if item.is_dir()):
        metadata = read_delivery_json(story_dir / "metadata.json", {})
        if str(metadata.get("businessStatus") or "").casefold() != "ready":
            continue
        if str(metadata.get("technicalStatus") or "").casefold() != "approved":
            continue
        if str(metadata.get("deliveryStatus") or "not_started").casefold() not in {"", "not_started", "blocked"}:
            continue
        result.append({"story": story_dir.name, "jira_key": str(metadata.get("jiraKey") or ""), "title": str(metadata.get("title") or "")})
    return result


def trace_directory(workspace: Path, run_id: str) -> Path:
    if not re.fullmatch(r"[A-Za-z0-9._-]+", run_id):
        raise ValueError("Invalid trace id")
    for candidate in (
        workspace / "results" / "agent-traces" / run_id,
        workspace / "history" / "delivery" / run_id / "agent-trace",
    ):
        if (candidate / "trace.json").is_file():
            return candidate
    raise ValueError("Agent trace is no longer available")


def capped_text(path: Path, maximum: int = 65536) -> tuple[str, bool]:
    try:
        data = path.read_bytes()
    except OSError:
        return "", False
    truncated = len(data) > maximum
    return data[-maximum:].decode("utf-8", errors="replace"), truncated


def capped_ndjson(path: Path, maximum: int = 500) -> list[dict[str, Any]]:
    text_value, _ = capped_text(path, 512 * 1024)
    events: list[dict[str, Any]] = []
    for line in text_value.splitlines()[-maximum:]:
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue
        if isinstance(event, dict):
            events.append(event)
    return events


def delivery_trace_payload(workspace: Path, run_id: str) -> dict[str, Any]:
    root = trace_directory(workspace, run_id)
    trace = read_delivery_json(root / "trace.json", {})
    invocations = []
    for summary in trace.get("invocations", []):
        if not isinstance(summary, dict):
            continue
        invocation_id = str(summary.get("invocation_id") or "")
        if not re.fullmatch(r"[A-Za-z0-9._-]+", invocation_id):
            continue
        directory = root / "agents" / invocation_id
        stdout, stdout_truncated = capped_text(directory / "stdout.log")
        stderr, stderr_truncated = capped_text(directory / "stderr.log")
        prompt, prompt_truncated = capped_text(directory / "prompt.md", 100 * 1024)
        output, output_truncated = capped_text(directory / "final-output.md", 100 * 1024)
        invocations.append({
            **summary,
            "request": read_delivery_json(directory / "request.json", {}),
            "result": read_delivery_json(directory / "result.json", {}),
            "context_manifest": read_delivery_json(directory / "context-manifest.json", {}),
            "changed_files": read_delivery_json(directory / "changed-files.json", {}),
            "events": capped_ndjson(directory / "events.ndjson"),
            "prompt": prompt,
            "stdout": stdout,
            "stderr": stderr,
            "final_output": output,
            "truncated": {"prompt": prompt_truncated, "stdout": stdout_truncated, "stderr": stderr_truncated, "final_output": output_truncated},
        })
    return {"trace": trace, "spans": capped_ndjson(root / "spans.ndjson", 200), "invocations": invocations, "local_evidence": True}


class DashboardServer(ThreadingHTTPServer):
    def __init__(self, address: tuple[str, int], workspace: Path, project: str, lumen_bin: str, lumen_home: str):
        super().__init__(address, DashboardHandler)
        self.workspace = workspace
        self.project = project
        self.lumen_bin = lumen_bin
        self.lumen_home = lumen_home

    def project_context(self, slug: str | None = None) -> tuple[Path, str, list[dict[str, Any]]]:
        registry = load_registry()
        entries = [
            {"name": str(entry.get("name") or entry.get("slug") or "Workspace"), "slug": str(entry.get("slug") or ""), "workspace": str(entry.get("workspace") or "")}
            for entry in registry.get("projects", [])
            if str(entry.get("slug") or "") and (Path(str(entry.get("workspace") or "")) / "config" / "common.json").is_file()
        ]
        selected = find_by_slug(registry, slug) if slug else None
        if selected and (Path(str(selected.get("workspace") or "")) / "config" / "common.json").is_file():
            return Path(str(selected["workspace"])).resolve(), str(selected["slug"]), entries
        return self.workspace, self.project, entries

    def dashboard_state(self, slug: str | None = None) -> dict[str, Any]:
        workspace, project, projects = self.project_context(slug)
        data = RENDERER.build_payload(workspace)
        data["interactive"] = {
            "enabled": True,
            "project": project,
            "projects": projects,
            "prompts": prompt_files(workspace),
            "schedules": schedule_payload(workspace, project),
            "workspace": workspace_payload(workspace),
        }
        data["delivery"] = delivery_payload(workspace)
        return data

    def delivery_log(self, workspace: Path, run_id: str) -> dict[str, Any]:
        payload = delivery_payload(workspace)
        current = payload.get("current") if isinstance(payload.get("current"), dict) else {}
        selected = current if not run_id or run_id == current.get("run_id") else next(
            (item for item in payload.get("runs", []) if isinstance(item, dict) and item.get("run_id") == run_id),
            {},
        )
        log_value = str(selected.get("log_file") or "").strip()
        if not log_value:
            raise ValueError("No delivery log is available")
        log_file = Path(log_value).expanduser()
        try:
            log_file.resolve().relative_to(workspace.resolve())
        except ValueError as exc:
            raise ValueError("Invalid delivery log path") from exc
        if not log_file.is_file():
            raise ValueError("Delivery log is no longer available")
        lines = log_file.read_text(encoding="utf-8", errors="replace").splitlines()
        return {"run_id": selected.get("run_id", ""), "path": str(log_file.relative_to(workspace)), "content": "\n".join(lines[-220:])}

    def delivery_scheduler_log(self, workspace: Path) -> dict[str, Any]:
        log_file = workspace / "logs" / "delivery-schedule.log"
        if not log_file.is_file():
            raise ValueError("No scheduler log is available yet")
        lines = log_file.read_text(encoding="utf-8", errors="replace").splitlines()
        return {"path": str(log_file.relative_to(workspace)), "content": "\n".join(lines[-220:])}

    def retry_delivery(self, workspace: Path, story_override: str = "") -> dict[str, Any]:
        progress = read_delivery_json(workspace / "results" / "delivery-progress.json", {})
        if not story_override and str(progress.get("delivery_status") or "").lower() not in {"failed", "blocked", "not_started", ""}:
            raise ValueError("Only a stopped, failed, blocked, or not-started delivery can be started")
        if (workspace / "locks" / "delivery-run").exists():
            raise RuntimeError("A delivery run is already active")
        docs_value = str(progress.get("docs_dir") or "").strip()
        if docs_value:
            docs_dir = Path(docs_value).expanduser().resolve()
        else:
            workspace_config = load_json(workspace / "config" / "workspace.json", {})
            docs_dir = Path(str(workspace_config.get("docs_repo") or workspace.parent)).expanduser().resolve()
        story_ref = str(story_override or progress.get("story_id") or progress.get("jira_key") or "").strip()
        if not story_ref or workspace_lumen_dir(docs_dir).resolve() != workspace.resolve():
            raise ValueError("The failed delivery does not have a retryable workspace and story")
        context = load_story_context(docs_dir, story_ref, validate_gates=False)
        delivery_config = load_json(workspace / "config" / "delivery.json", {})
        jira_config = jira_delivery_config(delivery_config)
        jira_enabled, _ = should_sync_jira(delivery_config)
        reset_status = str(
            ((delivery_config.get("automation") or {}).get("scheduled_delivery") or {}).get("required_jira_status") or "Ready for Dev"
        ).strip()
        if jira_enabled and context.metadata.get("jiraKey") and reset_status:
            refreshed, reason = refresh_twg_auth(force=True)
            if not refreshed:
                raise RuntimeError(reason)
            transition_issue(str(context.metadata["jiraKey"]), reset_status, jira_config)
            add_delivery_comment(str(context.metadata["jiraKey"]), "Lumen Delivery · Reset\n\n- Failed run reset; a new delivery run will start.", jira_config)
        cleaned = cleanup_delivery_worktrees(docs_dir, story_ref)
        metadata = load_json(context.metadata_path, {})
        metadata["deliveryStatus"] = "not_started"
        metadata["updatedAt"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        metadata["deliveryResetAt"] = utc_now()
        for key in ("deliveryBranch", "prUrl", "jira_pr_url"):
            metadata.pop(key, None)
        write_json(context.metadata_path, metadata)
        env = dict(os.environ, LUMEN_HOME=self.lumen_home)
        subprocess.Popen(
            [self.lumen_bin, "delivery", "run", str(docs_dir), "--story", story_ref],
            cwd=docs_dir, env=env, start_new_session=True,
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        return {"story": story_ref, "started_at": utc_now(), "worktrees": cleaned, "jira_status": reset_status if jira_enabled else "unchanged"}

    def stop_delivery(self, workspace: Path) -> dict[str, Any]:
        lock = workspace / "locks" / "delivery-run"
        pid_path = lock / "pid"
        if not pid_path.is_file():
            raise ValueError("No active delivery run was found")
        try:
            pid = int(pid_path.read_text(encoding="utf-8").strip())
        except ValueError as exc:
            raise ValueError("Delivery process id is invalid") from exc
        terminate_process_tree(pid)
        deadline = time.monotonic() + 2
        while time.monotonic() < deadline:
            try:
                os.kill(pid, 0)
            except OSError:
                break
            time.sleep(0.05)

        progress_path = workspace / "results" / "delivery-progress.json"
        progress = read_delivery_json(progress_path, {})
        finished_at = utc_now()
        for phase in progress.get("phases") or []:
            if not isinstance(phase, dict) or str(phase.get("status") or "").lower() not in {"in_progress", "running"}:
                continue
            phase["status"] = "blocked"
            phase["finished_at"] = finished_at
            phase["detail"] = "Stopped from Dashboard"
            attempts = phase.get("attempts")
            if isinstance(attempts, list) and attempts and isinstance(attempts[-1], dict) and not attempts[-1].get("finished_at"):
                attempts[-1]["finished_at"] = finished_at
        progress["delivery_status"] = "blocked"
        progress["current_step"] = "Stopped from Dashboard"
        progress["finished_at"] = finished_at
        progress["updated_at"] = progress["finished_at"]
        write_json(progress_path, progress)
        try:
            delivery_config = load_json(workspace / "config" / "delivery.json", {})
            jira_enabled, _ = should_sync_jira(delivery_config)
            jira_key = str(progress.get("jira_key") or "").strip()
            blocked_status = str(jira_delivery_config(delivery_config).get("blocked_status") or "Block").strip()
            if jira_enabled and jira_key and blocked_status:
                refreshed, _ = refresh_twg_auth(force=True)
                if refreshed:
                    transition_issue(jira_key, blocked_status, jira_delivery_config(delivery_config))
        except Exception:
            pass

        docs_value = str(progress.get("docs_dir") or "").strip()
        if docs_value:
            docs_dir = Path(docs_value).expanduser().resolve()
        else:
            workspace_config = load_json(workspace / "config" / "workspace.json", {})
            docs_dir = Path(str(workspace_config.get("docs_repo") or workspace.parent)).expanduser().resolve()
        story_ref = str(progress.get("story_id") or progress.get("jira_key") or "").strip()
        cleaned: list[str] = []
        if story_ref and workspace_lumen_dir(docs_dir).resolve() == workspace.resolve():
            cleaned = cleanup_delivery_worktrees(docs_dir, story_ref)
        story_path = str(progress.get("story_path") or "").strip()
        if story_path:
            metadata_path = (docs_dir / story_path / "metadata.json").resolve()
            metadata = read_delivery_json(metadata_path, {})
            if metadata:
                metadata["deliveryStatus"] = "blocked"
                metadata["updatedAt"] = finished_at[:10]
                logs = metadata.get("logs") if isinstance(metadata.get("logs"), list) else []
                logs.append({"type": "delivery.run", "at": finished_at, "status": "blocked", "result": "stopped"})
                metadata["logs"] = logs[-20:]
                write_json(metadata_path, metadata)

        result = {
            "schema_version": "1.0",
            "run_id": progress.get("run_id", ""),
            "delivery_status": "blocked",
            "current_step": "Stopped from Dashboard",
            "story_id": progress.get("story_id", ""),
            "story_path": progress.get("story_path", ""),
            "jira_key": progress.get("jira_key", ""),
            "docs_dir": progress.get("docs_dir", str(docs_dir)),
            "workspace_root": progress.get("workspace_root", str(workspace)),
            "branch": progress.get("branch", ""),
            "started_at": progress.get("started_at", ""),
            "finished_at": finished_at,
            "verification_results": progress.get("verification", []),
            "repos_touched": progress.get("repositories", []),
            "pr_urls": [],
            "publish_mode": "none",
            "failures": [{"label": "Stopped from Dashboard", "summary": "Delivery was stopped by the user before completion."}],
        }
        result_path = workspace / "results" / "delivery-result.json"
        write_json(result_path, result)
        archive_script = SCRIPT_DIR / "archive_delivery_run.py"
        if archive_script.is_file():
            subprocess.run([
                sys.executable, str(archive_script), "--workspace-root", str(docs_dir),
                "--result", str(result_path), "--progress", str(progress_path),
                "--log-file", str(progress.get("log_file") or ""),
            ], capture_output=True, text=True, check=False)
        shutil.rmtree(lock, ignore_errors=True)
        return {"pid": pid, "story": story_ref, "worktrees": cleaned}

    def delete_delivery_history(self, workspace: Path, run_id: str) -> dict[str, Any]:
        if not re.fullmatch(r"[A-Za-z0-9._-]+", run_id):
            raise ValueError("Invalid delivery run id")
        current = delivery_payload(workspace).get("current") or {}
        if run_id == str(current.get("run_id") or "") and (workspace / "locks" / "delivery-run").exists():
            raise ValueError("The active delivery cannot be deleted")
        history_json = workspace / "history" / "delivery" / f"{run_id}.json"
        if not history_json.is_file():
            raise ValueError("Delivery history record was not found")
        item = read_delivery_json(history_json, {})
        removed: list[str] = []
        log_value = str(item.get("log_file") or "").strip()
        if log_value:
            log_path = Path(log_value).expanduser()
            try:
                log_path.resolve().relative_to(workspace.resolve())
                if log_path.is_file():
                    log_path.unlink()
                    removed.append(str(log_path))
            except ValueError:
                pass
        for path in (
            history_json,
            workspace / "history" / "delivery" / run_id,
            workspace / "results" / "agent-traces" / run_id,
        ):
            if path.is_dir():
                shutil.rmtree(path)
                removed.append(str(path))
            elif path.is_file():
                path.unlink()
                removed.append(str(path))
        return {"run_id": run_id, "removed": removed}

    def update_observability(self, workspace: Path, body: dict[str, Any]) -> dict[str, Any]:
        mode = str(body.get("capture_mode") or "").strip().lower()
        if mode not in {"off", "metadata", "full"}:
            raise ValueError("Capture mode must be off, metadata, or full")
        retention = int(body.get("retention_days", 14))
        if retention < 1 or retention > 3650:
            raise ValueError("Retention must be between 1 and 3650 days")
        path = workspace / "config" / "delivery.json"
        config = load_json(path, {})
        observability = config.setdefault("observability", {})
        if not isinstance(observability, dict):
            raise ValueError("Invalid observability configuration")
        observability["agent_trace"] = {"enabled": mode != "off", "capture_mode": mode, "retention_days": retention}
        write_json(path, config)
        return observability["agent_trace"]

    def update_schedule(self, body: dict[str, Any], workspace: Path, project: str) -> dict[str, Any]:
        kind = str(body.get("kind", ""))
        action = str(body.get("action", ""))
        if kind not in {"scan", "delivery"} or action not in {"save", "remove"}:
            raise ValueError("Invalid schedule request")
        if action == "remove":
            func = remove_scan_schedule if kind == "scan" else remove_delivery_schedule
            func(argparse.Namespace(project=project))
            if kind == "delivery":
                config_path = workspace / "config" / "delivery.json"
                config = load_json(config_path, {})
                automation = config.setdefault("automation", {})
                scheduled = automation.setdefault("scheduled_delivery", {})
                scheduled["enabled"] = False
                write_json(config_path, config)
            return schedule_payload(workspace, project)

        if kind == "scan":
            cron = str(body.get("cron", "")).strip()
            if not cron:
                raise ValueError("A scan cron expression is required")
            args = argparse.Namespace(
                project=project,
                cron=cron,
                lumen_bin=self.lumen_bin,
                lumen_home=self.lumen_home,
                path=os.environ.get("PATH", ""),
                log_file=str(workspace / "logs" / "schedule.log"),
                dry_run=False,
            )
            if install_scan_schedule(args) != 0:
                raise RuntimeError("Unable to install scan schedule")
        else:
            interval = int(body.get("interval_minutes", 0))
            if interval < 1:
                raise ValueError("Delivery interval must be at least one minute")
            jira_status = str(body.get("jira_status", "Ready for Dev")).strip() or "Ready for Dev"
            in_dev_status = str(body.get("in_dev_status", "")).strip()
            dev_done_status = str(body.get("dev_done_status", "")).strip()
            blocked_status = str(body.get("blocked_status", "Block")).strip() or "Block"
            args = argparse.Namespace(
                project=project,
                cron=f"*/{interval} * * * *",
                jira_status=jira_status,
                lumen_bin=self.lumen_bin,
                lumen_home=self.lumen_home,
                path=os.environ.get("PATH", ""),
                log_file=str(workspace / "logs" / "delivery-schedule.log"),
            )
            if install_delivery_schedule(args) != 0:
                raise RuntimeError("Unable to install delivery schedule")
            config_path = workspace / "config" / "delivery.json"
            config = load_json(config_path, {})
            automation = config.setdefault("automation", {})
            scheduled = automation.setdefault("scheduled_delivery", {})
            scheduled.update({"enabled": True, "required_jira_status": jira_status})
            jira = config.setdefault("jira", {})
            if in_dev_status:
                jira["in_dev_status"] = in_dev_status
            if dev_done_status:
                jira["dev_done_status"] = dev_done_status
            jira["blocked_status"] = blocked_status
            write_json(config_path, config)
        return schedule_payload(workspace, project)


class DashboardHandler(SimpleHTTPRequestHandler):
    server: DashboardServer

    def log_message(self, _format: str, *_args: Any) -> None:
        return

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)
        workspace, project, _ = self.server.project_context(query.get("project", [""])[0])
        if parsed.path == "/api/state":
            return self.respond_json(HTTPStatus.OK, self.server.dashboard_state(project))
        if parsed.path == "/api/prompt":
            try:
                path = safe_prompt_path(workspace, query.get("mode", [""])[0], query.get("path", [""])[0])
                return self.respond_json(HTTPStatus.OK, {"content": path.read_text(encoding="utf-8")})
            except (OSError, ValueError) as exc:
                return self.respond_error(HTTPStatus.BAD_REQUEST, str(exc))
        if parsed.path == "/api/integration":
            try:
                key = query.get("key", [""])[0]
                return self.respond_json(HTTPStatus.OK, {"key": key, "value": integration_value(workspace, key)})
            except (OSError, ValueError) as exc:
                return self.respond_error(HTTPStatus.BAD_REQUEST, str(exc))
        if parsed.path == "/api/delivery/log":
            try:
                return self.respond_json(HTTPStatus.OK, self.server.delivery_log(workspace, query.get("run_id", [""])[0]))
            except (OSError, ValueError) as exc:
                return self.respond_error(HTTPStatus.BAD_REQUEST, str(exc))
        if parsed.path == "/api/delivery/scheduler-log":
            try:
                return self.respond_json(HTTPStatus.OK, self.server.delivery_scheduler_log(workspace))
            except ValueError as exc:
                return self.respond_error(HTTPStatus.BAD_REQUEST, str(exc))
        if parsed.path == "/api/delivery/trace":
            try:
                return self.respond_json(HTTPStatus.OK, delivery_trace_payload(workspace, query.get("run_id", [""])[0]))
            except (OSError, ValueError) as exc:
                return self.respond_error(HTTPStatus.BAD_REQUEST, str(exc))
        if parsed.path == "/api/delivery/status-options":
            return self.respond_json(HTTPStatus.OK, jira_status_options(workspace))
        if parsed.path in {"/", "/dashboard.html", "/scan", "/delivery", "/repositories", "/prompts", "/settings"}:
            return self.serve_file(self.server.workspace / "dashboard.html", "text/html; charset=utf-8")
        if parsed.path == "/dashboard-data.js":
            return self.serve_file(self.server.workspace / "dashboard-data.js", "application/javascript; charset=utf-8")
        if parsed.path == "/assets/lumen-mark.png":
            return self.serve_file(self.server.workspace / "assets" / "lumen-mark.png", "image/png")
        try:
            path = safe_workspace_static_path(workspace, parsed.path)
        except ValueError:
            return self.respond_error(HTTPStatus.NOT_FOUND, "Not found")
        content_type, _ = mimetypes.guess_type(path.name)
        return self.serve_file(path, content_type or "application/octet-stream")

    def do_POST(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        try:
            body = self.read_json_body()
            workspace, project, _ = self.server.project_context(str(body.get("project", "")))
            if parsed.path == "/api/issue/ignore":
                issue_id = str(body.get("issue_id", "")).strip()
                if not issue_id:
                    raise ValueError("Issue id is required")
                issue = set_issue_status(workspace, issue_id, "ignored", str(body.get("reason", "")).strip())
                return self.respond_json(HTTPStatus.OK, {"issue": issue})
            if parsed.path == "/api/schedule":
                return self.respond_json(HTTPStatus.OK, {"schedules": self.server.update_schedule(body, workspace, project)})
            if parsed.path == "/api/prompt":
                path = safe_prompt_path(workspace, str(body.get("mode", "")), str(body.get("path", "")))
                if not path.is_file():
                    raise ValueError("Prompt file does not exist")
                path.write_text(str(body.get("content", "")).rstrip() + "\n", encoding="utf-8")
                return self.respond_json(HTTPStatus.OK, {"saved_at": utc_now()})
            if parsed.path == "/api/workspace":
                days = int(body.get("scan_window_days", 0))
                if days < 1 or days > 365:
                    raise ValueError("Scan window must be between 1 and 365 days")
                path = workspace / "config" / "common.json"
                config = load_json(path, {})
                execution = config.setdefault("execution", {})
                if not isinstance(execution, dict):
                    raise ValueError("Invalid workspace execution configuration")
                execution["scan_window_days"] = days
                if str(body.get("scan_model") or "").strip():
                    execution["model"] = str(body["scan_model"]).strip()
                write_json(path, config)
                delivery_model = str(body.get("delivery_model") or "").strip()
                if delivery_model:
                    delivery_path = workspace / "config" / "delivery.json"
                    delivery = load_json(delivery_path, {})
                    delivery.setdefault("execution", {})["model"] = delivery_model
                    write_json(delivery_path, delivery)
                return self.respond_json(HTTPStatus.OK, {"workspace": workspace_payload(workspace)})
            if parsed.path == "/api/integration":
                update_env_value(workspace, str(body.get("key", "")).strip(), str(body.get("value", "")))
                return self.respond_json(HTTPStatus.OK, {"workspace": workspace_payload(workspace)})
            if parsed.path == "/api/repositories":
                return self.respond_json(HTTPStatus.OK, {"workspace": save_repositories(workspace, body.get("repositories"))})
            if parsed.path == "/api/repositories/clone":
                return self.respond_json(HTTPStatus.OK, {"workspace": clone_repository(workspace, body.get("url"))})
            if parsed.path == "/api/repository/verification":
                return self.respond_json(
                    HTTPStatus.OK,
                    {"workspace": save_delivery_steps(workspace, body.get("repository"), body.get("commands"))},
                )
            if parsed.path == "/api/publish-policy":
                return self.respond_json(
                    HTTPStatus.OK,
                    {"workspace": save_publish_policy(workspace, body.get("scan_mode"), body.get("delivery_mode"))},
                )
            if parsed.path == "/api/observability":
                return self.respond_json(HTTPStatus.OK, {"agent_trace": self.server.update_observability(workspace, body)})
            if parsed.path == "/api/delivery/retry":
                return self.respond_json(HTTPStatus.ACCEPTED, {"delivery": self.server.retry_delivery(workspace)})
            if parsed.path == "/api/delivery/start":
                story = str(body.get("story") or "").strip()
                if not story:
                    current = delivery_payload(workspace).get("current") or {}
                    story = str(current.get("story_id") or current.get("jira_key") or "").strip()
                if not story:
                    candidates = delivery_payload(workspace).get("available_stories") or []
                    story = str(candidates[0].get("story") or "") if candidates else ""
                return self.respond_json(HTTPStatus.ACCEPTED, {"delivery": self.server.retry_delivery(workspace, story)})
            if parsed.path == "/api/delivery/stop":
                return self.respond_json(HTTPStatus.OK, {"delivery": self.server.stop_delivery(workspace)})
            if parsed.path == "/api/delivery/history/delete":
                return self.respond_json(HTTPStatus.OK, {"delivery": self.server.delete_delivery_history(workspace, str(body.get("run_id") or ""))})
            return self.respond_error(HTTPStatus.NOT_FOUND, "Not found")
        except (OSError, ValueError, RuntimeError) as exc:
            return self.respond_error(HTTPStatus.BAD_REQUEST, str(exc))

    def read_json_body(self) -> dict[str, Any]:
        length = int(self.headers.get("Content-Length", "0"))
        payload = json.loads(self.rfile.read(length).decode("utf-8")) if length else {}
        if not isinstance(payload, dict):
            raise ValueError("Request body must be an object")
        return payload

    def respond_json(self, status: HTTPStatus, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def respond_error(self, status: HTTPStatus, message: str) -> None:
        self.respond_json(status, {"error": message})

    def serve_file(self, path: Path, content_type: str) -> None:
        if not path.is_file():
            return self.respond_error(HTTPStatus.NOT_FOUND, "Not found")
        body = path.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace", required=True)
    parser.add_argument("--project", required=True)
    parser.add_argument("--lumen-bin", required=True)
    parser.add_argument("--lumen-home", required=True)
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--version", default="")
    args = parser.parse_args()

    workspace = Path(args.workspace).expanduser().resolve()
    server = DashboardServer(("127.0.0.1", args.port), workspace, args.project, args.lumen_bin, args.lumen_home)
    url = f"http://127.0.0.1:{server.server_port}/"
    state_path = workspace / "state" / "dashboard-server.json"
    write_json(state_path, {"pid": os.getpid(), "url": url, "started_at": utc_now(), "version": args.version})
    print(url, flush=True)
    try:
        server.serve_forever()
    finally:
        if state_path.exists() and load_json(state_path, {}).get("pid") == os.getpid():
            state_path.unlink()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
