import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { OrderCard } from '../../components/OrderCard';
import { supabase } from '../../services/supabase';
import { useAuthContext } from '../../contexts/AuthContext/hooks';
import { toast } from 'sonner';
import type { OrderType } from '../../types/OrderType';

export function OrdersPage() {
  const [orders, setOrder] = useState<OrderType[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fecthMyOrders() {
      if (!user) return;
      const { data, error } = await supabase
        .from('Orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Erro ao buscar pedidos');
      } else if (data) {
        setOrder(data);
      }
    }

    fecthMyOrders();
  }, [user]);

 

  return (
    <Container>
      <h1 className="my-8 font-bold text-3xl">Meus Pedidos</h1>
      <main className="w-full flex flex-col gap-6">
        {orders.length === 0 ? (
          <p className="text-gray-500">Você ainda não possui pedidos.</p>
        ) : (
          orders.map((item) => <OrderCard key={item.id} order={item} />)
        )}
      </main>
    </Container>
  );
}
