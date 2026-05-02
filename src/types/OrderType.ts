import type { Address } from './AddressType';
import type { BagItensType } from './BagItensType';

export type OrderType = {
  id: number;
  user_id: string;
  address_id: number | null;
  items: BagItensType[];
  total: number;
  status: 'pendente' | 'preparando' | 'entregando' | 'entregue' | 'cancelado';
  created_at: string;
  delivery_address: Address;
};
