import type { DonenessType } from '../../../types/DonenessType';
import type { ExtrasType } from '../../../types/ExtrasType';
import type { ProductType } from '../../../types/ProductType';
import { Card } from '../../Card';
import { Container } from '../../Container';
import { useState } from 'react';

interface ProductProps {
  productInfo: ProductType;
  doneness: DonenessType;
  selectedExtras: ExtrasType[];
}

export function PurchaseSummary({
  productInfo,
  doneness,
  selectedExtras,
}: ProductProps) {
  const [quantity, setQuantity] = useState(1);

  const extrasPrice = selectedExtras.reduce((acc, cur) => acc + cur.price, 0);
  const totalPrice = (productInfo.price + extrasPrice) * quantity;

  return (
    <Container>
      <Card className="flex-col">
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
              <div className="text-xs text-gray-500 flex justify-between">
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
        <button className="bg-amber-400 my-5 py-5 px-10 flex flex-col rounded-full">
          <span className="text-sm">Adicionar à sacola</span>
          <span className="text-xs"> Total: R$ {totalPrice.toFixed(2)}</span>
        </button>
      </Card>
    </Container>
  );
}
