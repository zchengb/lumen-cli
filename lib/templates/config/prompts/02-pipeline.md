## Pipeline

1. Load environment defaults from `.env.common` when present.
2. Load local secrets from `.env.local` when present.
3. Read reusable workspace defaults from `config/common.json`.
4. Read repository configuration from `config/repos.json`.
5. Read runtime profile rules from `config/runtime-profiles.json`.
6. Create a unique run metadata directory under the configured tmp directory.
7. For each configured repository, create or reuse one stable isolated git worktree under the configured worktrees directory.
8. Pull the latest default branch in the stable worktree.
9. Inspect commits, diffs, changed files, and directly related code from the configured scan window, defaulting to the last 7 days.
10. Identify confirmed correctness, security, validation, reliability, data integrity, authorization, authentication, payment, caching, retry, migration, or production-impacting issues.
11. Classify each finding using `config/prompts/09-severity-guideline.md`.
12. Create GitHub PRs only for confirmed High severity findings that meet the automated fix policy.
13. Reconcile findings with the local issue registry before final output.
14. Write the run result to `<results_dir>/scan-result-<run-timestamp>.json`, then write an identical copy to the fixed path `<results_dir>/scan-result.json` (overwrite it). Leave `report` and `feishu` at their default "not generated / not sent" values in both files.
15. Print a final console summary.

After your run exits, the wrapper script automatically generates the HTML report, converts it to PDF, refreshes `dashboard-data.js`, and sends exactly one Feishu interactive card — all deterministically, from `scan-result.json`. You do not perform any of these steps.
