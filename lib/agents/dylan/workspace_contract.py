from __future__ import annotations

from pathlib import Path


def ensure_workspace_contract(*, workspace: Path, project_slug: str) -> Path:
    root = Path(workspace).expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    agents = root / "AGENTS.md"
    if not agents.is_file():
        agents.write_text(
            (
                f"# Workspace Guide\n\n"
                f"## Project\n{project_slug or root.name}\n\n"
                f"## Layout\n"
                f"- config/\n"
                f"- results/\n"
                f"- risk/risk.sqlite3\n"
                f"- state/\n"
                f"- logs/\n\n"
                f"## Risk commands\n"
                f"- lumen risk recent --project {project_slug} --days 7 --json\n"
                f"- lumen risk unresolved --project {project_slug} --json\n"
                f"- lumen risk top --project {project_slug} --limit 5 --json\n"
                f"- lumen risk finding show <id> --json\n"
                f"- lumen risk finding links <id> --json\n"
                f"- lumen risk trend --project {project_slug} --json\n"
                f"- lumen scan latest --project {project_slug} --json\n\n"
                f"## Engineering rules\n"
                f"- Inspect before modifying.\n"
                f"- Do not invent findings, Jira, PRs, or scan status.\n"
                f"- Never expose secret values in the final response.\n"
                f"- For read-only questions, do not modify files.\n"
            ),
            encoding="utf-8",
        )
    from agents.dylan.permission_policy import write_permission_profile

    write_permission_profile(root)
    return root
