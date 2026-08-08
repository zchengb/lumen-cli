from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

from skills.test_case.models import StoryContext

_AC_LINE = re.compile(
    r"^\s*(?:[-*•]|\d+[.)]|AC\s*\d+[:.)]?)\s*(.+)$",
    re.IGNORECASE,
)
_IMAGE_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
_PDF_EXT = {".pdf"}


def _ensure_scripts() -> None:
    scripts = Path(__file__).resolve().parents[2] / "scripts"
    if str(scripts) not in sys.path:
        sys.path.insert(0, str(scripts))


def _text_of(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, dict):
        for key in ("content", "text", "body", "description", "summary", "value"):
            if key in value:
                return _text_of(value.get(key))
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, list):
        return "\n".join(_text_of(item) for item in value if item)
    return str(value).strip()


def _extract_acceptance_criteria(description: str, workitem: dict[str, Any]) -> list[str]:
    criteria: list[str] = []
    for key in ("acceptanceCriteria", "acceptance_criteria", "Acceptance Criteria"):
        raw = workitem.get(key)
        if isinstance(raw, list):
            criteria.extend(_text_of(item) for item in raw if _text_of(item))
        elif _text_of(raw):
            criteria.append(_text_of(raw))
    if criteria:
        return [c for c in criteria if c]
    collecting = False
    for line in (description or "").splitlines():
        lower = line.strip().lower()
        if "acceptance criteria" in lower or lower.startswith("ac:"):
            collecting = True
            continue
        if collecting:
            if not line.strip():
                if criteria:
                    break
                continue
            match = _AC_LINE.match(line)
            if match:
                criteria.append(match.group(1).strip())
            elif line.strip().startswith(("#", "##")):
                break
            elif criteria:
                criteria[-1] = f"{criteria[-1]} {line.strip()}".strip()
    if not criteria and description.strip():
        criteria = [description.strip()[:400]]
    return [c for c in criteria if c]


def _normalize_attachment(item: Any) -> dict[str, Any] | None:
    if not isinstance(item, dict):
        return None
    name = str(item.get("filename") or item.get("name") or item.get("title") or "").strip()
    url = str(item.get("content") or item.get("url") or item.get("self") or "").strip()
    mime = str(item.get("mimeType") or item.get("mime_type") or "").strip().lower()
    ext = Path(name).suffix.lower() if name else ""
    supported = ext in _IMAGE_EXT | _PDF_EXT or mime.startswith("image/") or mime == "application/pdf"
    return {
        "name": name or "attachment",
        "url": url,
        "mime": mime,
        "supported": supported,
    }


def read_jira_issue(issue_key: str) -> StoryContext:
    _ensure_scripts()
    from jira_sync import parse_twg_json, run_twg, twg_ready

    key = str(issue_key or "").strip().upper()
    if not key:
        raise ValueError("issue_key required")
    ready, reason = twg_ready()
    if not ready:
        raise RuntimeError(reason)
    code, output = run_twg(["jira", "workitem", "get", key, "--full", "--comments", "-o", "json"])
    if code != 0:
        raise RuntimeError((output or f"Unable to read JIRA {key}").strip()[-1000:])
    raw = parse_twg_json(output)
    if raw is None:
        raise RuntimeError("TWG returned no JSON JIRA payload")
    data = raw.get("data") if isinstance(raw, dict) else raw
    if isinstance(data, list):
        item = data[0] if data and isinstance(data[0], dict) else {}
    elif isinstance(data, dict):
        item = data
    else:
        item = {}
    if not item:
        raise RuntimeError("Unexpected JIRA payload")
    fields = item.get("fields") if isinstance(item.get("fields"), dict) else item
    summary = _text_of(fields.get("summary") or item.get("summary") or item.get("title"))
    description = _text_of(fields.get("description") or item.get("description"))
    issue_type = _text_of(
        (fields.get("issuetype") or {}).get("name")
        if isinstance(fields.get("issuetype"), dict)
        else fields.get("issuetype") or item.get("type") or item.get("issueType")
    )
    if not issue_type and isinstance(item.get("issuetype"), dict):
        issue_type = _text_of(item.get("issuetype", {}).get("name"))
    comments_raw = fields.get("comment") if isinstance(fields.get("comment"), dict) else {}
    comment_list = comments_raw.get("comments") if isinstance(comments_raw.get("comments"), list) else []
    if not comment_list and isinstance(item.get("comments"), list):
        comment_list = item.get("comments") or []
    comments = []
    for entry in comment_list:
        if not isinstance(entry, dict):
            continue
        comments.append(
            {
                "author": _text_of((entry.get("author") or {}).get("displayName") if isinstance(entry.get("author"), dict) else entry.get("author")),
                "body": _text_of(entry.get("body")),
                "created": _text_of(entry.get("created")),
            }
        )
    attachments_raw = fields.get("attachment") if isinstance(fields.get("attachment"), list) else item.get("attachments")
    if not isinstance(attachments_raw, list):
        attachments_raw = []
    attachments: list[dict[str, Any]] = []
    warnings: list[str] = []
    for raw_att in attachments_raw:
        normalized = _normalize_attachment(raw_att)
        if not normalized:
            continue
        if not normalized["supported"]:
            warnings.append(f"skipped unsupported attachment: {normalized['name']}")
            continue
        attachments.append(normalized)
    acceptance = _extract_acceptance_criteria(description, fields if isinstance(fields, dict) else {})
    return StoryContext(
        key=key,
        type=issue_type or "Story",
        summary=summary,
        description=description,
        acceptance_criteria=acceptance,
        comments=comments,
        attachments=attachments,
        warnings=warnings,
    )
