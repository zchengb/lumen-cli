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

The configured `execution.scan_window_days` in `config/common.json` controls which recent changes are newly inspected.

Rules:

1. Only inspect commits, diffs, and changed files within the configured scan window.
2. Only include issues in `findings` when they are tied to code changed within the scan window, or when you re-verified the vulnerable code during this run inside that window.
3. Do **not** copy old registry issues into `findings` only because they remain unresolved.
4. Do **not** report issues from commits older than the configured scan window.
5. The registry may still retain older unresolved issues, but they belong in `issue_registry` summary counts — not in this run's `findings` array.
6. When an older open issue is still present and you re-verified it from a file touched in the scan window, you may include it once with accurate evidence.

Set `scan_window` in the result JSON to `Last <N> Days`, where `<N>` is `execution.scan_window_days`.

Report issue counts separately:

- New findings in this run (within scan window).
- Existing open issues carried in registry summary only.
- Stale open issues not seen in this run.
- PR-open issues.
- Resolved or closed issues.
