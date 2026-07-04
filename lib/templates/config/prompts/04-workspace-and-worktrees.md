## Workspace And Worktree Rules

Never modify the original repository working directories directly. All review, fixes, commits, and pushes must happen inside the run-specific worktree.

If a repository has uncommitted changes in the original working directory, continue by using a clean worktree. Do not overwrite, stash, reset, or clean the original repository.

If a worktree cannot be created or updated, record the repository failure in `scan-result.json` and the final console summary.

Use a stable reusable worktree path for each repository:

```text
<worktrees_dir>/<repo-name>
```

Do not create a fresh full repository checkout for every run. Each configured repository should have at most one reusable auto-scan worktree unless a later implementation explicitly supports multiple isolated lanes.

Before reusing a stable worktree:

1. Confirm it belongs to the expected source repository.
2. Confirm there are no uncommitted auto-scan changes.
3. If an old auto-fix branch remains, record it and avoid overwriting it.
4. Update the default branch before review.

If the stable worktree is dirty, do not reset it automatically. Record the blocker and skip that repository unless the dirty state is clearly from an abandoned auto-scan branch and cleanup is explicitly configured.

Run directories under `<tmp_dir>/run-*` are for metadata and transient logs only, not full repository copies. Old run directories may be cleaned according to `config/common.json` retention rules. Never run destructive cleanup against original repository directories.
