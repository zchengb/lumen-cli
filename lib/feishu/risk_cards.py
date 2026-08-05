from __future__ import annotations

from typing import Any


def risk_alert_card(project_slug: str, alert: dict[str, Any]) -> dict[str, Any]:
    title = str(alert.get("label") or "Risk Alert")
    body = (
        f"Project: {project_slug}\n"
        f"Finding: {alert.get('title')}\n"
        f"Repo: {alert.get('repository')}\n"
        f"Severity: {alert.get('severity')} | Score: {alert.get('score')} | Band: {alert.get('band')}\n"
        f"ID: {alert.get('finding_id')}"
    )
    return {
        "header": {
            "title": {"tag": "plain_text", "content": f"Dylan · {title}"},
            "template": "orange",
        },
        "elements": [
            {"tag": "div", "text": {"tag": "plain_text", "content": body}},
        ],
    }


def weekly_brief_card(project_slug: str, brief: dict[str, Any]) -> dict[str, Any]:
    trend = brief.get("trend") if isinstance(brief.get("trend"), dict) else {}
    top = brief.get("top_concerns") if isinstance(brief.get("top_concerns"), list) else []
    lines = [
        f"Project Risk: {trend.get('latest_score', '-')} ({trend.get('latest_band', '-')})",
        f"Trend: {trend.get('direction', 'unknown')} (Δ {trend.get('delta', 0)})",
        f"New/Open High: {trend.get('open_high', 0)} | Reopened: {trend.get('reopened', 0)} | Overdue: {trend.get('overdue_high', 0)}",
        f"Data freshness: {brief.get('data_freshness', 'fresh')}",
        "",
        "Top concerns:",
    ]
    if not top:
        lines.append("- none")
    for item in top[:3]:
        lines.append(
            f"- [{item.get('effective_severity')}] {item.get('title')} (score {item.get('current_risk_score')})"
        )
    return {
        "header": {
            "title": {"tag": "plain_text", "content": f"Dylan · Weekly Risk Brief · {project_slug}"},
            "template": "blue",
        },
        "elements": [
            {"tag": "div", "text": {"tag": "plain_text", "content": "\n".join(lines)}},
        ],
    }
