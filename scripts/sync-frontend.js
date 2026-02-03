#!/usr/bin/env node

/**
 * Sync frontend build output to desktop directory for Wails
 * This script copies the built frontend from frontend/dist to desktop/frontend/dist
 * and also creates a symlink/copy at desktop/frontend/out for Wails compatibility
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../frontend/dist');
const targetDir = path.resolve(__dirname, '../desktop/frontend/dist');
const outDir = path.resolve(__dirname, '../desktop/frontend/out');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from source to target
const copyRecursive = (src, dest) => {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const files = fs.readdirSync(src);
    files.forEach((file) => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

if (fs.existsSync(sourceDir)) {
  console.log(`Copying frontend build from ${sourceDir} to ${targetDir}...`);
  copyRecursive(sourceDir, targetDir);

  // Also create a copy at 'out' directory for Wails compatibility
  console.log(`Creating Wails-compatible output at ${outDir}...`);
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  copyRecursive(sourceDir, outDir);

  console.log('Frontend synced successfully!');
} else {
  console.error(`Error: Source directory ${sourceDir} not found!`);
  console.error('Please build the frontend first: cd frontend && npm run build');
  process.exit(1);
}
