from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Optional

from agents.models import RunContext, TriggerContext


def new_run_id(prefix: str) -> str:
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    return f"{prefix}-{stamp}-{uuid.uuid4().hex[:6]}"


@dataclass
class AdapterResult:
    run_id: str
    status: str
    detail: str = ""
    result_path: str = ""
    exit_code: int = 0
    data: Optional[dict[str, Any]] = None

    def as_dict(self) -> dict[str, Any]:
        payload = {
            "run_id": self.run_id,
            "status": self.status,
            "detail": self.detail,
            "result_path": self.result_path,
            "exit_code": self.exit_code,
        }
        if self.data is not None:
            payload.update(self.data)
        return payload


def build_run_context(
    *,
    workflow: str,
    project: str,
    owner_agent: str,
    trigger: Optional[TriggerContext] = None,
    params: Optional[dict[str, Any]] = None,
    run_id: str = "",
) -> RunContext:
    return RunContext(
        run_id=run_id or new_run_id(workflow.replace("auto_", "")),
        workflow=workflow,
        project=project,
        owner_agent=owner_agent,
        origin_agent=(trigger.agent_id if trigger else owner_agent),
        trigger=trigger,
        params=params or {},
    )
