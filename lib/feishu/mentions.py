from __future__ import annotations

from typing import Optional


def resolve_owner_mention(
    *,
    jira_assignee: str = "",
    project_owner: str = "",
    group_owner: str = "",
) -> tuple[str, str]:
    for candidate, source in (
        (jira_assignee, "jira_assignee"),
        (project_owner, "project_owner"),
        (group_owner, "group_owner"),
    ):
        value = str(candidate or "").strip()
        if value:
            return value, source
    return "", "unresolved"
