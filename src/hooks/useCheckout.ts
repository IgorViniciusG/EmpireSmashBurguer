import { toast } from 'sonner';

import { useAuthContext } from '../contexts/AuthContext/hooks';
import { useOrderContext } from '../contexts/OrderContext/hooks';
import { useNavigate } from 'react-router';
import { useBagContext } from '../contexts/BagContext/hooks';
import { supabase } from '../services/supabase';

export function useCheckout() {
  const { user } = useAuthContext();
  const { addOrder } = useOrderContext();
  const { state, clearBag } = useBagContext();

  const navigate = useNavigate();

  const totalPrice = state
    .reduce((acc, value) => acc + value.quantity * value.price, 5.9)
    .toFixed(2);

  async function handleFinalizeOrder() {
    const { data: defaultAddress, error: addressError } = await supabase
      .from('Address')
      .select('id')
      .eq('user_id', user?.id)
      .eq('is_default', true)
      .single();

    console.log(defaultAddress);

    if (addressError || !defaultAddress) {
      toast.error(
        'Quase lá! Escolha um endereço de entrega antes de finalizar.',
      );
      navigate('/Endereços');
      return;
    }

    if (!user) {
      toast.error('Realize o Login para finalizar o Pedido');
      navigate('/Login');
      return;
    }

    const newOrder = {
      user_id: user.id,
      address_id: defaultAddress.id,
      items: state,
      total: totalPrice,
      status: 'pendente',
    };

    const { data: saveOrder, error: orderError } = await supabase
      .from('Orders')
      .insert([newOrder])
      .select()
      .single();

    if (orderError) {
      toast.error('Ocorreu um erro ao finalizar pedido!');
      return;
    }

    toast.success(
      'Pedido realizado com sucesso! A cozinha já está preparando.',
    );
    addOrder(saveOrder);
    clearBag();
    navigate('/pedidos');
  }

  return { handleFinalizeOrder };
}
