/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ethers } from "ethers";
import React from "react";
import { createContext, useCallback, useEffect, useState } from "react";

import { DEFAULT_NETWORK } from "../config";
import { Contracts, getContracts } from "../utils/contracts";
import {
  connectToWeb3Provider,
  getBackupProvider,
  getBackupSigner,
  getIsSupportedNetwork,
  getNetworkName,
  isWeb3Connected
} from "../utils/web3";

export type Web3 = {
  network: general.SupportedNetworkName;
  isSupportedNetwork: boolean;
  initialising: boolean;
  contracts: Contracts;
  provider: ethers.providers.Provider;
  signer: ethers.Signer | undefined;
  address: string | undefined;
  balance: ethers.BigNumber;
  connectWallet(): Promise<void>;
  disconnectWallet(): void;
};

export const Web3Context = createContext<Web3>(null as any);
const defaultProvider = getBackupProvider(DEFAULT_NETWORK);
const defaultSigner = getBackupSigner(DEFAULT_NETWORK);
const defaultContracts = getContracts(DEFAULT_NETWORK, defaultSigner);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = function (
  props
) {
  const [provider, setProvider] = useState<ethers.providers.Provider>(
    defaultProvider
  );
  const [initialising, setInitialising] = useState<boolean>(true);
  const [network, setNetwork] = useState<general.SupportedNetworkName>(
    DEFAULT_NETWORK
  );
  const [isSupportedNetwork, setIsSupportedNetwork] = useState<boolean>(true);
  const [signer, setSigner] = useState<ethers.Signer>();
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState(ethers.constants.Zero);
  const [contracts, setContracts] = useState<Contracts>(defaultContracts);

  const connectWallet = useCallback(async () => {
    setInitialising(true);
    const newSigner = await connectToWeb3Provider();
    const network = await newSigner.provider!.getNetwork();
    const isSupportedNetwork = getIsSupportedNetwork(network);
    const networkName = getNetworkName(network);

    setNetwork(networkName);
    setIsSupportedNetwork(isSupportedNetwork);
    newSigner.getBalance().then(setBalance);
    newSigner.getAddress().then(setAddress);
    setProvider(newSigner.provider!);
    setSigner(newSigner);
    if (isSupportedNetwork) {
      setContracts(getContracts(networkName, newSigner));
    }

    (window as any).ethereum.on("accountsChanged", connectWallet);
    (window as any).ethereum.on("chainChanged", connectWallet);
    (window as any).ethereum.on("disconnect", disconnectWallet);

    setInitialising(false);
  }, []);

  const disconnectWallet = () => {
    setInitialising(true);
    setProvider(defaultProvider);
    setBalance(ethers.constants.Zero);
    setContracts(getContracts(DEFAULT_NETWORK, defaultSigner));
    setAddress(undefined);
    setSigner(undefined);
    setNetwork(DEFAULT_NETWORK);
    setIsSupportedNetwork(true);
    setInitialising(false);
  };

  useEffect(() => {
    (async () => {
      if (await isWeb3Connected()) {
        await connectWallet();
      }

      setInitialising(false);
    })();
  }, [connectWallet]);

  return (
    <Web3Context.Provider
      value={{
        initialising,
        network,
        isSupportedNetwork,
        contracts,
        address,
        signer,
        provider,
        balance,
        disconnectWallet,
        connectWallet
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
