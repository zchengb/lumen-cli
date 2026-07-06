# __PROJECT_NAME__

This repository stores lightweight Lumen Delivery documents for business exploration and technical planning.

## Structure

```text
stories/
  <JIRA-KEY>-<slug>/
    story.md
    plan.md
    metadata.json
    assets/
standards/
  business-loop.md
  technical-loop.md
templates/
  story.md
  plan.md
notifications/
  feishu-delivery-card-template.json
```

## Principles

- Humans mainly read and edit `story.md` and `plan.md`.
- Status lives in `metadata.json`.
- Images live in each story's `assets/` folder.
- Business changes are reviewed through Git diff.
- Runtime evidence lives in Lumen logs, not in this docs repo by default.
