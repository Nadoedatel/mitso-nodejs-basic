import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const numCores = cpus().length;
    const workerPath = join(__dirname, 'worker.js');

    const promises = [];

    for (let i = 0; i < numCores; i++) {
        const workerData = 10 + i;

        const promise = new Promise((resolve) => {
            const worker = new Worker(workerPath, { workerData });

            worker.on('message', (data) => {
                resolve({ status: 'resolved', data });
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });

        promises.push(promise);
    }

    const results = await Promise.all(promises);
    console.log(results);
};

await performCalculations();
