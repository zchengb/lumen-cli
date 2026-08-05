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
