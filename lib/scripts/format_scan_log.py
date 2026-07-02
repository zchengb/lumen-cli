#!/usr/bin/env python3
import json
import re
import sys

TOOL_LABELS = {
    "shellToolCall": "Shell",
    "readToolCall": "Read",
    "writeToolCall": "Write",
    "editToolCall": "Edit",
    "deleteToolCall": "Delete",
    "globToolCall": "Search files",
    "grepToolCall": "Search",
    "lsToolCall": "List directory",
    "fetchToolCall": "Fetch",
    "webSearchToolCall": "Web search",
    "mcpToolCall": "MCP tool",
    "todoToolCall": "Todo update",
}


def humanize_tool_key(key: str) -> str:
    if key in TOOL_LABELS:
        return TOOL_LABELS[key]
    label = key.replace("ToolCall", "")
    label = re.sub(r"([a-z])([A-Z])", r"\1 \2", label)
    return label[:1].upper() + label[1:] if label else "Tool"


def tool_call_info(tool_call: dict) -> tuple:
    if not isinstance(tool_call, dict):
        return "Tool", ""
    key = next(iter(tool_call), None)
    payload = tool_call.get(key) if key else None
    label = humanize_tool_key(key) if key else "Tool"
    description = ""
    if isinstance(payload, dict):
        description = payload.get("description") or (payload.get("args") or {}).get("command") or ""
    return label, str(description)


def truncate(text, maximum: int) -> str:
    clean = re.sub(r"\s+", " ", str(text or "")).strip()
    if len(clean) <= maximum:
        return clean
    return clean[: maximum - 1] + "…"


def tool_result_status(tool_call: dict):
    if not isinstance(tool_call, dict):
        return None
    key = next(iter(tool_call), None)
    payload = tool_call.get(key) if key else None
    if not isinstance(payload, dict):
        return None
    result = payload.get("result")
    if not isinstance(result, dict):
        return None
    success = result.get("success")
    if isinstance(success, dict):
        exit_code = success.get("exitCode")
        if isinstance(exit_code, int) and exit_code != 0:
            return {"ok": False, "detail": f"exit {exit_code}"}
        return {"ok": True, "detail": ""}
    error = result.get("error")
    if error is not None:
        message = error.get("message") if isinstance(error, dict) else error
        return {"ok": False, "detail": truncate(message, 120)}
    return None


def format_line(line: str) -> None:
    trimmed = line.strip()
    if not trimmed:
        return

    try:
        event = json.loads(trimmed)
    except json.JSONDecodeError:
        print(trimmed)
        return

    event_type = event.get("type")
    subtype = event.get("subtype")

    if event_type == "system" and subtype == "init":
        print(f"▸ Session started (model: {event.get('model', 'unknown')})")
        return

    if event_type == "assistant":
        message = event.get("message") or {}
        for part in message.get("content") or []:
            if part.get("type") == "text" and part.get("text"):
                text = truncate(part["text"], 220)
                if text:
                    print(f"\n{text}")
        return

    if event_type == "tool_call" and subtype == "started":
        label, description = tool_call_info(event.get("tool_call") or {})
        suffix = f": {truncate(description, 100)}" if description else ""
        print(f"▸ {label}{suffix}")
        return

    if event_type == "tool_call" and subtype == "completed":
        status = tool_result_status(event.get("tool_call") or {})
        if status and not status["ok"]:
            label, _ = tool_call_info(event.get("tool_call") or {})
            detail = f" ({status['detail']})" if status.get("detail") else ""
            print(f"✗ {label} failed{detail}")
        return

    if event_type == "result":
        if event.get("is_error"):
            print(f"\n✗ Scan agent reported an error: {truncate(event.get('result') or 'unknown error', 200)}")
        else:
            print("\n✓ Scan agent run finished.")
        return


def main() -> int:
    for line in sys.stdin:
        format_line(line.rstrip("\n"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
