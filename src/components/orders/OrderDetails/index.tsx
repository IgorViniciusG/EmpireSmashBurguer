import { Link, useParams } from 'react-router';
import { Card } from '../../UI/Card';
import { Container } from '../../layout/Container';
import { useAuthContext } from '../../../contexts/AuthContext/hooks';
import { supabase } from '../../../services/supabase';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import type { OrderType } from '../../../types/OrderType';

import { ArrowLeft, MapPin } from 'lucide-react';
import { OrderTracker } from '../OrderTracker';
import { formatDate } from '../../../utils/formatDate';

export function OrderDetails() {
  const { id } = useParams();
  const { user } = useAuthContext();

  const [order, setOrder] = useState<OrderType>();

  useEffect(() => {
    async function fecthOrder() {
      if (!user) return;
      const { data, error } = await supabase
        .from('Orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Erro ao buscar pedidos');
      } else if (data) {
        setOrder(data);
      }
    }

    fecthOrder();
  }, [user, id]);

  return (
    <Container>
      <Link
        to={'/Pedidos'}
        className="flex justify-start items-center mt-5 gap-1 text-gray-500 hover:text-black transition-colors ease-in-out"
      >
        <ArrowLeft size={20} />
        <p>Voltar aos Pedidos</p>
      </Link>

      <Card>
        <div>
          <h1 className="font-bold text-2xl">Pedido #{order?.id}</h1>
          <p className="text-gray-600">
            Realizado em {formatDate(order?.created_at)}
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-4">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="flex flex-col">
            <h1 className="font-bold text-xl">Status do Pedido</h1>
            <OrderTracker currentStatus={order?.status} />
          </Card>

          <Card className="flex flex-col h-full">
            <div>
              <h1 className="font-black text-lg mb-4">Itens do pedido</h1>
              {order?.items.map((item) => (
                <div key={item.cartItemId}>
                  <div className="flex justify-between w-full my-3">
                    <div className="w-full">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <div className="w-full flex justify-end">
                      <p className="font-semibold">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr className="text-gray-200" />
                </div>
              ))}
            </div>

            <div className="w-full flex justify-between mt-auto pt-5">
              <h2 className="font-bold text-lg">Total</h2>
              <p className="font-bold text-lg text-amber-500">
                R$ {order?.total.toFixed(2)}
              </p>
            </div>
          </Card>
        </div>

        <Card className="flex flex-col h-fit lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-amber-100 text-amber-500 p-2 rounded-full">
              <MapPin size={22} />
            </span>
            <h1 className="text-lg font-black">Endereço de Entrega</h1>
          </div>
          {order?.delivery_address ? (
            <div className="font-medium text-gray-600 space-y-1">
              <p className="text-gray-800 font-semibold">
                {order.delivery_address.street}, {order.delivery_address.number}
              </p>

              {order.delivery_address.complement && (
                <p className="text-sm text-gray-500">
                  {order.delivery_address.complement}
                </p>
              )}

              <p>{order.delivery_address.neighborhood}</p>

              <p>
                {order.delivery_address.city} - {order.delivery_address.state}
              </p>

              <p className="text-gray-500 mt-2 text-sm">
                CEP: {order.delivery_address.cep}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm">
              Aguardando dados do endereço...
            </p>
          )}
        </Card>
      </div>
    </Container>
  );
}
