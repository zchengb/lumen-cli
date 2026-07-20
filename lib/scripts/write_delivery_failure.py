#!/usr/bin/env python3
"""Persist a delivery failure result so notification and history remain complete."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from delivery_workspace import load_story_context, read_json, workspace_lumen_dir, write_json


def now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def is_generic_failure_message(message: str) -> bool:
    text = message.strip()
    return not text or text.startswith("Delivery finalization failed. See log:")


def resolve_failure_detail(phase: str, message: str, existing: dict[str, Any] | None) -> str:
    if not isinstance(existing, dict):
        return message
    for item in existing.get("failures") or []:
        if not isinstance(item, dict):
            continue
        candidate = str(item.get("detail", "")).strip()
        if not candidate:
            continue
        stage = str(item.get("stage", "")).strip()
        if stage and stage != (phase or "delivery"):
            continue
        if is_generic_failure_message(message) or len(candidate) > len(message):
            return candidate
    return message


def build_failure_payload(
    context: Any | None,
    run_id: str,
    phase: str,
    message: str,
    started_at: str,
    existing: dict[str, Any] | None = None,
) -> dict[str, Any]:
    detail = resolve_failure_detail(phase, message, existing)
    payload: dict[str, Any] = {
        "run_id": run_id,
        "delivery_status": "failed",
        "started_at": started_at or now(),
        "finished_at": now(),
        "pr_urls": [],
        "verification_results": [],
        "failures": [{"stage": phase or "delivery", "detail": detail}],
    }
    if isinstance(existing, dict) and str(existing.get("run_id", "")).strip() == str(run_id).strip():
        for key in ("pr_urls", "verification_results", "repos_touched", "commits", "agent_trace", "jira", "feishu"):
            if existing.get(key) not in (None, "", []):
                payload[key] = existing[key]
    if context is not None:
        payload.update({
            "docs_dir": str(context.docs_dir),
            "workspace_root": str(context.workspace_root),
            "story_id": context.metadata.get("storyId") or context.story_dir.name,
            "story_path": str(context.story_dir.relative_to(context.docs_dir)),
            "jira_key": context.metadata.get("jiraKey", ""),
            "branch": context.branch_name,
        })
        if not payload.get("repos_touched"):
            payload["repos_touched"] = [{"name": repo.name} for repo in context.repos]
    return payload


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    parser.add_argument("--result", required=True)
    parser.add_argument("--run-id", default="")
    parser.add_argument("--phase", default="")
    parser.add_argument("--message", required=True)
    args = parser.parse_args()

    result_path = Path(args.result).expanduser().resolve()
    existing = read_json(result_path)
    context = None
    started_at = ""
    try:
        context = load_story_context(Path(args.docs_dir), args.story, validate_gates=False)
        progress = read_json(workspace_lumen_dir(context.workspace_root) / "results" / "delivery-progress.json", {})
        if progress.get("run_id") == args.run_id:
            started_at = str(progress.get("started_at") or "")
    except Exception:
        pass
    payload = build_failure_payload(context, args.run_id, args.phase, args.message, started_at, existing)
    write_json(result_path, payload)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
