from __future__ import annotations

import os
import shutil
import subprocess
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional

from agents.dylan.cursor_stream import AgentToolEvent, StreamParseResult, parse_stream_json_text
from agents.dylan.model_client import _load_lumen_dotenv
from agents.dylan.observability import Observability, TraceContext


@dataclass
class AgentRunResult:
    text: str
    provider_session_id: str
    request_id: str = ""
    duration_ms: int = 0
    tool_events: list[AgentToolEvent] = field(default_factory=list)
    status: str = "failed"
    error: str = ""
    raw_event_count: int = 0


class CursorAgentRuntime:
    def __init__(
        self,
        *,
        model: str = "cursor-grok-4.5-medium",
        soft_timeout_seconds: int = 90,
        hard_timeout_seconds: int = 300,
        sandbox: str = "disabled",
        force: bool = True,
        trust: bool = True,
    ) -> None:
        self.model = model
        self.soft_timeout_seconds = soft_timeout_seconds
        self.hard_timeout_seconds = hard_timeout_seconds
        self.sandbox = sandbox
        self.force = force
        self.trust = trust

    def _agent_bin(self) -> str:
        for name in ("agent", "cursor-agent"):
            path = shutil.which(name)
            if path:
                return path
        raise RuntimeError("cursor agent CLI not found")

    def _env(self) -> dict[str, str]:
        _load_lumen_dotenv()
        env = os.environ.copy()
        if env.get("CURSOR_API_KEY"):
            env.setdefault("AGENT_CLI_CREDENTIAL_STORE", "file")
        return env

    def run(
        self,
        *,
        workspace: Path,
        prompt: str,
        provider_session_id: str | None = None,
        trace: TraceContext | None = None,
        obs: Observability | None = None,
    ) -> AgentRunResult:
        agent_bin = self._agent_bin()
        workspace = Path(workspace).expanduser().resolve()
        args = [agent_bin]
        if provider_session_id:
            args.extend(["--resume", str(provider_session_id)])
        args.extend(
            [
                "--workspace",
                str(workspace),
                "--sandbox",
                self.sandbox,
                "-p",
                "--output-format",
                "stream-json",
                "--model",
                self.model,
            ]
        )
        if self.trust:
            args.append("--trust")
        if self.force:
            args.append("-f")
        args.append(prompt)

        if obs and trace:
            event = "agent.session.resumed" if provider_session_id else "agent.session.created"
            obs.emit(trace, "agent.run.started", workspace=str(workspace), resume=bool(provider_session_id))
            obs.emit(trace, event, provider_session_id=provider_session_id or "")

        started = time.time()
        try:
            completed = subprocess.run(
                args,
                capture_output=True,
                text=True,
                env=self._env(),
                timeout=self.hard_timeout_seconds,
                check=False,
                cwd=str(workspace),
            )
        except subprocess.TimeoutExpired as exc:
            partial = parse_stream_json_text(str(exc.stdout or ""))
            duration_ms = int((time.time() - started) * 1000)
            if partial.text:
                if obs and trace:
                    obs.emit(
                        trace,
                        "agent.result.completed",
                        duration_ms=duration_ms,
                        tool_count=len(partial.tool_events),
                        provider_session_id=partial.provider_session_id or provider_session_id,
                        partial_on_timeout=True,
                    )
                return AgentRunResult(
                    text=partial.text,
                    provider_session_id=partial.provider_session_id or (provider_session_id or ""),
                    request_id=partial.request_id,
                    duration_ms=duration_ms,
                    tool_events=partial.tool_events,
                    status="succeeded",
                    error="",
                    raw_event_count=len(partial.events),
                )
            if obs and trace:
                obs.emit(trace, "agent.result.failed", error=f"hard timeout after {self.hard_timeout_seconds}s", level="ERROR")
            return AgentRunResult(
                text="",
                provider_session_id=provider_session_id or "",
                duration_ms=duration_ms,
                status="timed_out",
                error=f"agent hard timeout after {self.hard_timeout_seconds}s",
            )

        parsed = parse_stream_json_text(completed.stdout or "")
        stderr = (completed.stderr or "").strip()
        if completed.returncode != 0 and parsed.status != "succeeded":
            err = stderr or (completed.stdout or "agent failed")[:500]
            parsed.status = "failed"
            parsed.error = parsed.error or err
            if not parsed.text:
                parsed.text = ""
        elif parsed.status != "succeeded" and not parsed.text:
            err = stderr or (completed.stdout or "").strip()
            if err:
                parsed.error = (parsed.error or err)[:500]
            elif completed.returncode != 0:
                parsed.error = parsed.error or f"agent exited {completed.returncode} with empty stream-json"
            if "failed to reach the cursor api" in stderr.lower():
                parsed.error = stderr[:500]

        if obs and trace:
            for tool in parsed.tool_events:
                obs.emit(
                    trace,
                    f"agent.tool.{tool.status or 'event'}",
                    tool_type=tool.tool_type,
                    call_id=tool.call_id,
                    target_path=tool.target_path,
                    command_base=tool.command_base,
                )
            if parsed.status == "succeeded":
                obs.emit(
                    trace,
                    "agent.result.completed",
                    duration_ms=parsed.duration_ms or int((time.time() - started) * 1000),
                    tool_count=len(parsed.tool_events),
                    provider_session_id=parsed.provider_session_id,
                    request_id=parsed.request_id,
                )
            else:
                obs.emit(
                    trace,
                    "agent.result.failed",
                    error=parsed.error[:300],
                    level="ERROR",
                    provider_session_id=parsed.provider_session_id,
                )

        duration = parsed.duration_ms or int((time.time() - started) * 1000)
        soft = duration >= self.soft_timeout_seconds * 1000
        if soft and obs and trace:
            obs.emit(trace, "agent.run.long_running", duration_ms=duration)

        return AgentRunResult(
            text=parsed.text,
            provider_session_id=parsed.provider_session_id or (provider_session_id or ""),
            request_id=parsed.request_id,
            duration_ms=duration,
            tool_events=parsed.tool_events,
            status=parsed.status,
            error=parsed.error,
            raw_event_count=len(parsed.events),
        )
