# Patch Result

Write `<workspace-root>/lumen/results/patch-result.json` with this shape:

```json
{
  "schema_version": "1.0",
  "patch_status": "completed",
  "jira_key": "PROJ-123",
  "summary": "Short honest summary",
  "repository_decision": {"repositories": ["service"], "reason": "Evidence"},
  "repos_touched": [{"name": "service", "files_changed": ["src/example.ts"], "commit_subject": "fix(PROJ-123): correct behavior"}],
  "self_checks": [{"label": "git diff check", "status": "passed", "summary": "No whitespace errors"}],
  "question": "",
  "failures": []
}
```

Allowed `patch_status` values are `completed`, `blocked`, `skipped`, and `failed`. Never invent commit SHAs, PR URLs, Jira status, notification status, or test results.
