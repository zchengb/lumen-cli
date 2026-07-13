# Implementation Rules

Implement the approved technical plan step by step.

1. Read `story.md`, `technical-plan.md`, and the injected Lumen coding guideline.
2. For each implementation step in the plan:
   - Announce the step and target repository.
   - Inspect the relevant files before editing.
   - Apply the smallest safe change.
   - Run the verification command listed for that step when tooling is available.
3. Before finishing, run the approved repository-specific verification profile in each impacted worktree. For Java repositories, include compile, static analysis, focused unit, integration, and architecture-guard tests when the repository supports them. For App/PHP/frontend repositories, run only the syntax/type/lint and explicitly allowed focused checks in the plan.
4. Record verification results honestly in `delivery-result.json`.
5. When the plan scope is complete, create the PR unless the user disabled PR creation.

## Mandatory Java / Gradle Commands

When the repository uses Gradle with PMD and the approved verification profile does not override them, run these in the prepared worktree:

```bash
./gradlew compileJava compileTestJava -x test
./gradlew pmdMain pmdTest
./gradlew test --tests '*ApplicationTest' --tests '*HelperTest' --tests '*RendererTest' --tests '*PropertiesTest' --tests '*MergerTest' --tests '*PusherTest' --tests '*QueryApplicationTest'
./gradlew test --tests '*ControllerTest' --tests '*BaseTest' --tests '*IntegrationTest' --tests '*IT'
```

Lumen CLI also runs the same verification profile after the agent exits. Do not claim success if any mandatory check failed.

## Verification Remediation

When Lumen invokes you with a `# Verification Remediation Context` section, this is a bounded follow-up after mandatory verification failed. Work only from the provided failed-check evidence and the existing feature worktree diff:

- Diagnose before editing and make the smallest correction that addresses the failure.
- Do not restart implementation, rewrite unrelated code, weaken tests, disable checks, change the approved plan, commit, push, or create a PR.
- Preserve all existing Story-scope changes unless they are directly incorrect.
- Update `delivery-result.json` honestly. Lumen will rerun the full configured verification profile after your response.

## JIRA

Do not move JIRA status manually. Lumen CLI moves the linked JIRA Story to `IN DEV` when delivery starts and `DEV DONE` when delivery completes, when `twg-cli` is authenticated.

Allowed project commands:

- You may run build, test, lint, PMD, compile, and migration commands required by `technical-plan.md`.
- Prefer the narrowest verification command listed in the plan.
- Do not run deploy, release, or production operations unless the plan explicitly requires them.

Stop and set `delivery_status` to `blocked` when:

- The plan is missing file-level detail for a non-trivial change
- A required repository path or worktree is unavailable
- Verification fails and the plan does not describe a fallback
