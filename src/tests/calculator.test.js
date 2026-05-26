const {
  addition,
  subtraction,
  multiplication,
  division,
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
});

describe("calculate", () => {
  test("supports named operations", () => {
    expect(calculate("addition", 3, 2)).toBe(5);
    expect(calculate("subtraction", 3, 2)).toBe(1);
    expect(calculate("multiplication", 3, 2)).toBe(6);
    expect(calculate("division", 8, 2)).toBe(4);
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

  test("throws for unsupported operations", () => {
    expect(() => calculate("modulo", 10, 5)).toThrow(
      "Unsupported operation. Use addition, subtraction, multiplication, or division."
    );
  });
});

describe("runCli", () => {
  test("returns formatted results for valid named operations", () => {
    expect(runCli(["addition", "10", "5"])).toBe("Result: 15");
    expect(runCli(["division", "12", "3"])).toBe("Result: 4");
  });

  test("returns formatted results for symbol-based operations", () => {
    expect(runCli(["+", "2", "3"])).toBe("Result: 5");
    expect(runCli(["-", "10", "4"])).toBe("Result: 6");
    expect(runCli(["*", "45", "2"])).toBe("Result: 90");
    expect(runCli(["/", "20", "5"])).toBe("Result: 4");
  });

  test("rejects missing arguments with usage guidance", () => {
    expect(() => runCli(["addition", "10"])).toThrow(
      "Usage: node src/calculator.js <operation> <number1> <number2>"
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
});
