import { useReducer, type PropsWithChildren } from 'react';
import { BagContext, initialState } from '.';
import { BagReducer } from './BagReducer';
import { BagActionsType } from './BagActions';
import type { BagItensType } from '../../types/BagItensType';

export function BagContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(BagReducer, initialState);

  const addToBag = (item: BagItensType) => {
    dispatch({
      type: BagActionsType.ADD_TO_BAG,
      payload: item,
    });
  };

  const updateQuantity = (
    item: Pick<BagItensType, 'cartItemId' | 'quantity'>,
  ) => {
    dispatch({
      type: BagActionsType.UPDATE_QUANTITY,
      payload: item,
    });
  };

  const updateItem = (item: BagItensType) => {
    dispatch({
      type: BagActionsType.UPDATE_ITEM,
      payload: item,
    });
  };

  const removeFromBag = (item: BagItensType['cartItemId']) => {
    dispatch({
      type: BagActionsType.REMOVE_FROM_BAG,
      payload: item,
    });
  };

  const clearBag = () => {
    dispatch({
      type: BagActionsType.CLEAR_BAG,
    });
  };

  return (
    <BagContext.Provider
      value={{
        state,
        addToBag,
        updateQuantity,
        updateItem,
        removeFromBag,
        clearBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}
