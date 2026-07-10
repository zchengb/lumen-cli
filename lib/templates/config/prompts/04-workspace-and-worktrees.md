## Workspace And Worktree Rules

Never modify the original repository working directories directly. All review, fixes, and local commits must happen inside the run-specific worktree. Do not push branches or run `gh` during the scan.

If a repository has uncommitted changes in the original working directory, continue by using a clean worktree. Do not overwrite, stash, reset, or clean the original repository.

If a worktree cannot be created or updated, record the repository failure in `scan-result.json` and the final console summary.

Use a stable reusable worktree path for each repository:

```text
<worktrees_dir>/<repo-name>
```

Before every scan, run the worktree preparation script:

```bash
python3 <lumen-lib>/prepare_scan_worktrees.py refresh <workspace-root>
```

The script removes stale worktrees, recreates them from the latest default branch, and fetches only commits since the configured scan window using `git fetch --shallow-since=<date>`. The scan wrapper runs this before the agent and again after post-scan PR creation — not during your run.

Rules:

1. Do not create a fresh full repository checkout outside the configured worktrees directory.
2. Each configured repository should have at most one reusable auto-scan worktree.
3. If the refresh script fails for a repository, record the failure and skip that repository.
4. Never run destructive cleanup against original repository directories.

Run directories under `<tmp_dir>/run-*` are for metadata and transient logs only, not full repository copies.
