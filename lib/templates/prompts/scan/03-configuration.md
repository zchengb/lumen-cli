## Configuration Model

Keep prompts and scripts reusable. Never hardcode repository names, local paths, branches, notification URLs, or team rules.

| File | Responsibility |
|---|---|
| `.env.common` | Optional shared non-secret defaults |
| `.env.local` | Local secrets and machine overrides; never commit |
| `config/common.json` | Workspace paths, execution window, notifications, Git behavior |
| `config/repos.json` | Repository paths, branches, profiles, and per-repo policies |
| `config/runtime-profiles.json` | Review safety labels and blocked commands |
| `config/feishu-card-template.json` | Notification rendering |
| `prompts/scan/` | Modular scan snippets and manifest |
| `state/issue-registry.json` | Persistent cross-run finding state; do not edit directly |

Load environment in this order: `.env.common` → `.env.local` → existing process environment.

Use the workspace paths supplied by the runtime context. Never put secrets in JSON, prompts, reports, logs, PR text, or cards.
