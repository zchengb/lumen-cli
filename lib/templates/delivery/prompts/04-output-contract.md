# Delivery Output Contract

Write the run result to:

`<workspace-root>/.lumen/results/delivery-result.json`

Overwrite any previous file for this run.

Schema:

```json
{
  "delivery_status": "completed",
  "docs_dir": "/absolute/path/to/docs-repo",
  "workspace_root": "/absolute/path/to/workspace-root",
  "story_id": "MBPAS-123",
  "story_path": "stories/MBPAS-123-example",
  "jira_key": "MBPAS-123",
  "branch": "feature/MBPAS-123-example",
  "repos_touched": [
    {
      "name": "mbpass-business",
      "path": "/absolute/path/to/worktree",
      "branch": "feature/MBPAS-123-example",
      "files_changed": ["src/main/java/..."]
    }
  ],
  "commits": [
    {
      "repository": "mbpass-business",
      "sha": "abc1234",
      "subject": "[MBPAS-123] feat: add survey filter"
    }
  ],
  "pr_urls": [
    "https://example.com/org/mbpass-business/pull/1"
  ],
  "verification_results": [
    {
      "repository": "mbpass-business",
      "id": "pmd",
      "label": "PMD Check",
      "command": "./gradlew pmdMain pmdTest",
      "exit_code": 0,
      "status": "passed",
      "summary": "Passed"
    }
  ],
  "failures": [],
  "started_at": "2026-07-08T12:00:00Z",
  "finished_at": "2026-07-08T12:30:00Z"
}
```

Allowed `delivery_status` values:

- `completed` — plan implemented and verification recorded
- `blocked` — cannot proceed safely
- `failed` — implementation attempted but failed

Do not hallucinate PR URLs, test results, or commit SHAs.

Leave `feishu` and `jira` out of the file. The Lumen wrapper fills those after your run.
