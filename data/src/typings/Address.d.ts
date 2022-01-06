declare namespace data {
  type Address = {
    userId: string;
    address1: string;
    address2: string;
    state: string;
    postCode: number;
  };

  type NewAddress = Pick<
    Address,
    "userId",
    "address1",
    "address2",
    "state",
    "postCode"
  >;

  interface IAddressesClient extends IClientBase<Address, NewAddress> {}
}
