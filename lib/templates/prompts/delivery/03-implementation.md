# Implementation

1. Read `story.md`, `technical-plan.md`, the coding guideline, and the optional Jira snapshot.
2. Treat the plan's domain and identifier contracts as binding. Reuse existing concepts, symbols, and patterns.
3. For each plan step, announce the target repository, inspect before editing, and make the smallest safe change.
4. Preserve authentication, authorization, validation, data scope, error handling, and backward compatibility unless the plan changes them.
5. Write `delivery-result.json` with `delivery_status: ready_for_finalize` when the plan is complete.

## Verification boundary

Lumen runs the configured verification profile after the Agent exits. Do not duplicate project-wide Gradle, Maven, npm, yarn, PHP, mobile, lint, build, or test commands. Run a narrow command only when the approved plan explicitly requires it to continue. Leave `verification_results` empty; Lumen fills it from real output.

## Remediation

When given `# Verification Remediation Context`, diagnose only the listed failure, make the smallest correction, preserve all existing `repos_touched` entries and commit subjects, and do not restart, broaden scope, commit, push, or weaken verification.

## Stop conditions

Set `delivery_status` to `blocked` when the plan lacks required detail, a required concept or identifier is ambiguous, a worktree is unavailable, frontend/UI delivery is requested, or a required environment cannot be established. Do not move Jira status manually.
