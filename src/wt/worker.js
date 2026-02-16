import { parentPort, workerData } from 'worker_threads';

// Функция для вычисления числа Фибоначчи (тяжёлая операция для демонстрации)
const nthFibonacci = (n) => {
    if (n <= 1) return n;
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        const temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    return curr;
};

// Получаем данные из основного потока и отправляем результат обратно
const result = nthFibonacci(workerData);
parentPort.postMessage(result);
