@echo off
setlocal
echo ===================================================
echo   INAMSOS REPAIR UTILITY - AUTO FIX
echo ===================================================
echo.
echo 1. Installing Wails Build Tool...
echo    (If this fails, please ensure Go is installed)
go install github.com/wailsapp/wails/v2/cmd/wails@latest

:: Add common Go bin paths to PATH for this session
set PATH=%PATH%;%USERPROFILE%\go\bin
for /f "tokens=*" %%g in ('go env GOPATH') do set PATH=%PATH%;%%g\bin

echo.
echo 2. Preparing Backend...
cd backend
call npm install
call npx prisma generate
cd ..

echo.
echo 3. Syncing Frontend Assets...
node scripts/sync-frontend.js

echo.
echo 4. Building Desktop Application...
cd desktop
wails build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️ Build failed using 'wails' command.
    echo Trying with full path...
    "%USERPROFILE%\go\bin\wails.exe" build
)
cd ..

echo.
echo ===================================================
echo   STEP 5: DATABASE UPDATE (MIGRATION)
echo ===================================================
echo ⚠️  IMPORTANT INSTRUCTIONS:
echo 1. We will now open the new "INAMSOS" application.
echo 2. WAIT until the application window appears fully.
echo 3. THEN come back to this black window and PRESS ANY KEY to fix the database.
echo.
pause
echo Opening application...
start desktop\build\bin\INAMSOS.exe

echo.
echo Waiting for you to confirm app is running...
pause

echo.
echo Running Database Migration & Seed...
cd backend
:: Create temp .env for migration
echo DATABASE_URL="postgresql://postgres@127.0.0.1:54321/postgres?schema=system" > .env
call npx prisma migrate dev --name fix_pathology_missing
call npm run db:seed
:: Clean up temp .env (safe because Wails injects env vars)
del .env

echo.
echo ===================================================
echo   ALL DONE! REPAIR COMPLETE.
echo   You can now Login.
echo   Credentials: admin@inamsos.go.id / admin123
echo ===================================================
pause
