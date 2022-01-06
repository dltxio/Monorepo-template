import { ethers } from "ethers";
import React from "react";
import { createContext } from "react";

import useNotifications from "../hooks/useNotifications";
import useWeb3 from "../hooks/useWeb3";
import { PromiseNotificationMessages } from "./Notifications";

export type Transactions = {
  sendTransaction(
    populatedTx: Promise<ethers.PopulatedTransaction>,
    messages: PromiseNotificationMessages
  ): Promise<void>;
};

export const TransactionsContext = createContext<Transactions>(null as any);

export const TransactionsProvider: React.FC<{
  children: React.ReactNode;
}> = function (props) {
  const { signer } = useWeb3();
  const { showPromiseNotification } = useNotifications();

  const sendTransaction = async (
    populatedTx: Promise<ethers.PopulatedTransaction>,
    messages: PromiseNotificationMessages
  ) => {
    if (!signer) {
      console.error("No signer connected");
      return;
    }

    const tx = await signer.sendTransaction(await populatedTx);

    const txMinedPromise = tx.wait(1);

    showPromiseNotification(messages, txMinedPromise);

    await txMinedPromise;
  };

  return (
    <TransactionsContext.Provider value={{ sendTransaction }}>
      {props.children}
    </TransactionsContext.Provider>
  );
};
