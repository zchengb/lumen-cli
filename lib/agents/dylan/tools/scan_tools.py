from __future__ import annotations

from typing import Any

from agents.dylan.tools.common import envelope


def get_recent_scan_status(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    store = runtime.get("global_store")
    meta = runtime.get("meta") or {}
    row = None
    if store is not None:
        row = store.resolve_recent_run(
            chat_id=str(meta.get("chat_id") or ""),
            thread_id=str(meta.get("thread_id") or ""),
            user_id=str(meta.get("user_id") or ""),
            project_slug=str(arguments.get("project_slug") or runtime.get("project_slug") or ""),
        )
    if row is None:
        from agents.actions.scan import load_recent_run

        recent = load_recent_run() or {}
        return envelope("get_recent_scan_status", recent, freshness={"source": "recent_run_file"})
    data = dict(row)
    if data.get("summary_json"):
        try:
            import json

            data["summary"] = json.loads(str(data["summary_json"]))
        except Exception:
            data["summary"] = {}
    return envelope("get_recent_scan_status", data, freshness={"source": "agent_run", "updated_at": data.get("updated_at")})


def get_scan_summary(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    status = get_recent_scan_status(arguments, runtime=runtime)
    data = status.get("data") if isinstance(status.get("data"), dict) else {}
    summary = data.get("summary") if isinstance(data.get("summary"), dict) else {}
    return envelope(
        "get_scan_summary",
        {
            "run_id": data.get("run_id"),
            "status": data.get("status"),
            "project_slug": data.get("project_slug"),
            "summary": summary,
        },
        freshness=status.get("freshness") or {},
    )


def get_scan_result(arguments: dict[str, Any], *, runtime: dict[str, Any]) -> dict[str, Any]:
    status = get_recent_scan_status(arguments, runtime=runtime)
    data = status.get("data") if isinstance(status.get("data"), dict) else {}
    path = str(arguments.get("result_path") or data.get("result_path") or "")
    if not path:
        return envelope("get_scan_result", {}, status="empty", errors=["no result_path"])
    from pathlib import Path
    import json

    p = Path(path)
    if not p.is_file():
        return envelope("get_scan_result", {"result_path": path}, status="missing")
    try:
        scan = json.loads(p.read_text(encoding="utf-8"))
    except Exception as exc:
        return envelope("get_scan_result", {}, status="error", errors=[str(exc)])
    findings = scan.get("findings") if isinstance(scan.get("findings"), list) else []
    high = sum(1 for f in findings if isinstance(f, dict) and str(f.get("severity")) == "High")
    medium = sum(1 for f in findings if isinstance(f, dict) and str(f.get("severity")) == "Medium")
    return envelope(
        "get_scan_result",
        {
            "run_id": data.get("run_id"),
            "result_path": path,
            "finding_count": len(findings),
            "high": high,
            "medium": medium,
            "scan_status": scan.get("scan_status"),
        },
        freshness={"source": "scan_result", "path": path},
    )
