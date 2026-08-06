from __future__ import annotations

from typing import Any

from risk.models import RiskConfig
from risk.scoring import age_days
from risk.store import RiskStore


def top_risks(store: RiskStore, project_slug: str, limit: int = 5) -> list[dict[str, Any]]:
    rows = store.list_findings(project_slug, ["Open", "Reopened"])
    return [dict(row) for row in rows[:limit]]


def recurring(store: RiskStore, project_slug: str, limit: int = 10) -> list[dict[str, Any]]:
    rows = store.fetchall(
        """
        SELECT * FROM finding
        WHERE project_slug = ? AND (recurrence_count > 0 OR reopened_count > 0)
        ORDER BY reopened_count DESC, recurrence_count DESC, current_risk_score DESC
        LIMIT ?
        """,
        (project_slug, limit),
    )
    return [dict(row) for row in rows]


def unresolved(store: RiskStore, project_slug: str, limit: int = 10) -> dict[str, Any]:
    rows = store.list_findings(project_slug, ["Open", "Reopened"])
    items = [dict(row) for row in rows[:limit]]
    high = sum(1 for row in rows if str(row["effective_severity"]) == "High")
    medium = sum(1 for row in rows if str(row["effective_severity"]) == "Medium")
    low = sum(1 for row in rows if str(row["effective_severity"]) == "Low")
    reopened = sum(1 for row in rows if str(row["status"]) == "Reopened")
    return {
        "total": len(rows),
        "high": high,
        "medium": medium,
        "low": low,
        "reopened": reopened,
        "items": items,
    }


def recent_findings(store: RiskStore, project_slug: str, window_days: int = 7, limit: int = 20) -> dict[str, Any]:
    from datetime import datetime, timedelta, timezone

    days = max(int(window_days or 7), 1)
    cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    rows = store.fetchall(
        """
        SELECT * FROM finding
        WHERE project_slug = ?
          AND COALESCE(last_seen_at, first_seen_at, '') >= ?
        ORDER BY
          CASE status WHEN 'Open' THEN 0 WHEN 'Reopened' THEN 1 WHEN 'Resolved' THEN 2 ELSE 3 END,
          current_risk_score DESC,
          last_seen_at DESC
        LIMIT ?
        """,
        (project_slug, cutoff, limit),
    )
    items = [dict(row) for row in rows]
    by_status: dict[str, int] = {}
    for item in items:
        status = str(item.get("status") or "Unknown")
        by_status[status] = by_status.get(status, 0) + 1
    return {
        "window_days": days,
        "cutoff": cutoff,
        "total": len(items),
        "by_status": by_status,
        "items": items,
    }


def finding_summary(store: RiskStore, finding_id: str) -> dict[str, Any]:
    explained = explain_finding(store, finding_id)
    if explained.get("status") != "ok":
        return explained
    finding = explained["finding"]
    links = finding_links_summary(store, finding_id)
    return {
        "status": "ok",
        "finding": finding,
        "summary": {
            "id": finding.get("id"),
            "title": finding.get("title"),
            "status": finding.get("status"),
            "source_severity": finding.get("source_severity"),
            "effective_severity": finding.get("effective_severity"),
            "risk_score": finding.get("current_risk_score"),
            "risk_band": finding.get("current_risk_band"),
            "recurrence_count": finding.get("recurrence_count"),
            "reopened_count": finding.get("reopened_count"),
            "verification_status": finding.get("verification_status"),
            "remediation_status": finding.get("remediation_status"),
            "jira": links.get("jira"),
            "pull_request": links.get("pull_request"),
        },
        "links": explained.get("links") or [],
        "severity_adjustments": explained.get("severity_adjustments") or [],
    }


def compare_project_risk(store: RiskStore, project_slug: str) -> dict[str, Any]:
    latest = store.latest_project_snapshot(project_slug)
    previous = store.previous_project_snapshot(project_slug)
    if latest is None:
        return {"status": "empty"}
    latest_score = float(latest["score"])
    previous_score = float(previous["score"]) if previous is not None else latest_score
    top = top_risks(store, project_slug, limit=3)
    return {
        "status": "ok",
        "latest_score": latest_score,
        "previous_score": previous_score,
        "score_delta": round(latest_score - previous_score, 2),
        "latest_band": latest["band"],
        "previous_band": previous["band"] if previous is not None else latest["band"],
        "open_high": latest["open_high"],
        "reopened": latest["reopened"],
        "overdue_high": latest["overdue_high"],
        "top_contributing_findings": top,
    }


def overdue_high(store: RiskStore, project_slug: str, config: RiskConfig) -> list[dict[str, Any]]:
    rows = store.list_findings(project_slug, ["Open", "Reopened"])
    result = []
    for row in rows:
        if str(row["effective_severity"]) != "High":
            continue
        if age_days(row["first_seen_at"]) >= config.overdue_days:
            item = dict(row)
            item["age_days"] = round(age_days(row["first_seen_at"]), 1)
            result.append(item)
    return result


def trend(store: RiskStore, project_slug: str) -> dict[str, Any]:
    latest = store.latest_project_snapshot(project_slug)
    previous = store.previous_project_snapshot(project_slug)
    if latest is None:
        return {"status": "empty"}
    latest_score = float(latest["score"])
    previous_score = float(previous["score"]) if previous is not None else latest_score
    delta = round(latest_score - previous_score, 2)
    direction = "stable"
    if delta >= 5:
        direction = "rising"
    elif delta <= -5:
        direction = "falling"
    return {
        "status": "ok",
        "latest_score": latest_score,
        "latest_band": latest["band"],
        "previous_score": previous_score,
        "delta": delta,
        "direction": direction,
        "open_high": latest["open_high"],
        "reopened": latest["reopened"],
        "overdue_high": latest["overdue_high"],
    }


def explain_finding(store: RiskStore, finding_id: str) -> dict[str, Any]:
    finding = store.get_finding(finding_id)
    if finding is None:
        return {"status": "not_found"}
    links = store.fetchall("SELECT * FROM external_link WHERE finding_id = ?", (finding_id,))
    adjustments = store.fetchall(
        "SELECT * FROM severity_adjustment WHERE finding_id = ? ORDER BY id DESC LIMIT 3",
        (finding_id,),
    )
    events = store.fetchall(
        "SELECT * FROM finding_event WHERE finding_id = ? ORDER BY id DESC LIMIT 10",
        (finding_id,),
    )
    return {
        "status": "ok",
        "finding": dict(finding),
        "links": [dict(row) for row in links],
        "severity_adjustments": [dict(row) for row in adjustments],
        "events": [dict(row) for row in events],
    }


def finding_links_summary(store: RiskStore, finding_id: str) -> dict[str, Any]:
    links = store.fetchall("SELECT * FROM external_link WHERE finding_id = ?", (finding_id,))
    jira = next((dict(row) for row in links if row["type"] == "jira"), None)
    pr = next((dict(row) for row in links if row["type"] == "pull_request"), None)
    return {"jira": jira, "pull_request": pr}
