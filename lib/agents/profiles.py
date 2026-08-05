from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class AgentProfile:
    id: str
    workflow: Optional[str]
    writable: bool
    role: str
    result_contract: Optional[str] = None


PROFILES: dict[str, AgentProfile] = {
    "dylan": AgentProfile(
        id="dylan",
        workflow="auto_scan",
        writable=False,
        role="scan",
        result_contract="scan-result.json",
    ),
    "irving": AgentProfile(
        id="irving",
        workflow="auto_patch",
        writable=True,
        role="patch",
        result_contract="patch-result.json",
    ),
    "mark": AgentProfile(
        id="mark",
        workflow="auto_delivery",
        writable=True,
        role="delivery",
        result_contract="delivery-result.json",
    ),
    "milchick": AgentProfile(
        id="milchick",
        workflow=None,
        writable=False,
        role="orchestrator",
        result_contract=None,
    ),
}
