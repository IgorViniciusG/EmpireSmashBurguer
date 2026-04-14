import type { BagItensType } from './BagItensType';

export type OrderType = {
  id: string;
  itens: BagItensType[];
  total: number;
  status: 'pendente' | 'processando' | 'pago' | 'cancelado';
  createdAt: string;
};
