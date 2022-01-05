declare namespace data {
  type DataClients = {
    users: IUsersClient;
    addresses: IAddressesClient;
    dbTransactions: IDBTransactionClient;
  };
}
