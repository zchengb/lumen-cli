function titleStatus(value) {
  const raw = String(value ?? "unknown").toLowerCase().replaceAll("_", " ");
  const labels = {
    open: "Open",
    "in progress": "In progress",
    "pr open": "PR open",
    "not started": "Not started",
    draft: "Draft",
  };
  return labels[raw] || raw.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusTone(value) {
  const normalized = String(value || "unknown").toLowerCase().replaceAll("_", " ");
  if (normalized === "open" || /(failed|blocked)/.test(normalized)) return "danger";
  if (/(completed|succeeded|clean|passed|resolved|synced|configured|included|available|approved|ready|done|pr open)/.test(normalized)) return "success";
  if (/(progress|running|active|partial|draft|not started)/.test(normalized)) return "info";
  return "neutral";
}

function splitFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: "", body: markdown };
  return { frontmatter: match[1], body: match[2] };
}

function joinFrontmatter(frontmatter, body) {
  if (!frontmatter) return body;
  return `---\n${frontmatter}\n---\n${body.startsWith("\n") ? body : `\n${body}`}`;
}

function extractMermaidBlocks(markdown) {
  return [...markdown.matchAll(/```mermaid\r?\n([\s\S]*?)```/g)].map((match) => match[1].trim());
}

function shouldCommitEditorSync(edited, nextBody, currentBody) {
  return edited && nextBody !== currentBody;
}

function parseAcPrefix(html) {
  const match = html.match(/^\s*(?:<(?:strong|b|em|span)[^>]*>\s*)?(Given|When|Then)\s*[:：]?\s*(?:<\/(?:strong|b|em|span)>\s*)?/i);
  if (!match) return null;
  return { kind: match[1].toLowerCase(), restHtml: html.slice(match[0].length) };
}

function isAcAbsorbableTag(tag) {
  return /^(UL|OL|TABLE|BLOCKQUOTE)$/.test(tag);
}

const sample = `---
title: "Demo"
jiraUrl: "https://example.com"
---

# Demo Title

Hello

\`\`\`mermaid
flowchart TD
  A-->B
\`\`\`
`;

const parts = splitFrontmatter(sample);
console.assert(parts.frontmatter.includes("title:"), "keeps frontmatter");
console.assert(!parts.body.includes("jiraUrl"), "body hides frontmatter");
console.assert(parts.body.includes("flowchart TD"), "body keeps mermaid");
console.assert(joinFrontmatter(parts.frontmatter, parts.body).startsWith("---\n"), "roundtrip prefix");
console.assert(titleStatus("pr_open") === "PR open", "pr_open label");
console.assert(statusTone("pr_open") === "success", "pr_open tone");
console.assert(statusTone("open") === "danger", "open tone");
console.assert(extractMermaidBlocks(parts.body)[0] === "flowchart TD\n  A-->B", "mermaid extract");
console.assert(shouldCommitEditorSync(false, "changed", "original") === false, "focus-only blur stays clean");
console.assert(shouldCommitEditorSync(true, "changed", "original") === true, "real edit commits");
console.assert(shouldCommitEditorSync(true, "same", "same") === false, "noop edit stays clean");
console.assert(parseAcPrefix("Given 用户已註冊").kind === "given", "given prefix");
console.assert(parseAcPrefix("Then：").kind === "then" && parseAcPrefix("Then：").restHtml === "", "then colon");
console.assert(parseAcPrefix("When 系統於 20:00").kind === "when", "when prefix");
console.assert(parseAcPrefix("Hello Given world") === null, "ignores mid-sentence");
console.assert(isAcAbsorbableTag("TABLE") && isAcAbsorbableTag("UL") && isAcAbsorbableTag("BLOCKQUOTE"), "absorbs rich blocks");
console.assert(!isAcAbsorbableTag("PRE") && !isAcAbsorbableTag("DIV"), "keeps code as sibling");
console.log("observatory-check ok");
