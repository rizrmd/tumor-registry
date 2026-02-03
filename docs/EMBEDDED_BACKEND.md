# Embedded Backend Build Process

## Overview
The desktop app will include:
- Backend source code
- Node.js runtime binaries (bundled)
- PostgreSQL binaries (bundled)
- npm dependencies installed on first run

## File Structure
```
desktop/
├── build/
│   └── bin/
│       ├── INAMSOS (macOS app)
│       ├── INAMSOS.exe (Windows)
│       └── INAMSOS (Linux)
└── resources/
    ├── backend/ (bundled source)
    │   ├── src/
    │   ├── prisma/
    │   ├── node_modules/ (NOT included - installed on first run)
    │   ├── package.json
    │   └── package-lock.json
    ├── node/ (bundled Node.js runtime)
    │   ├── darwin-arm64/bin/node
    │   ├── darwin-amd64/bin/node
    │   ├── linux-amd64/bin/node
    │   └── win-x64/node.exe
    └── postgres/ (bundled PostgreSQL)
        ├── darwin-arm64/bin/
        ├── linux-amd64/bin/
        └── win-x64/bin/
```

## Build Workflow Changes

1. Copy backend source to desktop/build/resources/backend
2. Download Node.js binaries for each platform
3. Download PostgreSQL binaries for each platform
4. Build Wails app (includes resources)
5. Sign and package

## First-Run Process

1. **Check Setup Status**
   - Detect if node_modules exists
   - Detect if database is initialized

2. **Install Dependencies** (if needed)
   - Run `npm install --production` in backend
   - Shows progress to user

3. **Start PostgreSQL**
   - Use bundled binaries
   - Initialize database if needed

4. **Run Migrations**
   - `prisma generate`
   - `prisma migrate deploy`

5. **Start Backend**
   - Use Node.js runtime
   - Wait for server to be ready
