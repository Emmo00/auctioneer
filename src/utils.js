const { ethers } = require("ethers");

export function hex2string(hex) {
  return ethers.toUtf8String(hex);
}

export function string2hex(payload) {
  return ethers.hexlify(ethers.toUtf8Bytes(payload));
}
