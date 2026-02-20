# Production Dockerfile for INAMSOS (Unified Frontend + Backend + Nginx)
# Multi-stage build: Frontend → Backend → Production
# Note: Backend must be built locally first with `cd backend && npm run build`

# ============================================
# Stage 1: Build Frontend (Next.js)
# ============================================
FROM node:18-alpine AS frontend-builder

# Install build dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /frontend

# Copy frontend package files
COPY frontend/package*.json ./
COPY frontend/tsconfig.json ./

# Install frontend dependencies
RUN npm ci && npm cache clean --force

# Ensure devDependencies are installed for build
RUN npm install --include=dev

# Copy frontend source
COPY frontend/ ./

# Build arguments for frontend
ARG NEXT_PUBLIC_API_URL=https://inamsos.medxamion.com/api/v1
ARG NEXT_PUBLIC_APP_NAME=INAMSOS
ARG NEXT_PUBLIC_VERSION=1.0.0
ARG NODE_ENV=production

# Set environment variables for build
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application (NODE_ENV set only for build time)
RUN npm run build

# ============================================
# Stage 2: Build Backend Dependencies
# ============================================
FROM node:18-alpine AS backend-deps

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    curl

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./
COPY backend/prisma ./prisma/

# Install and rebuild native modules for Alpine
RUN npm install --include=dev --legacy-peer-deps && npm cache clean --force

# Generate Prisma client with correct binary targets
RUN npx prisma generate --no-hints

# Copy backend source and build
COPY backend/tsconfig.json ./
COPY backend/nest-cli.json ./
COPY backend/src ./src

# Build backend
RUN npm run build

# ============================================
# Stage 3: Production Image
# ============================================
FROM node:18-alpine AS production

# Build arguments
ARG NODE_ENV=production
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=1.0.0

# Metadata labels
LABEL maintainer="INAMSOS Team <admin@medxamion.com>" \
    org.label-schema.build-date=$BUILD_DATE \
    org.label-schema.vcs-ref=$VCS_REF \
    org.label-schema.version=$VERSION \
    org.label-schema.schema-version="1.0" \
    org.label-schema.name="inamsos" \
    org.label-schema.description="INAMSOS Tumor Registry - Unified Frontend + Backend + Nginx" \
    org.label-schema.url="https://inamsos.medxamion.com"

# Install runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    curl \
    tzdata \
    ca-certificates \
    openssl \
    && rm -rf /var/cache/apk/*

# Set timezone
ENV TZ=Asia/Jakarta

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Create required directories
RUN mkdir -p /tmp && \
    chown -R nodejs:nodejs /tmp

# Set working directory
WORKDIR /app

# Copy node_modules with native modules from backend-deps
COPY --from=backend-deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=backend-deps --chown=nodejs:nodejs /app/prisma ./prisma

# Copy backend package files and built source
COPY --chown=nodejs:nodejs backend/package*.json ./
COPY --from=backend-deps --chown=nodejs:nodejs /app/dist_user ./dist
COPY --chown=nodejs:nodejs backend/src ./src

# Copy Next.js standalone build
COPY --from=frontend-builder --chown=nodejs:nodejs /frontend/.next/standalone ./frontend
COPY --from=frontend-builder --chown=nodejs:nodejs /frontend/.next/static ./frontend/.next/static

# Copy entrypoint script
COPY --chown=nodejs:nodejs docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create required directories
RUN mkdir -p /var/lib/inamsos/{uploads,backups,logs,temp} \
    /var/log/inamsos && \
    chown -R nodejs:nodejs /var/lib/inamsos /var/log/inamsos /app

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    PATH="/app:/usr/local/bin:$PATH"

# Expose ports
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Switch to non-root user
USER nodejs

# Use dumb-init as PID 1 with entrypoint script
ENTRYPOINT ["dumb-init", "--", "/app/docker-entrypoint.sh"]
