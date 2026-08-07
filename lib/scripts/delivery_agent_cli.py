#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

LIB_DIR = Path(__file__).resolve().parent.parent
if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))

from agents.mark.delivery_adapter import DeliveryActionAdapter
from agents.project_resolver import load_chat_project_map, resolve_project


def _workspace(project: str, docs: str) -> Path:
    if docs:
        return Path(docs).expanduser().resolve()
    if project:
        resolved = resolve_project(slug=project, mapping=load_chat_project_map())
        if resolved and resolved.get("workspace"):
            workspace = Path(str(resolved["workspace"])).expanduser().resolve()
            parent = workspace.parent
            if (parent / "stories").is_dir():
                return parent
            return workspace
    raise SystemExit("workspace not resolved: pass docs path or --project")


def _print(payload: dict, as_json: bool) -> int:
    if as_json:
        print(json.dumps(payload, ensure_ascii=False, indent=2, default=str))
    else:
        print(json.dumps(payload, ensure_ascii=False, default=str))
    return 0 if str(payload.get("status") or "") not in {"not_ready", "blocked", "not_found", "error"} else 1


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="lumen delivery agent-cli")
    sub = parser.add_subparsers(dest="command", required=True)

    def add_common(p: argparse.ArgumentParser) -> None:
        p.add_argument("--story", default="")
        p.add_argument("--project", default="")
        p.add_argument("--run-id", default="")
        p.add_argument("--actor", default="")
        p.add_argument("--source-message-id", default="")
        p.add_argument("--trace-id", default="")
        p.add_argument("--dry-run", action="store_true")
        p.add_argument("--json", action="store_true")
        p.add_argument("docs", nargs="?", default="")

    for name in ("readiness", "status", "result", "run", "cancel"):
        add_common(sub.add_parser(name))

    args = parser.parse_args(argv)
    adapter = DeliveryActionAdapter()
    workspace = _workspace(args.project, args.docs)
    as_json = bool(args.json)

    if args.command == "readiness":
        if not args.story:
            raise SystemExit("--story is required")
        return _print(adapter.readiness(workspace=workspace, story=args.story), as_json)
    if args.command == "status":
        return _print(adapter.status(workspace=workspace, story=args.story, run_id=args.run_id), as_json)
    if args.command == "result":
        return _print(adapter.result(workspace=workspace, run_id=args.run_id), as_json)
    if args.command == "run":
        if not args.story:
            raise SystemExit("--story is required")
        return _print(
            adapter.start(
                workspace=workspace,
                story=args.story,
                actor=args.actor,
                source_message_id=args.source_message_id,
                trace_id=args.trace_id,
                dry_run=bool(args.dry_run),
            ),
            as_json,
        )
    if args.command == "cancel":
        if not args.run_id:
            raise SystemExit("--run-id is required")
        return _print(adapter.cancel(workspace=workspace, run_id=args.run_id, actor=args.actor), as_json)
    raise SystemExit(f"unknown command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
