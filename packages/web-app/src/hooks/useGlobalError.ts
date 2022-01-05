import { useContext } from "react";

import { GlobalErrorContext, GlobalErrorType } from "../providers/GlobalError";

const useGlobalError = (): GlobalErrorType => useContext(GlobalErrorContext);

export default useGlobalError;
