---
name: lumen-jira-story-import
description: Use when explicitly asked to import an existing Jira Story in a Lumen workspace, or as the required Jira preflight for a Business or Technical Loop. Read Jira into an auditable snapshot without overwriting local Story edits or application source code.
---

<!-- Lumen managed: agent-skill -->

# Lumen Jira Story Import

Run the installed internal helper, using the workspace directory that contains `stories/` and `lumen/`:

```bash
python3 "${LUMEN_HOME:-$HOME/.lumen}/lib/scripts/import_jira_story.py" "<workspace-root>" <JIRA-KEY>
```

The command creates the linked Story folder on first use. On later use it reads Jira again and updates the auditable snapshot without overwriting `story.md`.

When `metadata.json.jiraSyncStatus` is `changed`, compare the newest Jira snapshot with `story.md`, ask the user how to reconcile it, then update the Story only after confirmation. After reconciling, set `jiraSnapshotHash` to `jiraLatestSnapshotHash` and `jiraSyncStatus` to `synced`. Do not overwrite the local Story or start a Technical Loop implicitly.

After importing, summarize missing business decisions and offer the Business Loop. Do not update Jira from this skill and do not modify application source code.
