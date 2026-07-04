## GitHub CLI Policy

Use `gh` only after confirming it is installed and authentication is available.

If `gh` is not installed, scanning may continue, but PR creation must be skipped. Record:

```text
Skipped PR creation: GitHub CLI (gh) is not installed.
```

If `gh auth status` indicates that the user is not logged in, scanning may continue, but PR creation must be skipped. Record:

```text
Skipped PR creation: GitHub CLI is not authenticated.
```

Never claim a PR was created unless `gh pr create` actually succeeded and returned a PR URL.

Use this branch naming format:

```text
auto-fix/<repo-name>/<short-finding-slug>
```

All commits and pushes must happen on this new branch only. Never commit on, push to, or modify the default branch directly.

Use this PR title format:

```text
[Bug Fix] <Short Description>
```

PR descriptions must include:

```text
## 1. Bug & Impact
## 2. Trigger Scenario
## 3. Root Cause
## 4. Fix
## 5. Validation
```

## Local Pre-Push Hook Policy

Some repositories have a local `pre-push` git hook that runs a full project build and test suite (for example `./gradlew clean build`) before allowing a push. This is separate from, and outside the control of, the "no project commands" rule above — it is triggered automatically by `git push` itself, not invoked directly by the agent.

These hook-triggered builds can run for many minutes and can fail for reasons that are unrelated to the automated fix, most commonly because local integration tests depend on Docker/Testcontainers and Docker is not running on the machine executing the scan.

To keep automated fix branches from being blocked by this local-environment-only failure mode:

1. Push the auto-fix branch using `git push --no-verify -u origin <branch>` so the local pre-push hook does not run. Local validation is already skipped by review-only policy, so skipping the redundant hook run does not change what was actually validated.
2. Record in `scan-result.json` and the final console summary that the push used `--no-verify` and why:

```text
Pushed with --no-verify: local pre-push hook runs a full build/test suite that depends on Docker/Testcontainers, which is unavailable in this environment. No commit or code content was skipped by this flag; only the local hook execution was skipped.
```

3. This exception applies only to pushes of new `auto-fix/<repo-name>/<short-finding-slug>` branches created by this automation. Never use `--no-verify` when pushing to, or on behalf of, the repository's default branch.
4. If `git push --no-verify` itself fails (network, auth, remote rejection, branch protection, etc.), record the exact failure. Do not retry with additional flags beyond `--no-verify`.
5. Still create the PR normally with `gh pr create` once the branch is pushed. Mention in the PR description that local pre-push validation was bypassed for this environment-only reason, under section 5 (Validation).

## Git Commit Rules

Before creating a commit for an automated fix, inspect the target repository's local Git configuration and recent commit history from inside the worktree.

Use:

- `git config --get user.name`
- `git config --get user.email`
- `git log --oneline -n 20`
- `git log --format=%s -n 20`

Generate the commit message in the same style as the repository's recent history.

Default Lumen commit subject format (use this when creating automated High-severity fix commits unless the repository history clearly requires a different pattern):

```text
[lumen] #<ticket> <type>: <short description>
```

Rules for this format:

- Always include the `[lumen]` prefix so automated commits are easy to identify.
- Use `<ticket>` from nearby commit history, branch names, or PR context when available (for example `#MBPAS-1338`).
- If no ticket can be inferred, use the placeholder from `config/common.json` → `git.ticket_placeholder` (for example `#MBPAS-XXXX`) and keep the description specific.
- Use conventional commit types such as `fix`, `refactor`, `security`, or `chore`.
- Example: `[lumen] #MBPAS-1338 fix: enforce SYSTEM role on survey report endpoint`

If the repository uses a clearly different local pattern in recent history, follow that pattern but still keep the `[lumen]` prefix at the start of the subject line.

- Keep the subject concise.
- Use English unless the repository history clearly uses another language.
- Do not mention secrets, token values, webhook URLs, or internal credentials.
- Do not claim tests passed because local validation is skipped by policy.
- Add a short body only when it helps explain impact, trigger, or the skipped validation limitation.
