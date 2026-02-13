# INAMSOS Rebuild & Clean Script (Final Version)

Write-Host "--- INAMSOS Master Build & Repair ---" -ForegroundColor Cyan

# 1. Cleanup & Hard Reset
Write-Host "[1/6] Hard Reset: Cleaning up ALL processes and old versions..." -ForegroundColor Yellow

# Kill all potential locking processes
$p_list = @("INAMSOS", "node", "postgres")
foreach ($p in $p_list) {
    Get-Process "$p*" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
}
taskkill /F /IM INAMSOS.exe /T 2>$null
taskkill /F /IM node.exe /T 2>$null
taskkill /F /IM postgres.exe /T 2>$null

# Wait for process handles to close
Start-Sleep -s 4

# Delete all existing executables to avoid confusion
Write-Host "Removing old executable files..." -ForegroundColor Gray
Get-ChildItem -Path . -Filter "INAMSOS*.exe" -Recurse | Remove-Item -Force -ErrorAction SilentlyContinue

# Verify root is clear
if (Test-Path "INAMSOS.exe") {
     Write-Host "CRITICAL ERROR: 'INAMSOS.exe' is still locked. Please restart your computer." -ForegroundColor Red
     exit
}

# 2. Build Backend
Write-Host "[2/6] Building Backend..." -ForegroundColor Yellow
Set-Location backend
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Backend Build Failed!" -ForegroundColor Red; Set-Location ..; exit }
Set-Location ..

# 3. Build Frontend
Write-Host "[3/6] Building Frontend..." -ForegroundColor Yellow
Set-Location frontend
$env:NEXT_PUBLIC_STATIC_EXPORT="true"
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Frontend Build Failed!" -ForegroundColor Red; Set-Location ..; exit }
Set-Location ..

# 4. Sync Assets to Desktop App
Write-Host "[4/6] Syncing assets to Desktop project..." -ForegroundColor Yellow
if (Test-Path "desktop/frontend/dist") {
    Remove-Item -Path "desktop/frontend/dist" -Recurse -Force
}
New-Item -ItemType Directory -Path "desktop/frontend/dist" -Force
# Important: ensure we copy the content of the out folder
Copy-Item -Path "frontend/out/*" -Destination "desktop/frontend/dist" -Recurse -Force

# 5. Build Wails Executable
Write-Host "[5/6] Building Wails Application..." -ForegroundColor Yellow
Set-Location desktop
wails build
if ($LASTEXITCODE -ne 0) { Write-Host "Wails Build Failed!" -ForegroundColor Red; Set-Location ..; exit }
Set-Location ..

# 6. Finalization & Cleanup
Write-Host "[6/6] Finalizing: Moving executable to root..." -ForegroundColor Yellow
$buildExe = "desktop/build/INAMSOS.exe"
if (-not (Test-Path $buildExe)) {
    $buildExe = "desktop/build/bin/INAMSOS.exe"
}

if (Test-Path $buildExe) {
    Move-Item -Path $buildExe -Destination "INAMSOS.exe" -Force
    Write-Host "Success: Updated INAMSOS.exe in root." -ForegroundColor Green
} else {
    Write-Host "ERROR: Built executable not found!" -ForegroundColor Red
    exit
}

# Final cleanup of build folders and logs to keep it clean (Only 1 EXE rule)
Write-Host "Cleaning up extra files..." -ForegroundColor Gray
Remove-Item -Path "test-*.js", "debug-*.js", "*.log" -ErrorAction SilentlyContinue 
Remove-Item -Path "desktop/frontend/dist" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Active Executable: INAMSOS.exe ($( (GCI INAMSOS.exe).LastWriteTime ))" -ForegroundColor Green
Write-Host "--- SYSTEM REFRESHED & READY ---" -ForegroundColor Green
Write-Host "Launching INAMSOS..." -ForegroundColor Cyan
Start-Process ".\INAMSOS.exe"
