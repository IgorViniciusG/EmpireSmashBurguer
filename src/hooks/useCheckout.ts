import { toast } from 'sonner';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext/hooks';
import { useBagContext } from '../contexts/BagContext/hooks';
import { useOrderContext } from '../contexts/OrderContext/hooks';

export function useCheckout() {
  const { user } = useAuthContext();
  const { addOrder } = useOrderContext();
  const { state, clearBag } = useBagContext();
  const navigate = useNavigate();

  const totalPrice = state
    .reduce((acc, value) => acc + value.quantity * value.price, 5.9)
    .toFixed(2);

  async function handleFinalizeOrder() {
    const { data: address, error: addressError } = await supabase
      .from('Address')
      .select('*')
      .eq('user_id', user?.id)
      .eq('is_default', true)
      .single();

    if (addressError || !address) {
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
      address_id: address.id,
      delivery_address: {
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        cep: address.cep,
      },
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
