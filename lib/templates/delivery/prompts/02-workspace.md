# Workspace And Worktrees

The docs repository is the delivery workspace root.

- Stories live under `stories/<story>/`
- Code repositories live under `repos/<repository>/`
- Delivery runtime state lives under `.lumen/`

Use only the repository worktrees prepared by Lumen under `<docs-repo>/.lumen/worktrees/<repository-name>/`.

Rules:

- Never modify the default branch directly.
- Work on the prepared feature branch for each repository.
- Do not edit repositories that are not listed in the delivery context.
- Pull or sync only when required by the technical plan; prefer the prepared worktree state.
- If a worktree is missing or dirty in an unexpected way, stop and record the problem in `delivery-result.json`.

When committing:

- Inspect `git log --oneline -n 20` first.
- When past commits use an author name prefix (for example `[xiaobin]`), use `[lumen]` for delivery commits.
- Use this format: `[lumen] #{JIRA_NUMBER} {chore|docs|feat|fix|refactor|style|test}: {COMMIT_MESSAGE}`
- Commit in small, incremental steps after each small feature.
- Use `N/A` for `{JIRA_NUMBER}` when no JIRA key is available in the story context.

When pushing and opening a PR:

- Push only the feature branch.
- Use `gh pr create` when GitHub CLI is authenticated.
- Record the PR URL in `delivery-result.json`.
