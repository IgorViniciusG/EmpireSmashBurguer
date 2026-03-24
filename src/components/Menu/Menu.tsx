import { useEffect, useMemo, useState } from 'react';

import { CategoryTabs } from './CategoryTabs';
import { ProductCard } from './ProductCard';
import { getMenuItens } from '../../services/getMenuItens';
import type { ProductType } from '../../types/ProductType';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('Burguers');
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getMenuItens();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);
  return (
    <div className="w-full">
      <CategoryTabs active={activeCategory} onTabChange={setActiveCategory} />

      <div className="flex flex-col">
        {filtered.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
}
