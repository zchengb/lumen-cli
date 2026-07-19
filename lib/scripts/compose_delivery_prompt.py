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
from visual_delivery import visual_contract


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


def compose_snippets(context: StoryContext | None = None) -> str:
    prompts_dir = delivery_prompts_dir(context)
    manifest_path = prompts_dir / "manifest.json"
    if not manifest_path.is_file():
        raise FileNotFoundError(f"Delivery prompt manifest not found: {manifest_path}")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    snippets = manifest.get("snippets", [])
    if context is not None and visual_contract(context.technical_plan) is not None and "05-visual-delivery.md" not in snippets:
        snippets = [*snippets, "05-visual-delivery.md"]
    parts: list[str] = []
    for name in snippets:
        if name == "05-visual-delivery.md" and (context is None or visual_contract(context.technical_plan) is None):
            continue
        snippet_path = prompts_dir / name
        if name == "05-visual-delivery.md" and not snippet_path.is_file():
            snippet_path = lumen_home() / "templates" / "prompts" / "delivery" / name
        if not snippet_path.is_file():
            raise FileNotFoundError(f"Delivery prompt snippet not found: {snippet_path}")
        parts.append(snippet_path.read_text(encoding="utf-8").strip())
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


def visual_iteration_block(context: StoryContext) -> str:
    if visual_contract(context.technical_plan) is None:
        return ""
    return f"""# Visual Iteration

When visual feedback is useful, operate the device and request a visual session on demand. Lumen bootstraps the runtime only for that request; inspect the resulting screenshot and evidence yourself, then make the smallest correction. The final delivery verification still runs the complete matrix.
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
    prompt = compose_snippets(context) + "\n\n" + render_context_block(context) + "\n\n" + visual_iteration_block(context) + "\n\n" + figma_mcp_block(context)
    if remediation:
        prompt += "\n\n" + remediation_context_block(context)
    return prompt + "\n"


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
