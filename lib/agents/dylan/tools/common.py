from __future__ import annotations

from typing import Any


def envelope(
    tool: str,
    data: Any,
    *,
    status: str = "ok",
    citations: list | None = None,
    freshness: dict | None = None,
    errors: list | None = None,
) -> dict[str, Any]:
    return {
        "status": status,
        "tool": tool,
        "data": data,
        "citations": citations or [],
        "freshness": freshness or {},
        "errors": errors or [],
    }
