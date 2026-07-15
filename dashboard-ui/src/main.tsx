import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { version as lumenVersion } from "../package.json";
import {
  Activity, ChevronDown, CircleAlert, CircleCheck, CircleDot, Code2, Copy,
  Eye, EyeOff, FileCode2, GitBranch, KeyRound, LoaderCircle, PanelLeftClose,
  PanelLeftOpen, Pencil, Save, ScanSearch, Settings2,
  ShieldCheck, Sparkles, Truck, Workflow, XCircle
} from "lucide-react";
import "./styles.css";

type RecordValue = Record<string, any>;
type Tab = "scan" | "delivery" | "prompts" | "settings";

declare global {
  interface Window { DASHBOARD_DATA?: DashboardData }
}

interface DashboardData extends RecordValue {
  interactive?: {
    enabled?: boolean;
    project?: string;
    projects?: Array<{ name: string; slug: string }>;
    prompts?: Array<{ mode: "scan" | "delivery"; path: string }>;
    schedules?: { scan?: RecordValue | null; delivery?: RecordValue | null };
    workspace?: RecordValue;
  };
  delivery?: { current?: RecordValue; runs?: RecordValue[] };
}

const tabItems: Array<{ id: Tab; label: string; icon: typeof ScanSearch }> = [
  { id: "scan", label: "AUTO SCAN", icon: ScanSearch },
  { id: "delivery", label: "AUTO DELIVERY", icon: Truck },
  { id: "prompts", label: "PROMPTS", icon: FileCode2 },
  { id: "settings", label: "SETTINGS", icon: Settings2 }
];

const fallbackPhases = ["Preflight", "Feature worktrees", "Implementation", "Verification", "Pull requests", "JIRA DEV DONE"];

function text(value: unknown, fallback = "—") { return value === undefined || value === null || value === "" ? fallback : String(value); }
function when(value: unknown) {
  if (!value) return "—";
  const date = new Date(String(value));
  return Number.isNaN(date.valueOf()) ? String(value) : new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
}
function elapsed(start?: string, end?: string) {
  if (!start || !end) return "—";
  const seconds = Math.round((new Date(end).valueOf() - new Date(start).valueOf()) / 1000);
  if (!Number.isFinite(seconds) || seconds < 0) return "—";
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}
function statusTone(value: unknown) {
  const normalized = String(value || "unknown").toLowerCase();
  if (/(completed|clean|passed|resolved|synced|configured)/.test(normalized)) return "success";
  if (/(failed|blocked|open)/.test(normalized)) return "danger";
  if (/(progress|running|active)/.test(normalized)) return "info";
  return "neutral";
}
function titleStatus(value: unknown) {
  const raw = text(value, "unknown").toLowerCase().replaceAll("_", " ");
  const labels: Record<string, string> = {
    "completed with findings": "Completed", completed: "Completed", clean: "Completed",
    passed: "Passed", failed: "Failed", skipped: "Skipped", open: "Open",
    "in progress": "In progress", running: "Running", configured: "Active",
    "not configured": "Not set", resolved: "Resolved", synced: "Synced",
    ignored: "Ignored", blocked: "Blocked", pending: "Pending", active: "Active",
    pr_open: "Open", "pr open": "Open", in_progress: "Open"
  };
  return labels[raw] || raw.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function countPassed(checks: RecordValue[]) { return checks.filter((item) => item.status === "passed").length; }

async function request(path: string, project: string, init: RequestInit & { json?: RecordValue } = {}) {
  const url = new URL(path, window.location.origin);
  if (!init.method || init.method === "GET") url.searchParams.set("project", project);
  const headers = new Headers(init.headers);
  let body = init.body;
  if (init.json) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify({ ...init.json, project });
  }
  const response = await fetch(url, { ...init, headers, body });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Request failed");
  return payload;
}

function Badge({ value }: { value: unknown }) {
  return <span className={`badge ${statusTone(value)}`}>{titleStatus(value)}</span>;
}

function IconButton({ label, children, onClick, danger = false }: { label: string; children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return <button className={`icon-button ${danger ? "danger" : ""}`} title={label} aria-label={label} onClick={onClick}>{children}</button>;
}

function Panel({ title, action, children, className = "" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`panel ${className}`}><header className="panel-header"><h3>{title}</h3>{action}</header>{children}</section>;
}

function App() {
  const initialProject = new URLSearchParams(window.location.search).get("project") || window.DASHBOARD_DATA?.interactive?.project || "";
  const [project, setProject] = useState(initialProject);
  const [data, setData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("scan");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => window.localStorage.getItem("lumen-sidebar-collapsed") === "true");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const next = await request("/api/state", project);
      setData(next);
      setLastUpdated(new Date());
      if (!project && next.interactive?.project) setProject(next.interactive.project);
      setError("");
    } catch (err) {
      const staticData = window.DASHBOARD_DATA;
      if (staticData) { setData(staticData); setError("Static report mode: interactive actions are unavailable."); }
      else setError(err instanceof Error ? err.message : "Unable to load Dashboard state");
    } finally { setLoading(false); }
  };

  useEffect(() => { void load(); const id = window.setInterval(load, 5_000); return () => window.clearInterval(id); }, [project]);
  useEffect(() => { if (!notice) return; const id = window.setTimeout(() => setNotice(""), 3000); return () => window.clearTimeout(id); }, [notice]);
  useEffect(() => { window.localStorage.setItem("lumen-sidebar-collapsed", String(sidebarCollapsed)); }, [sidebarCollapsed]);

  const changeProject = (slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("project", slug);
    window.history.replaceState({}, "", url);
    setProject(slug);
  };
  const interact = async (path: string, json: RecordValue, message: string) => {
    try { await request(path, project, { method: "POST", json }); setNotice(message); await load(); }
    catch (err) { setNotice(err instanceof Error ? err.message : "Request failed"); }
  };
  const projects = data?.interactive?.projects || [];
  const tagline = data?.product?.tagline || "Engineering, made legible.";

  return <main className={`dashboard-layout ${sidebarCollapsed ? "sidebar-is-collapsed" : ""}`}>
    <aside className="sidebar" aria-label="Lumen navigation">
      <div className="sidebar-brand">
        <img src="assets/lumen-mark.png" className="brand-mark" alt="Lumen" />
        <div className="sidebar-brand-copy"><strong>Lumen</strong><span>{tagline}</span></div>
      </div>
      <nav className="side-nav" aria-label="Dashboard sections">{tabItems.map((item) => { const Icon = item.icon; return <button title={item.label} className={activeTab === item.id ? "active" : ""} onClick={() => setActiveTab(item.id)} key={item.id}><Icon size={17} /><span>{item.label}</span></button>; })}</nav>
      <div className="sidebar-foot"><IconButton label={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"} onClick={() => setSidebarCollapsed((value) => !value)}>{sidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</IconButton><small>{sidebarCollapsed ? "" : `Version ${lumenVersion}`}</small></div>
    </aside>
    <section className="content-area">
      <header className="masthead">
        <div className="masthead-spacer" />
        <div className="masthead-actions"><span className="last-updated">{lastUpdated ? `Updated ${when(lastUpdated.toISOString())}` : "Syncing…"}</span><label className="project-picker"><span>Project</span><select value={project} onChange={(event) => changeProject(event.target.value)}>{projects.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select><ChevronDown size={15} /></label></div>
      </header>
      <div className="page-content">
        {error && <div className="status-note"><Activity size={15} />{error}</div>}
        {!data && loading ? <div className="loading-state"><LoaderCircle size={22} className="spin" /> Loading local workspace state…</div> : null}
        {data && activeTab === "scan" && <ScanView data={data} project={project} interact={interact} />}
        {data && activeTab === "delivery" && <DeliveryView data={data} />}
        {data && activeTab === "prompts" && <PromptsView data={data} project={project} interact={interact} notify={setNotice} />}
        {data && activeTab === "settings" && <SettingsView data={data} project={project} interact={interact} notify={setNotice} />}
      </div>
    </section>
    {notice && <div className="toast" role="status">{notice}</div>}
  </main>;
}

function PageIntro({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function ScanView({ data, project, interact }: { data: DashboardData; project: string; interact: (path: string, json: RecordValue, message: string) => Promise<void> }) {
  const stats = data.run_stats || {};
  const issues = data.issues || [];
  const runs = data.runs || [];
  const [ignoreCandidate, setIgnoreCandidate] = useState<RecordValue | null>(null);
  const [filter, setFilter] = useState("all");
  const [runPage, setRunPage] = useState(0);
  const runPageSize = 10;
  const openIssues = issues.filter((issue: RecordValue) => ["open", "in_progress", "pr_open"].includes(String(issue.status || "").toLowerCase()));
  const filteredIssues = issues.filter((issue: RecordValue) => filter === "all" || (filter === "open" ? ["open", "in_progress", "pr_open"].includes(String(issue.status || "").toLowerCase()) : String(issue.status || "").toLowerCase() === filter));
  const counts = { all: issues.length, open: openIssues.length, ignored: issues.filter((item: RecordValue) => item.status === "ignored").length, resolved: issues.filter((item: RecordValue) => ["resolved", "accepted_risk", "false_positive"].includes(item.status)).length };
  const pageRuns = runs.slice(runPage * runPageSize, (runPage + 1) * runPageSize);
  const jumpToFindings = () => document.getElementById("tracked-findings")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return <>
    <PageIntro title="AUTO SCAN" description="Review history and manage tracked findings." action={<Badge value={data.active_run ? "running" : "idle"} />} />
    <section className="metrics"><Metric label="Open findings" value={openIssues.length} onClick={jumpToFindings} /><Metric label="Successful · 7d" value={stats.success_7d || 0} /><Metric label="Failed · 7d" value={stats.failed_7d || 0} /><Metric label="Lookback window" value={`${data.scan_window_days || 7}d`} /></section>
    <Panel title="Scan history" action={<span className="muted">{runs.length} runs</span>}><div className="table-scroll"><table><thead><tr><th>Finished</th><th>Status</th><th>Issues</th><th>Duration</th><th>Artifacts</th></tr></thead><tbody>{pageRuns.map((run: RecordValue) => <tr key={run.id}><td>{when(run.finished_at || run.started_at)}</td><td><Badge value={run.status} /></td><td><SeverityBreakdown run={run} /></td><td>{text(run.duration)}</td><td className="artifact-links">{run.html && <a href={`${run.html}?project=${encodeURIComponent(project)}`} target="_blank">HTML</a>}{run.pdf && <a href={`${run.pdf}?project=${encodeURIComponent(project)}`} target="_blank">PDF</a>}{!run.html && !run.pdf && "—"}</td></tr>)}</tbody></table></div>{runs.length > runPageSize && <Pagination page={runPage} pageCount={Math.ceil(runs.length / runPageSize)} onChange={setRunPage} />}</Panel>
    <Panel title="Tracked findings" action={<span className="muted">{filteredIssues.length} of {issues.length} records</span>}><div className="finding-filters" role="tablist">{(["all", "open", "ignored", "resolved"] as const).map((value) => <button className={filter === value ? "active" : ""} onClick={() => setFilter(value)} key={value}>{value === "all" ? "All" : titleStatus(value)} <span>{counts[value]}</span></button>)}</div><div id="tracked-findings" className="findings">{filteredIssues.length ? filteredIssues.map((issue: RecordValue) => <Finding issue={issue} onIgnore={() => setIgnoreCandidate(issue)} key={issue.id} />) : <Empty label="No findings match this status." />}</div></Panel>
    {ignoreCandidate && <IgnoreDialog issue={ignoreCandidate} onClose={() => setIgnoreCandidate(null)} onConfirm={(reason) => { void interact("/api/issue/ignore", { issue_id: ignoreCandidate.id, reason }, "Finding ignored"); setIgnoreCandidate(null); }} />}
  </>;
}

function Metric({ label, value, onClick }: { label: string; value: string | number; onClick?: () => void }) { return <div className={`metric ${onClick ? "metric-action" : ""}`} onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={(event) => { if (onClick && (event.key === "Enter" || event.key === " ")) onClick(); }}><span>{label}</span><strong>{value}</strong></div>; }
function Empty({ label }: { label: string }) { return <div className="empty"><ShieldCheck size={20} />{label}</div>; }
function SeverityBreakdown({ run }: { run: RecordValue }) { return <span className="severity-breakdown"><b className="high">H {Number(run.high || 0)}</b><b className="medium">M {Number(run.medium || 0)}</b><b className="low">L {Number(run.low || 0)}</b></span>; }
function Pagination({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (page: number) => void }) { return <footer className="pagination"><span>Page {page + 1} of {pageCount}</span><div><button className="button secondary" disabled={page === 0} onClick={() => onChange(page - 1)}>Previous</button><button className="button secondary" disabled={page === pageCount - 1} onClick={() => onChange(page + 1)}>Next</button></div></footer>; }
function Finding({ issue, onIgnore }: { issue: RecordValue; onIgnore: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const status = issue.status || issue.issue_status || "open";
  const isIgnorable = !["ignored", "resolved", "accepted_risk", "false_positive"].includes(String(status).toLowerCase());
  return <article className="finding"><div className="finding-main"><div className="finding-copy"><div className="finding-heading"><h4>{text(issue.title, "Untitled finding")}</h4><Badge value={status} /></div><p>{text(issue.repository, "Unknown repository")} <i>|</i> {when(issue.last_seen_at)}</p><div className="finding-links finding-row-links"><button className="text-button" onClick={() => setExpanded(!expanded)}>{expanded ? "Hide detail" : "View detail"}</button>{issue.jira_key && <span>JIRA <code>{issue.jira_key}</code></span>}{issue.jira_url && <a href={issue.jira_url} target="_blank" rel="noreferrer">Open JIRA</a>}{issue.pr_url && <a href={issue.pr_url} target="_blank" rel="noreferrer">Pull request</a>}</div></div><div className="finding-actions">{isIgnorable && <button className="button secondary" onClick={onIgnore}>Mark ignored</button>}</div></div>{expanded && <div className="finding-detail"><FindingDetail label="Impact" value={issue.impact} /><FindingDetail label="Trigger" value={issue.trigger} /><FindingDetail label="Root cause" value={issue.root_cause} /><FindingDetail label="Code" value={issue.code_snippet} code /><FindingDetail label="Recommended correction" value={issue.suggestion} /><FindingDetail label="Validation" value={issue.validation} /></div>}</article>;
}

function FindingDetail({ label, value, code = false }: { label: string; value: unknown; code?: boolean }) { return <section className="finding-detail-row"><h5>{label}</h5>{code ? <pre><code>{text(value, "No code snippet was captured for this historical finding.")}</code></pre> : <p>{text(value, "Not recorded.")}</p>}</section>; }
function IgnoreDialog({ issue, onClose, onConfirm }: { issue: RecordValue; onClose: () => void; onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState("");
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="ignore-dialog-title" onMouseDown={(event) => event.stopPropagation()}><header><span className="modal-icon"><CircleAlert size={18} /></span><div><h3 id="ignore-dialog-title">Ignore finding?</h3><p>This will preserve the finding in history and exclude it from the open queue.</p></div></header><div className="modal-body"><strong>{text(issue.title)}</strong><Field label="Reason (optional)"><input autoFocus value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why is this safe to ignore?" /></Field></div><footer><button className="button" onClick={onClose}>Cancel</button><button className="button primary" onClick={() => onConfirm(reason)}>Mark ignored</button></footer></section></div>;
}

function DeliveryView({ data }: { data: DashboardData }) {
  const delivery = data.delivery || {};
  const current = delivery.current || {};
  const runs = delivery.runs || [];
  const checks = current.verification || [];
  const schedule = data.interactive?.schedules?.delivery;
  const phases = current.phases?.length ? current.phases : fallbackPhases.map((label) => ({ label, status: "pending" }));
  const latest = runs[0] || {};
  const prs = latest.pull_requests || [];
  return <>
    <PageIntro title="AUTO DELIVERY" description="Story execution, verification evidence, and pull requests." action={<div className="intro-action"><span className="automation"><i />{schedule?.description || "Automation not configured"}</span><Badge value={current.delivery_status || "idle"} /></div>} />
    <section className="delivery-summary"><div className="delivery-facts"><Fact label="Current story" value={current.jira_key || current.story_id || "No active delivery"} /><Fact label="Status" value={<Badge value={current.delivery_status || "not started"} />} /><Fact label="Elapsed" value={elapsed(current.started_at, current.finished_at)} /><Fact label="Finished" value={when(current.finished_at)} /></div><DeliveryFlow phases={phases} deliveryStatus={String(current.delivery_status || "")} startedAt={current.started_at} finishedAt={current.finished_at} /></section>
    <div className="two-column"><Panel title="Repository verification" action={<span className="muted">{checks.length} checks</span>} className="flush-table"><div className="table-scroll"><table><thead><tr><th>Repository</th><th>Status</th><th>Verification</th></tr></thead><tbody>{checks.length ? checks.map((check: RecordValue, index: number) => <tr key={`${check.repository}-${index}`}><td>{text(check.repository || check.repo, "Repository")}</td><td><Badge value={check.status} /></td><td>{text(check.label || check.command || check.summary)}</td></tr>) : <tr><td colSpan={3}><Empty label="No verification recorded." /></td></tr>}</tbody></table></div></Panel><Panel title="Delivery outcome"><div className="rows"><InfoRow label="Branch" value={<code>{text(current.branch || latest.branch)}</code>} /><InfoRow label="JIRA" value={<code>{text(current.jira?.status)}</code>} /><InfoRow label="Pull requests" value={<PrLinks items={prs} />} /><InfoRow label="Remediation" value={<code>{text(current.remediation?.status)}</code>} /></div></Panel></div>
    <div className="section-heading"><h2>Delivery history</h2><span>{runs.length} runs</span></div><Panel title="" className="history-panel"><div className="table-scroll"><table><thead><tr><th>Story</th><th>Finished</th><th>Status</th><th>Pull requests</th><th>Verification</th><th>Duration</th></tr></thead><tbody>{runs.length ? runs.map((run: RecordValue) => { const runChecks = run.verification || []; return <tr key={run.run_id}><td><b>{text(run.jira_key || run.story || run.run_id)}</b><small>{text(run.branch, "")}</small></td><td>{when(run.finished_at || run.started_at)}</td><td><Badge value={run.status} /></td><td><PrLinks items={run.pull_requests || []} /></td><td>{countPassed(runChecks)}/{runChecks.length} passed</td><td>{elapsed(run.started_at, run.finished_at)}</td></tr>; }) : <tr><td colSpan={6}><Empty label="No delivery history yet." /></td></tr>}</tbody></table></div></Panel>
  </>;
}

function DeliveryFlow({ phases, deliveryStatus, startedAt, finishedAt }: { phases: RecordValue[]; deliveryStatus: string; startedAt?: string; finishedAt?: string }) {
  const terminalSuccess = /completed|dev_done|pr_open/i.test(deliveryStatus);
  return <div className="delivery-flow"><div className="flow-heading"><div><span>Delivery flow</span><strong>Execution path</strong></div><p>{startedAt ? `Started ${when(startedAt)}` : "Awaiting delivery trigger"}{finishedAt ? ` · Finished ${when(finishedAt)}` : ""}</p></div><ol className="flow-steps" style={{ "--flow-count": phases.length } as React.CSSProperties}>{phases.map((phase, index) => {
    const rawStatus = String(phase.status || "pending").toLowerCase();
    const state = terminalSuccess || rawStatus === "completed" ? "completed" : /running|progress/.test(rawStatus) ? "running" : /fail|block/.test(rawStatus) ? "failed" : "pending";
    return <li className={`flow-step ${state}`} key={`${phase.label}-${index}`}><div className="flow-node">{state === "completed" ? "✓" : index + 1}</div><div className="flow-copy"><strong>{text(phase.label)}</strong><span>{state === "completed" ? "Completed" : state === "running" ? "In progress" : state === "failed" ? "Needs attention" : "Pending"}</span></div></li>;
  })}</ol></div>;
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) { return <div className="fact"><span>{label}</span><strong>{value}</strong></div>; }
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) { return <div className="info-row"><span>{label}</span><div>{value}</div></div>; }
function PrLinks({ items }: { items: RecordValue[] }) { return items.length ? <span className="pr-links">{items.map((item, index) => <a href={item.url} target="_blank" key={`${item.url}-${index}`}>{text(item.repository, "Pull request")}{String(item.url || "").match(/\/(\d+)\/?$/) ? ` #${String(item.url).match(/\/(\d+)\/?$/)?.[1]}` : ""}</a>)}</span> : <>—</>; }

const promptStageMeta: Record<string, { title: string; description: string; icon: typeof Workflow }> = {
  "01-role-and-mission.md": { title: "Mission", description: "Scope, role, and review posture", icon: Sparkles },
  "02-pipeline.md": { title: "Pipeline", description: "End-to-end scan sequence", icon: Workflow },
  "03-configuration.md": { title: "Configuration", description: "Workspace and runtime inputs", icon: Settings2 },
  "04-workspace-and-worktrees.md": { title: "Worktrees", description: "Repository isolation and refresh", icon: GitBranch },
  "05-review-only-mode.md": { title: "Review mode", description: "Lightweight validation boundaries", icon: ScanSearch },
  "06-issue-registry.md": { title: "Issue registry", description: "Finding persistence and status", icon: CircleAlert },
  "07-error-handling.md": { title: "Error handling", description: "Failure recording and recovery", icon: CircleDot },
  "08-github-pr-and-git.md": { title: "Git and PR", description: "Branch, commit, and PR controls", icon: GitBranch },
  "09-severity-guideline.md": { title: "Severity", description: "Finding classification policy", icon: CircleAlert },
  "10-findings-and-auto-fix.md": { title: "Findings", description: "Review output and safe fixes", icon: Code2 },
  "11-output-contract.md": { title: "Output", description: "Structured result contract", icon: FileCode2 },
  "12-secrets-and-safety.md": { title: "Safety", description: "Secret redaction and boundaries", icon: ShieldCheck },
  "13-console-summary.md": { title: "Summary", description: "Console and report output", icon: CircleCheck },
  "01-role.md": { title: "Delivery role", description: "Delivery agent scope", icon: Sparkles },
  "02-workspace.md": { title: "Context", description: "Story, docs, and workspace inputs", icon: GitBranch },
  "03-implementation.md": { title: "Implementation", description: "Code changes and verification", icon: Code2 },
  "04-output-contract.md": { title: "Outcome", description: "PR, JIRA, and result record", icon: CircleCheck },
  "coding-guideline.md": { title: "Code standard", description: "Repository-level coding guidance", icon: FileCode2 }
};

function promptMeta(item: { path: string }) { return promptStageMeta[item.path] || { title: item.path.replace(/\.md$/, "").replace(/^\d+-/, ""), description: "Prompt fragment", icon: FileCode2 }; }

function PromptsView({ data, project, interact, notify }: { data: DashboardData; project: string; interact: (path: string, json: RecordValue, message: string) => Promise<void>; notify: (message: string) => void }) {
  const prompts = data.interactive?.prompts || [];
  const [mode, setMode] = useState<"scan" | "delivery">("scan");
  const [selected, setSelected] = useState<{ mode: "scan" | "delivery"; path: string } | null>(null);
  const [content, setContent] = useState("");
  const modePrompts = prompts.filter((item) => item.mode === mode);
  const choose = async (item: { mode: "scan" | "delivery"; path: string }) => {
    setSelected(item);
    try { const response = await request(`/api/prompt?mode=${encodeURIComponent(item.mode)}&path=${encodeURIComponent(item.path)}`, project); setContent(response.content); }
    catch (err) { notify(err instanceof Error ? err.message : "Unable to load prompt"); }
  };
  const switchMode = (next: "scan" | "delivery") => { setMode(next); setSelected(null); setContent(""); };
  return <><PageIntro title="PROMPTS" description="Trace the agent workflow, then inspect the instruction used at each stage." /><div className="workflow-mode-switch" role="tablist"><button className={mode === "scan" ? "active" : ""} onClick={() => switchMode("scan")}>Auto Scan</button><button className={mode === "delivery" ? "active" : ""} onClick={() => switchMode("delivery")}>Auto Delivery</button></div><Panel title={mode === "scan" ? "Auto Scan workflow" : "Auto Delivery workflow"} action={<span className="muted">Select a stage to inspect its prompt</span>} className="workflow-panel"><div className="workflow-map">{modePrompts.map((item, index) => { const meta = promptMeta(item); const Icon = meta.icon; const isSelected = selected?.mode === item.mode && selected.path === item.path; return <button className={`workflow-stage ${isSelected ? "selected" : ""}`} onClick={() => void choose(item)} key={`${item.mode}/${item.path}`}><span className="workflow-number">{String(index + 1).padStart(2, "0")}</span><Icon size={17} /><span><strong>{meta.title}</strong><small>{meta.description}</small></span></button>; })}</div></Panel><Panel title="Markdown editor" action={selected ? <button className="button primary" onClick={() => void interact("/api/prompt", { mode: selected.mode, path: selected.path, content }, "Prompt saved")}><Save size={15} />Save prompt</button> : undefined} className="prompt-panel"><div className="prompt-editor">{selected ? <><div className="editor-header"><div><h3>{promptMeta(selected).title}</h3><p><code>{selected.path}</code> · injected during the selected workflow stage</p></div></div><div className="markdown-workbench"><label className="markdown-pane"><span>Markdown</span><textarea value={content} onChange={(event) => setContent(event.target.value)} spellCheck={false} /></label><article className="markdown-preview"><span>Preview</span><div className="markdown-content"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div></article></div></> : <Empty label="Select a workflow stage to inspect and edit its prompt." />}</div></Panel></>;
}

function SettingsView({ data, project, interact, notify }: { data: DashboardData; project: string; interact: (path: string, json: RecordValue, message: string) => Promise<void>; notify: (message: string) => void }) {
  const workspace = data.interactive?.workspace || {};
  const schedules = data.interactive?.schedules || {};
  const [scanWindow, setScanWindow] = useState(String(workspace.scan_window_days || 7));
  const [scanCron, setScanCron] = useState(String(schedules.scan?.cron || "0 12 * * 1-5"));
  const [deliveryInterval, setDeliveryInterval] = useState(String(Math.round((schedules.delivery?.interval_seconds || 300) / 60)));
  const [deliveryStatus, setDeliveryStatus] = useState(String(schedules.delivery?.jira_status || "Ready for Dev"));
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [secrets, setSecrets] = useState<Record<string, string>>({});
  const getSecret = async (name: string) => { const response = await request(`/api/integration?key=${encodeURIComponent(name)}`, project); return String(response.value); };
  const reveal = async (name: string) => { try { const result = await getSecret(name); setSecrets((current) => ({ ...current, [name]: result })); notify("Integration value revealed"); } catch (err) { notify(err instanceof Error ? err.message : "Unable to reveal value"); } };
  const copy = async (name: string) => { try { const result = await getSecret(name); await navigator.clipboard.writeText(result); notify("Integration value copied"); } catch (err) { notify(err instanceof Error ? err.message : "Unable to copy value"); } };
  const edit = async (name: string) => { try { const result = await getSecret(name); setKey(name); setValue(result); notify("Integration value ready to edit"); } catch (err) { notify(err instanceof Error ? err.message : "Unable to load value"); } };
  const configured = workspace.configured_integrations || [];
  return <><PageIntro title="SETTINGS" description="Workspace configuration, scheduling, and local integrations." /><div className="settings-stack"><Panel title="Workspace"><div className="settings-section"><div className="settings-copy"><h4>Review window</h4><p>Controls how much repository history Auto Scan considers on each run.</p></div><div className="settings-control"><Field label="Lookback, days"><input type="number" min="1" max="365" value={scanWindow} onChange={(event) => setScanWindow(event.target.value)} /></Field><button className="button primary" onClick={() => void interact("/api/workspace", { scan_window_days: Number(scanWindow) }, "Workspace configuration saved")}><Save size={15} />Save</button></div></div><div className="settings-meta"><InfoRow label="Workspace" value={<code>{text(workspace.path)}</code>} /><InfoRow label="Configured integration keys" value={configured.length} /></div></Panel><Panel title="Automation schedules"><div className="settings-section"><div className="settings-copy"><h4>Auto Scan</h4><p>{text(schedules.scan?.description, "No recurring scan is configured.")}</p></div><div className="settings-control wide"><Field label="Five-field cron"><input value={scanCron} onChange={(event) => setScanCron(event.target.value)} /></Field><div className="button-row"><button className="button primary" onClick={() => void interact("/api/schedule", { kind: "scan", action: "save", cron: scanCron }, "Auto Scan schedule saved")}><Save size={15} />Save schedule</button>{schedules.scan && <button className="button danger" onClick={() => { if (window.confirm("Remove this local Auto Scan schedule?")) void interact("/api/schedule", { kind: "scan", action: "remove" }, "Auto Scan schedule removed"); }}><XCircle size={15} />Remove</button>}</div></div></div><div className="settings-section divider"><div className="settings-copy"><h4>Auto Delivery</h4><p>{text(schedules.delivery?.description, "No delivery polling is configured.")}</p></div><div className="settings-control wide"><div className="form-grid compact"><Field label="Interval, minutes"><input type="number" min="1" value={deliveryInterval} onChange={(event) => setDeliveryInterval(event.target.value)} /></Field><Field label="Eligible JIRA status"><input value={deliveryStatus} onChange={(event) => setDeliveryStatus(event.target.value)} /></Field></div><div className="button-row"><button className="button primary" onClick={() => void interact("/api/schedule", { kind: "delivery", action: "save", interval_minutes: Number(deliveryInterval), jira_status: deliveryStatus }, "Auto Delivery schedule saved")}><Save size={15} />Save schedule</button>{schedules.delivery && <button className="button danger" onClick={() => { if (window.confirm("Remove this local Auto Delivery schedule?")) void interact("/api/schedule", { kind: "delivery", action: "remove" }, "Auto Delivery schedule removed"); }}><XCircle size={15} />Remove</button>}</div></div></div></Panel><Panel title="Local integration keys" action={<span className="muted">Stored only in this workspace</span>}><div className="settings-section"><div className="settings-copy"><h4>Available keys</h4><p>Only values that are actually configured are shown. GitHub pull requests use the authenticated <code>gh</code> session unless a scheduled job needs an explicit token.</p></div><div className="settings-control wide"><div className="secret-list">{configured.length ? configured.map((name: string) => <div className="secret-row" key={name}><code>{name}</code><input readOnly type={secrets[name] ? "text" : "password"} value={secrets[name] || "••••••••••••"} aria-label={`Value for ${name}`} /><div><IconButton label="Reveal value" onClick={() => void reveal(name)}>{secrets[name] ? <EyeOff size={15} /> : <Eye size={15} />}</IconButton><IconButton label="Copy value" onClick={() => void copy(name)}><Copy size={15} /></IconButton><IconButton label="Edit value" onClick={() => void edit(name)}><Pencil size={15} /></IconButton></div></div>) : <Empty label="No local integration keys configured." />}</div></div></div><div className="settings-section divider"><div className="settings-copy"><h4>Add or replace key</h4><p>Use this for a webhook, agent credential, or a scheduler-only GitHub token.</p></div><div className="settings-control wide"><Field label="Variable name"><input placeholder="FEISHU_WEBHOOK_URL" value={key} onChange={(event) => setKey(event.target.value)} /></Field><Field label="Value"><input type="password" placeholder="Paste a new value" value={value} onChange={(event) => setValue(event.target.value)} /></Field><button className="button primary" onClick={() => { void interact("/api/integration", { key, value }, "Integration key saved"); setValue(""); }}><Save size={15} />Save key</button></div></div></Panel></div></>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }

createRoot(document.getElementById("root")!).render(<App />);
