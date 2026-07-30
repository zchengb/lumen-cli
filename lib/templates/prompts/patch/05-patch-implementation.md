# Patch Implementation

Inspect `git log --oneline -n 20`, the relevant callers, validation, and nearby tests before editing. Reuse existing helpers and conventions. Preserve security, authorization, input validation, data scope, and backward compatibility.

For copy changes, change only the requested user-facing text and preserve localization, accessibility labels, formatting, and product terminology. For Bug fixes, correct the root cause shared by the affected callers rather than adding duplicated caller-specific guards.

Do not change Jira, docs Story gates, repository configuration, generated assets, or unrelated files unless the card explicitly requires it.
