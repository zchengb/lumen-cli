#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SKIP_DIRS = new Set([
  ".lumen",
  ".auto-scan",
  ".auto-scan-backup",
  "node_modules",
  ".idea",
  ".review-temp",
  "build",
  "dist",
  "tmp",
  "worktrees",
  "reports",
  "results",
  "logs",
  "state",
]);

function isGitRepo(dir) {
  return fs.existsSync(path.join(dir, ".git"));
}

function defaultBranch(repoPath) {
  try {
    return execSync("git symbolic-ref --short HEAD", {
      cwd: repoPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    try {
      return execSync("git rev-parse --abbrev-ref HEAD", {
        cwd: repoPath,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
    } catch {
      return "main";
    }
  }
}

function inferProfile(repoPath) {
  let files = [];
  try {
    files = fs.readdirSync(repoPath);
  } catch {
    return "local-generic-review-only";
  }

  if (
    files.includes("gradlew") ||
    files.includes("build.gradle") ||
    files.includes("build.gradle.kts") ||
    files.includes("pom.xml")
  ) {
    return "local-java-review-only";
  }

  if (files.includes("composer.json")) {
    return "local-php-review-only";
  }

  const packageJson = path.join(repoPath, "package.json");
  if (fs.existsSync(packageJson)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJson, "utf8"));
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      if (deps["react-native"] || deps.expo) {
        return "local-react-native-review-only";
      }
    } catch {
      // fall through
    }
  }

  return "local-generic-review-only";
}

function discover(workspaceRoot) {
  const root = path.resolve(workspaceRoot);
  const repos = [];
  const seen = new Set();

  const addRepo = (name, repoPath) => {
    const resolved = path.resolve(repoPath);
    if (seen.has(resolved)) {
      return;
    }
    seen.add(resolved);
    repos.push({
      name,
      path: resolved,
      default_branch: defaultBranch(resolved),
      runtime_profile: inferProfile(resolved),
    });
  };

  if (isGitRepo(root)) {
    addRepo(path.basename(root), root);
  }

  let entries = [];
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return repos.sort((a, b) => a.name.localeCompare(b.name));
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    if (entry.name.startsWith(".")) {
      continue;
    }
    if (SKIP_DIRS.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(root, entry.name);
    if (isGitRepo(fullPath)) {
      addRepo(entry.name, fullPath);
    }
  }

  return repos.sort((a, b) => a.name.localeCompare(b.name));
}

function parseSelection(selection, max) {
  const value = String(selection || "").trim().toLowerCase();
  if (!value) {
    return [];
  }
  if (value === "all") {
    return Array.from({ length: max }, (_, index) => index + 1);
  }
  const parts = value.split(/[,\s]+/).filter(Boolean);
  const indices = [];
  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      throw new Error(`Invalid selection: ${part}`);
    }
    const index = Number(part);
    if (index < 1 || index > max) {
      throw new Error(`Selection out of range: ${part}`);
    }
    if (!indices.includes(index)) {
      indices.push(index);
    }
  }
  indices.sort((a, b) => a - b);
  return indices;
}

function usage() {
  process.stderr.write(`Usage:
  discover-repos.js list <workspace-root>
  discover-repos.js select <workspace-root> <selection>
`);
  process.exit(1);
}

function main() {
  const [command, workspaceRoot, selectionArg] = process.argv.slice(2);
  if (!command || !workspaceRoot) {
    usage();
  }

  const repos = discover(workspaceRoot);

  if (command === "list") {
    process.stdout.write(`${JSON.stringify(repos, null, 2)}\n`);
    return;
  }

  if (command === "select") {
    const indices = parseSelection(selectionArg, repos.length);
    const selected = indices.map((index) => repos[index - 1]);
    process.stdout.write(`${JSON.stringify(selected, null, 2)}\n`);
    return;
  }

  usage();
}

if (require.main === module) {
  main();
} else {
  module.exports = { discover, parseSelection };
}
