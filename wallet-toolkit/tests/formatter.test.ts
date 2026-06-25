import {
  formatEth,
  formatGwei,
  formatUsd,
} from "../src/formatter/index.js";

describe("formatEth", () => {
  it("formats numbers with default decimals", () => {
    expect(formatEth(1.23456789)).toBe("1.2346 ETH");
  });

  it("formats string values", () => {
    expect(formatEth("2.5", 2)).toBe("2.50 ETH");
  });

  it("throws for invalid values", () => {
    expect(() => formatEth("abc")).toThrow("Invalid numeric value");
    expect(() => formatEth(NaN)).toThrow("Invalid numeric value");
  });

  it("throws for negative decimals", () => {
    expect(() => formatEth(1, -1)).toThrow("Decimals must be non-negative");
  });
});

describe("formatUsd", () => {
  it("formats USD values", () => {
    expect(formatUsd(1234.56)).toBe("$1,234.56");
  });

  it("supports custom decimals", () => {
    expect(formatUsd(10, 0)).toBe("$10");
  });
});

describe("formatGwei", () => {
  it("formats gwei values", () => {
    expect(formatGwei(25)).toBe("25 GWEI");
  });
});
