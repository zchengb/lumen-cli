---
status: "draft"
approvedBy: ""
approvedAt: ""
jiraKey: ""
baseBranch: ""
featureBranch: ""
---
# Technical Plan: <Story Title>

## Goal

Describe the technical outcome and map it to Acceptance Criteria from `story.md`.

| Acceptance Criterion | Technical outcome |
|---|---|
| AC1 | TBD |

## Delivery Checklist

Summarize the business outcomes the delivery must achieve. Derive every item from confirmed Acceptance Criteria or Business Rules in `story.md`. Use concise, business-facing language; do not list implementation tasks, commands, or tests.

- [ ] TBD

## Business Flow Diagram (Optional)

Add a Mermaid flowchart only when cross-system flow, scheduled or asynchronous processing, state transitions, or complex filtering is material to understanding the business flow. Omit this section's diagram for a simple local change.

## Technical Clarifications

Record confirmed answers from progressive technical Q&A. Do not keep important decisions only in chat.

| Question | Confirmed answer | Impact on plan |
|---|---|---|
| TBD | TBD | TBD |

## Impacted Repositories

| Repository | Role in this delivery | Change summary | Runtime / verification level |
|---|---|---|---|
| TBD | TBD | TBD | TBD |

## Architecture And Module Placement

Describe where the change belongs in each repository and why.

```text
Example:
mbpass-admin -> controller validation + request mapping
mbpass-business -> application service + repository query
```

## Repository Conventions And Architecture Guards

Document the conventions observed in each impacted repository. Existing repository patterns and guard tests are authoritative; do not create a parallel layering approach for this story.

| Repository | Existing layers / module boundary | Existing style to follow | Architecture guard test / rule | Delivery action |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD or `None found` | TBD |

## API And Contract Changes

### New or changed endpoints

| Method | Path | Repository | Auth / permission | Request | Response | Compatibility notes |
|---|---|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |

### Caller impact

- TBD or `None`

### Breaking changes

- TBD or `None`

## Data Model And Migration Plan

Do not introduce database foreign keys. Use application-level relationship validation and ordinary indexes where required by the query or lifecycle.

| Repository | Table / field / migration | Change | Backward compatible | Rollback |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD |

## Permission And Data Scope

Complete this section whenever the change reads or mutates data, exposes an endpoint, runs a job, or changes an integration. Reuse the repository's existing authorization and audit conventions.

| Surface | Actor / caller | Permission / role | Tenant, dealer, or ownership scope | Audit / logging | Verification |
|---|---|---|---|---|---|
| TBD or `No permission impact` | TBD | TBD | TBD | TBD | TBD |

## Integration And Failure Handling

| Integration point | Change | Failure behavior | Retry / fallback |
|---|---|---|---|
| TBD | TBD | TBD | TBD |

## Configuration And Secrets

| Repository | Key / file | Change | Default | Secret handling |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD |

## File-Level Change Plan

### <repository-name>

| File | Change |
|---|---|
| TBD | TBD |

## Implementation Steps

1. Step 1 - repository, files, and expected result.
2. Step 2 - repository, files, and expected result.
3. Step 3 - verification and PR boundary.

Each step must be concrete enough for the Development Loop to execute without guessing.

## Verification Plan

Plan tests based on the actual repository setup. Include unit tests, integration tests, and architecture guards only when the repository already supports them or the story explicitly requires adding them. App/PHP/frontend projects default to syntax/type/lint and explicitly allowed focused tests; do not plan heavy environment-dependent builds by default.

| Level | Repository | Existing capability / guard discovered | Command or manual check | Expected result | Notes |
|---|---|---|---|---|---|
| Compile / syntax | TBD | TBD | TBD | TBD | TBD |
| Static / architecture | TBD | TBD | TBD | TBD | TBD |
| Unit | TBD | TBD | TBD | TBD | TBD |
| Integration | TBD | TBD | TBD | TBD | TBD |

## Runtime Profiles

| Repository | Dockerfile / profile source | Java / Node / PHP version | Commands allowed | Commands skipped |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD |

## Observability And Support

| Area | Plan |
|---|---|
| Logs | TBD |
| Metrics / audit | TBD |
| Support diagnostics | TBD |

## Rollback / Release Notes

- TBD or `Not required`

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| TBD | TBD | TBD |

## Refactoring Notes

Only record refactoring here when it affects architecture, public API behavior, or team-level understanding.

## Out Of Scope

- TBD
