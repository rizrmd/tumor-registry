const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '../../');
const frontendOutDir = path.join(rootDir, 'frontend/out');
const destDir = path.join(__dirname, '../frontend/dist');

console.log('Building root frontend...');
execSync('bun run build', { cwd: path.join(rootDir, 'frontend'), stdio: 'inherit' });

console.log('Syncing frontend to desktop/frontend/dist...');
if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });

function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(child => {
            copyRecursive(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

if (fs.existsSync(frontendOutDir)) {
    copyRecursive(frontendOutDir, destDir);
    console.log('Frontend synced successfully.');
} else {
    console.error('Error: frontend/out not found after build.');
    process.exit(1);
}
