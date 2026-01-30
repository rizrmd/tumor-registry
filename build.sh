#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="inamsos"
VERSION="${VERSION:-latest}"
BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
VCS_REF="$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"

# Default values
NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://inamsos.medxamion.com/api/v1}"
NEXT_PUBLIC_APP_NAME="${NEXT_PUBLIC_APP_NAME:-INAMSOS}"
NEXT_PUBLIC_VERSION="${VERSION:-1.0.0}"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Building INAMSOS Docker Image${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Image: ${IMAGE_NAME}"
echo "Version: ${VERSION}"
echo "Build Date: ${BUILD_DATE}"
echo "Git Ref: ${VCS_REF}"
echo ""

# Check if backend .env.production exists
if [ ! -f "backend/.env.production" ]; then
    echo -e "${RED}Error: backend/.env.production file not found${NC}"
    echo "Please create backend/.env.production file before building"
    exit 1
fi

# Build arguments
BUILD_ARGS="
    --build-arg NODE_ENV=production
    --build-arg BUILD_DATE=${BUILD_DATE}
    --build-arg VCS_REF=${VCS_REF}
    --build-arg VERSION=${VERSION}
    --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
    --build-arg NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
    --build-arg NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}
"

# Build the image
echo -e "${YELLOW}Building Docker image...${NC}"
echo "This may take several minutes..."
echo ""

docker build \
    ${BUILD_ARGS} \
    -f Dockerfile \
    -t ${IMAGE_NAME}:${VERSION} \
    -t ${IMAGE_NAME}:latest \
    .

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Build completed successfully!${NC}"
    echo ""
    echo "Images created:"
    echo "  - ${IMAGE_NAME}:${VERSION}"
    echo "  - ${IMAGE_NAME}:latest"
    echo ""
    echo "Image size:"
    docker images ${IMAGE_NAME}:${VERSION} --format "  {{.Repository}}:{{.Tag}} - {{.Size}}"
    echo ""
    echo "To run the container:"
    echo "  docker run -d --name inamsos \\"
    echo "    -p 3001:3001 \\"
    echo "    -v inamsos-uploads:/var/lib/inamsos/uploads \\"
    echo "    -v inamsos-logs:/var/log/inamsos \\"
    echo "    --env-file backend/.env.production \\"
    echo "    --restart always \\"
    echo "    ${IMAGE_NAME}:${VERSION}"
else
    echo ""
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
