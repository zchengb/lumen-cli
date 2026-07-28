## Lightweight Review-Only Mode

`runtime_profile` is a safety label, not an execution environment. It defines the language hints, blocked command patterns, skipped validation, and auto-fix policy for a repository.

Inspect code, diffs, configuration, and syntax by reading files. Do not run project validation, install dependencies, or execute deploy/build/release commands. This includes Gradle, Maven, Composer, npm, yarn, pnpm, React Native, Expo, PHP Artisan, iOS, Android, CodePush, and Sentry commands.

Allowed work is limited to Git/worktree operations, file reads, local edits in scan worktrees, and local commits on qualifying auto-fix branches. Do not push, run `gh`, render reports, or send Feishu; the wrapper handles those steps after the Agent exits.
