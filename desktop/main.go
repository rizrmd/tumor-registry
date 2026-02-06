package main

import (
	"embed"
	"io/fs"
	"net/http"
	"strings"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/out
var assets embed.FS

// Custom handler for Next.js static export
func nextJSHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Get the path
		path := strings.TrimPrefix(r.URL.Path, "/")
		
		// Try to serve the exact file first
		if _, err := fs.Stat(assets, "frontend/out/"+path); err == nil {
			next.ServeHTTP(w, r)
			return
		}
		
		// Try with .html extension
		htmlPath := path + ".html"
		if _, err := fs.Stat(assets, "frontend/out/"+htmlPath); err == nil {
			r.URL.Path = "/" + htmlPath
			next.ServeHTTP(w, r)
			return
		}
		
		// Try index.html in directory
		indexPath := path + "/index.html"
		if _, err := fs.Stat(assets, "frontend/out/"+indexPath); err == nil {
			r.URL.Path = "/" + indexPath
			next.ServeHTTP(w, r)
			return
		}
		
		// Fallback to index.html for SPA routing
		r.URL.Path = "/index.html"
		next.ServeHTTP(w, r)
	})
}

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "INAMSOS",
		Width:  1024,
		Height:  768,
		AssetServer: &assetserver.Options{
			Assets:     assets,
			Middleware: nextJSHandler,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
