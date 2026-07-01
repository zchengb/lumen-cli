#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

const LUMEN_HOME = process.env.LUMEN_HOME || path.join(os.homedir(), ".lumen");
const REGISTRY_PATH = path.join(LUMEN_HOME, "projects.json");
const CONFIG_PATH = path.join(LUMEN_HOME, "config.json");
const SCHEMA_VERSION = "1.0";

function ensureRegistryDir() {
  fs.mkdirSync(LUMEN_HOME, { recursive: true });
}

function emptyRegistry() {
  return { schema_version: SCHEMA_VERSION, projects: [] };
}

function loadConfig() {
  ensureRegistryDir();
  if (!fs.existsSync(CONFIG_PATH)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveConfig(config) {
  ensureRegistryDir();
  const tmp = `${CONFIG_PATH}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  fs.renameSync(tmp, CONFIG_PATH);
}

function loadRegistry() {
  ensureRegistryDir();
  if (!fs.existsSync(REGISTRY_PATH)) {
    return emptyRegistry();
  }
  try {
    const data = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    if (!Array.isArray(data.projects)) {
      return emptyRegistry();
    }
    migrateRegistry(data);
    return data;
  } catch {
    return emptyRegistry();
  }
}

function saveRegistry(data) {
  ensureRegistryDir();
  const tmp = `${REGISTRY_PATH}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  fs.renameSync(tmp, REGISTRY_PATH);
}

function normalizeWorkspace(workspace) {
  return path.resolve(workspace);
}

function readDisplayName(workspace) {
  const commonPath = path.join(workspace, "config", "common.json");
  if (!fs.existsSync(commonPath)) {
    return path.basename(workspace);
  }
  try {
    const common = JSON.parse(fs.readFileSync(commonPath, "utf8"));
    const name = common.project && common.project.display_name;
    if (name && String(name).trim()) {
      return String(name).trim();
    }
  } catch {
    // fall through
  }
  return path.basename(workspace);
}

function isWorkspace(workspace) {
  return fs.existsSync(path.join(workspace, "config", "common.json"));
}

function makeSlug(name) {
  const slug = String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "project";
}

function uniqueSlug(registry, baseSlug, excludeId) {
  let slug = baseSlug;
  let counter = 2;
  while (
    registry.projects.some(
      (project) => project.slug === slug && project.id !== excludeId
    )
  ) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
  return slug;
}

function migrateRegistry(registry) {
  let changed = false;
  for (const project of registry.projects) {
    if (!project.slug) {
      project.slug = uniqueSlug(registry, makeSlug(project.name), project.id);
      changed = true;
    }
  }
  if (changed) {
    saveRegistry(registry);
  }
}

function newProjectId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return crypto.randomBytes(16).toString("hex").replace(
    /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
    "$1-$2-$3-$4-$5"
  );
}

function findById(registry, id) {
  if (!id) {
    return null;
  }
  const exact = registry.projects.find((project) => project.id === id);
  if (exact) {
    return exact;
  }
  const matches = registry.projects.filter((project) => project.id.startsWith(id));
  if (matches.length === 1) {
    return matches[0];
  }
  if (matches.length > 1) {
    throw new Error(
      `Ambiguous project id prefix '${id}'. Matches: ${matches.map((project) => project.name).join(", ")}`
    );
  }
  return null;
}

function findByWorkspace(registry, workspace) {
  const normalized = normalizeWorkspace(workspace);
  return registry.projects.find((project) => normalizeWorkspace(project.workspace) === normalized) || null;
}

function findByRef(registry, ref) {
  const value = String(ref || "").trim();
  if (!value) {
    return null;
  }

  const byId = findById(registry, value);
  if (byId) {
    return byId;
  }

  const slug = value.toLowerCase();
  const slugMatches = registry.projects.filter((project) => project.slug === slug);
  if (slugMatches.length === 1) {
    return slugMatches[0];
  }
  if (slugMatches.length > 1) {
    throw new Error(`Ambiguous project slug '${value}'.`);
  }

  const lower = value.toLowerCase();
  const nameMatches = registry.projects.filter(
    (project) => project.name.toLowerCase() === lower
  );
  if (nameMatches.length === 1) {
    return nameMatches[0];
  }
  if (nameMatches.length > 1) {
    throw new Error(`Ambiguous project name '${value}'.`);
  }

  const partialMatches = registry.projects.filter((project) =>
    project.name.toLowerCase().includes(lower)
  );
  if (partialMatches.length === 1) {
    return partialMatches[0];
  }
  if (partialMatches.length > 1) {
    throw new Error(
      `Ambiguous project '${value}'. Matches: ${partialMatches.map((project) => project.name).join(", ")}`
    );
  }

  return null;
}

function findBySlug(registry, slug) {
  const value = String(slug || "").trim().toLowerCase();
  if (!value) {
    return null;
  }
  const matches = registry.projects.filter((project) => project.slug === value);
  if (matches.length === 1) {
    return matches[0];
  }
  if (matches.length > 1) {
    throw new Error(`Ambiguous project slug '${slug}'.`);
  }
  return null;
}

function resolveSlug(slug) {
  const registry = loadRegistry();
  const project = findBySlug(registry, slug);
  if (!project) {
    throw new Error(`Project slug not found: ${slug}`);
  }
  return project;
}

function addProject(workspace, name) {
  const resolved = normalizeWorkspace(workspace);
  if (!isWorkspace(resolved)) {
    throw new Error(`No Lumen workspace found at: ${resolved}`);
  }

  const registry = loadRegistry();
  const existing = findByWorkspace(registry, resolved);
  const now = new Date().toISOString();
  const displayName = (name && String(name).trim()) || readDisplayName(resolved);

  if (existing) {
    existing.name = displayName;
    existing.slug = uniqueSlug(registry, makeSlug(displayName), existing.id);
    existing.updated_at = now;
    saveRegistry(registry);
    return existing;
  }

  const baseSlug = makeSlug(displayName);
  const project = {
    id: newProjectId(),
    name: displayName,
    slug: uniqueSlug(registry, baseSlug),
    workspace: resolved,
    created_at: now,
    updated_at: now,
  };
  registry.projects.push(project);
  saveRegistry(registry);
  return project;
}

function removeProject(id) {
  const registry = loadRegistry();
  const project = findById(registry, id);
  if (!project) {
    throw new Error(`Project not found: ${id}`);
  }
  registry.projects = registry.projects.filter((entry) => entry.id !== project.id);
  saveRegistry(registry);

  const config = loadConfig();
  if (config.default_project_id === project.id) {
    delete config.default_project_id;
    saveConfig(config);
  }
}

function resolveRef(ref) {
  const registry = loadRegistry();
  const project = findByRef(registry, ref);
  if (!project) {
    throw new Error(`Project not found: ${ref}`);
  }
  return project;
}

function setDefaultProject(slug) {
  const project = resolveSlug(slug);
  const config = loadConfig();
  config.default_project_id = project.id;
  saveConfig(config);
  return project;
}

function clearDefaultProject() {
  const config = loadConfig();
  delete config.default_project_id;
  saveConfig(config);
}

function getDefaultProject() {
  const config = loadConfig();
  if (!config.default_project_id) {
    return null;
  }
  const registry = loadRegistry();
  return findById(registry, config.default_project_id);
}

function usage() {
  process.stderr.write(`Usage:
  projects-registry.js list [--json]
  projects-registry.js list-lines
  projects-registry.js count
  projects-registry.js add <workspace> [--name <name>]
  projects-registry.js get <project-ref> [--workspace-only]
  projects-registry.js resolve <project-ref> [--workspace-only]
  projects-registry.js resolve-slug <slug> [--workspace-only]
  projects-registry.js set-default <slug>
  projects-registry.js clear-default
  projects-registry.js get-default [--workspace-only]
  projects-registry.js remove <project-ref>
`);
  process.exit(1);
}

function cmdList(jsonOutput) {
  const registry = loadRegistry();
  if (jsonOutput) {
    process.stdout.write(`${JSON.stringify(registry, null, 2)}\n`);
    return;
  }
  if (registry.projects.length === 0) {
    process.stdout.write("No projects registered. Run 'lumen init' or 'lumen register <workspace>'.\n");
    return;
  }
  const config = loadConfig();
  process.stdout.write("NAME                 SLUG                 WORKSPACE\n");
  for (const project of registry.projects) {
    const marker = config.default_project_id === project.id ? "*" : " ";
    const name = project.name.length > 20 ? `${project.name.slice(0, 17)}...` : project.name.padEnd(20, " ");
    const slug = project.slug.padEnd(20, " ");
    process.stdout.write(`${marker} ${name} ${slug} ${project.workspace}\n`);
  }
  process.stdout.write("\n* = default project (set with 'lumen use <slug>')\n");
}

function cmdListLines() {
  const registry = loadRegistry();
  registry.projects.forEach((project, index) => {
    process.stdout.write(`${index + 1}\t${project.id}\t${project.slug}\t${project.name}\t${project.workspace}\n`);
  });
}

function cmdCount() {
  const registry = loadRegistry();
  process.stdout.write(`${registry.projects.length}\n`);
}

function outputProject(project, workspaceOnly) {
  if (workspaceOnly) {
    process.stdout.write(`${project.workspace}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(project)}\n`);
  }
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") {
      flags.json = true;
    } else if (arg === "--name") {
      flags.name = argv[i + 1];
      i += 1;
    } else if (arg === "--workspace-only") {
      flags.workspaceOnly = true;
    } else {
      positional.push(arg);
    }
  }
  return { positional, flags };
}

function main() {
  const [command, ...rest] = process.argv.slice(2);
  const { positional, flags } = parseArgs(rest);

  if (!command) {
    usage();
  }

  try {
    switch (command) {
      case "list":
        cmdList(Boolean(flags.json));
        break;
      case "list-lines":
        cmdListLines();
        break;
      case "count":
        cmdCount();
        break;
      case "add": {
        const workspace = positional[0];
        if (!workspace) {
          usage();
        }
        const project = addProject(workspace, flags.name);
        process.stdout.write(`${JSON.stringify(project)}\n`);
        break;
      }
      case "get":
      case "resolve": {
        const ref = positional[0];
        if (!ref) {
          usage();
        }
        const project = resolveRef(ref);
        outputProject(project, Boolean(flags.workspaceOnly));
        break;
      }
      case "resolve-slug": {
        const slug = positional[0];
        if (!slug) {
          usage();
        }
        const project = resolveSlug(slug);
        outputProject(project, Boolean(flags.workspaceOnly));
        break;
      }
      case "set-default": {
        const slug = positional[0];
        if (!slug) {
          usage();
        }
        const project = setDefaultProject(slug);
        process.stdout.write(`${JSON.stringify(project)}\n`);
        break;
      }
      case "clear-default":
        clearDefaultProject();
        break;
      case "get-default": {
        const project = getDefaultProject();
        if (!project) {
          process.exit(1);
        }
        outputProject(project, Boolean(flags.workspaceOnly));
        break;
      }
      case "remove": {
        const ref = positional[0];
        if (!ref) {
          usage();
        }
        const project = resolveRef(ref);
        removeProject(project.id);
        break;
      }
      default:
        usage();
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
}

main();
