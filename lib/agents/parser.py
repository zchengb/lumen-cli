from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Optional


@dataclass
class ParsedAction:
    name: str
    confidence: float
    source: str
    params: dict[str, Any] = field(default_factory=dict)


_DAY_RE = re.compile(r"(?:最近|近)?\s*(\d+)\s*天")
_CN_DAYS = {
    "一": 1, "两": 2, "二": 2, "三": 3, "四": 4, "五": 5,
    "六": 6, "七": 7, "八": 8, "九": 9, "十": 10,
}
_CN_DAY_RE = re.compile(r"(?:最近|近)?\s*([一二两三四五六七八九十])\s*天")
_STATUS_RE = re.compile(r"(完成了吗|怎么样了|状态|status|到哪)", re.I)
_CANCEL_RE = re.compile(r"(取消|cancel|停下|stop)", re.I)
_SCAN_RE = re.compile(r"(扫描|扫一下|scan|看看代码|代码审查)", re.I)
_SLUG_RE = re.compile(r"\b([a-z][a-z0-9_-]{1,32})\b", re.I)
_FINDING_ID_RE = re.compile(r"\b(FIND-[a-f0-9]{8,}|ISSUE-[A-Za-z0-9]+)\b", re.I)
_RISK_TOP_RE = re.compile(r"(最大的?(工程)?风险|top\s*risk|最值得注意|最严重)", re.I)
_RISK_TREND_RE = re.compile(r"(上升还是下降|风险趋势|比上週|比上周|更糟|trend)", re.I)
_RISK_RECURRING_RE = re.compile(r"(反复出现|复發|复发|reopen|recurring)", re.I)
_RISK_OVERDUE_RE = re.compile(r"(超过七天|逾期|长期没有处理|没处理|overdue)", re.I)
_RISK_WHY_SEV_RE = re.compile(r"(为什么.*(提升|升成|变成).*high|为何.*severity|why.*severity)", re.I)
_RISK_EXPLAIN_RE = re.compile(r"(解释|為什麼|为什么|explain|怎么回事)", re.I)


def extract_window_days(text: str) -> Optional[int]:
    match = _DAY_RE.search(text or "")
    if match:
        try:
            return max(int(match.group(1)), 1)
        except ValueError:
            pass
    cn = _CN_DAY_RE.search(text or "")
    if cn:
        return _CN_DAYS.get(cn.group(1))
    return None


def extract_project_slug(text: str, known_slugs: Optional[set[str]] = None) -> Optional[str]:
    known = {slug.lower() for slug in (known_slugs or set())}
    for match in _SLUG_RE.finditer(text or ""):
        candidate = match.group(1).lower()
        if candidate in {"scan", "status", "cancel", "dylan", "lumen", "high", "days", "risk"}:
            continue
        if known and candidate in known:
            return candidate
        if not known and candidate not in {"code", "repo"}:
            return candidate
    return None


def parse_dylan_text(text: str, known_slugs: Optional[set[str]] = None) -> ParsedAction:
    raw = str(text or "").strip()
    cleaned = re.sub(r"@_user_\d+", "", raw)
    cleaned = re.sub(r"@\S+", "", cleaned).strip()
    if not cleaned:
        return ParsedAction(name="scan.help", confidence=0.2, source="empty")

    params: dict[str, Any] = {}
    days = extract_window_days(cleaned)
    if days is not None:
        params["window_days"] = days
    slug = extract_project_slug(cleaned, known_slugs)
    if slug:
        params["project"] = slug
    finding_id = _FINDING_ID_RE.search(cleaned)
    if finding_id:
        params["finding_id"] = finding_id.group(1)

    if _RISK_WHY_SEV_RE.search(cleaned):
        return ParsedAction(name="risk.why_severity", confidence=0.88, source="rule:risk_why_sev", params=params)
    if _RISK_OVERDUE_RE.search(cleaned):
        return ParsedAction(name="risk.overdue", confidence=0.86, source="rule:risk_overdue", params=params)
    if _RISK_RECURRING_RE.search(cleaned):
        return ParsedAction(name="risk.recurring", confidence=0.86, source="rule:risk_recurring", params=params)
    if _RISK_TREND_RE.search(cleaned):
        return ParsedAction(name="risk.trend", confidence=0.86, source="rule:risk_trend", params=params)
    if _RISK_TOP_RE.search(cleaned):
        return ParsedAction(name="risk.top", confidence=0.86, source="rule:risk_top", params=params)
    if _RISK_EXPLAIN_RE.search(cleaned):
        return ParsedAction(name="risk.explain", confidence=0.8, source="rule:risk_explain", params=params)

    if _CANCEL_RE.search(cleaned):
        return ParsedAction(name="scan.cancel", confidence=0.9, source="rule:cancel", params=params)
    if _STATUS_RE.search(cleaned):
        return ParsedAction(name="scan.status", confidence=0.85, source="rule:status", params=params)
    if _SCAN_RE.search(cleaned) or (params.get("project") and re.search(r"(扫|scan)", cleaned, re.I)):
        return ParsedAction(
            name="scan.run",
            confidence=0.8 if _SCAN_RE.search(cleaned) else 0.7,
            source="rule:scan",
            params=params,
        )
    if params.get("window_days") and re.search(r"(扫|scan|代码)", cleaned, re.I):
        return ParsedAction(name="scan.run", confidence=0.7, source="rule:scan", params=params)
    return ParsedAction(name="scan.help", confidence=0.4, source="fallback", params=params)
