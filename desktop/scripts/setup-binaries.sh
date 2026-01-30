#!/bin/bash
set -e

# Configuration
PG_VERSION="15.10.0"
TARGET_DIR=$(pwd)/../bin
TMP_DIR=$(pwd)/tmp_pg
OS_TYPE=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH_TYPE=$(uname -m)

echo "🛠  Setting up sidecar binaries..."

# Determine Platform for Maven
case "$OS_TYPE" in
    darwin*)
        MAVEN_OS="darwin"
        if [[ "$ARCH_TYPE" == "arm64" ]]; then
            MAVEN_ARCH="arm64v8"
            INTERNAL_FILE="postgres-darwin-arm_64.txz"
        else
            MAVEN_ARCH="amd64"
            INTERNAL_FILE="postgres-darwin-x86_64.txz"
        fi
        ;;
    linux*)
        MAVEN_OS="linux"
        if [[ "$ARCH_TYPE" == "aarch64" || "$ARCH_TYPE" == "arm64" ]]; then
            MAVEN_ARCH="arm64v8"
            INTERNAL_FILE="postgres-linux-arm_64.txz"
        else
            MAVEN_ARCH="amd64"
            INTERNAL_FILE="postgres-linux-x86_64.txz"
        fi
        ;;
    msys*|cygwin*|mingw*)
        MAVEN_OS="windows"
        MAVEN_ARCH="amd64"
        INTERNAL_FILE="postgres-windows-x86_64.txz"
        OS_TYPE="windows"
        ;;
    *)
        echo "❌ Unsupported OS: $OS_TYPE"
        exit 1
        ;;
esac

MAVEN_ARTIFACT="embedded-postgres-binaries-${MAVEN_OS}-${MAVEN_ARCH}"
URL="https://repo1.maven.org/maven2/io/zonky/test/postgres/${MAVEN_ARTIFACT}/${PG_VERSION}/${MAVEN_ARTIFACT}-${PG_VERSION}.jar"

echo "📥 OS: $OS_TYPE, ARCH: $ARCH_TYPE"
echo "📥 Artifact: $MAVEN_ARTIFACT"
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
if [[ "$OS_TYPE" != "windows" ]]; then
    chmod -R +x "$TARGET_DIR/bin/"
fi

echo "✅ Success! Full PostgreSQL structure is ready in $TARGET_DIR"
echo "👉 Binaries are in $TARGET_DIR/bin/"
if [[ "$OS_TYPE" == "windows" ]]; then
    ls -lh "$TARGET_DIR/bin/postgres.exe" "$TARGET_DIR/bin/initdb.exe"
else
    ls -lh "$TARGET_DIR/bin/postgres" "$TARGET_DIR/bin/initdb"
fi
