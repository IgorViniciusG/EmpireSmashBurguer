import type { OrderType } from '../../types/OrderType';

export const OrderActionsType = {
  ADD_ORDER: 'ADD_ORDER',
} as const;

export type OrderActionsType =
  (typeof OrderActionsType)[keyof typeof OrderActionsType];

export type OrderActions = {
  type: typeof OrderActionsType.ADD_ORDER;
  payload: OrderType;
};
