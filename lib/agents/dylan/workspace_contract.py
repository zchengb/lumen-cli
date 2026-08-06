from __future__ import annotations

from pathlib import Path

MANAGED_VERSION = "4"
_MANAGED_START = f"<!-- LUMEN MANAGED START version={MANAGED_VERSION} -->"
_MANAGED_END = "<!-- LUMEN MANAGED END -->"
_MANAGED_START_PREFIX = "<!-- LUMEN MANAGED START"


def _managed_block(project_slug: str) -> str:
    slug = project_slug or "project"
    return (
        f"{_MANAGED_START}\n"
        f"## Project\n{slug}\n\n"
        f"## Layout\n"
        f"- config/\n"
        f"- results/\n"
        f"- risk/risk.sqlite3\n"
        f"- state/\n"
        f"- logs/\n\n"
        f"## Finding Lifecycle\n"
        f"- Progress report: inspect, propose Mark Remediated / Verify, no write without confirmation\n"
        f"- Explicit resolve: execute resolve CLI once → Resolved · User confirmed\n"
        f"- Resolve and verify: owner resolve then real Verification Scan\n"
        f"- Verification clean → Resolved · Verified clean\n"
        f"- Verification failed after Resolved → Reopened · Verification failed\n"
        f"- Ordinary incremental miss → not_observed (not Verified clean)\n\n"
        f"## Status Vocabulary\n"
        f"- Open\n"
        f"- Reopened\n"
        f"- Ignored\n"
        f"- Remediated · Pending verification\n"
        f"- Resolved · User confirmed\n"
        f"- Resolved · Verified clean\n"
        f"- Verification failed · Open\n"
        f"- Reopened · Verification failed\n\n"
        f"## Resolution Authority\n"
        f"- Owner may explicitly resolve when project policy allows\n"
        f"- High / Reopened / Security may require verification or policy override\n"
        f"- Policy decisions come from project config, not personal preference\n\n"
        f"## Risk commands\n"
        f"- lumen risk recent --project {slug} --days 7 --json\n"
        f"- lumen risk unresolved --project {slug} --json\n"
        f"- lumen risk top --project {slug} --limit 5 --json\n"
        f"- lumen risk finding show <id> --json\n"
        f"- lumen risk finding links <id> --json\n"
        f"- lumen risk finding verification-status <id> --json\n"
        f"- lumen risk finding mark-remediated <id> --actor <user> --reason <text> "
        f"--source-message-id <mid> --trace-id <tid> --json\n"
        f"- lumen risk finding resolve <id> --basis user_confirmed --actor <user> "
        f"--source-message-id <mid> --trace-id <tid> --json\n"
        f"- lumen risk trend --project {slug} --json\n"
        f"- lumen scan latest --project {slug} --json\n"
        f"- lumen scan verify --finding <id> --actor <user> --source-message-id <mid> "
        f"--trace-id <tid> --json\n\n"
        f"## Verification Policy\n"
        f"- Never pass --observed; verification results come from the Verification Runner\n"
        f"- scan verify creates a Verification Request and a real/dry verification scan receipt\n\n"
        f"## Final Response Protocol\n"
        f"- Put the user-facing Feishu answer inside <FINAL_RESPONSE>...</FINAL_RESPONSE>\n"
        f"- Do not include investigation narration outside that envelope\n\n"
        f"## Mutation Confirmation Rule\n"
        f"- Progress reports require confirmation before mark-remediated\n"
        f"- Explicit resolve / resolve-and-verify commands must not ask twice\n"
        f"- Write CLIs must include actor, source-message-id, and trace-id\n\n"
        f"## Engineering rules\n"
        f"- Inspect before modifying.\n"
        f"- Do not invent findings, Jira, PRs, or scan status.\n"
        f"- Never expose secret values in the final response.\n"
        f"- For read-only questions, do not modify files.\n"
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
        return f"# Workspace Guide\n\n{block}"
    return text.rstrip() + "\n\n" + block


def ensure_workspace_contract(*, workspace: Path, project_slug: str) -> Path:
    root = Path(workspace).expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    agents = root / "AGENTS.md"
    current = agents.read_text(encoding="utf-8") if agents.is_file() else ""
    updated = _upsert_managed_block(current, project_slug)
    if updated != current:
        agents.write_text(updated, encoding="utf-8")
    from agents.dylan.permission_policy import write_permission_profile

    write_permission_profile(root)
    return root
