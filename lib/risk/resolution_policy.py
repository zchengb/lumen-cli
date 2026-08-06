from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass
class ResolutionDecision:
    allowed: bool
    requires_verification: bool
    override_allowed: bool
    reason_code: str
    explanation: str


class ResolutionPolicy:
    def __init__(self, common: dict[str, Any] | None = None) -> None:
        data = common if isinstance(common, dict) else {}
        risk = data.get("risk") if isinstance(data.get("risk"), dict) else {}
        policy = risk.get("resolution_policy") if isinstance(risk.get("resolution_policy"), dict) else {}
        self.enabled = bool(policy.get("enabled", True))
        self.owner_confirmed_allowed = bool(policy.get("owner_confirmed_allowed", True))
        require = policy.get("require_verification_for")
        self.require_verification_for = {
            str(item).strip()
            for item in (require if isinstance(require, list) else ["High", "Reopened", "Security", "ProductionIncident"])
            if str(item).strip()
        }
        self.allow_policy_override = bool(policy.get("allow_policy_override", True))
        self.allowed_user_ids = {
            str(item).strip() for item in (policy.get("allowed_user_ids") or []) if str(item).strip()
        }
        self.allowed_chat_ids = {
            str(item).strip() for item in (policy.get("allowed_chat_ids") or []) if str(item).strip()
        }
        self.default_basis = str(policy.get("default_basis") or "user_confirmed").strip() or "user_confirmed"

    def evaluate(
        self,
        *,
        finding: dict[str, Any],
        actor_id: str,
        chat_id: str = "",
        requested_basis: str = "user_confirmed",
        override: bool = False,
        contradictory_evidence: bool = False,
    ) -> ResolutionDecision:
        if not self.enabled:
            return ResolutionDecision(
                allowed=False,
                requires_verification=True,
                override_allowed=False,
                reason_code="POLICY_DISABLED",
                explanation="Resolution policy is disabled for this project",
            )
        actor = str(actor_id or "").strip()
        chat = str(chat_id or "").strip()
        if self.allowed_user_ids and actor and actor not in self.allowed_user_ids:
            return ResolutionDecision(
                allowed=False,
                requires_verification=False,
                override_allowed=False,
                reason_code="ACTOR_NOT_AUTHORIZED",
                explanation="Actor is not authorized to resolve findings",
            )
        if self.allowed_chat_ids and chat and chat not in self.allowed_chat_ids:
            return ResolutionDecision(
                allowed=False,
                requires_verification=False,
                override_allowed=False,
                reason_code="ACTOR_NOT_AUTHORIZED",
                explanation="Chat is not authorized to resolve findings",
            )

        severity = str(finding.get("effective_severity") or finding.get("source_severity") or "").strip()
        status = str(finding.get("status") or "").strip()
        category = str(finding.get("category") or "").strip().lower()
        title = str(finding.get("title") or "").lower()

        requires = False
        reason = "ALLOWED_OWNER_CONFIRMED"
        if "High" in self.require_verification_for and severity == "High":
            requires = True
            reason = "VERIFICATION_REQUIRED_HIGH"
        if "Reopened" in self.require_verification_for and status == "Reopened":
            requires = True
            reason = "VERIFICATION_REQUIRED_REOPENED"
        if "Security" in self.require_verification_for and (
            "security" in category or "security" in title or "漏洞" in title
        ):
            requires = True
            reason = "VERIFICATION_REQUIRED_SECURITY"
        if "ProductionIncident" in self.require_verification_for and (
            "incident" in category or "production" in title or "生产" in title
        ):
            requires = True
            reason = "VERIFICATION_REQUIRED_INCIDENT"

        if contradictory_evidence and not override:
            return ResolutionDecision(
                allowed=False,
                requires_verification=True,
                override_allowed=self.allow_policy_override,
                reason_code="CONTRADICTORY_EVIDENCE",
                explanation="Current evidence still shows the original defect",
            )

        basis = str(requested_basis or self.default_basis).strip() or self.default_basis
        if basis == "policy_override" or override:
            if not self.allow_policy_override:
                return ResolutionDecision(
                    allowed=False,
                    requires_verification=requires,
                    override_allowed=False,
                    reason_code="OVERRIDE_REQUIRED",
                    explanation="Policy override is not allowed for this project",
                )
            return ResolutionDecision(
                allowed=True,
                requires_verification=False,
                override_allowed=True,
                reason_code="OVERRIDE_REQUIRED",
                explanation="Explicit policy override recorded",
            )

        if requires and not self.owner_confirmed_allowed:
            return ResolutionDecision(
                allowed=False,
                requires_verification=True,
                override_allowed=self.allow_policy_override,
                reason_code=reason,
                explanation="Owner-confirmed resolve is blocked until verification",
            )

        if requires:
            return ResolutionDecision(
                allowed=False,
                requires_verification=True,
                override_allowed=self.allow_policy_override,
                reason_code=reason,
                explanation="Project policy requires verification before resolve",
            )

        if not self.owner_confirmed_allowed:
            return ResolutionDecision(
                allowed=False,
                requires_verification=True,
                override_allowed=self.allow_policy_override,
                reason_code="VERIFICATION_REQUIRED_HIGH",
                explanation="Owner-confirmed resolve is disabled",
            )

        return ResolutionDecision(
            allowed=True,
            requires_verification=False,
            override_allowed=self.allow_policy_override,
            reason_code="ALLOWED_OWNER_CONFIRMED",
            explanation="Owner-confirmed resolution is allowed",
        )
