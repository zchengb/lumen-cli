from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from skills.test_case.models import StoryContext

_FRONT_TITLE = re.compile(r'^title:\s*["\']?(.+?)["\']?\s*$', re.MULTILINE)
_AC_HEADER = re.compile(r"^###\s*(AC\s*\d+)\s*:\s*(.+)\s*$", re.IGNORECASE)
_H2 = re.compile(r"^##\s+")


def find_story_dir(workspace: Path | None, issue_key: str) -> Path | None:
    if workspace is None:
        return None
    root = Path(workspace).expanduser().resolve()
    stories = root / "stories"
    if not stories.is_dir():
        return None
    key = str(issue_key or "").strip().upper()
    if not key:
        return None
    for candidate in (stories / key, stories / key.lower(), stories / issue_key):
        if candidate.is_dir() and (candidate / "story.md").is_file():
            return candidate
    matches = sorted(
        path
        for path in stories.iterdir()
        if path.is_dir() and path.name.upper().startswith(key) and (path / "story.md").is_file()
    )
    return matches[0] if matches else None


def _parse_acceptance_criteria(markdown: str) -> list[str]:
    criteria: list[str] = []
    current_title = ""
    current_lines: list[str] = []

    def flush() -> None:
        nonlocal current_title, current_lines
        if not current_title and not current_lines:
            return
        body = "\n".join(current_lines).strip()
        text = f"{current_title}\n{body}".strip() if body else current_title.strip()
        if text:
            criteria.append(text)
        current_title = ""
        current_lines = []

    in_ac_section = False
    for line in (markdown or "").splitlines():
        if re.match(r"^##\s+Acceptance Criteria\s*$", line.strip(), re.IGNORECASE):
            in_ac_section = True
            continue
        if in_ac_section and _H2.match(line):
            flush()
            break
        if not in_ac_section:
            continue
        match = _AC_HEADER.match(line.strip())
        if match:
            flush()
            current_title = f"{match.group(1).replace(' ', '')}: {match.group(2).strip()}"
            current_lines = []
            continue
        if current_title:
            current_lines.append(line.rstrip())
    flush()
    return criteria


def load_workspace_story(*, workspace: Path | None, issue_key: str) -> StoryContext | None:
    story_dir = find_story_dir(workspace, issue_key)
    if story_dir is None:
        return None
    path = story_dir / "story.md"
    raw = path.read_text(encoding="utf-8")
    title = ""
    match = _FRONT_TITLE.search(raw)
    if match:
        title = match.group(1).strip()
    if not title:
        for line in raw.splitlines():
            if line.startswith("# "):
                title = line[2:].strip()
                break
    key = str(issue_key or "").strip().upper()
    if title.upper().startswith(key):
        title = title[len(key) :].strip(" -:：")
    acceptance = _parse_acceptance_criteria(raw)
    description = raw
    if raw.startswith("---"):
        parts = raw.split("---", 2)
        if len(parts) >= 3:
            description = parts[2].strip()
    return StoryContext(
        key=key,
        type="Story",
        summary=title or key,
        description=description[:12000],
        acceptance_criteria=acceptance,
        warnings=[] if acceptance else ["workspace story has no parsed acceptance criteria"],
    )


def enrich_story_from_workspace(
    story: StoryContext,
    *,
    workspace: Path | None,
) -> StoryContext:
    local = load_workspace_story(workspace=workspace, issue_key=story.key)
    if local is None:
        return story
    summary = story.summary or local.summary
    description = story.description or local.description
    acceptance = list(story.acceptance_criteria or []) or list(local.acceptance_criteria or [])
    warnings = list(story.warnings or [])
    for item in local.warnings:
        if item not in warnings:
            warnings.append(item)
    return StoryContext(
        key=story.key,
        type=story.type or local.type,
        summary=summary,
        description=description,
        acceptance_criteria=acceptance,
        comments=list(story.comments or []),
        attachments=list(story.attachments or []),
        warnings=warnings,
    )


def load_workspace_context(*, workspace: Path | None, issue_key: str) -> dict[str, Any]:
    root = Path(workspace).expanduser().resolve() if workspace else None
    payload: dict[str, Any] = {
        "technical_plan": "",
        "related_tests": [],
        "related_sources": [],
        "story_dir": "",
    }
    if root is None or not root.is_dir():
        return payload
    story_dir = find_story_dir(root, issue_key)
    if story_dir is not None:
        payload["story_dir"] = str(story_dir)
        plan = story_dir / "technical-plan.md"
        if plan.is_file():
            payload["technical_plan"] = plan.read_text(encoding="utf-8")[:8000]
    tests_root = root / "tests"
    if tests_root.is_dir():
        for path in sorted(tests_root.rglob("test_*.py"))[:8]:
            payload["related_tests"].append(str(path.relative_to(root)))
    for src_name in ("src", "lib", "app"):
        src = root / src_name
        if not src.is_dir():
            continue
        for path in sorted(src.rglob("*.py"))[:8]:
            payload["related_sources"].append(str(path.relative_to(root)))
        break
    return payload
