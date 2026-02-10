@echo off
echo ========================================
echo   INAMSOS Tumor Registry
echo   Starting Application...
echo ========================================
echo.

cd /d "%~dp0"

REM Start the application
call Start-INAMSOS.bat

exit
