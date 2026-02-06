package main

import (
	"embed"
	"io/fs"
	"net/http"
	"path/filepath"
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
		path := strings.TrimPrefix(r.URL.Path, "/")
		if path == "" {
			r.URL.Path = "/index.html"
			next.ServeHTTP(w, r)
			return
		}

		// List of possible file matches in order of priority
		options := []string{
			path,
			path + ".html",
			path + "/index.html",
		}

		for _, opt := range options {
			fullPath := "frontend/out/" + opt
			if _, err := fs.Stat(assets, fullPath); err == nil {
				// We found a real file!
				// If it's a directory, technically we should check, but Next.js usually
				// provides a .html file if it's a page.
				if !strings.HasSuffix(opt, "/") && !strings.Contains(filepath.Base(opt), ".") {
					// It's a clean URL like /patients, rewrite to /patients.html
					r.URL.Path = "/" + opt + ".html"
				} else {
					r.URL.Path = "/" + opt
				}
				next.ServeHTTP(w, r)
				return
			}
		}

		// Fallback for SPA routing
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
