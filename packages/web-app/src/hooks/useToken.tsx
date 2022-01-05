import { ethers } from "ethers";
import * as React from "react";

import useWeb3 from "./useWeb3";

const useToken = () => {
  const {
    address,
    contracts: { token }
  } = useWeb3();

  const [totalSupply, setTotalSupply] = React.useState<number>();
  // eslint-disable-next-line no-empty-pattern
  const [] = React.useState<ethers.BigNumber>();
  const [usersSupply, setUsersSupply] = React.useState<number>();

  React.useEffect(() => {
    token.totalSupply().then(supply => {
      setTotalSupply(supply.toNumber());
    });
  }, [token]);

  React.useEffect(() => {
    if (!address) {
      setUsersSupply(undefined);
      return;
    }

    token.balanceOf(address).then(supply => {
      setUsersSupply(supply.toNumber());
    });
  }, [token, address]);

  return {
    totalSupply,
    usersSupply
  };
};

export default useToken;
