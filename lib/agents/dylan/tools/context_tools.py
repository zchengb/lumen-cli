from __future__ import annotations

from typing import Any

from agents.dylan.context import resolve_previous_result as ctx_resolve_previous
from agents.dylan.tools.common import envelope


def get_thread_context(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    context = runtime.get("context") if isinstance(runtime.get("context"), dict) else {}
    return envelope("get_thread_context", context, freshness={"source": "conversation_context"})


def resolve_previous_result(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    context = runtime.get("context") if isinstance(runtime.get("context"), dict) else {}
    index = arguments.get("index")
    finding_id = ctx_resolve_previous(context, index=int(index) if index is not None else None)
    return envelope(
        "resolve_previous_result",
        {"finding_id": finding_id},
        status="ok" if finding_id else "empty",
    )


def resolve_recent_run(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    from agents.dylan.tools.scan_tools import get_recent_scan_status

    return get_recent_scan_status(arguments, runtime=runtime)
