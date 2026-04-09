const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let waitingForOperand = false;

function updateDisplay() {
    if (currentInput === '') {
        display.value = '0';
    } else {
        display.value = currentInput;
    }
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForOperand) {
        currentInput = number;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (waitingForOperand) {
        currentInput = '0.';
        waitingForOperand = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.'
    }
    updateDisplay();
}

function calculate() {
    if (operator === null || previousInput === '' || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Sorry! That is impossible!';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
        
    }

    currentInput = result.toString();
    previousInput = '';
    operator = null;
    waitingForOperand = true;
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === '') {
        return;
    }
    if (previousInput !== '' && operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    waitingForOperand = true;
}

function equals() {
    if (operator === null || previousInput === '' || currentInput === '') return;
    calculate();
    waitingForOperand = true;
}

// Number buttons
document.querySelectorAll('.number').forEach(btn => {
    btn.addEventListener('click', () => {
        appendNumber(btn.textContent);
    });
});

// Operator buttons
document.querySelectorAll('.operator').forEach(btn => {
    btn.addEventListener('click', () => {
        handleOperator(btn.textContent);
    });
});

document.querySelector('.clear').addEventListener('click', clearAll);
document.querySelector('.equals').addEventListener('click', equals);
document.querySelector('.decimal').addEventListener('click', appendDecimal);

clearAll();
