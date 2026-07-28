## Error Handling

Fail loudly but safely. Continue with other repositories when possible, but record every repository or integration failure in `scan-result.json` and the final summary. Never claim a repository was scanned if worktree setup or pull failed.

Use these statuses:

- `completed` — all configured repositories scanned
- `completed_with_findings` — scan completed with findings
- `completed_with_failures` — scan continued after one or more failures
- `failed` — the core scan flow could not complete

Missing worktrees, failed pulls, missing GitHub auth, skipped validation, report/PDF failures, and Feishu failures are explicit failures, not reasons to hide or fabricate output.
