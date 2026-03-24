export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  banner: string;
  category: 'burguers' | 'sides' | 'combos';
};
