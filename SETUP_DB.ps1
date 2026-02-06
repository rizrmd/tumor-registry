$ErrorActionPreference = "Stop"
$Url = "https://repo1.maven.org/maven2/io/zonky/test/postgres/embedded-postgres-binaries-windows-amd64/15.10.0/embedded-postgres-binaries-windows-amd64-15.10.0.jar"
$JarFile = "pg.zip"
$TxzFile = "postgres-windows-x86_64.txz"

Write-Host "Downloading Postgres..."
Invoke-WebRequest -Uri $Url -OutFile $JarFile

Write-Host "Extracting JAR..."
Expand-Archive -Path $JarFile -DestinationPath . -Force

Write-Host "Extracting TXZ..."
tar -xf $TxzFile

Write-Host "Preparing Desktop Bin Directory..."
if (!(Test-Path "desktop\bin")) { New-Item -ItemType Directory -Path "desktop\bin" }
# Move contents of 'bin' extracted from tar to desktop/bin/bin (nested as per manager code expectation?)
# bash script: tar -C TARGET_DIR. TARGET_DIR=desktop/bin.
# Result: desktop/bin/bin/postgres.exe
# Manager code: filepath.Join(appDataDir, "bin", "bin") -> desktop/build/bin/bin/bin ??
# Let's inspect manager.go exactly.
# manager.go: BinDir = filepath.Join(appDataDir, "bin", "bin")
# if appDataDir = desktop/build/bin
# BinDir = desktop/build/bin/bin/bin.

# If we put binaries in desktop/build/bin/bin.
# Then postgres is at desktop/build/bin/bin/bin/postgres.exe ??
# Wait, manager.go says: postgresBin := filepath.Join(m.BinDir, "postgres")
# So we need postgres.exe INSIDE BinDir.

# So we need: desktop/build/bin/bin/bin/postgres.exe.
# Let's try to match that structure.
# But "bin/bin" sounds like "bin folder, inside that bin folder".

Write-Host "Copying to Application Directory..."
# We have ./bin from tar.
# We want to put it where INAMSOS.exe can find it.
# INAMSOS.exe is in desktop/build/bin.
# It looks for "bin/bin".
# So we create desktop/build/bin/bin/bin.

$TargetBase = "desktop\build\bin\bin\bin"
New-Item -ItemType Directory -Force -Path $TargetBase

Copy-Item -Path "bin\*" -Destination $TargetBase -Recurse -Force

Write-Host "Cleanup..."
Remove-Item $JarFile -Force
Remove-Item $TxzFile -Force
Remove-Item -Recurse -Force "bin"
Remove-Item -Recurse -Force "META-INF"

Write-Host "Database Binary Setup Complete!"
