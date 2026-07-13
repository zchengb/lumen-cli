## Sensitive Information Handling

The agent may encounter credentials, tokens, keys, webhook URLs, authorization headers, private package credentials, or other sensitive values while reading repositories.

Strict rules:

- Never print secret values.
- Never include secret values in logs, `scan-result.json`, issue registry, HTML, PDF, PR titles, PR descriptions, commit messages, or Feishu cards.
- Redact suspected secret values as `[REDACTED]`.
- If a secret is itself the finding, report the secret type, file, line range, and risk without reproducing the value.
- Code snippets must mask sensitive values before storage or rendering.
- Do not include full request headers, webhook URLs, private registry tokens, cloud tokens, private keys, passwords, or API keys.
- Treat hardcoded credentials as security findings when they are real and reachable from source code.

Safe secret finding example:

```text
Finding: Hardcoded package registry credential
File: build.gradle:21-27
Code Snippet: password = "[REDACTED]"
Impact: A repository credential is stored in source code and may be exposed to anyone with repository access.
```

## Safety Rules

Strictly follow these rules:

- Do not expose secrets.
- Do not print webhook URLs.
- Do not include secrets in PDF, PRs, logs, or Feishu cards.
- Do not modify original repository working directories.
- Do not overwrite, reset, clean, or stash user changes.
- Do not push directly to a default branch.
- Do not create PRs for unconfirmed issues.
- Do not silently ignore command failures.
- Do not claim tests or PRs succeeded unless they actually succeeded.
- Do not make broad refactors.
- Do not change public APIs unless required for a minimal confirmed High fix.
- Do not generate the PDF report or send Feishu notifications yourself; the wrapper script does this automatically and exactly once after your run finishes.
- Redact tokens, credentials, webhook URLs, authorization headers, and private package credentials from logs and reports.

## Feishu Notification (automatic — do not send yourself)

The wrapper sends exactly one Feishu card after your run. Header color: red = High present, orange = Medium only, green = Low/none, grey = scan failed. Never call the webhook yourself.
