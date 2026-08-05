from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Optional

from risk.correlation import category_from_finding, module_from_path
from risk.models import DEFAULT_BANDS, RiskConfig, ScoreBreakdown, SEVERITIES


SEVERITY_SCORE = {"High": 100.0, "Medium": 55.0, "Low": 20.0}


def _parse_ts(value: str | None) -> Optional[datetime]:
    raw = str(value or "").strip()
    if not raw:
        return None
    if raw.endswith("Z"):
        raw = raw[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(raw)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def age_days(first_seen_at: str | None, now: Optional[datetime] = None) -> float:
    start = _parse_ts(first_seen_at)
    if start is None:
        return 0.0
    current = now or datetime.now(timezone.utc)
    return max((current - start).total_seconds() / 86400.0, 0.0)


def band_for_score(score: float, bands: dict[str, float] | None = None) -> str:
    cfg = bands or DEFAULT_BANDS
    if score <= float(cfg.get("low_max", 35)):
        return "Low"
    if score <= float(cfg.get("medium_max", 65)):
        return "Medium"
    return "High"


def compute_effective_severity(
    source_severity: str,
    *,
    recurrence_count: int,
    reopened_count: int,
    module: str,
    critical_modules: list[str],
    category: str,
    title: str,
) -> tuple[str, list[str]]:
    source = source_severity if source_severity in SEVERITIES else "Medium"
    if source == "High":
        return "High", []
    reasons: list[str] = []
    blob = f"{category} {title}".lower()
    if recurrence_count >= 2:
        reasons.append("recurrence")
    if reopened_count >= 1:
        reasons.append("reopened")
    if module and module.lower() in {item.lower() for item in critical_modules}:
        reasons.append("critical_module")
    if any(token in blob for token in ("security", "auth", "payment", "consistency", "sql", "xss")):
        reasons.append("security_or_consistency")
    if source == "Medium" and len(reasons) >= 2:
        return "High", reasons
    if source == "Low" and len(reasons) >= 3:
        return "Medium", reasons
    return source, []


def score_finding(
    *,
    effective_severity: str,
    recurrence_count: int,
    reopened_count: int,
    module: str,
    first_seen_at: str | None,
    has_jira: bool,
    has_pr: bool,
    config: RiskConfig,
    category: str = "",
) -> ScoreBreakdown:
    weights = config.weights
    parts: dict[str, float] = {}
    reasons: list[str] = []

    sev = SEVERITY_SCORE.get(effective_severity, 55.0)
    parts["severity"] = sev * weights.get("severity", 0.3)
    reasons.append(f"effective_severity={effective_severity}")

    recurrence = min(recurrence_count + reopened_count * 2, 8) / 8.0 * 100.0
    parts["recurrence"] = recurrence * weights.get("recurrence", 0.18)
    if recurrence_count or reopened_count:
        reasons.append(f"recurrence={recurrence_count}, reopened={reopened_count}")

    blast = 70.0 if category in {"payment", "auth", "security"} else 35.0
    parts["blast_radius"] = blast * weights.get("blast_radius", 0.15)

    critical = 100.0 if module.lower() in set(config.critical_modules) else 0.0
    parts["critical_module"] = critical * weights.get("critical_module", 0.12)
    if critical:
        reasons.append(f"critical_module={module}")

    age = min(age_days(first_seen_at) / 30.0, 1.0) * 100.0
    parts["age"] = age * weights.get("age", 0.08)

    activity = min((recurrence_count + 1) / 5.0, 1.0) * 100.0
    parts["activity"] = activity * weights.get("activity", 0.07)

    gap = 0.0
    if not has_jira:
        gap += 50.0
        reasons.append("missing_jira")
    if not has_pr:
        gap += 50.0
        reasons.append("missing_pr")
    parts["remediation_gap"] = gap * weights.get("remediation_gap", 0.10)

    total = round(sum(parts.values()), 2)
    band = band_for_score(total, config.bands)
    return ScoreBreakdown(total=total, band=band, parts=parts, reasons=reasons)


def score_project(
    findings: list[dict[str, Any]],
    *,
    config: RiskConfig,
) -> ScoreBreakdown:
    open_findings = [item for item in findings if item.get("status") in {"Open", "Reopened"}]
    if not open_findings:
        return ScoreBreakdown(total=0.0, band="Low", parts={"empty": 0.0}, reasons=["no_open_findings"])
    ranked = sorted(open_findings, key=lambda item: float(item.get("current_risk_score") or 0), reverse=True)
    top = ranked[:5]
    top_avg = sum(float(item.get("current_risk_score") or 0) for item in top) / max(len(top), 1)
    open_high = sum(1 for item in open_findings if str(item.get("effective_severity")) == "High")
    reopened = sum(1 for item in open_findings if item.get("status") == "Reopened")
    overdue = 0
    for item in open_findings:
        if str(item.get("effective_severity")) != "High":
            continue
        if age_days(item.get("first_seen_at")) >= config.overdue_days:
            overdue += 1
    total = round(
        top_avg * 0.55
        + min(open_high * 8, 40)
        + min(reopened * 6, 20)
        + min(overdue * 7, 20),
        2,
    )
    return ScoreBreakdown(
        total=total,
        band=band_for_score(total, config.bands),
        parts={
            "top_findings": round(top_avg * 0.55, 2),
            "open_high": float(open_high),
            "reopened": float(reopened),
            "overdue_high": float(overdue),
        },
        reasons=[
            f"open_high={open_high}",
            f"reopened={reopened}",
            f"overdue_high={overdue}",
        ],
    )
