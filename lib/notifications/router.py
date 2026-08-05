from __future__ import annotations

from typing import Any, Optional

from agents.registry import resolve_owner_agent
from notifications.events import NotificationEvent
from notifications.policies import (
    MODE_AGENT,
    MODE_DUAL,
    MODE_LEGACY,
    fallback_to_legacy,
    normalize_mode,
    read_notification_mode,
)
from notifications.transports.feishu_app import FeishuAppTransport
from notifications.transports.legacy_webhook import LegacyWebhookTransport
from notifications.transports.null import NullTransport


def _legacy_status(results: list[dict[str, Any]], event: NotificationEvent) -> dict[str, Any]:
    legacy = next((item for item in results if item.get("transport") == "legacy_webhook"), None)
    app = next((item for item in results if item.get("transport") == "feishu_app"), None)
    null = next((item for item in results if item.get("transport") == "null"), None)
    chosen = legacy or app or null or {"status": "skipped", "detail": "no transport"}
    status = str(chosen.get("status") or "skipped")
    feishu: dict[str, Any] = {"status": status}
    if status == "sent":
        feishu["error"] = None
        if event.event_type:
            feishu["event"] = event.event_type
    elif status in {"skipped", "dry_run", "dry_run_skipped"}:
        detail = chosen.get("detail") or chosen.get("error")
        if detail:
            feishu["detail"] = detail
            feishu["error"] = detail
        else:
            feishu["error"] = None
        if event.event_type and status.startswith("dry_run"):
            feishu["event"] = event.event_type
    else:
        feishu["error"] = chosen.get("detail") or chosen.get("error") or "notification failed"
        if "detail" in chosen:
            feishu["detail"] = chosen["detail"]
    feishu["transports"] = results
    return feishu


def _resolve_mode(event: NotificationEvent, config: Optional[dict]) -> str:
    if config is not None:
        return read_notification_mode(config)
    if event.meta.get("mode"):
        return normalize_mode(event.meta.get("mode"))
    return MODE_LEGACY


def publish_notification(
    event: NotificationEvent,
    *,
    config: Optional[dict] = None,
    legacy_transport: Optional[LegacyWebhookTransport] = None,
    app_transport: Optional[FeishuAppTransport] = None,
    null_transport: Optional[NullTransport] = None,
) -> dict[str, Any]:
    if not event.owner_agent:
        event.owner_agent = resolve_owner_agent(event.workflow)

    mode = _resolve_mode(event, config)
    legacy = legacy_transport or LegacyWebhookTransport()
    app = app_transport or FeishuAppTransport(event.owner_agent)
    null = null_transport or NullTransport()
    results: list[dict[str, Any]] = []

    if event.dry_run:
        results.append(null.send(NotificationEvent(
            event_type=event.event_type,
            workflow=event.workflow,
            skip_detail="dry_run",
        )))
        mapped = _legacy_status(results, event)
        if event.workflow == "auto_scan":
            mapped["status"] = "dry_run_skipped"
            mapped["error"] = None
        else:
            mapped["status"] = "dry_run"
            mapped["event"] = event.event_type
            mapped["error"] = None
        mapped["transports"] = results
        return mapped

    if event.skip:
        results.append(null.send(NotificationEvent(
            event_type=event.event_type,
            workflow=event.workflow,
            skip_detail=event.skip_detail or "skipped",
        )))
        return _legacy_status(results, event)

    use_legacy = mode in {MODE_LEGACY, MODE_DUAL}
    use_app = mode in {MODE_DUAL, MODE_AGENT}
    allow_fallback = fallback_to_legacy(config) if config is not None else True

    if use_app:
        try:
            results.append(app.send(event))
        except Exception as exc:
            results.append({
                "transport": "feishu_app",
                "status": "failed",
                "detail": str(exc),
            })
            if mode == MODE_AGENT and allow_fallback:
                use_legacy = True

    if use_legacy:
        try:
            results.append(legacy.send(event))
        except Exception as exc:
            results.append({
                "transport": "legacy_webhook",
                "status": "failed",
                "detail": str(exc),
            })

    if not results:
        results.append(null.send(NotificationEvent(
            event_type=event.event_type,
            workflow=event.workflow,
            skip_detail="no transport selected",
        )))

    return _legacy_status(results, event)
