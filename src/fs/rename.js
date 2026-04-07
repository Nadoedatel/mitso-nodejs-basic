import { rename as fsRename, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = join(__dirname, 'files', 'properFilename.md');

    try {
        await access(oldPath);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        await access(newPath);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.message === 'FS operation failed') {
            throw err;
        }
        await fsRename(oldPath, newPath);
    }
};

await rename();
