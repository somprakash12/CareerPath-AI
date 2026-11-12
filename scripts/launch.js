const http = require("http");
const net = require("net");
const path = require("path");
const fs = require("fs");
const { spawn, exec } = require("child_process");
const { ensureCleanForDev } = require("./ensure-clean-next");

const args = process.argv.slice(2);
const isProd = args.includes("--prod") || args.includes("-p");
const noBrowser = args.includes("--no-browser");
const preferredPort = Number(process.env.PORT) || 3000;

function canConnect(host, port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port, timeout: 600 });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function canBind(options) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(options);
  });
}

async function isPortFree(port) {
  if (await canConnect("127.0.0.1", port)) return false;
  if (await canConnect("::1", port)) return false;
  if (!(await canBind({ port }))) return false;
  if (!(await canBind({ port, host: "0.0.0.0" }))) return false;
  return true;
}

function fetchText(url, timeoutMs = 4000) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        if (body.length < 131072) body += chunk.toString();
      });
      res.on("end", () => {
        resolve({ status: res.statusCode || 0, body });
      });
    });
    req.on("error", () => resolve({ status: 0, body: "" }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ status: 0, body: "" });
    });
  });
}

async function checkExistingHealthyApp(port) {
  const page = await fetchText(`http://localhost:${port}/`, 4000);
  if (page.status < 200 || page.status >= 400 || !page.body.includes("CareerPath")) {
    return false;
  }

  // Also ensure compiled CSS is actively served (not 404 unstyled HTML)
  const cssMatch = page.body.match(/\/_next\/static\/css\/[^"\\]+/);
  if (cssMatch) {
    const cssRes = await fetchText(`http://localhost:${port}${cssMatch[0]}`, 4000);
    if (cssRes.status !== 200 || cssRes.body.length < 1000) {
      return false;
    }
  }
  return true;
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port <= startPort + 20; port++) {
    if (await isPortFree(port)) {
      return port;
    }
  }
  return startPort;
}

function openBrowser(url) {
  if (noBrowser) return Promise.resolve();
  return new Promise((resolve) => {
    if (process.platform === "win32") {
      exec(`start "" "${url}"`, (err) => {
        if (err) {
          console.warn("Could not auto-open browser. Please open manually:", url);
        }
        resolve();
      });
    } else if (process.platform === "darwin") {
      exec(`open "${url}"`, () => resolve());
    } else {
      exec(`xdg-open "${url}"`, () => resolve());
    }
  });
}

async function warmRouteAndCss(port, timeoutMs = 20000) {
  const page = await fetchText(`http://localhost:${port}/`, timeoutMs);
  if (page.status >= 200 && page.status < 400) {
    const cssMatch = page.body.match(/\/_next\/static\/css\/[^"\\]+/);
    if (cssMatch) {
      await fetchText(`http://localhost:${port}${cssMatch[0]}`, 8000);
    }
  }
}

async function main() {
  console.log("\n==================================================");
  console.log("  CareerPath AI - Smart Application Launcher");
  console.log("==================================================\n");

  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
  if (!fs.existsSync(nextBin)) {
    console.error("Error: Next.js dependencies are not installed. Run 'npm install' first.");
    process.exit(1);
  }

  // Check if port 3000 already hosts a healthy CareerPath AI instance (with working CSS)
  if (!(await isPortFree(preferredPort))) {
    const healthy = await checkExistingHealthyApp(preferredPort);
    if (healthy) {
      const url = `http://localhost:${preferredPort}`;
      console.log(`CareerPath AI is already running at ${url}`);
      console.log(`Opening ${url} in your default browser...`);
      await openBrowser(url);
      console.log("Browser launched! Closing launcher in 3 seconds...");
      await new Promise((r) => setTimeout(r, 3000));
      return;
    }
    console.log(`Port ${preferredPort} is occupied (or serving stale assets). Selecting next available port...`);
  }

  const port = await findAvailablePort(preferredPort);
  const url = `http://localhost:${port}`;

  let mode = "dev";
  if (isProd) {
    const hasBuild = fs.existsSync(path.join(process.cwd(), ".next", "BUILD_ID"));
    if (hasBuild) {
      mode = "start";
    } else {
      console.log("No production build found (.next/BUILD_ID). Launching in dev mode...");
    }
  }

  if (mode === "dev") {
    ensureCleanForDev();
  }

  console.log(`Starting Next.js (${mode} mode) on ${url}...`);

  const child = spawn(process.execPath, [nextBin, mode, "-p", String(port)], {
    stdio: ["inherit", "pipe", "pipe"],
    env: { ...process.env }
  });

  let launched = false;
  let sawStartFailure = false;

  const triggerLaunch = async () => {
    if (launched || sawStartFailure) return;
    launched = true;
    await warmRouteAndCss(port, 20000);
    console.log(`\nCareerPath AI is live at ${url} — opening browser...\n`);
    await openBrowser(url);
  };

  child.stdout.on("data", (data) => {
    process.stdout.write(data);
    const text = data.toString();
    if (!launched && /Ready in/i.test(text)) {
      triggerLaunch();
    }
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(data);
    const text = data.toString();
    if (/Failed to start server|EADDRINUSE/i.test(text)) {
      sawStartFailure = true;
    }
  });

  const fallbackTimer = setTimeout(() => {
    if (!launched && !sawStartFailure) triggerLaunch();
  }, 12000);
  fallbackTimer.unref();

  const shutdown = () => {
    clearTimeout(fallbackTimer);
    if (!child.killed) {
      child.kill("SIGTERM");
    }
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  child.on("exit", (code) => {
    clearTimeout(fallbackTimer);
    if (sawStartFailure && (!code || code === 0)) {
      process.exit(1);
    }
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error("Failed to launch CareerPath AI:", err);
  process.exit(1);
});
