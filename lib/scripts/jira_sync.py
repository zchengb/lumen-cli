#!/usr/bin/env python3
"""Create Jira work items for Lumen findings via Atlassian TWG CLI."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

SEVERITY_PRIORITY = {
    "High": "High",
    "Medium": "Medium",
    "Low": "Low",
}


def jira_config(common: dict) -> dict:
    notifications = common.get("notifications", {})
    config = notifications.get("jira", {})
    if not isinstance(config, dict):
        return {}
    return config


def is_enabled(common: dict) -> bool:
    config = jira_config(common)
    return bool(config.get("enabled"))


def allowed_severities(config: dict) -> List[str]:
    severities = config.get("severities") or config.get("create_for_severities")
    if isinstance(severities, list) and severities:
        return [str(item) for item in severities]
    return ["High", "Medium"]


def twg_binary() -> Optional[str]:
    return shutil.which("twg")


def twg_ready() -> Tuple[bool, str]:
    binary = twg_binary()
    if not binary:
        return False, "twg CLI not found in PATH. Install from https://developer.atlassian.com/cloud/twg-cli/"
    auth_conf = Path.home() / ".config" / "twg" / "auth.conf"
    if not auth_conf.is_file():
        return False, "twg is not authenticated. Run: twg login"
    return True, ""


def build_summary(finding: dict, config: dict) -> str:
    prefix = str(config.get("summary_prefix", "[Lumen]")).strip()
    title = str(finding.get("title", "Untitled finding")).strip()
    if prefix and not title.startswith(prefix):
        return f"{prefix} {title}"
    return title


def build_description(finding: dict, issue_id: str) -> str:
    lines = [
        f"**Lumen issue:** `{issue_id}`",
        f"**Severity:** {finding.get('severity', 'Unknown')}",
        f"**Repository:** {finding.get('repository', 'unknown')}",
        "",
        "## Impact",
        str(finding.get("impact", "")).strip(),
        "",
        "## Trigger",
        str(finding.get("trigger", "")).strip(),
        "",
        "## Location",
        f"`{finding.get('file', '')}` ({finding.get('line_range', '')})",
        "",
        "## Root cause",
        str(finding.get("root_cause", "")).strip(),
        "",
        "## Suggestion",
        str(finding.get("suggestion", "")).strip(),
    ]
    validation = str(finding.get("validation", "")).strip()
    if validation:
        lines.extend(["", "## Validation", validation])
    pr_url = finding.get("pr_url")
    if pr_url:
        lines.extend(["", "## Pull request", str(pr_url)])
    code = str(finding.get("code_snippet", "")).strip()
    if code:
        lines.extend(["", "## Code snippet", "```", code, "```"])
    lines.extend(["", "_Created automatically by Lumen scan._"])
    return "\n".join(lines).strip()


def build_labels(finding: dict) -> List[str]:
    labels = ["lumen", "auto-scan"]
    severity = str(finding.get("severity", "")).strip().lower()
    if severity:
        labels.append(f"severity-{severity}")
    repository = str(finding.get("repository", "")).strip().lower()
    if repository:
        labels.append(repository.replace(" ", "-"))
    return labels


def parse_issue_key(output: str) -> Tuple[Optional[str], Optional[str]]:
    text = output.strip()
    if not text:
        return None, None

    for line in reversed(text.splitlines()):
        line = line.strip()
        if not line or line.startswith("{"):
            try:
                payload = json.loads(line)
            except json.JSONDecodeError:
                continue
            key = extract_key_from_payload(payload)
            if key:
                return key, jira_browse_url(key, payload)
    try:
        payload = json.loads(text)
        key = extract_key_from_payload(payload)
        if key:
            return key, jira_browse_url(key, payload)
    except json.JSONDecodeError:
        pass

    match = re.search(r"\b([A-Z][A-Z0-9_]+-\d+)\b", text)
    if match:
        key = match.group(1)
        return key, None
    return None, None


def extract_key_from_payload(payload: Any) -> Optional[str]:
    if isinstance(payload, dict):
        for path in (
            ("key",),
            ("issueKey",),
            ("data", "key"),
            ("data", "issueKey"),
            ("data", "issue", "key"),
            ("result", "key"),
            ("result", "issueKey"),
        ):
            value: Any = payload
            for part in path:
                if not isinstance(value, dict):
                    value = None
                    break
                value = value.get(part)
            if isinstance(value, str) and value.strip():
                return value.strip()
        for value in payload.values():
            key = extract_key_from_payload(value)
            if key:
                return key
    elif isinstance(payload, list):
        for item in payload:
            key = extract_key_from_payload(item)
            if key:
                return key
    return None


def jira_browse_url(key: str, payload: Any) -> Optional[str]:
    if not isinstance(payload, dict):
        return None
    for path in (
        ("url",),
        ("browseUrl",),
        ("data", "url"),
        ("data", "browseUrl"),
        ("data", "issue", "url"),
    ):
        value: Any = payload
        for part in path:
            if not isinstance(value, dict):
                value = None
                break
            value = value.get(part)
        if isinstance(value, str) and value.startswith("http"):
            return value
    return None


def create_workitem(finding: dict, issue_id: str, config: dict) -> Tuple[str, Optional[str]]:
    ready, reason = twg_ready()
    if not ready:
        raise RuntimeError(reason)

    project_key = str(config.get("project_key", "")).strip()
    if not project_key:
        raise RuntimeError("notifications.jira.project_key is not set in config/common.json")

    issue_type = str(config.get("issue_type", "Bug")).strip() or "Bug"
    binary = twg_binary()
    assert binary is not None

    command = [
        binary,
        "jira",
        "workitem",
        "create",
        "--space",
        project_key,
        "--type",
        issue_type,
        "--summary",
        build_summary(finding, config),
        "--description",
        build_description(finding, issue_id),
        "--description-format",
        "markdown",
        "--labels",
        ",".join(build_labels(finding)),
        "-o",
        "json",
    ]

    priority = SEVERITY_PRIORITY.get(str(finding.get("severity", "")))
    if priority:
        command.extend(["--priority", priority])

    site = str(config.get("site", "")).strip()
    if site:
        command.extend(["--site", site])

    completed = subprocess.run(
        command,
        check=False,
        capture_output=True,
        text=True,
    )
    output = (completed.stdout or "") + ("\n" + completed.stderr if completed.stderr else "")
    if completed.returncode != 0:
        raise RuntimeError(truncate_error(output or f"twg exited with status {completed.returncode}"))

    key, url = parse_issue_key(output)
    if not key:
        raise RuntimeError(f"Could not parse Jira issue key from twg output: {truncate_error(output)}")
    return key, url


def truncate_error(message: str, limit: int = 240) -> str:
    clean = re.sub(r"\s+", " ", message).strip()
    if len(clean) <= limit:
        return clean
    return clean[: limit - 1] + "…"


def index_registry_issues(registry: dict) -> Dict[str, dict]:
    indexed = {}
    for issue in registry.get("issues", []):
        issue_id = issue.get("id")
        if issue_id:
            indexed[str(issue_id)] = issue
    return indexed


def sync_jira_issues(
    scan: dict,
    registry: dict,
    registry_path: Path,
    common: dict,
    dry_run: bool = False,
    persist: bool = True,
) -> dict:
    config = jira_config(common)
    summary = {
        "status": "disabled",
        "created": 0,
        "skipped": 0,
        "failed": 0,
        "errors": [],
    }

    if not config.get("enabled"):
        return summary

    ready, reason = twg_ready()
    if not ready:
        summary["status"] = "not_configured"
        summary["errors"].append(reason)
        return summary

    if dry_run:
        summary["status"] = "dry_run_skipped"
        return summary

    allowed = set(allowed_severities(config))
    indexed = index_registry_issues(registry)

    for finding in scan.get("findings", []):
        severity = str(finding.get("severity", ""))
        if severity not in allowed:
            continue

        issue_id = str(finding.get("issue_id", "")).strip()
        if not issue_id:
            continue

        registry_issue = indexed.get(issue_id)
        if registry_issue and registry_issue.get("jira_key"):
            finding["jira_key"] = registry_issue.get("jira_key")
            finding["jira_url"] = registry_issue.get("jira_url")
            summary["skipped"] += 1
            continue

        try:
            jira_key, jira_url = create_workitem(finding, issue_id, config)
        except Exception as exc:
            summary["failed"] += 1
            summary["errors"].append(f"{issue_id}: {exc}")
            continue

        finding["jira_key"] = jira_key
        if jira_url:
            finding["jira_url"] = jira_url

        if registry_issue is not None:
            registry_issue["jira_key"] = jira_key
            if jira_url:
                registry_issue["jira_url"] = jira_url
            registry_issue["jira_synced_at"] = scan.get("finished_at")
        summary["created"] += 1

    if summary["failed"] > 0:
        summary["status"] = "completed_with_failures"
    elif summary["created"] > 0:
        summary["status"] = "synced"
    else:
        summary["status"] = "noop"

    if persist and config.get("enabled"):
        registry_path.parent.mkdir(parents=True, exist_ok=True)
        with registry_path.open("w", encoding="utf-8") as handle:
            json.dump(registry, handle, indent=2, ensure_ascii=False)
            handle.write("\n")

    return summary
