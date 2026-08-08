from __future__ import annotations

from skills.test_case.models import TestCase, normalize_title


def dedupe_key(story_key: str, title: str) -> str:
    return f"{str(story_key or '').strip().upper()}::{normalize_title(title)}"


def partition_new_cases(
    generated: list[TestCase],
    existing_titles: set[str],
) -> tuple[list[TestCase], list[TestCase]]:
    existing = {normalize_title(t) for t in existing_titles}
    created: list[TestCase] = []
    skipped: list[TestCase] = []
    seen: set[str] = set()
    for case in generated:
        key = normalize_title(case.title)
        if key in existing or key in seen:
            skipped.append(case)
            continue
        seen.add(key)
        created.append(case)
    return created, skipped
