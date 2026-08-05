from __future__ import annotations

import json
from typing import Any

from risk.models import RiskConfig
from risk.scoring import age_days, score_project
from risk.store import RiskStore, utc_now


def persist_project_snapshot(
    store: RiskStore,
    project_slug: str,
    scan_run_id: str,
    config: RiskConfig,
) -> dict[str, Any]:
    rows = store.list_findings(project_slug)
    findings = [dict(row) for row in rows]
    breakdown = score_project(findings, config=config)
    open_high = sum(
        1
        for item in findings
        if item.get("status") in {"Open", "Reopened"} and item.get("effective_severity") == "High"
    )
    reopened = sum(1 for item in findings if item.get("status") == "Reopened")
    overdue_high = sum(
        1
        for item in findings
        if item.get("status") in {"Open", "Reopened"}
        and item.get("effective_severity") == "High"
        and age_days(item.get("first_seen_at")) >= config.overdue_days
    )
    payload = {
        "score": breakdown.total,
        "band": breakdown.band,
        "parts": breakdown.parts,
        "reasons": breakdown.reasons,
        "open_high": open_high,
        "reopened": reopened,
        "overdue_high": overdue_high,
    }
    store.execute(
        """
        INSERT INTO project_risk_snapshot(
            project_slug, scan_run_id, score, band, open_high, reopened, overdue_high, payload_json, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            project_slug,
            scan_run_id,
            breakdown.total,
            breakdown.band,
            open_high,
            reopened,
            overdue_high,
            json.dumps(payload, ensure_ascii=False),
            utc_now(),
        ),
    )
    return payload
