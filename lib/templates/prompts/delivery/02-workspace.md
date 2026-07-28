# Workspace And Worktrees

The docs repository is the delivery root:

- `stories/<story>/` — Story and technical plan
- `repos/<repository>/` — source repositories
- `lumen/worktrees/<story-key>/<repository-name>/` — editable delivery worktrees
- `lumen/results/delivery-result.json` — handoff result

Use only the prepared worktrees listed in the Delivery Context. Never edit the default branch, an unlisted repository, or an original checkout. If a worktree is missing or unexpectedly dirty, stop and record `blocked`.

Before editing each repository, inspect `git log --oneline -n 20` and derive one concise `commit_subject` that matches its history. Do not commit; Lumen commits only after deterministic verification succeeds.

Do not pull, push, create branches, or open PRs unless the approved plan explicitly requires reading remote state. Prefer the prepared worktree.
