# Technical Loop

The Technical Loop turns one concrete, business-ready `story.md` into one executable `technical-plan.md`. It may run in Codex, Cursor, or another Agent, but it must stay in planning mode: no application source code changes are allowed in this loop.

## Inputs

- `story.md`
- `metadata.json`
- Existing `technical-plan.md` when refining a previous draft
- Relevant repository context from `repos/<repository>/`
- `standards/business-loop.md`
- `templates/technical-plan.md`
- Runtime profile, Dockerfile, or stack information when available

## Outputs

- Updated `technical-plan.md`
- Updated `metadata.json.technicalStatus` through Lumen or explicit status update
- Updated `metadata.json.linkedRepos` when repository scope changes
- Clear list of remaining blockers when the plan cannot be approved

## Preflight Sync

Use the same preflight rules as the Business Loop:

1. Pull this docs repository first.
2. Pull every configured code repository under `repos/` that may be used as context.
3. For each repo, check `git status` before pulling.
4. Run `git pull --ff-only` only when the repo has no local uncommitted changes.
5. If a repo cannot be fast-forwarded safely, stop and ask the user how to proceed.

## Gate

Do not start the Technical Loop until:

- The input is a single concrete story, not a broad topic.
- `metadata.json.businessStatus` is `ready`.
- `story.md` has clear Acceptance Criteria and no important `TBD`.

If the user starts from a topic, guide them to split and select one story first. Generate technical plans story by story, never one technical plan for an entire topic.

Do not start the Development Loop until:

- `technical-plan.md` exists
- `metadata.json.technicalStatus` is `approved`

## Flow

1. Read `story.md`, `metadata.json`, `templates/technical-plan.md`, and this standard.
2. Inspect the real repositories before drafting: architecture, modules, endpoints, jobs, tables, tests, Dockerfile, build files, and recent patterns.
3. Keep `technicalStatus` as `draft` while planning or asking questions.
4. Build an initial impact map: repositories, modules, API/data/config/permission/test surfaces.
5. Ask derived technical questions progressively when an answer affects design, delivery boundary, verification, or rollout.
6. Record every confirmed answer in `technical-plan.md`; do not leave decisions only in chat.
7. Produce a file-level implementation plan detailed enough for another engineer or Agent to implement without guessing.
8. Ask the user to review the plan and choose whether to approve, build, or keep refining.
9. After explicit approval, set `technicalStatus` to `approved`.

## Progressive Technical Q&A

Use interactive Q&A whenever the environment supports it.

Rules:

- Ask one focused question at a time unless the user asks for a full checklist.
- Ask the question that most affects architecture, data model, API contract, runtime, or verification first.
- Provide 2-4 concrete options and mark one as `Recommended` when reasonable.
- Always allow a custom answer.
- Prefer choices over blanks. Do not ask the user to fill an empty template field when you can offer likely options from repo context.
- Explain the consequence of each option briefly.
- Record the final answer in `technical-plan.md` under `Technical Clarifications` or the relevant plan section.
- Return to the Business Loop if the answer changes business scope or Acceptance Criteria.

Example:

```text
Question: Where should the low-rating aggregation job be implemented?

Options:
A. Existing scheduled-job module in mbpass-business (Recommended) - keeps survey aggregation close to existing domain logic.
B. New admin-side scheduled task - faster UI-team ownership, but duplicates business-domain access.
C. External script / operations job - lowest code change, but weak observability and deployment control.
D. Other: describe your answer.
```

## Required Technical Question Areas

The Agent should actively check these areas and ask only when the answer is not clear from docs or code:

- Repository scope: which repos must change, and which repos are explicitly read-only for this story.
- Base branch and worktree boundary: target branch, feature branch naming, and whether multi-repo PRs are needed.
- Architecture placement: controller/service/repository/job/component ownership and existing module conventions.
- API contract: endpoint, request/response, authorization, compatibility, and caller impact.
- Data model: tables, migrations, indexes, default values, backfill, rollback, and data retention.
- Integration boundary: upstream/downstream services, queues, scheduled jobs, email/SMS/push providers, and failure handling.
- Runtime and environment: Java version, project-provided Dockerfile, runtime profile, secrets, config keys, and local limitations.
- Verification: compile, unit tests, integration tests, PMD/lint, lightweight checks for App/PHP/frontend repos, and manual checks. Plan unit and integration tests only when the target repository actually has the relevant test framework, commands, or existing pattern.
- Observability: logs, metrics, audit trail, alerting, and support diagnostics.
- Rollout and rollback: feature flags, config switch, release sequencing, and rollback plan.
- Refactoring boundary: local cleanup allowed inside the story vs separate refactor discussion.
- Out of scope: what the Development Loop must not implement.

## Required Plan Detail

`technical-plan.md` must be implementation-ready. At minimum include:

- Goal and delivery scope tied to Acceptance Criteria
- Technical clarifications with confirmed answers
- Impacted repositories and why each is touched
- Architecture summary and layer placement
- File-level change list per repository
- API, schema, migration, config, permission, and integration changes
- Step-by-step implementation sequence
- Unit test and integration test plan based on the actual repository test setup
- Verification commands or manual checks per repository
- Runtime profile / Dockerfile expectations per repository
- Rollback or release notes when rollout risk exists
- Risks, dependencies, and out-of-scope items

A valid technical plan should let the Development Loop implement without inventing new architecture.

## Plan Quality Bar

Reject your own draft and keep refining when:

- Steps say only "update service" without naming files or methods.
- Verification says only "run tests" without naming the expected command or scenario.
- A repository is listed but has no concrete change list.
- Business scope changed but `story.md` was not updated.
- Security, permissions, migration, runtime, or rollback impact is unclear.
- The plan assumes Docker commands when the repository does not provide or reference a usable Dockerfile/profile.
- The plan asks App/PHP/frontend projects to run heavy environment-dependent builds when only syntax/light checks are expected.

## Approval

Before setting `technicalStatus` to `approved`, ask:

```text
The technical plan is ready for review. What should I do next?

A. Approve and push the technical plan (Recommended)
B. Run local build / verification now, then decide
C. Approve, push the technical plan, and start build
D. Keep refining the plan
E. Return to business clarification
F. Other: describe what to do
```

Rules:

- Do not set `approved` without explicit user confirmation.
- If the user changes business scope, set `businessStatus` to `changed` and return to the Business Loop.
- If the user requests plan edits, keep `technicalStatus` as `draft`.

## Technical Status

Valid `technicalStatus` values:

- `draft` - the technical plan is being created, refined, questioned, or reviewed. This is the only non-approved state.
- `approved` - the user approved the technical plan; Development Loop may start.

If the story changes after approval, move `technicalStatus` back to `draft` and revise the plan. If planning is blocked, keep `draft` and record the blocker in `technical-plan.md` under `Risks` or `Technical Clarifications`.

## Language

Write `technical-plan.md` in the same primary language as `story.md` unless the user asks otherwise. Keep code identifiers, API names, repository names, and JIRA keys in their original form.
