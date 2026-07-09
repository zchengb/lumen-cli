# __PROJECT_NAME__ Agent Guide

This repository is the source of truth for business stories and technical delivery plans. It is also the delivery workspace root.

## Repository Model

Business stories live under `stories/`. Linked code repositories live under `repos/` and are gitignored by this docs project.

Each story is intentionally lightweight:

- `story.md` - business truth, maintained by humans with Agent help
- `technical-plan.md` - technical delivery plan, maintained during the technical loop
- `metadata.json` - status and machine-readable index, maintained by Lumen or explicit status commands
- `assets/` - images referenced by `story.md` or `technical-plan.md`

Do not create extra decision, question, change, refactor, or evidence files unless explicitly requested. Git diff, commits, PRs, JIRA comments, and Lumen logs are the default audit trail.

## Business Loop

The Business Loop may run in Codex, Cursor, or another compatible Agent. The tool is not important; the contract is.

The Business Loop turns unclear business input into a clear `story.md`. Before starting the Business Loop, the Agent should refresh the workspace context:

- Pull this docs repository first.
- Pull every configured code repository under `repos/` that may be used as context.
- Use safe git sync: check `git status` first, then run `git pull --ff-only` only when the repo has no local uncommitted changes.
- If any repo has local uncommitted changes or cannot fast-forward, stop and ask the user how to proceed. Do not stash, reset, checkout, or overwrite user work automatically.

During the Business Loop, the Agent should:

1. Read the existing `story.md` and `metadata.json`.
2. Inspect relevant repository context if available.
3. Ask focused questions for unclear business points.
4. Record clarified question-answer pairs in `story.md` under `Clarifications`.
5. Update `Background`, `Acceptance Criteria`, `Business Rules`, and `Out of Scope` as needed.
6. Place image files under `assets/` when needed, and reference them inline in the relevant section using relative Markdown links.
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
- Write the JIRA description in a standard Agile Story format.
- After creation or binding, update `metadata.json.jiraKey`, `metadata.json.jiraUrl`, `metadata.json.jiraIssueType`, and `metadata.json.jiraPublishedAt`.
- Also update `jiraUrl` in the YAML front matter of `story.md`.
- Before a JIRA issue exists, do not prefix the `story.md` H1 or story folder name with a local story id that looks like a JIRA key. Use `# <Story Title>` for the H1 and a plain business slug for the folder name when possible.
- After a JIRA issue is created or bound, update the `story.md` H1 to `# <JIRA-KEY> <Story Title>` using the real JIRA key. Rename the story folder to `<JIRA-KEY>-<slug>` when it can be done without overwriting an existing folder.
- Add a short JIRA comment linking back to this docs story when supported.
- Verify the created or bound JIRA issue by reading it back and report the key and URL.

JIRA Story description format:

```markdown
## User Story
As a <user>,
I want <capability>,
so that <business value>.

## Business Context
<short background from story.md>

## Acceptance Criteria
<copy the ACs in Given/When/Then form>

## Business Rules
<copy confirmed business rules>

## Clarifications
<copy only confirmed Q&A that materially affects scope>

## Out of Scope
<copy explicit exclusions>

## Docs
<relative docs path or repository URL when available>
```

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

## Language Rule

Write `story.md` in the primary language of the user's business input by default. Do not force English or any other fixed language. Keep the story internally consistent in one main language unless the user explicitly asks otherwise. Preserve product names, domain terms, JIRA keys, code identifiers, API names, field names, and configuration names in their original form.

When creating or updating a JIRA Story from `story.md`, use the same primary language as `story.md`.

## Story Rules

`story.md` must be business-readable. It should contain only:

- YAML front matter metadata with `title` and `jiraUrl`
- Background
- Acceptance Criteria
- Business Rules
- Clarifications
- Out of Scope

Do not put delivery status in `story.md`. Do not put technical implementation details in `story.md`. Do not put raw chat history in `story.md`.

Title and folder rule: before JIRA publication, the H1 must be `# <Story Title>` without any local story id prefix, and the story folder should not use a fake JIRA-like prefix. After JIRA publication or binding, the H1 may become `# <JIRA-KEY> <Story Title>` and the story folder should become `<JIRA-KEY>-<slug>` using the real JIRA key.

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

The Technical Loop may run in Codex, Cursor, or another compatible Agent. Read `standards/technical-loop.md` for the full contract.

Before starting the Technical Loop, use the same preflight sync rules as the Business Loop.

During the Technical Loop, the Agent should:

1. Read `story.md`, `metadata.json`, and the Lumen coding guideline shipped with the CLI.
2. Inspect impacted repositories and identify real modules, endpoints, tables, and tests.
3. Ask one focused technical question at a time when ambiguity affects design, scope, or verification.
4. Record confirmed technical decisions in `technical-plan.md`.
5. Produce a file-level plan detailed enough for implementation without guessing.
6. Set `technicalStatus` to `ready_for_review` when the plan is complete.
7. Ask for explicit user approval before setting `technicalStatus` to `approved`.
8. Never modify application code during the Technical Loop.

A technical plan is not ready until it includes repository scope, architecture placement, file-level changes, API/schema/config impact, implementation steps, and verification.

## Technical Status

Valid `technicalStatus` values:

- `draft` - plan exists but is incomplete
- `clarifying` - Agent is asking technical questions
- `planning` - Agent is drafting the detailed plan
- `ready_for_review` - plan is complete and waiting for approval
- `approved` - user approved; Development Loop may start
- `blocked` - required technical input or dependency is missing
- `changed` - story changed after approval; plan must be revised

## Development Loop

The Development Loop is executed by `lumen delivery run`. Read `standards/development-loop.md` for the full contract.

Coding standards are shipped with the Lumen CLI and injected automatically during `lumen delivery run`. Do not copy the coding guideline into the docs repository.

Do not start the Development Loop until:

- `metadata.json.businessStatus` is `ready`
- `metadata.json.technicalStatus` is `approved`
- `technical-plan.md` is detailed enough for file-level implementation

During the Development Loop, Lumen CLI should:

1. Read the approved `technical-plan.md`, `story.md`, and `metadata.json`.
2. Resolve code repositories under `<docs-repo>/repos/<repository>/`.
3. Create feature worktrees under `<docs-repo>/.lumen/worktrees/<repository>/`.
4. Run the delivery agent with the Lumen coding guideline.
5. Run verification steps from `technical-plan.md` when tooling is available.
6. Commit, push, and open a PR when the plan scope is complete.
7. Update `metadata.json.deliveryStatus` and send delivery notifications.

## Delivery Status

Valid `deliveryStatus` values:

- `not_started` - plan approved but no code work yet
- `in_progress` - implementation is underway
- `blocked` - cannot proceed because of environment, dependency, or missing decision
- `dev_done` - code complete locally but no PR yet
- `pr_open` - PR created and awaiting review or merge
- `done` - change merged or accepted as complete

## Coding Standards

Development execution uses the Lumen CLI coding guideline at `lib/standards/coding-guideline.md`.

Run implementation with:

```bash
lumen delivery run <docs-dir> --story <JIRA-KEY-or-slug>
```

Interactive technical planning may still run in Codex or Cursor, but code implementation should go through `lumen delivery run` once `technicalStatus` is `approved`.

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
