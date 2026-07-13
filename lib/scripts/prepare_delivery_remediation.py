#!/usr/bin/env python3
"""Record one bounded delivery remediation attempt and reset current verification results."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from delivery_workspace import read_json, write_json


def now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def state_path(result_path: Path) -> Path:
    return result_path.with_name("delivery-remediation.json")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--result", required=True)
    parser.add_argument("--attempt", type=int)
    parser.add_argument("--max-attempts", type=int)
    parser.add_argument("--complete", action="store_true")
    parser.add_argument("--restore", action="store_true")
    args = parser.parse_args()

    result_path = Path(args.result).expanduser().resolve()
    payload = read_json(result_path, {})
    remediation_path = state_path(result_path)
    if args.restore:
        remediation = read_json(remediation_path, {})
        if remediation:
            payload["remediation"] = remediation
            write_json(result_path, payload)
        return 0

    if args.complete:
        remediation = read_json(remediation_path, {})
        if not remediation:
            remediation = payload.get("remediation") if isinstance(payload.get("remediation"), dict) else {}
        if remediation:
            remediation["status"] = "resolved"
            remediation["resolved_at"] = now()
            payload["remediation"] = remediation
            write_json(result_path, payload)
            write_json(remediation_path, remediation)
        return 0

    if args.attempt is None or args.max_attempts is None:
        parser.error("--attempt and --max-attempts are required unless --complete is used")
    verification = payload.get("verification_results")
    failed = [item for item in verification or [] if isinstance(item, dict) and item.get("status") == "failed"]
    remediation = read_json(remediation_path, {}) if args.attempt > 1 else {}
    if not remediation:
        remediation = payload.get("remediation") if isinstance(payload.get("remediation"), dict) else {}
    attempts = remediation.get("attempts") if isinstance(remediation.get("attempts"), list) else []
    attempts.append(
        {
            "attempt": args.attempt,
            "started_at": now(),
            "failed_verification": failed,
        }
    )
    state = {
        "attempt": args.attempt,
        "max_attempts": args.max_attempts,
        "status": "in_progress",
        "attempts": attempts,
    }
    payload["remediation"] = state
    # The final delivery card must describe the final verification run. Earlier
    # failures remain available in remediation.attempts for auditability.
    payload["verification_results"] = []
    payload["delivery_status"] = "in_progress"
    write_json(result_path, payload)
    write_json(remediation_path, state)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
