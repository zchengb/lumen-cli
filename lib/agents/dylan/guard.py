from __future__ import annotations

import re
from typing import Any


def validate_response(text: str, tool_results: list[dict[str, Any]], *, project_slug: str = "") -> dict[str, Any]:
    violations: list[dict[str, str]] = []
    allowed_findings: set[str] = set()
    allowed_jira: set[str] = set()
    allowed_prs: set[str] = set()
    allowed_runs: set[str] = set()
    saw_jira_query = False
    saw_pr_query = False
    saw_finding_query = False
    saw_run_query = False

    for result in tool_results:
        tool = str(result.get("tool") or "")
        data = result.get("data") if isinstance(result.get("data"), dict) else {}
        if tool in {"query_top_risks", "query_unresolved_findings", "explain_finding", "get_finding_summary", "get_finding_status"}:
            saw_finding_query = True
        if tool in {"get_finding_links", "explain_finding", "get_finding_summary"}:
            saw_jira_query = True
            saw_pr_query = True
        if tool.startswith("get_recent_scan") or tool.startswith("get_scan"):
            saw_run_query = True
        if "items" in data and isinstance(data["items"], list):
            for item in data["items"]:
                if isinstance(item, dict) and item.get("id"):
                    allowed_findings.add(str(item["id"]))
        finding = data.get("finding") if isinstance(data.get("finding"), dict) else data
        if isinstance(finding, dict) and finding.get("id"):
            allowed_findings.add(str(finding["id"]))
        summary = data.get("summary") if isinstance(data.get("summary"), dict) else {}
        if summary.get("id"):
            allowed_findings.add(str(summary["id"]))
        for link_key in ("jira", "pull_request"):
            link = data.get(link_key) or summary.get(link_key)
            if isinstance(link, dict):
                if link.get("external_id"):
                    allowed_jira.add(str(link["external_id"]))
                if link.get("url"):
                    allowed_prs.add(str(link["url"]))
        for link in data.get("links") or []:
            if not isinstance(link, dict):
                continue
            if link.get("type") == "jira" and link.get("external_id"):
                allowed_jira.add(str(link["external_id"]))
            if link.get("type") == "pull_request" and link.get("url"):
                allowed_prs.add(str(link["url"]))
        if data.get("run_id"):
            allowed_runs.add(str(data["run_id"]))

    for match in re.finditer(r"\bFIND-[a-f0-9]{8,}\b", text, re.I):
        value = match.group(0)
        if value not in allowed_findings:
            if saw_finding_query or not allowed_findings:
                violations.append({"type": "unknown_finding", "value": value})
    for match in re.finditer(r"\b[A-Z][A-Z0-9]+-\d+\b", text):
        value = match.group(0)
        if value.startswith("FIND-") or value.startswith("ISSUE-"):
            continue
        if value not in allowed_jira and (saw_jira_query or not allowed_jira):
            if re.search(r"\bJira\b|\bjira\b|MBPAS|PROJ", text):
                violations.append({"type": "unknown_jira", "value": value})
    for match in re.finditer(r"https?://[^\s]+/pull/\d+", text):
        value = match.group(0)
        if value not in allowed_prs and (saw_pr_query or not allowed_prs):
            violations.append({"type": "unknown_pr", "value": value})
    for match in re.finditer(r"\bscan-[A-Za-z0-9_-]+\b", text):
        value = match.group(0)
        if value not in allowed_runs and (saw_run_query or not allowed_runs):
            violations.append({"type": "unknown_run", "value": value})
    if re.search(
        r"(I (have|just) (resolved|ignored|created|assigned)|我已经把|我已将|已忽略|已降级|已创建 Jira|已指派 Irving)",
        text,
        re.I,
    ):
        violations.append({"type": "unapproved_mutation_claim", "value": "state mutation"})

    return {"valid": not violations, "violations": violations}
