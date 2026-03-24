import type { CartItensType } from './CartItensType';

export type OrderType = {
  id: number;
  itens: CartItensType[];
  total: number;
  status: 'pendente' | 'processando' | 'pago' | 'cancelado';
};
