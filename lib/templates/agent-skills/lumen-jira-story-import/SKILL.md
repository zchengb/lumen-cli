---
name: lumen-jira-story-import
description: Use only when explicitly asked to import an existing Jira Story in a Lumen workspace. Run the Lumen import command, then help review the resulting business Story; do not modify application source code, start the workflow implicitly, or overwrite local Story edits.
---

<!-- Lumen managed: agent-skill -->

# Lumen Jira Story Import

Run:

```bash
lumen story import <JIRA-KEY> [workspace-dir]
```

The command creates the linked Story folder on first use. On later use it reads Jira again and updates the auditable snapshot without overwriting `story.md`.

When `metadata.json.jiraSyncStatus` is `changed`, compare the newest Jira snapshot with `story.md`, ask the user how to reconcile it, then update the Story only after confirmation. Do not produce a technical plan while the Story is changed.

After importing, summarize missing business decisions and offer the Business Loop. Do not update Jira from this skill and do not modify application source code.
