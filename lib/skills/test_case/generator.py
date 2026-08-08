from __future__ import annotations

from typing import Any

from skills.test_case.models import StoryContext, TestCase


def _steps(*lines: str) -> str:
    return "\n".join(f"{idx}. {line}" for idx, line in enumerate(lines, start=1))


def generate_test_cases(
    story: StoryContext,
    *,
    workspace_context: dict[str, Any] | None = None,
) -> list[TestCase]:
    criteria = list(story.acceptance_criteria or [])
    if not criteria:
        criteria = [story.summary or f"Validate {story.key}"]
    cases: list[TestCase] = []
    title = story.summary or story.key
    for index, ac in enumerate(criteria, start=1):
        cases.append(
            TestCase(
                title=f"{story.key} AC{index} happy path",
                steps=_steps(
                    f"Open the feature described by {story.key}: {title}",
                    f"Perform the acceptance criterion: {ac}",
                    "Observe the resulting UI/API state",
                ),
                expected_result=f"Acceptance criterion is satisfied: {ac}",
                case_type="Functional",
                story_key=story.key,
                story_title=title,
            )
        )
        cases.append(
            TestCase(
                title=f"{story.key} AC{index} negative path",
                steps=_steps(
                    f"Prepare invalid or unauthorized input for: {ac}",
                    "Attempt the same user action with the invalid condition",
                    "Capture the error/empty state presented to the user",
                ),
                expected_result="The system blocks or explains the failure without corrupting valid data.",
                case_type="Negative",
                story_key=story.key,
                story_title=title,
            )
        )
        cases.append(
            TestCase(
                title=f"{story.key} AC{index} boundary",
                steps=_steps(
                    f"Identify edge values relevant to: {ac}",
                    "Execute the flow at the lower and upper allowed limits",
                    "Repeat once just outside the allowed limit when applicable",
                ),
                expected_result="In-bound values succeed; out-of-bound values are rejected safely.",
                case_type="Boundary",
                story_key=story.key,
                story_title=title,
            )
        )
    if story.attachments:
        names = ", ".join(att.get("name") or "attachment" for att in story.attachments[:5])
        cases.append(
            TestCase(
                title=f"{story.key} attachment-informed UI check",
                steps=_steps(
                    f"Review attached references: {names}",
                    "Compare the live UI/API against the referenced mock or specification",
                    "Note any mismatch against acceptance criteria",
                ),
                expected_result="Implementation matches the referenced attachment where requirements allow.",
                case_type="Functional",
                story_key=story.key,
                story_title=title,
            )
        )
    ctx = workspace_context or {}
    if str(ctx.get("technical_plan") or "").strip():
        cases.append(
            TestCase(
                title=f"{story.key} technical-plan alignment",
                steps=_steps(
                    "Open technical-plan.md for this story",
                    "Walk the planned user/system steps against the current acceptance criteria",
                    "Confirm no planned step contradicts an explicit AC",
                ),
                expected_result="Planned implementation steps remain consistent with Jira acceptance criteria.",
                case_type="Functional",
                story_key=story.key,
                story_title=title,
            )
        )
    return cases
