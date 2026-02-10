const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Replace localhost:3001 with 127.0.0.1:3001
        content = content.replace(/localhost:3001/g, '127.0.0.1:3001');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
            return 1;
        }
        return 0;
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
        return 0;
    }
}

function walkDir(dir) {
    let count = 0;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            count += walkDir(filePath);
        } else if (stat.isFile() && /\.(js|html|css|json)$/i.test(file)) {
            count += replaceInFile(filePath);
        }
    }

    return count;
}

const outDir = path.join(__dirname, 'frontend', 'out');
console.log('Replacing localhost:3001 with 127.0.0.1:3001 in frontend/out...');
const filesUpdated = walkDir(outDir);
console.log(`\nTotal files updated: ${filesUpdated}`);
