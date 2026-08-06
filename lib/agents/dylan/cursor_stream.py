from __future__ import annotations

import json
from dataclasses import dataclass, field
from typing import Any, Iterable, Optional


@dataclass
class AgentToolEvent:
    tool_type: str
    subtype: str
    call_id: str = ""
    target_path: str = ""
    command_base: str = ""
    status: str = ""
    raw_summary: str = ""


@dataclass
class StreamParseResult:
    text: str = ""
    provider_session_id: str = ""
    request_id: str = ""
    duration_ms: int = 0
    status: str = "unknown"
    tool_events: list[AgentToolEvent] = field(default_factory=list)
    events: list[dict[str, Any]] = field(default_factory=list)
    error: str = ""


def _tool_kind(tool_call: dict[str, Any]) -> tuple[str, dict[str, Any]]:
    for key, value in tool_call.items():
        if key.endswith("ToolCall") or key.endswith("Tool"):
            return key, value if isinstance(value, dict) else {}
        if isinstance(value, dict) and ("args" in value or "result" in value):
            return key, value
    return "unknown", {}


def _summarize_tool(event: dict[str, Any]) -> AgentToolEvent:
    subtype = str(event.get("subtype") or "")
    call_id = str(event.get("call_id") or "")
    tool_call = event.get("tool_call") if isinstance(event.get("tool_call"), dict) else {}
    kind, payload = _tool_kind(tool_call)
    args = payload.get("args") if isinstance(payload.get("args"), dict) else {}
    target = str(args.get("path") or args.get("file") or args.get("target") or "")
    command = str(args.get("command") or args.get("cmd") or "")
    command_base = command.split()[0] if command.strip() else ""
    status = "started" if subtype == "started" else ("completed" if subtype == "completed" else subtype)
    return AgentToolEvent(
        tool_type=kind,
        subtype=subtype,
        call_id=call_id,
        target_path=target[:200],
        command_base=command_base[:80],
        status=status,
        raw_summary=json.dumps({"kind": kind, "path": target, "command": command[:120]}, ensure_ascii=False)[:240],
    )


def parse_stream_json_lines(lines: Iterable[str]) -> StreamParseResult:
    result = StreamParseResult()
    assistant_chunks: list[str] = []
    for raw in lines:
        line = str(raw or "").strip()
        if not line:
            continue
        try:
            event = json.loads(line)
        except Exception:
            continue
        if not isinstance(event, dict):
            continue
        result.events.append(event)
        etype = str(event.get("type") or "")
        subtype = str(event.get("subtype") or "")
        session_id = str(event.get("session_id") or "").strip()
        if session_id:
            result.provider_session_id = session_id
        if event.get("request_id"):
            result.request_id = str(event.get("request_id"))

        if etype == "system" and subtype == "init":
            continue
        if etype == "assistant":
            message = event.get("message") if isinstance(event.get("message"), dict) else {}
            content = message.get("content") if isinstance(message.get("content"), list) else []
            for part in content:
                if isinstance(part, dict) and part.get("type") == "text" and part.get("text"):
                    assistant_chunks.append(str(part["text"]))
            continue
        if etype == "tool_call":
            result.tool_events.append(_summarize_tool(event))
            continue
        if etype == "result":
            result.duration_ms = int(event.get("duration_ms") or 0)
            result.text = str(event.get("result") or "").strip()
            if event.get("is_error") or subtype == "error":
                result.status = "failed"
                result.error = str(event.get("result") or event.get("error") or "agent result error")[:400]
            else:
                result.status = "succeeded"
            continue
    if not result.text and assistant_chunks:
        result.text = "".join(assistant_chunks).strip()
        if result.status == "unknown":
            result.status = "succeeded"
    if result.status == "unknown" and result.text:
        result.status = "succeeded"
    if result.status == "unknown":
        result.status = "failed"
        result.error = result.error or "no result event in stream-json"
    return result


def parse_stream_json_text(text: str) -> StreamParseResult:
    return parse_stream_json_lines(str(text or "").splitlines())
