const fs = require("fs");
const path = require("path");

/**
 * Ensures Next.js dev mode never runs on top of stale `next build` artifacts
 * inside `.next/`, which can cause `_next/static/css/app/layout.css` 404s.
 */
function ensureCleanForDev() {
  const nextDir = path.join(process.cwd(), ".next");
  if (!fs.existsSync(nextDir)) return;

  const hasBuildId = fs.existsSync(path.join(nextDir, "BUILD_ID"));
  const cssDir = path.join(nextDir, "static", "css");
  const hasProdCss =
    fs.existsSync(cssDir) &&
    fs.readdirSync(cssDir).some((f) => f.endsWith(".css"));

  if (hasBuildId || hasProdCss) {
    console.log("Cleaning previous production build cache in .next before starting dev server...");
    fs.rmSync(nextDir, { recursive: true, force: true });
  }
}

if (require.main === module) {
  ensureCleanForDev();
}

module.exports = { ensureCleanForDev };

