# __PROJECT_NAME__

This repository stores lightweight Lumen Delivery documents for business exploration, technical planning, and guided implementation.

## Delivery Loops

| Loop | Standard | Primary output | Executor |
|---|---|---|---|
| Business Loop | `standards/business-loop.md` | `topics/<slug>.md` or `story.md` | Codex / Cursor / Agent |
| Technical Loop | `standards/technical-loop.md` | `technical-plan.md` | Codex / Cursor / Agent |
| Development Loop | `standards/development-loop.md` | code + PR | `lumen delivery run` |

## Workspace Layout

```text
<docs-repo>/
  .lumen/
    config/
      workspace.json
      delivery.json
    worktrees/<repository>/
    results/delivery-result.json
    logs/delivery/
  repos/
    <service-a>/
    <service-b>/
  topics/
  stories/
```

Configure repositories in `<docs-repo>/.lumen/config/workspace.json`. Cloned code lives under `repos/` and is ignored by the docs repository git history.

## Structure

```text
topics/
  <slug>.md              # broad discovery before story split
stories/
  <slug>/                  # before JIRA exists
  <JIRA-KEY>-<slug>/       # after JIRA is created or bound
    story.md
    technical-plan.md
    metadata.json
    assets/
standards/
  business-loop.md
  technical-loop.md
  development-loop.md
templates/
  topic.md
  story.md
  technical-plan.md
notifications/
  feishu-delivery-card-template.json
```

## Principles

- Humans mainly read and edit `story.md` and `technical-plan.md`.
- Status lives in `metadata.json`.
- Images live in each story's `assets/` folder.
- Business changes are reviewed through Git diff.
- Story folders use a plain business slug before JIRA publication and `<JIRA-KEY>-<slug>` after JIRA is created or bound.
- Technical plans must be detailed enough for `lumen delivery run` to implement without guessing.
- Coding standards come from the Lumen CLI install, not from this docs repo.
- Delivery runtime state lives under `<docs-repo>/.lumen/`.
- Code repositories live under `<docs-repo>/repos/` and are gitignored in the docs project.

## Typical Flow

1. Business Loop starts from a broad `topics/<slug>.md` or directly clarifies `story.md`.
2. If starting from a topic, Business Loop proposes candidate stories and waits for user confirmation before creating story folders.
3. Technical Loop produces and approves `technical-plan.md`.
4. `lumen delivery run <docs-dir> --story <JIRA-KEY-or-slug>` implements the approved plan.
5. Optional JIRA comment and PR complete the delivery trail.
