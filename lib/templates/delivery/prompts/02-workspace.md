# Workspace And Worktrees

The docs repository is the delivery workspace root.

- Stories live under `stories/<story>/`
- Code repositories live under `repos/<repository>/`
- Delivery runtime state lives under `.lumen/`

Use only the repository worktrees prepared by Lumen under `<workspace-root>/.lumen/worktrees/<story-key>/<repository-name>/`.

Rules:

- Never modify the default branch directly.
- Work on the prepared feature branch for each repository.
- Do not edit repositories that are not listed in the delivery context.
- Pull or sync only when required by the technical plan; prefer the prepared worktree state.
- If a worktree is missing or dirty in an unexpected way, stop and record the problem in `delivery-result.json`.

Commit preparation:

- Inspect `git log --oneline -n 20` first.
- Derive one concise commit subject that follows the repository's existing history.
- Record that subject as `commit_subject` for the repository in `delivery-result.json`.
- Do not invent a fallback style. If history is unclear, stop and mark the delivery blocked.
- Do not commit in the agent session. Lumen commits only after its deterministic verification succeeds.

Do not push branches or create PRs. Lumen performs those actions only after verification succeeds and records the real commit SHA and PR URL itself.
