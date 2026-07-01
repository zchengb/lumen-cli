#!/usr/bin/env node
"use strict";

const fs = require("fs");
const tty = require("tty");
const { discover } = require("./discover-repos");

const CONTINUE_ROW = 0;
const MANUAL_ROW = 1;

function parseArgs(argv) {
  let workspaceRoot = "";
  let outputPath = "";
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--output") {
      outputPath = argv[index + 1] || "";
      index += 1;
      continue;
    }
    if (!workspaceRoot) {
      workspaceRoot = arg;
    }
  }
  return { workspaceRoot, outputPath };
}

function openInputStream() {
  if (process.stdin.isTTY) {
    return process.stdin;
  }
  try {
    const fd = fs.openSync("/dev/tty", "r");
    return new tty.ReadStream(fd);
  } catch {
    return null;
  }
}

function canRunInteractive() {
  if (process.stdin.isTTY || process.stderr.isTTY) {
    return true;
  }
  try {
    const fd = fs.openSync("/dev/tty", "r");
    fs.closeSync(fd);
    return true;
  } catch {
    return false;
  }
}

function formatRepoLine(repo, selected, active) {
  const marker = active ? "›" : " ";
  const circle = selected ? "●" : "○";
  return `${marker} ${circle} ${repo.name}  (${repo.default_branch}, ${repo.runtime_profile})`;
}

function formatFooterLine(label, active) {
  const marker = active ? "›" : " ";
  return `${marker} ${label}`;
}

function render(workspaceRoot, repos, selected, cursor, footerCursor, statusMessage) {
  const lines = [];
  lines.push(`Repositories under ${workspaceRoot}`);
  lines.push("");
  repos.forEach((repo, index) => {
    const active = footerCursor === null && cursor === index;
    lines.push(formatRepoLine(repo, selected.has(index), active));
  });
  lines.push("");
  const count = selected.size;
  const noun = count === 1 ? "repository" : "repositories";
  const continueLabel = `Continue with ${count} selected ${noun}`;
  lines.push(formatFooterLine(continueLabel, footerCursor === CONTINUE_ROW));
  lines.push(formatFooterLine("Add repository manually", footerCursor === MANUAL_ROW));
  lines.push("");
  lines.push("↑↓ move   Space toggle   Enter confirm   a select all   q cancel");
  if (statusMessage) {
    lines.push(statusMessage);
  }
  process.stderr.write(`\x1b[?25l\x1b[2J\x1b[H${lines.join("\n")}`);
}

function restoreTerminal(input) {
  process.stderr.write("\x1b[?25h\x1b[0J\n");
  if (input.isTTY) {
    input.setRawMode(false);
  }
}

function writeResult(result, outputPath) {
  const json = `${JSON.stringify(result, null, 2)}\n`;
  if (outputPath) {
    fs.writeFileSync(outputPath, json, "utf8");
    return;
  }
  process.stdout.write(json);
}

function runInteractive(workspaceRoot, repos, outputPath) {
  const input = openInputStream();
  if (!input) {
    process.stderr.write("Interactive repository selection requires a TTY.\n");
    process.exit(1);
  }

  const selected = new Set();
  let cursor = 0;
  let footerCursor = null;
  let statusMessage = "";

  const draw = () => render(workspaceRoot, repos, selected, cursor, footerCursor, statusMessage);

  const finish = (result, code) => {
    restoreTerminal(input);
    input.pause();
    input.removeAllListeners("data");
    if (code === 0 && result) {
      writeResult(result, outputPath);
    }
    process.exit(code);
  };

  if (input.isTTY) {
    input.setRawMode(true);
  }
  input.resume();
  input.setEncoding("utf8");

  draw();

  input.on("data", (chunk) => {
    statusMessage = "";

    if (chunk === "\u0003" || chunk === "q") {
      finish(null, 130);
    }

    if (chunk === "a") {
      if (selected.size === repos.length) {
        selected.clear();
      } else {
        for (let index = 0; index < repos.length; index += 1) {
          selected.add(index);
        }
      }
      draw();
      return;
    }

    if (chunk === "\u001b[A") {
      if (footerCursor !== null) {
        if (footerCursor === MANUAL_ROW) {
          footerCursor = CONTINUE_ROW;
        } else {
          footerCursor = null;
          cursor = repos.length - 1;
        }
      } else if (cursor > 0) {
        cursor -= 1;
      }
      draw();
      return;
    }

    if (chunk === "\u001b[B") {
      if (footerCursor !== null) {
        if (footerCursor === CONTINUE_ROW) {
          footerCursor = MANUAL_ROW;
        }
      } else if (cursor < repos.length - 1) {
        cursor += 1;
      } else {
        footerCursor = CONTINUE_ROW;
      }
      draw();
      return;
    }

    if (chunk === " ") {
      if (footerCursor === null) {
        if (selected.has(cursor)) {
          selected.delete(cursor);
        } else {
          selected.add(cursor);
        }
        draw();
      }
      return;
    }

    if (chunk === "\r" || chunk === "\n") {
      if (footerCursor === MANUAL_ROW) {
        finish(null, 2);
        return;
      }
      if (selected.size === 0) {
        statusMessage = "Select at least one repository (Space to toggle), or choose manual entry.";
        draw();
        return;
      }
      const result = [...selected].sort((a, b) => a - b).map((index) => repos[index]);
      finish(result, 0);
      return;
    }

    if (chunk.startsWith("\u001b")) {
      return;
    }
  });
}

function usage() {
  process.stderr.write("Usage: select-repos.js <workspace-root> [--output <file>]\n");
  process.exit(1);
}

function main() {
  const { workspaceRoot, outputPath } = parseArgs(process.argv.slice(2));
  if (!workspaceRoot) {
    usage();
  }

  if (!canRunInteractive()) {
    process.stderr.write("Interactive repository selection requires a TTY.\n");
    process.exit(1);
  }

  const repos = discover(workspaceRoot);
  if (repos.length === 0) {
    process.stderr.write("No repositories found.\n");
    process.exit(1);
  }

  runInteractive(workspaceRoot, repos, outputPath);
}

main();
