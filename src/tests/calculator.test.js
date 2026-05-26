const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli
} = require("../calculator");

describe("calculator arithmetic functions", () => {
  describe("addition", () => {
    test("adds positive numbers", () => {
      expect(addition(2, 3)).toBe(5);
      expect(addition(125, 375)).toBe(500);
    });

    test("adds negative and decimal numbers", () => {
      expect(addition(-2, 3)).toBe(1);
      expect(addition(2.5, 0.5)).toBe(3);
    });
  });

  describe("subtraction", () => {
    test("subtracts numbers correctly", () => {
      expect(subtraction(10, 4)).toBe(6);
      expect(subtraction(3, 8)).toBe(-5);
    });

    test("subtracts decimal values", () => {
      expect(subtraction(5.5, 2.2)).toBeCloseTo(3.3);
    });
  });

  describe("multiplication", () => {
    test("multiplies numbers correctly", () => {
      expect(multiplication(45, 2)).toBe(90);
      expect(multiplication(-3, 4)).toBe(-12);
    });

    test("returns zero when either operand is zero", () => {
      expect(multiplication(0, 99)).toBe(0);
      expect(multiplication(12, 0)).toBe(0);
    });
  });

  describe("division", () => {
    test("divides numbers correctly", () => {
      expect(division(20, 5)).toBe(4);
      expect(division(7.5, 2.5)).toBe(3);
    });

    test("throws for division by zero", () => {
      expect(() => division(8, 0)).toThrow("Division by zero is not allowed.");
    });
  });

  describe("modulo", () => {
    test("returns the remainder correctly", () => {
      expect(modulo(10, 3)).toBe(1);
      expect(modulo(20, 5)).toBe(0);
    });

    test("matches the extended operations example", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("throws for modulo by zero", () => {
      expect(() => modulo(8, 0)).toThrow("Modulo by zero is not allowed.");
    });
  });

  describe("power", () => {
    test("raises the base to the exponent", () => {
      expect(power(2, 8)).toBe(256);
      expect(power(9, 0.5)).toBe(3);
    });

    test("matches the extended operations example", () => {
      expect(power(2, 3)).toBe(8);
    });
  });

  describe("squareRoot", () => {
    test("returns the square root of a non-negative number", () => {
      expect(squareRoot(16)).toBe(4);
      expect(squareRoot(2)).toBeCloseTo(1.41421356237);
    });

    test("matches the extended operations example", () => {
      expect(squareRoot(16)).toBe(4);
      expect(squareRoot(0)).toBe(0);
    });

    test("throws for negative numbers", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Square root of a negative number is not allowed."
      );
    });
  });
});

describe("calculate", () => {
  test("supports named operations", () => {
    expect(calculate("addition", 3, 2)).toBe(5);
    expect(calculate("subtraction", 3, 2)).toBe(1);
    expect(calculate("multiplication", 3, 2)).toBe(6);
    expect(calculate("division", 8, 2)).toBe(4);
    expect(calculate("modulo", 10, 3)).toBe(1);
    expect(calculate("power", 2, 8)).toBe(256);
    expect(calculate("squareRoot", 16)).toBe(4);
  });

  test("supports operation symbols from the calculator image", () => {
    expect(calculate("+", 2, 3)).toBe(5);
    expect(calculate("-", 10, 4)).toBe(6);
    expect(calculate("*", 45, 2)).toBe(90);
    expect(calculate("/", 20, 5)).toBe(4);
  });

  test("supports alternate multiplication and division symbols", () => {
    expect(calculate("x", 5, 4)).toBe(20);
    expect(calculate("X", 5, 4)).toBe(20);
    expect(calculate("÷", 8, 4)).toBe(2);
  });

  test("supports symbols for modulo and power and aliases for square root", () => {
    expect(calculate("%", 10, 3)).toBe(1);
    expect(calculate("^", 2, 4)).toBe(16);
    expect(calculate("**", 2, 4)).toBe(16);
    expect(calculate("sqrt", 25)).toBe(5);
    expect(calculate("√", 16)).toBe(4);
  });

  test("supports the exact extended operation examples", () => {
    expect(calculate("%", 5, 2)).toBe(1);
    expect(calculate("^", 2, 3)).toBe(8);
    expect(calculate("√", 16)).toBe(4);
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("cube", 10, 5)).toThrow(
      "Unsupported operation. Use addition, subtraction, multiplication, division, modulo, power, or square root."
    );
  });
});

describe("runCli", () => {
  test("returns formatted results for valid named operations", () => {
    expect(runCli(["addition", "10", "5"])).toBe("Result: 15");
    expect(runCli(["division", "12", "3"])).toBe("Result: 4");
    expect(runCli(["modulo", "10", "3"])).toBe("Result: 1");
    expect(runCli(["power", "2", "8"])).toBe("Result: 256");
    expect(runCli(["sqrt", "16"])).toBe("Result: 4");
  });

  test("returns formatted results for symbol-based operations", () => {
    expect(runCli(["+", "2", "3"])).toBe("Result: 5");
    expect(runCli(["-", "10", "4"])).toBe("Result: 6");
    expect(runCli(["*", "45", "2"])).toBe("Result: 90");
    expect(runCli(["/", "20", "5"])).toBe("Result: 4");
    expect(runCli(["%", "20", "6"])).toBe("Result: 2");
    expect(runCli(["^", "2", "3"])).toBe("Result: 8");
    expect(runCli(["√", "16"])).toBe("Result: 4");
  });

  test("returns formatted results for the extended operation examples", () => {
    expect(runCli(["%", "5", "2"])).toBe("Result: 1");
    expect(runCli(["^", "2", "3"])).toBe("Result: 8");
    expect(runCli(["√", "16"])).toBe("Result: 4");
  });

  test("rejects missing arguments with usage guidance", () => {
    expect(() => runCli(["addition", "10"])).toThrow(
      "Usage: node src/calculator.js <operation> <number1> [number2]"
    );
  });

  test("rejects extra arguments for square root", () => {
    expect(() => runCli(["sqrt", "16", "4"])).toThrow(
      "Usage: node src/calculator.js <operation> <number1> [number2]"
    );
  });

  test("rejects invalid first numeric input", () => {
    expect(() => runCli(["addition", "ten", "5"])).toThrow(
      "The first value must be a valid number."
    );
  });

  test("rejects invalid second numeric input", () => {
    expect(() => runCli(["addition", "10", "five"])).toThrow(
      "The second value must be a valid number."
    );
  });

  test("propagates division by zero errors", () => {
    expect(() => runCli(["division", "10", "0"])).toThrow(
      "Division by zero is not allowed."
    );
  });

  test("propagates modulo and square root validation errors", () => {
    expect(() => runCli(["modulo", "10", "0"])).toThrow(
      "Modulo by zero is not allowed."
    );
    expect(() => runCli(["sqrt", "-9"])).toThrow(
      "Square root of a negative number is not allowed."
    );
  });
});
