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
- PR URL only when a High finding was fixed and a PR was actually created.

A valid finding must have code evidence, concrete impact, and a realistic trigger.

Avoid vague findings such as:

- "This might be risky."
- "Consider improving code quality."
- "Potential bug without trigger."
- "Could be refactored."
- "Maybe unsafe."

## Automated Fix And PR Policy

Create a real GitHub PR only when all conditions are true:

- The finding is confirmed.
- Severity is High.
- The trigger scenario is realistic.
- The fix is safe, minimal, and low risk.
- The change is limited to the affected behavior.
- The repository worktree is clean before the fix.
- GitHub CLI authentication is available.
- Local validation is skipped by review-only policy and this limitation is clearly documented.
- The repository config allows auto-fix and PR creation.

Do not create PRs for Medium findings, Low findings, speculative findings, style-only changes, broad refactors, risky rewrites, or issues requiring product decisions.

For each qualifying High finding:

1. Create a branch in the worktree.
2. Apply the smallest safe fix.
3. Add or update focused tests when practical.
4. Do not run local validation commands.
5. Record validation as `Skipped: lightweight review-only mode`.
6. Inspect local Git config and recent commit history.
7. Commit the change on the new `auto-fix/<repo-name>/<short-finding-slug>` branch using a repository-consistent commit message.
8. Push only the new branch to origin.
9. Create a GitHub PR with `gh pr create`.
10. Record the PR URL in `scan-result.json`.

If any step fails, record the exact failure reason. Do not hallucinate success.
