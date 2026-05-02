import { useCallback, useEffect, useState } from 'react';
import { AddressForm } from '../../components/Auth/AddressForm';
import { Container } from '../../components/layout/Container';
import { AddressCard } from '../../components/profile/AddressCard';
import { supabase } from '../../services/supabase';
import { useAuthContext } from '../../contexts/AuthContext/hooks';
import { toast } from 'sonner';
import type { Address } from '../../types/AddressType';

export function AddressPage() {
  const { user } = useAuthContext();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [addresses, setAddress] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);

  const fetchAddresses = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('Address')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error(`Erro ao buscar endereços: ${error.message}`);
    } else {
      setAddress(data || []);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <Container>
      <section className="flex justify-between items-start">
        <div className="flex flex-col justify-center">
          <h1 className="mt-15 font-bold text-3xl">Meus Endereços</h1>
          <p className="my-3 text-sm text-gray-600">
            Gerencie seus endereços de entrega
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              setAddressToEdit(null);
              setIsVisible(!isVisible);
            }}
            className=" cursor-pointer mt-15 bg-amber-400 font-bold px-6 py-4 rounded-full flex items-center shadow-md shadow-gray-300 transition-colors hover:bg-amber-500"
          >
            {isVisible ? 'Fechar Formulário' : '+ Adicionar Endereço'}
          </button>
        </div>
      </section>

      <section className="flex justify-center items-center">
        <div
          className={`p-8 bg-white rounded-xl w-full max-w-2xl ${
            isVisible ? 'block' : 'hidden'
          }`}
          id="Form"
        >
          <h2 className="font-bold text-xl mb-4">Adicionar novo endereço</h2>
          <div className="flex flex-col justify-center items-center w-full">
            <AddressForm
              setIsVisible={setIsVisible}
              isVisible={isVisible}
              onSuccess={fetchAddresses}
              initialData={addressToEdit}
            />
          </div>
        </div>
      </section>

      <section className="mt-10 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p className="text-gray-500">Buscando seus endereços...</p>
        ) : (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onDeleteSuccess={fetchAddresses}
              onEditAddress={() => {
                setAddressToEdit(address);
                setIsVisible(true);
              }}
            />
          ))
        )}
      </section>
    </Container>
  );
}
