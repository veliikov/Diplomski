const parseNumeric = (value: number | string): number => {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error("Invalid numeric value");
  }
  return parsed;
};

export const formatEth = (
  balance: number | string,
  decimals = 4
): string => {
  if (decimals < 0) {
    throw new Error("Decimals must be non-negative");
  }

  const value = parseNumeric(balance);
  return `${value.toFixed(decimals)} ETH`;
};

export const formatUsd = (amount: number, decimals = 2): string => {
  if (decimals < 0) {
    throw new Error("Decimals must be non-negative");
  }

  const value = parseNumeric(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatGwei = (value: number): string => {
  const parsed = parseNumeric(value);
  return `${parsed} GWEI`;
};
