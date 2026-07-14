#!/usr/bin/env python3
"""Serve Lumen's local interactive dashboard on loopback only."""

from __future__ import annotations

import argparse
import importlib.util
import json
import os
import sys
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

from delivery_launchd import install as install_delivery_schedule
from delivery_launchd import remove as remove_delivery_schedule
from delivery_launchd import status as delivery_schedule_status
from delivery_workspace import read_json as read_delivery_json
from issue_registry import set_issue_status
from scan_launchd import install as install_scan_schedule
from scan_launchd import remove as remove_scan_schedule
from scan_launchd import status as scan_schedule_status


SCRIPT_DIR = Path(__file__).resolve().parent


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


def schedule_payload(workspace: Path, project: str) -> dict[str, Any]:
    scan_raw = capture_schedule_status(scan_schedule_status, project)
    delivery_raw = capture_schedule_status(delivery_schedule_status, project)
    return {
        "scan": scan_raw,
        "delivery": delivery_raw,
        "platform": "launchd" if sys.platform == "darwin" else "unsupported",
    }


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
            if "=" in line and not line.lstrip().startswith("#"):
                configured_keys.append(line.split("=", 1)[0].strip())
    return {
        "path": str(workspace),
        "scan_window_days": (common.get("execution") or {}).get("scan_window_days", 7),
        "configured_integrations": sorted(key for key in configured_keys if key),
        "repositories": load_json(workspace / "config" / "repos.json", {"repositories": []}).get("repositories", []),
    }


def delivery_payload(workspace: Path) -> dict[str, Any]:
    history_dir = workspace / "history" / "delivery"
    runs: list[dict[str, Any]] = []
    if history_dir.is_dir():
        for source in sorted(history_dir.glob("*.json"), key=lambda path: path.stat().st_mtime, reverse=True)[:20]:
            item = read_delivery_json(source, {})
            delivery = item.get("delivery") if isinstance(item.get("delivery"), dict) else {}
            progress = item.get("progress") if isinstance(item.get("progress"), dict) else {}
            runs.append(
                {
                    "run_id": item.get("run_id") or source.stem,
                    "status": delivery.get("delivery_status") or progress.get("delivery_status") or "unknown",
                    "story": delivery.get("story_id") or progress.get("story_id") or "",
                    "jira_key": delivery.get("jira_key") or progress.get("jira_key") or "",
                    "branch": delivery.get("branch") or progress.get("branch") or "",
                    "prs": delivery.get("pr_urls") or [],
                    "verification": delivery.get("verification_results") or progress.get("verification") or [],
                    "started_at": delivery.get("started_at") or progress.get("started_at") or "",
                    "finished_at": delivery.get("finished_at") or progress.get("finished_at") or "",
                }
            )
    return {
        "current": read_delivery_json(workspace / "results" / "delivery-progress.json", {}),
        "runs": runs,
        "config": read_delivery_json(workspace / "config" / "delivery.json", {}),
    }


class DashboardServer(ThreadingHTTPServer):
    def __init__(self, address: tuple[str, int], workspace: Path, project: str, lumen_bin: str, lumen_home: str):
        super().__init__(address, DashboardHandler)
        self.workspace = workspace
        self.project = project
        self.lumen_bin = lumen_bin
        self.lumen_home = lumen_home

    def dashboard_state(self) -> dict[str, Any]:
        data = RENDERER.build_payload(self.workspace)
        data["interactive"] = {
            "enabled": True,
            "project": self.project,
            "prompts": prompt_files(self.workspace),
            "schedules": schedule_payload(self.workspace, self.project),
            "workspace": workspace_payload(self.workspace),
        }
        data["delivery"] = delivery_payload(self.workspace)
        return data

    def update_schedule(self, body: dict[str, Any]) -> dict[str, Any]:
        kind = str(body.get("kind", ""))
        action = str(body.get("action", ""))
        if kind not in {"scan", "delivery"} or action not in {"save", "remove"}:
            raise ValueError("Invalid schedule request")
        if action == "remove":
            func = remove_scan_schedule if kind == "scan" else remove_delivery_schedule
            func(argparse.Namespace(project=self.project))
            return schedule_payload(self.workspace, self.project)

        if kind == "scan":
            cron = str(body.get("cron", "")).strip()
            if not cron:
                raise ValueError("A scan cron expression is required")
            args = argparse.Namespace(
                project=self.project,
                cron=cron,
                lumen_bin=self.lumen_bin,
                lumen_home=self.lumen_home,
                path=os.environ.get("PATH", ""),
                log_file=str(self.workspace / "logs" / "schedule.log"),
                dry_run=False,
            )
            if install_scan_schedule(args) != 0:
                raise RuntimeError("Unable to install scan schedule")
        else:
            interval = int(body.get("interval_minutes", 0))
            if interval < 1:
                raise ValueError("Delivery interval must be at least one minute")
            jira_status = str(body.get("jira_status", "Ready for Dev")).strip() or "Ready for Dev"
            args = argparse.Namespace(
                project=self.project,
                cron=f"*/{interval} * * * *",
                jira_status=jira_status,
                lumen_bin=self.lumen_bin,
                lumen_home=self.lumen_home,
                path=os.environ.get("PATH", ""),
                log_file=str(self.workspace / "logs" / "delivery-schedule.log"),
            )
            if install_delivery_schedule(args) != 0:
                raise RuntimeError("Unable to install delivery schedule")
        return schedule_payload(self.workspace, self.project)


class DashboardHandler(SimpleHTTPRequestHandler):
    server: DashboardServer

    def log_message(self, _format: str, *_args: Any) -> None:
        return

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path == "/api/state":
            return self.respond_json(HTTPStatus.OK, self.server.dashboard_state())
        if parsed.path == "/api/prompt":
            query = parse_qs(parsed.query)
            try:
                path = safe_prompt_path(self.server.workspace, query.get("mode", [""])[0], query.get("path", [""])[0])
                return self.respond_json(HTTPStatus.OK, {"content": path.read_text(encoding="utf-8")})
            except (OSError, ValueError) as exc:
                return self.respond_error(HTTPStatus.BAD_REQUEST, str(exc))
        if parsed.path in {"/", "/dashboard.html"}:
            return self.serve_file(self.server.workspace / "dashboard.html", "text/html; charset=utf-8")
        if parsed.path == "/dashboard-data.js":
            return self.serve_file(self.server.workspace / "dashboard-data.js", "application/javascript; charset=utf-8")
        if parsed.path == "/assets/lumen-mark.png":
            return self.serve_file(self.server.workspace / "assets" / "lumen-mark.png", "image/png")
        return self.respond_error(HTTPStatus.NOT_FOUND, "Not found")

    def do_POST(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        try:
            body = self.read_json_body()
            if parsed.path == "/api/issue/ignore":
                issue_id = str(body.get("issue_id", "")).strip()
                if not issue_id:
                    raise ValueError("Issue id is required")
                issue = set_issue_status(self.server.workspace, issue_id, "ignored", str(body.get("reason", "")).strip())
                return self.respond_json(HTTPStatus.OK, {"issue": issue})
            if parsed.path == "/api/schedule":
                return self.respond_json(HTTPStatus.OK, {"schedules": self.server.update_schedule(body)})
            if parsed.path == "/api/prompt":
                path = safe_prompt_path(self.server.workspace, str(body.get("mode", "")), str(body.get("path", "")))
                if not path.is_file():
                    raise ValueError("Prompt file does not exist")
                path.write_text(str(body.get("content", "")).rstrip() + "\n", encoding="utf-8")
                return self.respond_json(HTTPStatus.OK, {"saved_at": utc_now()})
            if parsed.path == "/api/workspace":
                days = int(body.get("scan_window_days", 0))
                if days < 1 or days > 365:
                    raise ValueError("Scan window must be between 1 and 365 days")
                path = self.server.workspace / "config" / "common.json"
                config = load_json(path, {})
                execution = config.setdefault("execution", {})
                if not isinstance(execution, dict):
                    raise ValueError("Invalid workspace execution configuration")
                execution["scan_window_days"] = days
                write_json(path, config)
                return self.respond_json(HTTPStatus.OK, {"workspace": workspace_payload(self.server.workspace)})
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
    parser.add_argument("--port", type=int, default=0)
    args = parser.parse_args()

    workspace = Path(args.workspace).expanduser().resolve()
    server = DashboardServer(("127.0.0.1", args.port), workspace, args.project, args.lumen_bin, args.lumen_home)
    url = f"http://127.0.0.1:{server.server_port}/"
    state_path = workspace / "state" / "dashboard-server.json"
    write_json(state_path, {"pid": os.getpid(), "url": url, "started_at": utc_now()})
    print(url, flush=True)
    try:
        server.serve_forever()
    finally:
        if state_path.exists() and load_json(state_path, {}).get("pid") == os.getpid():
            state_path.unlink()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
