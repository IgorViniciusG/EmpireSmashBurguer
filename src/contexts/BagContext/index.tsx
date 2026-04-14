/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import type { BagItensType } from '../../types/BagItensType';

export const initialState: BagItensType[] = [];

export const initialContextValue = {
  state: initialState,
  setState: () => {},
};

export const BagContext = createContext({
  state: initialState,

  addToBag: (_item: BagItensType) => {},
  updateQuantity: (_item: Pick<BagItensType, 'cartItemId' | 'quantity'>) => {},
  updateItem: (_item: BagItensType) => {},
  removeFromBag: (_item: BagItensType['cartItemId']) => {},
  clearBag: () => {},
});
