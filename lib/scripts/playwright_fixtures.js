const fs = require("fs");

function loadFixtureFile(file) {
  if (!file) return { routes: [] };
  const payload = JSON.parse(fs.readFileSync(file, "utf8"));
  return payload && Array.isArray(payload.routes) ? payload : { routes: [] };
}

async function installPlaywrightFixtures(page, file) {
  const fixture = loadFixtureFile(file);
  for (const item of fixture.routes) {
    const pattern = String(item.pattern || "").trim();
    if (!pattern) continue;
    const method = String(item.method || "").trim().toUpperCase();
    await page.route(pattern, async route => {
      if (method && route.request().method().toUpperCase() !== method) {
        await route.continue();
        return;
      }
      const delay = Number(item.delay_ms || 0);
      if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));
      const body = typeof item.body === "string" ? item.body : JSON.stringify(item.body ?? {});
      await route.fulfill({
        status: Number(item.status || 200),
        contentType: String(item.content_type || "application/json"),
        headers: item.headers && typeof item.headers === "object" ? item.headers : undefined,
        body,
      });
    });
  }
  return { file, routes: fixture.routes.map(item => ({ pattern: item.pattern, method: item.method || "*" })) };
}

module.exports = { installPlaywrightFixtures };
