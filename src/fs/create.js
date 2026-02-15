import { writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const fPath = join(__dirname, 'files', 'frsh.txt');

    try {
        await access(fPath);
        throw new Error('Операция гг');
    } catch (err) {
        if (err.message === 'Операция гг') {
            throw err;
        }
        await writeFile(fPath, 'I am fresh and young');
    }
};

await create();
