# Delivery Output Contract

Write the run result to:

`<workspace-root>/lumen/results/delivery-result.json`

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
      "files_changed": ["src/main/java/..."],
      "commit_subject": "feat: add survey filter"
    }
  ],
  "commits": [],
  "pr_urls": [],
  "verification_results": [],
  "failures": [],
  "started_at": "2026-07-08T12:00:00Z",
  "finished_at": "2026-07-08T12:30:00Z"
}
```

Allowed `delivery_status` values:

- `completed` or `ready_for_finalize` — plan implemented and ready for Lumen verification
- `blocked` — cannot proceed safely
- `failed` — implementation attempted but failed

Do not create commits, push branches, or create PRs. Do not hallucinate PR URLs, test results, or commit SHAs. Leave `verification_results` as `[]`; Lumen fills verification, commit, and PR fields after its verification stage succeeds.

Leave `feishu` and `jira` out of the file. The Lumen wrapper fills those after your run.
