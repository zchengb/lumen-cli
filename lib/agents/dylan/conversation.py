from __future__ import annotations

from pathlib import Path
from typing import Any

from agents.dylan.soul_loader import load_soul
from risk.models import RiskConfig
from risk.queries import explain_finding, overdue_high, recurring, top_risks, trend
from risk.store import RiskStore


def _template_answer(action: str, payload: dict[str, Any]) -> str:
    soul = load_soul().splitlines()[0] if load_soul() else "Dylan"
    if action == "risk.trend":
        if payload.get("status") != "ok":
            return "目前还没有足够的 Project Risk 历史。"
        return (
            f"当前 Project Risk 为 {payload.get('latest_score')}（{payload.get('latest_band')}），"
            f"相对上次 Δ {payload.get('delta')}，趋势 {payload.get('direction')}。"
            f" Open High={payload.get('open_high')}, Reopened={payload.get('reopened')}, "
            f"Overdue High={payload.get('overdue_high')}。"
        )
    if action == "risk.top":
        items = payload.get("items") if isinstance(payload.get("items"), list) else []
        if not items:
            return "当前没有 Open / Reopened Finding。"
        lines = ["目前真正值得注意的不是数量，而是这些高分项："]
        for item in items[:5]:
            lines.append(
                f"- [{item.get('effective_severity')}/{item.get('current_risk_band')}] "
                f"{item.get('title')} (score={item.get('current_risk_score')}, id={item.get('id')})"
            )
        return "\n".join(lines)
    if action == "risk.recurring":
        items = payload.get("items") if isinstance(payload.get("items"), list) else []
        if not items:
            return "没有观察到明显的复发 Finding。"
        lines = ["这些模式在重复出现："]
        for item in items[:5]:
            lines.append(
                f"- {item.get('title')} (recurrence={item.get('recurrence_count')}, "
                f"reopened={item.get('reopened_count')})"
            )
        return "\n".join(lines)
    if action == "risk.overdue":
        items = payload.get("items") if isinstance(payload.get("items"), list) else []
        if not items:
            return "没有超过逾期阈值的 High Finding。"
        lines = ["这些 High 已经拖得够久了："]
        for item in items[:5]:
            lines.append(f"- {item.get('title')} ({item.get('age_days')} days, id={item.get('id')})")
        return "\n".join(lines)
    if action in {"risk.explain", "risk.why_severity"}:
        if payload.get("status") != "ok":
            return "找不到对应的 Finding。"
        finding = payload.get("finding") or {}
        adjustments = payload.get("severity_adjustments") or []
        links = payload.get("links") or []
        lines = [
            f"Finding: {finding.get('title')}",
            f"Source severity={finding.get('source_severity')}, effective={finding.get('effective_severity')}",
            f"Score={finding.get('current_risk_score')} band={finding.get('current_risk_band')}",
            f"Recurrence={finding.get('recurrence_count')} reopened={finding.get('reopened_count')}",
        ]
        if adjustments:
            latest = adjustments[0]
            lines.append(f"Severity adjustment: {latest.get('source_severity')} → {latest.get('effective_severity')} ({latest.get('reason_codes')})")
        if links:
            for link in links:
                lines.append(f"{link.get('type')}: {link.get('external_id') or ''} {link.get('url') or ''}".strip())
        else:
            lines.append("No linked Jira/PR in the risk store.")
        return "\n".join(lines)
    return f"{soul}: 我只能基于已存储的风险证据回答。"


def answer_risk_query(
    *,
    workspace: Path,
    common: dict[str, Any],
    action: str,
    params: dict[str, Any],
) -> dict[str, Any]:
    config = RiskConfig.from_common(common)
    store = RiskStore(workspace)
    try:
        project_slug = str(params.get("project") or "").strip()
        if not project_slug:
            # infer from common
            project = common.get("project") if isinstance(common.get("project"), dict) else {}
            project_slug = str(project.get("slug") or project.get("display_name") or workspace.parent.name).strip()
            if " " in project_slug:
                project_slug = project_slug.lower().replace(" ", "-")
        payload: dict[str, Any]
        if action == "risk.trend":
            payload = trend(store, project_slug)
        elif action == "risk.top":
            payload = {"items": top_risks(store, project_slug)}
        elif action == "risk.recurring":
            payload = {"items": recurring(store, project_slug)}
        elif action == "risk.overdue":
            payload = {"items": overdue_high(store, project_slug, config)}
        elif action in {"risk.explain", "risk.why_severity"}:
            finding_id = str(params.get("finding_id") or "").strip()
            if not finding_id:
                tops = top_risks(store, project_slug, limit=1)
                finding_id = str(tops[0]["id"]) if tops else ""
            payload = explain_finding(store, finding_id) if finding_id else {"status": "not_found"}
        else:
            payload = {"status": "unsupported"}
        text = _template_answer(action, payload)
        return {"status": "ok", "action": action, "text": text, "payload": payload}
    finally:
        store.close()
