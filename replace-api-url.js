const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            walk(filepath, callback);
        } else if (stats.isFile()) {
            callback(filepath);
        }
    });
}

const srcDir = path.join(__dirname, 'frontend', 'src');
let count = 0;

walk(srcDir, (filepath) => {
    if (!filepath.match(/\.(ts|tsx|js|jsx)$/)) return;

    let content = fs.readFileSync(filepath, 'utf8');
    if (content.includes('localhost:3001')) {
        console.log(`Updating ${filepath}`);
        content = content.replace(/localhost:3001/g, '127.0.0.1:3001');
        fs.writeFileSync(filepath, content);
        count++;
    }
});

console.log(`Updated ${count} files.`);
