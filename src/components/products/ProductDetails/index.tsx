import { ItemCustomizer } from './ItemCustomizer';
import { PurchaseSummary } from './PurchaseSummary';
import { useEffect, useState } from 'react';
import { getMenuItems } from '../../../services/getMenuItems';
import { useParams } from 'react-router';

import type { ExtrasType } from '../../../types/ExtrasType';
import type { DonenessType } from '../../../types/DonenessType';

import { Bag } from '../../checkout/Bag';
import { useBagContext } from '../../../contexts/BagContext/hooks';
import { Container } from '../../layout/Container';

export function ProductDetails() {
  const { id } = useParams();
  const { state } = useBagContext();

  const bagItem = state.find((item) => String(item.cartItemId) === String(id));
  const isEditing = !!bagItem;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fetchedProduct, setFetchedProduct] = useState<any>(null);

  const product = bagItem ? bagItem : fetchedProduct;

  const [doneness, setDoneness] = useState<DonenessType | null | undefined>(
    bagItem ? bagItem.doneness : null,
  );
  const [extra, setExtra] = useState<ExtrasType[] | undefined>(
    bagItem ? bagItem.extras : [],
  );

  function handleDonenessChange(onChangeDoneness: DonenessType) {
    setDoneness(onChangeDoneness);
  }

  function handleExtrasChange(onChangeExtras: ExtrasType[]) {
    setExtra(onChangeExtras);
  }

  const [currentId, setCurrentId] = useState(id);
  if (id !== currentId) {
    setCurrentId(id);
    setDoneness(bagItem ? bagItem.doneness : null);
    setExtra(bagItem ? bagItem.extras : []);
  }

  useEffect(() => {
    if (!bagItem) {
      async function getProduct() {
        const allItens = await getMenuItems();
        const productFiltered = allItens?.find(
          (item) => Number(id) === item.id,
        );
        setFetchedProduct(productFiltered || null);
      }
      getProduct();
    }
  }, [id, bagItem]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl text-red-800">Produto não encontrado</h1>
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Bag />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
        <div className="md:col-span-8">
          <ItemCustomizer
            productInfo={product}
            onChangeDoneness={handleDonenessChange}
            onChangeExtras={handleExtrasChange}
            isEditing={isEditing}
            doneness={doneness!}
            selectedExtras={extra!}
            bagItem={bagItem!}
          />
        </div>

        <div className="md:col-span-4 h-fit md:sticky md:top-32 mt-4 md:mt-0 pb-10">
          <PurchaseSummary
            bagItem={bagItem!}
            productInfo={product}
            doneness={doneness!}
            selectedExtras={extra!}
            isEditing={isEditing}
          />
        </div>
      </div>
    </Container>
  );
}
