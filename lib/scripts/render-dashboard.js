#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function normalizeTitle(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function issueFilePath(issue) {
  if (issue.file) {
    return issue.file;
  }
  const fingerprint = issue.fingerprint || "";
  if (fingerprint && !/^[a-f0-9]{64}$/.test(fingerprint)) {
    const parts = fingerprint.split(":");
    if (parts.length >= 2) {
      return parts[1];
    }
  }
  return "";
}

function issueMatchKey(issue) {
  const repo = issue.repository || "";
  const file = issueFilePath(issue);
  if (repo && file) {
    return `${repo}|${file}`;
  }
  const title = normalizeTitle(issue.title);
  if (repo && title) {
    return `${repo}|${title}`;
  }
  return issue.id || "";
}

function deduplicateIssues(issues) {
  const groups = new Map();
  for (const issue of issues) {
    const key = issueMatchKey(issue);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(issue);
  }

  const merged = [];
  for (const group of groups.values()) {
    if (group.length === 1) {
      merged.push(group[0]);
      continue;
    }
    const best = group
      .slice()
      .sort((a, b) => {
        const aIssue = String(a.id || "").startsWith("ISSUE-") ? 1 : 0;
        const bIssue = String(b.id || "").startsWith("ISSUE-") ? 1 : 0;
        if (bIssue !== aIssue) {
          return bIssue - aIssue;
        }
        return String(b.last_seen_at || "").localeCompare(String(a.last_seen_at || ""));
      })[0];
    merged.push(best);
  }
  return merged;
}

function loadJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function severityCounts(findings) {
  const counts = { High: 0, Medium: 0, Low: 0 };
  for (const finding of findings || []) {
    const severity = finding.severity || "Low";
    counts[severity] = (counts[severity] || 0) + 1;
  }
  return counts;
}

function rel(root, target) {
  if (!target) {
    return "";
  }
  const absolute = path.resolve(target);
  const relative = path.relative(root, absolute);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    const value = String(target);
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }
    return value;
  }
  return relative.split(path.sep).join("/");
}

function main() {
  const root = path.resolve(process.argv[2] || process.env.LUMEN_WORKSPACE || process.cwd());
  const common = loadJson(path.join(root, "config", "common.json"), {});
  const repos = loadJson(path.join(root, "config", "repos.json"), { repositories: [] });
  const registry = loadJson(path.join(root, "state", "issue-registry.json"), { issues: [] });
  const product = common.product || {};
  const resultsDir = path.join(root, common.paths?.results_dir || "results");
  const logsDir = path.join(root, common.paths?.logs_dir || "logs");
  const dataPath = path.join(root, "dashboard-data.js");

  const runs = [];
  let latestRun = null;
  const latestPath = path.join(resultsDir, "scan-result.json");
  const latestData = loadJson(latestPath, {});
  if (Object.keys(latestData).length > 0) {
    latestRun = {
      id: path.basename(latestPath, ".json"),
      finished_at: latestData.finished_at || "",
      status: latestData.scan_status || "",
      findings: latestData.findings || [],
    };
  }

  const resultFiles = fs
    .readdirSync(resultsDir)
    .filter((name) => /^scan-result-.*\.json$/.test(name))
    .sort()
    .reverse();

  for (const name of resultFiles) {
    const filePath = path.join(resultsDir, name);
    const data = loadJson(filePath, {});
    if (!Object.keys(data).length) {
      continue;
    }
    const counts = severityCounts(data.findings);
    const report = data.report || {};
    const run = {
      id: path.basename(filePath, ".json"),
      started_at: data.started_at || "",
      finished_at: data.finished_at || "",
      status: data.scan_status || "",
      repos: data.repositories_scanned || 0,
      high: counts.High,
      medium: counts.Medium,
      low: counts.Low,
      prs: (data.prs || []).length,
      html: rel(root, report.html_path),
      pdf: rel(root, report.pdf_path),
      json: rel(root, filePath),
      feishu: data.feishu?.status || "",
      failures: (data.failures || []).length,
      findings: data.findings || [],
    };
    runs.push(run);
    if (!latestRun) {
      latestRun = {
        id: run.id,
        finished_at: run.finished_at,
        status: run.status,
        findings: run.findings,
      };
    }
  }

  const issues = deduplicateIssues(registry.issues || []);
  const issueCounts = {};
  for (const issue of issues) {
    const status = issue.status || "unknown";
    issueCounts[status] = (issueCounts[status] || 0) + 1;
  }

  const logs = fs
    .readdirSync(logsDir)
    .filter((name) => name.endsWith(".log"))
    .sort()
    .reverse()
    .slice(0, 10)
    .map((name) => ({
      name,
      href: rel(root, path.join(logsDir, name)),
    }));

  const payload = {
    generated_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    product: {
      name: product.name || "Lumen",
      tagline: product.tagline || "Illuminate code health across your repositories",
      codename: product.codename || "lumen",
    },
    config: common,
    repositories: repos.repositories || [],
    runs,
    latest_run: latestRun,
    issues,
    issue_counts: issueCounts,
    logs,
  };

  fs.writeFileSync(dataPath, `window.DASHBOARD_DATA = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
  console.log(dataPath);
}

main();
