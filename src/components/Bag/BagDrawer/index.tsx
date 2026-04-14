import { Pen, ShoppingBag, Trash2, X } from 'lucide-react';
import { useBagContext } from '../../../contexts/BagContext/hooks';
import { useOrderContext } from '../../../contexts/OrderContext/hooks';
import type { OrderType } from '../../../types/OrderType';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import type { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router';

interface BagProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClose: (value: boolean) => void;
}

export function BagDrawer({ isOpen, onClose, setIsOpen }: BagProps) {
  const { state, updateQuantity, removeFromBag, clearBag } = useBagContext();
  const { addOrder } = useOrderContext();

  if (!isOpen) return null;

  const totalPrice = state
    .reduce((acc, value) => acc + value.price * value.quantity, 5.9)
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

  const finishOrder = () => {
    clearBag();
    addOrder(orderItens);
    toast.success('Seu pedido foi finalizado!');
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50 transition-opacity"></div>

      <div className="relative w-full max-w-md h-full bg-white shadow-xl flex flex-col">
        <div className="flex justify-between items-center w-full">
          <h1 className="p-8 font-bold bg-gray-50 text-xl">Sua Sacola</h1>
          <button
            className="mx-6 p-1  transition-all cursor-pointer rounded-full hover:bg-red-500 hover:text-white"
            onClick={() => {
              onClose(!isOpen);
            }}
          >
            <X />
          </button>
        </div>
        <hr className="text-gray-300" />

        {state.length ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {state.map((item) => (
                <div key={item.cartItemId}>
                  <section className="border border-gray-200 p-4 rounded-lg flex gap-4 my-4 mx-4 shadow-sm bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover shrink-0"
                    />

                    <div className="flex flex-col w-full justify-between">
                      <div className="flex justify-between items-start w-full">
                        <div className="flex-1 pr-2">
                          <h1 className="font-bold leading-tight">
                            {item.name}
                          </h1>
                          <p className="text-xs text-gray-600 mt-1">
                            Ponto: {item.doneness.label}
                          </p>

                          {item.extras.length > 0 && (
                            <div className="mt-1">
                              <p className="text-xs text-gray-500">
                                Adicionais:{' '}
                                {item.extras
                                  .map((extra) => extra.label)
                                  .join(', ')}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 shrink-0">
                          <Link
                            to={`/Produto/${item.cartItemId}`}
                            title="Editar produto"
                            className="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all"
                            onClick={() => setIsOpen(false)}
                          >
                            <Pen size={18} />
                          </Link>

                          <button
                            onClick={() => removeFromBag(item.cartItemId)}
                            className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <section className="flex items-center justify-between w-full mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity({
                                ...item,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            }
                            className="p-1 border border-gray-300 rounded-full h-7 w-7 flex justify-center items-center text-lg hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity({
                                ...item,
                                quantity: item.quantity + 1,
                              })
                            }
                            className="p-1 border border-gray-300 rounded-full h-7 w-7 flex justify-center items-center text-lg hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-gray-800">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </section>
                    </div>
                  </section>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    R${' '}
                    {state
                      .reduce(
                        (acc, value) => acc + value.price * value.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span>{!state.length ? 'R$ 0.00' : 'R$ 5.90'}</span>
                </p>
                <hr className="my-2" />
              </div>
              <div className="font-bold text-lg my-3 flex justify-between">
                <span>Total:</span>
                <span>
                  R${' '}
                  {!state.length
                    ? '0.00'
                    : state
                        .reduce(
                          (acc, value) => acc + value.price * value.quantity,
                          5.9,
                        )
                        .toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => finishOrder()}
                className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-bold py-4 rounded-lg mt-2"
              >
                Finalizar pedido
              </button>
            </div>
          </>
        ) : (
          <div className=" flex justify-center items-center flex-col h-1/2 w-full">
            <div className="bg-gray-200 rounded-full p-5 flex justify-center items-center  h-auto w-auto my-4">
              <ShoppingBag size={50} className="text-gray-500 h-auto w-auto" />
            </div>
            <p className="text-gray-400">Sua sacola está vazia</p>
          </div>
        )}
      </div>
    </div>
  );
}
