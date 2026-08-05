from __future__ import annotations

import re
from typing import Any


def validate_response(text: str, tool_results: list[dict[str, Any]], *, project_slug: str = "") -> dict[str, Any]:
    violations: list[dict[str, str]] = []
    allowed_findings: set[str] = set()
    allowed_jira: set[str] = set()
    allowed_prs: set[str] = set()
    allowed_runs: set[str] = set()
    allowed_scores: set[str] = set()
    allowed_severities: set[str] = set()

    for result in tool_results:
        data = result.get("data") if isinstance(result.get("data"), dict) else {}
        if "items" in data and isinstance(data["items"], list):
            for item in data["items"]:
                if isinstance(item, dict):
                    if item.get("id"):
                        allowed_findings.add(str(item["id"]))
                    if item.get("current_risk_score") is not None:
                        allowed_scores.add(str(item["current_risk_score"]))
                    if item.get("effective_severity"):
                        allowed_severities.add(str(item["effective_severity"]))
        finding = data.get("finding") if isinstance(data.get("finding"), dict) else data
        if isinstance(finding, dict) and finding.get("id"):
            allowed_findings.add(str(finding["id"]))
            if finding.get("current_risk_score") is not None:
                allowed_scores.add(str(finding["current_risk_score"]))
            if finding.get("effective_severity"):
                allowed_severities.add(str(finding["effective_severity"]))
        for link_key in ("jira", "pull_request"):
            link = data.get(link_key)
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
        if isinstance(data.get("summary"), dict) is False and data.get("status"):
            pass

    for match in re.finditer(r"\bFIND-[a-f0-9]{8,}\b", text, re.I):
        value = match.group(0)
        if allowed_findings and value not in allowed_findings:
            violations.append({"type": "unknown_finding", "value": value})
    for match in re.finditer(r"\b[A-Z][A-Z0-9]+-\d+\b", text):
        value = match.group(0)
        if value.startswith("FIND-") or value.startswith("ISSUE-"):
            continue
        if allowed_jira and value not in allowed_jira:
            # only enforce when tools returned jira facts
            if any(
                isinstance((r.get("data") or {}).get("jira"), dict)
                or any(isinstance(x, dict) and x.get("type") == "jira" for x in ((r.get("data") or {}).get("links") or []))
                for r in tool_results
            ):
                violations.append({"type": "unknown_jira", "value": value})
    for match in re.finditer(r"https?://[^\s]+/pull/\d+", text):
        value = match.group(0)
        if allowed_prs and value not in allowed_prs:
            violations.append({"type": "unknown_pr", "value": value})
    for match in re.finditer(r"\bscan-[A-Za-z0-9_-]+\b", text):
        value = match.group(0)
        if allowed_runs and value not in allowed_runs:
            violations.append({"type": "unknown_run", "value": value})
    if project_slug and re.search(rf"\b{re.escape(project_slug)}\b", text) is None:
        # project mention optional; do not violate
        pass
    if re.search(r"(我已经把|我已将|已忽略|已降级|已创建 Jira|已指派 Irving)", text):
        violations.append({"type": "unapproved_mutation_claim", "value": "state mutation"})

    return {"valid": not violations, "violations": violations}
