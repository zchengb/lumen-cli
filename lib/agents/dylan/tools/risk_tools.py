from __future__ import annotations

from typing import Any

from agents.dylan.tools.common import envelope
from risk.models import RiskConfig
from risk.queries import explain_finding as q_explain
from risk.queries import finding_links_summary, overdue_high, recurring, top_risks, trend
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
