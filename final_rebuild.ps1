Write-Host "=== Final System Rebuild ===" -ForegroundColor Cyan

# Kill everything
Write-Host "Killing processes..." -ForegroundColor Yellow
Get-Process "INAMSOS", "node", "postgres" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -s 2

# Sync Assets
Write-Host "Generating Prisma Client and Syncing assets..." -ForegroundColor Yellow
Set-Location backend
npx prisma generate
Set-Location ..
if (Test-Path "desktop/frontend/dist") {
    Remove-Item -Path "desktop/frontend/dist" -Recurse -Force
}
New-Item -ItemType Directory -Path "desktop/frontend/dist" -Force | Out-Null
Copy-Item -Path "frontend/out/*" -Destination "desktop/frontend/dist" -Recurse -Force

# Build Wails
Write-Host "Building Wails Executable..." -ForegroundColor Yellow
Set-Location desktop
wails build
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Wails Build Failed!" -ForegroundColor Red
    Set-Location ..
    exit 
}
Set-Location ..

# Finalize
Write-Host "Finalizing INAMSOS.exe..." -ForegroundColor Yellow
$buildExe = "desktop/build/INAMSOS.exe"
if (-not (Test-Path $buildExe)) { $buildExe = "desktop/build/bin/INAMSOS.exe" }

if (Test-Path $buildExe) {
    Move-Item -Path $buildExe -Destination "INAMSOS.exe" -Force
    Write-Host "Success! System Refreshed." -ForegroundColor Green
    Write-Host "Launching INAMSOS..." -ForegroundColor Cyan
    Start-Process ".\INAMSOS.exe"
} else {
    Write-Host "ERROR: Executable not found!" -ForegroundColor Red
}
