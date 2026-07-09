# Development Loop

The Development Loop implements an approved `technical-plan.md` in code. It is executed by Lumen CLI:

```bash
lumen delivery run <docs-dir> --story <JIRA-KEY-or-slug>
```

## Workspace Layout

Code repositories live inside this docs project:

```text
<docs-repo>/
  repos/
    xxxx-backend/
    xxxx-frontend/
  stories/
  .lumen/
```

Configure repositories in `<docs-repo>/.lumen/config/workspace.json`. When `repositories` is empty, Lumen auto-discovers git repositories under `repos/`.

## Inputs

- Approved `technical-plan.md`
- `story.md` for Acceptance Criteria context
- `metadata.json`
- Lumen coding guideline from the CLI install
- Code repositories listed in `metadata.json.linkedRepos` under `repos/`

## Outputs

- Code changes in impacted repositories
- Feature branch and PR
- Updated `metadata.json.deliveryStatus`
- `delivery-result.json` under `<docs-repo>/.lumen/results/delivery-result.json`
- Optional JIRA status update (`IN DEV` -> `DEV DONE`) when `twg-cli` is authenticated
- Optional Feishu `delivery.started` and `delivery.dev_done` notifications

## Gate

Do not run `lumen delivery run` until:

- `metadata.json.businessStatus` is `ready`
- `metadata.json.technicalStatus` is `approved`
- `technical-plan.md` is detailed enough for file-level implementation

## Lumen CLI Flow

1. Validate story gates and resolve repository paths.
2. Set `deliveryStatus` to `in_progress`.
3. Create or reuse feature worktrees under `<docs-repo>/.lumen/worktrees/<repository>/`.
4. Move JIRA Story to `IN DEV` when `twg-cli` is authenticated.
5. Run the Cursor agent with:
   - delivery prompt snippets
   - `story.md`
   - `technical-plan.md`
   - Lumen coding guideline
6. Agent writes `delivery-result.json` under the workspace root `.lumen/results/`.
7. Lumen reruns mandatory verification checks:
   - Language Grammar Check
   - PMD Check
   - Unit Test
   - Integration Test
8. Lumen updates `metadata.json`, moves JIRA to `DEV DONE`, and sends `delivery.dev_done`.

## Implementation Rules

- Follow the Lumen coding guideline injected by the CLI.
- Implement only what the approved plan contains.
- Prefer the smallest safe diff.
- Reuse existing patterns in each repository.
- Do not edit `story.md` during development except when the Business Loop is reopened.

## Delivery Status

Valid `deliveryStatus` values:

- `not_started` — plan approved but no code work yet
- `in_progress` — Lumen delivery run is active
- `blocked` — cannot proceed because of environment, dependency, or missing decision
- `dev_done` — code complete locally but no PR yet
- `pr_open` — PR created and awaiting review or merge
- `done` — change merged or accepted as complete

## Definition Of Done

Development is done when:

- All plan steps are implemented
- Verification from the plan was run or explicitly documented
- Coding standards were followed
- PR is created or the user explicitly accepts local-only completion
- `metadata.json.deliveryStatus` is updated
