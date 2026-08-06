#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any, Optional


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


def _latest_scan_payload(workspace: Path) -> tuple[Optional[Path], Optional[dict[str, Any]]]:
    results = workspace / "results"
    if not results.is_dir():
        return None, None
    candidates = sorted(results.glob("**/scan-result.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not candidates:
        candidates = sorted(results.glob("**/*result*.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not candidates:
        return None, None
    path = candidates[0]
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return path, None
    return path, data if isinstance(data, dict) else None


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
        from risk.verification import display_status, mark_remediated

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
            elif args.finding_action == "verification-status":
                row = store.get_finding(finding_id)
                if row is None:
                    return _error("FINDING_NOT_FOUND", f"finding not found: {finding_id}")
                data = dict(row)
                out = {
                    "status": "ok",
                    "finding_id": finding_id,
                    "finding_status": str(data.get("status") or ""),
                    "remediation_status": str(data.get("remediation_status") or "none"),
                    "verification_status": str(data.get("verification_status") or ""),
                    "display_status": display_status(data),
                    "last_verified_at": data.get("last_verified_at"),
                    "last_verification_run_id": data.get("last_verification_run_id"),
                    "freshness": {"source": "risk_store", "updated_at": utc_now()},
                }
            elif args.finding_action == "mark-remediated":
                actor = str(getattr(args, "actor", "") or "").strip()
                reason = str(getattr(args, "reason", "") or "").strip()
                source_message_id = str(getattr(args, "source_message_id", "") or "").strip()
                trace_id = str(getattr(args, "trace_id", "") or "").strip()
                if not actor or not source_message_id or not trace_id:
                    return _error(
                        "WRITE_META_REQUIRED",
                        "mark-remediated requires --actor, --source-message-id, and --trace-id",
                    )
                out = mark_remediated(
                    store,
                    finding_id,
                    actor=actor,
                    reason=reason or "User reported the fix completed",
                    source_message_id=source_message_id,
                    trace_id=trace_id,
                )
                if out.get("status") == "not_found":
                    return _emit(out, code=1)
                if out.get("status") == "error":
                    return _emit(out, code=1)
                out["freshness"] = {"source": "risk_store", "updated_at": utc_now()}
            else:
                return _error("UNKNOWN_ACTION", f"unknown finding action: {args.finding_action}")
        else:
            return _error("UNKNOWN_SUBCOMMAND", f"unknown risk subcommand: {args.subcommand}")
        if "freshness" not in out:
            out["freshness"] = {"source": "risk_store", "updated_at": utc_now()}
        return _emit(
            out,
            code=0
            if out.get("status") in {None, "ok", "success"}
            or "data" in out
            or "items" in out.get("data", {})
            else 0,
        )
    finally:
        store.close()


def cmd_scan_latest(args: argparse.Namespace) -> int:
    workspace = Path(args.workspace).expanduser().resolve()
    if not workspace.is_dir():
        return _error("WORKSPACE_NOT_FOUND", f"workspace missing: {workspace}")
    from risk.store import utc_now

    path, data = _latest_scan_payload(workspace)
    if path is None or data is None:
        return _emit(
            {
                "status": "not_found",
                "code": "SCAN_RESULT_NOT_FOUND",
                "message": "no scan result found",
                "freshness": {"source": "results", "updated_at": utc_now()},
            }
        )
    return _emit(
        {
            "status": "ok",
            "path": str(path),
            "data": data,
            "freshness": {"source": "results", "updated_at": utc_now()},
        }
    )


def cmd_scan_verify(args: argparse.Namespace) -> int:
    workspace = Path(args.workspace).expanduser().resolve()
    if not workspace.is_dir():
        return _error("WORKSPACE_NOT_FOUND", f"workspace missing: {workspace}")
    finding_id = str(getattr(args, "finding", "") or "").strip()
    if not finding_id:
        return _error("FINDING_REQUIRED", "scan verify requires --finding")
    observed_raw = str(getattr(args, "observed", "") or "").strip().lower()
    actor = str(getattr(args, "actor", "") or "").strip()
    source_message_id = str(getattr(args, "source_message_id", "") or "").strip()
    trace_id = str(getattr(args, "trace_id", "") or "").strip()
    common = _load_common(workspace)
    slug = _slug(common, args.project or "")
    runtime = _runtime(workspace, slug)
    store = runtime["risk_store"]
    try:
        from risk.store import utc_now
        from risk.verification import apply_finding_verification, finding_observed_in_scan_result

        row = store.get_finding(finding_id)
        if row is None:
            return _error("FINDING_NOT_FOUND", f"finding not found: {finding_id}")
        finding = dict(row)

        if observed_raw in {"true", "1", "yes", "observed"}:
            observed = True
            source = "explicit"
            scan_path = None
        elif observed_raw in {"false", "0", "no", "absent", "clean"}:
            observed = False
            source = "explicit"
            scan_path = None
        else:
            scan_path, scan_data = _latest_scan_payload(workspace)
            if scan_data is None:
                return _error(
                    "SCAN_RESULT_REQUIRED",
                    "no --observed flag and no latest scan result; pass --observed true|false",
                )
            observed = finding_observed_in_scan_result(scan_data, finding)
            source = "latest_scan"

        out = apply_finding_verification(
            store,
            finding_id,
            observed=observed,
            actor=actor or "verification-scan",
            source_message_id=source_message_id,
            trace_id=trace_id,
            scan_run_id=str(getattr(args, "scan_run_id", "") or "").strip(),
        )
        if out.get("status") in {"not_found", "error"}:
            return _emit(out, code=1)
        out["evidence_source"] = source
        if scan_path is not None:
            out["scan_result_path"] = str(scan_path)
        out["freshness"] = {"source": "risk_store", "updated_at": utc_now()}
        return _emit(out)
    finally:
        store.close()


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
    risk.add_argument("--actor", default="")
    risk.add_argument("--reason", default="")
    risk.add_argument("--source-message-id", default="")
    risk.add_argument("--trace-id", default="")
    risk.add_argument("--json", action="store_true")

    scan = sub.add_parser("scan")
    scan.add_argument("subcommand")
    scan.add_argument("--workspace", required=True)
    scan.add_argument("--project", default="")
    scan.add_argument("--finding", default="")
    scan.add_argument("--observed", default="")
    scan.add_argument("--actor", default="")
    scan.add_argument("--source-message-id", default="")
    scan.add_argument("--trace-id", default="")
    scan.add_argument("--scan-run-id", default="")
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
        if args.subcommand == "latest":
            return cmd_scan_latest(args)
        if args.subcommand == "verify":
            return cmd_scan_verify(args)
        return _error("UNKNOWN_SUBCOMMAND", f"unknown scan subcommand: {args.subcommand}")
    if args.command == "session":
        return cmd_session(args)
    return _error("UNKNOWN_COMMAND", f"unknown command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
