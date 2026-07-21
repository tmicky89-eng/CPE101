const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');
let currentInput = '';
let shouldReset = false;

function appendValue(value) {
    if (shouldReset) {
        if (!isNaN(value) || value === '.') {
            currentInput = '';
        }
        shouldReset = false;
    }

    if (value === '0' && currentInput === '0') return;
    
    currentInput += value;
    updateDisplay();
}

function deleteLast() {
    if (shouldReset) {
        clearDisplay();
        return;
    }
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    expressionDiv.innerText = '';
    resultDiv.innerText = '0';
    shouldReset = false;
}

function updateDisplay() {
    let formattedInput = currentInput
        .replace(/\*/g, ' × ')
        .replace(/\//g, ' ÷ ')
        .replace(/\+/g, ' + ')
        .replace(/\-/g, ' - ');

    resultDiv.innerText = formattedInput || '0';
}

function calculate() {
    if (!currentInput) return;

    try {
        let expressionToDisplay = currentInput
            .replace(/\*/g, '×')
            .replace(/\//g, '÷');

        expressionDiv.innerText = expressionToDisplay + ' =';

        let finalResult = new Function(`return ${currentInput}`)();

        if (finalResult % 1 !== 0) {
            finalResult = parseFloat(finalResult.toFixed(8));
        }

        resultDiv.innerText = finalResult;
        currentInput = finalResult.toString();
        shouldReset = true;
    } catch (error) {
        resultDiv.innerText = 'Error';
        currentInput = '';
        shouldReset = true;
    }
}