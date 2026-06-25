import { keccak_256 } from "@noble/hashes/sha3";

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const shortenAddress = (
  address: string,
  start = 6,
  end = 4
): string => {
  if (!address || address.length <= start + end + 3) {
    throw new Error("Address is too short to shorten");
  }

  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

const toChecksumAddress = (address: string): string => {
  const lower = address.slice(2).toLowerCase();
  const hash = Array.from(keccak_256(new TextEncoder().encode(lower)))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  let checksum = "0x";

  for (let i = 0; i < lower.length; i += 1) {
    const char = lower[i];
    const hashNibble = parseInt(hash[i], 16);
    checksum += hashNibble >= 8 ? char.toUpperCase() : char;
  }

  return checksum;
};

const hasChecksumCasing = (address: string): boolean => {
  const body = address.slice(2);
  const hasUpper = /[A-F]/.test(body);
  const hasLower = /[a-f]/.test(body);
  return hasUpper && hasLower;
};

export const isValidEthereumAddress = (address: string): boolean => {
  if (!ADDRESS_REGEX.test(address)) {
    return false;
  }

  if (!hasChecksumCasing(address)) {
    return true;
  }

  return address === toChecksumAddress(address);
};

export const normalizeAddress = (address: string): string => {
  if (!ADDRESS_REGEX.test(address)) {
    throw new Error("Invalid Ethereum address");
  }

  return address.toLowerCase();
};

export const toChecksumAddressSafe = (address: string): string => {
  if (!ADDRESS_REGEX.test(address)) {
    throw new Error("Invalid Ethereum address");
  }

  return toChecksumAddress(address);
};
