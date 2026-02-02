#!/usr/bin/env bun
/**
 * INAMSOS Desktop Development Launcher
 */

import { $ } from "bun";
import { spawn } from "child_process";
import { open } from "fs/promises";

const colors = {
  reset: "\x1b[0m", red: "\x1b[31m", green: "\x1b[32m",
  yellow: "\x1b[33m", blue: "\x1b[34m", magenta: "\x1b[35m", cyan: "\x1b[36m",
};

function log(level: "info" | "success" | "warning" | "error", msg: string) {
  const prefix = {
    info: `${colors.blue}[INFO]${colors.reset}`,
    success: `${colors.green}[SUCCESS]${colors.reset}`,
    warning: `${colors.yellow}[WARNING]${colors.reset}`,
    error: `${colors.red}[ERROR]${colors.reset}`,
  }[level];
  console.log(`${prefix} ${msg}`);
}

// Check if port is ready using nc
async function isPortReady(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const proc = spawn("nc", ["-z", "127.0.0.1", String(port)], {
      stdio: "ignore",
    });
    proc.on("close", (code) => resolve(code === 0));
    proc.on("error", () => resolve(false));
    setTimeout(() => {
      proc.kill();
      resolve(false);
    }, 2000);
  });
}

async function waitForPort(port: number, timeout = 30000, label?: string) {
  const start = Date.now();
  const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let spinIdx = 0;

  while (Date.now() - start < timeout) {
    if (await isPortReady(port)) {
      if (label) process.stdout.write("\r" + " ".repeat(40) + "\r");
      return true;
    }

    if (label) {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      process.stdout.write(`\r${colors.cyan}${spinner[spinIdx]}${colors.reset} ${label} (${elapsed}s)...`);
      spinIdx = (spinIdx + 1) % spinner.length;
    }

    await new Promise(r => setTimeout(r, 500));
  }

  if (label) process.stdout.write("\r" + " ".repeat(40) + "\r");
  return false;
}

let globalRunnerProc: ChildProcess | null = null;

async function cleanup(exitAfter = true) {
  const patterns = [
    "bun.*cmd/runner",
    "inamsos-runner",
    "next dev",
    "wails dev",
  ];

  for (const pattern of patterns) {
    try {
      const proc = spawn("pkill", ["-9", "-f", pattern], { stdio: "ignore" });
      await new Promise(r => proc.on("close", r));
    } catch {}
  }

  // Kill global runner process if it exists
  if (globalRunnerProc && globalRunnerProc.pid) {
    try { process.kill(globalRunnerProc.pid, "SIGKILL"); } catch {}
  }

  // Kill specific ports
  for (const port of [54321, 3001, 3000, 34115]) {
    try {
      const proc = spawn("lsof", ["-ti", `:${port}`], { stdio: "pipe" });
      let output = "";
      proc.stdout?.on("data", (d) => output += d.toString());
      proc.on("close", () => {
        for (const pid of output.trim().split("\n").filter(Boolean)) {
          try { spawn("kill", ["-9", pid], { stdio: "ignore" }); } catch {}
        }
      });
    } catch {}
  }

  await new Promise(r => setTimeout(r, 1000));
  if (exitAfter) {
    console.log("");
    log("warning", "Shutting down all services...");
    log("success", "All services stopped");
    process.exit(0);
  }
}

// Monitor services and detect unexpected exits
async function monitorServices(runnerProc: ChildProcess) {
  let wasHealthy = true;

  while (true) {
    await new Promise(r => setTimeout(r, 5000));

    const pgHealthy = await isPortReady(54321);
    const backendHealthy = await isPortReady(3001);
    const isHealthy = pgHealthy && backendHealthy;

    // Check if runner process is still alive
    const runnerAlive = runnerProc !== null && runnerProc.exitCode === null && !runnerProc.killed;

    if (!runnerAlive) {
      console.log("");
      log("error", "Runner process died!");
      return;
    }

    if (wasHealthy && !isHealthy) {
      console.log("");
      log("error", "Services stopped unexpectedly!");
      log("error", `PostgreSQL: ${pgHealthy ? "✓" : "✗"}  Backend: ${backendHealthy ? "✓" : "✗"}`);
      console.log("");
      return;
    }

    wasHealthy = isHealthy;
  }
}

async function main() {
  console.log(`\n${colors.cyan}🏥 INAMSOS Desktop Development Mode${colors.reset}\n`);

  process.on("SIGINT", () => cleanup(true));
  process.on("SIGTERM", () => cleanup(true));

  // Cleanup first
  log("info", "Cleaning up ports...");
  await cleanup(false);

  // Start runner (keeps running to manage services)
  log("info", "Starting PostgreSQL + Backend...");

  const runnerProc = spawn("bun", ["run", "cmd/runner/index.ts"], {
    cwd: "./desktop",
    stdio: "inherit",
  });

  // Store globally for cleanup
  globalRunnerProc = runnerProc;

  // Store runner PID for cleanup
  const runnerPid = runnerProc.pid ?? 0;
  if (runnerPid > 0) {
    await Bun.write("/tmp/runner.pid", String(runnerPid));
  }

  // Handle runner exit
  runnerProc.on("exit", (code) => {
    console.log("");
    if (code !== 0) {
      log("error", `Runner exited with code ${code}`);
    }
    cleanup(true);
  });

  // Give runner time to start services
  await new Promise(r => setTimeout(r, 2000));

  // Wait for ports to be ready
  if (!(await waitForPort(54321, 15000, "Waiting for PostgreSQL"))) {
    log("error", "PostgreSQL failed to start");
    log("info", "Check /tmp/runner.log for errors");
    await cleanup();
  }
  log("success", "PostgreSQL ready");

  if (!(await waitForPort(3001, 30000, "Waiting for Backend"))) {
    log("error", "Backend failed to start");
    log("info", "Check /tmp/runner.log for errors");
    await cleanup();
  }
  log("success", "Backend ready");

  await new Promise(r => setTimeout(r, 3000));

  // Start frontend
  log("info", "Starting Frontend...");
  const frontendProc = spawn("npm", ["run", "dev"], {
    cwd: "./frontend",
    env: { ...process.env, PORT: "3000" },
    stdio: "ignore",
    detached: true,
  });
  frontendProc.unref();

  if (!(await waitForPort(3000, 30000, "Waiting for Frontend"))) {
    log("error", "Frontend failed to start");
    await cleanup();
  }
  log("success", "Frontend ready");

  // Start Wails
  log("info", "Starting Wails desktop...");
  await new Promise<void>((resolve, reject) => {
    const wailsProc = spawn("wails", ["dev", "-s", "-frontenddevserverurl", "http://localhost:3000"], {
      cwd: "./desktop",
      stdio: "ignore",
      detached: true,
    });
    wailsProc.unref();
    setTimeout(resolve, 15000);
  });

  console.log(`
${colors.magenta}Services running:${colors.reset}
  • PostgreSQL:   port 54321
  • Backend:      http://localhost:3001
  • Frontend:     http://localhost:3000
  • Wails:        desktop window

${colors.yellow}Press Ctrl+C to stop all services${colors.reset}
${colors.cyan}Logs: /tmp/runner.log${colors.reset}
`);

  // Start monitoring services in background
  monitorServices(runnerProc);

  // Keep process alive
  while (true) {
    await new Promise(r => setTimeout(r, 1000));
  }
}

main().catch(async (e) => {
  log("error", String(e));
  await cleanup();
});
