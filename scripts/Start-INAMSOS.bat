@echo off
REM INAMSOS Launcher - Enterprise Edition
REM Launches the main application

if exist "INAMSOS_UPDATE.exe" (
    echo Updating Application...
    timeout /t 2 >nul
    move /Y "INAMSOS_UPDATE.exe" "INAMSOS.exe"
)

start "" "INAMSOS.exe"
exit
