import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = join(__dirname, 'files', 'script.js');

    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    // Связываем stdin главного процесса с stdin дочернего
    process.stdin.pipe(child.stdin);

    // Связываем stdout дочернего процесса с stdout главного
    child.stdout.pipe(process.stdout);
};

// Получаем аргументы из командной строки
const args = process.argv.slice(2);
spawnChildProcess(args);
