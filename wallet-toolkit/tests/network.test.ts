import {
  ARBITRUM,
  BASE,
  ETHEREUM_MAINNET,
  POLYGON,
  SEPOLIA,
} from "../src/constants/index.js";
import {
  findNetworkByChainId,
  findNetworkByName,
  getChainId,
  getNetworkName,
  isTestnet,
} from "../src/network/index.js";

describe("network registry", () => {
  it("exports expected chain IDs", () => {
    expect(ETHEREUM_MAINNET).toBe(1);
    expect(SEPOLIA).toBe(11155111);
    expect(POLYGON).toBe(137);
    expect(ARBITRUM).toBe(42161);
    expect(BASE).toBe(8453);
  });

  it("resolves network names by chain ID", () => {
    expect(getNetworkName(SEPOLIA)).toBe("Sepolia");
    expect(getNetworkName(ETHEREUM_MAINNET)).toBe("Ethereum Mainnet");
  });

  it("resolves chain IDs by network name and aliases", () => {
    expect(getChainId("sepolia")).toBe(SEPOLIA);
    expect(getChainId("Ethereum Mainnet")).toBe(ETHEREUM_MAINNET);
    expect(getChainId("matic")).toBe(POLYGON);
    expect(getChainId("arbitrum one")).toBe(ARBITRUM);
    expect(getChainId("base")).toBe(BASE);
  });

  it("detects testnets", () => {
    expect(isTestnet(SEPOLIA)).toBe(true);
    expect(isTestnet(ETHEREUM_MAINNET)).toBe(false);
  });

  it("throws for unsupported networks", () => {
    expect(() => getNetworkName(999999)).toThrow("Unsupported chain ID");
    expect(() => getChainId("unknown-network")).toThrow(
      "Unsupported network"
    );
    expect(() => isTestnet(999999)).toThrow("Unsupported chain ID");
  });

  it("finds networks by chain ID and name", () => {
    expect(findNetworkByChainId(BASE)?.name).toBe("Base");
    expect(findNetworkByName("polygon")?.chainId).toBe(POLYGON);
  });
});
