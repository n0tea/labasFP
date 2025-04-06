//1. Функция для фильтрации чисел, кратных заданному.
function filterMultiples(arr: number[], divisor: number): number[] {
    return arr.filter((num) => num % divisor === 0);
}

//2. Функция для объединения строк через разделитель.
function joinStrings(arr: string[], separator: string): string {
    return arr.join(separator);
}

//3. Функция для сортировки объектов по свойству.

function sortByProperty<T>(arr: T[], key: keyof T): T[] {
    // Создаем копию массива перед сортировкой, чтобы избежать мутаций.
    return [...arr].sort((a, b) => {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
        return 0;
    });
}
//4. Функция-декоратор для логирования вызовов.

function withLogging<F extends (...args: any[]) => any>(fn: F): F {
    return function (...args: Parameters<F>): ReturnType<F> {
        console.log(`Вызвана функция ${fn.name} с аргументами:`, args);
        return fn(...args);
    } as F;
}

// ===== Примеры использования ===== //

// 1. Фильтрация чисел
const numbers = [1, 2, 3, 4, 5, 6];
const filteredNumbers = filterMultiples(numbers, 2);
console.log("1) Числа, кратные 2:", filteredNumbers);

// 2. Объединение строк
const fruits = ["Apple", "Banana", "Cherry"];
const joinedFruits = joinStrings(fruits, ", ");
console.log("2) Объединённые фрукты:", joinedFruits);

// 3. Сортировка объектов
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Tema", age: 25 },
    { name: "Andre", age: 20 },
    { name: "anka", age: 30 },
];

const sortedPeople = sortByProperty(people, "age");
console.log("3) Люди, отсортированные по возрасту:", sortedPeople);
// 4. Логирование перед вызовом функции
const loggedFilter = withLogging(filterMultiples);
const result = loggedFilter([10, 15, 20, 25], 5);
console.log("4) Результат работы функции:", result);