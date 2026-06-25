import {
  getAddressExplorerUrl,
  getTransactionExplorerUrl,
} from "../src/explorer/index.js";

const ADDRESS = "0x742d35cc6634c0532925a3b844bc454e4438f44e";
const TX_HASH =
  "0x2a2392fcee4584656489b4f7f7345286aa51a2f51a1c7951cdcaacaf458f13e4";

describe("explorer URLs", () => {
  it("builds ethereum address URLs", () => {
    expect(getAddressExplorerUrl(ADDRESS, "ethereum")).toBe(
      `https://etherscan.io/address/${ADDRESS}`
    );
  });

  it("builds sepolia transaction URLs", () => {
    expect(getTransactionExplorerUrl(TX_HASH, "sepolia")).toBe(
      `https://sepolia.etherscan.io/tx/${TX_HASH}`
    );
  });

  it("builds polygon and arbitrum URLs", () => {
    expect(getAddressExplorerUrl(ADDRESS, "polygon")).toBe(
      `https://polygonscan.com/address/${ADDRESS}`
    );
    expect(getTransactionExplorerUrl(TX_HASH, "arbitrum")).toBe(
      `https://arbiscan.io/tx/${TX_HASH}`
    );
  });

  it("builds base URLs", () => {
    expect(getAddressExplorerUrl(ADDRESS, "base")).toBe(
      `https://basescan.org/address/${ADDRESS}`
    );
  });

  it("throws for unsupported networks", () => {
    expect(() => getAddressExplorerUrl(ADDRESS, "unknown")).toThrow(
      "Unsupported network"
    );
    expect(() => getTransactionExplorerUrl(TX_HASH, "unknown")).toThrow(
      "Unsupported network"
    );
  });
});
