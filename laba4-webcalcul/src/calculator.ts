// Типы для калькулятора
type CalculatorState = {
    currentValue: string;
    previousValue: string;
    operation: string | null;
    resetScreen: boolean;
};

type OperationFunction = (a: number, b: number) => number;

// Начальное состояние
const initialState: CalculatorState = {
    currentValue: '0',
    previousValue: '',
    operation: null,
    resetScreen: false,
};

// Чистые функции для операций
const operations: Record<string, OperationFunction> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => Math.pow(a, b),
};

// Функции-помощники
const appendNumber = (state: CalculatorState, number: string): CalculatorState => {
    if (state.resetScreen) {
        return {
            ...state,
            currentValue: number,
            resetScreen: false,
        };
    }
    return {
        ...state,
        currentValue: state.currentValue === '0' ? number : state.currentValue + number,
    };
};

const appendDecimal = (state: CalculatorState): CalculatorState => {
    if (state.resetScreen) {
        return {
            ...state,
            currentValue: '0.',
            resetScreen: false,
        };
    }
    return {
        ...state,
        currentValue: state.currentValue.includes('.') ? state.currentValue : state.currentValue + '.',
    };
};

const setOperation = (state: CalculatorState, operation: string): CalculatorState => ({
    ...state,
    previousValue: state.currentValue,
    operation,
    resetScreen: true,
});

const calculate = (state: CalculatorState): CalculatorState => {
    if (state.operation === null) return state;

    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);
    let result = 0;

    if (state.operation in operations) {
        result = operations[state.operation](prev, current);
    }

    return {
        ...state,
        currentValue: result.toString(),
        previousValue: '',
        operation: null,
        resetScreen: true,
    };
};

const calculateSquareRoot = (state: CalculatorState): CalculatorState => ({
    ...state,
    currentValue: Math.sqrt(parseFloat(state.currentValue)).toString(),
    resetScreen: true,
});

const clear = (): CalculatorState => ({ ...initialState });

const deleteLastChar = (state: CalculatorState): CalculatorState => ({
    ...state,
    currentValue: state.currentValue.length > 1 ? state.currentValue.slice(0, -1) : '0',
});

// Главная функция обработки действий
const reducer = (state: CalculatorState, action: string): CalculatorState => {
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
    const display = document.getElementById('display') as HTMLInputElement;
    let state = initialState;

    const updateDisplay = () => {
        display.value = state.currentValue;
    };

    const handleButtonClick = (event: Event) => {
        const target = event.target as HTMLButtonElement;
        if (!target.matches('.btn')) return;

        const value = target.dataset.value;
        if (!value) return;

        state = reducer(state, value);
        updateDisplay();
    };

    document.querySelector('.buttons')?.addEventListener('click', handleButtonClick);
    updateDisplay();
});