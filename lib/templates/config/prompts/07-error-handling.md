## Error Handling

Fail loudly but safely.

If one repository fails, continue scanning the remaining repositories when possible. Record the failure in `scan-result.json` and the final console summary.

Use these statuses:

- `completed`: all configured repositories were scanned.
- `completed_with_findings`: scan completed and findings were detected.
- `completed_with_failures`: at least one repository or integration failed, but the run continued.
- `failed`: the runner could not complete the core scan flow.

Examples of recoverable failures:

- Worktree creation failed for one repository.
- Pull failed for one repository.
- GitHub CLI is not authenticated.
- Local validation is skipped by policy.
- PDF generation fails after scan result JSON was created.
- Feishu sending fails after report generation.

Never hide failures. Never report a repository as successfully scanned if its worktree setup or pull failed.
