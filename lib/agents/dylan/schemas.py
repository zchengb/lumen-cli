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
class ConversationFlags:
    enabled: bool = False
    llm_router_enabled: bool = False
    llm_response_enabled: bool = False
    grounding_guard_enabled: bool = True

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
        return cls(
            enabled=bool(conv.get("enabled", False)),
            llm_router_enabled=bool(conv.get("llm_router_enabled", False)),
            llm_response_enabled=bool(conv.get("llm_response_enabled", False)),
            grounding_guard_enabled=bool(conv.get("grounding_guard_enabled", True)),
        )
