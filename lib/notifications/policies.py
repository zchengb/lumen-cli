from __future__ import annotations

from typing import Any


MODE_LEGACY = "legacy"
MODE_DUAL = "dual"
MODE_AGENT = "agent"
VALID_MODES = {MODE_LEGACY, MODE_DUAL, MODE_AGENT}


def normalize_mode(value: Any) -> str:
    mode = str(value or MODE_LEGACY).strip().lower()
    if mode not in VALID_MODES:
        return MODE_LEGACY
    return mode


def read_notification_mode(config: dict | None) -> str:
    notifications = config.get("notifications") if isinstance(config, dict) else None
    if not isinstance(notifications, dict):
        return MODE_LEGACY
    return normalize_mode(notifications.get("mode"))


def fallback_to_legacy(config: dict | None) -> bool:
    notifications = config.get("notifications") if isinstance(config, dict) else None
    if not isinstance(notifications, dict):
        return True
    if "fallback_to_legacy_webhook" not in notifications:
        return True
    return bool(notifications.get("fallback_to_legacy_webhook"))
