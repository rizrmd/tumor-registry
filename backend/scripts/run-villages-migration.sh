#!/bin/bash
#
# Villages Data Migration Script for Production
#
# This script executes the villages data migration on the production database.
# It can be run directly on the production server.
#
# Usage: ./scripts/run-villages-migration.sh
#

set -e  # Exit on any error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")"
MIGRATION_FILE="$BACKEND_DIR/prisma/migrations/20260314000000_add_villages_table/villages_data.sql"

print_status "Starting Villages Data Migration"
print_info "Migration file: $MIGRATION_FILE"

# Check if migration file exists
if [ ! -f "$MIGRATION_FILE" ]; then
    print_error "Migration file not found: $MIGRATION_FILE"
    exit 1
fi

# Check if running in Docker environment
if command -v docker &> /dev/null && docker ps | grep -q inamosos-postgres; then
    print_info "Docker production environment detected"

    # Check current count
    print_status "Checking current villages count..."
    CURRENT_COUNT=$(docker exec inamosos-postgres psql -U inamsos_user -d inamsos_prod -t -c "SELECT COUNT(*) FROM system.villages;" | tr -d ' ')
    print_info "Current villages count: $CURRENT_COUNT"

    if [ "$CURRENT_COUNT" -ge 84000 ]; then
        print_status "Villages table already populated ($CURRENT_COUNT records). Skipping migration."
        exit 0
    fi

    # Execute migration
    print_status "Executing villages migration (this may take 2-5 minutes)..."

    docker exec -i inamosos-postgres psql -U inamsos_user -d inamsos_prod < "$MIGRATION_FILE"

    # Verify
    NEW_COUNT=$(docker exec inamosos-postgres psql -U inamsos_user -d inamsos_prod -t -c "SELECT COUNT(*) FROM system.villages;" | tr -d ' ')
    print_status "Migration completed! Total villages: $NEW_COUNT"

    # Show sample for district 3301010
    print_info "Verifying district 3301010 (DAYEUHLUHUR):"
    docker exec inamosos-postgres psql -U inamsos_user -d inamsos_prod -c "SELECT code, name FROM system.villages WHERE \"districtCode\" = '3301010' ORDER BY code;"

else
    print_info "Local/development environment detected"

    # Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        print_warning "DATABASE_URL not set. Attempting to use .env file..."

        # Try to load from .env
        if [ -f "$BACKEND_DIR/.env" ]; then
            export DATABASE_URL=$(grep DATABASE_URL "$BACKEND_DIR/.env" | cut -d '=' -f2-)
        fi
    fi

    if [ -z "$DATABASE_URL" ]; then
        print_error "DATABASE_URL not set. Please set the environment variable or run this script on the production server."
        exit 1
    fi

    # Use bun script
    print_status "Running migration via bun..."
    cd "$BACKEND_DIR"
    bun run scripts/migrate-villages.ts
fi

print_status "Villages migration completed successfully!"
print_info ""
print_info "Next steps:"
print_info "1. Test the API: curl -H 'Authorization: Bearer <token>' https://inamsos.com/api/v1/regions/districts/3301010/villages"
print_info "2. Test frontend: https://inamsos.com/patients/new -> Identitas Pasien tab"
