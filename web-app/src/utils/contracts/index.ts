import { ethers } from "ethers";

import { Token } from "../../../../smart-contracts/typechain/Token";
import { CONTRACT_ADDRESSES } from "../../config";
import tokenAbi from "./abis/token-abi";

export type Contracts = {
  token: Token;
};

export const getContracts = (
  network: general.SupportedNetworkName,
  signer: ethers.Signer
): Contracts => {
  const addresses = CONTRACT_ADDRESSES[network];

  return {
    token: createContract<Token>(addresses.token, tokenAbi, signer)
  };
};

export const createContract = <T>(
  address: string,
  abi: any,
  signer: ethers.Signer
): T => (new ethers.Contract(address, abi, signer) as unknown) as T;
