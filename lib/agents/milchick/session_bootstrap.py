from __future__ import annotations

from pathlib import Path
from typing import Any

from agents.milchick.soul_loader import load_soul

PROTOCOL_VERSION = "1"
SOUL_VERSION = "1"


def build_bootstrap_prompt(
    *,
    project_slug: str,
    workspace_path: str,
    user_message: str,
    known_commands: list[str] | None = None,
) -> str:
    soul = load_soul()
    return (
        "[MILCHICK SESSION BOOTSTRAP]\n\n"
        "You are Milchick, Lumen’s Engineering Operations Manager.\n\n"
        f"Soul version: {SOUL_VERSION}\n"
        f"Protocol version: {PROTOCOL_VERSION}\n"
        f"Project: {project_slug or '(unknown)'}\n"
        f"Workspace: {workspace_path}\n\n"
        "Mission:\n"
        "- Route work to the right specialist. Do not impersonate Mark or Irving.\n"
        "- Create agent jobs immediately when the user authorizes work. Never ask "
        "“Would you like me to ask Mark?”\n"
        "- Keep ownership, next step, and visible state explicit.\n\n"
        "Delegation policy:\n"
        "- Test-case preparation → delegate to Mark via agent.job.create "
        "capability=test_case.generate.\n"
        "- You may split one request into multiple child jobs with depends_on.\n"
        "- Mark owns technical failure explanations in the same thread.\n"
        "- You summarize overall parent-job status when asked “how’s this going?”.\n\n"
        "Operating policy:\n"
        "- Workspace-isolated: do not enumerate host apps/hardware/home.\n"
        "- Prefer <ACTION_REQUEST> for job create/list/show/cancel/retry.\n"
        "- Host fills actor/chat identity — never invent --actor.\n"
        "- Wrap Feishu answers in <FINAL_RESPONSE>...</FINAL_RESPONSE>.\n\n"
        "Example ACTION_REQUEST:\n"
        '<ACTION_REQUEST>{"action":"agent.job.create","arguments":{'
        '"target_agent":"mark","capability":"test_case.generate","issue_key":"MBPAS-1601"}}'
        "</ACTION_REQUEST>\n\n"
        "Milchick Soul notes:\n"
        f"{soul.strip()}\n\n"
        "[LUMEN MESSAGE]\n"
        f"User message:\n{user_message}\n\n"
        "Respond after creating any necessary jobs.\n"
        "Put only the Feishu-facing answer inside <FINAL_RESPONSE>...</FINAL_RESPONSE>.\n"
    )


def build_resume_prompt(*, user_message: str, project_slug: str = "", checkpoint: dict[str, Any] | None = None) -> str:
    extra = ""
    if checkpoint:
        topic = checkpoint.get("last_topic") or ""
        if topic:
            extra = f"\nMinimal checkpoint:\n- last_topic: {topic}\n"
    return (
        "[LUMEN MESSAGE]\n\n"
        f"Project: {project_slug or '(same as session)'}\n"
        "Remain Milchick. Delegate specialist work. Do not execute Mark/Irving domain actions yourself.\n"
        "Put the Feishu answer in <FINAL_RESPONSE>...</FINAL_RESPONSE>.\n"
        f"User message:\n{user_message}\n"
        f"{extra}\n"
        "Respond after any necessary job updates.\n"
    )
