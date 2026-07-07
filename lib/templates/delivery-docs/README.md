# __PROJECT_NAME__

This repository stores lightweight Lumen Delivery documents for business exploration and technical planning.

## Structure

```text
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
templates/
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
- Runtime evidence lives in Lumen logs, not in this docs repo by default.
