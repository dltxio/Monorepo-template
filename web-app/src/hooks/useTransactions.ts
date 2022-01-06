import React from "react";

import { Transactions, TransactionsContext } from "../providers/Transactions";

const useTransactions = (): Transactions =>
  React.useContext(TransactionsContext);

export default useTransactions;
