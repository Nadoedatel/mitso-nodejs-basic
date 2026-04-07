import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const srcPath = join(__dirname, 'files', 'archive.gz');
    const destPath = join(__dirname, 'files', 'fileToCompress.txt');

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    const gunzip = createGunzip();

    await pipeline(readStream, gunzip, writeStream);
};

await decompress();
