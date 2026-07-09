# Delivery Loop Design

Date: 2026-07-08

## Goal

Complete the Lumen delivery workflow with CLI-driven implementation of approved technical plans.

## Three-loop model

```text
Business Loop   -> story.md            (Codex / Cursor)
Technical Loop  -> technical-plan.md    (Codex / Cursor)
Development Loop -> code + PR          (lumen delivery run)
```

## Workspace layout

The docs repository is the workspace root. Code repositories live under `repos/`:

```text
<docs-repo>/
  repos/
    xxxx-backend/
  stories/
  .lumen/config/workspace.json
```

Configured in `<docs-repo>/.lumen/config/workspace.json`.

## Coding guideline location

The coding guideline lives in the Lumen CLI install:

```text
~/.lumen/lib/standards/coding-guideline.md
```

`lumen delivery run` injects it into the delivery agent prompt. It is not copied into the docs repository.

## CLI orchestration

`lumen delivery run <docs-dir> [--story <slug>] [--dry-run]`

Pipeline:

1. `prepare_delivery_run.py` — gates, metadata, feature worktrees
2. `compose_delivery_prompt.py` — story, plan, coding guideline, workspace context
3. `run-delivery.sh` — Cursor agent execution
4. `render-delivery-and-notify.py` — metadata, JIRA, Feishu

## Non-goals

- No `standards/repos/` overrides in the docs repo
- No automatic merge
- Technical planning still runs interactively in Codex / Cursor
