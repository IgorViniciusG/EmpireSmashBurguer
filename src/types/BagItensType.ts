import type { DonenessType } from './DonenessType';
import type { ExtrasType } from './ExtrasType';

export type BagItensType = {
  cartItemId: string;
  productId: number;
  name: string;
  image: string;
  banner: string;
  price: number;
  extras: ExtrasType[];
  doneness: DonenessType;
  quantity: number;
};
