import { ItemCustomizer } from './ItemCustomizer';
import { PurchaseSummary } from './PurchaseSummary';
import { useEffect, useState } from 'react';
import { getMenuItens } from '../../services/getMenuItens';
import type { ProductType } from '../../types/ProductType';
import { useParams } from 'react-router';
import { Container } from '../Container';

import type { ExtrasType } from '../../types/ExtrasType';
import type { DonenessType } from '../../types/DonenessType';

export function ProductDetails() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [doneness, setDoneness] = useState<DonenessType>();
  const [extra, setExtra] = useState<ExtrasType[]>([]);
  const { id } = useParams();

  function handleDonenessChange(onChangeDoneness: DonenessType) {
    setDoneness(onChangeDoneness);
  }

  function handleExtrasChange(onChangeExtras: ExtrasType[]) {
    setExtra(onChangeExtras);
  }

  useEffect(() => {
    async function getProduct() {
      const allItens = await getMenuItens();
      const productFiltered = allItens?.find((item) => Number(id) === item.id);
      setProduct(productFiltered || null);
    }

    getProduct();
  }, [id]);

  if (!product)
    return (
      <h1 className="flex justify-center items-center text-4xl text-red-800 h-full w-full my-65">
        Produto não encontrado
      </h1>
    );

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-12 my-5">
        <div className="col-span-1 md:col-span-8">
          <ItemCustomizer
            productInfo={product}
            onChangeDoneness={handleDonenessChange}
            onChangeExtras={handleExtrasChange}
          />
        </div>

        <div className="col-span-1 md:col-span-4 h-fit sticky top-37 my-12">
          <PurchaseSummary
            productInfo={product!}
            doneness={doneness!}
            selectedExtras={extra!}
          />
        </div>
      </div>
    </Container>
  );
}
