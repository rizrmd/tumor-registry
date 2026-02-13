
Write-Host "--- Quick Rebuild ---" -ForegroundColor Cyan

# Kill processes
Get-Process "INAMSOS" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -s 1

# Sync Assets
Write-Host "Syncing assets..." -ForegroundColor Yellow
if (Test-Path "desktop/frontend/dist") {
    Remove-Item -Path "desktop/frontend/dist" -Recurse -Force
}
New-Item -ItemType Directory -Path "desktop/frontend/dist" -Force
Copy-Item -Path "frontend/out/*" -Destination "desktop/frontend/dist" -Recurse -Force

# Build Wails
Write-Host "Building Wails..." -ForegroundColor Yellow
Set-Location desktop
wails build
if ($LASTEXITCODE -ne 0) { Write-Host "Build Failed!" -ForegroundColor Red; Set-Location ..; exit }
Set-Location ..

# Move exe
$buildExe = "desktop/build/INAMSOS.exe"
if (-not (Test-Path $buildExe)) { $buildExe = "desktop/build/bin/INAMSOS.exe" }
if (Test-Path $buildExe) {
    Move-Item -Path $buildExe -Destination "INAMSOS.exe" -Force
    Write-Host "Success! Timestamp: $( (GCI INAMSOS.exe).LastWriteTime )" -ForegroundColor Green
    Start-Process ".\INAMSOS.exe"
} else {
    Write-Host "ERROR: Exe not found!" -ForegroundColor Red
}
