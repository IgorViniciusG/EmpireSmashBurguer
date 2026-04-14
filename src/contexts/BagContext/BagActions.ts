import type { BagItensType } from '../../types/BagItensType';

export const BagActionsType = {
  ADD_TO_BAG: 'ADD_TO_BAG',
  REMOVE_FROM_BAG: 'REMOVE_FROM_BAG',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  UPDATE_ITEM: 'UPDATE_ITEM',
  CLEAR_BAG: 'CLEAR_BAG',
  TOGGLE_EXTRA: 'TOGGLE_EXTRA',
} as const;

export type BagActionsType =
  (typeof BagActionsType)[keyof typeof BagActionsType];

export type BagActionsWithPayload =
  | {
      type: typeof BagActionsType.ADD_TO_BAG;
      payload: BagItensType;
    }
  | {
      type: typeof BagActionsType.REMOVE_FROM_BAG;
      payload: BagItensType['cartItemId'];
    }
  | {
      type: typeof BagActionsType.UPDATE_QUANTITY;
      payload: Pick<BagItensType, 'cartItemId' | 'quantity'>;
    }
  | {
      type: typeof BagActionsType.UPDATE_ITEM;
      payload: BagItensType;
    }
  | {
      type: typeof BagActionsType.TOGGLE_EXTRA;
      payload: BagItensType;
    };

export type BagActionsWithoutPayload = {
  type: typeof BagActionsType.CLEAR_BAG;
};

export type BagActionsModel = BagActionsWithPayload | BagActionsWithoutPayload;
