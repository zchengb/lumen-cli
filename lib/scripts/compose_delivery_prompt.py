#!/usr/bin/env python3
"""Compose the Lumen delivery agent prompt for an approved technical plan."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from delivery_workspace import (
    StoryContext,
    delivery_result_path,
    load_story_context,
    read_json,
    workspace_lumen_dir,
)
from visual_delivery import repo_config_entry, repos_config, resolve_visual_auth_credential, visual_contract


def lumen_home() -> Path:
    return Path(__file__).resolve().parents[1]


def coding_guideline_path(context: StoryContext | None = None) -> Path:
    if context is not None:
        workspace_guideline = workspace_lumen_dir(context.workspace_root) / "prompts" / "delivery" / "coding-guideline.md"
        if workspace_guideline.is_file():
            return workspace_guideline
    return lumen_home() / "standards" / "coding-guideline.md"


def delivery_prompts_dir(context: StoryContext | None = None) -> Path:
    if context is not None:
        workspace_prompts = workspace_lumen_dir(context.workspace_root) / "prompts" / "delivery"
        if (workspace_prompts / "manifest.json").is_file():
            return workspace_prompts
    return lumen_home() / "templates" / "prompts" / "delivery"


def load_manifest(prompts_dir: Path) -> dict:
    manifest_path = prompts_dir / "manifest.json"
    if not manifest_path.is_file():
        raise FileNotFoundError(f"Delivery prompt manifest not found: {manifest_path}")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if not isinstance(manifest, dict):
        raise ValueError(f"Invalid delivery prompt manifest: {manifest_path}")
    return manifest


def read_snippet(prompts_dir: Path, name: str, context: StoryContext | None) -> str:
    snippet_path = prompts_dir / name
    if name == "05-visual-delivery.md" and not snippet_path.is_file():
        snippet_path = lumen_home() / "templates" / "prompts" / "delivery" / name
    if not snippet_path.is_file():
        raise FileNotFoundError(f"Delivery prompt snippet not found: {snippet_path}")
    return snippet_path.read_text(encoding="utf-8").strip()


def catalog_when_applies(when: str, context: StoryContext | None) -> bool:
    normalized = str(when or "always").strip().casefold()
    if normalized in {"", "always"}:
        return True
    if normalized == "visual_contract":
        return context is not None and visual_contract(context.technical_plan) is not None
    return True


def render_prompt_catalog(prompts_dir: Path, manifest: dict, context: StoryContext | None) -> str:
    entries = manifest.get("catalog")
    if not isinstance(entries, list):
        return ""
    rows: list[str] = []
    for entry in entries:
        if isinstance(entry, str):
            file_name = entry
            title = Path(entry).stem
            description = "Reference delivery snippet."
            when = "always"
        elif isinstance(entry, dict):
            file_name = str(entry.get("file", "")).strip()
            title = str(entry.get("title") or Path(file_name).stem).strip()
            description = str(entry.get("description", "")).strip() or "Reference delivery snippet."
            when = str(entry.get("when", "always")).strip()
        else:
            continue
        if not file_name or not catalog_when_applies(when, context):
            continue
        snippet_path = prompts_dir / file_name
        if not snippet_path.is_file() and file_name == "05-visual-delivery.md":
            snippet_path = lumen_home() / "templates" / "prompts" / "delivery" / file_name
        if not snippet_path.is_file():
            raise FileNotFoundError(f"Delivery prompt snippet not found: {snippet_path}")
        priority = "REQUIRED" if when in {"visual_contract", "required"} else "Read when needed"
        rows.append(f"| `{snippet_path}` | {title} | {priority} | {description} |")
    if not rows:
        return ""
    return (
        "# Delivery Prompt Catalog\n\n"
        "Lumen does not inline every reference snippet. Read the files below from disk when you need them.\n\n"
        "| Path | Snippet | When | Summary |\n"
        "|---|---|---|---|\n"
        + "\n".join(rows)
    )


def compose_snippets(context: StoryContext | None = None) -> str:
    prompts_dir = delivery_prompts_dir(context)
    manifest = load_manifest(prompts_dir)
    catalog = manifest.get("catalog")
    if isinstance(catalog, list):
        parts: list[str] = []
        for name in manifest.get("inline", ["01-role.md"]):
            parts.append(read_snippet(prompts_dir, str(name), context))
        catalog_block = render_prompt_catalog(prompts_dir, manifest, context)
        if catalog_block:
            parts.append(catalog_block)
        return "\n\n".join(parts)

    snippets = manifest.get("snippets", [])
    if context is not None and visual_contract(context.technical_plan) is not None and "05-visual-delivery.md" not in snippets:
        snippets = [*snippets, "05-visual-delivery.md"]
    parts = []
    for name in snippets:
        if name == "05-visual-delivery.md" and (context is None or visual_contract(context.technical_plan) is None):
            continue
        parts.append(read_snippet(prompts_dir, str(name), context))
    return "\n\n".join(parts)


def render_context_block(context: StoryContext) -> str:
    repo_lines = []
    for repo in context.repos:
        repo_lines.append(
            f"- {repo.name}: source={repo.path} worktree={repo.worktree_path} branch={context.branch_name}"
        )
    repos_text = "\n".join(repo_lines)
    guideline = coding_guideline_path(context)
    guideline_text = guideline.read_text(encoding="utf-8") if guideline.is_file() else ""
    story_text = context.story_md.read_text(encoding="utf-8") if context.story_md.is_file() else ""
    plan_text = context.technical_plan.read_text(encoding="utf-8") if context.technical_plan.is_file() else ""
    metadata_text = json.dumps(context.metadata, indent=2, ensure_ascii=False)
    jira_context = workspace_lumen_dir(context.workspace_root) / "context" / context.story_dir.name / "jira-context.json"
    jira_context_text = jira_context.read_text(encoding="utf-8") if jira_context.is_file() else "No JIRA context snapshot was captured."

    return f"""# Delivery Context

Docs repository: {context.docs_dir}
Workspace root: {context.workspace_root}
Story directory: {context.story_dir}
Feature branch: {context.branch_name}
Delivery result file: {delivery_result_path(context.workspace_root)}

## Linked Repositories

{repos_text}

## metadata.json

```json
{metadata_text}
```

## story.md

{story_text}

## technical-plan.md

{plan_text}

## JIRA Context Snapshot

{jira_context_text}

## Lumen Coding Guideline

{guideline_text}
"""


def repository_delivery_policies_block(context: StoryContext) -> str:
    config = read_json(repos_config(context.workspace_root), {"repositories": []})
    lines: list[str] = []
    for repo in context.repos:
        entry = repo_config_entry(config, repo.name)
        if not entry or entry.get("generate_tests") is not False:
            continue
        lines.append(
            f"- `{repo.name}`: do not create or update unit tests or integration tests. "
            "Implement production code only for this repository."
        )
    if not lines:
        return ""
    return (
        "# Repository Delivery Policies\n\n"
        "These workspace rules override the generic testing guidance for the listed repositories.\n\n"
        + "\n".join(lines)
    )


def agent_quick_login_block(context: StoryContext) -> str:
    config = read_json(repos_config(context.workspace_root), {"repositories": []})
    sections: list[str] = []
    for repo in context.repos:
        entry = repo_config_entry(config, repo.name)
        if not entry or not isinstance(entry.get("runtime"), dict):
            continue
        runtime = entry["runtime"]
        platform = str(runtime.get("platform", "")).strip()
        lines = [f"### {repo.name}"]
        if runtime.get("start_command"):
            lines.append(f"- Start: `{runtime['start_command']}`")
        if runtime.get("metro_command"):
            lines.append(f"- Metro: `{runtime['metro_command']}`")
        if runtime.get("base_url"):
            lines.append(f"- Base URL: `{runtime['base_url']}`")
        login_path = str(runtime.get("auth_login_path", "")).strip()
        login_field = str(runtime.get("auth_login_field", "wiw")).strip() or "wiw"
        credential = resolve_visual_auth_credential(runtime, {})
        if platform == "web" and login_path:
            base = str(runtime.get("base_url", "")).rstrip("/")
            lines.append(
                f"- Quick login: `POST {base}{login_path}` with JSON body `{{\"{login_field}\": \"<credential>\"}}`"
            )
            if credential:
                lines.append(f"- Credential (`{login_field}`): `{credential}`")
            else:
                lines.append(
                    f"- Credential: not set; run `lumen config set-visual-auth {repo.name} <value>` before delivery"
                )
        elif credential:
            lines.append(f"- Auth credential: `{credential}`")
        notes = str(runtime.get("agent_auth_notes", "")).strip()
        if notes:
            lines.append(f"- Notes: {notes}")
        if len(lines) > 1:
            sections.append("\n".join(lines))
    if not sections:
        return ""
    return "# Quick Login\n\nUse these workspace auth instructions before inspecting rendered UI. Automated Playwright login is disabled; authenticate yourself with the steps below.\n\n" + "\n\n".join(sections)


def visual_state_matrix_block(context: StoryContext) -> str:
    contract = visual_contract(context.technical_plan)
    if contract is None:
        return ""
    lines = [
        "# Visual State Matrix (verify every row)",
        "",
        "Complete rendered visual QA for each state before handoff. Read `05-visual-delivery.md` from the Delivery Prompt Catalog and follow its checklist.",
        "",
        "| Screen | State | Fixture / route | Reference | Compare |",
        "|---|---|---|---|---|",
    ]
    for scenario in contract.get("scenarios", []):
        lines.append(
            "| {screen} | {state} | {fixture} | {reference} | {comparison} ≤ {threshold} |".format(
                screen=scenario.get("screen", ""),
                state=scenario.get("state", ""),
                fixture=scenario.get("fixture", ""),
                reference=scenario.get("reference", ""),
                comparison=scenario.get("comparison", "Full content area"),
                threshold=scenario.get("maximum_difference", "approved design"),
            )
        )
    return "\n".join(lines)


def visual_iteration_block(context: StoryContext) -> str:
    if visual_contract(context.technical_plan) is None:
        return ""
    return """# Visual Iteration

Visual QA is agent-owned. Start the app, authenticate with `# Quick Login` when present, inspect each Visual State Matrix row in a real browser or device, and fix visual defects before handoff. Lumen does not run automated screenshot comparison during delivery verification.
"""


def figma_mcp_block(context: StoryContext) -> str:
    contract = visual_contract(context.technical_plan)
    execution = context.delivery_config.get("execution", {}) if isinstance(context.delivery_config, dict) else {}
    if not isinstance(execution, dict) or execution.get("approve_mcps") is not True or contract is None:
        return ""
    references = [
        row for row in contract.get("references", [])
        if "figma.com" in str(row.get("Figma file", "")).lower() and str(row.get("Node ID", "")).strip()
    ]
    if not references:
        return ""
    sources = "\n".join(
        f"- {row.get('Screen', 'Design')}: {row.get('Figma file')} (node {row.get('Node ID')}); "
        f"committed snapshot: {row.get('Design context snapshot', 'not provided')}"
        for row in references
    )
    return f"""# Approved Figma Design Context

Figma MCP access is explicitly approved for this delivery. If the `figma` MCP server is configured and callable, read the listed nodes before implementing their mapped UI. Use its live design context to resolve implementation details; do not modify the design.

{sources}

If Figma MCP is unavailable or a node cannot be read, continue from the approved committed design-context snapshot and reference image in the Visual Delivery Contract. Do not treat a local Cursor GUI plugin as evidence that MCP is available in this agent session.
"""


def delivery_remediation_path(result_path: Path) -> Path:
    return result_path.with_name("delivery-remediation.json")


def failed_verification_evidence(payload: dict, result_path: Path) -> list[dict]:
    remediation = payload.get("remediation") if isinstance(payload.get("remediation"), dict) else {}
    sidecar = read_json(delivery_remediation_path(result_path), {})
    if isinstance(sidecar, dict) and sidecar:
        remediation = sidecar

    attempt_no = remediation.get("attempt")
    attempts = remediation.get("attempts") if isinstance(remediation.get("attempts"), list) else []
    if attempt_no is not None:
        for entry in reversed(attempts):
            if not isinstance(entry, dict) or entry.get("attempt") != attempt_no:
                continue
            failed = entry.get("failed_verification")
            if isinstance(failed, list):
                return [item for item in failed if isinstance(item, dict)]

    if attempts:
        last = attempts[-1]
        if isinstance(last, dict):
            failed = last.get("failed_verification")
            if isinstance(failed, list):
                return [item for item in failed if isinstance(item, dict)]

    return [
        item
        for item in payload.get("verification_results", [])
        if isinstance(item, dict) and item.get("status") == "failed"
    ]


def remediation_context_block(context: StoryContext) -> str:
    result_path = delivery_result_path(context.workspace_root)
    payload: dict = {}
    if result_path.is_file():
        try:
            loaded = json.loads(result_path.read_text(encoding="utf-8"))
            if isinstance(loaded, dict):
                payload = loaded
        except (OSError, json.JSONDecodeError):
            pass
    remediation = payload.get("remediation") if isinstance(payload.get("remediation"), dict) else {}
    sidecar = read_json(delivery_remediation_path(result_path), {})
    if isinstance(sidecar, dict) and sidecar:
        remediation = sidecar
    failed = failed_verification_evidence(payload, result_path)
    evidence = json.dumps(failed, indent=2, ensure_ascii=False)
    return f"""# Verification Remediation Context

This is remediation attempt {remediation.get("attempt", "?")} of {remediation.get("max_attempts", "?")}.

The previous implementation already exists in the feature worktrees. Do not restart the Story or broaden its scope. Diagnose the failed mandatory checks below, make the smallest correction that addresses their cause, and leave unrelated files untouched.

## Failed Verification Evidence

```json
{evidence}
```
"""


def compose_delivery_prompt(context: StoryContext, remediation: bool = False) -> str:
    parts = [
        compose_snippets(context),
        render_context_block(context),
        repository_delivery_policies_block(context),
        agent_quick_login_block(context),
        visual_state_matrix_block(context),
        visual_iteration_block(context),
        figma_mcp_block(context),
    ]
    if remediation:
        parts.append(remediation_context_block(context))
    return "\n\n".join(part for part in parts if part) + "\n"


def main() -> int:
    args = sys.argv[1:]
    remediation = False
    if "--remediation" in args:
        remediation = True
        args.remove("--remediation")
    if len(args) not in {1, 2}:
        print("Usage: compose_delivery_prompt.py <docs-dir> [story-ref] [--remediation]", file=sys.stderr)
        return 1
    docs_dir = Path(args[0])
    story_ref = args[1] if len(args) == 2 else ""
    try:
        context = load_story_context(docs_dir, story_ref)
        print(compose_delivery_prompt(context, remediation=remediation), end="")
    except (OSError, ValueError, FileNotFoundError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
