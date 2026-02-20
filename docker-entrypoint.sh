#!/bin/sh
# Start script to run both Next.js frontend server and NestJS backend

# Set port for Next.js to 3000 (using PORT env var which Next.js reads)
export PORT=3000
export HOSTNAME="0.0.0.0"

# Start Next.js standalone server in background on port 3000
cd /app/frontend && node server.js &
NEXTJS_PID=$!

# Wait for Next.js to start
sleep 5

# Set backend port to 3001 (override the PORT that was set for Next.js)
export PORT=3001

# Run database migrations
npx prisma migrate deploy

# Start NestJS backend on port 3001
cd /app && exec node dist/main.js

# Clean up Next.js process on exit
trap "kill $NEXTJS_PID 2>/dev/null" EXIT

