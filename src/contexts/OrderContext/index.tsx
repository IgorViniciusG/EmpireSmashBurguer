/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import type { OrderType } from '../../types/OrderType';

export const initialState: OrderType[] = [];

export const OrderContex = createContext({
  state: initialState,

  addOrder: (_item: OrderType) => {},
});
