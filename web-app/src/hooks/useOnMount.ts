import { useEffect } from "react";

const useMount = (fn: React.EffectCallback) => {
  useEffect(fn, [fn]);
};

export default useMount;
