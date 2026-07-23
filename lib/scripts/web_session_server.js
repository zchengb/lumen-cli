#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");
const crypto = require("crypto");

function arg(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] || fallback : fallback;
}

const repo = path.resolve(arg("--repo"));
const sessionDir = path.resolve(arg("--session-dir"));
const baseUrl = new URL(arg("--base-url"));
const browserMode = arg("--browser-mode", "managed");
const cdpUrl = arg("--cdp-url");
const storageState = arg("--storage-state");
const testIdAttribute = arg("--test-id-attribute", "data-testid");
const viewport = {
  width: Number(arg("--viewport-width", "1440")),
  height: Number(arg("--viewport-height", "900")),
};
const authStrategy = arg("--auth-strategy", "existing-session");
const loginPath = arg("--login-path");
const loginMethod = arg("--login-method", "POST").toUpperCase();
const loginField = arg("--login-field", "wiw");
const identity = arg("--identity", "");
const credential = process.env.LUMEN_WEB_AUTH_CREDENTIAL || "";
const token = crypto.randomBytes(24).toString("hex");
const observationsDir = path.join(sessionDir, "observations");
const actionsPath = path.join(sessionDir, "actions.ndjson");
const consolePath = path.join(sessionDir, "console.ndjson");
const failuresPath = path.join(sessionDir, "network-failures.ndjson");

fs.mkdirSync(observationsDir, { recursive: true, mode: 0o700 });
for (const file of [actionsPath, consolePath, failuresPath]) fs.closeSync(fs.openSync(file, "a", 0o600));

function redact(value) {
  let text = String(value ?? "");
  if (credential) text = text.split(credential).join("[REDACTED]");
  return text
    .replace(/(authorization\s*[:=]\s*)([^,\s]+)/gi, "$1[REDACTED]")
    .replace(/([?&](?:token|access_token|id_token|code|secret|password)=[^&\s]+)/gi, "$1=[REDACTED]");
}

function appendJson(file, value) {
  fs.appendFileSync(file, JSON.stringify(value, (key, item) => {
    if (/cookie|authorization|token|secret|password|credential/i.test(key)) return "[REDACTED]";
    return typeof item === "string" ? redact(item) : item;
  }) + "\n");
}

function safeUrl(value) {
  try {
    const url = new URL(value, baseUrl);
    if (url.origin !== baseUrl.origin) throw new Error("navigation outside configured base URL is not allowed");
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch (error) {
    throw new Error(redact(error.message));
  }
}

function writeJson(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", { mode: 0o600 });
}

function bodyOf(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", chunk => chunks.push(chunk));
    request.on("end", () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {}); }
      catch (error) { reject(new Error("request body must be JSON")); }
    });
    request.on("error", reject);
  });
}

function send(response, status, payload) {
  response.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
  response.end(JSON.stringify(payload));
}

function locator(page, spec = {}) {
  if (spec.test_id) return page.getByTestId(String(spec.test_id));
  if (spec.role) return page.getByRole(String(spec.role), spec.name ? { name: String(spec.name) } : undefined);
  if (spec.label) return page.getByLabel(String(spec.label));
  if (spec.text) return page.getByText(String(spec.text), { exact: spec.exact !== false });
  if (spec.css) return page.locator(String(spec.css));
  throw new Error("a locator requires test_id, role, label, text, or css");
}

async function elementSummary(handle) {
  return handle.evaluate((element, testIdAttribute) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const tag = element.tagName.toLowerCase();
    const role = element.getAttribute("role") || ({ button: "button", a: "link", input: "textbox", select: "combobox", textarea: "textbox", h1: "heading", h2: "heading", h3: "heading", h4: "heading", dialog: "dialog", alert: "alert" }[tag] || "");
    const labelled = element.getAttribute("aria-label") || element.getAttribute("title") || element.labels?.[0]?.textContent || "";
    const name = String(labelled || element.textContent || element.getAttribute("placeholder") || "").replace(/\s+/g, " ").trim().slice(0, 160);
    const visible = style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || 1) > 0 && rect.width > 0 && rect.height > 0;
    return {
      role, name, tag, test_id: element.getAttribute(testIdAttribute) || "",
      visible, enabled: !(element.disabled || element.getAttribute("aria-disabled") === "true"),
      text: String(element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 160),
      bounds: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
    };
  }, testIdAttribute);
}

async function visibleElements(page) {
  const handles = await page.locator(`[${testIdAttribute}],button,a,input,select,textarea,[role],h1,h2,h3,h4,dialog,[role="alert"],[role="status"]`).elementHandles();
  const elements = [];
  for (const handle of handles.slice(0, 300)) {
    const item = await elementSummary(handle);
    if (item.visible && (item.role || item.test_id || item.name)) elements.push({ id: `el-${String(elements.length + 1).padStart(3, "0")}`, ...item });
    if (elements.length >= 200) break;
  }
  return elements;
}

const state = {
  session_id: path.basename(sessionDir),
  trace_id: arg("--trace-id"),
  repository: path.basename(repo),
  base_url: baseUrl.origin,
  browser_mode: browserMode,
  browser: arg("--browser", "chromium"),
  authentication: { status: authStrategy === "existing-session" ? "ready" : "pending", identity },
  viewport,
  test_id_attribute: testIdAttribute,
  capabilities: ["navigate", "observe", "inspect", "click", "fill", "press", "select", "check", "uncheck", "hover", "focus", "scroll_into_view", "reload", "go_back", "screenshot"],
  observations: 0,
  screenshots: 0,
  actions: 0,
  console_errors: 0,
  network_failures: 0,
};

let playwright;
let browser;
let context;
let page;
let ownedBrowser = false;
let server;

async function startBrowser() {
  try {
    playwright = require(require.resolve("playwright", { paths: [repo] }));
  } catch (error) {
    throw new Error(`Playwright is not installed in ${repo}`);
  }
  if (browserMode === "cdp") {
    if (!cdpUrl) throw new Error("browser_cdp_url is required for CDP mode");
    browser = await playwright.chromium.connectOverCDP(cdpUrl);
    context = browser.contexts()[0];
    if (!context) throw new Error("CDP browser has no usable context");
    page = context.pages()[0] || await context.newPage();
  } else {
    const local = ["http:", "https:"].includes(baseUrl.protocol) && ["localhost", "127.0.0.1", "::1"].includes(baseUrl.hostname);
    browser = await playwright.chromium.launch({ headless: true });
    ownedBrowser = true;
    context = await browser.newContext({
      viewport,
      locale: "en-US",
      timezoneId: "UTC",
      ...(storageState ? { storageState } : {}),
      ...(local && baseUrl.protocol === "https:" ? { ignoreHTTPSErrors: true } : {}),
    });
    page = await context.newPage();
  }
  page.on("console", message => {
    const type = message.type();
    appendJson(consolePath, { type, message: message.text(), source: message.location()?.url || "" });
    if (type === "error") state.console_errors += 1;
  });
  page.on("pageerror", error => { appendJson(consolePath, { type: "pageerror", message: error.message }); state.console_errors += 1; });
  page.on("requestfailed", request => {
    appendJson(failuresPath, { method: request.method(), url: request.url(), status: request.failure()?.errorText || "failed" });
    state.network_failures += 1;
  });
  if (authStrategy === "login-endpoint") await quickLogin();
  state.authentication.status = "ready";
}

async function quickLogin() {
  if (!credential) throw new Error("configured authentication credential is not available");
  await page.goto(baseUrl.origin, { waitUntil: "domcontentloaded" });
  const url = safeUrl(loginPath);
  const payload = { [loginField]: credential };
  const result = await context.request.fetch(url, { method: loginMethod, data: payload });
  if (!result.ok()) throw new Error(`login endpoint failed (${result.status()})`);
  await page.reload({ waitUntil: "domcontentloaded" });
}

async function screenshot(name = `observation-${String(state.observations + 1).padStart(3, "0")}.png`) {
  const safeName = path.basename(name).endsWith(".png") ? path.basename(name) : `${path.basename(name)}.png`;
  const target = path.join(observationsDir, safeName);
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}" });
  await page.screenshot({ path: target, fullPage: false });
  state.screenshots += 1;
  return target;
}

async function observe() {
  const screenshotPath = await screenshot();
  const elements = await visibleElements(page);
  const observation = {
    schema_version: "1.0", session_id: state.session_id, trace_id: state.trace_id,
    observation_id: `observation-${String(state.observations + 1).padStart(3, "0")}`,
    url: (await page.url()).split("?")[0], title: await page.title(), viewport,
    screenshot: screenshotPath, elements, diagnostics: { console_errors: state.console_errors, network_failures: state.network_failures },
    truncated: elements.length >= 200,
  };
  state.observations += 1;
  writeJson(path.join(observationsDir, `${observation.observation_id}.json`), observation);
  return observation;
}

async function inspect(spec, include = []) {
  const item = locator(page, spec);
  const handle = await item.first().elementHandle();
  if (!handle) throw new Error("element was not found");
  const summary = await elementSummary(handle);
  if (include.includes("computed_style")) {
    summary.computed_style = await handle.evaluate(element => {
      const style = getComputedStyle(element);
      const keys = ["display", "position", "width", "height", "padding", "margin", "gap", "font-family", "font-size", "font-weight", "line-height", "color", "background-color", "border", "border-radius", "box-shadow", "opacity", "align-items", "justify-content", "grid-template-columns"];
      return Object.fromEntries(keys.map(key => [key, style.getPropertyValue(key)]));
    });
  }
  return summary;
}

async function action(operation, params) {
  if (operation === "navigate") { await page.goto(safeUrl(params.url || params.path), { waitUntil: params.wait_until || "domcontentloaded" }); return { url: (await page.url()).split("?")[0] }; }
  if (operation === "reload") { await page.reload({ waitUntil: params.wait_until || "domcontentloaded" }); return { url: (await page.url()).split("?")[0] }; }
  if (operation === "go_back") { await page.goBack({ waitUntil: "domcontentloaded" }); return { url: (await page.url()).split("?")[0] }; }
  if (operation === "observe") return observe();
  if (operation === "inspect") return inspect(params.locator || params, params.include || []);
  if (operation === "screenshot") return { screenshot: await screenshot(params.name) };
  const target = locator(page, params.locator || params);
  if (operation === "click") await target.click();
  else if (operation === "fill") await target.fill(String(params.value ?? ""));
  else if (operation === "press") await target.press(String(params.key || "Enter"));
  else if (operation === "select") await target.selectOption(params.value ?? params.values);
  else if (operation === "check") await target.check();
  else if (operation === "uncheck") await target.uncheck();
  else if (operation === "hover") await target.hover();
  else if (operation === "focus") await target.focus();
  else if (operation === "scroll_into_view") await target.scrollIntoViewIfNeeded();
  else throw new Error(`unsupported browser operation: ${operation}`);
  state.actions += 1;
  appendJson(actionsPath, { action_id: `action-${String(state.actions).padStart(3, "0")}`, operation, locator: params.locator || params, session_id: state.session_id });
  return { ok: true, url: (await page.url()).split("?")[0] };
}

async function handle(request, res) {
  if (request.url === "/health") return send(res, 200, { ok: true, session: state });
  if (request.url === "/rpc" && request.method === "POST") {
    if (request.headers["x-lumen-session-token"] !== token) return send(res, 401, { error: "unauthorized" });
    try {
      const body = await bodyOf(request);
      const result = await action(String(body.operation || ""), body);
      return send(res, 200, { ok: true, result, session: state });
    } catch (error) { return send(res, 400, { ok: false, error: redact(error.message) }); }
  }
  if (request.url === "/shutdown" && request.method === "POST") {
    if (request.headers["x-lumen-session-token"] !== token) return send(res, 401, { error: "unauthorized" });
    send(res, 200, { ok: true });
    setTimeout(async () => { if (ownedBrowser) await browser.close(); server.close(() => process.exit(0)); }, 10);
    return;
  }
  return send(res, 404, { error: "not found" });
}

(async () => {
  await startBrowser();
  server = http.createServer(handle);
  server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    writeJson(path.join(sessionDir, "server.json"), { url: `http://127.0.0.1:${address.port}`, token, pid: process.pid, session: state });
    process.stdout.write(JSON.stringify({ url: `http://127.0.0.1:${address.port}`, pid: process.pid }) + "\n");
  });
})().catch(error => { process.stderr.write(redact(error.stack || error.message) + "\n"); process.exit(1); });
