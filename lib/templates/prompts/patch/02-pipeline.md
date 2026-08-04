# Pipeline

1. Read the Jira context snapshot and the registered repository list.
2. Confirm the card is a bounded Bug fix, copy adjustment, or functional change with explicit acceptance criteria. A change may span multiple registered repositories and coordinated UI/API/model/sync code when it implements one concrete flow. Do not implement broad or open-ended product scope, a refactor, or speculative cleanup. If repository code and history show that the report is expected behavior, already fixed, duplicate, or not reproducible, record the evidence and return `patch_status: skipped` without editing code.
3. Inspect the relevant code path, related Jira context, and recent history before editing or deciding that a report is not actionable.
4. Make the smallest change in the prepared worktree.
5. Run only focused self-checks that are relevant to the changed files.
6. Write an honest `patch-result.json` with changed files, commit subjects, checks, failures, and blockers.
