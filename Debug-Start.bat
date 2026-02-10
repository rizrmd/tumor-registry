@echo off
echo ========================================
echo   INAMSOS Debug Launcher
echo   Starting components manually...
echo ========================================

REM Kill existing processes
taskkill /F /IM INAMSOS.exe /T 2>nul
taskkill /F /IM INAMSOS_64.exe /T 2>nul
taskkill /F /IM INAMSOS_32.exe /T 2>nul
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM postgres.exe /T 2>nul

echo.
echo [1/3] Starting Database...
cd "d:\Project\Tumor Registry\INAMSOS Application Desktop\database\pgsql\bin"
pg_ctl start -D "../../data" -l "../../postgres.log" -o "-p 54321"

if %errorlevel% neq 0 (
    echo [ERROR] Failed to start database!
    type "../../postgres.log"
    pause
    exit /b
)

echo.
echo [2/3] Starting Backend (Watch for errors!)...
cd "d:\Project\Tumor Registry\INAMSOS Application Desktop\backend"
set PORT=3001
set DATABASE_URL=postgresql://postgres:postgres@localhost:54321/inamsos
set DATABASE_PORT=54321

start "INAMSOS Backend" cmd /k "node start.js"

echo.
echo [3/3] Backend started in separate window.
echo       Now launch the application manually.
echo.
pause
start "" "..\INAMSOS_64.exe"
