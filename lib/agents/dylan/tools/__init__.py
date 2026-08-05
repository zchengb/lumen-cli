from __future__ import annotations

from typing import Any

from agents.dylan.tools.agent_tools import get_agent_profile, get_agent_relationship, list_agent_capabilities
from agents.dylan.tools.common import envelope
from agents.dylan.tools.context_tools import get_thread_context, resolve_previous_result, resolve_recent_run
from agents.dylan.tools.risk_tools import (
    compare_project_risk,
    explain_finding,
    get_finding_links,
    get_finding_status,
    get_finding_summary,
    query_overdue_high,
    query_project_trend,
    query_recurring_findings,
    query_top_risks,
    query_unresolved_findings,
)
from agents.dylan.tools.scan_tools import get_recent_scan_status, get_scan_result, get_scan_summary

REGISTRY = {
    "get_recent_scan_status": get_recent_scan_status,
    "get_scan_summary": get_scan_summary,
    "get_scan_result": get_scan_result,
    "query_top_risks": query_top_risks,
    "query_unresolved_findings": query_unresolved_findings,
    "query_project_trend": query_project_trend,
    "query_recurring_findings": query_recurring_findings,
    "query_overdue_high": query_overdue_high,
    "explain_finding": explain_finding,
    "get_finding_status": get_finding_status,
    "get_finding_links": get_finding_links,
    "get_finding_summary": get_finding_summary,
    "compare_project_risk": compare_project_risk,
    "get_thread_context": get_thread_context,
    "resolve_previous_result": resolve_previous_result,
    "resolve_recent_run": resolve_recent_run,
    "get_agent_profile": get_agent_profile,
    "get_agent_relationship": get_agent_relationship,
    "list_agent_capabilities": list_agent_capabilities,
}


def execute_tool(name: str, arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    fn = REGISTRY.get(name)
    if fn is None:
        return envelope(name, {}, status="error", errors=[f"unknown tool: {name}"])
    try:
        return fn(arguments or {}, runtime=runtime)
    except Exception as exc:
        return envelope(name, {}, status="error", errors=[str(exc)])
