# Business Loop

The Business Loop turns early business input into a clear, implementation-ready story. It can be run in Codex, Cursor, or another Agent.

## Inputs

- Initial business text or JIRA description
- Existing `story.md` if present
- Relevant code/repository context when useful
- Optional screenshots or sketches placed under `assets/`

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

## Readiness

A story is business-ready when:

- Acceptance Criteria are clear and testable.
- Important business rules are explicit.
- Clarifications contain answers for previously unclear points.
- Out of Scope prevents obvious overbuild.
- No important `TBD` remains.
