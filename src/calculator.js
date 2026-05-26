function assertNumber(value, label) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError(`${label} must be a valid number.`);
  }
}

function addition(a, b) {
  assertNumber(a, 'First operand');
  assertNumber(b, 'Second operand');
  return a + b;
}

function subtraction(a, b) {
  assertNumber(a, 'First operand');
  assertNumber(b, 'Second operand');
  return a - b;
}

function multiplication(a, b) {
  assertNumber(a, 'First operand');
  assertNumber(b, 'Second operand');
  return a * b;
}

function division(a, b) {
  assertNumber(a, 'First operand');
  assertNumber(b, 'Second operand');
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return a / b;
}

function modulo(a, b) {
  assertNumber(a, 'First operand');
  assertNumber(b, 'Second operand');
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  assertNumber(base, 'Base');
  assertNumber(exponent, 'Exponent');
  return base ** exponent;
}

function squareRoot(n) {
  assertNumber(n, 'Input');
  if (n < 0) {
    throw new Error('Square root of negative numbers is not allowed.');
  }

  return Math.sqrt(n);
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
};
