import { toast } from 'sonner';
import { supabase } from './supabase';

export async function updateOrderStatus(
  orderId: string | number,
  newStatus: string,
) {
  console.log(`Tentando atualizar pedido ${orderId} para ${newStatus}...`);

  const { error } = await supabase
    .from('Orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    console.error('Erro oficial do Supabase:', error.message);
    toast.error('Erro de permissão no banco de dados');
  } else {
    console.log('Sucesso no banco!');
  }
}
