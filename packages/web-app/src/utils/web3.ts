import { ethers } from "ethers";

import {
  NETWORK_NAME_TO_ID,
  RPC_ADDRESSES,
  SUPPORTED_NETWORKS
} from "../config";

const unsafeWindow = window as any;

export const getBackupProvider = (
  network: general.SupportedNetworkName
): ethers.providers.JsonRpcProvider =>
  new ethers.providers.JsonRpcProvider(RPC_ADDRESSES[network]);

export const getBackupSigner = (network: general.SupportedNetworkName) => {
  const provider = getBackupProvider(network);
  return new ethers.VoidSigner(
    "0x000000000000000000000000000000000000dEaD", // Random address
    provider
  );
};

const getWeb3Provider = () =>
  new ethers.providers.Web3Provider(unsafeWindow.ethereum);

export const isWeb3Connected = async (): Promise<boolean> => {
  const provider = getWeb3Provider();
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
};

export const connectToWeb3Provider = async (): Promise<ethers.Signer> => {
  const provider = getWeb3Provider();
  await unsafeWindow.ethereum.request({ method: "eth_requestAccounts" });
  return provider.getSigner();
};

export const getNetworkName = (
  network: ethers.providers.Network
): general.SupportedNetworkName => {
  const result = Object.entries(NETWORK_NAME_TO_ID).find(
    ([_networkName, networkId]) => network.chainId === networkId
  );

  return (result ? result[0] : network.name) as general.SupportedNetworkName;
};

export const getIsSupportedNetwork = (
  network: ethers.providers.Network
): boolean => {
  const networkName = getNetworkName(network);
  return SUPPORTED_NETWORKS.includes(networkName);
};
