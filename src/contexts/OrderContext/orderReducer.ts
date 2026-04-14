import type { OrderType } from '../../types/OrderType';
import { OrderActionsType, type OrderActions } from './OrderActions';

export function orderReducer(state: OrderType[], action: OrderActions) {
  switch (action.type) {
    case OrderActionsType.ADD_ORDER:
      return [...state, action.payload];
  }
  return state;
}
