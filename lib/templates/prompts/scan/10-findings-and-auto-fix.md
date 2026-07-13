## Finding Requirements

Every reported finding must include:

- Short title.
- Severity (per the severity guideline).
- Repository.
- Impact.
- Trigger scenario.
- File path with exact line range.
- Code snippet.
- Suggestion.
- Root cause (why the bug exists).
- PR URL only when a High finding was fixed and a PR was actually created by the post-scan step (leave empty when you finish your run).

A valid finding must have code evidence, concrete impact, and a realistic trigger.

Avoid vague findings such as:

- "This might be risky."
- "Consider improving code quality."
- "Potential bug without trigger."
- "Could be refactored."
- "Maybe unsafe."

## Automated Fix And PR Policy

Create a local auto-fix commit only when all conditions are true:

- The finding is confirmed.
- Severity is High.
- The trigger scenario is realistic.
- The fix is safe, minimal, and low risk.
- The change is limited to the affected behavior.
- The repository worktree is clean before the fix.
- Local validation is skipped by review-only policy and this limitation is clearly documented.
- The repository config allows auto-fix and PR creation.

Do not create fixes for Medium findings, Low findings, speculative findings, style-only changes, broad refactors, risky rewrites, or issues requiring product decisions.

For each qualifying High finding:

1. Create a branch in the worktree.
2. Apply the smallest safe fix.
3. Add or update focused tests when practical.
4. Do not run local validation commands.
5. Record validation as `Skipped: lightweight review-only mode`.
6. Inspect local Git config and recent commit history.
7. Commit the change on the new `auto-fix/<repo-name>/<short-finding-slug>` branch using a repository-consistent commit message.
8. Record `auto_fix` metadata on the finding (see output contract). Do not push the branch or run `gh`.
9. Leave `pr_url` empty. The wrapper script pushes the branch and opens the GitHub PR after your run exits.

If any step fails, record the exact failure reason in `auto_fix.status` / `auto_fix.error`. Do not hallucinate success.
