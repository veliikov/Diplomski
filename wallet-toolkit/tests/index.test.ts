import {
  ETHEREUM_MAINNET,
  SEPOLIA,
  formatEth,
  getChainId,
  getTransactionExplorerUrl,
  isValidEthereumAddress,
  shortenAddress,
} from "../src/index.js";

describe("public exports", () => {
  it("re-exports core utilities", () => {
    expect(shortenAddress("0x742d35cc6634c0532925a3b844bc454e4438f44e")).toBe(
      "0x742d...f44e"
    );
    expect(formatEth(1)).toBe("1.0000 ETH");
    expect(getChainId("sepolia")).toBe(SEPOLIA);
    expect(
      getTransactionExplorerUrl(
        "0xabc",
        "ethereum"
      )
    ).toBe("https://etherscan.io/tx/0xabc");
    expect(isValidEthereumAddress("0x742d35cc6634c0532925a3b844bc454e4438f44e")).toBe(
      true
    );
    expect(ETHEREUM_MAINNET).toBe(1);
  });
});
