from __future__ import annotations

import json
import logging
from typing import Any, Optional

from risk.models import RiskConfig
from risk.scoring import age_days
from risk.store import GlobalAgentStore, RiskStore

_LOG = logging.getLogger("lumen.risk.alerts")


def evaluate_alerts(
    store: RiskStore,
    *,
    project_slug: str,
    events: list[dict[str, Any]],
    config: RiskConfig,
) -> list[dict[str, Any]]:
    pending: list[dict[str, Any]] = []
    for event in events:
        finding_id = str(event.get("finding_id") or "")
        event_type = str(event.get("type") or "")
        if not finding_id or not event_type:
            continue
        finding = store.get_finding(finding_id)
        if finding is None:
            continue
        if event_type == "new_finding" and str(event.get("severity") or finding["effective_severity"]) != "High":
            continue
        if event_type == "new_finding":
            key = f"new-high:{finding_id}"
            label = "新增 High Finding"
        elif event_type == "reopened":
            key = f"reopened:{finding_id}:{finding['reopened_count']}"
            label = "Finding 复发 / Reopened"
        elif event_type == "severity_upgraded":
            key = f"sev-up:{finding_id}:{event.get('to')}"
            label = f"Severity 提升至 {event.get('to')}"
        elif event_type == "score_increased":
            key = f"score-up:{finding_id}:{int(float(event.get('to') or 0))}"
            label = "Risk Score 显著上升"
        elif event_type == "band_high":
            key = f"band-high:{finding_id}"
            label = "Risk Band 进入 High"
        else:
            continue
        if store.alert_already_sent(project_slug, key):
            continue
        pending.append(
            {
                "event_key": key,
                "event_type": event_type,
                "label": label,
                "finding_id": finding_id,
                "title": finding["title"],
                "repository": finding["repository"],
                "score": finding["current_risk_score"],
                "band": finding["current_risk_band"],
                "severity": finding["effective_severity"],
            }
        )

    # overdue highs
    for finding in store.list_findings(project_slug, ["Open", "Reopened"]):
        if str(finding["effective_severity"]) != "High":
            continue
        if age_days(finding["first_seen_at"]) < config.overdue_days:
            continue
        key = f"overdue:{finding['id']}:{config.overdue_days}"
        if store.alert_already_sent(project_slug, key):
            continue
        pending.append(
            {
                "event_key": key,
                "event_type": "overdue_high",
                "label": f"High 超过 {config.overdue_days} 天未处理",
                "finding_id": finding["id"],
                "title": finding["title"],
                "repository": finding["repository"],
                "score": finding["current_risk_score"],
                "band": finding["current_risk_band"],
                "severity": finding["effective_severity"],
            }
        )
    return pending


def deliver_alerts(
    store: RiskStore,
    *,
    project_slug: str,
    alerts: list[dict[str, Any]],
    config: RiskConfig,
) -> list[dict[str, Any]]:
    if not alerts:
        return []
    chat_id = config.alert_chat_id
    if not chat_id:
        try:
            global_store = GlobalAgentStore()
            row = global_store.conn.execute(
                "SELECT chat_id FROM chat_project_map WHERE project_slug = ? LIMIT 1",
                (project_slug,),
            ).fetchone()
            chat_id = str(row["chat_id"]) if row else ""
            global_store.close()
        except Exception:
            chat_id = ""
    delivered: list[dict[str, Any]] = []
    if not chat_id:
        for alert in alerts:
            store.record_alert(project_slug, alert["event_key"], alert["event_type"], alert["finding_id"])
            delivered.append({**alert, "status": "recorded_no_chat"})
        store.commit()
        return delivered

    try:
        from feishu.messenger import FeishuMessenger
        from feishu.risk_cards import risk_alert_card
    except Exception as exc:
        _LOG.warning("feishu alert imports failed: %s", exc)
        for alert in alerts:
            store.record_alert(project_slug, alert["event_key"], alert["event_type"], alert["finding_id"])
        store.commit()
        return [{**alert, "status": "recorded_import_failed"} for alert in alerts]

    messenger = FeishuMessenger("dylan")
    for alert in alerts:
        try:
            card = risk_alert_card(project_slug, alert)
            messenger.send_card(chat_id, card)
            store.record_alert(project_slug, alert["event_key"], alert["event_type"], alert["finding_id"])
            delivered.append({**alert, "status": "sent"})
        except Exception as exc:
            _LOG.warning("alert send failed: %s", exc)
            store.record_alert(project_slug, alert["event_key"], alert["event_type"], alert["finding_id"])
            delivered.append({**alert, "status": "failed", "error": str(exc)})
    store.commit()
    try:
        global_store = GlobalAgentStore()
        for alert in delivered:
            global_store.conn.execute(
                """
                INSERT OR IGNORE INTO alert_delivery_global(project_slug, finding_id, event_key, delivered_at)
                VALUES (?, ?, ?, datetime('now'))
                """,
                (project_slug, alert.get("finding_id"), alert.get("event_key")),
            )
        global_store.conn.commit()
        global_store.close()
    except Exception:
        pass
    return delivered
