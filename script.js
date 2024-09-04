// Basic math operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

function percentage(a, b) {
  return (a * b) / 100;
}

function roundResult(number) {
  return Math.round(number * 1000000) / 1000000;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  let result;
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
    case '%':
      result = percentage(a, b);
      break;
    default:
      return "Error: Invalid operator";
  }
  return roundResult(result);
}

// DOM elements
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.btn.number');
const operatorButtons = document.querySelectorAll('.btn.operator');
const equalsButton = document.querySelector('.btn.equals');
const clearButton = document.querySelector('.btn.clear');
const decimalButton = document.querySelector('.btn.decimal');
const backspaceButton = document.querySelector('.btn.backspace');
const percentageButton = document.querySelector('.btn.percentage');

// Variables
let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '0';
let resetDisplay = false;

// Functions
function updateDisplay() {
  displayValue = displayValue.trim().replace(/\s+/g, '');
  
  const maxLength = 12;
  if (displayValue.length > maxLength) {
    displayValue = displayValue.slice(0, maxLength);
  }
  
  display.textContent = displayValue;
}

function handleNumberClick(number) {
  // Check if display needs to be reset
  if (resetDisplay) {
    displayValue = number;
    resetDisplay = false;
  } else {
    if (displayValue === '0' && number !== '.') {
      displayValue = number;
    } else {
      displayValue += number;
    }
  }
  updateDisplay();
}

function handleOperatorClick(op) {
  if (operator !== '' && !resetDisplay) {
    handleEqualsClick();
  }
  firstNumber = displayValue;
  operator = op;
  resetDisplay = true;
}

function handleEqualsClick() {
  if (operator === '') return;

  secondNumber = displayValue;
  
  let result = operate(operator, firstNumber, secondNumber);
  
  displayValue = result.toString();
  updateDisplay();
  
  firstNumber = displayValue;
  operator = '';
  resetDisplay = true;
}

function handleClearClick() {
  displayValue = '0';
  firstNumber = '';
  operator = '';
  secondNumber = '';
  resetDisplay = false;
  updateDisplay();
}

function handleDecimalClick() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function handleBackspaceClick() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = '0';
  }
  updateDisplay();
}

function handlePercentageClick() {
  if (operator === '') {
    displayValue = (parseFloat(displayValue) / 100).toString();
  } else {
    secondNumber = displayValue;
    let result = operate('%', firstNumber, secondNumber);
    displayValue = result.toString();
  }
  updateDisplay();
}

// Attach Event listeners (Ensuring each one is only attached once)
numberButtons.forEach(button => {
  button.removeEventListener('click', () => handleNumberClick(button.textContent)); // Prevents duplicate event listeners
  button.addEventListener('click', () => handleNumberClick(button.textContent));
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => handleOperatorClick(button.textContent));
});

equalsButton.addEventListener('click', handleEqualsClick);
clearButton.addEventListener('click', handleClearClick);
decimalButton.addEventListener('click', handleDecimalClick);
backspaceButton.addEventListener('click', handleBackspaceClick);
percentageButton.addEventListener('click', handlePercentageClick);

// Prevent multiple event listeners on document for keyboard support
document.removeEventListener('keydown', handleKeyboardInput); // Remove previous listeners to avoid duplicate events

function handleKeyboardInput(event) {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    handleNumberClick(key);
  } else if (key === '.') {
    handleDecimalClick();
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleOperatorClick(key);
  } else if (key === 'Enter' || key === '=') {
    handleEqualsClick();
  } else if (key === 'Backspace') {
    handleBackspaceClick();
  } else if (key === 'Escape') {
    handleClearClick();
  } else if (key === '%') {
    handlePercentageClick();
  }
}

// Add keyboard support
document.addEventListener('keydown', handleKeyboardInput);

// Initialize display
updateDisplay();
