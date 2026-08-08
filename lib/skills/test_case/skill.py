from __future__ import annotations

from pathlib import Path
from typing import Any, Optional

from feishu.bitable import FeishuBitable
from feishu.sheets import FeishuSheets, column_letter, parse_spreadsheet_token
from skills.test_case.config import HEADER_COLUMNS, REQUIRED_FIELDS, load_test_case_config
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


def _ensure_story_view(client: FeishuBitable, app_token: str, table_id: str, *, story_key: str, story_title: str) -> tuple[str, str]:
    view_name = f"{story_key} · {(story_title or story_key)[:80]}".strip()

    def _find() -> tuple[str, str]:
        for view in client.list_views(app_token, table_id):
            name = str(view.get("view_name") or view.get("name") or "").strip()
            if name == view_name:
                return view_name, str(view.get("view_id") or view.get("id") or "").strip()
        return view_name, ""

    found_name, found_id = _find()
    if found_id:
        return found_name, found_id
    try:
        created = client.create_view(app_token, table_id, name=view_name)
        view_id = str(created.get("view_id") or created.get("id") or "").strip()
        if view_id:
            return view_name, view_id
    except Exception:
        pass
    return _find()


def build_sheet_url(
    *,
    app_token: str = "",
    table_id: str = "",
    view_id: str = "",
    host: str = "inspiregroup.feishu.cn",
    destination: str = "bitable",
    spreadsheet_token: str = "",
) -> str:
    host_name = str(host or "inspiregroup.feishu.cn").strip() or "inspiregroup.feishu.cn"
    if str(destination or "").strip().lower() == "sheet":
        token = parse_spreadsheet_token(spreadsheet_token or app_token)
        return f"https://{host_name}/sheets/{token}" if token else ""
    token = str(app_token or "").strip()
    table = str(table_id or "").strip()
    if not token or not table:
        return ""
    base = f"https://{host_name}/base/{token}"
    query = [f"table={table}"]
    view = str(view_id or "").strip()
    if view:
        query.append(f"view={view}")
    return f"{base}?{'&'.join(query)}"


def format_sheet_link(sheet_url: str, label: str = "Open Test Cases sheet") -> str:
    url = str(sheet_url or "").strip()
    if not url:
        return ""
    text = (label or "Open Test Cases sheet").replace("'", "").strip() or "Open Test Cases sheet"
    return f"<link icon='sheet-bitable_outlined' url='{url}'>{text}</link>\n{url}"


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


def _sheet_rows_to_records(rows: list[list[Any]]) -> list[dict[str, Any]]:
    if not rows:
        return []
    header = [str(cell or "").strip() for cell in (rows[0] if rows else [])]
    if not any(header):
        return []
    records: list[dict[str, Any]] = []
    for row in rows[1:]:
        fields: dict[str, Any] = {}
        for idx, name in enumerate(header):
            if not name:
                continue
            value = row[idx] if idx < len(row) else ""
            fields[name] = value
        if fields:
            records.append({"fields": fields})
    return records


def _ensure_sheet_headers(client: FeishuSheets, spreadsheet_token: str, sheet_id: str, rows: list[list[Any]]) -> list[list[Any]]:
    if rows and any(str(cell or "").strip() for cell in rows[0]):
        return rows
    end_col = column_letter(len(HEADER_COLUMNS) - 1)
    client.append_values(
        spreadsheet_token,
        sheet_id=sheet_id,
        values=[list(HEADER_COLUMNS)],
        end_col=end_col,
    )
    return [list(HEADER_COLUMNS)]


def _write_cases_to_sheet(
    *,
    client: FeishuSheets,
    cfg: dict[str, Any],
    story_key: str,
    story_title: str,
    generated: list[Any],
) -> dict[str, Any]:
    spreadsheet_token = str(cfg.get("spreadsheet_token") or "").strip()
    sheet_name = str(cfg.get("sheet_name") or "Sheet1").strip() or "Sheet1"
    sheet = client.resolve_sheet(spreadsheet_token, sheet_name)
    sheet_id = str(sheet.get("sheetId") or sheet.get("sheet_id") or "").strip()
    if not sheet_id:
        raise RuntimeError("Feishu sheet id missing")
    end_col = column_letter(len(HEADER_COLUMNS) - 1)
    rows = client.get_values(spreadsheet_token, f"{sheet_id}!A1:{end_col}2000")
    rows = _ensure_sheet_headers(client, spreadsheet_token, sheet_id, rows)
    records = _sheet_rows_to_records(rows)
    existing = _existing_titles_for_story(records, story_key)
    created, skipped = partition_new_cases(generated, existing)
    values = []
    for case in created:
        case.generated_by = "mark"
        fields = case.to_fields()
        values.append([str(fields.get(col) or "") for col in HEADER_COLUMNS])
    if values:
        client.append_values(spreadsheet_token, sheet_id=sheet_id, values=values, end_col=end_col)
    view_name = f"{story_key} · {(story_title or story_key)[:80]}".strip()
    sheet_url = build_sheet_url(
        destination="sheet",
        spreadsheet_token=spreadsheet_token,
        host=str(cfg.get("feishu_base_host") or "inspiregroup.feishu.cn"),
    )
    return {
        "created_cases": created,
        "skipped_cases": skipped,
        "view_name": view_name,
        "table_id": sheet_id,
        "view_id": "",
        "sheet_url": sheet_url,
    }


def format_summary(result: dict[str, Any]) -> str:
    counts = result.get("test_case_counts") if isinstance(result.get("test_case_counts"), dict) else {}
    sheet_url = str(result.get("sheet_url") or "").strip()
    view_name = str(result.get("view_name") or "").strip()
    lines = [
        f"Generated {result.get('generated', 0)} test cases for {result.get('issue_key')}.",
        "",
        f"- Functional: {counts.get('functional', 0)}",
        f"- Negative: {counts.get('negative', 0)}",
        f"- Boundary: {counts.get('boundary', 0)}",
        f"- Added: {result.get('created', 0)}",
        f"- Existing: {result.get('skipped_existing', 0)}",
        "",
        "Feishu Test Cases sheet:",
    ]
    link = format_sheet_link(sheet_url, view_name or "Open Test Cases sheet")
    if link:
        lines.append(link)
    elif view_name:
        lines.append(view_name)
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
    sheets_client: FeishuSheets | None = None,
    story_reader=None,
) -> dict[str, Any]:
    cfg = load_test_case_config(project, config=config)
    destination = str(cfg.get("destination") or "bitable")
    app_token = cfg.get("base_app_token") or ""
    spreadsheet_token = cfg.get("spreadsheet_token") or ""
    if destination == "sheet" and not spreadsheet_token:
        return {
            "status": "failed",
            "code": "TEST_CASE_CONFIG_MISSING",
            "message": f"No Feishu Spreadsheet token configured for project {project}",
            "trace_id": trace_id,
        }
    if destination != "sheet" and not app_token:
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
    try:
        if destination == "sheet":
            sheets = sheets_client or FeishuSheets(agent_id="mark")
            written = _write_cases_to_sheet(
                client=sheets,
                cfg=cfg,
                story_key=story.key,
                story_title=story.summary,
                generated=generated,
            )
            created_cases = written["created_cases"]
            skipped_cases = written["skipped_cases"]
            view_name = written["view_name"]
            table_id = written["table_id"]
            view_id = written["view_id"]
            sheet_url = written["sheet_url"]
        else:
            bitable = client or FeishuBitable(agent_id="mark")
            table_id = _ensure_table(bitable, app_token, cfg["table_name"])
            _ensure_fields(bitable, app_token, table_id)
            records = bitable.list_records(app_token, table_id)
            existing = _existing_titles_for_story(records, story.key)
            created_cases, skipped_cases = partition_new_cases(generated, existing)
            for case in created_cases:
                case.generated_by = "mark"
                bitable.create_record(app_token, table_id, case.to_fields())
            view_name, view_id = _ensure_story_view(
                bitable,
                app_token,
                table_id,
                story_key=story.key,
                story_title=story.summary,
            )
            sheet_url = build_sheet_url(
                app_token=app_token,
                table_id=table_id,
                view_id=view_id,
                host=str(cfg.get("feishu_base_host") or "inspiregroup.feishu.cn"),
            )
    except Exception as exc:
        message = str(exc)
        if "99991663" in message or "99991672" in message or "permission" in message.lower():
            code = "FEISHU_TABLE_PERMISSION_DENIED"
        elif destination == "sheet":
            code = "FEISHU_SHEETS_FAILED"
        else:
            code = "FEISHU_BITABLE_FAILED"
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
        "table_id": table_id,
        "view_id": view_id,
        "sheet_url": sheet_url,
        "destination": destination,
        "test_case_counts": counts,
        "warnings": list(story.warnings),
        "requested_by": requested_by,
        "source_message_id": source_message_id,
        "trace_id": trace_id,
        "summary": "",
    }
    result["summary"] = format_summary(result)
    return result
