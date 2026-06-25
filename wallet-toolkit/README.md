# wallet-toolkit

Lightweight Web3 utility library for wallet addresses, value formatting, blockchain networks, and block explorer URLs.

## Installation

```bash
npm install wallet-toolkit
```

Local development (monorepo / diploma project):

```bash
npm install ../wallet-toolkit
```

## Quick start

```ts
import {
  shortenAddress,
  isValidEthereumAddress,
  formatEth,
  getChainId,
  getTransactionExplorerUrl,
  SEPOLIA,
} from "wallet-toolkit";

shortenAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
// "0x742d...f44e"

formatEth(1.23456789);
// "1.2346 ETH"

getChainId("sepolia");
// 11155111

getTransactionExplorerUrl("0xabc...", "sepolia");
// "https://sepolia.etherscan.io/tx/0xabc..."
```

## Browser usage (no bundler)

After building the package, import the browser bundle:

```html
<script type="module">
  import { shortenAddress } from "./node_modules/wallet-toolkit/dist/wallet-toolkit.browser.js";
  console.log(shortenAddress("0x742d35cc6634c0532925a3b844bc454e4438f44e"));
</script>
```

## CLI

```bash
npx wallet-toolkit shorten 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
# 0x742d...f44e

npx wallet-toolkit validate 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
# valid

npx wallet-toolkit network 11155111
# Sepolia
```

## API

### Address

| Function | Description |
|----------|-------------|
| `shortenAddress(address, start?, end?)` | Shortens a wallet address (`0x742d...f44e` by default) |
| `isValidEthereumAddress(address)` | Validates format and EIP-55 checksum when mixed case is used |
| `normalizeAddress(address)` | Lowercases a valid address |
| `toChecksumAddressSafe(address)` | Returns EIP-55 checksummed address |

### Formatter

| Function | Description |
|----------|-------------|
| `formatEth(balance, decimals?)` | Formats ETH values (`1.2346 ETH`) |
| `formatUsd(amount, decimals?)` | Formats USD (`$1,234.56`) |
| `formatGwei(value)` | Formats gas price (`25 GWEI`) |

### Network

| Function | Description |
|----------|-------------|
| `getNetworkName(chainId)` | Resolves chain ID to network name |
| `getChainId(networkName)` | Resolves network name or alias to chain ID |
| `isTestnet(chainId)` | Returns whether chain is a testnet |

### Explorer

| Function | Description |
|----------|-------------|
| `getAddressExplorerUrl(address, network)` | Block explorer URL for an address |
| `getTransactionExplorerUrl(hash, network)` | Block explorer URL for a transaction |

### Constants

| Constant | Value |
|----------|-------|
| `ETHEREUM_MAINNET` | `1` |
| `SEPOLIA` | `11155111` |
| `POLYGON` | `137` |
| `ARBITRUM` | `42161` |
| `BASE` | `8453` |

## Supported networks

| Network | Chain ID | Explorer |
|---------|----------|----------|
| Ethereum Mainnet | 1 | etherscan.io |
| Sepolia | 11155111 | sepolia.etherscan.io |
| Polygon | 137 | polygonscan.com |
| Arbitrum | 42161 | arbiscan.io |
| Base | 8453 | basescan.org |

Network names are case-insensitive. Aliases include `mainnet`, `eth`, `matic`, `arbitrum one`.

## Development

```bash
npm install
npm run build
npm test
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Run `npm run test:coverage` (minimum 90% coverage)
5. Open a pull request

## License

MIT © Nikola Velikov
