import { findNetworkByName } from "../network/index.js";

const ADDRESS_PATH = "/address/";
const TRANSACTION_PATH = "/tx/";

export const getAddressExplorerUrl = (
  address: string,
  network: string
): string => {
  const definition = findNetworkByName(network);
  if (!definition) {
    throw new Error(`Unsupported network: ${network}`);
  }

  return `${definition.explorerBaseUrl}${ADDRESS_PATH}${address}`;
};

export const getTransactionExplorerUrl = (
  hash: string,
  network: string
): string => {
  const definition = findNetworkByName(network);
  if (!definition) {
    throw new Error(`Unsupported network: ${network}`);
  }

  return `${definition.explorerBaseUrl}${TRANSACTION_PATH}${hash}`;
};
