# Production Deployment Instructions - Villages Data

## Problem
The production server at https://inamsos.com is showing empty village data because:
1. The running container was built BEFORE the villages deployment scripts were added
2. The container needs to be rebuilt to include the new scripts

## Solution - Rebuild Container on Coolify

### Option 1: Redeploy from Coolify Dashboard (EASIEST)

1. Go to your Coolify dashboard
2. Find the INAMSOS service
3. Click **"Redeploy"** or **"Force Rebuild"**
4. This will:
   - Pull latest code from GitHub (including all villages commits)
   - Rebuild the Docker image with scripts directory
   - Run the entrypoint script which auto-deploys 84,210 villages
   - Restart the container

### Option 2: Manual SSH Deployment

If you have SSH access to the server:

```bash
# SSH to server
ssh user@your-server-ip

# Go to app directory
cd /app

# Pull latest code
git pull origin main

# Rebuild and restart container
# (Use Coolify CLI or docker commands depending on your setup)
docker-compose pull
docker-compose up -d --build
```

## What Will Happen on Redeploy

1. **Dockerfile rebuild** - Now includes `COPY backend/scripts ./scripts`
2. **Container starts** - Runs `docker-entrypoint.sh`
3. **Migration runs** - `npx prisma migrate deploy`
4. **Villages check** - Runs `check-villages-count.js`
5. **Auto-deploy** - If villages count = 0, runs `deploy-villages.js`
6. **Import complete** - 84,210 villages imported to database

## Verification After Redeploy

1. Go to https://inamsos.com/patients/new
2. Select:
   - Province: ACEH
   - Regency: KABUPATEN SABANG
   - District: SUKAKARYA
3. **Village dropdown should now show all villages** (e.g., LATIUNG, etc.)

## Troubleshooting

### Check if villages imported:
```bash
# On production server via SSH
docker exec -it inamsos-postgres psql -U inamsos_user -d inamsos_db -c "SELECT COUNT(*) FROM \"system\".\"villages\";"
```

Expected output: `84210`

### Check container logs:
```bash
docker logs inamsos-container 2>&1 | grep -i villages
```

Should show:
```
Checking villages data...
Villages table is empty or doesn't exist, running deployment...
Starting villages deployment...
Creating villages table...
Importing villages data...
=== Deployment Complete ===
Total villages in database: 84210
```

## Commits Included in This Deploy

```
e0e4094 feat: add automatic villages deployment on container startup
b2fae98 docs: add Node.js deployment option for villages
eb35127 feat: add deploy-villages.js for production deployment
7b7fcfd docs: update villages import documentation
055c75a feat: add villages SQL dump for production deployment
```

## Files Added to Production Image

- `/app/scripts/deploy-villages.js` - Main deployment script
- `/app/scripts/check-villages-count.js` - Helper to check village count
- `/app/prisma/migrations/20260314000000_add_villages_table/migration.sql` - Table creation
- `/app/prisma/migrations/20260314000000_add_villages_table/villages_data.sql` - 84,210 INSERT statements
