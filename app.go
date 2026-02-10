package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"
)

// App struct
type App struct {
	ctx         context.Context
	backendCmd  *exec.Cmd
	postgresCmd *exec.Cmd
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Greet returns a greeting for the given name
// This method ensures wailsjs bindings are generated
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// startup is called when the app starts
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Get executable directory
	exePath, err := os.Executable()
	if err != nil {
		log.Printf("Failed to get executable path: %v", err)
		return
	}
	appDir := filepath.Dir(exePath)

	// Start PostgreSQL
	go a.startPostgreSQL(appDir)

	// Wait for PostgreSQL to start
	time.Sleep(3 * time.Second)

	// Start Backend
	go a.startBackend(appDir)

	// Wait for backend to start
	time.Sleep(5 * time.Second)
}

// startPostgreSQL starts the embedded PostgreSQL server
// startPostgreSQL starts the embedded PostgreSQL server
func (a *App) startPostgreSQL(appDir string) {
	postgresDir := filepath.Join(appDir, "bin")
	dataDir := filepath.Join(appDir, "data")

	var postgresExe string
	if runtime.GOOS == "windows" {
		postgresExe = filepath.Join(postgresDir, "pg_ctl.exe")
	} else {
		postgresExe = filepath.Join(postgresDir, "pg_ctl")
	}

	// Check if PostgreSQL is already running
	statusCmd := exec.Command(postgresExe, "status", "-D", dataDir)
	if err := statusCmd.Run(); err == nil {
		log.Println("PostgreSQL is already running")
		return
	}

	// Clean up stale pid file if exists
	pidFile := filepath.Join(dataDir, "postmaster.pid")
	if _, err := os.Stat(pidFile); err == nil {
		log.Println("Removing stale postmaster.pid")
		os.Remove(pidFile)
	}

	// Start PostgreSQL
	a.postgresCmd = exec.Command(postgresExe, "start", "-D", dataDir, "-l", filepath.Join(appDir, "postgres.log"), "-o", "-p 54321")

	if err := a.postgresCmd.Start(); err != nil {
		log.Printf("Failed to start PostgreSQL: %v", err)
		return
	}

	log.Println("PostgreSQL started successfully")
}

// startBackend starts the NestJS backend server
func (a *App) startBackend(appDir string) {
	// 1. Determine Node Executable
	nodeExe := "node"
	localNode := filepath.Join(appDir, "bin", "node.exe")
	if _, err := os.Stat(localNode); err == nil {
		nodeExe = localNode
	}

	// 2. Determine Backend Script
	backendScript := filepath.Join(appDir, "backend", "dist_user", "main.js")
	// Check if script exists
	if _, err := os.Stat(backendScript); err != nil {
		log.Printf("Backend script not found at: %s", backendScript)
		return
	}

	// Use 'postgres' user (default superuser) and trust auth (any password works if configured in pg_hba.conf)
	// Use 127.0.0.1 explicitly to avoid localhost resolution issues
	// Match DB name and schema from prisma.schema
	dbURL := "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
	os.Setenv("NODE_ENV", "production")
	os.Setenv("PORT", "3001")
	os.Setenv("DATABASE_URL", dbURL)
	os.Setenv("DATABASE_PORT", "54321")

	// 4. Configure Command
	a.backendCmd = exec.Command(nodeExe, backendScript)
	a.backendCmd.Dir = filepath.Dir(backendScript)

	// 5. Setup Logging
	logPath := filepath.Join(appDir, "backend.log")
	logFile, err := os.Create(logPath)
	if err == nil {
		a.backendCmd.Stdout = logFile
		a.backendCmd.Stderr = logFile
	} else {
		log.Printf("Failed to create backend log file: %v", err)
		// Fallback to standard output if log file fails
		a.backendCmd.Stdout = os.Stdout
		a.backendCmd.Stderr = os.Stderr
	}

	// 6. Start Process
	if err := a.backendCmd.Start(); err != nil {
		log.Printf("Failed to start backend: %v", err)
		return
	}

	log.Printf("Backend started successfully. Logs at: %s", logPath)
}

// shutdown is called when the app is closing
func (a *App) shutdown(ctx context.Context) {
	// Stop backend
	if a.backendCmd != nil && a.backendCmd.Process != nil {
		log.Println("Stopping backend...")
		a.backendCmd.Process.Kill()
	}

	// Stop PostgreSQL
	if a.postgresCmd != nil {
		log.Println("Stopping PostgreSQL...")
		exePath, _ := os.Executable()
		appDir := filepath.Dir(exePath)
		postgresDir := filepath.Join(appDir, "bin")
		dataDir := filepath.Join(appDir, "data")

		var postgresExe string
		if runtime.GOOS == "windows" {
			postgresExe = filepath.Join(postgresDir, "pg_ctl.exe")
		} else {
			postgresExe = filepath.Join(postgresDir, "pg_ctl")
		}

		stopCmd := exec.Command(postgresExe, "stop", "-D", dataDir, "-m", "fast")
		stopCmd.Run()
	}
}
