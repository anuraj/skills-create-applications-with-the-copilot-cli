#!/usr/bin/env node

/**
 * Supported operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/, ÷)
 * - modulo (%)
 * - power (^, **)
 * - square root (sqrt, √)
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
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
  division,
  "%": modulo,
  mod: modulo,
  modulo,
  "^": power,
  "**": power,
  power,
  exponentiation: power,
  "√": squareRoot,
  sqrt: squareRoot,
  squareroot: squareRoot,
  squareRoot
};

const unaryOperations = new Set(["√", "sqrt", "squareroot", "squareRoot"]);

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
      "Unsupported operation. Use addition, subtraction, multiplication, division, modulo, power, or square root."
    );
  }

  if (unaryOperations.has(operation)) {
    return handler(leftOperand);
  }

  return handler(leftOperand, rightOperand);
}

function getUsageText() {
  return [
    "Usage: node src/calculator.js <operation> <number1> [number2]",
    "",
    "Supported operations: addition (+), subtraction (-), multiplication (*, x), division (/, ÷), modulo (%), power (^, **), square root (sqrt, √)",
    "Use square root with a single number, for example: node src/calculator.js sqrt 16"
  ].join("\n");
}

function runCli(args) {
  if (args.length < 2 || args.length > 3) {
    throw new Error(getUsageText());
  }

  const [operation, leftRaw, rightRaw] = args;
  const leftOperand = parseNumber(leftRaw, "The first value");
  const requiresOneOperand = unaryOperations.has(operation);

  if (requiresOneOperand && args.length !== 2) {
    throw new Error(getUsageText());
  }

  if (!requiresOneOperand && args.length !== 3) {
    throw new Error(getUsageText());
  }

  const rightOperand = requiresOneOperand
    ? undefined
    : parseNumber(rightRaw, "The second value");
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
  modulo,
  power,
  squareRoot,
  calculate,
  runCli
};
