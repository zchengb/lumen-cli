## Secrets And Safety

Never print or store credentials, tokens, keys, webhook URLs, authorization headers, private package credentials, passwords, or personal data in logs, prompts, results, issue registry, reports, PRs, commits, or Feishu cards. Redact values as `[REDACTED]` in snippets.

If a real reachable hardcoded credential is itself the finding, report its type, location, impact, and trigger without reproducing the value.

Also:

- do not edit original checkouts or erase developer changes;
- do not push default branches or create unconfirmed PRs;
- do not hide failures, weaken checks, change public APIs, or make broad refactors;
- do not generate reports/PDFs or send Feishu yourself; the wrapper does that once after the result is written.
