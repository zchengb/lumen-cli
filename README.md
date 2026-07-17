# Lumen CLI

Lumen is a local, AI-assisted engineering control plane. It provides two connected workflows:

1. **Scan**: examine recent repository change, maintain a durable issue registry, publish reports, and optionally prepare scoped pull requests.
2. **Delivery**: turn an approved Story and technical plan into isolated worktrees, verified changes, pull requests, and an auditable delivery record.

The system is intentionally local-first. Source repositories, configuration, credentials, logs, reports, and Dashboard state remain on the operator's machine unless a configured integration explicitly sends an artifact to Git hosting, Jira, or Feishu.

## Design Principles

- **Explicit authority**: approved Story documents and technical plans govern delivery; raw conversation is not a substitute for them.
- **Isolation**: each Story uses a dedicated feature branch and worktree per affected repository.
- **Evidence**: scan findings, verification results, pull requests, and status transitions are materialized as local records.
- **Minimal intervention**: Lumen changes only the configured workspace and never writes directly to a default branch.
- **Human control**: scheduling and automation are configurable; pull request review and merge remain outside the default automation boundary.

## Installation

### Release installer

```bash
curl -fsSL https://raw.githubusercontent.com/zchengb/lumen-cli/main/get.sh | bash
```

The installer places the executable in `~/.local/bin/lumen` and the supporting library in `~/.lumen/`.

### Local checkout

```bash
git clone https://github.com/zchengb/lumen-cli.git
cd lumen-cli
./install.sh
```

Run `lumen doctor` after installation to inspect required and optional local dependencies.

## Workspace Model

Run `lumen init` from an empty project root or an existing documentation repository.

```text
engineering-workspace/
  repos/                       stable repository checkouts
  stories/                     business contracts and technical plans
  standards/                   business, technical, and development loop rules
  AGENTS.md                    persistent agent contract
  lumen/                       local Lumen control plane
    config/                    runtime, repository, and integration configuration
    prompts/
      scan/                    editable scan instructions
      delivery/                editable delivery instructions and coding guideline
    worktrees/                 ephemeral Story worktrees
    results/                   current scan and delivery outputs
    history/                   archived delivery runs
    logs/                      local execution logs
    reports/                   generated HTML and PDF reports
    state/                     issue registry and local Dashboard state
```

`repos/` holds reusable base checkouts. Delivery work never occurs in those base checkouts: it occurs in `lumen/worktrees/<story>/<repository>/`.

## Business and Technical Loop Skills

Install the explicitly invoked, project-scoped workflow skills for Claude Code, Cursor, and Codex:

```bash
lumen skills install --workspace ~/Projects/engineering-workspace --platform all
```

Lumen keeps the canonical packages in `lumen/skills/`; the generated platform adapters are thin pointers. Existing unmanaged adapter files are preserved unless `--force` is supplied.

## Quick Start

```bash
cd ~/Projects/engineering-workspace
lumen init
lumen doctor
lumen list
```

Lumen records registered workspaces locally. Select the default when working with more than one:

```bash
lumen use <project-slug>
```

## Scan Workflow

The Scan workflow is intended for continuous review of configured repositories. It reads a bounded commit window, asks the configured agent to identify credible issues, persists issue identity across runs, then produces deterministic reports and notifications.

```bash
lumen scan --project <project-slug>
lumen issue list --project <project-slug>
lumen issue ignore ISSUE-<id> --project <project-slug> --reason "Out of scope"
```

Issue decisions are stored in `lumen/state/issue-registry.json`. Ignoring a finding changes only that local registry; it does not modify source code, report history, or remote trackers.

### Scan Scheduling

On macOS, schedules are installed as user-level `launchd` agents.

```bash
lumen schedule scan add --project <project-slug> --cron "0 9 * * 1-5"
lumen schedule scan remove --project <project-slug>
lumen schedule list
```

Supported macOS scan forms are every-N-minutes, daily, and weekday schedules. The Dashboard offers the same configuration through the `AUTO SCAN` view.

## Delivery Workflow

Delivery begins only when a specific Story is business-ready and its technical plan is approved. A Topic is not a delivery unit; split it into concrete Stories first.

```bash
lumen delivery run --story NOVA-101-feature-name
lumen delivery status
```

For an eligible Story, Lumen performs the following sequence:

1. Synchronize the docs repository and configured repositories.
2. Validate Story and technical-plan gates.
3. Create one feature branch and worktree for each affected repository.
4. Move the linked work item into development when Jira integration is enabled.
5. Run the implementation agent with the Story, plan, repository context, and workspace coding guideline.
6. Execute the configured verification profile and, when enabled, bounded remediation.
7. Commit verified changes, push feature branches, create pull requests, update delivery metadata, and move the work item to the configured completion state.
8. Archive a delivery snapshot and remove completed worktrees.

Delivery runs are serialized within one workspace because they share control-plane state and verification resources. Multiple completed or paused Story worktrees may coexist.

### Delivery Scheduling

```bash
lumen schedule delivery add --project <project-slug> --every 5m
lumen schedule delivery remove --project <project-slug>
```

The scheduler polls for Stories that meet the existing document and Jira eligibility gates. It does not bypass an unapproved technical plan.

## Prompts and Coding Guideline

Workspace prompt fragments are editable and versionable:

```text
lumen/prompts/scan/
lumen/prompts/delivery/
  coding-guideline.md
```

`coding-guideline.md` is copied into every new workspace. Delivery composition prefers this workspace copy, so a team can refine its own coding standard without modifying the global CLI installation. The guideline is injected into every delivery Agent prompt together with the Story, technical plan, and repository context.

Refresh missing defaults without replacing local prompt edits:

```bash
lumen upgrade --project <project-slug>
```

## Interactive Dashboard

```bash
lumen dashboard --project <project-slug>
```

The command starts a local service bound only to `127.0.0.1` and opens the full URL with its dynamically allocated port. Its React interface is prebuilt and packaged with Lumen, so operators do not need Node.js, npm, or frontend dependencies. The Dashboard has four views:

| View | Scope |
|---|---|
| `AUTO SCAN` | scan history, tracked findings, ignore decisions, scan schedule |
| `AUTO DELIVERY` | current run, verification evidence, PR history, delivery polling |
| `PROMPTS` | scan prompts, delivery prompts, workspace coding guideline |
| `SETTINGS` | workspace controls, locally managed integration keys, scan window, and schedules |

Use the exact URL printed by Lumen. `http://127.0.0.1` without a port is not the Dashboard address.

Stop the local Dashboard service when it is no longer needed:

```bash
lumen dashboard stop --project <project-slug>
```

For a read-only artifact without the interactive local server:

```bash
lumen dashboard --project <project-slug> --static
```

## Configuration and Credentials

Workspace configuration is stored under `lumen/config/`. Secrets are stored in the workspace-local `lumen/.env.local`, which is ignored by Git.

```bash
lumen config set-webhook <feishu-webhook-url> --project <project-slug>
lumen config set-cursor-api-key <api-key> --project <project-slug>
lumen config set-gh-token <token> --host <git-host> --project <project-slug>
lumen config set-scan-window 14 --project <project-slug>
```

Jira integration uses the locally authenticated TWG CLI. Configure it through `lumen config set-jira`; authenticate TWG separately before scheduled or delivery operations.

## Command Reference

| Command | Purpose |
|---|---|
| `lumen init [dir]` | Initialize an integrated Scan and Delivery workspace |
| `lumen register [dir]` | Register an existing workspace |
| `lumen list`, `lumen use <slug>` | Inspect and select local workspaces |
| `lumen scan` | Run one review cycle |
| `lumen issue list`, `lumen issue ignore` | Inspect and govern tracked findings |
| `lumen schedule` | Manage Scan and Delivery schedules |
| `lumen delivery run --story <story>` | Execute one approved Story |
| `lumen delivery status` | Show latest delivery progress and evidence |
| `lumen skills install --workspace <path> --platform all` | Install explicit Business and Technical Loop skills |
| `lumen dashboard` | Open the interactive local control plane |
| `lumen upgrade` | Update CLI and refresh missing workspace defaults |

## Operational Boundary

Lumen does not automatically merge pull requests or deploy to production. CI/CD monitoring and deployment automation can be layered on later, but they are intentionally outside the default local execution path.
