#!/bin/sh
# Start script to run both Next.js frontend server and NestJS backend

# Set main port for Next.js to 3000 (matches Coolify's Exposed Port)
export PORT=3000
export HOSTNAME="0.0.0.0"

# Set internal backend port and URL for Next.js proxying
export BACKEND_PORT=3001
export BACKEND_URL="http://127.0.0.1:3001"

# Start Next.js standalone server in background on port 3000
echo "Starting Next.js frontend on port $PORT..."
cd /app/frontend && node server.js &
NEXTJS_PID=$!

# Wait for Next.js to start
sleep 5

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start NestJS backend on BACKEND_PORT
# We keep the global PORT=3000 to satisfy Coolify's environment check
echo "Starting NestJS backend on port $BACKEND_PORT..."
cd /app && exec node dist/main.js

# Clean up Next.js process on exit
trap "kill $NEXTJS_PID 2>/dev/null" EXIT
