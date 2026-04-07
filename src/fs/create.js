import { writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const fPath = join(__dirname, 'files', 'fresh.txt');

    try {
        await access(fPath);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.message === 'FS operation failed') {
            throw err;
        }
        await writeFile(fPath, 'I am fresh and young');
    }
};

await create();
