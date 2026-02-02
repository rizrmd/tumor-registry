#!/usr/bin/env ts-node

/**
 * INAMSOS Web Development Script (TypeScript)
 * Runs both backend and frontend without Docker
 */

import { spawn, ChildProcess } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as net from 'net';

// Colors for output
const colors = {
    red: '\x1b[0;31m',
    green: '\x1b[0;32m',
    yellow: '\x1b[1;33m',
    blue: '\x1b[0;34m',
    cyan: '\x1b[0;36m',
    magenta: '\x1b[0;35m',
    nc: '\x1b[0m', // No Color
};

// Configuration
const BACKEND_DIR = 'backend';
const FRONTEND_DIR = 'frontend';
const BACKEND_PID_FILE = '.backend.pid';
const FRONTEND_PID_FILE = '.frontend.pid';
const BACKEND_PORT = 3002;
const FRONTEND_PORT = 3000;
const BACKEND_LOG = 'backend.log';
const FRONTEND_LOG = 'frontend.log';

// Process references
let backendProcess: ChildProcess | null = null;
let frontendProcess: ChildProcess | null = null;
let isShuttingDown = false;

// Print functions
function printStatus(message: string): void {
    console.log(`${colors.blue}[INFO]${colors.nc} ${message}`);
}

function printSuccess(message: string): void {
    console.log(`${colors.green}[SUCCESS]${colors.nc} ${message}`);
}

function printWarning(message: string): void {
    console.log(`${colors.yellow}[WARNING]${colors.nc} ${message}`);
}

function printError(message: string): void {
    console.log(`${colors.red}[ERROR]${colors.nc} ${message}`);
}

function printStep(message: string): void {
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.nc}`);
    console.log(`${colors.cyan}  ${message}${colors.nc}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.nc}`);
}

// Check if a port is in use
async function isPortInUse(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const tester = net.createServer()
            .once('error', () => resolve(true))
            .once('listening', () => {
                tester.once('close', () => resolve(false)).close();
            })
            .listen(port);
    });
}

// Kill process on a port (cross-platform)
async function killProcessOnPort(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const platform = process.platform;
        let command: string;
        let args: string[];

        if (platform === 'darwin' || platform === 'linux') {
            // macOS/Linux: use lsof to find and kill process
            command = 'sh';
            args = ['-c', `lsof -ti:${port} | xargs kill -9 2>/dev/null || true`];
        } else if (platform === 'win32') {
            // Windows: use netstat and taskkill
            command = 'cmd';
            args = ['/c', `FOR /F "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /F /PID %a 2>nul || exit 0`];
        } else {
            resolve();
            return;
        }

        const child = spawn(command, args, { stdio: 'ignore' });
        child.on('close', () => resolve());
        child.on('error', () => resolve());
    });
}

// Kill process by PID
async function killProcess(pid: number): Promise<void> {
    return new Promise((resolve) => {
        try {
            process.kill(pid, 'SIGTERM');
            // Give it a moment to terminate gracefully
            setTimeout(() => {
                try {
                    process.kill(pid, 'SIGKILL');
                } catch {
                    // Process already terminated
                }
                resolve();
            }, 2000);
        } catch {
            // Process doesn't exist
            resolve();
        }
    });
}

// Check if a command exists
function commandExists(command: string): boolean {
    try {
        const result = spawn.sync('which', [command], { stdio: 'pipe' });
        return result.status === 0;
    } catch {
        return false;
    }
}

// Cleanup function
async function cleanup(): Promise<void> {
    if (isShuttingDown) return;
    isShuttingDown = true;

    printStep('Cleaning Up');

    // Kill backend process
    if (backendProcess) {
        printStatus('Stopping Backend...');
        backendProcess.kill('SIGTERM');
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (backendProcess && !backendProcess.killed) {
            backendProcess.kill('SIGKILL');
        }
        backendProcess = null;
    }

    // Check PID file for backend
    if (fs.existsSync(BACKEND_PID_FILE)) {
        const pid = parseInt(fs.readFileSync(BACKEND_PID_FILE, 'utf8').trim());
        if (pid) {
            await killProcess(pid);
        }
        fs.unlinkSync(BACKEND_PID_FILE);
        printSuccess('Backend stopped');
    }

    // Kill frontend process
    if (frontendProcess) {
        printStatus('Stopping Frontend...');
        frontendProcess.kill('SIGTERM');
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (frontendProcess && !frontendProcess.killed) {
            frontendProcess.kill('SIGKILL');
        }
        frontendProcess = null;
    }

    // Check PID file for frontend
    if (fs.existsSync(FRONTEND_PID_FILE)) {
        const pid = parseInt(fs.readFileSync(FRONTEND_PID_FILE, 'utf8').trim());
        if (pid) {
            await killProcess(pid);
        }
        fs.unlinkSync(FRONTEND_PID_FILE);
        printSuccess('Frontend stopped');
    }

    printSuccess('All services stopped');
    process.exit(0);
}

// Wait for port to be ready
async function waitForPort(port: number, timeout: number = 30000): Promise<boolean> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        if (await isPortInUse(port)) {
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    return false;
}

// Check prerequisites
async function checkPrerequisites(): Promise<void> {
    printStep('Checking Prerequisites');

    // Check if Bun is installed
    if (!commandExists('bun')) {
        printError('Bun is not installed. Please install Bun first: https://bun.sh');
        process.exit(1);
    }
    printSuccess('Bun is installed');

    // Check if npm is installed
    if (!commandExists('npm')) {
        printError('npm is not installed. Please install Node.js first.');
        process.exit(1);
    }
    printSuccess('npm is installed');

    // Check if we're in the project root
    if (!fs.existsSync(BACKEND_DIR) || !fs.existsSync(FRONTEND_DIR)) {
        printError('Please run this script from the project root directory');
        process.exit(1);
    }
    printSuccess('Project structure validated');
}

// Cleanup ports
async function cleanupPorts(): Promise<void> {
    printStep('Cleaning Up Ports');

    const ports = [FRONTEND_PORT, BACKEND_PORT, 3001, 3003];
    
    for (const port of ports) {
        if (await isPortInUse(port)) {
            printWarning(`Port ${port} is in use, killing process...`);
            await killProcessOnPort(port);
        }
    }

    // Wait a moment for processes to terminate
    await new Promise(resolve => setTimeout(resolve, 1000));
    printSuccess('All ports cleaned up');
}

// Start backend
async function startBackend(): Promise<void> {
    printStep('Starting Backend');

    // Check if .env.local exists
    const envLocalPath = path.join(BACKEND_DIR, '.env.local');
    const envPath = path.join(BACKEND_DIR, '.env');
    if (!fs.existsSync(envLocalPath)) {
        if (fs.existsSync(envPath)) {
            printWarning('.env.local not found, using .env');
        } else {
            printWarning('No .env file found. Backend may fail to start.');
        }
    }

    // Create log file stream
    const logStream = fs.createWriteStream(BACKEND_LOG, { flags: 'a' });

    // Start backend with Bun
    backendProcess = spawn('bun', ['src/main.ts'], {
        cwd: BACKEND_DIR,
        stdio: ['ignore', logStream, logStream],
        detached: false,
    });

    if (!backendProcess.pid) {
        throw new Error('Failed to start backend process');
    }

    // Save PID
    fs.writeFileSync(BACKEND_PID_FILE, backendProcess.pid.toString());
    printSuccess(`Backend started (PID: ${backendProcess.pid})`);

    // Wait for backend to be ready
    printStatus('Waiting for backend to be ready...');
    const isReady = await waitForPort(BACKEND_PORT, 30000);
    
    if (!isReady) {
        printError('Backend failed to start. Check backend.log for errors.');
        // Show last 30 lines of log
        if (fs.existsSync(BACKEND_LOG)) {
            const logContent = fs.readFileSync(BACKEND_LOG, 'utf8');
            const lines = logContent.split('\n').slice(-30);
            console.log('\nLast 30 lines of backend.log:');
            console.log(lines.join('\n'));
        }
        throw new Error('Backend failed to start');
    }

    printSuccess(`Backend is listening on port ${BACKEND_PORT}`);

    // Handle backend exit
    backendProcess.on('exit', (code) => {
        if (!isShuttingDown && code !== 0) {
            printError(`Backend exited with code ${code}`);
            cleanup();
        }
    });
}

// Start frontend
async function startFrontend(): Promise<void> {
    printStep('Starting Frontend');

    // Check if node_modules exists
    const nodeModulesPath = path.join(FRONTEND_DIR, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        printStatus('Installing frontend dependencies...');
        const installResult = spawn.sync('npm', ['install'], {
            cwd: FRONTEND_DIR,
            stdio: 'inherit',
        });
        if (installResult.status !== 0) {
            throw new Error('Failed to install frontend dependencies');
        }
    }

    // Check if .env.local exists
    const envLocalPath = path.join(FRONTEND_DIR, '.env.local');
    if (!fs.existsSync(envLocalPath)) {
        printWarning('.env.local not found, creating from .env');
    }

    // Create log file stream
    const logStream = fs.createWriteStream(FRONTEND_LOG, { flags: 'a' });

    // Start frontend with npm
    frontendProcess = spawn('npm', ['run', 'dev'], {
        cwd: FRONTEND_DIR,
        stdio: ['ignore', logStream, logStream],
        detached: false,
        shell: process.platform === 'win32',
    });

    if (!frontendProcess.pid) {
        throw new Error('Failed to start frontend process');
    }

    // Save PID
    fs.writeFileSync(FRONTEND_PID_FILE, frontendProcess.pid.toString());
    printSuccess(`Frontend started (PID: ${frontendProcess.pid})`);

    // Handle frontend exit
    frontendProcess.on('exit', (code) => {
        if (!isShuttingDown && code !== 0) {
            printError(`Frontend exited with code ${code}`);
            cleanup();
        }
    });
}

// Display info
function displayInfo(): void {
    console.log('');
    console.log('==================================================================');
    console.log('🏥 INAMSOS Development Environment Ready!');
    console.log('==================================================================');
    console.log('');
    console.log('📊 Application URLs:');
    console.log(`   Frontend:     http://localhost:${FRONTEND_PORT}`);
    console.log(`   Backend API:  http://localhost:${BACKEND_PORT}/api/v1`);
    console.log(`   API Docs:     http://localhost:${BACKEND_PORT}/api/docs`);
    console.log('');
    console.log('🗄️  Database:');
    console.log('   Remote PostgreSQL (107.155.75.50:5389)');
    console.log('');
    console.log('📝 Logs:');
    console.log(`   Backend:  tail -f ${BACKEND_LOG}`);
    console.log(`   Frontend: tail -f ${FRONTEND_LOG}`);
    console.log('');
    console.log('🛠️  Commands:');
    console.log('   Stop:     Press Ctrl+C');
    console.log('   Restart:  Stop and run ./dev-web.ts again');
    console.log('');
    console.log('==================================================================');
    printSuccess('Development environment is running!');
    printStatus('Press Ctrl+C to stop all services');
    console.log('');
}

// Main function
async function main(): Promise<void> {
    console.log('');
    console.log('🏥 INAMSOS Web Development Environment');
    console.log('======================================');
    console.log('');

    // Setup signal handlers
    process.on('SIGINT', () => {
        printStatus('\nReceived SIGINT, shutting down...');
        cleanup();
    });

    process.on('SIGTERM', () => {
        printStatus('\nReceived SIGTERM, shutting down...');
        cleanup();
    });

    process.on('uncaughtException', (error) => {
        printError(`Uncaught exception: ${error.message}`);
        cleanup();
    });

    process.on('unhandledRejection', (reason) => {
        printError(`Unhandled rejection: ${reason}`);
        cleanup();
    });

    try {
        await checkPrerequisites();
        await cleanupPorts();
        await startBackend();
        await startFrontend();
        
        // Wait a moment for services to fully initialize
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        displayInfo();

        // Keep the script running
        setInterval(() => {
            // Heartbeat - check if processes are still alive
            if (backendProcess && backendProcess.exitCode !== null) {
                printError('Backend process died unexpectedly');
                cleanup();
            }
            if (frontendProcess && frontendProcess.exitCode !== null) {
                printError('Frontend process died unexpectedly');
                cleanup();
            }
        }, 5000);

    } catch (error) {
        printError(`Failed to start development environment: ${error}`);
        await cleanup();
        process.exit(1);
    }
}

// Run main function
main();
