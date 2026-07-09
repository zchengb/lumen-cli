# Technical Loop

The Technical Loop turns a business-ready story into a detailed, reviewable `technical-plan.md`. It can be run in Codex, Cursor, or another Agent.

## Inputs

- `story.md`
- `metadata.json`
- Relevant repository context from `repos/<repository>/`
- Lumen coding guideline from the CLI install
- Runtime profile or stack information when available

## Outputs

- Updated `technical-plan.md`
- Updated `metadata.json.technicalStatus` through Lumen or explicit status update
- Updated `metadata.json.linkedRepos` when repository scope changes

## Preflight Sync

Use the same preflight rules as the Business Loop:

1. Pull this docs repository first.
2. Pull every configured code repository under `repos/` that may be used as context.
3. For each repo, check `git status` before pulling.
4. Run `git pull --ff-only` only when the repo has no local uncommitted changes.
5. If a repo cannot be fast-forwarded safely, stop and ask the user how to proceed.

## Gate

Do not start the Technical Loop until:

- `metadata.json.businessStatus` is `ready`
- `story.md` has clear Acceptance Criteria and no important `TBD`

Do not start the Development Loop until:

- `technical-plan.md` exists
- `metadata.json.technicalStatus` is `approved`

## Flow

1. Read `story.md`, `metadata.json`, and `templates/technical-plan.md`.
2. Inspect impacted repositories and identify real modules, endpoints, tables, and tests.
3. Mark `technicalStatus` as `planning` or `clarifying`.
4. Ask one focused technical question at a time when ambiguity affects design, scope, or verification.
5. Record confirmed technical decisions in `technical-plan.md`, not in chat only.
6. Produce a file-level plan detailed enough for another engineer or Agent to implement without guessing.
7. When the plan is complete, set `technicalStatus` to `ready_for_review`.
8. Ask the user to approve the plan.
9. After explicit approval, set `technicalStatus` to `approved`.

## Progressive Q&A

Use the same interaction style as the Business Loop.

Rules:

- Ask one question at a time unless the user asks for a full checklist.
- Ask the question that most affects architecture, data model, API contract, or rollout first.
- Provide 2-4 concrete options and mark one as `Recommended` when reasonable.
- Always allow a custom answer.
- Record the final answer in `technical-plan.md` under `Design Decisions` or `Open Questions Resolved`.
- Return to the Business Loop if the answer changes business scope.

Example:

```text
Question: Where should dealer-scope validation live for this feature?

Options:
A. mbpass-admin controller before calling mbpass-business (Recommended)
B. mbpass-business application service only
C. Both layers for defense in depth
D. Other: describe your answer
```

## Required Plan Detail

`technical-plan.md` must be implementation-ready. At minimum include:

- Goal and delivery scope tied to Acceptance Criteria
- Impacted repositories and why each is touched
- Architecture summary and layer placement
- Design decisions with rejected alternatives when non-obvious
- File-level change list per repository
- API, schema, migration, config, and permission changes
- Step-by-step implementation sequence
- Verification commands or manual checks per repository
- Rollback or release notes when rollout risk exists
- Risks, dependencies, and out-of-scope items

A valid technical plan should let the Development Loop implement without inventing new architecture.

## Plan Quality Bar

Reject your own draft and keep refining when:

- Steps say only "update service" without naming files or methods.
- Verification says only "run tests" without naming the expected command or scenario.
- A repository is listed but has no concrete change list.
- Business scope changed but `story.md` was not updated.
- Security, permissions, or migration impact is unclear.

## Approval

Before setting `technicalStatus` to `approved`, ask:

```text
The technical plan is ready for review. What should I do next?

A. Approve the plan and move to development (Recommended)
B. Keep refining the plan
C. Return to business clarification
D. Other: describe what to do
```

Rules:

- Do not set `approved` without explicit user confirmation.
- If the user changes business scope, set `businessStatus` to `changed` and return to the Business Loop.
- If the user requests plan edits, keep `technicalStatus` as `ready_for_review` or `clarifying`.

## Technical Status

Valid `technicalStatus` values:

- `draft` — plan file exists but is incomplete
- `clarifying` — Agent is asking technical questions
- `planning` — Agent is drafting the detailed plan
- `ready_for_review` — plan is complete and waiting for approval
- `approved` — user approved; Development Loop may start
- `blocked` — required technical input or dependency is missing
- `changed` — story changed after approval; plan must be revised

## Language

Write `technical-plan.md` in the same primary language as `story.md` unless the user asks otherwise. Keep code identifiers, API names, repository names, and JIRA keys in their original form.
