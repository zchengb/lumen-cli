## Pipeline

1. Load `.env.common`, `.env.local`, `config/common.json`, `config/repos.json`, and `config/runtime-profiles.json`.
2. Refresh the configured scan worktrees with `prepare_scan_worktrees.py refresh <workspace-root>`; use only those worktrees.
3. Review commits, diffs, changed files, and directly related code within `execution.scan_window_days`.
4. Report only confirmed findings with code evidence, impact, and a realistic trigger. Classify them with `09-severity-guideline.md`.
5. Apply the High-only auto-fix policy, then reconcile findings against the local registry.
6. Write the timestamped result and overwrite the fixed `scan-result.json` path. Leave report and Feishu fields at their wrapper defaults.
7. Print the required console summary. Do not refresh worktrees after finishing; post-scan needs auto-fix branches intact.

The wrapper handles post-scan pushes, PRs, reports, Jira sync, Dashboard refresh, and Feishu notification.
