#!/usr/bin/env node
"use strict";

const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });

const TOOL_LABELS = {
  shellToolCall: "Shell",
  readToolCall: "Read",
  writeToolCall: "Write",
  editToolCall: "Edit",
  deleteToolCall: "Delete",
  globToolCall: "Search files",
  grepToolCall: "Search",
  lsToolCall: "List directory",
  fetchToolCall: "Fetch",
  webSearchToolCall: "Web search",
  mcpToolCall: "MCP tool",
  todoToolCall: "Todo update",
};

function humanizeToolKey(key) {
  if (TOOL_LABELS[key]) {
    return TOOL_LABELS[key];
  }
  return key
    .replace(/ToolCall$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function toolCallInfo(toolCall) {
  if (!toolCall || typeof toolCall !== "object") {
    return { label: "Tool", description: "" };
  }
  const key = Object.keys(toolCall)[0];
  const payload = key ? toolCall[key] : undefined;
  const label = key ? humanizeToolKey(key) : "Tool";
  const description = payload?.description || payload?.args?.command || "";
  return { label, description };
}

function truncate(text, max) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) {
    return clean;
  }
  return `${clean.slice(0, max - 1)}…`;
}

function toolResultStatus(toolCall) {
  if (!toolCall || typeof toolCall !== "object") {
    return null;
  }
  const key = Object.keys(toolCall)[0];
  const payload = key ? toolCall[key] : undefined;
  const result = payload?.result;
  if (!result) {
    return null;
  }
  if (result.success) {
    const exitCode = result.success.exitCode;
    if (typeof exitCode === "number" && exitCode !== 0) {
      return { ok: false, detail: `exit ${exitCode}` };
    }
    return { ok: true, detail: "" };
  }
  if (result.error) {
    return { ok: false, detail: truncate(result.error.message || result.error, 120) };
  }
  return null;
}

function formatLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return;
  }

  let event;
  try {
    event = JSON.parse(trimmed);
  } catch {
    console.log(trimmed);
    return;
  }

  const type = event.type;
  const subtype = event.subtype;

  if (type === "system" && subtype === "init") {
    console.log(`▸ Session started (model: ${event.model || "unknown"})`);
    return;
  }

  if (type === "assistant" && event.message?.content) {
    for (const part of event.message.content) {
      if (part.type === "text" && part.text) {
        const text = truncate(part.text, 220);
        if (text) {
          console.log(`\n${text}`);
        }
      }
    }
    return;
  }

  if (type === "tool_call" && subtype === "started") {
    const { label, description } = toolCallInfo(event.tool_call);
    const suffix = description ? `: ${truncate(description, 100)}` : "";
    console.log(`▸ ${label}${suffix}`);
    return;
  }

  if (type === "tool_call" && subtype === "completed") {
    const status = toolResultStatus(event.tool_call);
    if (status && !status.ok) {
      const { label } = toolCallInfo(event.tool_call);
      console.log(`✗ ${label} failed${status.detail ? ` (${status.detail})` : ""}`);
    }
    return;
  }

  if (type === "result") {
    if (event.is_error) {
      console.log(`\n✗ Scan agent reported an error: ${truncate(event.result || "unknown error", 200)}`);
    } else {
      console.log("\n✓ Scan agent run finished.");
    }
    return;
  }
}

rl.on("line", formatLine);
