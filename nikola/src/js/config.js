/** API & blockchain config — adjust before testing purchases */
export const API_BASE = "http://localhost:3000";

/**
 * Sepolia address that receives ETH when users buy NFTs.
 * For testing, paste your own MetaMask Sepolia address here.
 */
export const MARKETPLACE_WALLET = "0x6795DDb2fA7e6c5F36DeED24C19B4daa46228561";

export const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";

export const isMarketplaceConfigured = () =>
  /^0x[a-fA-F0-9]{40}$/.test(MARKETPLACE_WALLET) &&
  MARKETPLACE_WALLET !== "0xYOUR_SEPOLIA_WALLET_ADDRESS";
