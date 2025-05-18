"use strict";
// Начальное состояние
const initialState = {
    currentValue: '0',
    previousValue: '',
    operation: null,
    resetScreen: false,
    displayedOperation: '',
};
// Чистые функции для операций
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b),
};
// Функции-помощники
const appendNumber = (state, number) => {
    if (state.resetScreen) {
        return Object.assign(Object.assign({}, state), { currentValue: number, resetScreen: false });
    }
    return Object.assign(Object.assign({}, state), { currentValue: state.currentValue === '0' ? number : state.currentValue + number });
};
const appendDecimal = (state) => {
    if (state.resetScreen) {
        return Object.assign(Object.assign({}, state), { currentValue: '0.', resetScreen: false });
    }
    return Object.assign(Object.assign({}, state), { currentValue: state.currentValue.includes('.') ? state.currentValue : state.currentValue + '.' });
};
const setOperation = (state, operation) => (Object.assign(Object.assign({}, state), { previousValue: state.currentValue, operation, displayedOperation: operation, resetScreen: true }));
const calculate = (state) => {
    if (state.operation === null)
        return state;
    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);
    let result = 0;
    if (state.operation in operations) {
        result = operations[state.operation](prev, current);
    }
    return Object.assign(Object.assign({}, state), { currentValue: result.toString(), previousValue: '', operation: null, displayedOperation: '', resetScreen: true });
};
const calculateSquareRoot = (state) => (Object.assign(Object.assign({}, state), { currentValue: Math.sqrt(parseFloat(state.currentValue)).toString(), resetScreen: true }));
const clear = () => (Object.assign({}, initialState));
const deleteLastChar = (state) => (Object.assign(Object.assign({}, state), { currentValue: state.currentValue.length > 1 ? state.currentValue.slice(0, -1) : '0' }));
// Главная функция обработки действий
const reducer = (state, action) => {
    switch (action) {
        case 'C':
            return clear();
        case 'DEL':
            return deleteLastChar(state);
        case '√':
            return calculateSquareRoot(state);
        case '=':
            return calculate(state);
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
            return setOperation(state, action);
        case '.':
            return appendDecimal(state);
        default:
            if (/[0-9]/.test(action)) {
                return appendNumber(state, action);
            }
            return state;
    }
};
// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    const display = document.getElementById('display');
    let state = initialState;
    const updateDisplay = () => {
        display.value = state.currentValue;
        const operationDisplay = document.getElementById('operationDisplay');
        operationDisplay.textContent = state.displayedOperation;
    };
    const handleButtonClick = (event) => {
        const target = event.target;
        if (!target.matches('.btn'))
            return;
        const value = target.dataset.value;
        if (!value)
            return;
        state = reducer(state, value);
        updateDisplay();
    };
    (_a = document.querySelector('.buttons')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleButtonClick);
    updateDisplay();
});
