from __future__ import annotations

import logging
from typing import Any

from risk.models import RiskConfig
from risk.scoring import age_days
from risk.store import RETRY_DELAYS_MINUTES, GlobalAgentStore, RiskStore, next_alert_retry_at, utc_now

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
        elif event_type == "ignore_invalidated":
            key = f"ignore-invalidated:{finding_id}:{utc_now()[:13]}"
            label = "Ignore 已失效，Finding 重新打开"
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


def _resolve_chat_id(project_slug: str, config: RiskConfig) -> str:
    if config.alert_chat_id:
        return config.alert_chat_id
    try:
        global_store = GlobalAgentStore()
        chat_id = global_store.chat_id_for_project(project_slug)
        global_store.close()
        return chat_id
    except Exception:
        return ""


def _schedule_failure(
    store: RiskStore,
    alert: dict[str, Any],
    project_slug: str,
    attempt: int,
    error: str,
) -> dict[str, Any]:
    if attempt >= len(RETRY_DELAYS_MINUTES):
        status = "dead_letter"
        next_retry = ""
    else:
        status = "failed"
        next_retry = next_alert_retry_at(attempt + 1)
    store.upsert_alert_attempt(
        project_slug,
        alert["event_key"],
        alert["event_type"],
        str(alert.get("finding_id") or ""),
        status=status,
        attempt_count=attempt,
        last_error=error,
        next_retry_at=next_retry,
    )
    return {**alert, "status": status, "attempt_count": attempt, "error": error, "next_retry_at": next_retry}


def _send_one(
    store: RiskStore,
    messenger: Any,
    chat_id: str,
    project_slug: str,
    alert: dict[str, Any],
) -> dict[str, Any]:
    existing = store.get_alert(project_slug, alert["event_key"])
    if existing is not None and str(existing["status"]) == "sent":
        return {**alert, "status": "sent", "deduped": True}
    attempt = int(existing["attempt_count"] or 0) + 1 if existing is not None else 1
    store.upsert_alert_attempt(
        project_slug,
        alert["event_key"],
        alert["event_type"],
        str(alert.get("finding_id") or ""),
        status="sending",
        attempt_count=attempt,
    )
    try:
        from feishu.risk_cards import risk_alert_card

        card = risk_alert_card(project_slug, alert)
        result = messenger.send_card(chat_id, card)
        message_id = ""
        if isinstance(result, dict):
            data = result.get("data") if isinstance(result.get("data"), dict) else {}
            message_id = str(result.get("message_id") or data.get("message_id") or "")
        store.upsert_alert_attempt(
            project_slug,
            alert["event_key"],
            alert["event_type"],
            str(alert.get("finding_id") or ""),
            status="sent",
            attempt_count=attempt,
            message_id=message_id,
        )
        return {**alert, "status": "sent", "attempt_count": attempt, "message_id": message_id}
    except Exception as exc:
        _LOG.warning("alert send failed: %s", exc)
        return _schedule_failure(store, alert, project_slug, attempt, str(exc))


def deliver_alerts(
    store: RiskStore,
    *,
    project_slug: str,
    alerts: list[dict[str, Any]],
    config: RiskConfig,
) -> list[dict[str, Any]]:
    if not alerts:
        return []
    chat_id = _resolve_chat_id(project_slug, config)
    delivered: list[dict[str, Any]] = []
    if not chat_id:
        for alert in alerts:
            store.upsert_alert_attempt(
                project_slug,
                alert["event_key"],
                alert["event_type"],
                str(alert.get("finding_id") or ""),
                status="pending",
                attempt_count=0,
                last_error="no chat mapped",
                next_retry_at=next_alert_retry_at(1),
            )
            delivered.append({**alert, "status": "pending", "error": "no chat mapped"})
        store.commit()
        return delivered

    try:
        from feishu.messenger import FeishuMessenger
    except Exception as exc:
        _LOG.warning("feishu alert imports failed: %s", exc)
        for alert in alerts:
            delivered.append(_schedule_failure(store, alert, project_slug, 1, f"import_failed:{exc}"))
        store.commit()
        return delivered

    messenger = FeishuMessenger("dylan")
    for alert in alerts:
        delivered.append(_send_one(store, messenger, chat_id, project_slug, alert))
    store.commit()

    try:
        global_store = GlobalAgentStore()
        for alert in delivered:
            if alert.get("status") != "sent":
                continue
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


def retry_failed_alerts(
    store: RiskStore,
    *,
    project_slug: str,
    config: RiskConfig,
) -> list[dict[str, Any]]:
    rows = store.list_retryable_alerts(project_slug)
    alerts = []
    for row in rows:
        alert = {
            "event_key": row["event_key"],
            "event_type": row["event_type"],
            "finding_id": row["finding_id"],
            "label": row["event_type"],
            "title": "",
            "repository": "",
            "score": 0,
            "band": "",
            "severity": "",
        }
        finding = store.get_finding(str(alert.get("finding_id") or ""))
        if finding is not None:
            alert["title"] = finding["title"]
            alert["repository"] = finding["repository"]
            alert["score"] = finding["current_risk_score"]
            alert["band"] = finding["current_risk_band"]
            alert["severity"] = finding["effective_severity"]
        alerts.append(alert)
    return deliver_alerts(store, project_slug=project_slug, alerts=alerts, config=config)
