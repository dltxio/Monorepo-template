import React from "react";

import { Web3, Web3Context } from "../providers/Web3";

const useWeb3 = (): Web3 => React.useContext(Web3Context);

export default useWeb3;
