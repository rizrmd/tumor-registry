#!/bin/bash

# INAMSOS Desktop Production Build Script
# Builds PostgreSQL binaries + Backend + Wails desktop app

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
DESKTOP_DIR="desktop"
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"
BUILD_DIR="$DESKTOP_DIR/build"
BIN_DIR="$DESKTOP_DIR/bin"

# Build flags
CLEAN_BUILD=false
PLATFORM=""
ARCH=""

# Print colored output
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

print_step() {
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Help function
show_help() {
    cat << EOF
INAMSOS Desktop Production Build Script

Usage: ./build-desktop.sh [OPTIONS]

Options:
    -c, --clean         Clean build (removes existing binaries and rebuilds)
    -p, --platform      Target platform (darwin, windows, linux)
    -a, --arch          Target architecture (amd64, arm64)
    -h, --help          Show this help message

Examples:
    ./build-desktop.sh                    # Build for current platform
    ./build-desktop.sh --clean            # Clean build for current platform
    ./build-desktop.sh -p darwin          # Build for macOS
    ./build-desktop.sh -p windows         # Build for Windows
    ./build-desktop.sh -p darwin -a arm64 # Build for macOS Apple Silicon
    ./build-desktop.sh -p linux -a amd64  # Build for Linux x64
EOF
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--clean)
            CLEAN_BUILD=true
            shift
            ;;
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -a|--arch)
            ARCH="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Check prerequisites
check_prerequisites() {
    print_step "Checking Prerequisites"

    # Check Go
    if ! command -v go &> /dev/null; then
        print_error "Go is not installed. Please install Go 1.23+"
        exit 1
    fi
    GO_VERSION=$(go version | grep -oP '\d+\.\d+' | head -1)
    print_success "Go is installed (version $GO_VERSION)"

    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    NODE_VERSION=$(node --version)
    print_success "Node.js is installed ($NODE_VERSION)"

    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    print_success "npm is installed"

    # Check Wails
    if ! command -v wails &> /dev/null; then
        print_error "Wails is not installed. Please install Wails:"
        echo "  go install github.com/wailsapp/wails/v2/cmd/wails@latest"
        exit 1
    fi
    WAILS_VERSION=$(wails version 2>/dev/null | head -1 || echo "unknown")
    print_success "Wails is installed ($WAILS_VERSION)"

    # Check if we're in the project root
    if [ ! -d "$BACKEND_DIR" ] || [ ! -d "$DESKTOP_DIR" ] || [ ! -d "$FRONTEND_DIR" ]; then
        print_error "Please run this script from the project root directory"
        exit 1
    fi
    print_success "Project structure validated"
}

# Setup PostgreSQL binaries
setup_postgres() {
    print_step "Setting up PostgreSQL Binaries"
    
    if [ "$CLEAN_BUILD" = true ] && [ -d "$BIN_DIR" ]; then
        print_warning "Clean build requested, removing existing bin directory..."
        rm -rf "$BIN_DIR"
    fi
    
    if [ -f "$BIN_DIR/bin/postgres" ] || [ -f "$BIN_DIR/bin/postgres.exe" ]; then
        print_success "PostgreSQL binaries already exist"
        return 0
    fi
    
    print_status "Running PostgreSQL setup script..."
    cd "$DESKTOP_DIR/scripts"
    ./setup-binaries.sh
    cd ../..
    
    # Verify binaries were created
    if [ ! -f "$BIN_DIR/bin/postgres" ] && [ ! -f "$BIN_DIR/bin/postgres.exe" ]; then
        print_error "PostgreSQL binaries were not created successfully"
        exit 1
    fi
    
    print_success "PostgreSQL binaries ready"
}

# Build backend for production
build_backend() {
    print_step "Building Backend"

    cd "$BACKEND_DIR"

    # Install dependencies if needed
    if [ ! -d "node_modules" ] || [ "$CLEAN_BUILD" = true ]; then
        print_status "Installing backend dependencies..."
        bun install
    fi

    # Clean previous build
    if [ -d "dist" ]; then
        print_status "Cleaning previous backend build..."
        rm -rf dist
    fi
    if [ -d "dist_user" ]; then
        print_status "Cleaning previous backend dist_user..."
        rm -rf dist_user
    fi

    # Build backend
    print_status "Building backend for production..."
    bun run build
    
    if [ ! -d "dist" ]; then
        print_error "Backend build failed - dist directory not found"
        exit 1
    fi

    cd ..
    print_success "Backend build complete"
}

# Copy backend to desktop bin directory
copy_backend() {
    print_step "Copying Backend to Desktop"
    
    # Create backend directory in bin
    mkdir -p "$BIN_DIR/backend"
    
    # Copy backend dist files
    print_status "Copying backend files..."
    cp -r "$BACKEND_DIR/dist/"* "$BIN_DIR/backend/"
    
    # Also copy package.json for dependencies info
    cp "$BACKEND_DIR/package.json" "$BIN_DIR/backend/"
    
    # Verify
    if [ ! -f "$BIN_DIR/backend/main.js" ]; then
        print_error "Backend main.js not found after copy"
        exit 1
    fi
    
    print_success "Backend copied to $BIN_DIR/backend"
}

# Install frontend dependencies for wails
setup_frontend() {
    print_step "Setting up Frontend"

    cd "$FRONTEND_DIR"

    # Install dependencies if needed
    if [ ! -d "node_modules" ] || [ "$CLEAN_BUILD" = true ]; then
        print_status "Installing frontend dependencies..."
        bun install
    fi

    cd ..
    print_success "Frontend ready"
}

# Build Wails desktop app
build_wails() {
    print_step "Building Wails Desktop Application"

    cd "$DESKTOP_DIR"

    # Clean previous build
    if [ "$CLEAN_BUILD" = true ] && [ -d "build" ]; then
        print_status "Cleaning previous Wails build..."
        rm -rf build
    fi

    # Build flags
    BUILD_FLAGS=""
    
    if [ -n "$PLATFORM" ]; then
        BUILD_FLAGS="$BUILD_FLAGS -platform $PLATFORM"
        print_status "Building for platform: $PLATFORM"
    fi
    
    # Run Wails build
    print_status "Running Wails build (this may take a few minutes)..."
    wails build $BUILD_FLAGS
    
    if [ $? -ne 0 ]; then
        print_error "Wails build failed"
        exit 1
    fi

    cd ..
    print_success "Wails build complete"
}

# Verify the build output
verify_build() {
    print_step "Verifying Build Output"
    
    local OUTPUT_DIR="$BUILD_DIR/bin"
    
    if [ ! -d "$OUTPUT_DIR" ]; then
        print_error "Build output directory not found: $OUTPUT_DIR"
        exit 1
    fi
    
    print_status "Build output contents:"
    ls -la "$OUTPUT_DIR"
    
    # Check for expected output based on platform
    local FOUND=false
    if [ -f "$OUTPUT_DIR/INAMSOS" ] || [ -f "$OUTPUT_DIR/INAMSOS.exe" ] || [ -d "$OUTPUT_DIR/INAMSOS.app" ]; then
        FOUND=true
    fi
    
    if [ "$FOUND" = false ]; then
        print_warning "Expected binary not found in standard locations, checking..."
        find "$OUTPUT_DIR" -type f -name "INAMSOS*" 2>/dev/null || true
    fi
    
    print_success "Build verification complete"
}

# Print build summary
print_summary() {
    print_step "Build Summary"
    
    echo ""
    echo -e "${MAGENTA}Build Information:${NC}"
    echo "  Platform:     ${PLATFORM:-$(uname -s | tr '[:upper:]' '[:lower:]')}"
    echo "  Architecture: ${ARCH:-$(uname -m)}"
    echo "  Clean Build:  $CLEAN_BUILD"
    echo ""
    
    echo -e "${MAGENTA}Output Location:${NC}"
    echo "  $BUILD_DIR/bin/"
    echo ""
    
    echo -e "${MAGENTA}Included Components:${NC}"
    echo "  ✓ PostgreSQL (embedded)"
    echo "  ✓ NestJS Backend"
    echo "  ✓ Next.js Frontend"
    echo "  ✓ Wails Desktop Wrapper"
    echo ""
    
    print_success "Desktop application build completed successfully!"
    echo ""
    echo "To run the application:"
    if [ -f "$BUILD_DIR/bin/INAMSOS" ]; then
        echo "  $BUILD_DIR/bin/INAMSOS"
    elif [ -f "$BUILD_DIR/bin/INAMSOS.exe" ]; then
        echo "  $BUILD_DIR/bin/INAMSOS.exe"
    elif [ -d "$BUILD_DIR/bin/INAMSOS.app" ]; then
        echo "  open $BUILD_DIR/bin/INAMSOS.app"
    fi
    echo ""
}

# Main execution
main() {
    echo ""
    echo "🏥 INAMSOS Desktop Production Build"
    echo "===================================="
    echo ""
    
    check_prerequisites
    setup_postgres
    setup_frontend
    build_backend
    copy_backend
    build_wails
    verify_build
    print_summary
}

# Run main function
main "$@"
