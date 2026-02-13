Write-Host "=== Final System Rebuild ===" -ForegroundColor Cyan

# Kill everything aggressively
Write-Host "Killing processes..." -ForegroundColor Yellow
taskkill /F /IM INAMSOS.exe /T 2>$null
taskkill /F /IM node.exe /T 2>$null
taskkill /F /IM postgres.exe /T 2>$null
taskkill /F /IM pg_ctl.exe /T 2>$null
Start-Sleep -s 3

# Sync Assets
Write-Host "Generating Prisma Client and Syncing assets..." -ForegroundColor Yellow
Set-Location backend
npx prisma generate
Set-Location ..
if (Test-Path "desktop/frontend/dist") {
    Remove-Item -Path "desktop/frontend/dist" -Recurse -Force
}
$null = New-Item -ItemType Directory -Path "desktop/frontend/dist" -Force 
Copy-Item -Path "frontend/out/*" -Destination "desktop/frontend/dist" -Recurse -Force

# Clean up conflicting directories that cause trailing slash errors
Write-Host "Cleaning up conflicting directories..." -ForegroundColor Yellow
$distPath = "desktop/frontend/dist"
Get-ChildItem -Path $distPath -Directory | ForEach-Object {
    $dirName = $_.Name
    if (Test-Path "$distPath/$dirName.html") {
        Write-Host "Removing conflicting directory: $dirName" -ForegroundColor Gray
        Remove-Item -Path $_.FullName -Recurse -Force
    }
}

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
$buildExe = "desktop/build/bin/INAMSOS.exe"
if (-not (Test-Path $buildExe)) { $buildExe = "desktop/build/INAMSOS.exe" }

if (Test-Path $buildExe) {
    # Try to remove old one first with retries
    for ($i=0; $i -lt 5; $i++) {
        try {
            if (Test-Path "INAMSOS.exe") { Remove-Item "INAMSOS.exe" -Force -ErrorAction Stop }
            Move-Item -Path $buildExe -Destination "INAMSOS.exe" -Force -ErrorAction Stop
            Write-Host "Success! System Refreshed." -ForegroundColor Green
            Write-Host "Launching INAMSOS..." -ForegroundColor Cyan
            Start-Process ".\INAMSOS.exe"
            break
        } catch {
            Write-Host "File locked, retrying ($i)..." -ForegroundColor Magenta
            taskkill /F /IM INAMSOS.exe /T 2>$null
            Start-Sleep -s 2
        }
    }
} else {
    Write-Host "ERROR: Executable not found at $buildExe" -ForegroundColor Red
}
