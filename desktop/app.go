package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"desktop/pkg/process"
	"path/filepath"
	"os"
	"net/http"
	"io"
	"time"
	"sync"
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
