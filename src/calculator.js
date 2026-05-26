#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/, ÷)
 */
function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

const operationHandlers = {
  "+": addition,
  add: addition,
  addition,
  "-": subtraction,
  subtract: subtraction,
  subtraction,
  "*": multiplication,
  x: multiplication,
  X: multiplication,
  multiply: multiplication,
  multiplication,
  "/": division,
  "÷": division,
  divide: division,
  division
};

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return parsedValue;
}

function calculate(operation, leftOperand, rightOperand) {
  const handler = operationHandlers[operation];

  if (!handler) {
    throw new Error(
      "Unsupported operation. Use addition, subtraction, multiplication, or division."
    );
  }

  return handler(leftOperand, rightOperand);
}

function getUsageText() {
  return [
    "Usage: node src/calculator.js <operation> <number1> <number2>",
    "",
    "Supported operations: addition (+), subtraction (-), multiplication (*, x), division (/, ÷)"
  ].join("\n");
}

function runCli(args) {
  if (args.length !== 3) {
    throw new Error(getUsageText());
  }

  const [operation, leftRaw, rightRaw] = args;
  const leftOperand = parseNumber(leftRaw, "The first value");
  const rightOperand = parseNumber(rightRaw, "The second value");
  const result = calculate(operation, leftOperand, rightOperand);

  return `Result: ${result}`;
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli
};
