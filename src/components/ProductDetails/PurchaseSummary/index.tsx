import { Card } from '../../Card';
import { Container } from '../../Container';

import type { BagItensType } from '../../../types/BagItensType';
import type { DonenessType } from '../../../types/DonenessType';
import type { ExtrasType } from '../../../types/ExtrasType';
import type { ProductType } from '../../../types/ProductType';

import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBagContext } from '../../../contexts/BagContext/hooks';

interface ProductProps {
  productInfo: ProductType;
  doneness: DonenessType;
  selectedExtras: ExtrasType[];
  isEditing: boolean;
  bagItem: BagItensType;
}

export function PurchaseSummary({
  productInfo,
  doneness,
  selectedExtras,
  isEditing,
  bagItem,
}: ProductProps) {
  const { addToBag, updateItem } = useBagContext();
  const [quantity, setQuantity] = useState(1);
  const nagivate = useNavigate();

  const extrasPrice = selectedExtras.reduce((acc, cur) => acc + cur.price, 0);
  const totalPrice = (productInfo.price + extrasPrice) * quantity;

  const items: BagItensType = {
    cartItemId: `${productInfo.id}${selectedExtras.length > 0 ? '-' : ''}${selectedExtras
      .map((extra) => extra.id)
      .sort()
      .join('-')}`,
    productId: productInfo.id,
    name: productInfo.name,
    image: productInfo.image,
    banner: productInfo.banner,
    price: totalPrice,
    extras: selectedExtras,
    doneness: doneness,
    quantity: quantity,
  };

  function setAdded() {
    if (items) {
      nagivate('/');
      toast.success(
        <div className="flex flex-col">
          <div>Adicionado à sacola com sucesso!</div>
          <div>
            {quantity}x {productInfo.name}
          </div>
        </div>,
      );
    }
  }

  function setUpdated() {
    if (items) {
      nagivate('/');
      toast.info(
        <div className="flex flex-col">
          <div>Item editado com sucesso!</div>
          <div>
            {quantity}x {productInfo.name}
          </div>
        </div>,
      );
    }
  }

  return (
    <Container>
      <Card className="flex-col bg-green-100">
        <h1 className="font-bold">Adicionar ao pedido</h1>
        <div className="flex flex-col gap-2 my-3">
          <p className="text-sm">{productInfo?.name}</p>
          <p className="text-xs">R$ {productInfo?.price.toFixed(2)}</p>
        </div>

        {doneness && (
          <div className="my-3">
            <hr className="text-gray-400" />
            <h2 className="text-xs my-2">Ponto da Carne:</h2>
            <p className="text-xs text-gray-500">{doneness.label}</p>
          </div>
        )}

        {!!selectedExtras.length && (
          <>
            <hr className="text-gray-400" />
            <h2 className="text-xs my-2">Adicionais:</h2>
            {selectedExtras.map((item) => (
              <div
                key={item.id}
                className="text-xs text-gray-500 flex justify-between"
              >
                <p>{item.label}</p>
                <p>{`+R$${item.price.toFixed(2)}`}</p>
              </div>
            ))}
          </>
        )}

        <hr className="text-gray-400 my-2" />
        <div className="my-2">
          <h2 className="text-xs mb-2">Quantidade</h2>

          <div className="flex gap-5">
            <button
              className="border border-gray-400 rounded-full p-3 h-5 w-5 flex justify-center items-center"
              onClick={() => {
                setQuantity(Math.max(1, quantity - 1));
              }}
            >
              −
            </button>
            {quantity}
            <button
              className="border border-gray-400 rounded-full p-3 h-5 w-5 flex justify-center items-center"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        {isEditing ? (
          <button
            onClick={() => {
              if (!doneness) return toast.error('Selecione o ponto da Carne');
              const itemUpdated = {
                ...items,
                cartItemId: bagItem.cartItemId,
              };
              updateItem(itemUpdated);
              setUpdated();
            }}
            className="bg-amber-400 my-5 py-5 px-10 flex flex-col rounded-full cursor-pointer"
          >
            <span className="text-sm">Editar Pedido</span>
            <span className="text-xs"> Total: R$ {totalPrice.toFixed(2)}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              if (!doneness) return toast.error('Selecione o ponto da Carne');

              addToBag(items);
              setAdded();
            }}
            className="bg-amber-400 my-5 py-5 px-10 flex flex-col rounded-full cursor-pointer"
          >
            <span className="text-sm">Adicionar à Sacola</span>
            <span className="text-xs"> Total: R$ {totalPrice.toFixed(2)}</span>
          </button>
        )}
      </Card>
    </Container>
  );
}
