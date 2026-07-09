## Pipeline

1. Load environment defaults from `.env.common` when present.
2. Load local secrets from `.env.local` when present.
3. Read reusable workspace defaults from `config/common.json`.
4. Read repository configuration from `config/repos.json`.
5. Read runtime profile rules from `config/runtime-profiles.json`.
6. Run the worktree preparation script before reviewing repositories:
   `python3 <lumen-lib>/prepare_scan_worktrees.py refresh <workspace-root>`
   The scan wrapper runs this automatically when possible.
7. For each configured repository, use the refreshed isolated git worktree under the configured worktrees directory.
8. Confirm each worktree is on the latest default branch after the refresh script completes.
9. Inspect commits, diffs, changed files, and directly related code from the configured scan window in `config/common.json` (`execution.scan_window_days`).
10. Identify confirmed correctness, security, validation, reliability, data integrity, authorization, authentication, payment, caching, retry, migration, or production-impacting issues.
11. Classify each finding using `config/prompts/09-severity-guideline.md`.
12. Create GitHub PRs only for confirmed High severity findings that meet the automated fix policy.
13. Reconcile findings with the local issue registry before final output.
14. Write the run result to `<results_dir>/scan-result-<run-timestamp>.json`, then write an identical copy to the fixed path `<results_dir>/scan-result.json` (overwrite it). Leave `report` and `feishu` at their default "not generated / not sent" values in both files.
15. Print a final console summary.
16. Run the worktree preparation script again after the scan completes so the next run starts from clean, up-to-date worktrees.

After your run exits, the wrapper script automatically refreshes worktrees, generates the HTML report, converts it to PDF, refreshes `dashboard-data.js`, and sends exactly one Feishu interactive card — all deterministically, from `scan-result.json`. You do not perform any of these steps.
