#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
VERSION="${VERSION:-latest}"
IMAGE_NAME="inamsos:${VERSION}"

# Network
NETWORK_NAME="inamsos-network"

# Volumes
VOLUMES=(
    "inamsos-uploads"
    "inamsos-logs"
)

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}INAMSOS Production Deployment${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Version: ${VERSION}"
echo "Image: ${IMAGE_NAME}"
echo "Domain: inamsos.medxamion.com"
echo ""

# Function to check if container exists
container_exists() {
    docker ps -a --format '{{.Names}}' | grep -q "^$1$"
}

# Function to check if volume exists
volume_exists() {
    docker volume ls --format '{{.Name}}' | grep -q "^$1$"
}

# Function to check if network exists
network_exists() {
    docker network ls --format '{{.Name}}' | grep -q "^$1$"
}

# Create network if it doesn't exist
if ! network_exists "$NETWORK_NAME"; then
    echo -e "${YELLOW}Creating network: ${NETWORK_NAME}${NC}"
    docker network create "$NETWORK_NAME"
else
    echo -e "${GREEN}✓ Network exists: ${NETWORK_NAME}${NC}"
fi

# Create volumes if they don't exist
for volume in "${VOLUMES[@]}"; do
    if ! volume_exists "$volume"; then
        echo -e "${YELLOW}Creating volume: ${volume}${NC}"
        docker volume create "$volume"
    else
        echo -e "${GREEN}✓ Volume exists: ${volume}${NC}"
    fi
done

echo ""
echo -e "${BLUE}Deploying INAMSOS...${NC}"

# Check if container exists
if container_exists "inamsos"; then
    echo -e "${YELLOW}Stopping and removing existing container...${NC}"
    docker stop inamsos 2>/dev/null || true
    docker rm inamsos 2>/dev/null || true
fi

# Run container
echo -e "${YELLOW}Starting container...${NC}"
docker run -d \
    --name inamsos \
    --network host \
    -v inamsos-uploads:/var/lib/inamsos/uploads \
    -v inamsos-logs:/var/log/inamsos \
    --env-file backend/.env.production \
    --restart always \
    --health-cmd "curl -f http://localhost:3000/ || exit 1" \
    --health-interval 30s \
    --health-timeout 10s \
    --health-retries 3 \
    --health-start-period 90s \
    "$IMAGE_NAME"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Container started successfully${NC}"
else
    echo -e "${RED}✗ Failed to start container${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Container:"
echo -e "  ${GREEN}inamsos${NC} (port 3001)"
echo ""
echo "Application:"
echo "  Frontend + Backend: ${GREEN}http://localhost:3001${NC}"
echo "  API: ${GREEN}http://localhost:3001/api/v1${NC}"
echo "  Health: ${GREEN}http://localhost:3001/api/v1/health${NC}"
echo ""
echo "To view logs:"
echo "  docker logs -f inamsos"
echo ""
echo "To check status:"
echo "  docker ps"
echo "  docker inspect inamsos --format='{{.State.Health.Status}}'"
echo ""
echo "To stop:"
echo "  docker stop inamsos"
echo ""
echo "To restart:"
echo "  docker restart inamsos"
echo ""
echo "Production URL:"
echo -e "  ${GREEN}https://inamsos.medxamion.com${NC}"
echo ""
