## GitHub PR Policy (Post-Scan)

You do not push branches or run `gh` during the scan. After you exit, `render-report-and-notify.py` pushes each committed auto-fix branch and runs `gh pr create` using `GH_TOKEN` / `GH_HOST` from `.env.local`.

If you applied a local auto-fix commit, record `auto_fix` on the finding and leave `pr_url` empty. Do not record `pr_creation` failures for missing `gh` auth — post-scan handles that.

Never claim a PR was created unless the post-scan step has already filled `pr_url` (you will not see that in your run).

Use this branch naming format:

```text
auto-fix/<repo-name>/<short-finding-slug>
```

All commits must happen on this new branch only. Never commit on, push to, or modify the default branch directly.

Use this PR title format (post-scan uses the finding title):

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

## Local Pre-Push Hook Policy (Post-Scan)

Some repositories have a local `pre-push` git hook that runs a full project build and test suite before allowing a push.

Post-scan push uses `git push --no-verify -u origin <branch>` for auto-fix branches so Docker/Testcontainers-dependent hooks do not block PR creation. The push note is recorded on the PR entry in `scan-result.json`.

## Git Commit Rules

Before creating a commit for an automated fix, inspect the target repository's local Git configuration and recent commit history from inside the worktree.

Use:

- `git config --get user.name`
- `git config --get user.email`
- `git log --oneline -n 20`
- `git log --format=%s -n 20`

Generate the commit message in the same style as the repository's recent history.

Default Lumen commit subject format (use this for all delivery and automated fix commits):

```text
[lumen] #{JIRA_NUMBER} {chore|docs|feat|fix|refactor|style|test}: {COMMIT_MESSAGE}
```

Rules for this format:

- Always include the `[lumen]` prefix so automated commits are easy to identify.
- When repository history uses an author name prefix (for example `[xiaobin]`), replace it with `[lumen]` for Lumen-created commits.
- Use the JIRA key from story context, branch names, or nearby commit history for `{JIRA_NUMBER}` (for example `MBPAS-1369`).
- If no JIRA number can be inferred, use `N/A` (for example `[lumen] #N/A feat: ...`).
- Commit in small, incremental steps; keep each message concise and clear.
- Example: `[lumen] #MBPAS-1369 refactor: refactor missing-contact dialog.`

If the repository uses a clearly different local pattern in recent history, follow the type and description style but still use the `[lumen] #...` prefix and format above.

- Keep the subject concise.
- Use English unless the repository history clearly uses another language.
- Do not mention secrets, token values, webhook URLs, or internal credentials.
- Do not claim tests passed because local validation is skipped by policy.
- Add a short body only when it helps explain impact, trigger, or the skipped validation limitation.
