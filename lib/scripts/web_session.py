#!/usr/bin/env python3
"""Local authenticated Web development-session lifecycle and broker client."""

from __future__ import annotations

import argparse
import json
import os
import re
import signal
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

from delivery_workspace import load_story_context, read_json, workspace_lumen_dir, write_json
from visual_delivery import (
    dependencies_installed,
    redact,
    repos_config,
    resolve_visual_auth_credential,
    resolve_visual_fixture_file,
    runtime_command,
    visual_auth_env_name,
    wait_ready,
)


def read_env_file(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.is_file():
        return values
    pattern = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*)=(?:\"([^\"]*)\"|'([^']*)'|(.*))$")
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        match = pattern.match(line.strip())
        if match:
            values[match.group(1)] = next((item for item in match.groups()[1:] if item is not None), "").strip()
    return values


def env_local(workspace_root: Path) -> dict[str, str]:
    return read_env_file(workspace_lumen_dir(workspace_root) / ".env.local")


auth_env_name = visual_auth_env_name


def auth_strategy(runtime: dict[str, Any]) -> str:
    value = str(runtime.get("auth_strategy", "existing-session")).strip().casefold()
    return {
        "playwright-storage-state": "storage-state",
        "saved-session": "existing-session",
        "fake-login": "login-endpoint",
    }.get(value, value)


def credential_for(workspace_root: Path, repo_path: Path, repository: str, runtime: dict[str, Any], env: dict[str, str]) -> str:
    name = auth_env_name(repository, runtime)
    project_env = read_env_file(repo_path / ".env.local")
    return str(env.get(name) or project_env.get(name) or env_local(workspace_root).get(name) or resolve_visual_auth_credential(runtime, env) or "").strip()


def json_request(url: str, token: str, method: str = "GET", payload: dict[str, Any] | None = None) -> dict[str, Any]:
    body = json.dumps(payload or {}).encode() if payload is not None else None
    request = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={"content-type": "application/json", "x-lumen-session-token": token},
    )
    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode(errors="replace")
        try:
            payload = json.loads(detail)
            detail = str(payload.get("error", detail))
        except json.JSONDecodeError:
            pass
        raise RuntimeError(detail) from exc


def session_root(workspace_root: Path, run_id: str) -> Path:
    root = workspace_lumen_dir(workspace_root) / "results" / "web-session" / run_id
    root.mkdir(parents=True, exist_ok=True)
    return root


def repository_configs(workspace_root: Path) -> dict[str, dict[str, Any]]:
    payload = read_json(repos_config(workspace_root), {"repositories": []})
    return {
        str(item.get("name")): item
        for item in payload.get("repositories", [])
        if isinstance(item, dict) and str(item.get("name", "")).strip()
    }


def selected_repositories(context: Any, configs: dict[str, dict[str, Any]]) -> list[Any]:
    web = [repo for repo in context.repos if isinstance(configs.get(repo.name, {}).get("runtime"), dict) and configs[repo.name]["runtime"].get("platform") == "web"]
    try:
        from visual_delivery import visual_contract

        contract = visual_contract(context.technical_plan)
        requested = str((contract or {}).get("runtime", {}).get("repository", "")).strip()
        return [repo for repo in web if repo.name == requested] if requested else web
    except (OSError, ValueError):
        return web


def start_one(workspace_root: Path, context: Any, repo: Any, config: dict[str, Any], root: Path, run_id: str, inherited_env: dict[str, str]) -> dict[str, Any]:
    runtime = config.get("runtime") if isinstance(config.get("runtime"), dict) else {}
    if str(config.get("runtime_status", "")).strip() != "ready":
        raise EnvironmentError(f"Web runtime '{repo.name}' is not ready; run lumen doctor and complete its runtime configuration")
    worktree = repo.worktree_path.resolve()
    if not worktree.is_dir():
        raise FileNotFoundError(f"Story worktree does not exist: {worktree}")
    if not dependencies_installed(worktree, runtime):
        command = str(runtime.get("install_command", "")).strip()
        if not command:
            raise EnvironmentError(f"Web runtime '{repo.name}' has no install_command")
        completed = subprocess.run(runtime_command(worktree, runtime, command), cwd=worktree, env=inherited_env, check=False, capture_output=True, text=True)
        if completed.returncode != 0:
            raise EnvironmentError(redact((completed.stderr or completed.stdout or "dependency installation failed").strip(), inherited_env)[-600:])
    session_id = f"web-session-{run_id}-{re.sub(r'[^a-z0-9]+', '-', repo.name.lower()).strip('-')}"
    directory = root / session_id
    directory.mkdir(parents=True, mode=0o700)
    log = directory / "runtime.log"
    handle = log.open("a", encoding="utf-8")
    runtime_process = subprocess.Popen(
        runtime_command(worktree, runtime, str(runtime.get("start_command", ""))),
        cwd=worktree,
        env=inherited_env,
        stdout=handle,
        stderr=subprocess.STDOUT,
        start_new_session=True,
        text=True,
    )
    try:
        wait_ready(str(runtime.get("ready_url", runtime.get("base_url", ""))), int(runtime.get("ready_timeout_seconds", 90)), runtime_process)
    except Exception:
        if runtime_process.poll() is None:
            os.killpg(runtime_process.pid, signal.SIGTERM)
        handle.close()
        raise

    strategy = auth_strategy(runtime)
    mode = str(runtime.get("browser_mode", "managed")).strip().casefold()
    if strategy == "existing-session" and mode != "cdp":
        if runtime_process.poll() is None:
            os.killpg(runtime_process.pid, signal.SIGTERM)
        handle.close()
        raise PermissionError("existing-session authentication requires browser_mode=cdp")
    credential = credential_for(workspace_root, repo.path, repo.name, runtime, inherited_env)
    storage = str(inherited_env.get(str(runtime.get("auth_storage_state_env", "LUMEN_WEB_STORAGE_STATE")), "")).strip()
    if strategy == "storage-state" and not storage and credential and str(runtime.get("auth_login_path", "")).strip():
        strategy = "login-endpoint"
    if strategy == "storage-state" and not storage:
        if runtime_process.poll() is None:
            os.killpg(runtime_process.pid, signal.SIGTERM)
        handle.close()
        raise PermissionError(f"authentication state variable {runtime.get('auth_storage_state_env', 'LUMEN_WEB_STORAGE_STATE')} is not set")
    if strategy == "storage-state" and storage and not Path(storage).is_file():
        if runtime_process.poll() is None:
            os.killpg(runtime_process.pid, signal.SIGTERM)
        handle.close()
        raise PermissionError(f"storage state file is missing: {storage}")
    if strategy == "login-endpoint" and not credential:
        if runtime_process.poll() is None:
            os.killpg(runtime_process.pid, signal.SIGTERM)
        handle.close()
        raise PermissionError(f"authentication variable {auth_env_name(repo.name, runtime)} is not set")
    node_env = dict(inherited_env)
    if credential:
        node_env["LUMEN_WEB_AUTH_CREDENTIAL"] = credential
    node_script = Path(__file__).with_name("web_session_server.js")
    server_log = directory / "browser-server.log"
    server_handle = server_log.open("a", encoding="utf-8")
    node_args = [
        "node", str(node_script), "--repo", str(worktree), "--session-dir", str(directory),
        "--base-url", str(runtime.get("base_url", "")), "--browser-mode", str(runtime.get("browser_mode", "managed")),
        "--cdp-url", str(runtime.get("browser_cdp_url", "")), "--storage-state", storage,
        "--test-id-attribute", str(runtime.get("test_id_attribute", "data-testid")),
        "--browser", str(runtime.get("browser", "chromium")), "--auth-strategy", strategy,
        "--login-path", str(runtime.get("auth_login_path", "")), "--login-method", str(runtime.get("auth_login_method", "POST")),
        "--login-field", str(runtime.get("auth_login_field", "wiw")), "--identity", str(runtime.get("auth_identity", "")),
        "--trace-id", run_id,
        "--fixture-file", str(resolve_visual_fixture_file(workspace_root, context.story_dir, repo.path, runtime) or ""),
        "--viewport-width", str((runtime.get("viewport") or {}).get("width", 1440)),
        "--viewport-height", str((runtime.get("viewport") or {}).get("height", 900)),
    ]
    try:
        browser_process = subprocess.Popen(node_args, cwd=worktree, env=node_env, stdout=server_handle, stderr=subprocess.STDOUT, start_new_session=True, text=True)
    except Exception:
        server_handle.close()
        if runtime_process.poll() is None:
            os.killpg(runtime_process.pid, signal.SIGTERM)
        handle.close()
        raise
    server_file = directory / "server.json"
    deadline = time.monotonic() + 20
    while time.monotonic() < deadline and not server_file.is_file():
        if browser_process.poll() is not None:
            if runtime_process.poll() is None:
                os.killpg(runtime_process.pid, signal.SIGTERM)
            handle.close(); server_handle.close()
            raise RuntimeError(f"authenticated browser session exited; see {server_log}")
        time.sleep(0.1)
    if not server_file.is_file():
        if runtime_process.poll() is None:
            os.killpg(runtime_process.pid, signal.SIGTERM)
        if browser_process.poll() is None:
            os.killpg(browser_process.pid, signal.SIGTERM)
        handle.close(); server_handle.close()
        raise TimeoutError(f"authenticated browser session did not start; see {server_log}")
    server = read_json(server_file)
    session = {
        "schema_version": "1.0", "session_id": session_id, "trace_id": run_id,
        "repository": repo.name, "worktree": str(worktree), "platform": "web",
        "base_url": str(runtime.get("base_url", "")), "browser_mode": str(runtime.get("browser_mode", "managed")),
        "browser": str(runtime.get("browser", "chromium")),
        "authentication": {"status": "ready", "identity": str(runtime.get("auth_identity", "configured identity"))},
        "viewport": runtime.get("viewport") or {"width": 1440, "height": 900},
        "test_id_attribute": str(runtime.get("test_id_attribute", "data-testid")),
        "capabilities": server.get("session", {}).get("capabilities", []),
        "fixtures": server.get("session", {}).get("fixtures", {}),
        "session_dir": str(directory), "control_url": server.get("url", ""),
        "operation_command": f"python3 {Path(__file__)} request --session-dir {directory} --operation <operation> --json '<payload>'",
        "runtime_pid": runtime_process.pid, "browser_pid": browser_process.pid, "status": "ready",
        "started_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    write_json(directory / "session.json", session)
    handle.close(); server_handle.close()
    return session


def start(args: argparse.Namespace) -> int:
    context = load_story_context(Path(args.docs_dir), args.story, validate_gates=False)
    configs = repository_configs(context.workspace_root)
    root = session_root(context.workspace_root, args.run_id)
    sessions: list[dict[str, Any]] = []
    context_path = root / "session-context.json"
    write_json(context_path, {"schema_version": "1.0", "run_id": args.run_id, "status": "starting", "sessions": sessions})
    try:
        for repo in selected_repositories(context, configs):
            sessions.append(start_one(context.workspace_root, context, repo, configs[repo.name], root, args.run_id, dict(os.environ)))
            write_json(context_path, {"schema_version": "1.0", "run_id": args.run_id, "status": "starting", "sessions": sessions})
    except Exception:
        stop_sessions(root, status="failed")
        raise
    context_payload = {"schema_version": "1.0", "run_id": args.run_id, "status": "ready", "sessions": sessions}
    write_json(context_path, context_payload)
    write_json(root.parent / "current.json", {"run_id": args.run_id, "context": str(root / "session-context.json")})
    print(json.dumps(context_payload, ensure_ascii=False))
    return 0


def stop_sessions(root: Path, status: str = "completed") -> dict[str, Any]:
    context_path = root / "session-context.json"
    context = read_json(context_path, {"sessions": []})
    summary_sessions: list[dict[str, Any]] = []
    for item in context.get("sessions", []):
        if not isinstance(item, dict):
            continue
        directory = Path(str(item.get("session_dir", "")))
        server = read_json(directory / "server.json", {})
        current: dict[str, Any] = {}
        if server.get("url") and server.get("token"):
            try:
                current = json_request(f"{server['url']}/health", str(server["token"])) .get("session", {})
                json_request(f"{server['url']}/shutdown", str(server["token"]), method="POST")
            except (OSError, RuntimeError):
                pass
        pid = int(item.get("runtime_pid", 0) or 0)
        if pid:
            try:
                os.killpg(pid, signal.SIGTERM)
            except (ProcessLookupError, PermissionError):
                pass
        browser_pid = int(item.get("browser_pid", 0) or 0)
        if browser_pid:
            try:
                os.killpg(browser_pid, signal.SIGTERM)
            except (ProcessLookupError, PermissionError):
                pass
        merged = {**item, **{key: current[key] for key in ("observations", "screenshots", "actions", "console_errors", "network_failures") if key in current}, "status": status, "closed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
        write_json(directory / "session.json", merged)
        summary_sessions.append({key: merged.get(key) for key in ("session_id", "repository", "status", "authentication", "base_url", "observations", "screenshots", "actions", "console_errors", "network_failures", "session_dir")})
    result = {"status": status, "run_id": context.get("run_id", root.name), "sessions": summary_sessions}
    write_json(root / "session-context.json", {**context, "status": status, "sessions": [read_json(Path(str(item.get("session_dir", ""))) / "session.json", item) for item in context.get("sessions", []) if isinstance(item, dict)]})
    return result


def stop(args: argparse.Namespace) -> int:
    root = Path(args.session_root)
    summary = stop_sessions(root, args.status)
    if args.result:
        result_path = Path(args.result)
        payload = read_json(result_path, {})
        payload["web_session"] = {"status": summary["status"], "sessions": summary["sessions"], "session_root": str(root)}
        write_json(result_path, payload)
    print(json.dumps(summary, ensure_ascii=False))
    return 0


def request(args: argparse.Namespace) -> int:
    directory = Path(args.session_dir)
    server = read_json(directory / "server.json", {})
    payload: dict[str, Any] = {"operation": args.operation}
    if args.json:
        payload.update(json.loads(args.json))
    result = json_request(f"{server['url']}/rpc", str(server["token"]), method="POST", payload=payload)
    print(json.dumps(result, ensure_ascii=False))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    start_parser = sub.add_parser("start")
    start_parser.add_argument("--docs-dir", required=True); start_parser.add_argument("--story", default=""); start_parser.add_argument("--run-id", required=True)
    stop_parser = sub.add_parser("stop")
    stop_parser.add_argument("--session-root", required=True); stop_parser.add_argument("--result", default=""); stop_parser.add_argument("--status", default="completed")
    request_parser = sub.add_parser("request")
    request_parser.add_argument("--session-dir", required=True); request_parser.add_argument("--operation", required=True); request_parser.add_argument("--json", default="{}")
    args = parser.parse_args()
    try:
        return {"start": start, "stop": stop, "request": request}[args.command](args)
    except (EnvironmentError, OSError, RuntimeError, TimeoutError, ValueError) as exc:
        print(f"Error: {redact(str(exc), dict(os.environ))}", file=os.sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
