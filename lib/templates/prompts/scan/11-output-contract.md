## Structured Output Contract

Write the timestamped result and an identical fixed copy to `scan-result.json`:

```json
{
  "scan_status": "completed",
  "scan_window": "Last <N> Days",
  "started_at": "ISO-8601 timestamp",
  "finished_at": "ISO-8601 timestamp",
  "repositories_scanned": 0,
  "repositories_failed": 0,
  "findings": [],
  "issue_registry": {
    "path": "state/issue-registry.json",
    "new_issues": 0,
    "existing_open_issues": 0,
    "stale_open_issues": 0,
    "pr_open_issues": 0,
    "resolved_issues": 0
  },
  "prs": [],
  "resolved_issues": [],
  "failures": [],
  "validation_results": [],
  "feishu": {"status": "not_sent", "error": null},
  "report": {"html_path": null, "pdf_path": null, "status": "not_generated"}
}
```

Each finding must include `title`, `severity`, `repository`, `impact`, `trigger`, `file`, `line_range`, `code_snippet`, `suggestion`, `root_cause`, `validation`, `pr_url`, and optional `auto_fix`. If a High finding is committed, `auto_fix` records its branch and commit subject while `pr_url` remains null until post-scan.

The wrapper fills `feishu`, `report`, PR, and verification fields after the Agent exits. Do not set `sent`, `generated`, or invented results yourself.
