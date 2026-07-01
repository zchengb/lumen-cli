#!/usr/bin/env node
"use strict";

const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin });

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

  if (type === "thinking" && subtype === "delta" && event.text) {
    process.stdout.write(event.text);
    return;
  }

  if (type === "thinking" && subtype === "completed") {
    process.stdout.write("\n");
    return;
  }

  if (type === "tool_call" && subtype === "started") {
    const name = event.tool_call?.name || event.name || "tool";
    console.log(`\n[tool] ${name}`);
    return;
  }

  if (type === "tool_call" && subtype === "completed") {
    const name = event.tool_call?.name || event.name || "tool";
    console.log(`[tool done] ${name}`);
    return;
  }

  if (type === "assistant" && event.message?.content) {
    for (const part of event.message.content) {
      if (part.type === "text" && part.text) {
        console.log(`\n${part.text}`);
      }
    }
    return;
  }

  if (type === "result") {
    console.log(`\n[result] ${event.result || "completed"}`);
  }
}

rl.on("line", formatLine);
