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
console.log("observatory-check ok");
