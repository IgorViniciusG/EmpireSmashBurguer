import { MapPin } from 'lucide-react';

import { Link } from 'react-router';

import type { Address } from '../../../types/AddressType';
import { Card } from '../../UI/Card';

interface PersonalAddressCardProps {
  address?: Address | null;
  onSetAddress: (address: Address) => void;
}

export function PersonalAddressCard({ address }: PersonalAddressCardProps) {
  return (
    <Card className="flex flex-col h-fit">
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <span className="flex bg-blue-100 text-blue-600 h-12 w-12 rounded-full justify-center items-center">
            <MapPin />
          </span>
          <h2 className="font-semibold text-lg">Endereço Padrão</h2>
        </div>
        <div>
          <Link
            to={'/Endereços'}
            className="text-amber-600 flex items-center font-semibold gap-2 hover:bg-amber-50 p-2 rounded-full transition-colors"
          >
            <MapPin size={16} />
            <p className="text-sm">Gerenciar</p>
          </Link>
        </div>
      </section>

      {address ? (
        <section className="font-medium text-gray-600 flex flex-col gap-1 mt-6">
          <p className="text-gray-800 font-semibold">
            {address?.street}, {address?.number}
          </p>
          <p>{address?.neighborhood}</p>
          <p>
            {address?.city} - {address?.state}
          </p>
          <p className="text-gray-500 mt-2 text-sm">CEP: {address?.cep}</p>
        </section>
      ) : (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
          Você ainda não possui um endereço padrão definido.
        </div>
      )}
    </Card>
  );
}
