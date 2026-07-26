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

function storyDateLabel(value) {
  const day = String(value || "").trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : "";
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
console.assert(storyDateLabel("2026-07-22T08:45:45Z") === "2026-07-22", "story date day");
console.assert(storyDateLabel("nope") === "", "invalid story date");

function deliveryStoryOptions(availableStories, current) {
  const options = [];
  const seen = new Set();
  const push = (story, jiraKey, title) => {
    const value = String(story || jiraKey || "").trim();
    if (!value) return;
    const aliases = [value, jiraKey, story].map((item) => String(item || "").trim().toLowerCase()).filter(Boolean);
    if (aliases.some((alias) => seen.has(alias))) return;
    for (const alias of aliases) seen.add(alias);
    const key = String(jiraKey || story || value).trim();
    const name = String(title || "").trim();
    options.push({ value, label: name ? `${key} · ${name}` : key });
  };
  for (const item of availableStories || []) push(item.story || "", item.jira_key || "", item.title || "");
  if (current && /failed|blocked|not_started/i.test(String(current.delivery_status || ""))) {
    push(current.story_id || "", current.jira_key || "", current.story_title || "");
  }
  return options;
}

const deliveryOptions = deliveryStoryOptions(
  [{ story: "MBPAS-1400-pkg-03-trigger-based-5-birthday-greeting", jira_key: "MBPAS-1400", title: "Birthday Greeting" }],
  { story_id: "MBPAS-1400", jira_key: "MBPAS-1400", story_title: "Birthday Greeting", delivery_status: "blocked" },
);
console.assert(deliveryOptions.length === 1, "dedupes slug and jira key");
console.assert(deliveryOptions[0].label === "MBPAS-1400 · Birthday Greeting", "uses jira key in label");
console.assert(deliveryOptions[0].value === "MBPAS-1400-pkg-03-trigger-based-5-birthday-greeting", "keeps slug value");
console.log("observatory-check ok");
