@echo off
echo ========================================
echo   INAMSOS Updater - Final Fix
echo   Fixing Network Error & Login Issues
echo ========================================

REM Kill existing processes vigorously
taskkill /F /IM INAMSOS.exe /T 2>nul
taskkill /F /IM INAMSOS_64.exe /T 2>nul
taskkill /F /IM INAMSOS_NEW_64.exe /T 2>nul
taskkill /F /IM INAMSOS_V2.exe /T 2>nul
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM postgres.exe /T 2>nul
taskkill /F /IM pg_ctl.exe /T 2>nul

echo Waiting for processes to fully release files...
timeout /t 5 /nobreak >nul

REM Delete old executables
if exist INAMSOS_64.exe del INAMSOS_64.exe
if exist INAMSOS_32.exe del INAMSOS_32.exe

REM Rename new executables
if exist INAMSOS_V2.exe (
    echo Installing fixed version (V2)...
    ren INAMSOS_V2.exe INAMSOS_64.exe
) else (
    if exist INAMSOS_NEW_64.exe (
        echo Installing fixed version (Standard)...
        ren INAMSOS_NEW_64.exe INAMSOS_64.exe
    )
)

echo.
echo Application Updated Successfully!
echo Starting INAMSOS...
echo.

if exist INAMSOS_64.exe (
    start INAMSOS_64.exe
) else (
    echo [ERROR] Updated executable missing!
    pause
)

exit
