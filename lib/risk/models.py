from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Optional

STATUS_OPEN = "Open"
STATUS_RESOLVED = "Resolved"
STATUS_IGNORED = "Ignored"
STATUS_REOPENED = "Reopened"

SEVERITIES = ("High", "Medium", "Low")
RULE_VERSION = "1.0"

DEFAULT_WEIGHTS = {
    "severity": 0.30,
    "recurrence": 0.18,
    "blast_radius": 0.15,
    "critical_module": 0.12,
    "age": 0.08,
    "activity": 0.07,
    "remediation_gap": 0.10,
}

DEFAULT_BANDS = {
    "low_max": 35,
    "medium_max": 65,
}


@dataclass
class RiskConfig:
    weights: dict[str, float] = field(default_factory=lambda: dict(DEFAULT_WEIGHTS))
    critical_modules: list[str] = field(default_factory=list)
    bands: dict[str, float] = field(default_factory=lambda: dict(DEFAULT_BANDS))
    overdue_days: int = 7
    enabled: bool = False
    alert_chat_id: str = ""
    score_alert_delta: float = 15.0
    conversation_v2: bool = False
    llm_router_enabled: bool = False
    llm_response_enabled: bool = False
    grounding_guard_enabled: bool = True

    @classmethod
    def from_common(cls, common: dict[str, Any] | None) -> "RiskConfig":
        data = common if isinstance(common, dict) else {}
        agents = data.get("agents") if isinstance(data.get("agents"), dict) else {}
        dylan = agents.get("dylan") if isinstance(agents.get("dylan"), dict) else {}
        risk_flag = dylan.get("risk_analyst") if isinstance(dylan.get("risk_analyst"), dict) else {}
        risk = data.get("risk") if isinstance(data.get("risk"), dict) else {}
        weights = dict(DEFAULT_WEIGHTS)
        if isinstance(risk.get("weights"), dict):
            for key, value in risk["weights"].items():
                try:
                    weights[str(key)] = float(value)
                except (TypeError, ValueError):
                    continue
        bands = dict(DEFAULT_BANDS)
        if isinstance(risk.get("bands"), dict):
            for key, value in risk["bands"].items():
                try:
                    bands[str(key)] = float(value)
                except (TypeError, ValueError):
                    continue
        modules = risk.get("critical_modules") if isinstance(risk.get("critical_modules"), list) else []
        overdue = 7
        try:
            overdue = int(risk.get("overdue_days", 7))
        except (TypeError, ValueError):
            overdue = 7
        enabled = bool(risk_flag.get("enabled", False)) or bool(risk.get("enabled", False))
        conv = risk_flag.get("conversation_v2") if isinstance(risk_flag.get("conversation_v2"), dict) else {}
        return cls(
            weights=weights,
            critical_modules=[str(item).strip().lower() for item in modules if str(item).strip()],
            bands=bands,
            overdue_days=max(overdue, 1),
            enabled=enabled,
            alert_chat_id=str(risk.get("alert_chat_id") or dylan.get("alert_chat_id") or "").strip(),
            score_alert_delta=float(risk.get("score_alert_delta", 15) or 15),
            conversation_v2=bool(conv.get("enabled", False)),
            llm_router_enabled=bool(conv.get("llm_router_enabled", False)),
            llm_response_enabled=bool(conv.get("llm_response_enabled", False)),
            grounding_guard_enabled=bool(conv.get("grounding_guard_enabled", True)),
        )


@dataclass
class ScoreBreakdown:
    total: float
    band: str
    parts: dict[str, float] = field(default_factory=dict)
    reasons: list[str] = field(default_factory=list)
    rule_version: str = RULE_VERSION


def conversation_v2_enabled(common: dict[str, Any] | None = None, agents_config: dict[str, Any] | None = None) -> bool:
    for source in (common, agents_config):
        if not isinstance(source, dict):
            continue
        agents = source.get("agents") if isinstance(source.get("agents"), dict) else source
        dylan = agents.get("dylan") if isinstance(agents.get("dylan"), dict) else {}
        risk_flag = dylan.get("risk_analyst") if isinstance(dylan.get("risk_analyst"), dict) else {}
        conv = risk_flag.get("conversation_v2") if isinstance(risk_flag.get("conversation_v2"), dict) else {}
        if bool(conv.get("enabled", False)):
            return True
    return False
