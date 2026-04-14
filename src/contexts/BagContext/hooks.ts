import { useContext } from 'react';
import { BagContext } from '.';

export function useBagContext() {
  const context = useContext(BagContext);
  return context;
}
