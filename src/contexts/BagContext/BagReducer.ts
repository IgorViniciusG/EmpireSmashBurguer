import { initialState } from '.';
import type { BagItensType } from '../../types/BagItensType';
import { BagActionsType } from './BagActions';
import type { BagActionsModel } from './BagActions';

export function BagReducer(state: BagItensType[], action: BagActionsModel) {
  switch (action.type) {
    case BagActionsType.ADD_TO_BAG:
      return [...state, action.payload];
    case BagActionsType.UPDATE_QUANTITY:
      return state.map((itens) => {
        if (itens.cartItemId === action.payload.cartItemId) {
          return {
            ...itens,
            quantity: action.payload.quantity,
          };
        }

        return itens;
      });
    case BagActionsType.UPDATE_ITEM:
      return state.map((itens) => {
        if (itens.cartItemId === action.payload.cartItemId) {
          return {
            ...itens,
            ...action.payload,
          };
        }

        return itens;
      });
    case BagActionsType.REMOVE_FROM_BAG: {
      return state.filter((item) => item.cartItemId !== action.payload);
    }
    case BagActionsType.CLEAR_BAG: {
      return initialState;
    }
  }
  return state;
}
