# Lumen Scan Prompt Index

This workspace uses **modular prompt snippets** under `prompts/scan/`.

At scan time, `run-scan.sh` composes the full agent prompt from `prompts/scan/manifest.json` in listed order. You normally edit individual snippets instead of this file.

## Snippet modules

| File | Purpose |
|------|---------|
| `01-role-and-mission.md` | Agent role, wrapper boundaries, review-only mode |
| `02-pipeline.md` | End-to-end scan steps |
| `03-configuration.md` | Config files and workspace layout |
| `04-workspace-and-worktrees.md` | Git worktree isolation rules |
| `05-review-only-mode.md` | No build/test command policy |
| `06-issue-registry.md` | Cross-run issue tracking |
| `07-error-handling.md` | Scan status and failure recording |
| `08-github-pr-and-git.md` | PR, branch, commit, pre-push hook rules |
| `09-severity-guideline.md` | **Official High / Medium / Low standard** |
| `10-findings-and-auto-fix.md` | Finding fields and PR eligibility |
| `11-output-contract.md` | `scan-result.json` schema |
| `12-secrets-and-safety.md` | Secret redaction and safety rules |
| `13-console-summary.md` | Final stdout summary format |

## Customize

- Edit one snippet to change one concern (for example severity rules in `09-severity-guideline.md`).
- Reorder or add snippets by editing `manifest.json`.
- Run `lumen upgrade --project <slug>` to refresh bundled snippets from the CLI release (your edits are backed up under `config/.template-backups/`).

## Compose manually

```bash
python3 ~/.lumen/lib/scripts/compose_scan_prompt.py /path/to/workspace/.lumen
```
