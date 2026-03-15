# AGENTS.md - INAMSOS Tumor Registry

## Overview

**INAMSOS** (Indonesian Musculoskeletal Tumor Registry) adalah platform registry tumor musculoskeletal nasional Indonesia yang terdiri dari:

- **Backend**: NestJS + Prisma + PostgreSQL
- **Frontend**: Next.js + React + Tailwind CSS
- **Desktop**: Wails (Go) dengan frontend Next.js yang di-embed

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              INAMSOS PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────┐      ┌─────────────────────────┐              │
│  │      WEB INTERFACE      │      │    DESKTOP APP (Wails)  │              │
│  │    (Next.js - Port 3000)│      │  (Port 34115 - Desktop) │              │
│  └──────────┬──────────────┘      └──────────┬──────────────┘              │
│             │                                │                              │
│             └────────────────┬───────────────┘                              │
│                              │                                              │
│                    ┌─────────┴─────────┐                                    │
│                    │   REST API        │                                    │
│                    │   NestJS/Fastify  │                                    │
│                    │   (Port 3001)     │                                    │
│                    └─────────┬─────────┘                                    │
│                              │                                              │
│           ┌──────────────────┼──────────────────┐                          │
│           │                  │                  │                          │
│    ┌──────┴──────┐    ┌──────┴──────┐   ┌──────┴──────┐                  │
│    │  PostgreSQL │    │    Redis    │   │  Bull Queue │                  │
│    │  (Multi     │    │   (Cache,   │   │  (Background│                  │
│    │   Schema)   │    │   Session)  │   │   Jobs)     │                  │
│    └─────────────┘    └─────────────┘   └─────────────┘                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Multi-Schema Database

```
┌────────────────────────────────────────────────────────────────┐
│                     PostgreSQL Database                         │
├─────────────────────┬─────────────────────┬────────────────────┤
│   audit Schema      │   medical Schema    │   system Schema    │
├─────────────────────┼─────────────────────┼────────────────────┤
│ - AuditLog          │ - Patient           │ - User             │
│ - DataChange        │ - MedicalRecord     │ - Role             │
│ - ResearchAudit     │ - Diagnosis         │ - Permission       │
│                     │ - Treatment         │ - Center           │
│                     │ - FollowUp          │ - Configuration    │
│                     │ - Staging           │ - ActivityLog      │
│                     │ - Laboratory        │                    │
└─────────────────────┴─────────────────────┴────────────────────┘
```

---

## Project Structure

```
tumor-registry/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── app.module.ts       # Root module
│   │   ├── main.ts             # Entry point (Fastify)
│   │   ├── main-embedded.ts    # Entry point for desktop
│   │   ├── modules/            # Feature modules (47 modules)
│   │   │   ├── patients/       # Patient management
│   │   │   ├── auth/           # Authentication
│   │   │   ├── users/          # User management
│   │   │   ├── centers/        # Healthcare centers
│   │   │   ├── musculoskeletal/# MSK tumor registry
│   │   │   ├── reports/        # Reporting
│   │   │   ├── research/       # Research features
│   │   │   └── ...             # Other modules
│   │   └── common/             # Shared utilities
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema (5500+ lines)
│   │   └── migrations/         # Database migrations
│   └── package.json
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── patients/
│   │   │   ├── follow-up/
│   │   │   ├── reports/
│   │   │   ├── research/
│   │   │   └── ...
│   │   ├── components/         # React components
│   │   ├── services/           # API services
│   │   ├── hooks/              # Custom React hooks
│   │   └── types/              # TypeScript types
│   └── package.json
├── docs/                       # Documentation
└── docker-entrypoint.sh        # Production startup script
```

---

## Technology Stack

### Backend

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | NestJS | ^11.0.0 |
| Runtime | Bun / Node.js | 20+ |
| Database | PostgreSQL | 15+ |
| ORM | Prisma | ^5.6.0 |
| HTTP Server | Fastify | ^5.6.2 |
| Cache | Redis | ^4.6.10 |
| Queue | Bull | ^4.16.5 |
| Auth | JWT + Passport | ^11.0.0 |
| Validation | class-validator | ^0.14.2 |
| Documentation | Swagger | ^11.0.0 |

### Frontend

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 14.0.4 |
| UI Library | React | ^18.2.0 |
| Styling | Tailwind CSS | ^3.3.6 |
| State | TanStack Query | ^5.14.0 |
| Forms | React Hook Form | ^7.48.2 |
| Validation | Zod | ^3.22.4 |
| Charts | Recharts | ^2.10.3 |
| Icons | Lucide React | ^0.294.0 |

---

## Core Modules

### Active Modules (47+)

1. **Auth Module** (`modules/auth/`)
   - JWT authentication with refresh tokens
   - Role-based access control (RBAC)
   - Multi-factor authentication (MFA)
   - Password policies

2. **Patients Module** (`modules/patients/`)
   - Patient CRUD operations
   - Medical record linking
   - Search and filtering

3. **Musculoskeletal Module** (`modules/musculoskeletal/`)
   - WHO Classification integration
   - Enneking staging
   - MSTS functional scores
   - 14-visit follow-up tracking
   - Clinical photo management

4. **Research Module** (`modules/research/`)
   - Data access requests
   - Research collaborations
   - Impact metrics tracking

5. **Reports Module** (`modules/reports/`)
   - Scheduled reports
   - National dashboards
   - Analytics and statistics

6. **Regions Module** (`modules/regions/`)
   - Indonesian provinces/regencies/villages
   - Geographic data management

### Disabled Modules (Temporary)

Modules with `.disabled` suffix or commented out in `app.module.ts`:
- analytics.disabled
- notifications.disabled
- sso.disabled
- research-impact.disabled
- security-monitoring.disabled

---

## Key Features

### 1. Musculoskeletal Tumor Registry

```
Patient Journey:
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Admission  │───►│  Diagnosis   │───►│  Treatment  │
│             │    │  (WHO Class) │    │  Planning   │
└─────────────┘    └──────────────┘    └─────────────┘
                                              │
                    ┌──────────────┐         │
                    │  Follow-up   │◄────────┘
                    │  (14 visits) │
                    └──────────────┘
```

### 2. Data Schemas (Multi-Tenant)

- **System Schema**: Users, roles, permissions, centers
- **Medical Schema**: Patients, diagnoses, treatments, follow-ups
- **Audit Schema**: Audit logs, access tracking, data changes

### 3. Offline Sync (Desktop Mode)

- Local SQLite database for desktop app
- Queue-based sync with conflict resolution
- Mutation interceptor for tracking changes

### 4. Research Data Access

- Tiered access levels (1-4)
- Anonymization controls
- Approval workflow for data requests

---

## API Structure

### Base URL

```
Development: http://localhost:3001/api/v1/
Production:  https://inamsos.medxamion.com/api/v1/
```

### Key Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /auth/login` | User authentication |
| `POST /auth/refresh` | Token refresh |
| `GET /patients` | List patients |
| `POST /patients` | Create patient |
| `GET /patients/:id` | Get patient details |
| `PUT /patients/:id` | Update patient |
| `GET /musculoskeletal/who-classification` | WHO tumor classifications |
| `POST /research-requests` | Submit research request |
| `GET /reports/national-dashboard` | National statistics |
| `GET /regions/provinces` | List provinces |

### Authentication

```typescript
// JWT Bearer Token
Authorization: Bearer <token>

// Refresh Token Flow
1. Login returns { accessToken, refreshToken }
2. Access token expires in 15 minutes
3. Use refresh token to get new access token
4. Refresh token expires in 7 days
```

---

## Database Schema Overview

### Core Entities

| Entity | Schema | Description |
|--------|--------|-------------|
| User | system | System users with roles |
| Patient | medical | Patient demographics |
| Center | system | Healthcare centers (21 national) |
| MedicalRecord | medical | Patient medical records |
| Diagnosis | medical | WHO classifications |
| Treatment | medical | Surgery/chemo/radiotherapy |
| FollowUp | medical | 14-visit follow-up |
| ResearchRequest | medical | Research data access |

### Key Relationships

```
Center 1:N Patient
Center 1:N User
Patient 1:N MedicalRecord
MedicalRecord 1:N Diagnosis
MedicalRecord 1:N Treatment
Patient 1:N FollowUpVisit
```

---

## Development Guidelines

### Backend Development

```typescript
// Module structure
src/modules/example/
├── example.module.ts
├── example.controller.ts
├── example.service.ts
├── dto/
│   ├── create-example.dto.ts
│   └── update-example.dto.ts
└── entities/
    └── example.entity.ts

// Service pattern
@Injectable()
export class ExampleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExampleDto) {
    return this.prisma.example.create({ data });
  }
}
```

### Frontend Development

```typescript
// Service pattern
// services/example.service.ts
export const exampleService = {
  async getAll(params?: PaginationParams) {
    const response = await apiClient.get('/examples', { params });
    return response.data;
  },

  async create(data: CreateExampleDto) {
    const response = await apiClient.post('/examples', data);
    return response.data;
  },
};

// Hook pattern
// hooks/useExamples.ts
export function useExamples() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: () => exampleService.getAll(),
  });
}
```

### API Client Configuration

```typescript
// services/api.config.ts
const apiClient = axios.create({
  baseURL: getApiBaseUrl(), // Auto-detects web vs desktop
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Auto-refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto-logout and redirect
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## Environment Configuration

### Backend (.env)

```env
# Database - Set your own DATABASE_URL in environment
# See prisma docs for connection string format

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Redis
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password

# File Storage
MINIO_ENDPOINT=minio.example.com
MINIO_ACCESS_KEY=access-key
MINIO_SECRET_KEY=secret-key
```

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=https://api.inamsos.medxamion.com
NEXT_PUBLIC_APP_NAME=INAMSOS
NEXT_PUBLIC_VERSION=1.0.0
NODE_ENV=production
```

---

## Build & Deployment

### Coolify Deployment (Production, Terminal-First)

**Target Server**: `riz@cf.avolut.com`
**App ID**: `uk80oo8804g4w0co444cgso4`

#### Deployment Configuration

```yaml
# Coolify Configuration
Application:
  Name: INAMSOS Tumor Registry
  UUID: uk80oo8804g4w0co444cgso4
  Server: cf.avolut.com
  
Build:
  Type: Dockerfile
  Context: .
  File: Dockerfile
  
Ports:
  - 3000 (Frontend - exposed)
  - 3001 (Backend - internal)
  
Environment Variables:
  Required:
    - DATABASE_URL (PostgreSQL connection)
    - JWT_SECRET
    - FRONTEND_URL
    - BACKEND_URL=http://127.0.0.1:3001
  
  Optional:
    - REDIS_URL
    - SMTP_HOST/SMTP_PORT
    - MINIO_ENDPOINT
```

#### Deployment Workflow

Use SSH as the default deployment path. Do not rely on the Coolify UI for routine deploys.

**Quickstart via repo script**
```bash
# Queue deploy, wait for final status, then run health checks
./scripts/deploy-coolify.sh release
```

Available commands:
```bash
./scripts/deploy-coolify.sh help

# Useful manual subcommands
./scripts/deploy-coolify.sh app
./scripts/deploy-coolify.sh env
./scripts/deploy-coolify.sh deploy
./scripts/deploy-coolify.sh status
./scripts/deploy-coolify.sh watch
./scripts/deploy-coolify.sh verify
```

**Option 1: Deploy via SSH to Coolify (Recommended)**
```bash
# 1. SSH to the Coolify server
ssh riz@cf.avolut.com

# 2. Set the app UUID once for the session
export COOLIFY_APP_UUID=uk80oo8804g4w0co444cgso4

# 3. Resolve the internal Coolify application metadata dynamically
docker exec -i coolify-db psql -U coolify -d coolify -At \
  -c "SELECT id || '|' || uuid || '|' || name || '|' || COALESCE(fqdn, '') \
      FROM applications WHERE uuid = '${COOLIFY_APP_UUID}' LIMIT 1;"

# 4. Verify required environment variables without hardcoding resource IDs
docker exec -i coolify-db psql -U coolify -d coolify -At \
  -c "SELECT e.key
      FROM environment_variables e
      JOIN applications a
        ON a.id = e.resourceable_id
      WHERE a.uuid = '${COOLIFY_APP_UUID}'
        AND e.is_preview = false
      ORDER BY e.key;"

# 5. Queue a new deployment directly in Coolify
docker exec -i coolify-db psql -U coolify -d coolify \
  -c "INSERT INTO application_deployment_queues
      (application_id, deployment_uuid, commit, status, is_webhook, created_at, updated_at, application_name, server_id)
      SELECT a.id, gen_random_uuid(), COALESCE(a.git_commit_sha, 'manual'), 'queued', false, NOW(), NOW(), a.name, a.server_id
      FROM applications a
      WHERE a.uuid = '${COOLIFY_APP_UUID}';"

# 6. Watch the latest deployment status
watch -n 2 "docker exec -i coolify-db psql -U coolify -d coolify -c \"
  SELECT q.status, q.commit, q.created_at, q.updated_at
  FROM application_deployment_queues q
  JOIN applications a ON a.id = q.application_id
  WHERE a.uuid = '${COOLIFY_APP_UUID}'
  ORDER BY q.created_at DESC
  LIMIT 5;\""
```

**Option 2: Single-command deploy from local machine**
```bash
ssh riz@cf.avolut.com '
export COOLIFY_APP_UUID=uk80oo8804g4w0co444cgso4
docker exec -i coolify-db psql -U coolify -d coolify \
  -c "INSERT INTO application_deployment_queues
      (application_id, deployment_uuid, commit, status, is_webhook, created_at, updated_at, application_name, server_id)
      SELECT a.id, gen_random_uuid(), COALESCE(a.git_commit_sha, '\''manual'\''), '\''queued'\'', false, NOW(), NOW(), a.name, a.server_id
      FROM applications a
      WHERE a.uuid = '\''${COOLIFY_APP_UUID}'\'';"'
```

**Option 3: Via Git Push (Auto-deploy if webhook is configured)**
```bash
# 1. Commit changes to git
git add .
git commit -m "fix: your changes"
git push origin main

# 2. Coolify will auto-trigger deployment if webhook configured
# 3. Use ./scripts/deploy-coolify.sh status or watch to confirm progress
```

**Option 4: Force Rebuild Deployment**
```bash
# If normal deployment fails, force rebuild without hardcoded IDs
ssh riz@cf.avolut.com
export COOLIFY_APP_UUID=uk80oo8804g4w0co444cgso4
docker exec -i coolify-db psql -U coolify -d coolify \
  -c "INSERT INTO application_deployment_queues
      (application_id, deployment_uuid, commit, status, is_webhook, created_at, updated_at, application_name, server_id, force_rebuild)
      SELECT a.id, gen_random_uuid(), COALESCE(a.git_commit_sha, 'manual'), 'queued', false, NOW(), NOW(), a.name, a.server_id, true
      FROM applications a
      WHERE a.uuid = '${COOLIFY_APP_UUID}';"
```

**Option 5: Direct Docker (Emergency only, bypasses Coolify)**
```bash
# Only if Coolify deployment fails
# Build locally and run with Coolify env vars
cd ~/tumor-registry
docker build -t tumor-registry:latest .
docker run -d --name inamsos-emergency \
  -p 127.0.0.1:13000:3000 \
  -p 127.0.0.1:13001:3001 \
  --env-file /path/to/coolify/env \
  tumor-registry:latest
```

#### Environment Variables (Coolify)

Manage these in Coolify, but audit them from SSH:

```bash
ssh riz@cf.avolut.com '
export COOLIFY_APP_UUID=uk80oo8804g4w0co444cgso4
docker exec -i coolify-db psql -U coolify -d coolify -c "
  SELECT e.key, CASE WHEN e.value IS NULL OR e.value = '\'''\'' THEN '\''<empty>'\'' ELSE '\''<set>'\'' END AS status
  FROM environment_variables e
  JOIN applications a ON a.id = e.resourceable_id
  WHERE a.uuid = '\''${COOLIFY_APP_UUID}'\''
    AND e.is_preview = false
  ORDER BY e.key;"'
```

Expected production values:

```bash
# Application
NODE_ENV=production
FRONTEND_PORT=3000
BACKEND_PORT=3001
HOSTNAME=0.0.0.0
FRONTEND_URL=https://inamsos.medxamion.com
BACKEND_URL=http://127.0.0.1:3001

# Security
JWT_SECRET=<generate-strong-secret>
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Public URLs
NEXT_PUBLIC_API_URL=https://inamsos.medxamion.com/api/v1
NEXT_PUBLIC_APP_NAME=INAMSOS
NEXT_PUBLIC_VERSION=1.3.6
```

#### Troubleshooting Coolify Deployment

1. **Port Mismatch Warning**
   - Do NOT set global `PORT` env variable unless the container entrypoint explicitly requires it
   - Set `FRONTEND_PORT=3000` and `BACKEND_PORT=3001` separately
   - Coolify exposes port 3000, backend runs on 3001 internally

2. **Database Connection Error**
   - Ensure DATABASE_URL uses external host (not 127.0.0.1)
   - Check network connectivity from container to database
   - Verify credentials and SSL settings

3. **Build Failures**
   - Check Docker build logs in Coolify
   - Ensure node_modules are not cached incorrectly
   - Verify Dockerfile syntax

4. **Deployment Queued But Never Starts**
   - Check latest queue entries from SSH and confirm status changes from `queued` to `in_progress`
   - If the queue is stuck, inspect the Coolify worker/Horizon process on `cf.avolut.com`
   - Verify Coolify worker/container is healthy on `cf.avolut.com`
   - Requeue deployment instead of editing rows manually

5. **Wrong Resource ID / Hardcoded IDs**
   - Never hardcode `application_id` or `resourceable_id`
   - Always resolve IDs by `applications.uuid = 'uk80oo8804g4w0co444cgso4'`

6. **Migration Issues (Schema Drift)**
   - Check migration status inside the app container: `docker exec CONTAINER_ID npx prisma migrate status`
   - Apply production migrations manually if needed: `docker exec CONTAINER_ID npx prisma migrate deploy`
   - Only modify schema directly via `psql` if you understand the drift and have a rollback path

7. **Container Not Starting**
   - Check container logs: `docker logs CONTAINER_ID --tail 100`
   - Verify environment variables: `docker exec CONTAINER_ID env`
   - Check health endpoint: `curl http://localhost:3001/api/v1/health`

#### Post-Deploy Verification

```bash
# Production health check
curl -fsS https://inamsos.medxamion.com/api/v1/health

# Response headers
curl -I https://inamsos.medxamion.com

# Confirm latest deployment record from server
ssh riz@cf.avolut.com '
export COOLIFY_APP_UUID=uk80oo8804g4w0co444cgso4
docker exec -i coolify-db psql -U coolify -d coolify -c "
  SELECT q.status, q.commit, q.created_at, q.updated_at
  FROM application_deployment_queues q
  JOIN applications a ON a.id = q.application_id
  WHERE a.uuid = '\''${COOLIFY_APP_UUID}'\''
  ORDER BY q.created_at DESC
  LIMIT 1;"'
```

#### Suggested SSH Aliases

Add these locally if you deploy often:

```bash
alias inamsos-coolify='ssh riz@cf.avolut.com'
alias inamsos-deploy="ssh riz@cf.avolut.com 'export COOLIFY_APP_UUID=uk80oo8804g4w0co444cgso4 && docker exec -i coolify-db psql -U coolify -d coolify -c \"INSERT INTO application_deployment_queues (application_id, deployment_uuid, commit, status, is_webhook, created_at, updated_at, application_name, server_id) SELECT a.id, gen_random_uuid(), COALESCE(a.git_commit_sha, '\''manual'\''), '\''queued'\'', false, NOW(), NOW(), a.name, a.server_id FROM applications a WHERE a.uuid = '\''\${COOLIFY_APP_UUID}'\'';\"'"
```

Prefer `./scripts/deploy-coolify.sh` for normal operation; use raw SSH aliases only for debugging or when the script needs to be bypassed.

---

### Local Development

```bash
# Backend
cd backend
bun install
bun run db:migrate
bun run start:dev

# Frontend
cd frontend
npm install
npm run dev
```

### Docker Production

```bash
# Build image
docker build -t inamsos:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=... \
  -e JWT_SECRET=... \
  inamsos:latest
```

### Startup Sequence (Production)

```
1. docker-entrypoint.sh
2. Start Next.js on port 3000
3. Run Prisma migrations
4. Deploy villages data (if empty)
5. Start NestJS on port 3001
```

---

## Testing

### Backend Tests

```bash
# Unit tests
bun test

# Coverage
bun test:cov

# E2E tests
bun test:e2e
```

### Frontend Tests

```bash
# Linting
npm run lint

# Build check
npm run build
```

---

## Security Considerations

1. **Authentication**: JWT with refresh tokens, MFA support
2. **Authorization**: RBAC with permission-based access
3. **Data Encryption**: AES-256 for sensitive fields
4. **Audit Logging**: All data access logged
5. **Rate Limiting**: 100 requests/minute per IP
6. **CORS**: Configured for allowed origins
7. **Helmet**: Security headers via Fastify

---

## Monitoring & Logging

### Backend Logging

```typescript
// Winston logger with Elasticsearch
@Injectable()
export class LoggingService {
  private logger = new Logger('ServiceName');

  logOperation(operation: string, data: any) {
    this.logger.log(`${operation}: ${JSON.stringify(data)}`);
  }
}
```

### Health Checks

```
GET /api/v1/health
Response: { status: 'ok', timestamp: '2025-...' }
```

---

## Common Tasks

### Database Migration

```bash
cd backend
# Development
bun run db:migrate

# Production
npx prisma migrate deploy
```

### Seed Data

```bash
cd backend
bun run db:seed
```

### Generate Prisma Client

```bash
cd backend
bun run db:generate
```

---

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify network access

2. **Prisma Client Not Generated**
   - Run `bun run db:generate`
   - Check prisma/schema.prisma syntax

3. **CORS Errors**
   - Verify FRONTEND_URL environment variable
   - Check CORS configuration in main.ts

4. **Module Import Errors**
   - Check for circular dependencies
   - Verify module imports in app.module.ts

---

## Documentation References

- `/docs/archive/architecture.md` - Detailed architecture docs
- `/docs/archive/prd.md` - Product Requirements Document
- `/backend/prisma/SCHEMA_QUICK_REFERENCE.md` - Database schema reference
- `/backend/docs/` - Backend-specific documentation

---

## Team Contacts

- **Project Lead**: [Contact]
- **Backend Lead**: [Contact]
- **Frontend Lead**: [Contact]
- **DevOps**: [Contact]
- **Coolify Admin**: riz@cf.avolut.com

### Deployment Info

| Item | Value |
|------|-------|
| Server | cf.avolut.com |
| SSH | `riz@cf.avolut.com` |
| App ID | `uk80oo8804g4w0co444cgso4` |
| App DB ID | `125` |
| Dashboard | https://cf.avolut.com |
| Production URL | https://inamsos.medxamion.com |
| Health Check | https://inamsos.com/api/v1/health |

### Quick Deployment Commands

```bash
# SSH to server
ssh riz@cf.avolut.com

# Check application status
docker exec -i coolify-db psql -U coolify -d coolify \
  -c "SELECT name, status FROM applications WHERE uuid = 'uk80oo8804g4w0co444cgso4';"

# Trigger deployment
docker exec -i coolify-db psql -U coolify -d coolify \
  -c "UPDATE applications SET updated_at = NOW() WHERE uuid = 'uk80oo8804g4w0co444cgso4';"

# Check container status
docker ps --filter 'name=uk80oo8804g4w0co444cgso4'

# View logs
docker logs $(docker ps --filter 'name=uk80oo8804g4w0co444cgso4' --format '{{.Names}}') --tail 50

# Restart container
docker restart $(docker ps --filter 'name=uk80oo8804g4w0co444cgso4' --format '{{.Names}}')
```

### Prisma Migration on Production

```bash
# SSH to server
ssh riz@cf.avolut.com

# Get container name
CONTAINER=$(docker ps --filter 'name=uk80oo8804g4w0co444cgso4' --format '{{.Names}}')

# Check migration status
docker exec $CONTAINER npx prisma migrate status

# Deploy migrations
docker exec $CONTAINER npx prisma migrate deploy

# Generate Prisma client (if schema changed)
docker exec $CONTAINER npx prisma generate

# Restart container after migration
docker restart $CONTAINER
```

### Database Direct Access (Emergency)

```bash
# SSH to server
ssh riz@cf.avolut.com

# Get DATABASE_URL from container
docker exec $(docker ps --filter 'name=uk80oo8804g4w0co444cgso4' --format '{{.Names}}') env | grep DATABASE_URL

# Run SQL directly via psql (password from env)
PGPASSWORD=your_password psql -h 107.155.75.50 -p 5389 -U postgres -d tmr-reg -c "SELECT * FROM system."User" LIMIT 5;"
```

---

*Last Updated: 2026-03-15*
*Version: 1.3.6*

---

## Deployment Guide

### Prerequisites
- SSH access to server: `riz@cf.avolut.com`
- Coolify dashboard access: https://cf.avolut.com
- Application UUID: `uk80oo8804g4w0co444cgso4`

### Standard Deployment Flow

1. **Push code to git**
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```

2. **Trigger deployment via Coolify Dashboard**
   - Go to https://cf.avolut.com
   - Select application INAMSOS
   - Click "Redeploy" or "Deploy"

3. **Verify deployment**
   ```bash
   ssh riz@cf.avolut.com
   docker ps --filter 'name=uk80oo8804g4w0co444cgso4'
   ```

4. **Check application health**
   ```bash
   curl https://inamsos.com/api/v1/health
   ```

### Migration Deployment

**IMPORTANT**: When adding new Prisma migrations:

1. Create migration in development:
   ```bash
   cd backend
   npx prisma migrate dev --name your_migration_name
   ```

2. Commit the migration file:
   ```bash
   git add prisma/migrations/
   git commit -m "feat: add migration for X"
   git push
   ```

3. Deploy to production:
   ```bash
   # After deployment, verify migration applied:
   ssh riz@cf.avolut.com
   CONTAINER=$(docker ps --filter 'name=uk80oo8804g4w0co444cgso4' --format '{{.Names}}')
   docker exec $CONTAINER npx prisma migrate status
   ```

4. If migration fails (Schema Drift):
   ```bash
   # Option 1: Fix via container
   docker exec $CONTAINER npx prisma migrate deploy
   
   # Option 2: Fix via psql (emergency)
   PGPASSWORD=password psql -h HOST -p PORT -U USER -d DB -c "ALTER TABLE..."
   ```

### Common Deployment Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Container stuck in "queued" | Horizon queue blocked | `docker exec coolify php artisan queue:clear` |
| 500 error after deploy | Missing DB columns | Run `prisma migrate deploy` or psql fix |
| Container won't start | Port conflict | Check `FRONTEND_PORT` and `BACKEND_PORT` env |
| Health check failing | App not ready | Check logs: `docker logs CONTAINER --tail 50` |
| Database connection error | Wrong DATABASE_URL | Verify external host in connection string |
