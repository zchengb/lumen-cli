# Lumen CLI

Lumen scans recent git commits across your local repositories for code quality, security, and reliability issues using the Cursor CLI agent. It tracks findings over time, can open fix PRs for confirmed High severity items, and ships a standalone HTML dashboard that opens in any browser — no server, no Python required to view it.

## Install

### One-command install (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/zchengb/lumen-cli/main/get.sh | bash
```

This downloads the latest [GitHub release](https://github.com/zchengb/lumen-cli/releases) zip (or falls back to the `main` branch source if no release exists yet), then runs `install.sh` for you.

To install **and** initialize a scan workspace in one step, pass a directory after `--`:

```bash
curl -fsSL https://raw.githubusercontent.com/zchengb/lumen-cli/main/get.sh | bash -s -- ~/my-scan-workspace
```

Env overrides: `LUMEN_REPO` (fork/mirror), `LUMEN_VERSION` (pin a release tag), `LUMEN_HOME`, `LUMEN_BIN_DIR`.

### Manual install (from a downloaded zip)

```bash
unzip lumen-*.zip
cd lumen-*
./install.sh
```

Both install paths install:

- `~/.local/bin/lumen` — the CLI entrypoint
- `~/.lumen/` — CLI library, workspace templates, and project registry (`projects.json`)

If `~/.local/bin` is not already on your `PATH`, the installer prints the line to add to your shell profile (`~/.zshrc` or `~/.bashrc`).

### Install and initialize in one command (manual zip)

```bash
./install.sh ~/my-scan-workspace
```

## Quick Start

```bash
cd ~/Projects/my-project
lumen init
```

This creates one Lumen workspace: `.lumen/` holds shared runtime/configuration, `repos/` holds stable code checkouts, and `stories/` holds business and technical delivery documents.

`lumen init` asks you a few questions interactively — no manual JSON editing required for a first run:

- Project display name; repositories live together under `repos/`
- Scan window (days) and which Cursor model to use
- Your Feishu webhook URL (optional — written to `.lumen/.env.local` for this project only)
- Your Cursor API key (optional — written to `.lumen/.env.local` as `CURSOR_API_KEY` for scheduled/cron scans)
- Repositories to scan: Lumen scans your project root for local git repositories and opens an interactive checklist (`○` / `●`). Use ↑↓ to move, **Space** to toggle a repository, **Enter** to confirm, `a` to select all, and choose **Continue** when done. You can also add repositories manually by clone URL or local path

You can add, remove, or edit repositories and settings at any time by editing `.lumen/config/repos.json` and `.lumen/config/common.json` directly. If `lumen init` was interrupted, run `lumen init` again — it detects the incomplete `.lumen` folder, removes it, and starts fresh. To skip the prompts and get the raw templates instead (e.g. for scripting), run `lumen init --yes` or pipe input from a non-interactive shell.

```text
Then:
  1. lumen doctor   — verify prerequisites
  2. lumen list     — see your project slug
  3. lumen scan --project <slug>   — run your first scan
  4. lumen dashboard --project <slug>   — opens results in your browser
```

## Commands

| Command | Description |
|---|---|
| `lumen init [dir] [--yes] [--force]` | Create one integrated scan + delivery workspace and configure it interactively (default: current directory). Re-runs after an interrupted init automatically clean up the incomplete `.lumen` folder. Use `--force` to replace a fully configured workspace. |
| `lumen list` | List all registered scan projects (name, slug, workspace) |
| `lumen remove <slug> [--yes]` | Remove a project from Lumen's registry and remove its scheduled scan. The workspace is kept by default; add `--delete-workspace --yes` to permanently delete the registered `.lumen` folder. |
| `lumen rename <slug> --slug <new-slug>` | Change a registered project's slug, for example after removing an older project that was holding the preferred name. |
| `lumen use [slug]` | Set or show the default project slug |
| `lumen register [dir]` | Register an existing workspace (e.g. an `.auto-scan` folder) as a project |
| `lumen scan --project <slug> [--dry-run]` | Run a scan; add `--dry-run` to mock the pipeline without the Cursor agent |
| `lumen schedule` / `lumen schedule list` | List scan and delivery schedules for all registered projects. |
| `lumen schedule scan add [--project <slug>] [--cron "<expr>"] [--dry-run]` | Schedule recurring scans via cron. |
| `lumen schedule delivery add --project <slug> --every 5m` | On macOS, poll approved Stories using launchd and start one matching JIRA Ready for Dev delivery. |
| `lumen watch --project <slug>` | Tail the latest scan log with readable formatting |
| `lumen dashboard --project <slug> [--no-open]` | Refresh `dashboard-data.js` and open `dashboard.html`; pass `--no-open` to skip opening a browser |
| `lumen doctor` | Check installed prerequisites (agent, git, python3, gh, webhook) |
| `lumen config set-webhook <url> [--project <slug>]` | Save the Feishu webhook in a workspace `.env.local` |
| `lumen config set-cursor-api-key <key> [--project <slug>]` | Save `CURSOR_API_KEY` in a workspace `.env.local` (for scheduled scans) |
| `lumen config set-gh-token <token> [--host <host>] [--project <slug>]` | Save `GH_TOKEN` / `GH_HOST` for scheduled PR creation on GitHub Enterprise |
| `lumen config set-scan-window <days> [--project <slug>]` | Set how many days of git history each scan inspects (`execution.scan_window_days`) |
| `lumen config show` / `lumen config unset-webhook` | Show workspace settings or remove the Feishu webhook |
| `lumen config unset-cursor-api-key [--project <slug>]` | Remove `CURSOR_API_KEY` from a workspace |
| `lumen upgrade [--cli-only] [--project <slug>]` | Upgrade the installed CLI and add any missing workspace templates. Editable prompt files in `prompts/scan/` and `prompts/delivery/` are preserved. Use `--cli-only` to upgrade only the CLI. |
| `lumen version` | Print the installed CLI version |
| `lumen delivery dashboard [workspace-dir]` | Render the Delivery history dashboard |
| `lumen help` | Show usage |

## Delivery Docs (Business → Technical → Development)

`lumen init` includes the delivery docs template for story-driven development with Codex, Cursor, or another Agent.

```bash
lumen init ~/Projects/mbpass-workspace
```

This creates one workspace with:

| Loop | Standard file | Output |
|---|---|---|
| Business Loop | `standards/business-loop.md` | `story.md` |
| Technical Loop | `standards/technical-loop.md` | detailed `technical-plan.md` |
| Development Loop | `standards/development-loop.md` + Lumen CLI coding guideline | code changes and PR via `lumen delivery run` |

Typical flow:

1. **Business Loop** — clarify requirements in `story.md`, optionally publish to Jira.
2. **Technical Loop** — inspect repositories and write a file-level `technical-plan.md`.
3. **Development Loop** — from the workspace root, run `lumen delivery run --story <slug>` to implement the approved plan with the Lumen coding guideline.

```bash
cd ~/Projects/mbpass-workspace
lumen delivery run --story MBPAS-1505
```

`AGENTS.md` is the primary agent contract. Status lives in each story's `metadata.json`.

Source base checkouts live under `repos/`, while Lumen creates one isolated feature worktree per Story under `.lumen/worktrees/<story-key>/<repo>/`. Auto-scan and delivery share the same repository list, secrets, JIRA setup, and workspace. Multiple Story worktrees may coexist, while automated `lumen delivery run` executions are serialized per workspace so shared verification resources and delivery state cannot collide.

When mandatory verification fails, delivery remains in the same feature worktree and Lumen starts a bounded remediation loop by default: it gives the Agent the failed check evidence, permits the smallest Story-scope correction, and reruns the full verification profile. The default is two remediation attempts. After that, delivery stays `In Progress` for human review; it never commits, pushes, or opens a PR from a failing run. Configure this in `.lumen/config/delivery.json`:

```json
{
  "verification": {
    "remediation": { "enabled": true, "max_attempts": 2 }
  }
}
```

At the end of every real delivery, Lumen commits and pushes only the current Story's `metadata.json` to the docs repository using `Update <story-key> delivery status`. Other dirty or staged docs files are deliberately excluded.

To refresh templates in an existing docs repo:

```bash
lumen set-up-docs ~/Projects/mbpass-docs --force
```

### Feishu webhook (per workspace)

Each workspace stores its own Feishu webhook in `<workspace>/.env.local`:

```bash
lumen config set-webhook https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx --project mbpass
lumen config set-scan-window 14 --project mbpass
lumen config show --project mbpass
```

Resolution order for Feishu webhook (highest priority first):
1. `FEISHU_WEBHOOK_URL` set in your current shell
2. `<workspace>/.env.local` (set during `lumen init` or with `lumen config set-webhook`)

### Scan window

Each workspace stores the scan window in `<workspace>/config/common.json` as `execution.scan_window_days` (default: `7`). The agent inspects commits and diffs from the last N days on each run.

```bash
lumen config set-scan-window 14 --project mbpass
lumen config show --project mbpass
```

Valid range: **1–365** days. Open issues in the issue registry are still carried across scan windows regardless of this setting.

### Jira integration (TWG CLI)

Lumen can create Jira **Bug** work items for **High** and **Medium** findings after each scan, using the [Atlassian TWG CLI](https://developer.atlassian.com/cloud/twg-cli/).

**1. Install and authenticate TWG CLI**

```bash
curl -fsSL https://teamwork-graph.atlassian.com/cli/install -o twg-install.sh
bash twg-install.sh
twg login
twg doctor
```

**2. Enable Jira sync in your workspace**

During `lumen init`, you can enable Jira interactively. Lumen calls `twg spaces query` to list your visible Jira projects and lets you pick one (similar to repository selection). If sprint assignment is enabled, it also resolves the board via `twg jira board query`.

```bash
lumen config set-jira --enable --project-key MBPAS --board-id 186 --project mbpass
```

Or run interactively (lists Jira projects via `twg spaces query`, then prompts for active sprint assignment):

```bash
lumen config set-jira --project mbpass
```

You can also edit `<workspace>/config/common.json` directly:

```json
"notifications": {
  "jira": {
    "enabled": true,
    "project_key": "MBPAS",
    "board_id": "186",
    "assign_to_active_sprint": true,
    "issue_type": "Bug",
    "severities": ["High", "Medium"],
    "summary_prefix": "[Lumen]"
  }
}
```

**Project space vs sprint board**

- `project_key` — Jira project key passed to `twg jira workitem create --space` (e.g. `MBPAS`).
- `board_id` — numeric Scrum/Kanban board ID used to resolve the active sprint. This is **not** the project key.
- `assign_to_active_sprint` — when `true` (default when `board_id` is set), Lumen assigns each new bug to the board's active sprint after create.

Find your board ID from any issue already in the current sprint:

```bash
twg jira workitem get MBPAS-1504 --fields sprint -o json
# → data[0].customfield_10020[0].boardId  (e.g. 186)

twg jira sprint snapshot --board-id 186 -o json
# → data.sprint.id  (active sprint id)
```

If `board_id` is omitted but `assign_to_active_sprint` is `true`, Lumen tries to infer the board from an issue in `openSprints()` for that project.

**3. Run a scan**

After `scan-result.json` is written, Lumen calls:

```bash
twg jira workitem create --space MBPAS --type Bug ...
twg jira workitem update --id MBPAS-123 --sprint <active-sprint-id>
```

Rules:

- Creates a ticket only for **new** registry issues (no duplicate Jira keys per `ISSUE-*` id)
- **Low** findings are skipped
- Auth is handled by `twg` (`~/.config/twg/auth.conf`) — no Jira token in `.env.local`
- Failures are recorded in `scan-result.json` → `jira` and do not fail the scan
- If a finding already has a Jira key and a PR is opened later, Lumen adds a PR link comment to the existing card
- Feishu summary cards include a **Jira** link per finding when `jira_key` / `jira_url` is present (after Jira sync runs, before the card is sent)
- Jira sync runs in deterministic Python after the scan agent exits — it does **not** rely on the TWG agent skill (see below)

Check setup with `lumen doctor`.

**TWG skill vs Lumen Jira sync**

`twg` ships an agent skill (`~/.agents/skills/twg`) for interactive assistants (Cursor, Codex, etc.) that need to route natural-language requests to typed `twg` commands. Lumen's post-scan pipeline has no LLM at that step, so `jira_sync.py` calls the same `twg` CLI directly. Do not move Jira creation into the scan agent prompt — that would risk duplicate tickets, the same way Feishu/PDF are kept out of the agent.

### Severity classification

Findings use Lumen's three-tier operational standard: **High**, **Medium**, **Low**. This is not a CVSS score — it is a triage label for local code review, automated PR policy, and Feishu card color.

The canonical rules live in `prompts/scan/09-severity-guideline.md`:

- **High** — confirmed issue with realistic production impact (security, data loss, auth bypass, critical-path failure). Eligible for automated PRs when the fix policy also passes.
- **Medium** — confirmed but limited-impact bugs. Report only.
- **Low** — minor or low-confidence items. Report only.

The agent must have code evidence, impact, and a realistic trigger before assigning severity. When unsure, choose the lower tier.

### Modular scan prompts

The scan agent instructions are split into snippet files under `prompts/scan/`. `prompts/scan/manifest.json` defines load order; `run-scan.sh` composes them at scan time via `compose_scan_prompt.py`.

Delivery instructions use the same model under `prompts/delivery/`. Its `manifest.json` defines the delivery-only load order. The two directories are intentionally never composed together.

Edit individual snippets to customize one concern (for example severity rules) without maintaining one giant file. During an upgrade, Lumen preserves existing prompt files and adds only missing defaults. Older workspaces using `config/prompts/` are moved to the new layout; the old directory is retained only in the timestamped template backup.

### Scheduled scans

Lumen keeps scan and delivery schedules under one command family:

```bash
lumen schedule scan add --project mbpass --cron "0 9 * * *"
lumen schedule delivery add --project mbpass --every 5m
lumen schedule list
lumen schedule scan remove --project mbpass
lumen schedule delivery remove --project mbpass
```

Delivery is intentionally opt-in. To poll every five minutes, Lumen pulls a clean docs checkout and starts at most one Story only when its business and technical metadata are approved and its JIRA status is `Ready for Dev`:

```bash
lumen schedule delivery add --project mbpass --every 5m
lumen schedule delivery list
```

Completed delivery feature worktrees are removed automatically. Failed runs retain their worktrees for investigation.

The cron expression uses the standard 5-field format (`minute hour day-of-month month day-of-week`). Scheduled runs are appended to `crontab` with a `# lumen-schedule:<slug>` marker and log to `<workspace>/logs/schedule.log`. Add `--dry-run` to schedule mock runs (no Cursor agent, no PRs, no Feishu).

Cron jobs run with a minimal environment. Lumen sets a short `PATH`, `HOME`, `SHELL`, and `AGENT_CLI_CREDENTIAL_STORE=file` in crontab (the last avoids macOS Keychain access, which cron cannot use). Scheduled scans also need **`CURSOR_API_KEY`** in `<workspace>/.env.local` — interactive `agent login` tokens are not available to cron on macOS. Get a key from **Cursor Settings > API Keys**. For automated PR creation on GitHub Enterprise, also add **`GH_TOKEN`** and **`GH_HOST`** to `.env.local` (`lumen config set-gh-token <token> --host mercedes-benz.ghe.com --project <slug>`). Interactive `gh auth login` / macOS Keychain is not available to cron. If scheduled scans fail silently, upgrade to v1.12.1+ and re-run `lumen schedule add` with the same cron expression to refresh the crontab entry (older versions could write a PATH line long enough for cron to truncate).

### Scan notifications

Every `lumen scan` (manual or scheduled) sends a desktop notification when the scan starts and when it finishes or fails — on macOS via Notification Center (`osascript`), on Linux via `notify-send` if installed. No configuration needed.

### Multi-project workflow

Lumen keeps a central project registry at `~/.lumen/projects.json`. Each project has a **name**, a short **slug**, and a **workspace** path.

```bash
lumen list
```

```text
NAME                 SLUG                 WORKSPACE
* MBPass               mbpass               /Users/you/Projects/MBPass/.auto-scan
  Other Project        other-project        /Users/you/other/.auto-scan

* = default project (set with 'lumen use <slug>')
```

**Select a project by slug:**

```bash
lumen scan --project mbpass
lumen watch --project mbpass
lumen dashboard --project mbpass
```

**Set a default** (then `lumen scan` works without `--project`):

```bash
lumen use mbpass
lumen scan
```

**Scripts:**

```bash
LUMEN_PROJECT=mbpass lumen scan
```

**Dry-run (verify the pipeline without a real scan):**

```bash
lumen scan --project mbpass --dry-run
```

Dry-run mode:
- Skips the Cursor agent, git worktrees, PR creation, and Feishu sending
- Writes a mock `scan-result.json`
- Generates the HTML report and refreshes `dashboard-data.js`
- Does not modify `state/issue-registry.json`

`lumen init` registers the new workspace automatically. For an existing workspace (such as a legacy `MBPass/.auto-scan` folder), run:

```bash
lumen register /path/to/your/project
lumen scan --project mbpass
```

Legacy layouts with config at the project root (not under `.lumen/`) are still supported for `lumen register` and `lumen scan --workspace`.

Every scan-related command resolves the workspace in this order:

1. `--project <slug>`
2. `LUMEN_PROJECT` environment variable (slug)
3. `--workspace <dir>`
4. `./.lumen/` in the current directory
5. Current directory if it is already a Lumen workspace (legacy layout)
6. Default project (`lumen use <slug>`)
7. Single registered project (auto-selected)
8. Interactive project picker (if multiple projects and terminal is interactive)

## Prerequisites

| Tool | Required for | If missing |
|---|---|---|
| [Cursor CLI](https://cursor.com/cli) (`agent`) | Running scans | `lumen scan` cannot start |
| **Python 3** | Reports, Feishu, dashboard, project registry, init helpers | Most commands fail or skip post-processing |
| git | Worktree-based repository scanning | Required |
| GitHub CLI (`gh`) | Automated PR creation for High findings | Scan still runs; findings reported without PRs |
| `FEISHU_WEBHOOK_URL` in workspace `.env.local` (or shell env) | Feishu scan summary notifications | Scan still runs; notification marked "not sent" |
| Google Chrome / Chromium / Edge | PDF export (uses system browser, no extra install) | HTML report still generated |

Install Python 3 on macOS if needed:

```bash
xcode-select --install
# or
brew install python3
```

Run `lumen doctor` after installing to check all of the above.

## Workspace Layout

A workspace created by `lumen init` looks like this:

```text
my-project/                 ← one Lumen project workspace
  AGENTS.md                  ← shared AI agent contract
  stories/                   ← story.md, technical-plan.md, metadata.json
  standards/                 ← business / technical / development loop rules
  repos/                     ← stable base checkouts shared by scan and delivery
    service-a/
    web-app/
  .lumen/                    ← shared scan + delivery runtime
    .env.common.example
    .env.local.example
    .env.local              (create this; never commit it)
    .gitignore
    dashboard.html          standalone dashboard (open directly in a browser)
    dashboard-data.js       generated after each scan
    config/
      common.json           product name, execution mode, paths, retention
      repos.json            repositories to scan (edit this)
      runtime-profiles.json safety profiles per language/stack
      feishu-card-template.json
    prompts/                editable, mode-isolated agent instructions
      scan/                 composed only by `lumen scan`
        manifest.json
        09-severity-guideline.md
      delivery/             composed only by `lumen delivery run`
        manifest.json
        01-role.md
    tmp/                    run metadata only
    worktrees/              scan review worktrees and <story>/<repo> delivery worktrees
    reports/                generated HTML/PDF reports
    results/                scan-result-*.json history
    logs/                   run-*.log (readable with 'lumen watch')
    state/
      issue-registry.json   persistent finding tracker
    logs/delivery/
    history/delivery/
```

## Uninstall

```bash
./uninstall.sh
```

This removes the installed CLI and library. Any scan workspaces you created with `lumen init` are left untouched — delete them manually if no longer needed.

## Packaging a New Release (maintainers)

Releases are automated via GitHub Actions (`.github/workflows/release.yml`): pushing a `v*.*.*` tag builds `lumen-<version>.zip` with `package.sh` and publishes it as a GitHub Release asset, which `get.sh` (the one-command installer) downloads automatically.

```bash
./release.sh 1.6.1                    # bumps VERSION, commits, tags v1.6.1
git push origin main --follow-tags    # triggers the Release workflow
```

To build the zip locally without cutting a release (e.g. for manual distribution):

```bash
./package.sh
```

Produces `build/lumen-<version>.zip`, ready to upload to GitHub Releases or a shared drive by hand.

## Security Notes

- Secrets are never written to `scan-result.json`, reports, logs, or Feishu cards — Lumen redacts suspected secret values as `[REDACTED]`.
- `.env.local` is git-ignored by the generated workspace `.gitignore` and must never be committed.
- Lumen never modifies your original repository working directories; all review and fixes happen inside dedicated git worktrees under `worktrees/`.
