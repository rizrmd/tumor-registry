package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"desktop/pkg/process"
)

func main() {
	fmt.Println("🚀 Starting INAMSOS Desktop Services (Standalone Mode)...")

	// Use current directory for data
	cwd, _ := os.Getwd()
	
	// Create manager
	manager := process.NewManager(cwd)
	if err := manager.Init(); err != nil {
		log.Fatalf("❌ Failed to initialize manager: %v", err)
	}
	
	// Start Postgres
	fmt.Println("🐘 Starting local PostgreSQL on port 54321...")
	if err := manager.StartPostgres(); err != nil {
		log.Fatalf("❌ Failed to start Postgres: %v", err)
	}

	// Start Backend
	fmt.Println("📦 Starting NestJS Backend on port 3001...")
	if err := manager.StartBackend(); err != nil {
		fmt.Printf("⚠️  Backend failed to start: %v\n", err)
		fmt.Println("   Make sure you have run 'npm run build' in the backend directory.")
	}

	fmt.Println("\n✅ Services are running!")
	fmt.Println("👉 Backend: http://localhost:3001")
	fmt.Println("👉 Database: postgresql://postgres@localhost:54321/postgres")
	fmt.Println("\nPress Ctrl+C to stop all services...")

	// Wait for interrupt
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop

	fmt.Println("\n🛑 Shutting down services...")
	manager.StopAll()
	fmt.Println("👋 Goodbye!")
}
