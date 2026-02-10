const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'frontend', 'dist');

const dirs = fs.readdirSync(distDir);

dirs.forEach(dir => {
    const dirPath = path.join(distDir, dir);
    if (fs.statSync(dirPath).isDirectory() && dir !== '_next' && dir !== 'assets') {
        const indexFile = path.join(dirPath, 'index.html');
        if (fs.existsSync(indexFile)) {
            const destPath = path.join(distDir, `${dir}.html`);
            fs.renameSync(indexFile, destPath);
            console.log(`Restored ${dir}.html`);

            // Remove empty dir
            try {
                fs.rmdirSync(dirPath);
                console.log(`Removed dir ${dir}`);
            } catch (e) {
                console.warn(`Could not remove dir ${dir}: ${e.message}`);
            }
        }
    }
});
