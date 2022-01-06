declare namespace general {
  type SupportedNetworkName = "local";
  type ContractName = "token";
  type MapNetworkName<T> = { [key in SupportedNetworkName]: T };
  type MapContractName<T> = { [key in ContractName]: T };
}
