@echo off
title INAMSOS Tumor Registry - Medical App (Launcher)
color 0f
cls

echo ======================================================================
echo   INAMSOS Tumor Registry App - Enterprise Edition (v1.3.5)
echo   Supports Windows 64-bit / 32-bit (Requires Postgres)
echo ======================================================================
echo.

echo [Step 1/3] Launching Frontend Interface (64-bit)...
start "" "INAMSOS_64.exe"

echo [Step 2/3] Connecting to Local Database System...
:WAIT_DB
timeout /t 2 /nobreak >nul
netstat -an | find "54321" >nul
if %errorlevel% neq 0 (
    echo    ... database initializing (Wait)...
    goto WAIT_DB
)
echo    [OK] Database Online on Port 54321.
echo.

echo [Step 3/3] Starting Backend Services...
cd backend
if not exist "start.js" (
    echo [ERROR] Backend Startup File (start.js) Not Found!
    echo         Please reinstall or check integrity.
    pause
    exit /b 1
)

:LOOP
cls
echo =================================================
echo   INAMSOS BACKEND SERVICE (Do Not Close)
echo =================================================
echo.
echo [%TIME%] Starting Application Logic...
node start.js
echo.
echo [WARNING] Backend Service Stopped unexpectedly.
echo          It will restart automatically in 5 seconds to maintain uptime.
timeout /t 5 >nul
goto LOOP
