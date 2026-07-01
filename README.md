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

This creates a `.lumen/` folder inside your project root with all scan configuration and outputs. Your application code stays untouched at the project root.

`lumen init` asks you a few questions interactively — no manual JSON editing required for a first run:

- Project display name and where your repositories live locally
- Scan window (days) and which Cursor model to use
- Your Feishu webhook URL (optional — written to `.lumen/.env.local` for this project only)
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
| `lumen init [dir] [--yes] [--force]` | Create a new scan workspace and interactively configure it (default: current directory). Re-runs after an interrupted init automatically clean up the incomplete `.lumen` folder. Use `--force` to replace a fully configured workspace. |
| `lumen list` | List all registered scan projects (name, slug, workspace) |
| `lumen use [slug]` | Set or show the default project slug |
| `lumen register [dir]` | Register an existing workspace (e.g. an `.auto-scan` folder) as a project |
| `lumen scan --project <slug> [--dry-run]` | Run a scan; add `--dry-run` to mock the pipeline without the Cursor agent |
| `lumen schedule add --project <slug> --cron "<expr>" [--dry-run]` | Schedule recurring scans via cron |
| `lumen schedule remove --project <slug>` | Remove a project's scheduled scan |
| `lumen schedule list` | List all configured schedules |
| `lumen watch --project <slug>` | Tail the latest scan log with readable formatting |
| `lumen dashboard --project <slug> [--no-open]` | Refresh `dashboard-data.js` and open `dashboard.html`; pass `--no-open` to skip opening a browser |
| `lumen doctor` | Check installed prerequisites (agent, git, node/python, gh, webhook) |
| `lumen config set-webhook <url>` | Set a Feishu webhook used by all projects by default |
| `lumen config show` / `lumen config unset-webhook` | Inspect or remove the global webhook config |
| `lumen version` | Print the installed CLI version |
| `lumen help` | Show usage |

### Feishu webhook: global vs per-project

You can set the Feishu webhook once for all projects instead of repeating it in every workspace:

```bash
lumen config set-webhook https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx
```

This is stored in `~/.lumen/env` and used automatically by every scan and by `lumen doctor`, unless a specific project overrides it in its own `.env.local`.

Resolution order (highest priority first):
1. `FEISHU_WEBHOOK_URL` set in your current shell
2. `<workspace>/.env.local` (per-project override, created by `lumen init`)
3. `~/.lumen/env` (global default set with `lumen config set-webhook`)

### Scheduled scans

Lumen can run scans on a recurring schedule via cron:

```bash
lumen schedule add --project mbpass --cron "0 9 * * *"     # daily at 09:00
lumen schedule add --project mbpass --cron "0 */6 * * *"   # every 6 hours
lumen schedule list
lumen schedule remove --project mbpass
```

The cron expression uses the standard 5-field format (`minute hour day-of-month month day-of-week`). Scheduled runs are appended to `crontab` with a `# lumen-schedule:<slug>` marker and log to `<workspace>/logs/schedule.log`. Add `--dry-run` to schedule mock runs (no Cursor agent, no PRs, no Feishu).

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
| git | Worktree-based repository scanning | Required |
| Node.js **or** Python 3 | Rendering `dashboard-data.js` | Node preferred; falls back to Python 3 |
| GitHub CLI (`gh`) | Automated PR creation for High findings | Scan still runs; findings reported without PRs |
| `FEISHU_WEBHOOK_URL` (global config, per-project `.env.local`, or shell env) | Feishu scan summary notifications | Scan still runs; notification marked "not sent" |

Run `lumen doctor` after installing to check all of the above.

## Workspace Layout

A workspace created by `lumen init` looks like this:

```text
my-project/                 ← your project root (application code lives here)
  .lumen/                   ← Lumen scan workspace (all Lumen files live here)
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
      scan-prompt.md        the agent's operating instructions
      feishu-card-template.json
    tmp/                    run metadata only
    worktrees/              one reusable git worktree per repository
    reports/                generated HTML/PDF reports
    results/                scan-result-*.json history
    logs/                   run-*.log (readable with 'lumen watch')
    state/
      issue-registry.json   persistent finding tracker
  service-a/                ← your git repositories
  web-app/
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
