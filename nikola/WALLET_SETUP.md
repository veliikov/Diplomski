# Wallet & test purchases

## Prerequisites

1. Install [MetaMask](https://metamask.io) in your browser.
2. Add **Sepolia** test network in MetaMask.
3. Get free test ETH from a Sepolia faucet (search "Sepolia faucet").

## Configure recipient address

Open `src/js/config.js` and replace:

```js
export const MARKETPLACE_WALLET = "0xYOUR_SEPOLIA_WALLET_ADDRESS";
```

with your own Sepolia wallet address (the account that should receive payments).

For testing, you can use the same address as the buyer wallet.

## Run the app

From the `nikola` folder:

```bash
npm run json-server   # terminal 1 — API on http://localhost:3000
npm run dev           # terminal 2 — Sass + Pug
```

Open `src/pug/pages/index.html` in the browser (via Live Server or similar).

## Connect wallet

1. Scroll to the footer and click **Connect a wallet**.
2. Approve the connection in MetaMask (Sepolia testnet).

When connected, the footer link shows your shortened address. Click it again to disconnect.

## Buy flow

1. Connect your wallet from the footer.
2. Confirm the network switches to **Sepolia**.
3. Click **Buy Now** on an NFT — MetaMask opens a payment confirmation.
4. After confirmation, a modal shows the Etherscan link and the transaction is saved to `POST /transactions` in json-server.

## Troubleshooting

- **"Configure MARKETPLACE_WALLET"** — set a valid `0x…` address in `config.js`.
- **Transaction failed** — check Sepolia balance and that json-server is running.
- **Products not loading** — ensure `npm run json-server` uses `api/db.json`.
