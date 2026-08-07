#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

LIB_DIR = Path(__file__).resolve().parent.parent
SCRIPTS = Path(__file__).resolve().parent
if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))
if str(SCRIPTS) not in sys.path:
    sys.path.insert(0, str(SCRIPTS))


def _emit(payload: dict[str, Any], *, code: int = 0) -> int:
    print(json.dumps(payload, ensure_ascii=False, default=str))
    return code


def cmd_show(args: argparse.Namespace) -> int:
    from agents.security.adapters.schedule import schedule_show

    return _emit(schedule_show(args.project))


def cmd_update(args: argparse.Namespace) -> int:
    from agents.security.actions import ActionRequest
    from agents.security.broker import CapabilityBroker

    request = ActionRequest(
        agent_id="dylan",
        action="scan.schedule.update",
        project_slug=args.project,
        actor_user_id=args.actor or "",
        chat_id=args.chat_id or "",
        thread_id=args.thread_id or "",
        source_message_id=args.source_message_id or "",
        trace_id=args.trace_id or "",
        resource={"cron": args.cron},
        arguments={"cron": args.cron, "project": args.project},
        explicit_authorization=True,
    )
    receipt = CapabilityBroker().execute(request)
    return _emit(receipt.to_dict(), code=0 if receipt.status == "succeeded" else 1)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Lumen scan schedule domain actions")
    sub = parser.add_subparsers(dest="command", required=True)
    show = sub.add_parser("show")
    show.add_argument("--project", required=True)
    show.add_argument("--json", action="store_true", default=True)
    show.set_defaults(func=cmd_show)
    update = sub.add_parser("update")
    update.add_argument("--project", required=True)
    update.add_argument("--cron", required=True)
    update.add_argument("--actor", default="")
    update.add_argument("--chat-id", default="")
    update.add_argument("--thread-id", default="")
    update.add_argument("--source-message-id", default="")
    update.add_argument("--trace-id", default="")
    update.add_argument("--json", action="store_true", default=True)
    update.set_defaults(func=cmd_update)
    args = parser.parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
