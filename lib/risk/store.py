from __future__ import annotations

import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

from risk.migrations import connect, connect_global


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def risk_db_path(workspace: Path) -> Path:
    return Path(workspace).expanduser().resolve() / "risk" / "risk.sqlite3"


def global_db_path() -> Path:
    override = os.environ.get("LUMEN_AGENTS_HOME", "").strip()
    home = Path(override).expanduser() if override else Path.home() / ".lumen" / "agents"
    return home / "agents.sqlite3"


class RiskStore:
    def __init__(self, workspace: Path) -> None:
        self.workspace = Path(workspace).expanduser().resolve()
        self.path = risk_db_path(self.workspace)
        self.conn = connect(self.path)

    def close(self) -> None:
        self.conn.close()

    def execute(self, sql: str, params: tuple | list = ()) -> sqlite3.Cursor:
        return self.conn.execute(sql, params)

    def commit(self) -> None:
        self.conn.commit()

    def fetchone(self, sql: str, params: tuple | list = ()) -> Optional[sqlite3.Row]:
        return self.conn.execute(sql, params).fetchone()

    def fetchall(self, sql: str, params: tuple | list = ()) -> list[sqlite3.Row]:
        return list(self.conn.execute(sql, params).fetchall())

    def upsert_scan_run(self, payload: dict[str, Any]) -> None:
        self.execute(
            """
            INSERT INTO scan_run(
                id, project_slug, source, started_at, completed_at, status,
                window_days, result_path, finding_count, high_count, data_freshness
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                completed_at=excluded.completed_at,
                status=excluded.status,
                finding_count=excluded.finding_count,
                high_count=excluded.high_count,
                data_freshness=excluded.data_freshness
            """,
            (
                payload["id"],
                payload["project_slug"],
                payload.get("source", "scan"),
                payload.get("started_at"),
                payload.get("completed_at"),
                payload.get("status", "completed"),
                payload.get("window_days"),
                payload.get("result_path"),
                payload.get("finding_count", 0),
                payload.get("high_count", 0),
                payload.get("data_freshness", "fresh"),
            ),
        )

    def get_finding_by_fingerprint(self, project_slug: str, fingerprint: str) -> Optional[sqlite3.Row]:
        return self.fetchone(
            "SELECT * FROM finding WHERE project_slug = ? AND canonical_fingerprint = ?",
            (project_slug, fingerprint),
        )

    def get_finding(self, finding_id: str) -> Optional[sqlite3.Row]:
        return self.fetchone("SELECT * FROM finding WHERE id = ?", (finding_id,))

    def list_findings(self, project_slug: str, statuses: Optional[list[str]] = None) -> list[sqlite3.Row]:
        if statuses:
            placeholders = ",".join("?" for _ in statuses)
            return self.fetchall(
                f"SELECT * FROM finding WHERE project_slug = ? AND status IN ({placeholders}) ORDER BY current_risk_score DESC",
                [project_slug, *statuses],
            )
        return self.fetchall(
            "SELECT * FROM finding WHERE project_slug = ? ORDER BY current_risk_score DESC",
            (project_slug,),
        )

    def insert_event(self, finding_id: str, event_type: str, **kwargs: Any) -> None:
        self.execute(
            """
            INSERT INTO finding_event(
                finding_id, event_type, previous_status, new_status,
                actor_type, actor_id, reason, occurred_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                finding_id,
                event_type,
                kwargs.get("previous_status"),
                kwargs.get("new_status"),
                kwargs.get("actor_type", "system"),
                kwargs.get("actor_id", "risk-engine"),
                kwargs.get("reason"),
                kwargs.get("occurred_at") or utc_now(),
            ),
        )

    def alert_already_sent(self, project_slug: str, event_key: str) -> bool:
        row = self.fetchone(
            "SELECT 1 FROM alert_delivery WHERE project_slug = ? AND event_key = ?",
            (project_slug, event_key),
        )
        return row is not None

    def record_alert(self, project_slug: str, event_key: str, event_type: str, finding_id: str = "") -> None:
        self.execute(
            """
            INSERT OR IGNORE INTO alert_delivery(project_slug, finding_id, event_key, event_type, delivered_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (project_slug, finding_id or None, event_key, event_type, utc_now()),
        )

    def latest_project_snapshot(self, project_slug: str) -> Optional[sqlite3.Row]:
        return self.fetchone(
            "SELECT * FROM project_risk_snapshot WHERE project_slug = ? ORDER BY id DESC LIMIT 1",
            (project_slug,),
        )

    def previous_project_snapshot(self, project_slug: str) -> Optional[sqlite3.Row]:
        rows = self.fetchall(
            "SELECT * FROM project_risk_snapshot WHERE project_slug = ? ORDER BY id DESC LIMIT 2",
            (project_slug,),
        )
        return rows[1] if len(rows) > 1 else None


class GlobalAgentStore:
    def __init__(self, path: Optional[Path] = None) -> None:
        self.path = path or global_db_path()
        self.conn = connect_global(self.path)

    def close(self) -> None:
        self.conn.close()

    def set_chat_project(self, chat_id: str, project_slug: str) -> None:
        self.conn.execute(
            """
            INSERT INTO chat_project_map(chat_id, project_slug, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(chat_id) DO UPDATE SET project_slug=excluded.project_slug, updated_at=excluded.updated_at
            """,
            (chat_id, project_slug, utc_now()),
        )
        self.conn.commit()

    def get_chat_project(self, chat_id: str) -> str:
        row = self.conn.execute(
            "SELECT project_slug FROM chat_project_map WHERE chat_id = ?",
            (chat_id,),
        ).fetchone()
        return str(row["project_slug"]) if row else ""

    def cache_project_summary(self, project_slug: str, summary: dict[str, Any]) -> None:
        self.conn.execute(
            """
            INSERT INTO project_summary_cache(project_slug, summary_json, updated_at)
            VALUES (?, ?, ?)
            ON CONFLICT(project_slug) DO UPDATE SET summary_json=excluded.summary_json, updated_at=excluded.updated_at
            """,
            (project_slug, json.dumps(summary, ensure_ascii=False), utc_now()),
        )
        self.conn.commit()
