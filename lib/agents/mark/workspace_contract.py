from __future__ import annotations

from pathlib import Path

MANAGED_VERSION = "1"
_MANAGED_START = f"<!-- LUMEN MARK MANAGED START version={MANAGED_VERSION} -->"
_MANAGED_END = "<!-- LUMEN MARK MANAGED END -->"
_MANAGED_START_PREFIX = "<!-- LUMEN MARK MANAGED START"


def _managed_block(project_slug: str) -> str:
    slug = project_slug or "project"
    return (
        f"{_MANAGED_START}\n"
        f"## Project\n{slug}\n\n"
        f"## Role\nMark — Delivery Lead\n\n"
        f"## Layout\n"
        f"- stories/\n"
        f"- technical-plan.md per story\n"
        f"- lumen/results/delivery-progress.json\n"
        f"- lumen/results/delivery-result.json\n"
        f"- story worktrees under lumen/worktrees/\n\n"
        f"## Delivery Lifecycle\n"
        f"- Investigate Story / Plan / Progress\n"
        f"- Readiness before start\n"
        f"- Explicit start only → lumen delivery run\n"
        f"- Follow-up from progress/result files\n"
        f"- Finalize (commit/push/PR/notify) stays in Lumen pipeline\n\n"
        f"## Commands\n"
        f"- lumen delivery readiness --story <id> --json\n"
        f"- lumen delivery status --story <id> --json\n"
        f"- lumen delivery run --story <id> --actor <user> --source-message-id <mid> --trace-id <tid> --json\n"
        f"- lumen delivery result --run-id <id> --json\n\n"
        f"## Rules\n"
        f"- Do not modify business source in conversational Mark session.\n"
        f"- Do not invent PR / verification / Jira status.\n"
        f"- Ordinary questions must not start delivery.\n"
        f"- Put Feishu answers in <FINAL_RESPONSE>...</FINAL_RESPONSE>\n"
        f"{_MANAGED_END}\n"
    )


def _upsert_managed_block(existing: str, project_slug: str) -> str:
    block = _managed_block(project_slug)
    text = existing or ""
    start = text.find(_MANAGED_START_PREFIX)
    if start >= 0:
        end = text.find(_MANAGED_END, start)
        if end >= 0:
            end += len(_MANAGED_END)
            return text[:start].rstrip() + "\n\n" + block + text[end:].lstrip("\n")
    if not text.strip():
        return f"# Mark Workspace Guide\n\n{block}"
    return text.rstrip() + "\n\n" + block


def ensure_workspace_contract(*, workspace: Path, project_slug: str) -> Path:
    root = Path(workspace).expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    agents = root / "AGENTS.md"
    current = agents.read_text(encoding="utf-8") if agents.is_file() else ""
    updated = _upsert_managed_block(current, project_slug)
    if updated != current:
        agents.write_text(updated, encoding="utf-8")
    return root
