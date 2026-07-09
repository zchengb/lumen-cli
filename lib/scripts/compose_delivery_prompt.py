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
)


def lumen_home() -> Path:
    return Path(__file__).resolve().parents[1]


def coding_guideline_path() -> Path:
    return lumen_home() / "standards" / "coding-guideline.md"


def delivery_prompts_dir() -> Path:
    return lumen_home() / "templates" / "delivery" / "prompts"


def compose_snippets() -> str:
    prompts_dir = delivery_prompts_dir()
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
    guideline = coding_guideline_path()
    guideline_text = guideline.read_text(encoding="utf-8") if guideline.is_file() else ""
    story_text = context.story_md.read_text(encoding="utf-8") if context.story_md.is_file() else ""
    plan_text = context.technical_plan.read_text(encoding="utf-8") if context.technical_plan.is_file() else ""
    metadata_text = json.dumps(context.metadata, indent=2, ensure_ascii=False)

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

## Lumen Coding Guideline

{guideline_text}
"""


def compose_delivery_prompt(context: StoryContext) -> str:
    return compose_snippets() + "\n\n" + render_context_block(context) + "\n"


def main() -> int:
    if len(sys.argv) not in {2, 3}:
        print("Usage: compose_delivery_prompt.py <docs-dir> [story-ref]", file=sys.stderr)
        return 1
    docs_dir = Path(sys.argv[1])
    story_ref = sys.argv[2] if len(sys.argv) == 3 else ""
    try:
        context = load_story_context(docs_dir, story_ref)
        print(compose_delivery_prompt(context), end="")
    except (OSError, ValueError, FileNotFoundError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
