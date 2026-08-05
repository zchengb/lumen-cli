from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from risk.models import RiskConfig
from risk.queries import overdue_high, top_risks, trend
from risk.store import GlobalAgentStore, RiskStore, utc_now


def build_weekly_brief(workspace: Path, common: dict[str, Any], *, failed_scan: bool = False) -> dict[str, Any]:
    config = RiskConfig.from_common(common)
    store = RiskStore(workspace)
    try:
        project = common.get("project") if isinstance(common.get("project"), dict) else {}
        project_slug = str(project.get("slug") or workspace.parent.name).strip()
        if " " in project_slug:
            project_slug = project_slug.lower().replace(" ", "-")
        brief = {
            "project_slug": project_slug,
            "trend": trend(store, project_slug),
            "top_concerns": top_risks(store, project_slug, limit=3),
            "overdue": overdue_high(store, project_slug, config),
            "data_freshness": "stale" if failed_scan else "fresh",
            "failed_scan": failed_scan,
            "generated_at": utc_now(),
        }
        return brief
    finally:
        store.close()


def deliver_weekly_brief(workspace: Path, common: dict[str, Any], *, failed_scan: bool = False) -> dict[str, Any]:
    config = RiskConfig.from_common(common)
    brief = build_weekly_brief(workspace, common, failed_scan=failed_scan)
    project_slug = str(brief.get("project_slug") or "")
    week_key = str(brief.get("generated_at") or "")[:10]
    chat_id = config.alert_chat_id
    if not chat_id:
        try:
            global_store = GlobalAgentStore()
            row = global_store.conn.execute(
                "SELECT chat_id FROM chat_project_map WHERE project_slug = ? LIMIT 1",
                (project_slug,),
            ).fetchone()
            chat_id = str(row["chat_id"]) if row else ""
            global_store.close()
        except Exception:
            chat_id = ""
    status = "generated"
    if chat_id:
        try:
            from feishu.messenger import FeishuMessenger
            from feishu.risk_cards import weekly_brief_card

            FeishuMessenger("dylan").send_card(chat_id, weekly_brief_card(project_slug, brief))
            status = "sent"
        except Exception as exc:
            status = f"send_failed:{exc}"
    try:
        global_store = GlobalAgentStore()
        global_store.conn.execute(
            """
            INSERT OR REPLACE INTO weekly_brief_delivery(project_slug, week_key, delivered_at, payload_json)
            VALUES (?, ?, ?, ?)
            """,
            (project_slug, week_key, utc_now(), json.dumps(brief, ensure_ascii=False)),
        )
        global_store.conn.commit()
        global_store.close()
    except Exception:
        pass
    out = workspace / "state" / "risk-weekly-brief.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({**brief, "delivery_status": status}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return {**brief, "delivery_status": status}
