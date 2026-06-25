import {
  ARBITRUM,
  BASE,
  ETHEREUM_MAINNET,
  POLYGON,
  SEPOLIA,
} from "../constants/index.js";

export interface NetworkDefinition {
  chainId: number;
  name: string;
  aliases: string[];
  isTestnet: boolean;
  explorerBaseUrl: string;
}

export const NETWORKS: readonly NetworkDefinition[] = [
  {
    chainId: ETHEREUM_MAINNET,
    name: "Ethereum Mainnet",
    aliases: ["ethereum", "ethereum mainnet", "mainnet", "eth"],
    isTestnet: false,
    explorerBaseUrl: "https://etherscan.io",
  },
  {
    chainId: SEPOLIA,
    name: "Sepolia",
    aliases: ["sepolia", "sepolia testnet"],
    isTestnet: true,
    explorerBaseUrl: "https://sepolia.etherscan.io",
  },
  {
    chainId: POLYGON,
    name: "Polygon",
    aliases: ["polygon", "matic"],
    isTestnet: false,
    explorerBaseUrl: "https://polygonscan.com",
  },
  {
    chainId: ARBITRUM,
    name: "Arbitrum",
    aliases: ["arbitrum", "arbitrum one"],
    isTestnet: false,
    explorerBaseUrl: "https://arbiscan.io",
  },
  {
    chainId: BASE,
    name: "Base",
    aliases: ["base"],
    isTestnet: false,
    explorerBaseUrl: "https://basescan.org",
  },
] as const;

const normalizeKey = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

export const findNetworkByChainId = (
  chainId: number
): NetworkDefinition | undefined =>
  NETWORKS.find((network) => network.chainId === chainId);

export const findNetworkByName = (
  networkName: string
): NetworkDefinition | undefined => {
  const key = normalizeKey(networkName);

  return NETWORKS.find(
    (network) =>
      normalizeKey(network.name) === key ||
      network.aliases.some((alias) => normalizeKey(alias) === key)
  );
};

export const getNetworkName = (chainId: number): string => {
  const network = findNetworkByChainId(chainId);
  if (!network) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  return network.name;
};

export const getChainId = (networkName: string): number => {
  const network = findNetworkByName(networkName);
  if (!network) {
    throw new Error(`Unsupported network: ${networkName}`);
  }
  return network.chainId;
};

export const isTestnet = (chainId: number): boolean => {
  const network = findNetworkByChainId(chainId);
  if (!network) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  return network.isTestnet;
};
