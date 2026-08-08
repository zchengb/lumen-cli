from __future__ import annotations

from pathlib import Path
from typing import Any, Optional

from feishu.bitable import FeishuBitable
from skills.test_case.config import REQUIRED_FIELDS, load_test_case_config
from skills.test_case.dedupe import partition_new_cases
from skills.test_case.generator import generate_test_cases
from skills.test_case.jira_read import read_jira_issue
from skills.test_case.workspace_context import enrich_story_from_workspace, load_workspace_context


def _ensure_table(client: FeishuBitable, app_token: str, table_name: str) -> str:
    tables = client.list_tables(app_token)
    for table in tables:
        if str(table.get("name") or "").strip() == table_name:
            return str(table.get("table_id") or table.get("id") or "").strip()
    created = client.create_table(app_token, table_name)
    table_id = str(created.get("table_id") or created.get("id") or "").strip()
    if not table_id:
        raise RuntimeError("failed to create Test Cases table")
    return table_id


def _ensure_fields(client: FeishuBitable, app_token: str, table_id: str) -> None:
    existing = {str(field.get("field_name") or field.get("name") or "").strip() for field in client.list_fields(app_token, table_id)}
    for name, field_type in REQUIRED_FIELDS:
        if name in existing:
            continue
        client.create_field(app_token, table_id, name=name, field_type=field_type)


def _ensure_story_view(client: FeishuBitable, app_token: str, table_id: str, *, story_key: str, story_title: str) -> str:
    view_name = f"{story_key} · {(story_title or story_key)[:80]}".strip()
    for view in client.list_views(app_token, table_id):
        if str(view.get("view_name") or view.get("name") or "").strip() == view_name:
            return view_name
    try:
        client.create_view(app_token, table_id, name=view_name)
    except Exception:
        pass
    return view_name


def _existing_titles_for_story(records: list[dict[str, Any]], story_key: str) -> set[str]:
    titles: set[str] = set()
    key = story_key.upper()
    for record in records:
        fields = record.get("fields") if isinstance(record.get("fields"), dict) else {}
        story = str(fields.get("Story Key") or "").strip().upper()
        if story and story != key:
            continue
        title = str(fields.get("Title") or "").strip()
        if title:
            titles.add(title)
    return titles


def format_summary(result: dict[str, Any]) -> str:
    counts = result.get("test_case_counts") if isinstance(result.get("test_case_counts"), dict) else {}
    lines = [
        f"Generated {result.get('generated', 0)} test cases for {result.get('issue_key')}.",
        "",
        f"- Functional: {counts.get('functional', 0)}",
        f"- Negative: {counts.get('negative', 0)}",
        f"- Boundary: {counts.get('boundary', 0)}",
        f"- Added: {result.get('created', 0)}",
        f"- Existing: {result.get('skipped_existing', 0)}",
        "",
        "Feishu Test Cases view:",
        str(result.get("view_name") or ""),
    ]
    warnings = result.get("warnings") if isinstance(result.get("warnings"), list) else []
    if warnings:
        lines.extend(["", "Warnings:"] + [f"- {w}" for w in warnings[:8]])
    return "\n".join(lines).strip()


def generate_test_cases_for_issue(
    *,
    project: str,
    issue_key: str,
    workspace: Path | None = None,
    requested_by: str = "",
    source_message_id: str = "",
    trace_id: str = "",
    config: Optional[dict[str, Any]] = None,
    client: FeishuBitable | None = None,
    story_reader=None,
) -> dict[str, Any]:
    cfg = load_test_case_config(project, config=config)
    app_token = cfg.get("base_app_token") or ""
    if not app_token:
        return {
            "status": "failed",
            "code": "TEST_CASE_CONFIG_MISSING",
            "message": f"No Feishu Bitable app token configured for project {project}",
            "trace_id": trace_id,
        }
    reader = story_reader or read_jira_issue
    try:
        story = reader(issue_key)
    except Exception as exc:
        from skills.test_case.workspace_context import load_workspace_story

        local = load_workspace_story(workspace=workspace, issue_key=issue_key)
        if local is None:
            return {
                "status": "failed",
                "code": "JIRA_READ_FAILED",
                "message": str(exc)[:500],
                "trace_id": trace_id,
            }
        story = local
        story.warnings = list(story.warnings or []) + [f"jira unavailable; used workspace story ({str(exc)[:160]})"]
    if str(story.type or "").lower() not in {"story", "bug", ""}:
        return {
            "status": "failed",
            "code": "UNSUPPORTED_ISSUE_TYPE",
            "message": f"Only Story/Bug supported in M1.0, got {story.type}",
            "trace_id": trace_id,
        }
    story = enrich_story_from_workspace(story, workspace=workspace)
    if not story.summary and not story.acceptance_criteria:
        return {
            "status": "failed",
            "code": "STORY_CONTEXT_EMPTY",
            "message": f"No usable story title/AC from Jira or workspace for {issue_key}",
            "trace_id": trace_id,
        }
    workspace_ctx = load_workspace_context(workspace=workspace, issue_key=story.key)
    generated = generate_test_cases(
        story,
        workspace_context=workspace_ctx,
        language=str(cfg.get("language") or "zh-Hant"),
    )
    bitable = client or FeishuBitable(agent_id="mark")
    try:
        table_id = _ensure_table(bitable, app_token, cfg["table_name"])
        _ensure_fields(bitable, app_token, table_id)
        records = bitable.list_records(app_token, table_id)
        existing = _existing_titles_for_story(records, story.key)
        created_cases, skipped_cases = partition_new_cases(generated, existing)
        for case in created_cases:
            case.generated_by = "mark"
            bitable.create_record(app_token, table_id, case.to_fields())
        view_name = _ensure_story_view(
            bitable,
            app_token,
            table_id,
            story_key=story.key,
            story_title=story.summary,
        )
    except Exception as exc:
        message = str(exc)
        code = "FEISHU_TABLE_PERMISSION_DENIED" if "99991663" in message or "permission" in message.lower() else "FEISHU_BITABLE_FAILED"
        return {
            "status": "failed",
            "code": code,
            "message": message[:500],
            "trace_id": trace_id,
        }
    counts = {"functional": 0, "negative": 0, "boundary": 0}
    for case in generated:
        key = str(case.case_type or "").strip().lower()
        if key in counts:
            counts[key] += 1
    result = {
        "status": "completed",
        "issue_key": story.key,
        "story_title": story.summary,
        "generated": len(generated),
        "created": len(created_cases),
        "skipped_existing": len(skipped_cases),
        "obsolete_marked": 0,
        "view_name": view_name,
        "test_case_counts": counts,
        "warnings": list(story.warnings),
        "requested_by": requested_by,
        "source_message_id": source_message_id,
        "trace_id": trace_id,
        "summary": "",
    }
    result["summary"] = format_summary(result)
    return result
