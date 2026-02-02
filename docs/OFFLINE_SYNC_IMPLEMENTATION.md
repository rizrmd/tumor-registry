# Offline Sync Implementation Summary

## Overview
This document summarizes the comprehensive offline sync implementation for the INAMSOS desktop application.

## Changes Made

### 1. Backend - Offline Queue Service (`backend/src/modules/offline-queue/`)

#### `offline-queue.service.ts`
- **Expanded tracked entities** from 5 to **80+ entities** across 11 phases
- **Implemented phased sync** to respect database dependencies:
  - Phase 1: Core System (centers, roles, permissions, WHO classifications)
  - Phase 2: User & Auth (users, roles, permissions)
  - Phase 3: Patient Core (patients, medical record sequences)
  - Phase 4: Medical Data (diagnoses, medications, lab results, imaging, etc.)
  - Phase 5: Research (research requests, collaborations, publications)
  - Phase 6: Analytics (statistics, trends, intelligence)
  - Phase 7: Reporting (templates, scheduled reports)
  - Phase 8: Quality & Review (case reviews, peer reviews)
  - Phase 9: Notifications (templates, preferences)
  - Phase 10: Audit & Security (logs, events)
  - Phase 11: System Admin (backups, tasks, integrations)

- **Added methods** for each entity type in `fetchRemoteChanges()` and `upsertLocal()`
- **Integrated file sync** into the full sync workflow

#### `file-sync.service.ts` (NEW)
- Handles synchronization of file attachments:
  - Medical images (DICOM, JPEG, PNG)
  - Clinical photos
  - Pathology reports
  - Documents
- **In-memory queue** - No database table needed
- Features:
  - File integrity checking (SHA-256 checksums)
  - Progress tracking
  - Retry mechanism with exponential backoff
  - Automatic cleanup of old completed jobs

#### `offline-queue.controller.ts`
- Added file sync endpoints:
  - `GET /offline-queue/files/status` - Get file sync statistics
  - `POST /offline-queue/files/sync` - Trigger file sync
  - `GET /offline-queue/files/pending` - List pending file syncs
  - `POST /offline-queue/full-sync` - Run complete data + file sync

#### `offline-queue.module.ts`
- Added `FileSyncService` and `RemotePrismaService` to providers

### 2. Backend - Authentication (`backend/src/modules/auth/`)

#### `auth.service.ts`
- **Added password version tracking** using `updatedAt` timestamp
- JWT payload now includes `passwordVersion` field
- **Added `validateToken()`** method to check if password changed since token issuance
- When password changes, all existing tokens are invalidated

### 3. Frontend - Authentication (`frontend/src/contexts/`)

#### `AuthContext.tsx`
- **Added password version storage** in localStorage (`passwordVersion` key)
- **Added `checkPasswordVersion()`** function:
  - Compares stored password version with server
  - Forces logout if password changed on server
  - Gracefully handles offline mode (allows access when offline)
- **Added periodic password checks**:
  - Every 2 minutes when online
  - When connection is restored (window `online` event)
- **Updated login/logout** to manage password version

## ⚠️ Important: No Database Migration Required

**This implementation does NOT require database migration.**

The sync system uses:
- **Existing database tables** - All data sync uses existing tables
- **In-memory queue for files** - File sync jobs stored in memory (Map), not database
- **Existing fields for file paths** - Uses `fileUrl` and `filePath` already in schema

## Sync Flow

### Full Sync Process
```
1. Push Local Changes (syncAllPendingItems)
   └─ Upload queued mutations to remote server

2. Pull Remote Changes (syncRemoteChanges)
   ├─ Phase 1: Core System
   ├─ Phase 2: User & Auth  
   ├─ Phase 3: Patient Core
   ├─ Phase 4: Medical Data
   ├─ Phase 5: Research
   ├─ Phase 6: Analytics
   ├─ Phase 7: Reporting
   ├─ Phase 8: Quality & Review
   ├─ Phase 9: Notifications
   ├─ Phase 10: Audit & Security
   └─ Phase 11: System Admin

3. File Sync (syncFiles)
   ├─ Queue new files for upload (in-memory)
   ├─ Process pending file uploads
   └─ Update remote file paths
```

### Password Change Detection Flow
```
1. User logs in
   └─ Store passwordVersion (updatedAt timestamp) in localStorage

2. Periodic check (every 2 min when online)
   ├─ Fetch current user from server
   ├─ Compare passwordVersion with stored value
   └─ If different → force logout

3. Connection restored
   └─ Immediately check password version

4. Token refresh
   └─ If password changed, server returns 401
   └─ Force logout
```

## API Endpoints

### Data Sync
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/offline-queue/sync` | Queue data for sync |
| GET | `/offline-queue/pending` | Get pending data items |
| GET | `/offline-queue/statistics` | Get sync statistics |
| POST | `/offline-queue/sync-all` | Trigger full data sync |
| PUT | `/offline-queue/:id/retry` | Retry failed item |
| PUT | `/offline-queue/:id/resolve-conflict` | Resolve sync conflict |

### File Sync
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/offline-queue/files/status` | Get file sync stats |
| POST | `/offline-queue/files/sync` | Trigger file sync |
| GET | `/offline-queue/files/pending` | Get pending file jobs |
| POST | `/offline-queue/full-sync` | Run complete sync |

## Configuration

### Environment Variables
```bash
# Database URLs
DATABASE_URL=postgresql://postgres@127.0.0.1:54321/postgres  # Local
DATABASE_URL=postgresql://...remote-server...  # Remote (no changes needed)

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=104857600  # 100MB

# Sync Settings
SYNC_INTERVAL=300000     # 5 minutes (data)
FILE_SYNC_INTERVAL=600000 # 10 minutes (files)
```

## Security Considerations

1. **Password Changes**: When password changes on server, desktop app forces re-login on next online check
2. **File Integrity**: SHA-256 checksums verify file integrity during sync
3. **Token Validation**: JWT tokens include password version to detect password changes
4. **Offline Access**: Users can continue working offline; sync resumes when connection restored

## Known Limitations

1. **File Size**: Maximum file size for sync is 100MB (configurable)
2. **Batch Size**: Data sync processes 500 records per batch
3. **File Sync Frequency**: File sync runs every 10 minutes (less frequent than data sync)
4. **Conflict Resolution**: Manual conflict resolution required for conflicting changes
5. **In-Memory Queue**: File sync jobs are lost if backend restarts (jobs will be re-queued on next scan)

## Deployment Steps

### 1. Backend (Server)
```bash
cd backend
npm install
npx prisma generate  # Regenerate client (no migration needed)
npm run build
npm run start:prod
```

### 2. Desktop App
```bash
cd desktop
./scripts/setup-binaries.sh  # Download PostgreSQL
wails build
```

### 3. Verification
- Create patient offline → verify syncs to server
- Change password on server → verify desktop forces logout
- Upload medical image → verify file syncs

## Summary

✅ **80+ entities synced** across 11 dependency phases
✅ **Password change detection** with automatic logout
✅ **File synchronization** with in-memory queue
✅ **No database migration required**
✅ **Works with existing remote database** (107.155.75.50:5389)
