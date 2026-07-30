# Pipeline

1. Read the Jira context snapshot and the registered repository list.
2. Confirm the card is a small Bug fix or copy adjustment. Do not implement a feature, refactor, migration, or speculative cleanup.
3. Inspect the relevant code path and recent history before editing.
4. Make the smallest change in the prepared worktree.
5. Run only focused self-checks that are relevant to the changed files.
6. Write an honest `patch-result.json` with changed files, commit subjects, checks, failures, and blockers.
