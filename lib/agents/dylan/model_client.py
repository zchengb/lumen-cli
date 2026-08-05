from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional

from agents.dylan.schemas import ModelConfig, RouterResult, ToolCall


@dataclass
class GeneratedResponse:
    text: str
    mode: str = "model"
    raw: str = ""


class DylanModelClient:
    def classify(self, request: dict[str, Any]) -> RouterResult:
        raise NotImplementedError

    def respond(self, request: dict[str, Any]) -> GeneratedResponse:
        raise NotImplementedError


def _extract_json_object(text: str) -> dict[str, Any]:
    raw = str(text or "").strip()
    if not raw:
        raise ValueError("empty model output")
    try:
        data = json.loads(raw)
        if isinstance(data, dict):
            return data
    except Exception:
        pass
    match = re.search(r"\{[\s\S]*\}", raw)
    if not match:
        raise ValueError("no json object in model output")
    data = json.loads(match.group(0))
    if not isinstance(data, dict):
        raise ValueError("json root is not object")
    return data


def _parse_router_result(data: dict[str, Any], *, source: str) -> RouterResult:
    tool_calls = []
    for item in data.get("tool_calls") or []:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name") or "").strip()
        args = item.get("arguments") if isinstance(item.get("arguments"), dict) else {}
        if name:
            tool_calls.append(ToolCall(name=name, arguments=args))
    return RouterResult(
        intent=str(data.get("intent") or "unsupported"),
        confidence=float(data.get("confidence") or 0.0),
        source=source,
        project_slug=(str(data.get("project_slug")).strip() if data.get("project_slug") else None),
        finding_id=(str(data.get("finding_id")).strip() if data.get("finding_id") else None),
        run_id=(str(data.get("run_id")).strip() if data.get("run_id") else None),
        reference=data.get("reference") if isinstance(data.get("reference"), dict) else None,
        needs_clarification=bool(data.get("needs_clarification")),
        clarification_question=(str(data.get("clarification_question")) if data.get("clarification_question") else None),
        tool_calls=tool_calls,
        params={
            "project": data.get("project_slug"),
            "finding_id": data.get("finding_id"),
            "run_id": data.get("run_id"),
            "other_agent": (data.get("params") or {}).get("other_agent") if isinstance(data.get("params"), dict) else None,
        },
    )


class CursorDylanModelClient(DylanModelClient):
    def __init__(self, config: Optional[ModelConfig] = None, workspace: Optional[Path] = None) -> None:
        self.config = config or ModelConfig()
        self.workspace = Path(workspace).expanduser() if workspace else Path.home()

    def _env(self) -> dict[str, str]:
        env = os.environ.copy()
        if env.get("CURSOR_API_KEY") or not env.get("AGENT_CLI_CREDENTIAL_STORE"):
            env["AGENT_CLI_CREDENTIAL_STORE"] = "file"
        return env

    def _run_agent(self, prompt: str, *, timeout: int) -> str:
        agent_bin = shutil.which("agent")
        if not agent_bin:
            raise RuntimeError("cursor agent CLI not found")
        args = [
            agent_bin,
            "--workspace",
            str(self.workspace),
            "--sandbox",
            "disabled",
            "--trust",
            "-p",
            "-f",
            "--output-format",
            "text",
            "--model",
            self.config.model_name,
            prompt,
        ]
        completed = subprocess.run(
            args,
            capture_output=True,
            text=True,
            env=self._env(),
            timeout=timeout,
            check=False,
        )
        if completed.returncode != 0:
            raise RuntimeError((completed.stderr or completed.stdout or "agent failed")[:500])
        return completed.stdout or ""

    def classify(self, request: dict[str, Any]) -> RouterResult:
        from agents.dylan.model_prompts import router_prompt

        prompt = router_prompt(request)
        attempts = max(self.config.max_router_retries, 0) + 1
        last_error = ""
        for _ in range(attempts):
            try:
                output = self._run_agent(prompt, timeout=self.config.router_timeout_seconds)
                data = _extract_json_object(output)
                return _parse_router_result(data, source="llm:cursor")
            except Exception as exc:
                last_error = str(exc)
        raise RuntimeError(f"router model failed: {last_error}")

    def respond(self, request: dict[str, Any]) -> GeneratedResponse:
        from agents.dylan.model_prompts import response_prompt

        prompt = response_prompt(request)
        attempts = max(self.config.max_response_retries, 0) + 1
        last_error = ""
        for _ in range(attempts):
            try:
                output = self._run_agent(prompt, timeout=self.config.response_timeout_seconds)
                data = _extract_json_object(output)
                text = str(data.get("text") or "").strip()
                if not text:
                    text = output.strip()
                return GeneratedResponse(text=text, mode="model", raw=output)
            except Exception as exc:
                last_error = str(exc)
                try:
                    output = self._run_agent(prompt, timeout=self.config.response_timeout_seconds)
                    text = output.strip()
                    if text:
                        return GeneratedResponse(text=text, mode="model_text", raw=output)
                except Exception as exc2:
                    last_error = str(exc2)
        raise RuntimeError(f"response model failed: {last_error}")


class HeuristicDylanModelClient(DylanModelClient):
    """Offline semantic classifier used when Cursor agent is unavailable or for tests."""

    def classify(self, request: dict[str, Any]) -> RouterResult:
        from agents.dylan.semantic_router import heuristic_classify

        return heuristic_classify(request)

    def respond(self, request: dict[str, Any]) -> GeneratedResponse:
        raise RuntimeError("heuristic client does not generate freeform responses")


def get_model_client(flags_model: ModelConfig, *, workspace: Optional[Path] = None, prefer_heuristic: bool = False) -> DylanModelClient:
    if prefer_heuristic or flags_model.provider == "heuristic":
        return HeuristicDylanModelClient()
    if flags_model.provider == "cursor" and shutil.which("agent"):
        return CursorDylanModelClient(flags_model, workspace=workspace)
    return HeuristicDylanModelClient()
