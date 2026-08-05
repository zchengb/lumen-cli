from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Optional


@dataclass
class ToolCall:
    name: str
    arguments: dict[str, Any] = field(default_factory=dict)


@dataclass
class RouterResult:
    intent: str
    confidence: float
    source: str
    project_slug: Optional[str] = None
    finding_id: Optional[str] = None
    run_id: Optional[str] = None
    reference: Optional[dict[str, Any]] = None
    needs_clarification: bool = False
    clarification_question: Optional[str] = None
    tool_calls: list[ToolCall] = field(default_factory=list)
    params: dict[str, Any] = field(default_factory=dict)


@dataclass
class ModelConfig:
    provider: str = "cursor"
    router_timeout_seconds: int = 8
    response_timeout_seconds: int = 25
    max_router_retries: int = 1
    max_response_retries: int = 1
    model_name: str = "cursor-grok-4.5-medium"


@dataclass
class TypingConfig:
    enabled: bool = True
    delay_ms: int = 350
    progress_after_ms: int = 5000
    long_wait_after_ms: int = 15000
    overall_timeout_ms: int = 45000
    max_updates: int = 4


@dataclass
class ConversationFlags:
    enabled: bool = False
    llm_router_enabled: bool = False
    llm_response_enabled: bool = False
    grounding_guard_enabled: bool = True
    model: ModelConfig = field(default_factory=ModelConfig)
    typing: TypingConfig = field(default_factory=TypingConfig)

    @classmethod
    def from_common(cls, common: dict[str, Any] | None, agents_config: dict[str, Any] | None = None) -> "ConversationFlags":
        data = common if isinstance(common, dict) else {}
        agents = data.get("agents") if isinstance(data.get("agents"), dict) else {}
        dylan = agents.get("dylan") if isinstance(agents.get("dylan"), dict) else {}
        risk = dylan.get("risk_analyst") if isinstance(dylan.get("risk_analyst"), dict) else {}
        conv = risk.get("conversation_v2") if isinstance(risk.get("conversation_v2"), dict) else {}
        if not conv and isinstance(agents_config, dict):
            cfg_dylan = agents_config.get("dylan") if isinstance(agents_config.get("dylan"), dict) else {}
            cfg_risk = cfg_dylan.get("risk_analyst") if isinstance(cfg_dylan.get("risk_analyst"), dict) else {}
            conv = cfg_risk.get("conversation_v2") if isinstance(cfg_risk.get("conversation_v2"), dict) else {}
            if not dylan and cfg_dylan:
                dylan = cfg_dylan
        model_raw = conv.get("model") if isinstance(conv.get("model"), dict) else {}
        typing_raw = conv.get("typing") if isinstance(conv.get("typing"), dict) else {}
        max_jobs = dylan.get("max_concurrent_jobs")
        model = ModelConfig(
            provider=str(model_raw.get("provider") or "cursor"),
            router_timeout_seconds=int(model_raw.get("router_timeout_seconds") or 8),
            response_timeout_seconds=int(model_raw.get("response_timeout_seconds") or 25),
            max_router_retries=int(model_raw.get("max_router_retries") or 1),
            max_response_retries=int(model_raw.get("max_response_retries") or 1),
            model_name=str(model_raw.get("model") or model_raw.get("name") or "cursor-grok-4.5-medium"),
        )
        typing = TypingConfig(
            enabled=bool(typing_raw.get("enabled", True)),
            delay_ms=int(typing_raw.get("delay_ms") or 350),
            progress_after_ms=int(typing_raw.get("progress_after_ms") or 5000),
            long_wait_after_ms=int(typing_raw.get("long_wait_after_ms") or 15000),
            overall_timeout_ms=int(typing_raw.get("overall_timeout_ms") or 45000),
            max_updates=int(typing_raw.get("max_updates") or 4),
        )
        flags = cls(
            enabled=bool(conv.get("enabled", False)),
            llm_router_enabled=bool(conv.get("llm_router_enabled", False)),
            llm_response_enabled=bool(conv.get("llm_response_enabled", False)),
            grounding_guard_enabled=bool(conv.get("grounding_guard_enabled", True)),
            model=model,
            typing=typing,
        )
        flags._max_concurrent_jobs = int(max_jobs or 3)  # type: ignore[attr-defined]
        return flags

    @property
    def max_concurrent_jobs(self) -> int:
        return int(getattr(self, "_max_concurrent_jobs", 3) or 3)


ALLOWED_INTENTS = {
    "scan.run",
    "scan.status",
    "scan.summary",
    "scan.cancel",
    "risk.top",
    "risk.unresolved",
    "risk.trend",
    "risk.recurring",
    "risk.overdue",
    "risk.explain",
    "risk.why_severity",
    "risk.finding_status",
    "risk.finding_links",
    "risk.compare_period",
    "conversation.greeting",
    "conversation.agent_identity",
    "conversation.agent_relationship",
    "conversation.capabilities",
    "conversation.follow_up",
    "conversation.thanks",
    "conversation.small_talk",
    "clarification.project",
    "clarification.run",
    "clarification.finding",
    "clarification.reference",
    "unsupported",
}

INTENT_TOOLS = {
    "risk.top": {"query_top_risks"},
    "risk.unresolved": {"query_unresolved_findings"},
    "risk.trend": {"query_project_trend"},
    "risk.recurring": {"query_recurring_findings"},
    "risk.overdue": {"query_overdue_high"},
    "risk.explain": {"explain_finding", "get_finding_summary"},
    "risk.why_severity": {"explain_finding", "get_finding_summary"},
    "risk.finding_status": {"get_finding_status", "get_finding_summary"},
    "risk.finding_links": {"get_finding_links", "get_finding_status"},
    "risk.compare_period": {"compare_project_risk"},
    "scan.status": {"get_recent_scan_status", "get_scan_summary", "get_scan_result"},
    "scan.summary": {"get_scan_summary", "get_scan_result"},
    "conversation.greeting": {"get_agent_profile", "get_thread_context"},
    "conversation.agent_identity": {"get_agent_profile", "list_agent_capabilities"},
    "conversation.agent_relationship": {"get_agent_relationship"},
    "conversation.capabilities": {"list_agent_capabilities"},
    "conversation.follow_up": {"explain_finding", "get_finding_links", "get_finding_summary"},
}
