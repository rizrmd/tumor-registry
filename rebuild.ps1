# INAMSOS Rebuild & Clean Script

Write-Host "--- INAMSOS Master Build & Repair ---" -ForegroundColor Cyan

# 1. Cleanup
Write-Host "[1/6] Cleaning up running processes and old files..." -ForegroundColor Yellow
$processes = @("INAMSOS", "node", "postgres")
foreach ($p in $processes) {
    Get-Process "$p*" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
}
taskkill /F /IM INAMSOS.exe /T 2>$null
taskkill /F /IM node.exe /T 2>$null
taskkill /F /IM postgres.exe /T 2>$null

# Wait and try harder to clear the root exe
Start-Sleep -s 3
if (Test-Path "INAMSOS.exe") {
    Write-Host "Trying to rename existing EXE to release lock..." -ForegroundColor Gray
    $oldExe = "INAMSOS_old_$(Get-Date -Format 'HHmmss').exe"
    Rename-Item "INAMSOS.exe" $oldExe -ErrorAction SilentlyContinue
    Remove-Item "INAMSOS.exe" -Force -ErrorAction SilentlyContinue
}

# If it still exists, we have a problem
if (Test-Path "INAMSOS.exe") {
     Write-Host "CRITICAL ERROR: Could not remove INAMSOS.exe. Please close the app manually and try again." -ForegroundColor Red
     exit
}

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
# Build to its default location first
wails build
if ($LASTEXITCODE -ne 0) { Write-Host "Wails Build Failed!" -ForegroundColor Red; exit }
Set-Location ..

# 6. Finalization
Write-Host "[6/6] Finalizing..." -ForegroundColor Yellow
if (Test-Path "desktop/build/INAMSOS.exe") {
    Write-Host "Updating root INAMSOS.exe..." -ForegroundColor Green
    Copy-Item -Path "desktop/build/INAMSOS.exe" -Destination "INAMSOS.exe" -Force
} else {
    Write-Host "ERROR: Built executable not found in desktop/build!" -ForegroundColor Red
    exit
}

# Double check timestamp
$newTime = (Get-Item "INAMSOS.exe").LastWriteTime
Write-Host "New Executable Timestamp: $newTime" -ForegroundColor White

# Cleanup temp build files
Write-Host "Cleaning up temporary files..." -ForegroundColor Gray
Remove-Item -Path "test-*.js", "debug-*.js", "*.log" -ErrorAction SilentlyContinue
Remove-Item -Path "desktop/frontend/dist" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "--- BUILD SUCCESSFUL ---" -ForegroundColor Green
Write-Host "Launching INAMSOS..." -ForegroundColor Cyan
Start-Process ".\INAMSOS.exe"
