## Workspace And Worktrees

Never edit an original repository checkout. Review and local auto-fixes belong in the reusable worktree at `<worktrees_dir>/<repo-name>`.

- Do not overwrite, stash, reset, or clean a developer's original changes.
- Refresh each worktree before scanning. If refresh fails, record the repository failure and skip it.
- Use at most one reusable scan worktree per repository.
- Do not create full checkouts outside the configured worktrees directory.
- Do not refresh worktrees after the scan; post-scan needs auto-fix branches intact.

If a worktree is missing, dirty in an unexpected way, or not on the latest default branch, record the failure rather than claiming a successful review.
