#!/bin/sh
# Start script to run both Next.js frontend server and NestJS backend

# -------------------------------------------------------
# Port configuration
# Next.js listens on 3000 (Coolify's exposed port)
# NestJS backend listens on 3001 (internal only)
# We do NOT set PORT globally to avoid Coolify's mismatch
# warning — instead we pass it per-process.
# -------------------------------------------------------
export FRONTEND_PORT=3000
export BACKEND_PORT=3001
export HOSTNAME="0.0.0.0"
export BACKEND_URL="http://127.0.0.1:${BACKEND_PORT}"

# -------------------------------------------------------
# Database URL validation
# DATABASE_URL MUST be set via Coolify environment variables.
# It cannot be 127.0.0.1 inside the container.
# -------------------------------------------------------
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set. Please set it in Coolify's Environment Variables."
  echo "Example: DATABASE_URL=postgres://user:pass@host:port/dbname?schema=system"
  exit 1
fi

if echo "$DATABASE_URL" | grep -q "127.0.0.1"; then
  echo "ERROR: DATABASE_URL points to 127.0.0.1 which is unreachable inside the container."
  echo "Please update DATABASE_URL in Coolify's Environment Variables to a reachable host."
  exit 1
fi

echo "Using DATABASE_URL: $(echo $DATABASE_URL | sed 's/:.*@/:***@/')"

# -------------------------------------------------------
# Cleanup handler
# -------------------------------------------------------
cleanup() {
  echo "Shutting down..."
  kill $NEXTJS_PID 2>/dev/null
  exit 0
}
trap cleanup EXIT INT TERM

# -------------------------------------------------------
# Start Next.js standalone server on port 3000
# -------------------------------------------------------
echo "Starting Next.js frontend on port ${FRONTEND_PORT}..."
cd /app/frontend && PORT=${FRONTEND_PORT} node server.js &
NEXTJS_PID=$!

# Wait for Next.js to start
sleep 3

# -------------------------------------------------------
# Run database migrations
# -------------------------------------------------------
echo "Running database migrations..."
cd /app && npx prisma migrate deploy
if [ $? -ne 0 ]; then
  echo "WARNING: Database migration failed. The app will still start but may have schema issues."
fi

# -------------------------------------------------------
# Start NestJS backend on port 3001 (internal)
# -------------------------------------------------------
echo "Starting NestJS backend on port ${BACKEND_PORT}..."
cd /app && PORT=${BACKEND_PORT} exec node dist/main.js
