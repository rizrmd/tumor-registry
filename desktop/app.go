package main

import (
	"context"
	"fmt"
	"desktop/pkg/process"
	"path/filepath"
	"os"
)

// App struct
type App struct {
	ctx     context.Context
	Manager *process.Manager
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
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
	
	a.Manager = process.NewManager(baseDir)
	if err := a.Manager.Init(); err != nil {
		fmt.Printf("Error initializing manager: %v\n", err)
	}
	
	go func() {
		if err := a.Manager.StartPostgres(); err != nil {
			fmt.Printf("Error starting postgres: %v\n", err)
		}
		if err := a.Manager.StartBackend(); err != nil {
			fmt.Printf("Error starting backend: %v\n", err)
		}
	}()
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	a.Manager.StopAll()
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
