import { cp, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const srcPath = join(__dirname, 'files');
    const destPath = join(__dirname, 'files_copy');

    try {
        await access(srcPath);
    } catch {
        throw new Error('Операция гг');
    }

    try {
        await access(destPath);
        throw new Error('Операция гг');
    } catch (err) {
        if (err.message === 'Операция гг') {
            throw err;
        }
        await cp(srcPath, destPath, { recursive: true });
    }
};

await copy();
