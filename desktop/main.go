package main

import (
	"context"
	"embed"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"syscall"
	"time"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

// AssetHandler handles serving assets from embedded filesystem
type AssetHandler struct {
	assets  fs.FS
	handler http.Handler
}

// NewAssetHandler creates a new AssetHandler
func NewAssetHandler() *AssetHandler {
	sub, err := fs.Sub(assets, "frontend/dist")
	if err != nil {
		log.Fatal(err)
	}
	return &AssetHandler{
		assets:  sub,
		handler: http.FileServer(http.FS(sub)),
	}
}

// Open implements fs.FS
func (h *AssetHandler) Open(name string) (fs.File, error) {
	return h.assets.Open(name)
}

func (h *AssetHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/")

	// If root path or empty, explicitly serve login.html or index.html
	if path == "" {
		path = "login.html"
		if _, err := fs.Stat(h.assets, "login.html"); err != nil {
			path = "index.html"
		}
	}

	// Logic to avoid "directory requested without trailing slash" error:
	// 1. Always check if a .html version of the path exists
	fileToServe := ""
	if strings.HasSuffix(path, ".html") {
		fileToServe = path
	} else {
		htmlPath := path + ".html"
		if _, err := fs.Stat(h.assets, htmlPath); err == nil {
			fileToServe = htmlPath
		}
	}

	// 2. If it's a directory, check for index.html
	if fileToServe == "" {
		if info, err := fs.Stat(h.assets, path); err == nil {
			if info.IsDir() {
				indexPath := filepath.ToSlash(filepath.Join(path, "index.html"))
				if _, err := fs.Stat(h.assets, indexPath); err == nil {
					fileToServe = indexPath
				}
			} else {
				fileToServe = path
			}
		}
	}

	// 3. Final fallback to login.html for SPA routing
	if fileToServe == "" {
		fileToServe = "login.html"
	}

	// 4. If it's an HTML file, serve it MANUALLY using http.ServeContent
	// to bypass http.FileServer's redirect logic
	if strings.HasSuffix(fileToServe, ".html") {
		f, err := h.assets.Open(fileToServe)
		if err == nil {
			defer f.Close()
			if info, err := f.Stat(); err == nil {
				if rs, ok := f.(io.ReadSeeker); ok {
					w.Header().Set("Content-Type", "text/html; charset=utf-8")
					http.ServeContent(w, r, fileToServe, info.ModTime(), rs)
					return
				}
			}
		}
	}

	// For non-html files (JS, CSS, Images), use the standard handler
	h.handler.ServeHTTP(w, r)
}

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

// Greet returns a greeting for a given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// startup is called when app starts
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	exePath, err := os.Executable()
	if err != nil {
		log.Printf("Failed to get executable path: %v", err)
		return
	}
	appDir := filepath.Dir(exePath)

	// Start PostgreSQL
	log.Println("Starting PostgreSQL server...")
	go a.startPostgreSQL(appDir)

	// Wait for PostgreSQL to be ready by checking the port
	log.Println("Waiting for PostgreSQL to be ready on port 54321...")
	dbReady := false
	for i := 0; i < 60; i++ { // Try for 60 seconds
		conn, err := net.DialTimeout("tcp", "127.0.0.1:54321", 1*time.Second)
		if err == nil {
			conn.Close()
			dbReady = true
			log.Println("PostgreSQL is ready!")
			break
		}
		time.Sleep(1 * time.Second)
	}

	if !dbReady {
		log.Println("[ERROR] PostgreSQL failed to start in time. Attempting to start backend anyway...")
	} else {
		// Even if port is open, PG might still be in recovery/startup
		log.Println("Waiting 5 more seconds for DB stabilization...")
		time.Sleep(5 * time.Second)
	}

	// Start backend server
	log.Println("Starting backend server...")
	go a.startBackend(appDir)

	// Give backend more time to initialize - increased from 10 to 20 seconds
	log.Println("Waiting for backend to fully initialize...")
	time.Sleep(20 * time.Second)
	log.Println("Application startup complete")
}

// startPostgreSQL starts the embedded PostgreSQL server
func (a *App) startPostgreSQL(appDir string) {
	postgresDir := filepath.Join(appDir, "engine", "bin")
	dataDir := filepath.Join(appDir, "data")
	logDir := filepath.Join(appDir, "logs")

	// Ensure log directory exists
	os.MkdirAll(logDir, 0755)
	logFile := filepath.Join(logDir, "postgres.log")
	var postgresExe string
	if runtime.GOOS == "windows" {
		postgresExe = filepath.Join(postgresDir, "pg_ctl.exe")
	} else {
		postgresExe = postgresDir + "/pg_ctl"
	}
	if _, err := os.Stat(postgresExe); os.IsNotExist(err) {
		log.Printf("[ERROR] PostgreSQL executable not found at: %s", postgresExe)
		return
	}
	pidFile := filepath.Join(dataDir, "postmaster.pid")
	if _, err := os.Stat(pidFile); err == nil {
		log.Println("Removing stale postmaster.pid")
		os.Remove(pidFile)
	}
	log.Println("Starting PostgreSQL...")
	cmd := exec.Command(postgresExe, "start", "-D", dataDir, "-l", logFile, "-w", "-o", "-p 54321")
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("[ERROR] Failed to start PostgreSQL: %v\nOutput: %s", err, string(output))
		content, _ := os.ReadFile(logFile)
		if len(content) > 0 {
			tail := string(content)
			if len(tail) > 2000 {
				tail = tail[len(tail)-2000:]
			}
			log.Printf("PostgreSQL Log Tail:\n%s", tail)
		}
		return
	}
	log.Printf("PostgreSQL started successfully:\n%s", string(output))
	a.postgresCmd = cmd
}

// startBackend starts the NestJS backend server
func (a *App) startBackend(appDir string) {
	nodeExe := "node"
	localNode := filepath.Join(appDir, "engine", "bin", "node.exe")
	if _, err := os.Stat(localNode); err == nil {
		nodeExe = localNode
	}
	backendScript := filepath.Join(appDir, "backend", "dist_user", "main.js")
	if _, err := os.Stat(backendScript); err != nil {
		log.Printf("[ERROR] Backend script not found at: %s", backendScript)
		return
	}
	dbURL := "postgresql://postgres@127.0.0.1:54321/postgres?schema=system"
	os.Setenv("NODE_ENV", "production")
	os.Setenv("PORT", "3001")
	os.Setenv("DATABASE_URL", dbURL)
	os.Setenv("DATABASE_PORT", "54321")
	a.backendCmd = exec.Command(nodeExe, backendScript)
	a.backendCmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	a.backendCmd.Dir = filepath.Dir(backendScript)
	logPath := filepath.Join(appDir, "logs", "backend.log")
	logFile, err := os.Create(logPath)
	if err == nil {
		a.backendCmd.Stdout = logFile
		a.backendCmd.Stderr = logFile
	} else {
		log.Printf("Failed to create backend log file: %v", err)
		a.backendCmd.Stdout = os.Stdout
		a.backendCmd.Stderr = os.Stderr
	}
	log.Println("Starting Backend...")
	if err := a.backendCmd.Start(); err != nil {
		log.Printf("[ERROR] Failed to start backend: %v", err)
		return
	}
	log.Printf("Backend started successfully. Logs at: %s", logPath)
}

// shutdown is called when app is closing
func (a *App) shutdown(ctx context.Context) {
	if a.backendCmd != nil && a.backendCmd.Process != nil {
		log.Println("Stopping backend...")
		a.backendCmd.Process.Kill()
	}
	if a.postgresCmd != nil {
		log.Println("Stopping PostgreSQL...")
		exePath, _ := os.Executable()
		appDir := filepath.Dir(exePath)
		postgresDir := filepath.Join(appDir, "engine", "bin")
		dataDir := filepath.Join(appDir, "data")
		var postgresExe string
		if runtime.GOOS == "windows" {
			postgresExe = filepath.Join(postgresDir, "pg_ctl.exe")
		} else {
			postgresExe = filepath.Join(postgresDir, "pg_ctl")
		}
		stopCmd := exec.Command(postgresExe, "stop", "-D", dataDir, "-m", "fast")
		stopCmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		stopCmd.Run()
	}
}

func main() {
	app := NewApp()
	handler := NewAssetHandler()
	err := wails.Run(&options.App{
		Title:  "INAMSOS - Tumor Registry",
		Width:  1280,
		Height: 800,
		AssetServer: &assetserver.Options{
			Assets:  handler,
			Handler: handler,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 255},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		Bind: []interface{}{
			app,
		},
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
		},
	})
	if err != nil {
		log.Fatal(err)
	}
}
