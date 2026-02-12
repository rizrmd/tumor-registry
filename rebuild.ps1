# INAMSOS Rebuild & Clean Script

Write-Host "--- INAMSOS Master Build & Repair ---" -ForegroundColor Cyan

# 1. Cleanup
Write-Host "[1/6] Cleaning up running processes..." -ForegroundColor Yellow
Get-Process INAMSOS*, node*, postgres* -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
taskkill /F /IM INAMSOS.exe /T 2>$null
taskkill /F /IM node.exe /T 2>$null

# Wait for file locks to release
Start-Sleep -s 3

# 2. Build Backend
Write-Host "[2/6] Building Backend..." -ForegroundColor Yellow
Set-Location backend
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Backend Build Failed!" -ForegroundColor Red; exit }
Set-Location ..

# 3. Build Frontend
Write-Host "[3/6] Building Frontend..." -ForegroundColor Yellow
Set-Location frontend
$env:NEXT_PUBLIC_STATIC_EXPORT="true"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Frontend Build Failed!" -ForegroundColor Red; exit }
Set-Location ..

# 4. Sync Assets to Desktop App
Write-Host "[4/6] Syncing assets to Desktop project..." -ForegroundColor Yellow
if (Test-Path "desktop/frontend/dist") {
    Remove-Item -Path "desktop/frontend/dist" -Recurse -Force
}
New-Item -ItemType Directory -Path "desktop/frontend/dist" -Force
Copy-Item -Path "frontend/out/*" -Destination "desktop/frontend/dist" -Recurse -Force

# 5. Build Wails Executable
Write-Host "[5/6] Building Wails Application..." -ForegroundColor Yellow
Set-Location desktop
wails build -o ../INAMSOS.exe
if ($LASTEXITCODE -ne 0) { Write-Host "Wails Build Failed!" -ForegroundColor Red; exit }
Set-Location ..

# 6. Finalization
Write-Host "[6/6] Finalizing executable..." -ForegroundColor Yellow
if (Test-Path "desktop/build/INAMSOS.exe") {
    Copy-Item -Path "desktop/build/INAMSOS.exe" -Destination "INAMSOS.exe" -Force
}

# Cleanup temp build files
Write-Host "Cleaning up temporary files..." -ForegroundColor Gray
Remove-Item -Path "test-*.js", "debug-*.js" -ErrorAction SilentlyContinue

Write-Host "--- BUILD SUCCESSFUL ---" -ForegroundColor Green
Write-Host "Launching INAMSOS..." -ForegroundColor Cyan
Start-Process ".\INAMSOS.exe"
