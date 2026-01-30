package process

import (
	"fmt"
	"net"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"
)

type Manager struct {
	postgresCmd *exec.Cmd
	backendCmd  *exec.Cmd
	DataDir     string
	BinDir      string
	BackendPort string
}

func NewManager(appDataDir string) *Manager {
	return &Manager{
		DataDir: filepath.Join(appDataDir, "data"),
		BinDir:  filepath.Join(appDataDir, "bin", "bin"),
		BackendPort: "3001",
	}
}

func (m *Manager) Init() error {
	// Ensure data directory exists
	if err := os.MkdirAll(m.DataDir, 0755); err != nil {
		return fmt.Errorf("failed to create data dir: %w", err)
	}

	// Kill existing processes on our ports
	CleanupPort(54321) // Postgres
	CleanupPort(3001)  // Backend

	return nil
}

func (m *Manager) StartPostgres() error {
	postgresBin := filepath.Join(m.BinDir, "postgres")
	if runtime.GOOS == "windows" {
		postgresBin += ".exe"
	}
	
	initDbBin := filepath.Join(m.BinDir, "initdb")
	if runtime.GOOS == "windows" {
		initDbBin += ".exe"
	}

	// Check if data dir is initialized (look for PG_VERSION)
	if _, err := os.Stat(filepath.Join(m.DataDir, "PG_VERSION")); os.IsNotExist(err) {
		fmt.Println("Initializing Database...", m.DataDir)
		initCmd := exec.Command(initDbBin, "-D", m.DataDir, "-U", "postgres", "--auth=trust", "--encoding=UTF8")
		if out, err := initCmd.CombinedOutput(); err != nil {
			return fmt.Errorf("initdb failed: %s: %w", string(out), err)
		}
	}

	// Start Postgres
	port := "54321"
	
	// Automatic cleanup of stale pid and socket lock files
	pidFile := filepath.Join(m.DataDir, "postmaster.pid")
	if _, err := os.Stat(pidFile); err == nil {
		fmt.Println("⚠️  Found stale postmaster.pid, attempting cleanup...")
		os.Remove(pidFile)
	}
	
	socketLock := filepath.Join(m.DataDir, ".s.PGSQL.54321.lock")
	if _, err := os.Stat(socketLock); err == nil {
		fmt.Println("⚠️  Found stale socket lock, attempting cleanup...")
		os.Remove(socketLock)
	}

	args := []string{"-D", m.DataDir, "-p", port, "-k", m.DataDir}
	
	cmd := exec.Command(postgresBin, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	// Set process group for platform-specific cleanup
	SetProcessGroup(cmd)
	
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start postgres: %w", err)
	}
	m.postgresCmd = cmd
	
	// Wait for PG to be ready
	fmt.Println("Waiting for Postgres to start...")
	
	success := false
	for i := 0; i < 15; i++ {
		conn, err := net.DialTimeout("tcp", "127.0.0.1:54321", 500*time.Millisecond)
		if err == nil {
			conn.Close()
			success = true
			break
		}
		time.Sleep(1 * time.Second)
	}

	if !success {
		return fmt.Errorf("postgres is not accepting connections on 127.0.0.1:54321 after 15 seconds")
	}
	
	fmt.Println("🐘 Postgres is ready and accepting connections.")
	return nil
}

func (m *Manager) StartBackend() error {
	backendScript := "../backend/dist_user/main.js"
	if _, err := os.Stat(backendScript); os.IsNotExist(err) {
		backendScript = filepath.Join(m.BinDir, "backend", "main.js")
	}

	nodeBin := "node"
	m.BackendPort = "3001"
	
	localDbUrl := "postgresql://postgres@127.0.0.1:54321/postgres"
	args := []string{backendScript}
	
	cmd := exec.Command(nodeBin, args...)
	cmd.Env = os.Environ()
	remoteDbUrl := os.Getenv("REMOTE_DATABASE_URL")
	if remoteDbUrl == "" {
		remoteDbUrl = localDbUrl
	}

	cmd.Env = append(cmd.Env, fmt.Sprintf("PORT=%s", m.BackendPort))
	cmd.Env = append(cmd.Env, fmt.Sprintf("DATABASE_URL=%s", localDbUrl))
	cmd.Env = append(cmd.Env, fmt.Sprintf("REMOTE_DATABASE_URL=%s", remoteDbUrl))
	cmd.Env = append(cmd.Env, "NODE_ENV=production")
	
	uploadsDir := filepath.Join(m.DataDir, "uploads")
	cmd.Env = append(cmd.Env, fmt.Sprintf("CLINICAL_PHOTOS_DIR=%s", filepath.Join(uploadsDir, "clinical-photos")))
	cmd.Env = append(cmd.Env, fmt.Sprintf("MEDICAL_IMAGING_DIR=%s", filepath.Join(uploadsDir, "medical-imaging")))
	cmd.Env = append(cmd.Env, fmt.Sprintf("DOCUMENTS_DIR=%s", filepath.Join(uploadsDir, "documents")))
	
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	// Set process group for platform-specific cleanup
	SetProcessGroup(cmd)
	
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to start backend: %w", err)
	}
	m.backendCmd = cmd
	
	return nil
}

func (m *Manager) StopAll() {
	if m.backendCmd != nil && m.backendCmd.Process != nil {
		fmt.Println("Stopping Backend...")
		// Use cross-platform kill
		KillProcessGroup(m.backendCmd, SigKill)
		m.backendCmd.Wait()
	}

	if m.postgresCmd != nil && m.postgresCmd.Process != nil {
		fmt.Println("Stopping Postgres...")
		// Send SIGTERM (Smart Shutdown)
		KillProcessGroup(m.postgresCmd, SigTerm)

		// Wait with timeout
		done := make(chan error, 1)
		go func() {
			done <- m.postgresCmd.Wait()
		}()

		select {
		case <-done:
			fmt.Println("🐘 Postgres stopped cleanly.")
		case <-time.After(5 * time.Second):
			fmt.Println("⚠️  Postgres shutdown timed out, forcing fast shutdown...")
			KillProcessGroup(m.postgresCmd, SigQuit) // SIGQUIT is "Fast Shutdown" in Postgres
			
			select {
			case <-done:
				fmt.Println("🐘 Postgres stopped after fast shutdown.")
			case <-time.After(2 * time.Second):
				fmt.Println("❌ Postgres still running, sending SIGKILL...")
				KillProcessGroup(m.postgresCmd, SigKill)
			}
		}
	}
}
