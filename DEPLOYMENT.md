# INAMSOS Production Deployment Guide

Production deployment for INAMSOS Tumor Registry using a **single unified Docker container** on **inamsos.medxamion.com**.

## Architecture

The application uses a **monolithic container** where the NestJS backend serves both the API and the Next.js frontend static files.

```
┌─────────────────────────────────────┐
│         Single Container            │
│  ┌──────────────────────────────┐  │
│  │   Nginx/Reverse Proxy (:443) │  │
│  └───────────┬──────────────────┘  │
│              │                      │
│  ┌───────────▼──────────────────┐  │
│  │   INAMSOS Container          │  │
│  │   - Frontend (static files)  │  │
│  │   - Backend API (:3001)      │  │
│  │   - Served by NestJS/Fastify │  │
│  └──────────────┬───────────────┘  │
└─────────────────┼───────────────────┘
                  │
          ┌───────▼────────┐
          │ External PG DB │
          └────────────────┘
```

## Prerequisites

- Docker installed on the server
- External PostgreSQL database
- Domain configured: `inamsos.medxamion.com`
- SSL certificate (for HTTPS)

## Quick Start

### 1. Build the Docker Image

```bash
# From project root
./build.sh

# With custom version
VERSION=1.0.1 ./build.sh

# With custom API URL
NEXT_PUBLIC_API_URL=https://inamsos.medxamion.com/api/v1 ./build.sh
```

### 2. Configure Environment

```bash
# Copy environment template
cp backend/.env.example backend/.env.production

# Edit with your actual values
nano backend/.env.production
```

**Required configuration:**
- `DATABASE_URL` - External PostgreSQL connection string
- `JWT_SECRET` - Minimum 32 characters
- `JWT_REFRESH_SECRET` - Minimum 32 characters
- `ENCRYPTION_KEY` - 32 characters
- `SESSION_SECRET` - Minimum 32 characters

### 3. Deploy

```bash
./deploy.sh

# With specific version
VERSION=1.0.1 ./deploy.sh
```

## Container Details

**Single Container: `inamsos`**

- **Image:** `inamsos:latest`
- **Port:** 3001
- **Components:**
  - NestJS Backend API
  - Next.js Frontend (static files)
  - Prisma ORM
- **Volumes:**
  - `inamsos-uploads` → `/var/lib/inamsos/uploads`
  - `inamsos-logs` → `/var/log/inamsos`
- **Health Check:** `GET /api/v1/health`
- **Restart Policy:** `always`

## Build Process

The Dockerfile uses a multi-stage build:

1. **Frontend Builder:** Builds Next.js application
2. **Backend Builder:** Builds NestJS application
3. **Production:** Combines both into a single optimized image

```dockerfile
Frontend (Next.js)  →  Static Files
Backend (NestJS)    →  Node.js Server
         ↓
  Unified Production Image
```

## URL Structure

All traffic goes through port 3001:

- `http://localhost:3001/` - Frontend application
- `http://localhost:3001/api/v1/*` - Backend API
- `http://localhost:3001/api/v1/health` - Health check

The backend serves static files for non-API routes, enabling SPA routing.

## Management Commands

### View Logs

```bash
# Follow logs
docker logs -f inamsos

# Last 100 lines
docker logs --tail 100 inamsos

# With timestamps
docker logs -t inamsos
```

### Check Status

```bash
# Container status
docker ps

# Health status
docker inspect inamsos --format='{{.State.Health.Status}}'

# Detailed info
docker inspect inamsos
```

### Container Control

```bash
# Stop
docker stop inamsos

# Start
docker start inamsos

# Restart
docker restart inamsos

# Remove (must stop first)
docker stop inamsos && docker rm inamsos
```

### Access Container Shell

```bash
# Interactive shell
docker exec -it inamsos sh

# Run specific command
docker exec inamsos ls -la /app/public
docker exec inamsos cat /app/.env.production
```

## Updates & Deployments

### Deploy New Version

```bash
# Build new version
VERSION=1.0.1 ./build.sh

# Deploy
VERSION=1.0.1 ./deploy.sh
```

The deploy script will:
1. Stop the existing container
2. Remove the old container
3. Start the new container with the same volumes

### Rollback

```bash
# Tag previous version as latest
docker tag inamsos:1.0.0 inamsos:latest

# Redeploy
./deploy.sh
```

## Volumes

### Created Volumes

- **inamsos-uploads** - User uploaded files (images, documents)
- **inamsos-logs** - Application logs

### List Volumes

```bash
docker volume ls | grep inamsos
```

### Inspect Volume

```bash
docker volume inspect inamsos-uploads
```

### Backup Volumes

```bash
# Backup uploads
docker run --rm \
  -v inamsos-uploads:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/uploads-backup-$(date +%Y%m%d).tar.gz -C /data .

# Backup logs
docker run --rm \
  -v inamsos-logs:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/logs-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### Restore Volumes

```bash
# Restore uploads
docker run --rm \
  -v inamsos-uploads:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/uploads-backup-20250101.tar.gz -C /data
```

## Environment Variables

### Build-time Variables (Frontend)

These are embedded in the frontend during build:

- `NEXT_PUBLIC_API_URL` - API endpoint URL
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_VERSION` - Application version

```bash
# Build with custom frontend variables
NEXT_PUBLIC_API_URL=https://inamsos.medxamion.com/api/v1 \
NEXT_PUBLIC_APP_NAME=INAMSOS \
./build.sh
```

### Runtime Variables (Backend)

Loaded from `backend/.env.production`:

- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - JWT signing key
- `PORT` - Application port (default: 3001)
- `CORS_ORIGIN` - CORS allowed origins

See `backend/.env.example` for all available variables.

## Health Checks

### Manual Health Check

```bash
# Health endpoint
curl http://localhost:3001/api/v1/health

# With details
curl http://localhost:3001/api/v1/health | jq
```

### Docker Health Status

```bash
# Check if healthy
docker ps | grep inamsos

# Detailed health info
docker inspect inamsos --format='{{json .State.Health}}' | jq
```

## Reverse Proxy Configuration

Configure nginx or Apache to proxy to the container:

### Nginx Example

```nginx
server {
    listen 443 ssl http2;
    server_name inamsos.medxamion.com;

    ssl_certificate /etc/ssl/certs/inamsos.crt;
    ssl_certificate_key /etc/ssl/private/inamsos.key;

    # Proxy all traffic to container
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Increase upload limits
    client_max_body_size 100M;
}
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs inamsos

# Check configuration
docker exec inamsos cat /app/.env.production

# Verify volumes
docker volume ls | grep inamsos
```

### Database Connection Issues

- Verify `DATABASE_URL` in `backend/.env.production`
- Test connection:
  ```bash
  docker exec inamsos sh -c 'echo $DATABASE_URL'
  psql $DATABASE_URL
  ```
- Check firewall rules

### Frontend Not Loading

```bash
# Check static files exist
docker exec inamsos ls -la /app/public

# Check index.html
docker exec inamsos cat /app/public/index.html

# Verify build artifacts
docker exec inamsos ls -la /app/public/_next/static
```

### Health Check Failing

```bash
# Manual health check
curl http://localhost:3001/api/v1/health

# Check backend is running
docker exec inamsos ps aux | grep node

# Check port
docker exec inamsos netstat -tlnp | grep 3001
```

### Permission Issues

```bash
# Check volume permissions
docker run --rm \
  -v inamsos-uploads:/data \
  alpine ls -la /data

# Fix permissions
docker run --rm \
  -v inamsos-uploads:/data \
  alpine chown -R 1001:1001 /data
```

## Monitoring

### Resource Usage

```bash
# Container stats
docker stats inamsos

# Disk usage
docker system df

# Volume sizes
docker du -v --format 'table {{.Name}}\t{{.Usage}}'
```

### Log Analysis

```bash
# View errors
docker logs inamsos 2>&1 | grep -i error

# Count requests
docker logs inamsos 2>&1 | grep -c "GET"

# Real-time filtering
docker logs -f inamsos | grep --line-buffered "ERROR"
```

## Security Best Practices

1. **Environment Variables:**
   - Never commit `.env.production` to version control
   - Use strong, random secrets (min 32 characters)
   - Rotate secrets regularly

2. **Database:**
   - Use SSL connections (`DATABASE_SSL=true`)
   - Restrict database access to specific IPs
   - Use strong password

3. **SSL/TLS:**
   - Always use HTTPS in production
   - Keep certificates updated
   - Use strong cipher suites

4. **Container:**
   - Run as non-root user (nodejs:1001)
   - Read-only root filesystem (where possible)
   - Limit container resources

5. **Network:**
   - Use dedicated Docker network
   - Don't expose unnecessary ports
   - Configure firewall rules

## Production Checklist

Before deploying to production:

- [ ] Set strong secrets in `backend/.env.production`
- [ ] Configure external PostgreSQL database
- [ ] Set up SSL certificates for domain
- [ ] Configure reverse proxy (nginx/Apache)
- [ ] Set up automated backups (database + volumes)
- [ ] Configure log rotation
- [ ] Set up monitoring and alerting
- [ ] Test health checks
- [ ] Configure firewall rules
- [ ] Document disaster recovery procedure
- [ ] Test deployment process
- [ ] Set up CI/CD pipeline

## Support

For issues or questions:

1. Check logs: `docker logs -f inamsos`
2. Verify configuration: `cat backend/.env.production`
3. Check health: `curl http://localhost:3001/api/v1/health`
4. Review container status: `docker ps`

## Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Dockerfile | `Dockerfile.dev` | `Dockerfile` (unified) |
| Command | `npm run start:dev` | Single container |
| Ports | Frontend: 3000, Backend: 3001 | Single: 3001 |
| Build | Hot reload | Pre-built static files |
| Database | Local PostgreSQL | External PostgreSQL |
| File storage | Local | Docker volumes |
