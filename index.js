// index.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sessionPath = path.join(__dirname, 'session/creds.json');
const tempDir = path.join(__dirname, '.temp_bot_update');
const repoURL = 'https://github.com/terrizevdev/VERONICA';

function sessionExists() {
    try {
        const stats = fs.statSync(sessionPath);
        return stats.size > 10;
    } catch {
        return false;
    }
}

function copyFolderContents(source, destination) {
    if (!fs.existsSync(source)) return;

    const items = fs.readdirSync(source, { withFileTypes: true });
    for (const item of items) {
        if (item.name === '.git') continue;

        const sourcePath = path.join(source, item.name);
        const destPath = path.join(destination, item.name);

        if (item.isDirectory()) {
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            copyFolderContents(sourcePath, destPath);
        } else {
            fs.copyFileSync(sourcePath, destPath);
        }
    }
}

(async () => {
    if (sessionExists()) {
        console.log('✅ Session exists. Running main.js...');
        await import('./main.js');
        return;
    }

    console.log('⚠️ session/creds.json not found or empty.');
    console.log('🔄 Pulling latest code from GitHub...');

    try {
        if (fs.existsSync(tempDir)) {
            execSync(`rm -rf ${tempDir}`);
        }
        
        execSync(`git clone ${repoURL} ${tempDir}`);
        console.log('✅ Clone complete.');
        
        console.log('🔁 Copying updated files to root...');
        copyFolderContents(tempDir, __dirname);
        
        console.log('✅ Update complete. Running main.js...');
        await import('./main.js');
    } catch (error) {
        console.error('❌ Failed to update bot:', error.message);
    }
})();
