## Structured Output Contract

Write a structured JSON result with this shape:

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
  "feishu": {
    "status": "not_sent",
    "error": null
  },
  "report": {
    "html_path": null,
    "pdf_path": null,
    "status": "not_generated"
  }
}
```

Each finding must use:

```json
{
  "title": "Missing ownership validation in user profile update",
  "severity": "High",
  "repository": "backend-service",
  "impact": "Authenticated users can update another user's profile.",
  "trigger": "Authenticated user calls PATCH /api/users/{id} with another user ID.",
  "file": "src/main/java/com/example/user/UserController.java",
  "line_range": "42-45",
  "code_snippet": "return userService.update(id, request);",
  "suggestion": "Validate ownership before the write operation.",
  "root_cause": "The controller delegates directly to the service without checking the authenticated user owns the target record.",
  "validation": "Skipped: lightweight review-only mode",
  "pr_url": "https://github.com/org/backend-service/pull/123"
}
```

`scan-result.json` is the single source of truth for PDF and Feishu rendering. Leave `feishu.status` as `"not_sent"` and `report.status` as `"not_generated"` when you write this file — the wrapper script fills in the real values after your run finishes and rewrites the file. Do not set these fields to `"sent"` or `"generated"` yourself.

The wrapper script (`render-report-and-notify.py`) generates HTML and PDF from your JSON after you exit. Ensure every finding field is accurate and complete.
