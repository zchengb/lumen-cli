#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


def _emit(payload: dict[str, Any], *, code: int = 0) -> int:
    sys.stdout.write(json.dumps(payload, ensure_ascii=False, default=str) + "\n")
    return code


def _error(code: str, message: str, *, exit_code: int = 1) -> int:
    print(message, file=sys.stderr)
    return _emit({"status": "error", "code": code, "message": message}, code=exit_code)


def _load_common(workspace: Path) -> dict[str, Any]:
    path = workspace / "config" / "common.json"
    if not path.is_file():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def _slug(common: dict[str, Any], explicit: str = "") -> str:
    if explicit:
        return explicit.strip()
    project = common.get("project") if isinstance(common.get("project"), dict) else {}
    return str(project.get("slug") or "").strip()


def _runtime(workspace: Path, slug: str) -> dict[str, Any]:
    from risk.store import RiskStore

    common = _load_common(workspace)
    return {
        "workspace": workspace,
        "project_slug": slug or _slug(common),
        "common": common,
        "risk_store": RiskStore(workspace),
    }


def cmd_risk(args: argparse.Namespace) -> int:
    workspace = Path(args.workspace).expanduser().resolve()
    if not workspace.is_dir():
        return _error("WORKSPACE_NOT_FOUND", f"workspace missing: {workspace}")
    common = _load_common(workspace)
    slug = _slug(common, args.project or "")
    if not slug and args.subcommand not in {"finding"}:
        return _error("PROJECT_REQUIRED", "project slug required (--project)")
    runtime = _runtime(workspace, slug)
    store = runtime["risk_store"]
    try:
        from agents.dylan.tools import risk_tools as rt
        from risk.store import utc_now

        if args.subcommand == "recent":
            out = rt.query_recent_findings(
                {"project_slug": slug, "days": args.days, "limit": args.limit},
                runtime=runtime,
            )
        elif args.subcommand == "unresolved":
            out = rt.query_unresolved_findings(
                {"project_slug": slug, "limit": args.limit},
                runtime=runtime,
            )
        elif args.subcommand == "top":
            out = rt.query_top_risks(
                {"project_slug": slug, "limit": args.limit},
                runtime=runtime,
            )
        elif args.subcommand == "trend":
            out = rt.query_project_trend({"project_slug": slug}, runtime=runtime)
        elif args.subcommand == "finding":
            finding_id = str(args.finding_id or "").strip()
            if not finding_id:
                return _error("FINDING_REQUIRED", "finding id required")
            if args.finding_action == "show":
                out = rt.get_finding_summary({"finding_id": finding_id}, runtime=runtime)
            elif args.finding_action == "links":
                out = rt.get_finding_links({"finding_id": finding_id}, runtime=runtime)
            else:
                return _error("UNKNOWN_ACTION", f"unknown finding action: {args.finding_action}")
        else:
            return _error("UNKNOWN_SUBCOMMAND", f"unknown risk subcommand: {args.subcommand}")
        if "freshness" not in out:
            out["freshness"] = {"source": "risk_store", "updated_at": utc_now()}
        return _emit(out, code=0 if out.get("status") in {None, "ok", "success"} or "data" in out or "items" in out.get("data", {}) else 0)
    finally:
        store.close()


def cmd_scan_latest(args: argparse.Namespace) -> int:
    workspace = Path(args.workspace).expanduser().resolve()
    if not workspace.is_dir():
        return _error("WORKSPACE_NOT_FOUND", f"workspace missing: {workspace}")
    from risk.store import utc_now

    results = workspace / "results"
    candidates: list[Path] = []
    if results.is_dir():
        candidates = sorted(results.glob("**/scan-result.json"), key=lambda p: p.stat().st_mtime, reverse=True)
        if not candidates:
            candidates = sorted(results.glob("**/*result*.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not candidates:
        return _emit(
            {
                "status": "not_found",
                "code": "SCAN_RESULT_NOT_FOUND",
                "message": "no scan result found",
                "freshness": {"source": "results", "updated_at": utc_now()},
            }
        )
    path = candidates[0]
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        return _error("SCAN_RESULT_INVALID", f"failed to read {path}: {exc}")
    return _emit(
        {
            "status": "ok",
            "path": str(path),
            "data": data,
            "freshness": {"source": "results", "updated_at": utc_now()},
        }
    )


def cmd_session(args: argparse.Namespace) -> int:
    from agents.dylan.session_store import SessionStore

    store = SessionStore()
    try:
        if args.subcommand == "list":
            rows = store.list_sessions(limit=int(args.limit or 20))
            return _emit({"status": "ok", "items": rows})
        if args.subcommand == "show":
            row = store.get(str(args.session_id or ""))
            if row is None:
                return _error("SESSION_NOT_FOUND", f"session not found: {args.session_id}")
            return _emit({"status": "ok", "session": row})
        if args.subcommand == "reset":
            session_id = str(args.session_id or "").strip()
            if session_id:
                store.close_session(session_id)
                return _emit({"status": "ok", "reset": session_id})
            scope = str(args.scope or "").strip()
            if not scope:
                return _error("SCOPE_REQUIRED", "session id or --scope required")
            active = store.get_active(conversation_scope_id=scope)
            if active is None:
                return _emit({"status": "ok", "reset": None, "detail": "no active session"})
            store.close_session(active["session_id"])
            return _emit({"status": "ok", "reset": active["session_id"]})
        return _error("UNKNOWN_SUBCOMMAND", f"unknown session subcommand: {args.subcommand}")
    finally:
        store.close()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="lumen-agent-json")
    sub = parser.add_subparsers(dest="command", required=True)

    risk = sub.add_parser("risk")
    risk.add_argument("subcommand")
    risk.add_argument("finding_action", nargs="?")
    risk.add_argument("finding_id", nargs="?")
    risk.add_argument("--workspace", required=True)
    risk.add_argument("--project", default="")
    risk.add_argument("--days", type=int, default=7)
    risk.add_argument("--limit", type=int, default=20)
    risk.add_argument("--json", action="store_true")

    scan = sub.add_parser("scan")
    scan.add_argument("subcommand")
    scan.add_argument("--workspace", required=True)
    scan.add_argument("--project", default="")
    scan.add_argument("--json", action="store_true")

    session = sub.add_parser("session")
    session.add_argument("subcommand")
    session.add_argument("session_id", nargs="?")
    session.add_argument("--scope", default="")
    session.add_argument("--limit", type=int, default=20)
    session.add_argument("--json", action="store_true")
    return parser


def main(argv: list[str] | None = None) -> int:
    lib = Path(__file__).resolve().parent.parent
    if str(lib) not in sys.path:
        sys.path.insert(0, str(lib))
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.command == "risk":
        return cmd_risk(args)
    if args.command == "scan":
        if args.subcommand != "latest":
            return _error("UNKNOWN_SUBCOMMAND", f"unknown scan subcommand: {args.subcommand}")
        return cmd_scan_latest(args)
    if args.command == "session":
        return cmd_session(args)
    return _error("UNKNOWN_COMMAND", f"unknown command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
