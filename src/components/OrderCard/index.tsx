import { Link } from 'react-router';
import type { OrderType } from '../../types/OrderType';
import { Card } from '../Card';

interface OrderProps {
  order: OrderType;
}

const statusColors = {
  pendente: 'bg-gray-100 text-gray-600',
  preparando: 'bg-orange-100 text-orange-600',
  entregando: 'bg-blue-100 text-blue-600',
  entregue: 'bg-green-100 text-green-700',
  cancelado: 'bg-red-100 text-red-600',
};

const statusLabels = {
  pendente: 'Aguardando',
  preparando: 'Preparando',
  entregando: 'A Caminho',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
};

export function OrderCard({ order }: OrderProps) {
  return (
    <div key={order.id}>
      <Card className="flex flex-col w-full">
        <div className='flex justify-between'>
          <h2 className="font-bold text-xl">Pedido #{order.id}</h2>
          <span
            className={`px-3 py-1 rounded-full font-bold text-sm ${statusColors[order?.status || 'pendente']}`}
          >
            {statusLabels[order?.status || 'pendente']}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-4">{order.created_at}</p>
        <h3>Itens:</h3>
        <div>
          {order.items.map((item) => (
            <div key={item.cartItemId} className="my-2">
              <p className="text-sm text-gray-500">
                {item.quantity}x {item.name}
              </p>
            </div>
          ))}
          <hr className="text-gray-300" />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total do Pedido</p>
              <p className="font-bold text-xl">R${order.total.toFixed(2)}</p>
            </div>
            <div>
              <Link
                to={`/Pedidos/${order.id}`}
                className="bg-amber-400 font-semibold py-2 px-8 rounded-4xl"
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
