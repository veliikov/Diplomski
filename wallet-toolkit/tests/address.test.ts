import {
  isValidEthereumAddress,
  normalizeAddress,
  shortenAddress,
  toChecksumAddressSafe,
} from "../src/address/index.js";

const VALID_CHECKSUMMED =
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
const VALID_LOWERCASE =
  "0x742d35cc6634c0532925a3b844bc454e4438f44e";

describe("shortenAddress", () => {
  it("shortens with default start and end", () => {
    expect(shortenAddress(VALID_LOWERCASE)).toBe("0x742d...f44e");
  });

  it("shortens with custom start and end", () => {
    expect(shortenAddress(VALID_LOWERCASE, 8, 6)).toBe(
      "0x742d35...38f44e"
    );
  });

  it("throws for too short addresses", () => {
    expect(() => shortenAddress("0x1234")).toThrow(
      "Address is too short to shorten"
    );
  });
});

describe("isValidEthereumAddress", () => {
  it("accepts lowercase addresses", () => {
    expect(isValidEthereumAddress(VALID_LOWERCASE)).toBe(true);
  });

  it("accepts valid checksummed addresses", () => {
    expect(isValidEthereumAddress(VALID_CHECKSUMMED)).toBe(true);
  });

  it("rejects invalid checksum casing", () => {
    const invalidChecksum = VALID_CHECKSUMMED.replace("d8dA", "d8Da");
    expect(isValidEthereumAddress(invalidChecksum)).toBe(false);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEthereumAddress("0x123")).toBe(false);
    expect(isValidEthereumAddress("not-an-address")).toBe(false);
    expect(isValidEthereumAddress("")).toBe(false);
  });
});

describe("normalizeAddress", () => {
  it("returns lowercase address", () => {
    expect(normalizeAddress(VALID_CHECKSUMMED)).toBe(
      "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
    );
  });

  it("throws for invalid addresses", () => {
    expect(() => normalizeAddress("0xbad")).toThrow(
      "Invalid Ethereum address"
    );
  });
});

describe("toChecksumAddressSafe", () => {
  it("converts lowercase to checksum format", () => {
    const checksum = toChecksumAddressSafe(VALID_LOWERCASE);
    expect(isValidEthereumAddress(checksum)).toBe(true);
  });
});
