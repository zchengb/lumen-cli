#!/usr/bin/env python3
"""Sync JIRA Story status/comments for Lumen delivery runs."""

from __future__ import annotations

from typing import Any, Dict

from jira_sync import add_pr_link_to_jira, run_twg, site_args, truncate_error, twg_ready


def jira_delivery_config(delivery_config: dict) -> dict:
    jira = delivery_config.get("jira", {})
    return jira if isinstance(jira, dict) else {}


def should_sync_jira(delivery_config: dict) -> tuple[bool, str]:
    config = jira_delivery_config(delivery_config)
    if config.get("enabled") is False:
        return False, "JIRA delivery sync disabled in delivery.json"
    if config.get("enabled") is True:
        ready, reason = twg_ready()
        if not ready:
            return False, reason
        return True, ""
    if config.get("auto_enable_when_twg_ready", True):
        ready, reason = twg_ready()
        return ready, reason
    return False, "JIRA delivery sync not enabled"


def transition_issue(jira_key: str, status_name: str, config: dict) -> None:
    if not status_name:
        return
    returncode, output = run_twg(
        [
            "jira",
            "workitem",
            "update",
            "--id",
            jira_key,
            "--status",
            status_name,
            "-o",
            "json",
            *site_args(config),
        ]
    )
    if returncode != 0:
        raise RuntimeError(truncate_error(output or f"twg status update failed with status {returncode}"))


def add_delivery_comment(jira_key: str, comment: str, config: dict) -> None:
    returncode, output = run_twg(
        [
            "jira",
            "workitem",
            "update",
            "--id",
            jira_key,
            "--comment",
            comment,
            "--comment-format",
            "markdown",
            "-o",
            "json",
            *site_args(config),
        ]
    )
    if returncode != 0:
        raise RuntimeError(truncate_error(output or f"twg comment update failed with status {returncode}"))


def sync_delivery_jira(
    delivery: dict,
    delivery_config: dict,
    story_metadata: dict,
    dry_run: bool = False,
    event: str = "",
) -> Dict[str, Any]:
    result: Dict[str, Any] = {"status": "skipped", "detail": ""}
    config = jira_delivery_config(delivery_config)
    enabled, reason = should_sync_jira(delivery_config)
    if not enabled:
        result["detail"] = reason
        return result

    jira_key = str(delivery.get("jira_key") or story_metadata.get("jiraKey") or "").strip()
    if not jira_key:
        result["detail"] = "No JIRA key on story"
        return result

    if dry_run:
        result["status"] = "dry_run"
        result["detail"] = f"Would sync JIRA issue {jira_key}"
        return result

    try:
        in_dev_status = str(config.get("in_dev_status", "IN DEV")).strip()
        dev_done_status = str(config.get("dev_done_status", "DEV DONE")).strip()
        delivery_status = str(delivery.get("delivery_status", "")).strip()
        registry_issue: dict[str, Any] = {"jira_pr_url": story_metadata.get("jira_pr_url", "")}
        transitions: list[str] = []

        if event == "delivery.started" or delivery_status == "in_progress":
            if in_dev_status:
                transition_issue(jira_key, in_dev_status, config)
                transitions.append(in_dev_status)
            branch = str(delivery.get("branch", "")).strip() or "n/a"
            repos = ", ".join(
                str(item.get("name", "")).strip()
                for item in delivery.get("repos_touched", [])
                if isinstance(item, dict) and item.get("name")
            ) or "n/a"
            docs_dir = str(delivery.get("docs_dir", "")).strip() or "n/a"
            add_delivery_comment(
                jira_key,
                "Lumen Delivery Started\n\n"
                f"- Branch: `{branch}`\n"
                f"- Repositories: {repos}\n"
                f"- Docs: `{docs_dir}`",
                config,
            )

        pr_urls = delivery.get("pr_urls") or []
        if pr_urls:
            for pr_url in pr_urls:
                url = str(pr_url).strip()
                if url:
                    add_pr_link_to_jira(jira_key, url, config, registry_issue)

        if event == "delivery.dev_done" or delivery_status in {"completed", "dev_done", "pr_open"}:
            if dev_done_status:
                transition_issue(jira_key, dev_done_status, config)
                transitions.append(dev_done_status)

        result["status"] = "synced"
        result["jira_key"] = jira_key
        result["detail"] = f"Updated {jira_key}" + (
            f" -> {', '.join(transitions)}" if transitions else ""
        )
        if registry_issue.get("jira_pr_url"):
            result["jira_pr_url"] = registry_issue["jira_pr_url"]
    except Exception as exc:
        result["status"] = "failed"
        result["detail"] = str(exc)
    return result
