@echo off
echo ========================================
echo   INAMSOS Updater - COMPLETE FIX
echo   Network Error Solution Applied
echo ========================================

REM Kill ALL related processes
taskkill /F /IM INAMSOS*.exe /T 2>nul
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM postgres.exe /T 2>nul
taskkill /F /IM pg_ctl.exe /T 2>nul

echo Waiting for processes to release files...
timeout /t 5 /nobreak >nul

REM Backup old version
if exist INAMSOS_64.exe (
    echo Backing up old version...
    del /F /Q INAMSOS_64.exe.bak 2>nul
    move /Y INAMSOS_64.exe INAMSOS_64.exe.bak >nul 2>&1
)

REM Install new version (check all possible names)
if exist INAMSOS_FIXED.exe (
    echo Installing FIXED version...
    move /Y INAMSOS_FIXED.exe INAMSOS_64.exe
    goto :start_app
)

if exist INAMSOS_NEW_64.exe (
    echo Installing NEW version...
    move /Y INAMSOS_NEW_64.exe INAMSOS_64.exe
    goto :start_app
)

if exist INAMSOS_V2.exe (
    echo Installing V2...
    move /Y INAMSOS_V2.exe INAMSOS_64.exe
    goto :start_app
)

if exist INAMSOS_V3.exe (
    echo Installing V3...
    move /Y INAMSOS_V3.exe INAMSOS_64.exe
    goto :start_app
)

echo [ERROR] No update file found!
pause
exit /b 1

:start_app
echo.
echo ========================================
echo   Update Successful!
echo ========================================
echo.
echo IMPORTANT NOTES:
echo - Startup takes 15-20 seconds (normal)
echo - Backend uses 127.0.0.1:3001
echo - Database timing fixed
echo.
echo Starting INAMSOS...
timeout /t 2 /nobreak >nul

if exist INAMSOS_64.exe (
    start INAMSOS_64.exe
    echo.
    echo Application started.
    echo Please wait patiently for login screen...
) else (
    echo [ERROR] Installation failed!
    pause
)

exit
