from __future__ import annotations

from pathlib import Path
from typing import Protocol

from agents.definitions import AgentDefinition
from agents.runtime.cursor_runtime import AgentRunResult, CursorAgentRuntime
from agents.runtime.observability import Observability, TraceContext
from agents.runner.runner_env import build_runner_env
from agents.security.flags import workspace_isolation_v2_enabled


class AgentRunner(Protocol):
    def run(
        self,
        *,
        definition: AgentDefinition,
        workspace: Path,
        prompt: str,
        provider_session_id: str | None,
        trace: TraceContext,
        obs: Observability | None = None,
    ) -> AgentRunResult: ...


class LocalIsolatedAgentRunner:
    def __init__(self, *, runtime: CursorAgentRuntime | None = None) -> None:
        self.runtime = runtime

    def run(
        self,
        *,
        definition: AgentDefinition,
        workspace: Path,
        prompt: str,
        provider_session_id: str | None,
        trace: TraceContext,
        obs: Observability | None = None,
    ) -> AgentRunResult:
        agent_id = str(definition.id or "").strip().lower()
        project = str(getattr(trace, "project_slug", "") or "")
        runtime = self.runtime or CursorAgentRuntime(
            sandbox="enabled",
            force=False,
            trust=True,
            agent_id=agent_id,
            project=project,
        )
        if workspace_isolation_v2_enabled():
            runtime.isolated_env = build_runner_env(agent_id=agent_id, project=project)
        return runtime.run(
            workspace=workspace,
            prompt=prompt,
            provider_session_id=provider_session_id,
            trace=trace,
            obs=obs,
        )


def default_runner(*, runtime: CursorAgentRuntime | None = None) -> LocalIsolatedAgentRunner:
    return LocalIsolatedAgentRunner(runtime=runtime)
