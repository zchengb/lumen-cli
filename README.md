# Lumen CLI

Lumen scans recent git commits across your local repositories for code quality, security, and reliability issues using the Cursor CLI agent. It tracks findings over time, can open fix PRs for confirmed High severity items, and ships a standalone HTML dashboard that opens in any browser — no server, no Python required to view it.

## Install

Download and extract the release zip, then run one command:

```bash
unzip lumen-*.zip
cd lumen-*
./install.sh
```

This installs:

- `~/.local/bin/lumen` — the CLI entrypoint
- `~/.lumen/` — CLI library, workspace templates, and project registry (`projects.json`)

If `~/.local/bin` is not already on your `PATH`, the installer prints the line to add to your shell profile (`~/.zshrc` or `~/.bashrc`).

### Install and initialize in one command

To install the CLI **and** set up a scan workspace at the same time:

```bash
./install.sh ~/my-scan-workspace
```

## Quick Start

```bash
mkdir -p ~/my-scan-workspace && cd ~/my-scan-workspace
lumen init
```

`lumen init` asks you a few questions interactively — no manual JSON editing required for a first run:

- Project display name and where your repositories live locally
- Scan window (days) and which Cursor model to use
- Your Feishu webhook URL (optional — written to `.env.local`)
- Each repository to scan: a git clone URL (Lumen clones it for you) or an existing local path, default branch, runtime profile, and whether auto-fix/PR creation are allowed

You can add, remove, or edit repositories and settings at any time by editing `config/repos.json` and `config/common.json` directly. To skip the prompts and get the raw templates instead (e.g. for scripting), run `lumen init --yes` or pipe input from a non-interactive shell.

```text
Then:
  1. lumen doctor   — verify prerequisites
  2. lumen list     — see your project slug
  3. lumen scan --project <slug>   — run your first scan
  4. lumen dashboard --project <slug> --open   — view results in your browser
```

## Commands

| Command | Description |
|---|---|
| `lumen init [dir] [--yes]` | Create a new scan workspace and interactively configure it (default: current directory) |
| `lumen list` | List all registered scan projects (name, slug, workspace) |
| `lumen use [slug]` | Set or show the default project slug |
| `lumen register [dir]` | Register an existing workspace (e.g. an `.auto-scan` folder) as a project |
| `lumen scan --project <slug>` | Run a scan for a specific project |
| `lumen watch --project <slug>` | Tail the latest scan log with readable formatting |
| `lumen dashboard --project <slug> [--open]` | Refresh `dashboard-data.js`, optionally open `dashboard.html` |
| `lumen doctor` | Check installed prerequisites (agent, git, node/python, gh, webhook) |
| `lumen version` | Print the installed CLI version |
| `lumen help` | Show usage |

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
lumen dashboard --project mbpass --open
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

`lumen init` registers the new workspace automatically. For an existing workspace (such as `MBPass/.auto-scan`), run:

```bash
lumen register /path/to/your/.auto-scan
lumen scan --project mbpass
```

Every scan-related command resolves the workspace in this order:

1. `--project <slug>`
2. `LUMEN_PROJECT` environment variable (slug)
3. `--workspace <dir>`
4. Current directory (if it contains `config/common.json`)
5. Default project (`lumen use <slug>`)
6. Single registered project (auto-selected)
7. Interactive project picker (if multiple projects and terminal is interactive)

## Prerequisites

| Tool | Required for | If missing |
|---|---|---|
| [Cursor CLI](https://cursor.com/cli) (`agent`) | Running scans | `lumen scan` cannot start |
| git | Worktree-based repository scanning | Required |
| Node.js **or** Python 3 | Rendering `dashboard-data.js` | Node preferred; falls back to Python 3 |
| GitHub CLI (`gh`) | Automated PR creation for High findings | Scan still runs; findings reported without PRs |
| `FEISHU_WEBHOOK_URL` | Feishu scan summary notifications | Scan still runs; notification marked "not sent" |

Run `lumen doctor` after installing to check all of the above.

## Workspace Layout

A workspace created by `lumen init` looks like this:

```text
my-scan-workspace/
  .env.common.example
  .env.local.example
  .env.local            (create this; never commit it)
  .gitignore
  dashboard.html         standalone dashboard (open directly in a browser)
  dashboard-data.js       generated after each scan
  config/
    common.json          product name, execution mode, paths, retention
    repos.json            repositories to scan (edit this)
    runtime-profiles.json safety profiles per language/stack
    scan-prompt.md         the agent's operating instructions
    feishu-card-template.json
  tmp/                    run metadata only
  worktrees/              one reusable git worktree per repository
  reports/                generated HTML/PDF reports
  results/                scan-result-*.json history
  logs/                   run-*.log (readable with 'lumen watch')
  state/
    issue-registry.json   persistent finding tracker
```

## Uninstall

```bash
./uninstall.sh
```

This removes the installed CLI and library. Any scan workspaces you created with `lumen init` are left untouched — delete them manually if no longer needed.

## Packaging a New Release (maintainers)

```bash
./package.sh
```

Produces `build/lumen-<version>.zip`, ready to upload to GitHub Releases or a shared drive.

## Security Notes

- Secrets are never written to `scan-result.json`, reports, logs, or Feishu cards — Lumen redacts suspected secret values as `[REDACTED]`.
- `.env.local` is git-ignored by the generated workspace `.gitignore` and must never be committed.
- Lumen never modifies your original repository working directories; all review and fixes happen inside dedicated git worktrees under `worktrees/`.
