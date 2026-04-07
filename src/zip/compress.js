import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const srcPath = join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = join(__dirname, 'files', 'archive.gz');

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    const gzip = createGzip();

    await pipeline(readStream, gzip, writeStream);
};

await compress();
