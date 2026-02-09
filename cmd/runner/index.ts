#!/usr/bin/env bun
/**
 * INAMSOS Desktop Services (Standalone Mode)
 * Bun-based rewrite of the Go inamsos-runner
 */

import { spawn, ChildProcess } from "child_process";
import { existsSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { Socket } from "net";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type Signal = "SIGTERM" | "SIGKILL" | "SIGQUIT";

interface ManagerConfig {
  dataDir: string;
  binDir: string;
  backendPort: number;
  postgresPort: number;
}

interface ProcessState {
  cmd: ChildProcess | null;
  name: string;
}

// ============================================================================
// UTILITIES
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
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

// ============================================================================
// PORT & PROCESS CLEANUP
// ============================================================================

async function killProcess(pid: number, signal: NodeJS.Signals = "SIGKILL"): Promise<boolean> {
  try {
    process.kill(pid, signal);
    return true;
  } catch {
    return false;
  }
}

async function cleanupPort(port: number): Promise<void> {
  const isWindows = process.platform === "win32";

  if (isWindows) {
    // Windows: use netstat to find and kill processes
    try {
      const { stdout } = Bun.spawn(["netstat", "-ano"], {
        stdout: "pipe",
        stderr: "ignore",
      });

      const output = await new Response(stdout).text();
      const lines = output.split("\n");

      for (const line of lines) {
        if (line.includes(`:${port}`) && line.includes("LISTENING")) {
          const parts = line.trim().split(/\s+/);
          const pid = parseInt(parts[parts.length - 1]);
          if (!isNaN(pid)) {
            await killProcess(pid);
          }
        }
      }
    } catch {
      // Ignore errors
    }
  } else {
    // Unix/macOS: use lsof
    try {
      const { stdout } = Bun.spawn(["sh", "-c", `lsof -i :${port} -t 2>/dev/null`], {
        stdout: "pipe",
        stderr: "ignore",
      });

      const output = await new Response(stdout).text();
      const pids = output.trim().split("\n").filter(Boolean);

      for (const pidStr of pids) {
        const pid = parseInt(pidStr);
        if (!isNaN(pid)) {
          await killProcess(pid);
        }
      }
    } catch {
      // Ignore errors
    }
  }
}

// ============================================================================
// PORT READINESS CHECK
// ============================================================================

function isPortReady(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new Socket();

    const onError = () => {
      socket.destroy();
      resolve(false);
    };

    socket.setTimeout(2000, onError);
    socket.once("error", onError);
    socket.once("timeout", onError);

    socket.connect(port, "127.0.0.1", () => {
      socket.destroy();
      resolve(true);
    });
  });
}

async function waitForPort(
  port: number,
  timeoutMs: number = 15000,
  label?: string
): Promise<boolean> {
  const start = Date.now();
  const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let spinIdx = 0;

  while (Date.now() - start < timeoutMs) {
    if (await isPortReady(port)) {
      if (label) process.stdout.write("\r" + " ".repeat(40) + "\r");
      return true;
    }

    if (label) {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      process.stdout.write(
        `\r${colors.cyan}${spinner[spinIdx]}${colors.reset} ${label} (${elapsed}s)...`
      );
      spinIdx = (spinIdx + 1) % spinner.length;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (label) process.stdout.write("\r" + " ".repeat(40) + "\r");
  return false;
}

// ============================================================================
// PROCESS MANAGER
// ============================================================================

class ProcessManager {
  private config: ManagerConfig;
  private postgresState: ProcessState = { cmd: null, name: "PostgreSQL" };
  private backendState: ProcessState = { cmd: null, name: "Backend" };
  private exitPromise: Promise<{ name: string; error: Error | null } | null>;

  constructor(appDataDir: string) {
    this.config = {
      dataDir: join(appDataDir, "data"),
      binDir: join(appDataDir, "bin", "bin"),
      backendPort: 3001,
      postgresPort: 54321,
    };

    this.exitPromise = new Promise((resolve) => {
      // This will be resolved when a child exits
      this.exitPromise = Promise.resolve(null);
    });
  }

  async init(): Promise<void> {
    // Ensure data directory exists
    if (!existsSync(this.config.dataDir)) {
      mkdirSync(this.config.dataDir, { recursive: true, mode: 0o755 });
      log("info", `Created data directory: ${this.config.dataDir}`);
    }

    // Kill existing processes on our ports
    log("info", "Cleaning up ports...");
    await cleanupPort(this.config.postgresPort);
    await cleanupPort(this.config.backendPort);
  }

  // ========================================================================
  // POSTGRESQL MANAGEMENT
  // ========================================================================

  private get postgresBin(): string {
    const exe = process.platform === "win32" ? ".exe" : "";
    return join(this.config.binDir, `postgres${exe}`);
  }

  private get initDbBin(): string {
    const exe = process.platform === "win32" ? ".exe" : "";
    return join(this.config.binDir, `initdb${exe}`);
  }

  private async initDatabase(): Promise<void> {
    const pgVersionFile = join(this.config.dataDir, "PG_VERSION");

    if (existsSync(pgVersionFile)) {
      return; // Already initialized
    }

    log("info", "Initializing PostgreSQL database...");

    const initCmd = spawn(this.initDbBin, [
      "-D",
      this.config.dataDir,
      "-U",
      "postgres",
      "--auth=trust",
      "--encoding=UTF8",
    ]);

    initCmd.stdout?.pipe(process.stdout);
    initCmd.stderr?.pipe(process.stderr);

    const exitCode = await new Promise<number>((resolve) => {
      initCmd.on("close", resolve);
    });

    if (exitCode !== 0) {
      throw new Error(`initdb failed with exit code ${exitCode}`);
    }

    log("success", "Database initialized");
  }

  private async cleanupStalePostgresFiles(): Promise<void> {
    const pidFile = join(this.config.dataDir, "postmaster.pid");
    const socketLock = join(this.config.dataDir, ".s.PGSQL.54321.lock");

    for (const file of [pidFile, socketLock]) {
      if (existsSync(file)) {
        log("warning", `Found stale ${file}, cleaning up...`);
        try {
          rmSync(file);
        } catch (err) {
          log("warning", `Could not remove ${file}: ${err}`);
        }
      }
    }
  }

  async startPostgres(): Promise<void> {
    await this.initDatabase();
    await this.cleanupStalePostgresFiles();

    log("info", "Starting PostgreSQL...");

    const args = [
      "-D",
      this.config.dataDir,
      "-p",
      String(this.config.postgresPort),
      "-k",
      this.config.dataDir,
    ];

    const cmd = spawn(this.postgresBin, args, {
      stdio: "inherit",
    });

    this.postgresState.cmd = cmd;

    // Monitor for unexpected exit
    cmd.on("close", (code) => {
      if (code !== 0 && code !== null) {
        log("error", `PostgreSQL exited with code ${code}`);
      }
    });

    // Wait for PG to be ready
    log("info", "Waiting for PostgreSQL to start...");

    const ready = await waitForPort(
      this.config.postgresPort,
      15000,
      "Waiting for PostgreSQL"
    );

    if (!ready) {
      throw new Error(
        `PostgreSQL is not accepting connections on 127.0.0.1:${this.config.postgresPort} after 15 seconds`
      );
    }

    log("success", "PostgreSQL is ready");
  }

  // ========================================================================
  // BACKEND MANAGEMENT
  // ========================================================================

  private async findBackendScript(): Promise<string> {
    const possiblePaths = [
      "../backend/dist_user/main.js",
      "../../backend/dist_user/main.js",
      "../../bin/backend/main.js",
      "bin/backend/main.js",
      join(this.config.binDir, "backend", "main.js"),
    ];

    for (const path of possiblePaths) {
      if (existsSync(path)) {
        return path;
      }
    }

    throw new Error(
      `Backend main.js not found in any of:\n${possiblePaths.map((p) => "  - " + p).join("\n")}`
    );
  }

  async startBackend(): Promise<void> {
    log("info", "Starting Backend...");

    const backendScript = await this.findBackendScript();

    const env: Record<string, string> = {
      ...process.env,
      PORT: String(this.config.backendPort),
      DATABASE_URL: `postgresql://postgres@127.0.0.1:${this.config.postgresPort}/postgres`,
      NODE_ENV: "production",
      CLINICAL_PHOTOS_DIR: join(this.config.dataDir, "uploads", "clinical-photos"),
      MEDICAL_IMAGING_DIR: join(this.config.dataDir, "uploads", "medical-imaging"),
      DOCUMENTS_DIR: join(this.config.dataDir, "uploads", "documents"),
    };

    const cmd = spawn("node", [backendScript], {
      env,
      stdio: "inherit",
    });

    this.backendState.cmd = cmd;

    // Monitor for unexpected exit
    cmd.on("close", (code) => {
      if (code !== 0 && code !== null) {
        log("error", `Backend exited with code ${code}`);
      }
    });

    // Give backend a moment to start
    await new Promise((resolve) => setTimeout(resolve, 2000));

    log("success", "Backend started");
  }

  // ========================================================================
  // WATCH FOR CHILD EXITS
  // ========================================================================

  watchForChildExits(): Promise<{ name: string; error: Error | null }> {
    return new Promise((resolve) => {
      const checkChild = (state: ProcessState) => {
        if (state.cmd) {
          state.cmd.on("exit", (code, signal) => {
            resolve({
              name: state.name,
              error: code !== 0 && code !== null
                ? new Error(`${state.name} exited: ${signal || "code " + code}`)
                : null,
            });
          });
        }
      };

      checkChild(this.postgresState);
      checkChild(this.backendState);
    });
  }

  // ========================================================================
  // SHUTDOWN
  // ========================================================================

  private async killTree(pid: number, signal: Signal): Promise<void> {
    const isWindows = process.platform === "win32";

    if (isWindows) {
      // Windows: use taskkill to kill process tree
      try {
        await Bun.spawn(["taskkill", "/F", "/T", "/PID", String(pid)], {
          stdout: "ignore",
          stderr: "ignore",
        }).exited;
      } catch {
        // Fallback to regular kill
        await killProcess(pid, signal as NodeJS.Signals);
      }
    } else {
      // Unix: kill process group
      try {
        // Try to kill the negative PID (process group)
        await killProcess(-pid, signal as NodeJS.Signals);
      } catch {
        // Fallback: kill just the process
        await killProcess(pid, signal as NodeJS.Signals);
      }
    }
  }

  async stopBackend(): Promise<void> {
    const { cmd, name } = this.backendState;
    if (cmd && cmd.pid) {
      log("info", `Stopping ${name}...`);
      await this.killTree(cmd.pid, "SIGKILL");
    }
  }

  async stopPostgres(): Promise<void> {
    const { cmd, name } = this.postgresState;
    if (cmd && cmd.pid) {
      log("info", `Stopping ${name}...`);

      // Try SIGTERM first (smart shutdown)
      await this.killTree(cmd.pid, "SIGTERM");

      // Wait up to 5 seconds for graceful shutdown
      const shutdownStart = Date.now();
      while (Date.now() - shutdownStart < 5000) {
        if (!(await isPortReady(this.config.postgresPort))) {
          log("success", "PostgreSQL stopped cleanly");
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Still running - try SIGQUIT (fast shutdown)
      log("warning", "PostgreSQL shutdown timed out, trying fast shutdown...");
      await this.killTree(cmd.pid, "SIGQUIT");

      const fastShutdownStart = Date.now();
      while (Date.now() - fastShutdownStart < 2000) {
        if (!(await isPortReady(this.config.postgresPort))) {
          log("success", "PostgreSQL stopped after fast shutdown");
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Force kill
      log("warning", "PostgreSQL still running, forcing...");
      await this.killTree(cmd.pid, "SIGKILL");
      log("success", "PostgreSQL stopped");
    }
  }

  async stopAll(): Promise<void> {
    await this.stopBackend();
    await this.stopPostgres();
  }
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

async function main() {
  console.log(`${colors.cyan}🚀 Starting INAMSOS Desktop Services (Standalone Mode)...${colors.reset}\n`);

  // Get current directory for data
  const cwd = process.cwd();

  // Create manager
  const manager = new ProcessManager(cwd);

  try {
    await manager.init();
  } catch (err) {
    log("error", `Failed to initialize manager: ${err}`);
    process.exit(1);
  }

  // Start PostgreSQL
  try {
    await manager.startPostgres();
  } catch (err) {
    log("error", `Failed to start PostgreSQL: ${err}`);
    process.exit(1);
  }

  // Start Backend
  try {
    await manager.startBackend();
  } catch (err) {
    log("error", `Failed to start Backend: ${err}`);
    log("info", "Make sure you have run 'npm run build' in the backend directory");
    await manager.stopAll();
    process.exit(1);
  }

  console.log(`\n${colors.green}✅ Services are running!${colors.reset}`);
  console.log(`${colors.cyan}👉 Backend:${colors.reset} http://localhost:3001`);
  console.log(`${colors.cyan}👉 Database:${colors.reset} postgresql://postgres@localhost:54321/postgres`);
  console.log(`\n${colors.yellow}Press Ctrl+C to stop all services...${colors.reset}\n`);

  // Watch for child process exits
  const childExitPromise = manager.watchForChildExits();

  // Wait for interrupt or child exit
  const stopSignal = Promise.withResolvers<void>();

  process.on("SIGINT", () => stopSignal.resolve());
  process.on("SIGTERM", () => stopSignal.resolve());

  const result = await Promise.race([
    stopSignal.promise.then(() => ({ signal: true })),
    childExitPromise.then((exit) => ({ exit })),
  ]);

  if ("signal" in result) {
    // Normal shutdown
    console.log(`\n${colors.yellow}🛑 Shutting down services...${colors.reset}`);
    await manager.stopAll();
    console.log(`${colors.cyan}👋 Goodbye!${colors.reset}`);
  } else if (result.exit) {
    // Child process exited unexpectedly
    console.log(`\n${colors.red}❌ ${result.exit.error}${colors.reset}`);
    console.log(`${colors.yellow}🛑 Shutting down remaining services...${colors.reset}`);
    await manager.stopAll();
    process.exit(1);
  }
}

// Run main
main().catch((err) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, err);
  process.exit(1);
});
