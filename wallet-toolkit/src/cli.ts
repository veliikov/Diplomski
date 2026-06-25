#!/usr/bin/env node

import {
  getNetworkName,
  isValidEthereumAddress,
  shortenAddress,
} from "./index.js";

const [, , command, ...args] = process.argv;

const printUsage = (): void => {
  console.log(`wallet-toolkit — Web3 utility CLI

Usage:
  wallet-toolkit shorten <address> [start] [end]
  wallet-toolkit validate <address>
  wallet-toolkit network <chainId>

Examples:
  wallet-toolkit shorten 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
  wallet-toolkit validate 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
  wallet-toolkit network 11155111
`);
};

const run = (): void => {
  if (!command) {
    printUsage();
    process.exit(1);
  }

  try {
    switch (command) {
      case "shorten": {
        const [address, startArg, endArg] = args;
        if (!address) {
          throw new Error("Address is required");
        }
        const start = startArg ? Number(startArg) : undefined;
        const end = endArg ? Number(endArg) : undefined;
        console.log(shortenAddress(address, start, end));
        break;
      }
      case "validate": {
        const [address] = args;
        if (!address) {
          throw new Error("Address is required");
        }
        console.log(isValidEthereumAddress(address) ? "valid" : "invalid");
        process.exit(isValidEthereumAddress(address) ? 0 : 1);
        break;
      }
      case "network": {
        const [chainIdArg] = args;
        if (!chainIdArg) {
          throw new Error("Chain ID is required");
        }
        const chainId = Number(chainIdArg);
        if (!Number.isInteger(chainId)) {
          throw new Error("Chain ID must be an integer");
        }
        console.log(getNetworkName(chainId));
        break;
      }
      default:
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error: ${message}`);
    process.exit(1);
  }
};

run();
