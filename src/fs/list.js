import { readdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const dirPath = join(__dirname, 'files');

    try {
        await access(dirPath);
    } catch {
        throw new Error('FS operation failed');
    }

    const files = await readdir(dirPath);
    console.log(files);
};

await list();