from __future__ import annotations

from typing import Any

from agents.dylan.tools.common import envelope
from risk.models import RiskConfig
from risk.queries import explain_finding as q_explain
from risk.queries import (
    compare_project_risk as q_compare,
    finding_links_summary,
    finding_summary as q_summary,
    overdue_high,
    recent_findings as q_recent,
    recurring,
    top_risks,
    trend,
    unresolved as q_unresolved,
)
from risk.store import RiskStore, utc_now


def _store(runtime: dict[str, Any]) -> RiskStore | None:
    store = runtime.get("risk_store")
    if store is not None:
        return store
    workspace = runtime.get("workspace")
    if workspace is None:
        return None
    return RiskStore(workspace)


def _slug(arguments: dict[str, Any], runtime: dict[str, Any]) -> str:
    return str(arguments.get("project_slug") or runtime.get("project_slug") or "").strip()


def query_top_risks(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    slug = _slug(arguments, runtime)
    if store is None or not slug:
        return envelope("query_top_risks", {"items": []}, status="error", errors=["missing store/project"])
    limit = int(arguments.get("limit") or 5)
    items = top_risks(store, slug, limit=limit)
    return envelope("query_top_risks", {"items": items}, freshness={"source": "risk_store", "updated_at": utc_now()})


def query_project_trend(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    slug = _slug(arguments, runtime)
    if store is None or not slug:
        return envelope("query_project_trend", {}, status="error", errors=["missing store/project"])
    return envelope("query_project_trend", trend(store, slug), freshness={"source": "risk_store", "updated_at": utc_now()})


def query_recurring_findings(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    slug = _slug(arguments, runtime)
    if store is None or not slug:
        return envelope("query_recurring_findings", {"items": []}, status="error", errors=["missing store/project"])
    return envelope(
        "query_recurring_findings",
        {"items": recurring(store, slug)},
        freshness={"source": "risk_store", "updated_at": utc_now()},
    )


def query_overdue_high(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    slug = _slug(arguments, runtime)
    common = runtime.get("common") if isinstance(runtime.get("common"), dict) else {}
    if store is None or not slug:
        return envelope("query_overdue_high", {"items": []}, status="error", errors=["missing store/project"])
    return envelope(
        "query_overdue_high",
        {"items": overdue_high(store, slug, RiskConfig.from_common(common))},
        freshness={"source": "risk_store", "updated_at": utc_now()},
    )


def explain_finding(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    finding_id = str(arguments.get("finding_id") or "").strip()
    if store is None or not finding_id:
        return envelope("explain_finding", {}, status="error", errors=["missing finding"])
    return envelope("explain_finding", q_explain(store, finding_id), freshness={"source": "risk_store", "updated_at": utc_now()})


def get_finding_status(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    finding_id = str(arguments.get("finding_id") or "").strip()
    if store is None or not finding_id:
        return envelope("get_finding_status", {}, status="error", errors=["missing finding"])
    row = store.get_finding(finding_id)
    if row is None:
        return envelope("get_finding_status", {}, status="not_found")
    data = dict(row)
    return envelope("get_finding_status", data, freshness={"source": "risk_store", "updated_at": utc_now()})


def get_finding_links(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    finding_id = str(arguments.get("finding_id") or "").strip()
    if store is None or not finding_id:
        return envelope("get_finding_links", {}, status="error", errors=["missing finding"])
    return envelope(
        "get_finding_links",
        finding_links_summary(store, finding_id),
        freshness={"source": "risk_store", "updated_at": utc_now()},
    )


def query_unresolved_findings(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    slug = _slug(arguments, runtime)
    if store is None or not slug:
        return envelope("query_unresolved_findings", {}, status="error", errors=["missing store/project"])
    limit = int(arguments.get("limit") or 10)
    return envelope(
        "query_unresolved_findings",
        q_unresolved(store, slug, limit=limit),
        freshness={"source": "risk_store", "updated_at": utc_now()},
    )


def query_recent_findings(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    slug = _slug(arguments, runtime)
    if store is None or not slug:
        return envelope("query_recent_findings", {}, status="error", errors=["missing store/project"])
    window_days = int(arguments.get("window_days") or arguments.get("days") or 7)
    limit = int(arguments.get("limit") or 20)
    return envelope(
        "query_recent_findings",
        q_recent(store, slug, window_days=window_days, limit=limit),
        freshness={"source": "risk_store", "updated_at": utc_now()},
    )


def get_finding_summary(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    finding_id = str(arguments.get("finding_id") or "").strip()
    if store is None or not finding_id:
        return envelope("get_finding_summary", {}, status="error", errors=["missing finding"])
    return envelope(
        "get_finding_summary",
        q_summary(store, finding_id),
        freshness={"source": "risk_store", "updated_at": utc_now()},
    )


def compare_project_risk(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = _store(runtime)
    slug = _slug(arguments, runtime)
    if store is None or not slug:
        return envelope("compare_project_risk", {}, status="error", errors=["missing store/project"])
    return envelope(
        "compare_project_risk",
        q_compare(store, slug),
        freshness={"source": "risk_store", "updated_at": utc_now()},
    )
