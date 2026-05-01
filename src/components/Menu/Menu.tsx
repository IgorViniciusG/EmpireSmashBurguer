import { useEffect, useMemo, useState } from 'react';
import { CategoryTabs } from './CategoryTabs';
import { ProductCard } from './ProductCard';
import { getMenuItems } from '../../services/getMenuItems';
import type { ProductType } from '../../types/ProductType';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('Burguers');
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getMenuItems();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="w-full flex flex-col">
      <CategoryTabs active={activeCategory} onTabChange={setActiveCategory} />

      <div className="grid grid-cols-1 w-full gap-4 mt-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
