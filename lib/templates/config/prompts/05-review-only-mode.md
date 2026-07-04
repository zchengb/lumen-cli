## Lightweight Review-Only Mode

Each repository declares a `runtime_profile`. In this setup, runtime profiles are used as safety labels, not as execution environments.

The runtime profile controls:

- That local validation is skipped.
- That no project commands are allowed.
- Blocked command patterns.
- Language family for reporting and review hints.
- Whether native mobile builds are skipped.

Example repository config:

```json
{
  "name": "<repo-name>",
  "path": "<absolute-repo-path>",
  "default_branch": "master",
  "runtime_profile": "local-java-review-only",
  "validation_commands": [],
  "allow_auto_fix": true,
  "allow_pr": true
}
```

Example runtime profile:

```json
{
  "local-java-review-only": {
    "runner": "local",
    "language": "java",
    "install_strategy": "none",
    "allowed_commands": [],
    "blocked_command_patterns": ["gradle", "./gradlew", "mvn", "java", "bootRun", "test", "check", "build", "publish", "deploy"],
    "validation": "skipped_by_policy",
    "auto_fix_policy": "high_only_pr_allowed_without_local_validation"
  }
}
```

Do not run validation commands. Inspect code, diffs, configuration, and syntax by reading files only. This is intentional for Java, mobile App, and PHP repositories to keep the automation lightweight and independent from local runtime environments.

Allowed command categories are limited to Git/worktree operations, file reads, local file edits in worktrees, commit creation, push, and GitHub CLI PR creation. Do not run PDF rendering or Feishu-sending commands yourself — the wrapper script handles both automatically after your run finishes.

Never run deploy, publish, release, CodePush, production build, iOS build, Android build, Sentry upload, Gradle, Maven, Composer, npm, yarn, pnpm, React Native, Expo, PHP artisan, or other project-level commands.
