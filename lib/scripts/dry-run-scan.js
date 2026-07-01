#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function loadJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function isoNow() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
}

function main() {
  const workspace = path.resolve(process.argv[2] || process.env.LUMEN_WORKSPACE || "");
  const runId = process.argv[3] || isoNow().replace(/[-:]/g, "").replace("T", "-").slice(0, 15);

  if (!workspace) {
    process.stderr.write("Usage: dry-run-scan.js <workspace-dir> [run-id]\n");
    process.exit(1);
  }

  const common = loadJson(path.join(workspace, "config", "common.json"), {});
  const repos = loadJson(path.join(workspace, "config", "repos.json"), { repositories: [] });
  const resultsDir = path.join(workspace, common.paths?.results_dir || "results");
  const stateDir = path.join(workspace, common.paths?.state_dir || "state");
  const registryPath = path.join(stateDir, "issue-registry.json");
  const registry = loadJson(registryPath, { schema_version: "1.0", issues: [] });
  const scanWindowDays = common.execution?.scan_window_days || 7;
  const projectName = common.project?.display_name || path.basename(workspace);
  const startedAt = isoNow();

  fs.mkdirSync(resultsDir, { recursive: true });

  const repositoryList = Array.isArray(repos.repositories) ? repos.repositories : [];
  const findings = repositoryList.length
    ? repositoryList.map((repo, index) => ({
        title: `[Dry-run] Sample review finding in ${repo.name}`,
        severity: index === 0 ? "High" : "Low",
        repository: repo.name,
        impact: "Dry-run mock finding used to verify the Lumen pipeline without running the Cursor agent.",
        trigger: "This is not a real security issue. It exists only to validate report, dashboard, and notification wiring.",
        file: "src/example/DryRunSample.java",
        line_range: "1-3",
        code_snippet: "// dry-run placeholder",
        suggestion: "No action required. Re-run without --dry-run for a real scan.",
        pr_url: null,
        issue_id: `ISSUE-dryrun-${String(index + 1).padStart(3, "0")}`,
        issue_status: "open",
      }))
    : [
        {
          title: "[Dry-run] No repositories configured",
          severity: "Low",
          repository: "none",
          impact: "Dry-run completed, but config/repos.json has no repositories to mock.",
          trigger: "Add repositories to config/repos.json, then re-run the dry-run.",
          file: "config/repos.json",
          line_range: "1-1",
          code_snippet: "{ \"repositories\": [] }",
          suggestion: "Edit config/repos.json and add at least one repository.",
          pr_url: null,
          issue_id: "ISSUE-dryrun-001",
          issue_status: "open",
        },
      ];

  const openIssues = (registry.issues || []).filter((issue) =>
    ["open", "in_progress", "pr_open"].includes(issue.status)
  ).length;

  const scan = {
    scan_status: "completed_with_findings",
    dry_run: true,
    scan_window: `Last ${scanWindowDays} Days (dry-run)`,
    project_name: projectName,
    started_at: startedAt,
    finished_at: isoNow(),
    repositories_scanned: repositoryList.length,
    repositories_failed: 0,
    findings,
    issue_registry: {
      path: registryPath,
      new_issues: 0,
      existing_open_issues: openIssues,
      stale_open_issues: 0,
      pr_open_issues: 0,
      resolved_issues: 0,
    },
    prs: [],
    failures: [],
    validation_results: repositoryList.map((repo) => ({
      repository: repo.name,
      status: "skipped",
      reason: "Dry-run: Cursor agent was not executed",
    })),
    worktree_notes: repositoryList.map((repo) => ({
      repository: repo.name,
      note: "Dry-run: no git worktree changes were made",
    })),
    feishu: {
      status: "dry_run_skipped",
      error: null,
    },
    report: {
      status: "pending",
      html_path: null,
      pdf_path: null,
      error: null,
    },
  };

  const archivedName = `scan-result-${runId}.json`;
  const archivedPath = path.join(resultsDir, archivedName);
  const latestPath = path.join(resultsDir, "scan-result.json");

  fs.writeFileSync(archivedPath, `${JSON.stringify(scan, null, 2)}\n`, "utf8");
  fs.writeFileSync(latestPath, `${JSON.stringify(scan, null, 2)}\n`, "utf8");

  process.stdout.write(
    `${JSON.stringify({
      archived_path: archivedPath,
      latest_path: latestPath,
      findings: findings.length,
      repositories: repositoryList.length,
    })}\n`
  );
}

main();
