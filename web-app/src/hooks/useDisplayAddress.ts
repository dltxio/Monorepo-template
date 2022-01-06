import * as React from "react";

import useWeb3 from "./useWeb3";

const useDisplayAddress = () => {
  const { provider, address, network, initialising } = useWeb3();

  const [ensName, setEnsName] = React.useState<string>();

  React.useEffect(() => {
    setEnsName(undefined);
    if (!initialising && (network as string) === "homestead" && address) {
      provider.lookupAddress(address).then(name => {
        if (name) {
          setEnsName(name);
        }
      });
    }
  }, [provider, address, network, initialising]);

  return ensName || `...${address?.slice(-5)}`;
};

export default useDisplayAddress;
