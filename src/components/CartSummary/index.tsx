import { Pen, ShoppingBag, Tag, Trash2 } from 'lucide-react';
import { Card } from '../Card';
import { Container } from '../Container';
import { useBagContext } from '../../contexts/BagContext/hooks';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { useOrderContext } from '../../contexts/OrderContext/hooks';
import type { OrderType } from '../../types/OrderType';

import { v4 as uuidv4 } from 'uuid';

export function CartSummary() {
  const { state, removeFromBag, clearBag } = useBagContext();
  const { addOrder } = useOrderContext();

  const totalPrice = state
    .reduce((acc, value) => acc + value.quantity * value.price, 5.9)
    .toFixed(2);

  const date = new Date();
  const formattedDate: string = date.toLocaleString();

  const orderItens: OrderType = {
    id: uuidv4().slice(0, 5).toUpperCase(),
    itens: state,
    total: Number(totalPrice),
    status: 'pendente',
    createdAt: formattedDate,
  };

  return (
    <Container>
      <Card className="flex-col">
        <h1 className="font-bold">Sua sacola</h1>

        {!state.length ? (
          <>
            <div className="flex flex-col items-center justify-center gap-2 my-12">
              <div className="bg-gray-200 rounded-full p-4">
                <ShoppingBag className="text-gray-500" />
              </div>

              <p className="text-gray-500 font-medium text-xs">
                Sua sacola está vazia
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ 0,00</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>R$ 0,00</span>
              </div>
            </div>
            <hr className="my-5 text-gray-200" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>R$ 0,00</span>
            </div>
            <div className="flex w-full border rounded-sm justify-center items-center my-2 p-1 gap-3 text-gray-400 focus-within:border-amber-300">
              <Tag size={16} />
              <input
                className="w-full focus:outline-none"
                type="text"
                name=""
                id=""
                placeholder="Inserir cupom"
              />
            </div>
            <button className="bg-gray-200 py-2 rounded-xl cursor-not-allowed">
              Sacola vazia
            </button>{' '}
          </>
        ) : (
          <div>
            <section>
              <div>
                {state.map((item) => (
                  <div key={item.cartItemId}>
                    <div className="flex h-full gap-4 my-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 bg-cover rounded-2xl"
                      />
                      <div className="flex flex-col justify-center w-full">
                        <div className="flex items-center justify-between w-full">
                          <p className="font-medium text-sm">
                            {item.quantity}x {item.name}
                          </p>
                          <div className="flex gap-2 ml-6 ">
                            <Link
                              to={`/Produto/${item.cartItemId}`}
                              title="Editar produto"
                              className="font-bold p-1 hover:bg-blue-600 cursor-pointer hover:text-white  hover:scale-110  rounded-full transition ease-in-out duration-300"
                            >
                              <Pen size={15} />
                            </Link>
                            <span
                              title="Deletar da Sacola"
                              className="font-bold p-1 cursor-pointer hover:bg-red-600 hover:text-white hover:scale-110 rounded-full transition ease-in-out duration-300"
                              onClick={() => {
                                removeFromBag(item.cartItemId);
                                toast.success('Item removido com sucesso');
                              }}
                            >
                              <Trash2 size={15} />
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col font-medium text-sm text-gray-400 my-1">
                          {item.extras.map((extra) => (
                            <p key={extra.id}>{extra.label}</p>
                          ))}
                        </div>

                        <p className="text-sm font-medium ">
                          R${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <hr className="my-3 text-gray-300" />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    R${' '}
                    {state
                      .reduce(
                        (acc, value) => acc + value.quantity * value.price,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>R$ 5,90</span>
                </div>
              </div>
            </section>

            <hr className="my-5 text-gray-200" />
            <section>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                R$
                {state
                  .reduce(
                    (acc, value) => acc + value.quantity * value.price,
                    5.9,
                  )
                  .toFixed(2)}
              </div>
            </section>

            <section>
              <div className="flex w-full border rounded-sm justify-center items-center my-2 p-1 gap-3 text-gray-400 focus-within:border-amber-300">
                <Tag size={16} />
                <input
                  className="w-full focus:outline-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Inserir cupom"
                />
              </div>
              <button
                onClick={() => {
                  toast.success('Pedido Finalizado com sucesso');
                  addOrder(orderItens);
                  clearBag();
                }}
                className="bg-amber-400 py-3 rounded-lg cursor-pointer w-full"
              >
                Finalizar Pedido
              </button>
            </section>
          </div>
        )}
      </Card>
    </Container>
  );
}
