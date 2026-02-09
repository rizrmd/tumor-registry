#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PG_VERSION="15.10.0"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$SCRIPT_DIR/../bin"
TMP_DIR="$SCRIPT_DIR/tmp_pg"
OS_TYPE=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH_TYPE=$(uname -m)

# Print functions
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "🛠  Setting up PostgreSQL binaries..."
echo ""

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
        print_error "Unsupported OS: $OS_TYPE"
        exit 1
        ;;
esac

MAVEN_ARTIFACT="embedded-postgres-binaries-${MAVEN_OS}-${MAVEN_ARCH}"
URL="https://repo1.maven.org/maven2/io/zonky/test/postgres/${MAVEN_ARTIFACT}/${PG_VERSION}/${MAVEN_ARTIFACT}-${PG_VERSION}.jar"

echo "📥 OS: $OS_TYPE, ARCH: $ARCH_TYPE"
echo "📥 Artifact: $MAVEN_ARTIFACT"
echo "📥 PostgreSQL Version: $PG_VERSION"
echo "📥 Target Directory: $TARGET_DIR"
echo ""

# Check if already exists
if [[ "$OS_TYPE" == "windows" ]]; then
    if [ -f "$TARGET_DIR/bin/postgres.exe" ] && [ -f "$TARGET_DIR/bin/initdb.exe" ]; then
        print_success "PostgreSQL binaries already exist"
        exit 0
    fi
else
    if [ -f "$TARGET_DIR/bin/postgres" ] && [ -f "$TARGET_DIR/bin/initdb" ]; then
        print_success "PostgreSQL binaries already exist"
        exit 0
    fi
fi

# Clean up any previous temp directory
if [ -d "$TMP_DIR" ]; then
    print_status "Cleaning up previous temp directory..."
    rm -rf "$TMP_DIR"
fi

# Create directories
print_status "Creating directories..."
mkdir -p "$TARGET_DIR"
mkdir -p "$TMP_DIR"

# Download using curl
print_status "Downloading PostgreSQL $PG_VERSION artifact..."
print_status "URL: $URL"

if ! command -v curl &> /dev/null; then
    print_error "curl is not installed. Please install curl."
    exit 1
fi

if ! curl -L --fail --progress-bar "$URL" -o "$TMP_DIR/pg_artifact.jar"; then
    print_error "Failed to download PostgreSQL artifact"
    rm -rf "$TMP_DIR"
    exit 1
fi

print_success "Download complete"

# Extract from JAR
print_status "Extracting $INTERNAL_FILE from JAR..."
if ! unzip -o "$TMP_DIR/pg_artifact.jar" "$INTERNAL_FILE" -d "$TMP_DIR"; then
    print_error "Failed to extract $INTERNAL_FILE from JAR"
    rm -rf "$TMP_DIR"
    exit 1
fi

# Extract PostgreSQL binaries
print_status "Extracting PostgreSQL binaries..."
if ! tar -xJf "$TMP_DIR/$INTERNAL_FILE" -C "$TARGET_DIR"; then
    print_error "Failed to extract PostgreSQL binaries"
    rm -rf "$TMP_DIR"
    exit 1
fi

# Cleanup
print_status "Cleaning up temporary files..."
rm -rf "$TMP_DIR"

# Set permissions
print_status "Setting permissions..."
if [[ "$OS_TYPE" != "windows" ]]; then
    chmod -R +x "$TARGET_DIR/bin/"
fi

# Verify installation
print_status "Verifying installation..."
if [[ "$OS_TYPE" == "windows" ]]; then
    if [ ! -f "$TARGET_DIR/bin/postgres.exe" ] || [ ! -f "$TARGET_DIR/bin/initdb.exe" ]; then
        print_error "PostgreSQL binaries not found after extraction"
        exit 1
    fi
    print_success "PostgreSQL binaries verified"
    echo ""
    echo "📦 Installed binaries:"
    ls -lh "$TARGET_DIR/bin/postgres.exe" "$TARGET_DIR/bin/initdb.exe"
else
    if [ ! -f "$TARGET_DIR/bin/postgres" ] || [ ! -f "$TARGET_DIR/bin/initdb" ]; then
        print_error "PostgreSQL binaries not found after extraction"
        exit 1
    fi
    print_success "PostgreSQL binaries verified"
    echo ""
    echo "📦 Installed binaries:"
    ls -lh "$TARGET_DIR/bin/postgres" "$TARGET_DIR/bin/initdb"
fi

echo ""
print_success "PostgreSQL $PG_VERSION is ready in $TARGET_DIR"
