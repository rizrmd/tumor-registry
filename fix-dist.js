const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'frontend', 'dist');

if (!fs.existsSync(distDir)) {
    console.error('frontend/dist not found!');
    process.exit(1);
}

const files = fs.readdirSync(distDir);

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== '404.html') {
        const name = file.replace('.html', '');
        const dirPath = path.join(distDir, name);

        // If directory exists (some already do like 'admin', 'analytics'), check if it's empty or what
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        } else {
            // Check if it is a directory
            const stats = fs.statSync(dirPath);
            if (!stats.isDirectory()) {
                console.warn(`Skipping ${file} because ${name} exists and is not a directory`);
                return;
            }
        }

        const oldPath = path.join(distDir, file);
        const newPath = path.join(dirPath, 'index.html');

        // if index.html already exists, maybe skip?
        if (fs.existsSync(newPath)) {
            console.log(`${name}/index.html already exists. Skipping.`);
        } else {
            fs.renameSync(oldPath, newPath);
            console.log(`Moved ${file} to ${name}/index.html`);
        }
    }
});
