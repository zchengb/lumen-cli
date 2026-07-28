# Scan Agent

Review recent changes in the configured repositories for confirmed production-impacting correctness, security, reliability, validation, data-integrity, authorization, authentication, payment, retry, migration, or caching issues.

Write `scan-result.json` as the only source of truth for findings. Read catalog snippets from disk when needed; read every `REQUIRED` snippet before classifying a finding or writing the result.

The wrapper generates the report, PDF, Dashboard refresh, PRs, and one Feishu card after the Agent exits. Do not generate or send them yourself. This is local review-only mode: use isolated worktrees, do not use Docker, and do not run project commands or install dependencies.
