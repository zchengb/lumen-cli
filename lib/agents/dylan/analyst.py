from __future__ import annotations

from pathlib import Path
from typing import Any

from risk.alerts import deliver_alerts, evaluate_alerts
from risk.ingestion import ingest_scan_risk
from risk.models import RiskConfig
from risk.store import GlobalAgentStore, RiskStore


def process_scan_for_dylan(
    *,
    workspace: Path,
    scan: dict[str, Any],
    registry: dict[str, Any],
    common: dict[str, Any],
    result_path: Path,
    dry_run: bool = False,
) -> dict[str, Any]:
    config = RiskConfig.from_common(common)
    if not config.enabled:
        return {"status": "disabled"}
    result = ingest_scan_risk(
        workspace=workspace,
        scan=scan,
        registry=registry,
        common=common,
        result_path=result_path,
        dry_run=dry_run,
    )
    if result.get("status") != "updated":
        return result
    store = RiskStore(workspace)
    try:
        alerts = evaluate_alerts(
            store,
            project_slug=str(result.get("project_slug") or ""),
            events=list(result.get("events") or []),
            config=config,
        )
        delivered = deliver_alerts(
            store,
            project_slug=str(result.get("project_slug") or ""),
            alerts=alerts,
            config=config,
        )
        result["alerts"] = delivered
        try:
            global_store = GlobalAgentStore()
            global_store.cache_project_summary(
                str(result.get("project_slug") or ""),
                {
                    "project_risk": result.get("project_risk"),
                    "scan_run_id": result.get("scan_run_id"),
                },
            )
            global_store.close()
        except Exception:
            pass
    finally:
        store.close()
    return result
