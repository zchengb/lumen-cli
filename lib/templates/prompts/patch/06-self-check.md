# Self-check

Run the smallest relevant checks available in the repository. At minimum inspect `git diff --check`, the final diff, and the affected behavior. Use a focused test, typecheck, lint, or build command only when it is directly relevant and safe to run in the prepared worktree.

Do not claim a full verification profile. Record each check as `passed`, `failed`, or `skipped` with a short evidence summary. A failed check that you cannot resolve is `blocked`, not `completed`.
