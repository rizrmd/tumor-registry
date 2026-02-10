package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"strings"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

type AssetHandler struct {
	assets  fs.FS
	handler http.Handler
}

func NewAssetHandler() *AssetHandler {
	// Create sub-filesystem for frontend/dist
	sub, err := fs.Sub(assets, "frontend/dist")
	if err != nil {
		log.Fatal(err)
	}
	return &AssetHandler{
		assets:  sub,
		handler: http.FileServer(http.FS(sub)),
	}
}

func (h *AssetHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/")

	// If root, serve index
	if path == "" {
		h.handler.ServeHTTP(w, r)
		return
	}

	// 1. Check if file exists exactly as requested (and is not a directory)
	if info, err := fs.Stat(h.assets, path); err == nil && !info.IsDir() {
		h.handler.ServeHTTP(w, r)
		return
	}

	// 2. Check if .html extension exists (e.g. settings -> settings.html)
	htmlPath := path + ".html"
	if _, err := fs.Stat(h.assets, htmlPath); err == nil {
		r.URL.Path = "/" + htmlPath
		h.handler.ServeHTTP(w, r)
		return
	}

	// 3. Check if directory has index.html (e.g. settings -> settings/index.html)
	// Remove trailing slash if present to avoid double slash
	cleanPath := strings.TrimSuffix(path, "/")
	indexPath := cleanPath + "/index.html"
	if _, err := fs.Stat(h.assets, indexPath); err == nil {
		r.URL.Path = "/" + indexPath
		h.handler.ServeHTTP(w, r)
		return
	}

	// 4. Fallback to index.html for SPA routing (handle 404s)
	r.URL.Path = "/"
	h.handler.ServeHTTP(w, r)
}

func main() {
	// Create application with embedded frontend
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "INAMSOS - Tumor Registry",
		Width:  1280,
		Height: 800,
		AssetServer: &assetserver.Options{
			Assets:  nil, // Use custom handler
			Handler: NewAssetHandler(),
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
