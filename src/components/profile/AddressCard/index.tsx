import {
  AlertCircle,
  BriefcaseBusiness,
  House,
  MapPin,
  Pen,
  Trash2,
} from 'lucide-react';

import { supabase } from '../../../services/supabase';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext/hooks';
import type { Address } from '../../../types/AddressType';

interface AddressCardProps {
  address: Address;
  onDeleteSuccess: () => void;
  onEditAddress: () => void;
}
export function AddressCard({
  address,
  onDeleteSuccess,
  onEditAddress,
}: AddressCardProps) {
  const { user } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeAddress = async () => {
    const { error } = await supabase
      .from('Address')
      .delete()
      .eq('id', address.id);

    if (error) {
      toast.error(`Ocorreu um erro ao deletar o Endereço`);
      setIsModalOpen(false);
      return;
    }

    toast.success('Endereço deletado com sucesso');
    setIsModalOpen(false);
    onDeleteSuccess();
  };

  const handleSetDefault = async () => {
    const { error: resetError } = await supabase
      .from('Address')
      .update({ is_default: false })
      .eq('user_id', user?.id);

    if (resetError) {
      toast.error('Erro ao remover o padrão dos outros endereços.');
      return;
    }

    const { error: setDetaultError } = await supabase
      .from('Address')
      .update({ is_default: true })
      .eq('id', address.id);

    if (setDetaultError) {
      toast.error('Erro ao definir este endereço como padrão.');
      return;
    }

    toast.success('Endereço definido como padrão!');

    onDeleteSuccess?.();
  };

  return (
    <div
      className={`flex items-start gap-4 p-5 border rounded-xl bg-white shadow-sm  transition-colors cursor-pointer w-full ${address.is_default ? 'border-amber-400 ring-1 ring-amber-400' : 'border-gray-200 hover:border-amber-400'}`}
    >
      {address.is_default === true}
      <div className="bg-amber-100 p-3 rounded-full text-amber-600 mt-1 shrink-0">
        {address.identifyType === 'home' ? (
          <House size={24} />
        ) : address.identifyType === 'work' ? (
          <BriefcaseBusiness size={24} />
        ) : (
          <MapPin size={24} />
        )}
      </div>
      <div className="flex flex-col text-left w-full">
        <div
          className={`flex justify-between w-full items-center ${address.is_default ? 'mb-0' : 'mb-8'}`}
        >
          <h1 className="font-bold text-gray-800">{address.identify}</h1>
          <div className="flex gap-3 text-gray-400 items-center">
            <button
              className="hover:bg-blue-100 hover:text-blue-600 p-2 cursor-pointer rounded-xl"
              onClick={onEditAddress}
            >
              <Pen size={18} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:bg-red-100 hover:text-red-600 p-2 cursor-pointer rounded-xl"
            >
              <Trash2 size={18} />
            </button>

            {address.is_default ? null : (
              <button
                onClick={handleSetDefault}
                className="hover:bg-amber-100 hover:text-amber-600 p-2 cursor-pointer rounded-xl"
              >
                <MapPin size={18} />
              </button>
            )}
          </div>
        </div>

        {address.is_default ? (
          <div className="max-w-max bg-amber-100 rounded-2xl py-0.5 px-1.5  mb-3">
            <p className="text-amber-700 text-xs font-medium">
              Endereço padrão
            </p>
          </div>
        ) : null}
        <span className="">
          {address.street}, {address.number}
        </span>
        {address.complement && (
          <span className="text-sm text-gray-500">{address.complement}</span>
        )}
        <span className="text-sm text-gray-500">
          {address.neighborhood} - {address.city}/{address.state}
        </span>
        <span className="text-xs text-gray-400 mt-2">CEP: {address.cep}</span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 text-red-500 p-3 rounded-full mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                Excluir Endereço?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Tem certeza que deseja apagar o endereço de{' '}
                <strong>{address.identify}</strong>? Essa ação não pode ser
                desfeita.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={removeAddress}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
