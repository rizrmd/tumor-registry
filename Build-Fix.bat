@echo off
echo Building Wails App (Generate Bindings + Build Frontend + Build Binary)...
REM Remove -s and -skipbindings to ensure full build
wails build -platform windows/amd64
if %errorlevel% neq 0 (
    echo Wails build failed!
    exit /b %errorlevel%
)

echo Copying binary...
copy "build\bin\INAMSOS.exe" "INAMSOS_NEW_64.exe" /y
echo Build Complete!
