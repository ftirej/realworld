import { useEffect } from "react";

export const useEffectOnce = callback => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};
