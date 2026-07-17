#!/usr/bin/env python3
"""Structured delivery notification result parsing."""

from __future__ import annotations

import importlib.util
import re
from dataclasses import dataclass
from enum import Enum
from pathlib import Path

from delivery_workspace import read_json

_FALLBACK_SECRET_PATTERNS = [
    re.compile(r"https://open\.feishu\.cn/open-apis/bot/v2/hook/\S+", re.IGNORECASE),
    re.compile(r"(?i)(api[_-]?key|token|secret|password|authorization)\s*[=:]\s*\S+"),
]


def _load_redact():
    helper_path = Path(__file__).resolve().parent / "render-report-and-notify.py"
    if not helper_path.is_file():
        return None
    spec = importlib.util.spec_from_file_location("lumen_render_report_notify", helper_path)
    if spec is None or spec.loader is None:
        return None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    redact = getattr(module, "redact", None)
    return redact if callable(redact) else None


_REDACT = _load_redact()


def redact_notification_detail(detail: str) -> str:
    text = detail.strip()
    if not text:
        return ""
    if _REDACT is not None:
        return str(_REDACT(text))
    for pattern in _FALLBACK_SECRET_PATTERNS:
        text = pattern.sub("[REDACTED]", text)
    return text


class NotificationStatus(str, Enum):
    SENT = "sent"
    WARNING = "warning"
    SKIPPED = "skipped"
    DRY_RUN = "dry_run"


@dataclass
class NotificationResult:
    status: NotificationStatus
    detail: str
    process_exit_code: int | None = None
    provider_status: str = ""


def classify_notification_result(result_path: Path, process_exit_code: int) -> NotificationResult:
    if process_exit_code != 0:
        return NotificationResult(
            status=NotificationStatus.WARNING,
            detail=f"Delivery notification failed with exit code {process_exit_code}",
            process_exit_code=process_exit_code,
        )

    payload = read_json(result_path, {})
    feishu = payload.get("feishu", {})
    if not isinstance(feishu, dict):
        feishu = {}
    provider_status = str(feishu.get("status", "")).strip().lower()
    provider_detail = redact_notification_detail(str(feishu.get("detail", "")).strip())

    if provider_status == "sent":
        return NotificationResult(
            status=NotificationStatus.SENT,
            detail="Notifications sent",
            process_exit_code=0,
            provider_status=provider_status,
        )
    if provider_status == "skipped":
        detail = "Notifications skipped"
        if provider_detail:
            detail = f"{detail}: {provider_detail}"
        return NotificationResult(
            status=NotificationStatus.SKIPPED,
            detail=detail,
            process_exit_code=0,
            provider_status=provider_status,
        )
    if provider_status == "dry_run":
        return NotificationResult(
            status=NotificationStatus.DRY_RUN,
            detail="Dry-run notification preview generated",
            process_exit_code=0,
            provider_status=provider_status,
        )
    if provider_status == "failed":
        detail = "Feishu notification failed"
        if provider_detail:
            detail = f"{detail}: {provider_detail}"
        return NotificationResult(
            status=NotificationStatus.WARNING,
            detail=detail,
            process_exit_code=0,
            provider_status=provider_status,
        )

    detail = "Delivery notification result was missing or unknown"
    if provider_detail:
        detail = f"{detail}: {provider_detail}"
    return NotificationResult(
        status=NotificationStatus.WARNING,
        detail=detail,
        process_exit_code=0,
        provider_status=provider_status,
    )


def started_notification_detail(result: NotificationResult) -> str:
    if result.status == NotificationStatus.SENT:
        suffix = "started notification sent"
    elif result.status == NotificationStatus.SKIPPED:
        suffix = "started notification skipped"
    elif result.status == NotificationStatus.DRY_RUN:
        suffix = "started notification preview generated"
    else:
        suffix = "started notification attempted with warnings"
    return f"JIRA context captured; {suffix}"


def final_notification_detail(result: NotificationResult) -> str:
    if result.status == NotificationStatus.SENT:
        return "Notifications sent"
    if result.status == NotificationStatus.SKIPPED:
        return "Notifications skipped"
    if result.status == NotificationStatus.DRY_RUN:
        return "Dry-run notification preview generated"
    return "Notification attempted with warnings"
