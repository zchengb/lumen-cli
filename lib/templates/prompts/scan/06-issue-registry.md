## Issue Registry

The post-processing wrapper maintains the registry at the path configured by `config/common.json` (normally `state/issue-registry.json`). Do not edit it directly; report findings only in `scan-result.json`.

For a finding, keep the same repository, file, title, and trigger wording while the issue persists. Use the stable fingerprint:

```text
repository + file path + normalized title + trigger hash
```

Do not rely on line numbers alone. If a previous issue is fixed, omit it from `findings` and add it to `resolved_issues` with its prior ID, repository, title, and reason. If it still exists and is in the scan window, report it again.

Apply `execution.scan_window_days`: do not copy older unresolved issues into new findings unless you re-verified the affected code during this run. Put older registry state in the summary counts only.

Registry statuses are `open`, `in_progress`, `pr_open`, `resolved`, `accepted_risk`, `false_positive`, and `ignored`.
