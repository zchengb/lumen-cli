#!/usr/bin/env python3
"""Jira status and comment operations owned by Auto Patch."""

from __future__ import annotations

from html import escape
from typing import Any

from jira_delivery_sync import add_delivery_comment
from jira_sync import parse_twg_json, refresh_twg_auth, run_twg, site_args, truncate_error
from patch_runtime import get_workitem, jira_config, jira_status


def transition_options(workspace, key: str) -> list[dict[str, Any]]:
    code, output = run_twg(["jira", "workitem", "transitions", "query", "--id", key, "-o", "json", *site_args(jira_config(workspace))])
    if code != 0:
        raise RuntimeError(truncate_error(output or f"Unable to read Jira transitions for {key}"))
    payload = parse_twg_json(output) or {}
    data = payload.get("data", payload) if isinstance(payload, dict) else payload
    if isinstance(data, dict):
        data = data.get("transitions") or data.get("items") or data.get("values") or []
    return [item for item in data if isinstance(item, dict)] if isinstance(data, list) else []


def transition_issue(workspace, key: str, target: str) -> str:
    target = target.strip()
    if not target:
        return jira_status(get_workitem(workspace, key))
    current = jira_status(get_workitem(workspace, key))
    if current.casefold() == target.casefold():
        return current
    options = transition_options(workspace, key)
    def transition_name(item: dict[str, Any]) -> str:
        to = item.get("to")
        return str(item.get("name") or (to.get("name") if isinstance(to, dict) else "")).strip()

    selected = next((item for item in options if transition_name(item).casefold() == target.casefold()), None)
    transition_id = str(selected.get("id") or "").strip() if selected else ""
    if not transition_id:
        available = ", ".join(transition_name(item) for item in options if isinstance(item, dict))
        raise RuntimeError(f"Jira transition to '{target}' is unavailable for {key}. Available: {available or 'none'}")
    refreshed, reason = refresh_twg_auth(force=True)
    if not refreshed:
        raise RuntimeError(reason)
    code, output = run_twg(["jira", "workitem", "transition", "--id", key, "--transition-id", transition_id, "-o", "json", *site_args(jira_config(workspace))])
    if code != 0:
        raise RuntimeError(truncate_error(output or f"Jira transition failed for {key}"))
    return jira_status(get_workitem(workspace, key))


def add_comment(workspace, key: str, comment: str, comment_format: str = "markdown") -> None:
    refreshed, reason = refresh_twg_auth(force=True)
    if not refreshed:
        raise RuntimeError(reason)
    add_delivery_comment(key, comment, jira_config(workspace), comment_format)


def blocked_comment(reason: str, question: str) -> str:
    return "".join(
        [
            "<p>Lumen Auto Patch · <strong><span style=\"color: #bf2600\">Blocked</span></strong></p>",
            f"<p><strong>Confirmed:</strong> {escape(reason)}</p>",
            f"<p><strong>Question:</strong> {escape(question)}</p>",
            "<p></p>",
            "<p><span style=\"color: #97a0af\">P.S. Reply in Jira; the next Auto Patch cycle will re-read the comments and retry automatically.</span></p>",
        ]
    )
