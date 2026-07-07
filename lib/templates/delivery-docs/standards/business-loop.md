# Business Loop

The Business Loop turns early business input into a clear, implementation-ready story. It can be run in Codex, Cursor, or another Agent.

## Inputs

- Initial business text or JIRA description
- Existing `story.md` if present
- Relevant code/repository context when useful
- Optional screenshots or sketches placed under `assets/` and referenced inline where they are discussed

## Outputs

- Updated `story.md`
- Updated `metadata.json.businessStatus` through Lumen or explicit status update

## Flow

1. Start from draft business input.
2. Agent reads `story.md` and relevant context.
3. Agent identifies the single highest-impact unclear point.
4. Agent asks one progressive clarification question with options.
5. User chooses an option or enters a custom answer.
6. Agent records the clarified Q&A under `Clarifications`.
7. Agent updates Acceptance Criteria and Business Rules when needed.
8. Agent repeats only if another high-impact ambiguity remains.
9. When clear, mark `businessStatus` as `ready`.
10. Ask whether to create or bind a JIRA Story.
11. If confirmed, create or bind JIRA and write the result to `metadata.json`.

## Language

Use the primary language of the user's business input for `story.md`. Do not force English, Chinese, or any fixed language. Keep product names, domain terms, JIRA keys, code identifiers, API names, field names, and configuration names in their original form.

JIRA Story content created from `story.md` should use the same primary language as `story.md`.

## Progressive Q&A

A Business Loop question must be concise and answerable. Prefer interactive Q&A if supported by the environment. Otherwise use a text menu.

Question format:

```text
Question: <one focused question>

Options:
A. <recommended option> (Recommended)
B. <alternative option>
C. <block/defer option when useful>
D. Other: type a custom answer
```

Rules:

- Ask one question at a time.
- Ask the question that most affects scope, architecture, or acceptance first.
- Provide 2-4 meaningful options.
- Always allow a custom answer.
- Do not ask users to fill blank templates.
- Record the final answer in `story.md`, not the entire chat history.

## JIRA Publishing

The docs story is the starting point. JIRA should be created or bound after the story is business-ready, not before.

Ask the user:

```text
The story looks business-ready. Should I create or bind a JIRA Story for it?

A. Create a new JIRA Story (Recommended)
B. Bind to an existing JIRA issue
C. Not now; keep it in docs only
D. Other: describe what to do
```

Behavior:

- Do not create JIRA without explicit confirmation.
- Prefer Atlassian/JIRA MCP when available.
- If Atlassian/JIRA MCP is not available, use `twg-cli` / `twg jira` fallback.
- Discover required JIRA fields before creation.
- Create issue type `Story` by default.
- Use `story.md` as the source for JIRA summary and description.
- Write the JIRA description in standard Agile Story format:
  - User Story
  - Business Context
  - Acceptance Criteria in Given/When/Then form
  - Business Rules
  - Clarifications that materially affect scope
  - Out of Scope
  - Docs link or docs path
- After create or bind, update `metadata.json` with the JIRA key, URL, issue type, and publish time.
- Also update `jiraUrl` in the YAML front matter of `story.md`.
- Verify by reading the JIRA issue back.

## Readiness

A story is business-ready when:

- Acceptance Criteria are clear and testable.
- Important business rules are explicit.
- Clarifications contain answers for previously unclear points.
- Out of Scope prevents obvious overbuild.
- No important `TBD` remains.
