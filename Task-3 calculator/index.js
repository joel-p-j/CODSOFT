// index.js

const buttons = document.querySelectorAll(".box");
const display = document.getElementById("input-calc");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let operator = "";
let previousInput = "";
let fullExpression = "";

// Function to handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    if (["+", "-", "*", "/"].includes(value)) {
      // Handle operator input
      if (currentInput !== "") {
        operator = value;
        previousInput = currentInput;
        fullExpression += currentInput + " " + operator + " ";
        currentInput = "";
        display.value = fullExpression;
      }
    } else if (value === ".") {
      // Handle decimal point
      if (!currentInput.includes(".")) {
        currentInput += value;
        display.value = fullExpression + currentInput;
      }
    } else if (value === "C") {
      // Handle clear button
      clearCalculator();
    } else {
      // Handle number input
      currentInput += value;
      display.value = fullExpression + currentInput;
    }
  });
});

// Function to evaluate the expression
equalsButton.addEventListener("click", () => {
  if (operator && currentInput && previousInput) {
    fullExpression += currentInput;
    const calculation = calculateResult(previousInput, currentInput, operator);
    display.value = calculation;
    currentInput = calculation;
    previousInput = "";
    operator = "";
    fullExpression = ""; // Clear the full expression after evaluation
  }
});

// Function to perform the calculation
function calculateResult(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return b;
  }
}

// Function to clear the calculator
function clearCalculator() {
  currentInput = "";
  previousInput = "";
  operator = "";
  fullExpression = "";
  display.value = "0";
}

// Handle the clear button
clearButton.addEventListener("click", clearCalculator);
