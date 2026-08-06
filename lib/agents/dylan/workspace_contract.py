from __future__ import annotations

from pathlib import Path

MANAGED_VERSION = "3"
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
        f"- Open → user reports fixed → ask before write\n"
        f"- Remediated · Pending verification → Verification Scan\n"
        f"- absent → Resolved · Verified clean\n"
        f"- present → Verification failed · Open\n"
        f"- ordinary incremental miss → not_observed (not Resolved)\n"
        f"- Resolved finding seen again → Reopened\n\n"
        f"## Status Vocabulary\n"
        f"- Open\n"
        f"- Reopened\n"
        f"- Ignored\n"
        f"- Remediated · Pending verification\n"
        f"- Verification failed · Open\n"
        f"- Resolved · Verified clean\n\n"
        f"## Risk commands\n"
        f"- lumen risk recent --project {slug} --days 7 --json\n"
        f"- lumen risk unresolved --project {slug} --json\n"
        f"- lumen risk top --project {slug} --limit 5 --json\n"
        f"- lumen risk finding show <id> --json\n"
        f"- lumen risk finding links <id> --json\n"
        f"- lumen risk finding verification-status <id> --json\n"
        f"- lumen risk finding mark-remediated <id> --actor <user> --reason <text> "
        f"--source-message-id <mid> --trace-id <tid> --json\n"
        f"- lumen risk trend --project {slug} --json\n"
        f"- lumen scan latest --project {slug} --json\n"
        f"- lumen scan verify --finding <id> --observed false|true --json\n\n"
        f"## Mutation Confirmation Rule\n"
        f"- Do not mark remediated or run Verification without explicit user confirmation.\n"
        f"- Confirmation examples: 可以 / yes / mark it and verify / 都做 / 跑一下.\n"
        f"- Never provide a direct resolve write; Resolved comes from Verification only.\n\n"
        f"## Proactive Follow-up Rule\n"
        f"- When the user reports a fix, celebrate briefly, then propose Remediated · Pending verification "
        f"and a Verification Scan.\n\n"
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
