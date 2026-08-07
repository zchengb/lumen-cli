from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from agents.security.actions import ActionReceipt, arguments_hash
from feishu.config import agents_home


def audit_path() -> Path:
    path = agents_home() / "security" / "audit.jsonl"
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def _redact(value: Any) -> Any:
    if isinstance(value, dict):
        out: dict[str, Any] = {}
        for key, item in value.items():
            lower = str(key).lower()
            if any(token in lower for token in ("secret", "token", "password", "api_key", "credential")):
                out[key] = "[redacted]"
            else:
                out[key] = _redact(item)
        return out
    if isinstance(value, list):
        return [_redact(item) for item in value]
    return value


def write_receipt(receipt: ActionReceipt) -> Path:
    path = audit_path()
    payload = _redact(receipt.to_dict())
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, ensure_ascii=False, default=str) + "\n")
    return path


def emit_security_event(event: str, **fields: Any) -> None:
    path = audit_path()
    payload = _redact({"event": event, **fields})
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, ensure_ascii=False, default=str) + "\n")


def hash_args(arguments: dict[str, Any] | None) -> str:
    return arguments_hash(arguments)
