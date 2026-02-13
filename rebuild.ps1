Write-Host "=== Quick Rebuild ===" -ForegroundColor Cyan
Get-Process "INAMSOS" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -s 1

if (Test-Path "desktop/frontend/dist") { Remove-Item -Path "desktop/frontend/dist" -Recurse -Force }
New-Item -ItemType Directory -Path "desktop/frontend/dist" -Force | Out-Null
Copy-Item -Path "frontend/out/*" -Destination "desktop/frontend/dist" -Recurse -Force

Write-Host "Building..." -ForegroundColor Yellow
Set-Location desktop
wails build
Set-Location ..

$buildExe = "desktop/build/INAMSOS.exe"
if (-not (Test-Path $buildExe)) { $buildExe = "desktop/build/bin/INAMSOS.exe" }
if (Test-Path $buildExe) {
    Move-Item -Path $buildExe -Destination "INAMSOS.exe" -Force
    Write-Host "Done! $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green
    Start-Process ".\INAMSOS.exe"
}
