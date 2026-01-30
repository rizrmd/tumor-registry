#!/bin/bash
set -e

# Configuration
PG_VERSION="15.10.0"
TARGET_DIR=$(pwd)/../bin
TMP_DIR=$(pwd)/tmp_pg
OS_TYPE=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH_TYPE=$(uname -m)

echo "🛠  Setting up INAMSOS sidecar binaries..."

if [[ "$OS_TYPE" != "darwin" ]]; then
    echo "⚠️  This script is currently optimized for macOS. Manual setup may be required for $OS_TYPE."
    exit 1
fi

# Map architecture names
if [[ "$ARCH_TYPE" == "arm64" ]]; then
    MAVEN_ARCH="darwin-arm64v8"
    INTERNAL_FILE="postgres-darwin-arm_64.txz"
else
    MAVEN_ARCH="darwin-amd64"
    INTERNAL_FILE="postgres-darwin-x86_64.txz"
fi

URL="https://repo1.maven.org/maven2/io/zonky/test/postgres/embedded-postgres-binaries-$MAVEN_ARCH/$PG_VERSION/embedded-postgres-binaries-$MAVEN_ARCH-$PG_VERSION.jar"

echo "📥 OS: $OS_TYPE, ARCH: $ARCH_TYPE"
echo "📥 Downloading PostgreSQL $PG_VERSION artifact..."

rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"
mkdir -p "$TMP_DIR"

# Download using curl
curl -L "$URL" -o "$TMP_DIR/pg_artifact.jar"

echo "📦 Extracting $INTERNAL_FILE from JAR..."
unzip -o "$TMP_DIR/pg_artifact.jar" "$INTERNAL_FILE" -d "$TMP_DIR"

echo "📦 Extracting full structure into bin/..."
tar -xJf "$TMP_DIR/$INTERNAL_FILE" -C "$TARGET_DIR"

# Cleanup
rm -rf "$TMP_DIR"

echo "🔒 Setting permissions..."
# Recursively set +x on everything in bin subfolder
chmod -R +x "$TARGET_DIR/bin/"

echo "✅ Success! Full PostgreSQL structure is ready in $TARGET_DIR"
echo "👉 Binaries are in $TARGET_DIR/bin/"
ls -lh "$TARGET_DIR/bin/postgres" "$TARGET_DIR/bin/initdb"
