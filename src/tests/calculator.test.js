const test = require('node:test');
const assert = require('node:assert/strict');
const {
  modulo,
  power,
  squareRoot,
} = require('../calculator');

test('modulo returns the remainder', () => {
  assert.equal(modulo(10, 3), 1);
});

test('modulo throws for divisor of zero', () => {
  assert.throws(
    () => modulo(10, 0),
    /Modulo by zero is not allowed\./,
  );
});

test('power returns base raised to exponent', () => {
  assert.equal(power(2, 5), 32);
});

test('squareRoot returns the square root for non-negative input', () => {
  assert.equal(squareRoot(81), 9);
});

test('squareRoot throws for negative input', () => {
  assert.throws(
    () => squareRoot(-1),
    /Square root of negative numbers is not allowed\./,
  );
});
