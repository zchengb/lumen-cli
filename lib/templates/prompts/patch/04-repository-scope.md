# Repository Scope

Use only the repositories and worktrees listed in `Patch Runtime Context`. Map the Jira card to a repository using explicit labels, links, paths, and code evidence. A repository name inferred only from a vague keyword is not enough.

If exactly one repository is supported, use it. If several repositories are required by the same concrete flow, list all of them and explain the dependency. If the mapping is ambiguous, unavailable, dirty, or outside the registered repositories, stop with `patch_status: blocked` and ask one question.
