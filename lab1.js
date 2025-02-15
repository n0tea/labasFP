// Разработайте набор чистых функций для работы с массивами:
// функции должны быть чистыми, то есть не иметь побочных эффектов и всегда возвращать одинаковый результат при одинаковых аргументах
const filterEvenNumbers = (numbers) => numbers.filter(n => n % 2 === 0);
const squareNumbers = (numbers) => numbers.map(n => n * n);
const filterByProperty = (objects, property) => objects.filter(obj => Object.hasOwn(obj, property));
const sumNumbers = (numbers) => numbers.reduce((acc, n) => acc + n, 0);

// Функция высшего порядка
const applyFunctionToArray = (func, array) => array.map(func);

// Пример использования
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const objects = [
    { value: 10 },
    { str: "kepka" },
    { value: 30 },
    { value: 40 },
    { value: 50 }
];
//Используя разработанные функции, выполните следующие математические операции:
// Сумма квадратов всех чётных чисел
const sumOfSquaresOfEvens = sumNumbers(squareNumbers(filterEvenNumbers(numbers)));
console.log(sumOfSquaresOfEvens);

// Среднее арифметическое всех чисел, больших заданного значения, в массиве объектов
const threshold = 25;
const getValue = (obj)=> obj.value;
const values = applyFunctionToArray(getValue, filterByProperty(objects, 'value').filter(obj => obj.value > threshold));
//const filteredObjects = filterByProperty(objects, 'value').filter(obj => obj.value > threshold);
//const values = filteredObjects.map(obj => obj.value);
const average = sumNumbers(values) / values.length;
console.log(average); 