#!/usr/bin/env node

/**
 * Sync frontend build output to desktop directory for Wails
 * This script copies the built frontend from frontend/dist to desktop/frontend/dist
 * and also creates a symlink/copy at desktop/frontend/out for Wails compatibility
 */

const fs = require('fs');
const path = require('path');

// Check for both 'out' (static export) and 'dist' (custom build) directories
const sourceOutDir = path.resolve(__dirname, '../frontend/out');
const sourceDistDir = path.resolve(__dirname, '../frontend/dist');

// Determine which source directory to use
let sourceDir;
if (fs.existsSync(sourceOutDir)) {
  sourceDir = sourceOutDir;
  console.log('Using frontend/out directory (static export)');
} else if (fs.existsSync(sourceDistDir)) {
  sourceDir = sourceDistDir;
  console.log('Using frontend/dist directory (custom build)');
} else {
  console.error('Error: Neither frontend/out nor frontend/dist found!');
  console.error('Please build the frontend first: cd frontend && npm run build');
  process.exit(1);
}

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
  console.error(`Error: Source directory not found!`);
  console.error('Checked: frontend/out, frontend/dist');
  console.error('Please build the frontend first: cd frontend && npm run build');
  process.exit(1);
}
