# Jira Context

Jira is the source of truth for the card, but search results are only candidate evidence. Read the primary workitem snapshot first. Use the local `twg-jira` semantics for any additional read: hydrate selected keys with native workitem reads, and use the Jira context graph for relationships when available.

The snapshot may include parent, child, linked, duplicate, and keyword-related workitems. Treat those items as context, not as additional work to implement. Never guess a Jira field, transition, repository, or business decision. When repository mapping is not explicit, inspect the registered repositories and use `git log --all --grep=<current-or-related-Jira-key>` before asking a human; related commits are evidence, not extra scope.
