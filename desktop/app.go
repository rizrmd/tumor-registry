package main

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sync"
	"time"
	"desktop/pkg/process"
)

const (
	AppVersion = "1.0.0"
)

// App struct
type App struct {
	ctx              context.Context
	Manager          *process.Manager
	centralServerUrl string
	jwtToken         string
	// Update checker fields
	updateInfo         *UpdateInfo
	updateCheckMutex   sync.RWMutex
	lastUpdateCheck    time.Time
	updateCheckChannel chan *UpdateInfo
}

// UpdateInfo represents available update information
type UpdateInfo struct {
	UpdateAvailable bool   `json:"updateAvailable"`
	CurrentVersion  string `json:"currentVersion"`
	LatestVersion   string `json:"latestVersion"`
	Mandatory       bool   `json:"mandatory"`
	DownloadUrl     string `json:"downloadUrl"`
	ReleaseDate     string `json:"releaseDate"`
	Changelog       []string `json:"changelog"`
	Message         string `json:"message,omitempty"`
}

// VersionCheckResponse represents the API response for version check
type VersionCheckResponse struct {
	Status string `json:"status"`
	Data   struct {
		UpdateAvailable bool     `json:"updateAvailable"`
		CurrentVersion  string    `json:"currentVersion"`
		LatestVersion   string    `json:"latestVersion"`
		Mandatory       bool      `json:"mandatory"`
		DownloadUrl     string    `json:"downloadUrl"`
		ReleaseDate     string    `json:"releaseDate"`
		Changelog       []string  `json:"changelog"`
		Message         string    `json:"message,omitempty"`
	} `json:"data"`
}

// BackupInfo represents information about a backup
type BackupInfo struct {
	BackupPath string `json:"backupPath"`
	Timestamp  string `json:"timestamp"`
	Version    string `json:"version"`
	Size       int64  `json:"size"`
}

// BackupProgress represents progress during backup operation
type BackupProgress struct {
	Stage     string  `json:"stage"` // "database", "files", "compressing", "complete"
	Progress  float64 `json:"progress"`
	Message   string  `json:"message"`
	BackupPath string `json:"backupPath,omitempty"`
}

// UpdateProgress represents progress during update operation
type UpdateProgress struct {
	Stage    string  `json:"stage"` // "downloading", "backup", "installing", "complete"
	Progress float64 `json:"progress"`
	Message  string  `json:"message"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		centralServerUrl:    "https://inamsos.com",
		updateCheckChannel:  make(chan *UpdateInfo, 1),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Get App Data Directory
	// For now, use current dir or a specific one. Wails provides a way to get it?
	// Using os.UserConfigDir or similar is better, but process manager helps.
	// Let's use ./data for now relative to executable

	exe, _ := os.Executable()
	baseDir := filepath.Dir(exe)

	// Check for custom central server URL from env
	if url := os.Getenv("CENTRAL_SERVER_URL"); url != "" {
		a.centralServerUrl = url
	}

	// Load saved token if exists
	a.loadSavedToken(baseDir)

	a.Manager = process.NewManager(baseDir)

	// Check if services are already running FIRST (before Init() which calls CleanupPort)
	servicesAlreadyRunning := a.checkServicesRunning()

	if !servicesAlreadyRunning {
		// Only call Init() (which includes CleanupPort) if services aren't running
		if err := a.Manager.Init(); err != nil {
			fmt.Printf("Error initializing manager: %v\n", err)
		}

		go func() {
			if err := a.Manager.StartPostgres(); err != nil {
				fmt.Printf("Error starting postgres: %v\n", err)
			}
			// Start backend - token will be passed when available
			if err := a.Manager.StartBackend(); err != nil {
				fmt.Printf("Error starting backend: %v\n", err)
			}
			// If we have a token, update the backend env
			if a.jwtToken != "" {
				a.updateBackendToken()
			}
		}()
	} else {
		fmt.Println("✅ Services already running, skipping start (dev mode)")
		// Services are already running, just update token if we have one
		if a.jwtToken != "" {
			go a.updateBackendToken()
		}
	}

	// Start background update checker
	go a.backgroundUpdateChecker()
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	a.Manager.StopAll()
}

// loadSavedToken attempts to load a previously saved JWT token
func (a *App) loadSavedToken(baseDir string) {
	tokenFile := filepath.Join(baseDir, "data", ".auth_token")
	data, err := os.ReadFile(tokenFile)
	if err == nil {
		a.jwtToken = string(data)
		fmt.Println("Loaded saved authentication token")
	}
}

// saveToken saves the JWT token to disk
func (a *App) saveToken() error {
	if a.Manager == nil {
		return fmt.Errorf("manager not initialized")
	}
	tokenFile := filepath.Join(a.Manager.DataDir, ".auth_token")
	return os.WriteFile(tokenFile, []byte(a.jwtToken), 0600)
}

// clearToken removes the saved JWT token
func (a *App) clearToken() error {
	if a.Manager == nil {
		return nil
	}
	tokenFile := filepath.Join(a.Manager.DataDir, ".auth_token")
	return os.Remove(tokenFile)
}

// updateBackendToken updates the backend with the current token via API
func (a *App) updateBackendToken() {
	if a.jwtToken == "" {
		return
	}

	// Call the local backend API to update the token
	backendUrl := fmt.Sprintf("http://localhost:%s/remote-sync/update-token", a.Manager.BackendPort)

	payload := map[string]string{
		"jwtToken": a.jwtToken,
	}
	jsonData, _ := json.Marshal(payload)

	req, err := http.NewRequest("POST", backendUrl, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Printf("Error creating token update request: %v\n", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	// Use the token itself for auth (the backend validates it against central server)
	req.Header.Set("Authorization", "Bearer "+a.jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error updating backend token: %v\n", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode == 200 {
		fmt.Println("JWT token updated in backend successfully")
	} else {
		fmt.Printf("Failed to update backend token, status: %d\n", resp.StatusCode)
	}
}

// LoginCredentials represents login request
type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginResult represents login response
type LoginResult struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	User    *struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Role    string `json:"role"`
		CenterID string `json:"centerId"`
	} `json:"user,omitempty"`
}

// Login authenticates with the central server and stores the JWT token
func (a *App) Login(email string, password string) (*LoginResult, error) {
	loginUrl := fmt.Sprintf("%s/api/v1/auth/login", a.centralServerUrl)

	creds := LoginCredentials{
		Email:    email,
		Password: password,
	}

	jsonData, err := json.Marshal(creds)
	if err != nil {
		return nil, err
	}

	resp, err := http.Post(loginUrl, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to connect to server: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != 200 {
		var errResp struct {
			Message string `json:"message"`
		}
		json.Unmarshal(body, &errResp)
		return &LoginResult{
			Success: false,
			Message: errResp.Message,
		}, nil
	}

	var result struct {
		AccessToken  string `json:"accessToken"`
		RefreshToken string `json:"refreshToken"`
		User         struct {
			ID       string `json:"id"`
			Email    string `json:"email"`
			Name     string `json:"name"`
			Role     string `json:"role"`
			CenterID string `json:"centerId"`
		} `json:"user"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	// Save the token
	a.jwtToken = result.AccessToken
	os.Setenv("USER_JWT_TOKEN", a.jwtToken)
	a.saveToken()
	a.updateBackendToken()

	return &LoginResult{
		Success: true,
		Message: "Login successful",
		User: &struct {
			ID      string `json:"id"`
			Email   string `json:"email"`
			Name    string `json:"name"`
			Role    string `json:"role"`
			CenterID string `json:"centerId"`
		}{
			ID:       result.User.ID,
			Email:    result.User.Email,
			Name:     result.User.Name,
			Role:     result.User.Role,
			CenterID: result.User.CenterID,
		},
	}, nil
}

// Logout clears the stored JWT token
func (a *App) Logout() error {
	a.jwtToken = ""
	os.Unsetenv("USER_JWT_TOKEN")
	return a.clearToken()
}

// GetAuthStatus returns the current authentication status
func (a *App) GetAuthStatus() map[string]interface{} {
	return map[string]interface{}{
		"isAuthenticated": a.jwtToken != "",
		"centralServer":   a.centralServerUrl,
	}
}

// GetCentralServerUrl returns the configured central server URL
func (a *App) GetCentralServerUrl() string {
	return a.centralServerUrl
}

// GetAppVersion returns the current desktop app version
func (a *App) GetAppVersion() string {
	return AppVersion
}

// CheckForUpdates checks if a new version is available
func (a *App) CheckForUpdates() (*UpdateInfo, error) {
	checkUrl := fmt.Sprintf("%s/api/v1/version/desktop/check/%s", a.centralServerUrl, AppVersion)

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	resp, err := client.Get(checkUrl)
	if err != nil {
		return nil, fmt.Errorf("failed to check for updates: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("update check failed with status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	var apiResponse VersionCheckResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	updateInfo := &UpdateInfo{
		UpdateAvailable: apiResponse.Data.UpdateAvailable,
		CurrentVersion:  apiResponse.Data.CurrentVersion,
		LatestVersion:   apiResponse.Data.LatestVersion,
		Mandatory:       apiResponse.Data.Mandatory,
		DownloadUrl:     apiResponse.Data.DownloadUrl,
		ReleaseDate:     apiResponse.Data.ReleaseDate,
		Changelog:       apiResponse.Data.Changelog,
		Message:         apiResponse.Data.Message,
	}

	// Cache the update info
	a.updateCheckMutex.Lock()
	a.updateInfo = updateInfo
	a.lastUpdateCheck = time.Now()
	a.updateCheckMutex.Unlock()

	return updateInfo, nil
}

// GetCachedUpdateInfo returns the cached update information without making a network request
func (a *App) GetCachedUpdateInfo() *UpdateInfo {
	a.updateCheckMutex.RLock()
	defer a.updateCheckMutex.RUnlock()
	return a.updateInfo
}

// backgroundUpdateChecker periodically checks for updates
func (a *App) backgroundUpdateChecker() {
	// Check every 30 minutes
	ticker := time.NewTicker(30 * time.Minute)
	defer ticker.Stop()

	// Initial check after 5 seconds
	time.AfterFunc(5*time.Second, func() {
		if updateInfo, err := a.CheckForUpdates(); err == nil && updateInfo.UpdateAvailable {
			// Send update notification to channel
			select {
			case a.updateCheckChannel <- updateInfo:
				fmt.Printf("Update available: %s -> %s\n", AppVersion, updateInfo.LatestVersion)
			default:
				// Channel already has an update notification
			}
		}
	})

	for range ticker.C {
		if updateInfo, err := a.CheckForUpdates(); err == nil && updateInfo.UpdateAvailable {
			select {
			case a.updateCheckChannel <- updateInfo:
				fmt.Printf("Update available: %s -> %s\n", AppVersion, updateInfo.LatestVersion)
			default:
				// Channel already has an update notification
			}
		}
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// checkServicesRunning checks if PostgreSQL and Backend are already running
func (a *App) checkServicesRunning() bool {
	// Try to connect to PostgreSQL
	pgConn, err := net.DialTimeout("tcp", "127.0.0.1:54321", 1*time.Second)
	pgRunning := err == nil
	if pgConn != nil {
		pgConn.Close()
	}

	// Try to connect to Backend
	backendConn, err := net.DialTimeout("tcp", "127.0.0.1:3001", 1*time.Second)
	backendRunning := err == nil
	if backendConn != nil {
		backendConn.Close()
	}

	return pgRunning && backendRunning
}

// ==================== BACKUP FUNCTIONALITY ====================

// CreateBackup creates a backup of the application data
func (a *App) CreateBackup() (*BackupInfo, error) {
	if a.Manager == nil {
		return nil, fmt.Errorf("manager not initialized")
	}

	timestamp := time.Now().Format("20060102-150405")
	backupFileName := fmt.Sprintf("inamsos-backup-%s.zip", timestamp)
	backupDir := filepath.Join(a.Manager.DataDir, "backups")

	// Create backups directory
	if err := os.MkdirAll(backupDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create backup directory: %w", err)
	}

	backupPath := filepath.Join(backupDir, backupFileName)

	fmt.Printf("Creating backup at: %s\n", backupPath)

	// Create zip file
	zipFile, err := os.Create(backupPath)
	if err != nil {
		return nil, fmt.Errorf("failed to create backup file: %w", err)
	}
	defer zipFile.Close()

	zipWriter := zip.NewWriter(zipFile)
	defer zipWriter.Close()

	// Walk the data directory and add files to zip
	err = filepath.Walk(a.Manager.DataDir, func(filePath string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip the backup directory itself
		if info.IsDir() && filepath.Base(filePath) == "backups" {
			return filepath.SkipDir
		}

		// Get relative path
		relPath, err := filepath.Rel(a.Manager.DataDir, filePath)
		if err != nil {
			return err
		}

		// Create zip header
		header, err := zip.FileInfoHeader(info)
		if err != nil {
			return err
		}
		header.Name = relPath
		header.Method = zip.Deflate

		// Create writer in zip
		writer, err := zipWriter.CreateHeader(header)
		if err != nil {
			return err
		}

		// If directory, just create the entry
		if info.IsDir() {
			return nil
		}

		// Copy file content
		file, err := os.Open(filePath)
		if err != nil {
			return err
		}
		defer file.Close()

		_, err = io.Copy(writer, file)
		return err
	})

	if err != nil {
		os.Remove(backupPath)
		return nil, fmt.Errorf("failed to create backup: %w", err)
	}

	// Get file size
	info, _ := os.Stat(backupPath)

	return &BackupInfo{
		BackupPath: backupPath,
		Timestamp:  timestamp,
		Version:    AppVersion,
		Size:       info.Size(),
	}, nil
}

// ListBackups returns list of available backups
func (a *App) ListBackups() ([]BackupInfo, error) {
	if a.Manager == nil {
		return nil, fmt.Errorf("manager not initialized")
	}

	backupDir := filepath.Join(a.Manager.DataDir, "backups")
	files, err := os.ReadDir(backupDir)
	if err != nil {
		if os.IsNotExist(err) {
			return []BackupInfo{}, nil
		}
		return nil, err
	}

	var backups []BackupInfo
	for _, file := range files {
		if filepath.Ext(file.Name()) != ".zip" {
			continue
		}

		filePath := filepath.Join(backupDir, file.Name())
		info, err := file.Info()
		if err != nil {
			continue
		}

		backups = append(backups, BackupInfo{
			BackupPath: filePath,
			Timestamp:  info.ModTime().Format("20060102-150405"),
			Version:    AppVersion,
			Size:       info.Size(),
		})
	}

	// Sort by timestamp (newest first)
	// Reverse sort
	for i, j := 0, len(backups)-1; i < j; i, j = i+1, j-1 {
		backups[i], backups[j] = backups[j], backups[i]
	}

	return backups, nil
}

// RestoreBackup restores data from a backup file
func (a *App) RestoreBackup(backupPath string) error {
	if a.Manager == nil {
		return fmt.Errorf("manager not initialized")
	}

	// Stop services
	a.Manager.StopAll()

	// Open zip file
	zipReader, err := zip.OpenReader(backupPath)
	if err != nil {
		return fmt.Errorf("failed to open backup: %w", err)
	}
	defer zipReader.Close()

	// Extract files
	for _, file := range zipReader.File {
		filePath := filepath.Join(a.Manager.DataDir, file.Name)

		// Create directory if needed
		if file.FileInfo().IsDir() {
			os.MkdirAll(filePath, 0755)
			continue
		}

		// Create parent directory
		if err := os.MkdirAll(filepath.Dir(filePath), 0755); err != nil {
			return fmt.Errorf("failed to create directory: %w", err)
		}

		// Extract file
		srcFile, err := file.Open()
		if err != nil {
			return fmt.Errorf("failed to open file in zip: %w", err)
		}
		defer srcFile.Close()

		dstFile, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
		if err != nil {
			return fmt.Errorf("failed to create file: %w", err)
		}

		_, err = io.Copy(dstFile, srcFile)
		dstFile.Close()
		if err != nil {
			return fmt.Errorf("failed to extract file: %w", err)
		}
	}

	// Restart services
	go func() {
		if err := a.Manager.StartPostgres(); err != nil {
			fmt.Printf("Error starting postgres after restore: %v\n", err)
		}
		if err := a.Manager.StartBackend(); err != nil {
			fmt.Printf("Error starting backend after restore: %v\n", err)
		}
	}()

	return nil
}

// DeleteBackup deletes a backup file
func (a *App) DeleteBackup(backupPath string) error {
	return os.Remove(backupPath)
}

// ==================== UPDATE FUNCTIONALITY ====================

// DownloadUpdate downloads the update to a temporary location
func (a *App) DownloadUpdate(downloadUrl string, progressCallback func(string)) (string, error) {
	tmpDir := os.TempDir()
	extension := ".zip"

	// Determine extension based on platform
	switch runtime.GOOS {
	case "darwin":
		extension = ".dmg"
	case "windows":
		extension = ".exe"
	case "linux":
		extension = ".AppImage"
	}

	tmpFile := filepath.Join(tmpDir, fmt.Sprintf("inamsos-update-%s%s", time.Now().Format("20060102-150405"), extension))

	if progressCallback != nil {
		progressCallback("Starting download...")
	}

	// Download file
	resp, err := http.Get(downloadUrl)
	if err != nil {
		return "", fmt.Errorf("failed to download update: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return "", fmt.Errorf("download failed with status: %d", resp.StatusCode)
	}

	// Create file
	out, err := os.Create(tmpFile)
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}
	defer out.Close()

	// Track progress
	totalSize := resp.ContentLength
	var downloaded int64

	// Copy with progress tracking
	buffer := make([]byte, 32*1024)
	for {
		n, err := resp.Body.Read(buffer)
		if n > 0 {
			wrote, _ := out.Write(buffer[:n])
			downloaded += int64(wrote)

			if progressCallback != nil && totalSize > 0 {
				progress := float64(downloaded) / float64(totalSize) * 100
				progressCallback(fmt.Sprintf("Downloading: %.1f%%", progress))
			}
		}
		if err == io.EOF {
			break
		}
		if err != nil {
			return "", fmt.Errorf("download error: %w", err)
		}
	}

	if progressCallback != nil {
		progressCallback("Download complete")
	}

	return tmpFile, nil
}

// InstallUpdate installs the downloaded update
func (a *App) InstallUpdate(updateFilePath string, backupPath string, progressCallback func(string)) error {
	if progressCallback != nil {
		progressCallback("Preparing installation...")
	}

	exePath, err := os.Executable()
	if err != nil {
		return fmt.Errorf("failed to get executable path: %w", err)
	}

	exeDir := filepath.Dir(exePath)

	switch runtime.GOOS {
	case "darwin":
		return a.installUpdateMacOS(updateFilePath, exeDir, progressCallback)
	case "windows":
		return a.installUpdateWindows(updateFilePath, exeDir, progressCallback)
	case "linux":
		return a.installUpdateLinux(updateFilePath, exeDir, progressCallback)
	default:
		return fmt.Errorf("unsupported platform: %s", runtime.GOOS)
	}
}

// installUpdateMacOS handles update installation on macOS
func (a *App) installUpdateMacOS(updateFilePath string, _exeDir string, progressCallback func(string)) error {
	if progressCallback != nil {
		progressCallback("Opening installer...")
	}

	// Open the DMG file
	cmd := exec.Command("open", updateFilePath)
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to open DMG: %w", err)
	}

	if progressCallback != nil {
		progressCallback("Please follow the installation instructions in the DMG")
	}

	return nil
}

// installUpdateWindows handles update installation on Windows
func (a *App) installUpdateWindows(updateFilePath string, exeDir string, progressCallback func(string)) error {
	if progressCallback != nil {
		progressCallback("Launching installer...")
	}

	// Launch the installer
	cmd := exec.Command(updateFilePath)
	cmd.Dir = exeDir
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to launch installer: %w", err)
	}

	if progressCallback != nil {
		progressCallback("Installer launched")
	}

	return nil
}

// installUpdateLinux handles update installation on Linux
func (a *App) installUpdateLinux(updateFilePath string, exeDir string, progressCallback func(string)) error {
	if progressCallback != nil {
		progressCallback("Making AppImage executable...")
	}

	// Make AppImage executable
	if err := os.Chmod(updateFilePath, 0755); err != nil {
		return fmt.Errorf("failed to make AppImage executable: %w", err)
	}

	if progressCallback != nil {
		progressCallback("Launching new version...")
	}

	// Launch the new AppImage
	cmd := exec.Command(updateFilePath)
	cmd.Dir = exeDir
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("failed to launch AppImage: %w", err)
	}

	return nil
}

// PerformUpdate performs the complete update process with backup
func (a *App) PerformUpdate(downloadUrl string, createBackup bool, progressCallback func(string)) error {
	if progressCallback != nil {
		progressCallback("Starting update process...")
	}

	// Step 1: Create backup if requested
	var backupPath string
	if createBackup {
		if progressCallback != nil {
			progressCallback("Creating backup...")
		}

		backupInfo, err := a.CreateBackup()
		if err != nil {
			return fmt.Errorf("backup failed: %w", err)
		}
		backupPath = backupInfo.BackupPath

		if progressCallback != nil {
			progressCallback(fmt.Sprintf("Backup created: %s", backupPath))
		}
	}

	// Step 2: Download update
	downloadPath, err := a.DownloadUpdate(downloadUrl, progressCallback)
	if err != nil {
		return fmt.Errorf("download failed: %w", err)
	}

	// Step 3: Install update
	if progressCallback != nil {
		progressCallback("Installing update...")
	}

	if err := a.InstallUpdate(downloadPath, backupPath, progressCallback); err != nil {
		return fmt.Errorf("installation failed: %w", err)
	}

	if progressCallback != nil {
		progressCallback("Update complete!")
	}

	return nil
}

// ==================== DATA MIGRATION ====================

// ImportDataFromPath imports data from a previous installation
func (a *App) ImportDataFromPath(sourcePath string, progressCallback func(string)) error {
	if a.Manager == nil {
		return fmt.Errorf("manager not initialized")
	}

	if progressCallback != nil {
		progressCallback("Checking source path...")
	}

	// Check if source exists
	if _, err := os.Stat(sourcePath); os.IsNotExist(err) {
		return fmt.Errorf("source path does not exist: %s", sourcePath)
	}

	// Check if source has data directory
	sourceDataDir := filepath.Join(sourcePath, "data")
	if _, err := os.Stat(sourceDataDir); os.IsNotExist(err) {
		// Maybe the sourcePath IS the data directory
		sourceDataDir = sourcePath
	}

	if progressCallback != nil {
		progressCallback("Stopping services...")
	}

	// Stop services
	a.Manager.StopAll()

	if progressCallback != nil {
		progressCallback("Migrating data...")
	}

	// Copy data files
	err := filepath.Walk(sourceDataDir, func(sourcePath string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Calculate relative path
		relPath, err := filepath.Rel(sourceDataDir, sourcePath)
		if err != nil {
			return err
		}

		destPath := filepath.Join(a.Manager.DataDir, relPath)

		// Create directory
		if info.IsDir() {
			return os.MkdirAll(destPath, info.Mode())
		}

		// Copy file
		return copyFile(sourcePath, destPath)
	})

	if err != nil {
		go a.restartServices()
		return fmt.Errorf("failed to copy data: %w", err)
	}

	if progressCallback != nil {
		progressCallback("Restarting services...")
	}

	// Restart services
	a.restartServices()

	if progressCallback != nil {
		progressCallback("Migration complete!")
	}

	return nil
}

// restartServices restarts the backend services
func (a *App) restartServices() {
	if err := a.Manager.StartPostgres(); err != nil {
		fmt.Printf("Error starting postgres: %v\n", err)
	}
	if err := a.Manager.StartBackend(); err != nil {
		fmt.Printf("Error starting backend: %v\n", err)
	}
}

// copyFile copies a file from src to dst
func copyFile(src, dst string) error {
	sourceFile, err := os.Open(src)
	if err != nil {
		return err
	}
	defer sourceFile.Close()

	destFile, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer destFile.Close()

	// Copy file contents
	_, err = io.Copy(destFile, sourceFile)
	if err != nil {
		return err
	}

	// Copy file mode
	sourceInfo, err := os.Stat(src)
	if err != nil {
		return err
	}

	return os.Chmod(dst, sourceInfo.Mode())
}

