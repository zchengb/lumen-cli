## Local Issue Registry

Maintain a persistent local issue registry at the path configured by `config/common.json`, currently `state/issue-registry.json`.

The registry exists to prevent repeated reviews from producing inconsistent output for the same unresolved issue.

Important: do **not** write or edit `state/issue-registry.json` yourself. Include findings only in `scan-result.json`. The post-processing script (`render-report-and-notify.py`) reconciles findings into the registry using a single canonical `ISSUE-*` id format.

Before finalizing a finding:

1. Compute a stable issue fingerprint mentally (repository + file + normalized title + trigger).
2. Reuse the same title, repository, file, and trigger wording when the issue still exists so reconciliation can match it across runs.
3. Create a genuinely new finding entry only when the issue is new.
4. Update evidence, severity, and PR metadata in the finding when appropriate.

Fingerprint guidance:

```text
repository + file path + normalized finding title + trigger hash
```

Do not rely on line number alone, because line numbers may drift.

Supported local issue statuses:

- `open`: confirmed and not yet handled.
- `in_progress`: fix started but no PR is available yet.
- `pr_open`: PR was created and is awaiting review or merge.
- `resolved`: issue is no longer present in code or the fix was merged.
- `accepted_risk`: team decided not to fix now.
- `false_positive`: issue was reviewed and rejected.
- `ignored`: intentionally excluded from future reporting.

When a developer fixes an issue:

1. On the next scan, inspect the relevant file/worktree again.
2. If the vulnerable code is gone or correctly fixed, do **not** include it in `findings`.
3. Record the resolution in `scan-result.json` under a `resolved_issues` array with the prior `issue_id`, repository, title, and resolution reason (for example `merged_pr`, `manual_fix`, or `no_longer_reproducible`).
4. The post-processing script will move matching registry entries to `resolved`.

If an issue is still present, include it again in `findings` even if it was reported before.

Scan window rule:

The configured scan window controls which recent changes are newly inspected. It must not remove unresolved issues from the local registry.

If an issue is older than the scan window and still unresolved, keep it in the registry and include it in the report as an existing open issue. Mark it as stale when it has not been seen for the configured stale threshold. Do not silently ignore unresolved issues only because they are older than 7 days.

Report issue counts separately:

- New findings in this run.
- Existing open issues.
- Stale open issues.
- PR-open issues.
- Resolved or closed issues.
