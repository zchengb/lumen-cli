# Repository Scope

Use only the repositories and worktrees listed in `Patch Runtime Context`. Map the Jira card to a repository using explicit labels, links, paths, and code evidence. A repository name inferred only from a vague keyword is not enough.

If the latest human Jira reply names one or more exact registered repositories, treat that reply as the repository selection and inspect every named worktree. If several repositories are required by the same concrete flow, list all of them and explain the dependency. Do not add an unlisted repository just because a keyword matches. If the mapping is ambiguous, unavailable, dirty, or outside the registered repositories, stop with `patch_status: blocked` and ask one question.
