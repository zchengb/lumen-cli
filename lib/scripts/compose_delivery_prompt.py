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
    workspace_lumen_dir,
)


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
    parts: list[str] = []
    for name in snippets:
        snippet_path = prompts_dir / name
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
    failed = [
        item
        for item in payload.get("verification_results", [])
        if isinstance(item, dict) and item.get("status") == "failed"
    ]
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
    prompt = compose_snippets(context) + "\n\n" + render_context_block(context)
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
