import { useContext } from 'react';
import { OrderContex } from '.';

export function useOrderContext() {
  const context = useContext(OrderContex);
  return context;
}
