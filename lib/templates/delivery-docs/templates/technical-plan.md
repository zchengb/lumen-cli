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

| Repository | Table / field / migration | Change | Backward compatible | Rollback |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD | TBD |

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

Plan tests based on the actual repository setup. Include unit tests and integration tests only when the repository already supports them or the story explicitly requires adding them.

| Step | Repository | Command or manual check | Expected result | Notes |
|---|---|---|---|---|
| 1 | TBD | TBD | TBD | TBD |

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
