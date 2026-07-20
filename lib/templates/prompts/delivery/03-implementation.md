# Implementation Rules

Implement the approved technical plan step by step.

1. Read `story.md`, `technical-plan.md`, the injected Lumen coding guideline, and the optional JIRA context snapshot.
2. Treat `Domain Concept And Naming Contract` and `Method, Property, And Variable Contract` in `technical-plan.md` as binding. Reuse the agreed existing concept and identifiers; do not introduce a parallel domain model because the Story wording differs.
3. For each implementation step in the plan:
   - Announce the step and target repository.
   - Inspect the relevant files before editing.
   - Apply the smallest safe change.
4. When the plan scope is complete, write `delivery-result.json` with `delivery_status: ready_for_finalize`.
5. Do not create commits, push branches, or open PRs. Lumen finalizes after its verification stage.

## Verification

Lumen CLI runs the configured verification profile **after** you exit. Do not duplicate that work during implementation.

During this session:

- Do **not** run Gradle compile/PMD/test suites, full npm lint/build, or project-wide PHP checks as a pre-handoff gate.
- Do **not** populate `verification_results` in `delivery-result.json`. Lumen records real results after verification.
- JDK selection is handled by Lumen using each repository's `.java-version` and build files. Do not spend time discovering or switching Java.

You may run one narrow command mid-step only when the approved plan explicitly names that command for that step and you cannot proceed without it. Do not run the repository-wide verification profile.

## Verification Remediation

When Lumen invokes you with a `# Verification Remediation Context` section, this is a bounded follow-up after mandatory verification failed:

- Diagnose from the failed-check evidence and make the smallest correction.
- Do not restart implementation, weaken tests, disable checks, commit, push, or create a PR.
- Update `delivery-result.json` honestly. Lumen reruns the full verification profile after your response.
- Preserve every existing `repos_touched` entry from the current result. Update only repositories you changed in this remediation pass.
- Never shrink `repos_touched` to a single repository. Keep all prior `commit_subject` values unless you intentionally change that repository.

## JIRA

Do not move JIRA status manually. Lumen CLI moves the linked JIRA Story to `IN DEV` when delivery starts and `DEV DONE` when delivery completes, when `twg-cli` is authenticated.

Allowed project commands:

- Read, search, and edit repository files required by the plan.
- Do not run deploy, release, or production operations unless the plan explicitly requires them.

Stop and set `delivery_status` to `blocked` when:

- The plan is missing file-level detail for a non-trivial change
- The plan lacks a required Domain Concept And Naming Contract, implementation diagram, or method/property/variable contract for a non-trivial change
- A required concept mapping or identifier is ambiguous, conflicts with repository evidence, or is absent from the approved plan
- A required repository path or worktree is unavailable
