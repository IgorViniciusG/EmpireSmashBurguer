import { useReducer, type PropsWithChildren } from 'react';
import { initialState, OrderContex } from '.';
import { orderReducer } from './orderReducer';
import type { OrderType } from '../../types/OrderType';
import { OrderActionsType } from './OrderActions';

export function OrderContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addOrder = (item: OrderType) => {
    dispatch({
      type: OrderActionsType.ADD_ORDER,
      payload: item,
    });
  };
  return (
    <OrderContex.Provider value={{ state, addOrder }}>
      {children}
    </OrderContex.Provider>
  );
}
