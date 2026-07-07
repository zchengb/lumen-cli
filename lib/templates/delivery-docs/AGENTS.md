# __PROJECT_NAME__ Agent Guide

This repository is the source of truth for business stories and technical delivery plans.

## Repository Model

Each story is intentionally lightweight:

- `story.md` - business truth, maintained by humans with Agent help
- `technical-plan.md` - technical delivery plan, maintained during the technical loop
- `metadata.json` - status and machine-readable index, maintained by Lumen or explicit status commands
- `assets/` - images referenced by `story.md` or `technical-plan.md`

Do not create extra decision, question, change, refactor, or evidence files unless explicitly requested. Git diff, commits, PRs, JIRA comments, and Lumen logs are the default audit trail.

## Business Loop

The Business Loop may run in Codex, Cursor, or another compatible Agent. The tool is not important; the contract is.

The Business Loop turns unclear business input into a clear `story.md`. During the Business Loop, the Agent should:

1. Read the existing `story.md` and `metadata.json`.
2. Inspect relevant repository context if available.
3. Ask focused questions for unclear business points.
4. Record clarified question-answer pairs in `story.md` under `Clarifications`.
5. Update `Background and User Story`, `Acceptance Criteria`, `Business Rules`, and `Out of Scope` as needed.
6. Reference images from `assets/` using relative Markdown links.
7. Never modify application code.
8. When the story becomes clear, ask whether to publish it to JIRA as a Story.

## JIRA Publication Rule

Docs are created first. JIRA is created or bound only after the business story is clear enough for confirmation.

When `businessStatus` is ready or the user confirms the story is ready, the Agent should ask one explicit question:

```text
The story looks business-ready. Should I create or bind a JIRA Story for it?

A. Create a new JIRA Story (Recommended)
B. Bind to an existing JIRA issue
C. Not now; keep it in docs only
D. Other: describe what to do
```

Rules:

- Do not create a JIRA issue without explicit user confirmation.
- Prefer Atlassian/JIRA MCP when available in the active Agent environment.
- If Atlassian/JIRA MCP is unavailable, use `twg-cli` / `twg jira` as the fallback.
- Before creating, discover required fields for the target JIRA project and Story issue type.
- Create issue type `Story` unless the user chooses another type.
- Use `story.md` as the source for summary and description; do not paste raw chat history.
- After creation or binding, update `metadata.json.jiraKey`, `metadata.json.jiraUrl`, `metadata.json.jiraIssueType`, and `metadata.json.jiraPublishedAt`.
- Add a short JIRA comment linking back to this docs story when supported.
- Verify the created or bound JIRA issue by reading it back and report the key and URL.

## Progressive Questioning Rule

During the Business Loop, ask clarification questions progressively.

Rules:

- Ask only one question at a time unless the user explicitly asks for a full checklist.
- Ask the highest-impact unresolved question first.
- Prefer interactive Q&A when the environment supports it.
- Each question should include 2-4 concrete options.
- Mark one option as `Recommended` when reasonable.
- Always allow the user to provide a custom answer.
- Do not use blank placeholders as the primary interaction style.
- After the user answers, update `story.md` under `Clarifications`.
- Then decide the next best question based on the updated story.

If the tool supports an interactive question UI, use it. If not, present a short text menu like:

```text
Please choose one option, or type your own answer:
A. System configuration (Recommended)
B. Admin page configuration
C. Not decided yet; mark the story blocked
D. Other: describe your answer
```

## Story Rules

`story.md` must be business-readable. It should contain only:

- Background and User Story
- Acceptance Criteria
- Business Rules
- Clarifications
- Out of Scope

Do not put delivery status in `story.md`. Do not put technical implementation details in `story.md`. Do not put raw chat history in `story.md`.

If an edge case matters, express it as an Acceptance Criterion or Business Rule. Do not maintain a separate Edge Cases section by default.

## Metadata Rules

`metadata.json` is the status file. It contains:

- `storyId`
- `jiraKey` / `jiraUrl` / `jiraIssueType`
- `businessStatus`
- `technicalStatus`
- `deliveryStatus`
- `linkedRepos`
- `updatedAt`
- optional `logs` references

Humans should normally change status through Lumen commands, not by hand-editing `metadata.json`.

## Business Status

Valid `businessStatus` values:

- `draft` - initial story exists but is incomplete
- `clarifying` - Agent is asking questions and refining scope
- `ready` - story is clear enough for technical planning
- `blocked` - story cannot proceed because required business input or external dependency is missing
- `changed` - story changed after technical planning started or after plan approval

## Technical Loop

The Technical Loop reads `story.md` and produces `technical-plan.md`. Do not implement code until:

- `metadata.json.businessStatus` is `ready`
- `technical-plan.md` exists
- `metadata.json.technicalStatus` is `approved`

## Change Handling

Business changes are reflected directly in `story.md` and reviewed through Git diff. Do not create separate CR files by default.

Refactors are discussed in the development tool and reviewed through code diff or PR description. Do not create separate RF files by default. If a refactor changes architecture or public API behavior, record it in `technical-plan.md` under `Refactoring Notes`.

## Agent Response Format

Every Agent response should include:

### Evidence
Files or repository facts used.

### Clarifications
Questions asked and answers recorded.

### Changes Made
Files changed.

### Risks
Remaining ambiguity or risk.

### Next Step
Recommended next action.
