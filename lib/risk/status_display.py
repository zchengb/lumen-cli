from __future__ import annotations

from typing import Any


def primary_status(finding: dict[str, Any] | Any) -> str:
    row = dict(finding) if finding is not None else {}
    status = str(row.get("status") or "").strip()
    if status in {"Open", "Resolved", "Reopened", "Ignored"}:
        return status
    lower = status.lower()
    if lower in {"open", "in_progress", "pr_open"}:
        return "Open"
    if lower in {"resolved", "accepted_risk", "false_positive"}:
        return "Resolved"
    if lower == "reopened":
        return "Reopened"
    if lower == "ignored":
        return "Ignored"
    return status or "Open"


def dashboard_status(finding: dict[str, Any] | Any) -> str:
    return primary_status(finding).lower()


def resolution_basis_label(basis: str) -> str:
    value = str(basis or "").strip().lower()
    return {
        "user_confirmed": "User confirmed",
        "owner_confirmed": "Owner confirmed",
        "verified_clean": "Verified clean",
        "policy_override": "Policy override",
        "system_verified": "System verified",
    }.get(value, value.replace("_", " ").title() if value else "Not set")


def verification_label(verification_status: str) -> str:
    value = str(verification_status or "").strip().lower()
    return {
        "not_verified": "Not run",
        "pending_verification": "Not run",
        "observed": "Not run",
        "not_observed": "Not observed",
        "verified_clean": "Verified clean",
        "verification_failed": "Verification failed",
    }.get(value, value.replace("_", " ").title() if value else "Not run")


def display_status(finding: dict[str, Any] | Any) -> str:
    return primary_status(finding)


def evidence_summary(finding: dict[str, Any] | Any) -> dict[str, str]:
    row = dict(finding) if finding is not None else {}
    return {
        "primary_status": primary_status(row),
        "resolution_basis": resolution_basis_label(str(row.get("resolution_basis") or "")),
        "verification": verification_label(str(row.get("verification_status") or "")),
        "resolved_by": str(row.get("resolved_by") or ""),
        "resolved_at": str(row.get("resolved_at") or row.get("owner_resolved_at") or ""),
        "last_verified_at": str(row.get("last_verified_at") or ""),
    }
