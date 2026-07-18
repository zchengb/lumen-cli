<!-- Lumen managed: agent-skill -->

# Business Loop workflow

Preflight: safely refresh the docs and relevant clean repositories; stop for local changes or non-fast-forward history. For a Story with `metadata.json.jiraKey`, invoke `$lumen-jira-story-import` before reading requirements. If `jiraSyncStatus` is `changed`, compare the current Jira snapshot with `story.md`, ask the user one reconciliation question at a time, then update `story.md` only after confirmation. Set `jiraSnapshotHash` to `jiraLatestSnapshotHash` and `jiraSyncStatus` to `synced` with the confirmed Story update. Never change application source code.

For a Topic, inspect existing stories and repository context, ask one highest-impact business question at a time, and record confirmed answers. Propose Story candidates only when understood. Split by independently understandable and independently verifiable business outcomes: one primary goal, observable outcome, independent verification and delivery (or a stated dependency), explicit boundary, no duplicated business rule, and no unrelated actors/workflows. Split by business outcome, not frontend/backend/database layers unless those separately deliver an outcome. Present title, business goal, acceptance boundary, dependencies, and excluded scope. Do not create folders until the user confirms the split.

For a Story, update only business material: Background, Acceptance Criteria, Business Rules, Clarifications, and Out of Scope. Ask one focused question at a time. Before changing `metadata.json.businessStatus` to `ready`, confirm there is no important TBD or unresolved high-impact question and present: goal, primary actor, key rules, AC summary, out of scope, and non-blocking assumptions. Ask exactly:

```text
A. Confirm this Story and mark it ready
B. Continue refining
C. Keep it as draft
```

Only A or equally explicit natural-language confirmation may set `businessStatus` to `ready`. Then offer the existing explicit Jira create/bind step. Do not create Jira issues without confirmation.
