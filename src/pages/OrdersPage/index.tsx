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
    if (!user) return;

    const fetchMyOrders = async () => {
      const { data, error } = await supabase
        .from('Orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) toast.error('Erro ao buscar pedidos');
      else if (data) setOrder(data);
    };

    fetchMyOrders();

    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Orders',
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchMyOrders(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
