## Configuration Model

Keep the automation reusable. Do not hardcode team-specific repository names, local paths, branch names, notification URLs, or project rules in this prompt or in scripts.

Use this configuration split:

- `.env.common`: optional shared non-secret environment defaults.
- `.env.local`: optional local secrets and machine-specific overrides. This file must not be committed.
- `config/common.json`: reusable workspace defaults, paths, execution mode, notification variable names, and Git behavior.
- `config/repos.json`: the only place for concrete repository names, repository paths, default branches, runtime profiles, and per-repository PR settings.
- `config/runtime-profiles.json`: reusable safety profiles and blocked command patterns.
- `config/feishu-card-template.json`: reusable card rendering template.
- `prompts/scan/`: modular scan instructions composed at run time.
- `state/issue-registry.json`: persistent local issue registry used to avoid duplicate or inconsistent issue handling across runs.

Environment loading order:

```text
1. .env.common
2. .env.local
3. existing process environment
```

The Feishu webhook must be provided through `FEISHU_WEBHOOK_URL` in this workspace's `.env.local` file (set during `lumen init` or with `lumen config set-webhook <url> --project <slug>`). Never store the real webhook URL in JSON, prompt files, reports, logs, PR descriptions, or Feishu card content.

Use this local workspace layout:

```text
<workspace_root>/
  .env.common
  .env.local
  config/
    common.json
    repos.json
    runtime-profiles.json
    feishu-card-template.json
  prompts/
    scan/
      manifest.json
      *.md
  <tmp_dir>/
    run-YYYYMMDD-HHMMSS/
      run metadata only
  <worktrees_dir>/
    <repo-name>/
  <reports_dir>/
    code-quality-security-scan-YYYY-MM-DD.html
    code-quality-security-scan-YYYY-MM-DD.pdf
  <results_dir>/
    scan-result-YYYYMMDD-HHMMSS.json
    scan-result.json
  <logs_dir>/
    run-YYYYMMDD-HHMMSS.log
```
