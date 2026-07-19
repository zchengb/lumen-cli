import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { version as lumenVersion } from "../package.json";
import {
  Activity, ChevronDown, CircleAlert, CircleCheck, CircleDot, Code2, Copy,
  Eye, EyeOff, ExternalLink, FileCode2, FolderGit2, GitBranch, LoaderCircle, Menu,
  RotateCcw, Save, ScanSearch, Settings2, Terminal,
  Maximize2, Minimize2, ShieldCheck, Sparkles, Truck, Workflow
} from "lucide-react";
import "./styles.css";

type RecordValue = Record<string, any>;
type Tab = "scan" | "delivery" | "repositories" | "prompts" | "settings";

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
  delivery?: { current?: RecordValue; runs?: RecordValue[]; scheduler_activity?: RecordValue[]; scheduler_log_available?: boolean; config?: RecordValue };
}

const tabItems: Array<{ id: Tab; label: string; icon: typeof ScanSearch }> = [
  { id: "scan", label: "AUTO SCAN", icon: ScanSearch },
  { id: "delivery", label: "AUTO DELIVERY", icon: Truck },
  { id: "repositories", label: "REPOSITORY", icon: FolderGit2 },
  { id: "prompts", label: "WORKFLOW", icon: Workflow },
  { id: "settings", label: "SETTINGS", icon: Settings2 }
];

const tabContext: Record<Tab, { title: string; description: string }> = {
  scan: { title: "AUTO SCAN", description: "Review history and manage tracked findings." },
  delivery: { title: "AUTO DELIVERY", description: "Story execution, verification, and pull request delivery." },
  repositories: { title: "REPOSITORY", description: "Local repositories, scan profiles, and delivery verification commands." },
  prompts: { title: "WORKFLOW", description: "The prompts, scripts, control points, and recovery paths behind each local automation." },
  settings: { title: "SETTINGS", description: "Workspace configuration, scheduling, and local integrations." }
};

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
function durationMs(value: unknown) {
  if (value === undefined || value === null || value === "") return "—";
  const milliseconds = Number(value);
  if (!Number.isFinite(milliseconds)) return "—";
  if (milliseconds < 1000) return `${Math.round(milliseconds)}ms`;
  const seconds = Math.round(milliseconds / 1000);
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}
function statusTone(value: unknown) {
  const normalized = String(value || "unknown").toLowerCase();
  if (/(completed|succeeded|clean|passed|resolved|synced|configured|included|available)/.test(normalized)) return "success";
  if (/(failed|blocked|open)/.test(normalized)) return "danger";
  if (/(progress|running|active|partial)/.test(normalized)) return "info";
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

function IconButton({ label, children, onClick, danger = false, className = "" }: { label: string; children: React.ReactNode; onClick: () => void; danger?: boolean; className?: string }) {
  return <button className={`icon-button ${danger ? "danger" : ""} ${className}`} title={label} aria-label={label} onClick={onClick}>{children}</button>;
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
  const [settingsDirty, setSettingsDirty] = useState(false);

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

  const confirmLeaveSettings = () => !settingsDirty || window.confirm("You have unsaved Settings changes. Leave without saving?");
  const changeProject = (slug: string) => {
    if (slug !== project && !confirmLeaveSettings()) return;
    const url = new URL(window.location.href);
    url.searchParams.set("project", slug);
    window.history.replaceState({}, "", url);
    setProject(slug);
    setSettingsDirty(false);
  };
  const interact = async (path: string, json: RecordValue, message: string) => {
    try { await request(path, project, { method: "POST", json }); setNotice(message); await load(); }
    catch (err) { setNotice(err instanceof Error ? err.message : "Request failed"); }
  };
  const projects = data?.interactive?.projects || [];
  const tagline = data?.product?.tagline || "Engineering, made legible.";
  const context = tabContext[activeTab];

  return <main className={`dashboard-layout ${sidebarCollapsed ? "sidebar-is-collapsed" : ""}`}>
    <aside className="sidebar" aria-label="Lumen navigation">
      <div className="sidebar-brand">
        <img src="assets/lumen-mark.png" className="brand-mark" alt="Lumen" />
        <div className="sidebar-brand-copy"><strong>Lumen</strong><span>{tagline}</span></div>
      </div>
      <nav className="side-nav" aria-label="Dashboard sections">{tabItems.map((item) => { const Icon = item.icon; return <button title={item.label} className={activeTab === item.id ? "active" : ""} onClick={() => { if (item.id !== activeTab && !confirmLeaveSettings()) return; setActiveTab(item.id); if (item.id !== "settings") setSettingsDirty(false); }} key={item.id}><Icon size={17} /><span>{item.label}</span></button>; })}</nav>
      <div className="sidebar-foot">
        {!sidebarCollapsed && <img src="assets/inspire-group-logo.png" className="company-mark" alt="INSPIRE GROUP" />}
        <small>{sidebarCollapsed ? `V${lumenVersion}` : `Version ${lumenVersion}`}</small>
      </div>
    </aside>
    <IconButton className="sidebar-toggle" label={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"} onClick={() => setSidebarCollapsed((value) => !value)}><Menu size={14} /></IconButton>
    <section className="content-area">
      <header className="masthead">
        <div className="masthead-context"><strong>{context.title}</strong><span>{context.description}</span></div>
        <div className="masthead-actions"><span className="last-updated">{lastUpdated ? `Updated ${when(lastUpdated.toISOString())}` : "Syncing…"}</span><label className="project-picker"><span>Project</span><select value={project} onChange={(event) => changeProject(event.target.value)}>{projects.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select><ChevronDown size={15} /></label></div>
      </header>
      <div className="page-content">
        {error && <div className="status-note"><Activity size={15} />{error}</div>}
        {!data && loading ? <div className="loading-state"><LoaderCircle size={22} className="spin" /> Loading local workspace state…</div> : null}
        {data && activeTab === "scan" && <ScanView data={data} project={project} interact={interact} />}
        {data && activeTab === "delivery" && <DeliveryView data={data} project={project} />}
        {data && activeTab === "repositories" && <RepositoryView data={data} interact={interact} />}
        {data && activeTab === "prompts" && <PromptsView data={data} project={project} interact={interact} notify={setNotice} />}
        {data && activeTab === "settings" && <SettingsView data={data} project={project} notify={setNotice} onDirtyChange={setSettingsDirty} reload={load} />}
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
    <section className="metrics"><Metric label="Open findings" value={openIssues.length} onClick={jumpToFindings} /><Metric label="Successful · 7d" value={stats.success_7d || 0} /><Metric label="Failed · 7d" value={stats.failed_7d || 0} /><Metric label="Lookback window" value={`${data.scan_window_days || 7}d`} /></section>
    <Panel title="Scan History" action={<span className="muted">{runs.length} runs</span>}><div className="table-scroll"><table><thead><tr><th>Started</th><th>Status</th><th>Issues</th><th>Duration</th><th>Artifacts</th></tr></thead><tbody>{pageRuns.map((run: RecordValue) => <tr key={run.id}><td>{when(run.started_at || run.finished_at)}</td><td><Badge value={run.status} /></td><td><SeverityBreakdown run={run} /></td><td>{text(run.duration)}</td><td><div className="artifact-links">{run.html && <a href={`${run.html}?project=${encodeURIComponent(project)}`} target="_blank">HTML</a>}{run.pdf && <a href={`${run.pdf}?project=${encodeURIComponent(project)}`} target="_blank">PDF</a>}{!run.html && !run.pdf && "—"}</div></td></tr>)}</tbody></table></div>{runs.length > runPageSize && <Pagination page={runPage} pageCount={Math.ceil(runs.length / runPageSize)} onChange={setRunPage} />}</Panel>
    <Panel title="Tracked Findings" action={<span className="muted">{filteredIssues.length} of {issues.length} records</span>}><div className="finding-filters" role="tablist">{(["all", "open", "resolved", "ignored"] as const).map((value) => <button className={filter === value ? "active" : ""} onClick={() => setFilter(value)} key={value}>{value === "all" ? "All" : titleStatus(value)} <span>{counts[value]}</span></button>)}</div><div id="tracked-findings" className="findings">{filteredIssues.length ? filteredIssues.map((issue: RecordValue) => <Finding issue={issue} onIgnore={() => setIgnoreCandidate(issue)} key={issue.id} />) : <Empty label="No findings match this status." />}</div></Panel>
    {ignoreCandidate && <IgnoreDialog onClose={() => setIgnoreCandidate(null)} onConfirm={(reason) => { void interact("/api/issue/ignore", { issue_id: ignoreCandidate.id, reason }, "Finding ignored"); setIgnoreCandidate(null); }} />}
  </>;
}

function Metric({ label, value, onClick }: { label: string; value: string | number; onClick?: () => void }) { return <div className={`metric ${onClick ? "metric-action" : ""}`} onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={(event) => { if (onClick && (event.key === "Enter" || event.key === " ")) onClick(); }}><span>{label}</span><strong>{value}</strong></div>; }
function Empty({ label }: { label: string }) { return <div className="empty"><ShieldCheck size={20} />{label}</div>; }
function SeverityBreakdown({ run }: { run: RecordValue }) {
  const levels = [["High", Number(run.high || 0), "high"], ["Medium", Number(run.medium || 0), "medium"], ["Low", Number(run.low || 0), "low"]] as const;
  const present = levels.filter(([, count]) => count > 0);
  return present.length ? <span className="severity-breakdown">{present.map(([label, count, tone]) => <b className={tone} key={label}>{label}: {count}</b>)}</span> : <>—</>;
}
function Pagination({ page, pageCount, onChange }: { page: number; pageCount: number; onChange: (page: number) => void }) { return <footer className="pagination"><span>Page {page + 1} of {pageCount}</span><div><button className="button secondary" disabled={page === 0} onClick={() => onChange(page - 1)}>Previous</button><button className="button secondary" disabled={page === pageCount - 1} onClick={() => onChange(page + 1)}>Next</button></div></footer>; }
function Finding({ issue, onIgnore }: { issue: RecordValue; onIgnore: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const status = issue.status || issue.issue_status || "open";
  const isIgnorable = !["ignored", "resolved", "accepted_risk", "false_positive"].includes(String(status).toLowerCase());
  return <article className="finding"><div className="finding-main"><div className="finding-copy"><div className="finding-heading"><h4>{text(issue.title, "Untitled finding")}</h4><Badge value={status} /></div><p className="finding-meta"><code className="finding-id">{text(issue.id)}</code><i>|</i>{text(issue.repository, "Unknown repository")} <i>|</i> {when(issue.last_seen_at)}</p><div className="finding-links finding-row-links"><button className="finding-link" onClick={() => setExpanded(!expanded)}>{expanded ? "Hide detail" : "View detail"}</button>{issue.jira_key && issue.jira_url && <a className="finding-link" href={issue.jira_url} target="_blank" rel="noreferrer">{issue.jira_key}<ExternalLink size={12} /></a>}{issue.pr_url && <a className="finding-link" href={issue.pr_url} target="_blank" rel="noreferrer">Pull request<ExternalLink size={12} /></a>}</div></div><div className="finding-actions">{isIgnorable && <button className="button secondary" onClick={onIgnore}>Mark ignored</button>}</div></div>{expanded && <div className="finding-detail"><FindingDetail label="Impact" value={issue.impact} /><FindingDetail label="Trigger" value={issue.trigger} /><FindingDetail label="Root cause" value={issue.root_cause} /><FindingDetail label="Code" value={issue.code_snippet} code /><FindingDetail label="Recommended correction" value={issue.suggestion} /><FindingDetail label="Validation" value={issue.validation} /></div>}</article>;
}

function FindingDetail({ label, value, code = false }: { label: string; value: unknown; code?: boolean }) { return <section className="finding-detail-row"><h5>{label}</h5>{code ? <pre><code>{text(value, "No code snippet was captured for this historical finding.")}</code></pre> : <p>{text(value, "Not recorded.")}</p>}</section>; }
function IgnoreDialog({ onClose, onConfirm }: { onClose: () => void; onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState("");
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-label="Ignore finding" onMouseDown={(event) => event.stopPropagation()}><div className="modal-body compact"><strong>Mark this finding as ignored?</strong><Field label="Reason (optional)"><textarea className="ignore-reason" rows={2} autoFocus value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why is this safe to ignore?" /></Field></div><footer><button className="button" onClick={onClose}>Cancel</button><button className="button primary" onClick={() => onConfirm(reason)}>Mark ignored</button></footer></section></div>;
}

function DeliveryView({ data, project }: { data: DashboardData; project: string }) {
  const delivery = data.delivery || {};
  const current = delivery.current || {};
  const runs = delivery.runs || [];
  const stages = current.stages || [];
  const schedulerActivity = delivery.scheduler_activity || [];
  const [selectedStage, setSelectedStage] = useState<RecordValue | null>(null);
  const [selectedChecks, setSelectedChecks] = useState<RecordValue[] | null>(null);
  const [logContent, setLogContent] = useState("");
  const [logError, setLogError] = useState("");
  const [loadingLog, setLoadingLog] = useState(false);
  const [schedulerLogOpen, setSchedulerLogOpen] = useState(false);
  const [traceDetail, setTraceDetail] = useState<RecordValue | null>(null);
  const [traceError, setTraceError] = useState("");
  const [loadingTrace, setLoadingTrace] = useState(false);
  const [retryOpen, setRetryOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState("");
  const [now, setNow] = useState(Date.now());
  const running = /in_progress|running/i.test(String(current.delivery_status || ""));
  const loadDeliveryLog = useCallback(async (runId = current.run_id || "", refresh = false) => {
    if (!refresh) setLoadingLog(true);
    try { const response = await request(`/api/delivery/log?run_id=${encodeURIComponent(runId)}`, project); setLogContent(response.content || "No log content recorded."); setLogError(""); }
    catch (err) { setLogError(err instanceof Error ? err.message : "Unable to load delivery log"); }
    finally { setLoadingLog(false); }
  }, [current.run_id, project]);
  useEffect(() => { if (!running) return; const id = window.setInterval(() => setNow(Date.now()), 1_000); return () => window.clearInterval(id); }, [running]);
  const selectedLogIsLive = Boolean(selectedStage && running && selectedStage.run_id === current.run_id);
  useEffect(() => { if (!selectedLogIsLive || !selectedStage) return; const id = window.setInterval(() => void loadDeliveryLog(selectedStage.run_id, true), 1_000); return () => window.clearInterval(id); }, [selectedStage, selectedLogIsLive, loadDeliveryLog]);
  const openStage = async (stage: RecordValue, runId = current.run_id || "") => {
    setSelectedStage({ ...stage, run_id: runId }); setLogContent(""); setLogError(""); await loadDeliveryLog(runId);
  };
  const openSchedulerLog = async () => {
    setSchedulerLogOpen(true); setLogContent(""); setLogError(""); setLoadingLog(true);
    try { const response = await request("/api/delivery/scheduler-log", project); setLogContent(response.content || "No scheduler output recorded."); }
    catch (err) { setLogError(err instanceof Error ? err.message : "Unable to load scheduler log"); }
    finally { setLoadingLog(false); }
  };
  const openTrace = async (runId: string) => {
    setLoadingTrace(true); setTraceError(""); setTraceDetail({ trace: { trace_id: runId }, invocations: [] });
    try { setTraceDetail(await request(`/api/delivery/trace?run_id=${encodeURIComponent(runId)}`, project)); }
    catch (err) { setTraceError(err instanceof Error ? err.message : "Unable to load Agent Trace"); }
    finally { setLoadingTrace(false); }
  };
  const retry = async () => {
    setRetrying(true); setRetryError("");
    try { await request("/api/delivery/retry", project, { method: "POST", json: {} }); setRetryOpen(false); }
    catch (err) { setRetryError(err instanceof Error ? err.message : "Unable to retry delivery"); }
    finally { setRetrying(false); }
  };
  const canRetry = /failed|blocked/i.test(String(current.delivery_status || ""));
  return <>
    <Panel title="Current Progress" className="delivery-summary" action={canRetry ? <button className="button secondary" onClick={() => setRetryOpen(true)}><RotateCcw size={14} />Reset & retry</button> : undefined}><div className="delivery-facts"><Fact label="Current story" value={<StoryReference jiraKey={current.jira_key || current.story_id} title={current.story_title} />} /><Fact label="Status" value={<Badge value={current.delivery_status || "not started"} />} /><Fact label="Elapsed" value={elapsed(current.started_at, current.finished_at || (running ? new Date(now).toISOString() : undefined))} /><Fact label="Finished" value={running ? "Running" : when(current.finished_at)} /></div><DeliveryFlow stages={stages} deliveryStatus={String(current.delivery_status || "")} startedAt={current.started_at} finishedAt={current.finished_at} remediation={current.remediation} now={now} onStageClick={openStage} /></Panel>
    {current.agent_trace?.status === "available" && <AgentTraceOverview trace={current.agent_trace} delivery={current} onOpen={() => void openTrace(current.agent_trace.trace_id)} />}
    <Panel title="Delivery History" className="history-panel" action={<span className="muted">{runs.length} runs</span>}><div className="table-scroll"><table><thead><tr><th>Story</th><th>Finished</th><th>Status</th><th>Pull requests</th><th>Checks</th><th>Duration</th><th>Trace</th></tr></thead><tbody>{runs.length ? runs.map((run: RecordValue) => { const runChecks = run.verification || []; const failed = runChecks.filter((item: RecordValue) => item.status === "failed"); const canInspectStatus = failed.length || /failed|blocked/i.test(String(run.status)); return <tr key={run.run_id}><td><div className="history-story"><span className="history-story-line"><code>{text(run.jira_key || run.story || run.run_id)}</code>{run.story_title && <span className="history-story-title">{run.story_title}</span>}</span><small>{text(run.branch, "")}</small></div></td><td>{when(run.finished_at || run.started_at)}</td><td>{canInspectStatus ? <button className="status-badge-button" title="Open failure log" onClick={() => void openStage({ label: "Delivery failure", duration: elapsed(run.started_at, run.finished_at), detail: failed.map((item: RecordValue) => item.summary || item.label).filter(Boolean).join(" · ") || "Open the delivery log for details." }, run.run_id)}><Badge value={run.status} /></button> : <Badge value={run.status} />}</td><td><PrLinks items={run.pull_requests || []} /></td><td><VerificationSummary checks={runChecks} onClick={() => setSelectedChecks(runChecks)} /></td><td>{elapsed(run.started_at, run.finished_at)}</td><td>{run.agent_trace?.status === "available" ? <button className="trace-inspect-link" onClick={() => void openTrace(run.agent_trace.trace_id || run.run_id)}><Eye size={13} />Inspect</button> : "—"}</td></tr>; }) : <tr><td colSpan={7}><Empty label="No delivery history yet." /></td></tr>}</tbody></table></div></Panel>
    <Panel title="Scheduler Activity" action={<span className="panel-actions"><span className="muted">{schedulerActivity.length} recent events</span>{delivery.scheduler_log_available && <button className="button secondary" onClick={() => void openSchedulerLog()}><Terminal size={14} />View raw log</button>}</span>}><div className="scheduler-activity">{schedulerActivity.length ? schedulerActivity.map((event: RecordValue, index: number) => <article className="scheduler-event" key={`${event.at}-${index}`}><Badge value={event.outcome} /><div><strong>{text(event.story_id || event.jira_key, "Workspace")}</strong><p>{text(event.message)}</p></div><time>{when(event.at)}</time></article>) : <Empty label="No scheduled delivery activity recorded yet." />}</div></Panel>
    {selectedStage && <DeliveryLogDialog stage={selectedStage} content={logContent} error={logError} loading={loadingLog} live={selectedLogIsLive} onClose={() => setSelectedStage(null)} />}
    {schedulerLogOpen && <DeliveryLogDialog stage={{ label: "Scheduler log", duration: "Recent raw output", detail: "Launchd output is capped at 256 KiB; structured activity retains the latest 200 events." }} content={logContent} error={logError} loading={loadingLog} onClose={() => setSchedulerLogOpen(false)} />}
    {selectedChecks && <VerificationDialog checks={selectedChecks} onClose={() => setSelectedChecks(null)} />}
    {traceDetail && <AgentTraceDialog payload={traceDetail} error={traceError} loading={loadingTrace} onClose={() => setTraceDetail(null)} />}
    {retryOpen && <RetryDeliveryDialog story={text(current.jira_key || current.story_id)} busy={retrying} error={retryError} onClose={() => setRetryOpen(false)} onConfirm={() => void retry()} />}
  </>;
}

function RetryDeliveryDialog({ story, busy, error, onClose, onConfirm }: { story: string; busy: boolean; error: string; onClose: () => void; onConfirm: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={busy ? undefined : onClose}><section className="modal" role="dialog" aria-modal="true" aria-label="Reset and retry delivery" onMouseDown={(event) => event.stopPropagation()}><div className="modal-body compact"><strong>Retry {story}?</strong><p>This starts a new delivery run from the approved plan. The failed run and its logs stay in history.</p>{error && <p className="status-note">{error}</p>}</div><footer><button className="button" disabled={busy} onClick={onClose}>Cancel</button><button className="button primary" disabled={busy} onClick={onConfirm}><RotateCcw size={14} />{busy ? "Starting…" : "Reset & retry"}</button></footer></section></div>;
}

function StoryReference({ jiraKey, title }: { jiraKey: string; title?: string }) { return <span className="story-reference"><code>{text(jiraKey, "No active delivery")}</code>{title && <span>{title}</span>}</span>; }
function DeliveryFlow({ stages, deliveryStatus, startedAt, finishedAt, remediation, now, onStageClick }: { stages: RecordValue[]; deliveryStatus: string; startedAt?: string; finishedAt?: string; remediation?: RecordValue; now: number; onStageClick: (stage: RecordValue) => void }) {
  const terminalSuccess = /completed|dev_done|pr_open/i.test(deliveryStatus);
  const retrying = remediation?.status === "in_progress";
  const retry = retrying ? `${remediation.attempt}/${remediation.max_attempts}` : "";
  const states = stages.map((stage) => { const rawStatus = String(stage.status || "pending").toLowerCase(); return terminalSuccess || rawStatus === "completed" ? "completed" : /running|progress/.test(rawStatus) ? "running" : /fail|block/.test(rawStatus) ? "failed" : "pending"; });
  const progressUnits = states.reduce((total, state) => total + (state === "completed" ? 1 : state === "running" ? .5 : 0), 0);
  const progress = stages.length > 1 ? Math.max(0, Math.min(100, ((progressUnits - 1) / (stages.length - 1)) * 100)) : 100;
  return <div className="delivery-flow"><div className="flow-heading"><div><span className="flow-title">Delivery Flow</span>{retrying && <strong className="remediation-alert"><RotateCcw size={13} />Verification failed · Remediation retry {retry}</strong>}</div><p>{startedAt ? `Started ${when(startedAt)}` : "Awaiting delivery trigger"}{finishedAt ? ` · Finished ${when(finishedAt)}` : ""}</p></div><div className="flow-track-wrap"><span className="flow-track"><i style={{ width: `${progress}%` }} /></span><ol className="flow-steps" style={{ "--flow-count": stages.length } as React.CSSProperties}>{stages.map((stage, index) => {
    const rawStatus = String(stage.status || "pending").toLowerCase();
    const state = terminalSuccess || rawStatus === "completed" ? "completed" : /running|progress/.test(rawStatus) ? "running" : /fail|block/.test(rawStatus) ? "failed" : "pending";
    const duration = state === "running" ? elapsed(stage.started_at, new Date(now).toISOString()) : stage.duration || "Pending";
    const shownDuration = `${duration}${stage.duration_kind === "span" && duration !== "Pending" ? " span" : ""}`;
    const caption = retrying && state === "running" && ["implement", "verification"].includes(stage.id) ? `Retry ${retry} · ${shownDuration}` : retrying && stage.id === "verification" && state === "failed" ? `Failed · remediation ${retry}` : state === "failed" ? "Needs attention" : shownDuration;
    return <li className={`flow-step ${state}`} key={`${stage.label}-${index}`}><button className="flow-stage-button" onClick={() => onStageClick(stage)}><span className="flow-marker">{state === "completed" ? "✓" : state === "running" ? <span className="pulse-dot" /> : index + 1}</span><span className="flow-copy"><strong>{text(stage.label)}</strong><span>{caption}</span></span></button></li>;
  })}</ol></div></div>;
}

function DeliveryLogDialog({ stage, content, error, loading, live = false, onClose }: { stage: RecordValue; content: string; error: string; loading: boolean; live?: boolean; onClose: () => void }) { const logRef = useRef<HTMLPreElement>(null); useEffect(() => { if (live && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [content, live]); return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal delivery-log-modal" role="dialog" aria-modal="true" aria-label={`${stage.label} log`} onMouseDown={(event) => event.stopPropagation()}><div className="delivery-log-header"><div><span>{stage.label}</span><strong>{stage.duration || "—"}{live && <em className="live-log"><i />Live · 1s</em>}</strong><p>{stage.detail || "Delivery log excerpt"}</p></div><button className="button secondary" onClick={onClose}>Close</button></div><pre ref={logRef} className="delivery-log-content"><code>{loading && !content ? "Loading log…" : error || content}</code></pre></section></div>; }

function Fact({ label, value }: { label: string; value: React.ReactNode }) { return <div className="fact"><span>{label}</span><strong>{value}</strong></div>; }
function PrLinks({ items }: { items: RecordValue[] }) { return items.length ? <span className="pr-links">{items.map((item, index) => <a href={item.url} target="_blank" rel="noreferrer" key={`${item.url}-${index}`}>{text(item.repository, "Pull request")}{String(item.url || "").match(/\/(\d+)\/?$/) ? ` #${String(item.url).match(/\/(\d+)\/?$/)?.[1]}` : ""}<ExternalLink size={12} /></a>)}</span> : <>—</>; }
function VerificationSummary({ checks, onClick }: { checks: RecordValue[]; onClick: () => void }) { const failed = checks.filter((item) => item.status === "failed").length; const passed = checks.filter((item) => item.status === "passed").length; return checks.length ? <button className={`check-summary ${failed ? "failed" : ""}`} title="Open verification details" onClick={onClick}>{failed ? `${failed} failed` : `${passed}/${checks.length} passed`}</button> : <>—</>; }
function VerificationDialog({ checks, onClose }: { checks: RecordValue[]; onClose: () => void }) { return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal verification-modal" role="dialog" aria-modal="true" aria-label="Verification checks" onMouseDown={(event) => event.stopPropagation()}><div className="delivery-log-header"><div><span>Verification</span><strong>Checks</strong><p>{checks.filter((item) => item.status === "passed").length} passed · {checks.filter((item) => item.status === "failed").length} failed · {checks.filter((item) => item.status === "skipped").length} skipped</p></div><button className="button secondary" onClick={onClose}>Close</button></div><div className="verification-list">{checks.map((check, index) => <article className="verification-check" key={`${check.repository}-${check.id}-${index}`}><div><strong>{text(check.label)}</strong><span>{text(check.repository, "Workspace")}</span></div><Badge value={check.status} /><p>{text(check.summary, "No summary recorded.")}</p>{check.command && <code>{check.command}</code>}</article>)}</div></section></div>; }

function AgentTraceOverview({ trace, delivery, onOpen }: { trace: RecordValue; delivery: RecordValue; onOpen: () => void }) {
  const invocations = trace.invocations || [];
  const agentMs = invocations.reduce((sum: number, item: RecordValue) => sum + Number(item.duration_ms || 0), 0);
  return <Panel title="Agent Trace" className="agent-trace-panel" action={<button className="button secondary" onClick={onOpen}><Activity size={14} />View trace</button>}><p className="trace-local-note"><ShieldCheck size={14} />{invocations.length} stage{invocations.length === 1 ? "" : "s"} · {durationMs(agentMs)} agent time · inputs and outputs redacted locally</p><div className="trace-stage-strip">{invocations.map((item: RecordValue, index: number) => <article key={item.invocation_id}><span>{index + 1}</span><strong>{titleStatus(item.stage || item.invocation_id)}</strong><Badge value={item.status} /><small>{durationMs(item.duration_ms)}</small></article>)}</div>{!invocations.length && <Empty label={`No agent stages were captured during this ${elapsed(delivery.started_at, delivery.finished_at)} delivery.`} />}</Panel>;
}

function AgentTraceDialog({ payload, error, loading, onClose }: { payload: RecordValue; error: string; loading: boolean; onClose: () => void }) {
  const invocations = payload.invocations || [];
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const selected = invocations.find((item: RecordValue) => item.invocation_id === selectedId) || invocations[0] || {};
  const spanEvents = (payload.spans || []).map((span: RecordValue) => ({ event_id: `span-${span.span_id}`, timestamp: span.started_at, type: span.name, duration_ms: span.duration_ms, status: span.status }));
  const events = [...spanEvents, ...(selected.events || [])].filter((event: RecordValue) => JSON.stringify(event).toLowerCase().includes(query.toLowerCase())).sort((left: RecordValue, right: RecordValue) => String(left.timestamp).localeCompare(String(right.timestamp)));
  const requestData = selected.request || {}, result = selected.result || {}, files = selected.changed_files?.files || [];
  const input = String(selected.prompt || "");
  const output = String(selected.final_output || selected.stdout || "");
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal trace-modal" role="dialog" aria-modal="true" aria-label="Agent Trace" onMouseDown={(event) => event.stopPropagation()}>
    <div className="delivery-log-header trace-header"><div><span>Agent Trace</span><strong>Stage-by-stage execution</strong><p>{invocations.length} stage{invocations.length === 1 ? "" : "s"} · {text(payload.trace?.capture_mode)} capture · redacted locally</p></div><button className="button secondary" onClick={onClose}>Close</button></div>
    {loading ? <div className="loading-state"><LoaderCircle size={20} className="spin" />Loading trace…</div> : error ? <div className="status-note"><CircleAlert size={15} />{error}</div> : <div className="trace-workbench">
      <nav className="trace-stage-nav" aria-label="Agent stages">{invocations.map((item: RecordValue, index: number) => <button className={item.invocation_id === selected.invocation_id ? "active" : ""} onClick={() => { setSelectedId(item.invocation_id); setQuery(""); }} key={item.invocation_id}><span className="trace-stage-number">{index + 1}</span><span><strong>{titleStatus(item.request?.stage || item.stage || item.invocation_id)}</strong><small>Attempt {text(item.request?.attempt || item.attempt, "1")}</small></span><span><Badge value={item.result?.status || item.status} /><small>{durationMs(item.result?.duration_ms ?? item.duration_ms)}</small></span></button>)}</nav>
      <main className="trace-stage-view">
        <div className="trace-io-grid">
          <article className="trace-document"><header><div><span>Input</span><strong>Instructions and context</strong></div><small>{Number(requestData.prompt_characters || input.length).toLocaleString()} chars{selected.truncated?.prompt ? " · truncated" : ""}</small></header><div className="markdown-content">{input ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown> : <Empty label="Input body is available only in full capture mode." />}</div></article>
          <article className="trace-document"><header><div><span>Output</span><strong>Agent response</strong></div><small>{durationMs(result.time_to_first_output_ms)} to first output{selected.truncated?.final_output ? " · truncated" : ""}</small></header><div className="markdown-content">{output ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown> : <Empty label="No agent response was captured." />}</div></article>
        </div>
        <details className="trace-technical"><summary><span>Technical details</span><small>{events.length} events · {files.length} files · {text(payload.trace?.trace_id)}</small></summary><div>
          <section className="trace-technical-facts"><Fact label="Model" value={text(requestData.model)} /><Fact label="API duration" value={durationMs(result.provider_api_duration_ms)} /><Fact label="Exit code" value={text(result.exit_code)} /><Fact label="Session" value={<code>{text(result.session_id)}</code>} /></section>
          <details><summary>Context sources · {(selected.context_manifest?.sources || []).length}</summary><div className="trace-sources">{(selected.context_manifest?.sources || []).map((source: RecordValue, index: number) => <span key={`${source.path}-${index}`}><Badge value={source.included ? "included" : "missing"} /><code>{text(source.type)}</code><small>{text(source.path)}</small></span>)}</div></details>
          <details><summary>Events · {events.length}</summary><div className="trace-technical-body"><input className="trace-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events" /><div className="trace-timeline">{events.map((event: RecordValue) => <article key={event.event_id}><time>{when(event.timestamp)}</time><span className={`timeline-dot ${statusTone(event.status || event.type)}`} /><div><strong>{text(event.type)}</strong><p>{text(event.tool?.name || event.message || event.error, "")}</p><small>{event.duration_ms != null ? durationMs(event.duration_ms) : ""}</small></div></article>)}</div></div></details>
          <details><summary>Changed files · {files.length}</summary><div className="trace-files">{files.length ? files.map((file: RecordValue) => <article key={`${file.repository}-${file.path}`}><Badge value={file.status} /><code>{file.repository}/{file.path}</code><span>+{text(file.additions, "?")} −{text(file.deletions, "?")}</span></article>) : <Empty label="No files were attributed to this stage." />}</div></details>
          {(selected.stderr || (selected.stdout && selected.final_output)) && <details><summary>Raw logs</summary>{[["stdout", selected.stdout, "stdout"], ["stderr", selected.stderr, "stderr"]].map(([label, content, key]) => content ? <details key={String(key)}><summary>{String(label)}{selected.truncated?.[String(key)] ? " · truncated" : ""}</summary><pre><code>{String(content)}</code></pre></details> : null)}</details>}
        </div></details>
      </main>
    </div>}
  </section></div>;
}

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
function promptLayer(item: { path: string }, mode: "scan" | "delivery") {
  const path = item.path;
  if (mode === "delivery") {
    if (["01-role.md", "02-workspace.md", "coding-guideline.md"].includes(path)) return "Inputs & Governance";
    if (path === "03-implementation.md") return "Implementation";
    return "Delivery Outputs";
  }
  if (["01-role-and-mission.md", "03-configuration.md", "04-workspace-and-worktrees.md", "12-secrets-and-safety.md"].includes(path)) return "Inputs & Governance";
  if (["02-pipeline.md", "05-review-only-mode.md", "09-severity-guideline.md", "10-findings-and-auto-fix.md"].includes(path)) return "Review Execution";
  if (["06-issue-registry.md", "07-error-handling.md", "08-github-pr-and-git.md"].includes(path)) return "Operational Controls";
  return "Delivery Outputs";
}

type WorkflowColumn = {
  title: string;
  eyebrow: string;
  layers: string[];
  scripts: Array<{ name: string; description: string }>;
};

function workflowColumns(mode: "scan" | "delivery"): WorkflowColumn[] {
  if (mode === "delivery") return [
    { title: "Trigger", eyebrow: "ENTRY", layers: [], scripts: [{ name: "delivery_scheduler.py", description: "Find an approved, eligible story" }, { name: "prepare_delivery_run.py", description: "Create the run record" }] },
    { title: "Context", eyebrow: "GROUNDING", layers: ["Inputs & Governance"], scripts: [{ name: "capture_jira_context.py", description: "Read story, comments, and media" }, { name: "compose_delivery_prompt.py", description: "Assemble the agent context" }] },
    { title: "Implement", eyebrow: "AGENT", layers: ["Implementation"], scripts: [{ name: "run-delivery.sh", description: "Execute in isolated worktrees" }] },
    { title: "Verify & recover", eyebrow: "CONTROL", layers: [], scripts: [{ name: "run_delivery_verification.py", description: "Compile, test, and inspect" }, { name: "prepare_delivery_remediation.py", description: "Prepare a bounded retry" }] },
    { title: "Publish", eyebrow: "OUTCOME", layers: ["Delivery Outputs"], scripts: [{ name: "finalize_delivery.py", description: "Commit, PR, JIRA, and notification" }] }
  ];
  return [
    { title: "Trigger", eyebrow: "ENTRY", layers: [], scripts: [{ name: "run-scan.sh", description: "Start a scheduled or manual scan" }] },
    { title: "Context", eyebrow: "GROUNDING", layers: ["Inputs & Governance"], scripts: [{ name: "prepare_scan_worktrees.py", description: "Refresh isolated repository views" }, { name: "compose_scan_prompt.py", description: "Assemble review context" }] },
    { title: "Review", eyebrow: "AGENT", layers: ["Review Execution"], scripts: [] },
    { title: "Control & remediate", eyebrow: "CONTROL", layers: ["Operational Controls"], scripts: [{ name: "auto_fix_sync.py", description: "Apply and re-check safe fixes" }] },
    { title: "Report", eyebrow: "OUTCOME", layers: ["Delivery Outputs"], scripts: [{ name: "render-report-and-notify.py", description: "HTML, PDF, dashboard, and Feishu" }] }
  ];
}

function PromptsView({ data, project, interact, notify }: { data: DashboardData; project: string; interact: (path: string, json: RecordValue, message: string) => Promise<void>; notify: (message: string) => void }) {
  const prompts = data.interactive?.prompts || [];
  const [mode, setMode] = useState<"scan" | "delivery">("scan");
  const [selected, setSelected] = useState<{ mode: "scan" | "delivery"; path: string } | null>(null);
  const [content, setContent] = useState("");
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
  const [fullscreen, setFullscreen] = useState(false);
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const viewport = useRef<HTMLDivElement | null>(null);
  const modePrompts = prompts.filter((item) => item.mode === mode);
  const choose = async (item: { mode: "scan" | "delivery"; path: string }) => {
    setSelected(item);
    try { const response = await request(`/api/prompt?mode=${encodeURIComponent(item.mode)}&path=${encodeURIComponent(item.path)}`, project); setContent(response.content); }
    catch (err) { notify(err instanceof Error ? err.message : "Unable to load prompt"); }
  };
  const switchMode = (next: "scan" | "delivery") => { setMode(next); setSelected(null); setContent(""); setView({ x: 0, y: 0, scale: 1 }); };
  useEffect(() => {
    if (!fullscreen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [fullscreen]);
  const panOrZoom = useCallback((event: WheelEvent) => {
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) setView((current) => ({ ...current, scale: Math.max(.65, Math.min(1.55, current.scale * (event.deltaY > 0 ? .975 : 1.025))) }));
    else setView((current) => ({ ...current, x: current.x - event.deltaX, y: current.y - event.deltaY }));
  }, []);
  useEffect(() => { const node = viewport.current; if (!node) return; node.addEventListener("wheel", panOrZoom, { passive: false }); return () => node.removeEventListener("wheel", panOrZoom); }, [panOrZoom]);
  const startPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button,a,textarea,input")) return;
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const movePan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointer.current || pointer.current.id !== event.pointerId) return;
    const dx = event.clientX - pointer.current.x;
    const dy = event.clientY - pointer.current.y;
    pointer.current = { ...pointer.current, x: event.clientX, y: event.clientY };
    setView((current) => ({ ...current, x: current.x + dx, y: current.y + dy }));
  };
  const stopPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointer.current?.id === event.pointerId) pointer.current = null;
  };
  const columns = workflowColumns(mode);
  return <>
    <div className="workflow-mode-switch" role="tablist"><button className={mode === "scan" ? "active" : ""} onClick={() => switchMode("scan")}>Auto Scan</button><button className={mode === "delivery" ? "active" : ""} onClick={() => switchMode("delivery")}>Auto Delivery</button></div>
    <Panel title={mode === "scan" ? "Auto Scan Workflow" : "Auto Delivery Workflow"} action={<IconButton label={fullscreen ? "Exit full screen" : "View full screen"} onClick={() => setFullscreen((value) => !value)}>{fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</IconButton>} className={`workflow-panel ${fullscreen ? "workflow-panel-fullscreen" : ""}`}>
      <div ref={viewport} className="workflow-canvas workflow-viewport" onPointerDown={startPan} onPointerMove={movePan} onPointerUp={stopPan} onPointerCancel={stopPan}><div className="workflow-scale" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}><div className="workflow-columns">{columns.map((column, columnIndex) => {
        const columnPrompts = modePrompts.filter((item) => column.layers.includes(promptLayer(item, mode)));
        const nodes = [...column.scripts.map((script) => ({ kind: "script" as const, script })), ...columnPrompts.map((prompt) => ({ kind: "prompt" as const, prompt }))];
        return <section className="workflow-column" key={column.title}><header><span>{column.eyebrow}</span><strong>{column.title}</strong></header><div className="workflow-node-stack">{nodes.map((node, nodeIndex) => {
          const sequence = `${columnIndex + 1}.${nodeIndex + 1}`;
          if (node.kind === "script") return <article className="workflow-node script-node" key={node.script.name}><Terminal size={14} /><span><strong>{node.script.name}</strong><small>{node.script.description}</small></span><em><b>{sequence}</b> SCRIPT</em></article>;
          const item = node.prompt;
          const meta = promptMeta(item);
          const Icon = meta.icon;
          const isSelected = selected?.mode === item.mode && selected.path === item.path;
          return <button className={`workflow-node prompt-node ${isSelected ? "selected" : ""}`} onClick={() => void choose(item)} key={`${item.mode}/${item.path}`}><Icon size={14} /><span><strong>{meta.title}</strong><small>{meta.description}</small></span><em><b>{sequence}</b> PROMPT</em></button>;
        })}</div>{columnIndex < columns.length - 1 && <span className="workflow-connector" aria-hidden="true" />}</section>;
      })}</div><div className="workflow-retry"><RotateCcw size={14} /><span><strong>{mode === "delivery" ? "Remediation retry" : "Safe-fix re-review"}</strong><small>{mode === "delivery" ? "Verification failure → prepare_delivery_remediation.py → implementation agent → verification" : "High-confidence finding → auto_fix_sync.py → focused validation → pull request"}</small></span></div></div></div>
    </Panel>
    {selected && <PromptInspectorDialog item={selected} content={content} onChange={setContent} onClose={() => { setSelected(null); setContent(""); }} onSave={() => void interact("/api/prompt", { mode: selected.mode, path: selected.path, content }, "Prompt saved")} />}
  </>;
}

function PromptInspectorDialog({ item, content, onChange, onClose, onSave }: { item: { mode: "scan" | "delivery"; path: string }; content: string; onChange: (value: string) => void; onClose: () => void; onSave: () => void }) {
  const meta = promptMeta(item);
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal prompt-inspector-modal" role="dialog" aria-modal="true" aria-label={`${meta.title} prompt`} onMouseDown={(event) => event.stopPropagation()}><div className="prompt-inspector-header"><div><span>{item.mode === "scan" ? "Auto Scan" : "Auto Delivery"} prompt</span><strong>{meta.title}</strong><code>{item.path}</code></div><button className="button secondary" onClick={onClose}>Close</button></div><div className="prompt-inspector-body"><div className="markdown-workbench"><label className="markdown-pane"><span>Original Markdown</span><textarea value={content} onChange={(event) => onChange(event.target.value)} spellCheck={false} /></label><article className="markdown-preview"><span>Preview</span><div className="markdown-content"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div></article></div></div><footer><button className="button" onClick={onClose}>Cancel</button><button className="button primary" onClick={onSave}><Save size={14} />Save prompt</button></footer></section></div>;
}

function RepositoryView({ data, interact }: { data: DashboardData; interact: (path: string, json: RecordValue, message: string) => Promise<void> }) {
  const workspace = data.interactive?.workspace || {};
  const profiles = workspace.runtime_profiles || {};
  const profileNames = Object.keys(profiles);
  const [repositories, setRepositories] = useState<RecordValue[]>(workspace.repositories || []);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  useEffect(() => setRepositories(workspace.repositories || []), [workspace.repositories]);
  const update = (index: number, patch: RecordValue) => setRepositories((items) => items.map((item, current) => current === index ? { ...item, ...patch } : item));
  const commandsFor = (repository: RecordValue) => (repository.delivery_steps || []).map((step: RecordValue) => Array.isArray(step.command) ? step.command.join(" ") : "").filter(Boolean).join("\n");
  return <div className="repository-page">
    <Panel title="Repository Registry" action={<button className="button secondary" onClick={() => setAddOpen(true)}>Add repository</button>}>
      <div className="repository-intro">Add a clone URL once. Lumen stores the repository under <code>repos/</code>, infers its profile, and uses the selected branch for Scan and Delivery.</div>
      <div className="repository-list">{repositories.map((repository, index) => {
        const profile = profiles[repository.runtime_profile] || {};
        const open = expanded === repository.name;
        return <article className="repository-row" key={`${repository.name}-${index}`}>
          <button className="repository-summary" onClick={() => setExpanded(open ? null : repository.name)}><div><strong>{repository.name || "Unnamed repository"}</strong><span>{profile.language || "generic"} · {repository.runtime_profile || "No profile"}</span></div><code>{repository.default_branch || "main"}</code></button>
          {open && <div className="repository-editor"><div className="form-grid compact"><Field label="Default branch"><select value={repository.default_branch || ""} onChange={(event) => update(index, { default_branch: event.target.value })}>{Array.from(new Set([repository.default_branch, ...(repository.branches || [])].filter(Boolean))).map((branch) => <option value={branch} key={branch}>{branch}</option>)}</select></Field><Field label="Scan runtime profile"><select value={repository.runtime_profile || ""} onChange={(event) => update(index, { runtime_profile: event.target.value })}>{profileNames.map((name) => <option value={name} key={name}>{name}</option>)}</select></Field></div><div className="repository-policy"><label><input type="checkbox" checked={repository.allow_auto_fix !== false} onChange={(event) => update(index, { allow_auto_fix: event.target.checked })} />Allow automated Scan fixes</label><label><input type="checkbox" checked={repository.allow_pr !== false} onChange={(event) => update(index, { allow_pr: event.target.checked })} />Allow publish</label><span>Local Scan commands: disabled (review-only)</span></div><label className="field repository-commands"><span>Delivery verification commands</span><textarea value={repository.delivery_commands ?? commandsFor(repository)} rows={4} placeholder="One command per line, e.g. ./gradlew test" onChange={(event) => update(index, { delivery_commands: event.target.value })} /></label></div>}
        </article>;
      })}</div>
      <footer className="repository-footer"><button className="button primary" onClick={() => void interact("/api/repositories", { repositories }, "Repository registry saved")}><Save size={15} />Save repositories</button></footer>
    </Panel>
    {addOpen && <AddRepositoryDialog onClose={() => setAddOpen(false)} onAdd={(url) => { void interact("/api/repositories/clone", { url }, "Repository cloned and registered"); setAddOpen(false); }} />}
  </div>;
}

function AddRepositoryDialog({ onClose, onAdd }: { onClose: () => void; onAdd: (url: string) => void }) {
  const [url, setUrl] = useState("");
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal repository-modal" role="dialog" aria-modal="true" aria-label="Add repository" onMouseDown={(event) => event.stopPropagation()}><div className="prompt-inspector-header"><div><strong>Add repository</strong><span>Paste a Git clone URL. Lumen derives the name, local path, branch, and runtime profile.</span></div></div><div className="repository-modal-body"><Field label="Clone URL"><input autoFocus value={url} placeholder="https://git.example.com/team/service.git" onChange={(event) => setUrl(event.target.value)} /></Field></div><footer><button className="button" onClick={onClose}>Cancel</button><button className="button primary" disabled={!url.trim()} onClick={() => onAdd(url.trim())}>Clone and add</button></footer></section></div>;
}

function SettingsView({ data, project, notify, onDirtyChange, reload }: { data: DashboardData; project: string; notify: (message: string) => void; onDirtyChange: (dirty: boolean) => void; reload: () => Promise<void> }) {
  const workspace = data.interactive?.workspace || {};
  const schedules = data.interactive?.schedules || {};
  const [scanWindow, setScanWindow] = useState(String(workspace.scan_window_days || 7));
  const [scanCron, setScanCron] = useState(String(schedules.scan?.cron || "0 12 * * 1-5"));
  const [scanEnabled, setScanEnabled] = useState(Boolean(schedules.scan));
  const [deliveryInterval, setDeliveryInterval] = useState(String(Math.round((schedules.delivery?.interval_seconds || 300) / 60)));
  const [deliveryStatus, setDeliveryStatus] = useState(String(schedules.delivery?.jira_status || ""));
  const [inDevStatus, setInDevStatus] = useState(String(schedules.delivery?.in_dev_status || ""));
  const [devDoneStatus, setDevDoneStatus] = useState(String(schedules.delivery?.dev_done_status || ""));
  const [deliveryEnabled, setDeliveryEnabled] = useState(Boolean(schedules.delivery?.enabled));
  const [workflowStatuses, setWorkflowStatuses] = useState<string[]>([]);
  const [secrets, setSecrets] = useState<Record<string, string>>({});
  const [changedSecrets, setChangedSecrets] = useState<Record<string, string>>({});
  const [scanPublishMode, setScanPublishMode] = useState(String(workspace.publish?.scan || "pr"));
  const [deliveryPublishMode, setDeliveryPublishMode] = useState(String(workspace.publish?.delivery || "pr"));
  const traceConfig = data.delivery?.config?.observability?.agent_trace || {};
  const [traceMode, setTraceMode] = useState(String(traceConfig.capture_mode || "metadata"));
  const [traceRetention, setTraceRetention] = useState(String(traceConfig.retention_days || 14));
  const [dirty, setDirty] = useState(false);
  const markDirty = () => { setDirty(true); onDirtyChange(true); };
  useEffect(() => { void request("/api/delivery/status-options", project).then((response) => setWorkflowStatuses(Array.isArray(response.options) ? response.options.map(String) : [])).catch(() => setWorkflowStatuses([])); }, [project]);
  useEffect(() => { setScanWindow(String(workspace.scan_window_days || 7)); setScanCron(String(schedules.scan?.cron || "0 12 * * 1-5")); setScanEnabled(Boolean(schedules.scan)); setDeliveryInterval(String(Math.round((schedules.delivery?.interval_seconds || 300) / 60))); setDeliveryStatus(String(schedules.delivery?.jira_status || "")); setInDevStatus(String(schedules.delivery?.in_dev_status || "")); setDevDoneStatus(String(schedules.delivery?.dev_done_status || "")); setDeliveryEnabled(Boolean(schedules.delivery?.enabled)); setSecrets({}); setChangedSecrets({}); setDirty(false); onDirtyChange(false); }, [project]);
  useEffect(() => { setScanPublishMode(String(workspace.publish?.scan || "pr")); setDeliveryPublishMode(String(workspace.publish?.delivery || "pr")); }, [workspace.publish?.scan, workspace.publish?.delivery]);
  useEffect(() => { setTraceMode(String(traceConfig.capture_mode || "metadata")); setTraceRetention(String(traceConfig.retention_days || 14)); }, [traceConfig.capture_mode, traceConfig.retention_days]);
  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (!dirty) return; event.preventDefault(); event.returnValue = ""; }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [dirty]);
  const getSecret = async (name: string) => { const response = await request(`/api/integration?key=${encodeURIComponent(name)}`, project); return String(response.value); };
  const reveal = async (name: string) => { try { const result = await getSecret(name); setSecrets((current) => ({ ...current, [name]: result })); notify("Integration value revealed"); } catch (err) { notify(err instanceof Error ? err.message : "Unable to reveal value"); } };
  const copy = async (name: string) => { try { const result = await getSecret(name); await navigator.clipboard.writeText(result); notify("Integration value copied"); } catch (err) { notify(err instanceof Error ? err.message : "Unable to copy value"); } };
  const configured = workspace.configured_integrations || [];
  const statusOptions = Array.from(new Set([...workflowStatuses, deliveryStatus, inDevStatus, devDoneStatus].filter(Boolean)));
  const saveAll = async () => {
    try {
      await Promise.all([
        request("/api/workspace", project, { method: "POST", json: { scan_window_days: Number(scanWindow) } }),
        request("/api/schedule", project, { method: "POST", json: scanEnabled ? { kind: "scan", action: "save", cron: scanCron } : { kind: "scan", action: "remove" } }),
        request("/api/schedule", project, { method: "POST", json: deliveryEnabled ? { kind: "delivery", action: "save", interval_minutes: Number(deliveryInterval), jira_status: deliveryStatus, in_dev_status: inDevStatus, dev_done_status: devDoneStatus } : { kind: "delivery", action: "remove" } }),
        request("/api/publish-policy", project, { method: "POST", json: { scan_mode: scanPublishMode, delivery_mode: deliveryPublishMode } }),
        request("/api/observability", project, { method: "POST", json: { capture_mode: traceMode, retention_days: Number(traceRetention) } }),
        ...Object.entries(changedSecrets).map(([key, value]) => request("/api/integration", project, { method: "POST", json: { key, value } }))
      ]);
      setChangedSecrets({}); setDirty(false); onDirtyChange(false); notify("Settings saved"); await reload();
    } catch (err) { notify(err instanceof Error ? err.message : "Unable to save Settings"); }
  };
  return <div className="settings-stack">
    <Panel title="Automation Schedules">
      <div className="settings-section"><div className="settings-copy"><div className="settings-heading"><div className="settings-title-stack"><h4>Auto Scan</h4></div></div><p>{text(schedules.scan?.description, "No recurring scan is configured.")}</p></div><div className="settings-control wide"><div className="form-grid compact scan-settings-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 0, width: "100%" }}><Field label="Lookback, days"><input type="number" min="1" max="365" value={scanWindow} onChange={(event) => { setScanWindow(event.target.value); markDirty(); }} /></Field><Field label="Five-field cron"><input value={scanCron} onChange={(event) => { setScanCron(event.target.value); markDirty(); }} /></Field></div></div><div className="settings-toggle"><ScheduleToggle enabled={scanEnabled} onChange={(enabled) => { setScanEnabled(enabled); markDirty(); }} /></div></div>
      <div className="settings-section divider"><div className="settings-copy"><div className="settings-heading"><div className="settings-title-stack"><h4>Auto Delivery</h4></div></div><p>{deliveryEnabled ? `Polling every ${deliveryInterval} minute(s).` : "Delivery polling is paused."}</p></div><div className="settings-control wide"><div className="form-grid compact"><Field label="Interval, minutes"><input type="number" min="1" value={deliveryInterval} onChange={(event) => { setDeliveryInterval(event.target.value); markDirty(); }} /></Field><Field label="Eligible JIRA status"><select value={deliveryStatus} onChange={(event) => { setDeliveryStatus(event.target.value); markDirty(); }}>{statusOptions.map((value) => <option value={value} key={value}>{value}</option>)}</select></Field><Field label="Move to when started"><select value={inDevStatus} onChange={(event) => { setInDevStatus(event.target.value); markDirty(); }}>{statusOptions.map((value) => <option value={value} key={value}>{value}</option>)}</select></Field><Field label="Move to when completed"><select value={devDoneStatus} onChange={(event) => { setDevDoneStatus(event.target.value); markDirty(); }}>{statusOptions.map((value) => <option value={value} key={value}>{value}</option>)}</select></Field></div><p className="schedule-note">On failure, Lumen leaves the JIRA status unchanged and adds a Needs attention comment.</p></div><div className="settings-toggle"><ScheduleToggle enabled={deliveryEnabled} onChange={(enabled) => { setDeliveryEnabled(enabled); markDirty(); }} /></div></div>
    </Panel>
    <Panel title="Publish Policy"><div className="settings-section"><div className="settings-copy"><h4>Automation outcome</h4><p>PR keeps a review gate. Merge creates a PR first, then merges it into the configured default branch.</p></div><div className="settings-control wide"><div className="form-grid compact"><Field label="Auto Scan"><select value={scanPublishMode} onChange={(event) => { setScanPublishMode(event.target.value); markDirty(); }}><option value="pr">Open pull request</option><option value="merge">Merge after pull request</option></select></Field><Field label="Auto Delivery"><select value={deliveryPublishMode} onChange={(event) => { setDeliveryPublishMode(event.target.value); markDirty(); }}><option value="pr">Open pull request</option><option value="merge">Merge after pull request</option></select></Field></div></div></div></Panel>
    <Panel title="Agent Trace"><div className="settings-section"><div className="settings-copy"><h4>Local Delivery evidence</h4><p>Metadata is the safe default. Full mode stores redacted prompts, provider events, stdout, and stderr for local debugging.</p></div><div className="settings-control wide"><div className="form-grid compact"><Field label="Capture mode"><select value={traceMode} onChange={(event) => { setTraceMode(event.target.value); markDirty(); }}><option value="off">Off</option><option value="metadata">Metadata</option><option value="full">Full</option></select></Field><Field label="Retention, days"><input type="number" min="1" max="3650" value={traceRetention} onChange={(event) => { setTraceRetention(event.target.value); markDirty(); }} /></Field></div></div></div></Panel>
    <Panel title="Variable Keys" action={<span className="muted">Stored only in this workspace</span>}><div className="settings-section"><div className="settings-copy"><h4>Available keys</h4><p>Reveal a value to inspect it, or enter a replacement directly. Values are saved without display quotes.</p></div><div className="settings-control wide"><div className="secret-list">{configured.length ? configured.map((name: string) => { const value = changedSecrets[name] ?? secrets[name] ?? ""; return <div className="secret-row" key={name}><code>{name}</code><input type={secrets[name] || changedSecrets[name] !== undefined ? "text" : "password"} value={value} placeholder="Reveal or enter a replacement value" aria-label={`Value for ${name}`} onChange={(event) => { const next = event.target.value; setChangedSecrets((current) => ({ ...current, [name]: next })); markDirty(); }} /><div><IconButton label="Reveal value" onClick={() => void reveal(name)}>{secrets[name] ? <EyeOff size={15} /> : <Eye size={15} />}</IconButton><IconButton label="Copy value" onClick={() => void copy(name)}><Copy size={15} /></IconButton></div></div>; }) : <Empty label="No local integration keys configured." />}</div></div></div></Panel>
    <footer className="settings-save-bar"><span className={dirty ? "settings-save-status unsaved" : "settings-save-status"}>{dirty ? "You have unsaved changes" : "All changes saved"}</span><button className="button primary" disabled={!dirty} onClick={() => void saveAll()}><Save size={15} />Save changes</button></footer>
  </div>;
}

function ScheduleToggle({ enabled, onChange }: { enabled: boolean; onChange: (enabled: boolean) => void }) { return <label className="schedule-toggle"><input type="checkbox" checked={enabled} onChange={(event) => onChange(event.target.checked)} /><span aria-hidden="true" /><em>{enabled ? "Enabled" : "Paused"}</em></label>; }

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }

createRoot(document.getElementById("root")!).render(<App />);
