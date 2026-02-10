@echo off
echo Packaging Wails App with INAMSOS Assets...
wails build -platform windows/amd64 -skipbindings
if %errorlevel% neq 0 (
    echo Wails build failed!
    exit /b %errorlevel%
)

echo Copying binary...
copy "build\bin\INAMSOS.exe" "INAMSOS_NEW_64.exe" /y
echo Build Complete!

