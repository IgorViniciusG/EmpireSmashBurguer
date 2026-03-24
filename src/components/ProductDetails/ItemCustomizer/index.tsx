import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../../Container';
import { Card } from '../../Card';
import { extras, meatDoneness } from '../../../constants/productOptions';
import { useState } from 'react';

import type { ExtrasType } from '../../../types/ExtrasType';
import type { DonenessType } from '../../../types/DonenessType';
import type { ProductType } from '../../../types/ProductType';

interface ProductProps {
  productInfo: ProductType;
  onChangeDoneness: (value: DonenessType) => void;
  onChangeExtras: (value: ExtrasType[]) => void;
}

export function ItemCustomizer({
  productInfo,
  onChangeDoneness,
  onChangeExtras,
}: ProductProps) {
  const [selectd, setSelected] = useState<ExtrasType[]>([]);

  function handleOptionClick(event: DonenessType) {
    onChangeDoneness(event);
  }

  function handleExtrasOptions(extra: ExtrasType) {
    setSelected((prev) => {
      const updated = prev.includes(extra)
        ? prev.filter((item) => item !== extra)
        : [...prev, extra];

      onChangeExtras(updated);
      return updated;
    });
  }
  return (
    <Container>
      <Link to="/" className="flex items-center gap-2 text-sm my-5">
        <ArrowLeft size={14} /> Voltar ao cardápio{' '}
      </Link>
      <img
        className="h-96 w-full border-0 rounded-xl"
        src={productInfo?.banner}
        alt={productInfo?.name}
      />

      <Card>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">{productInfo?.name}</h1>
          <p className="text-sm text-gray-600">{productInfo?.description}</p>
          <p className="font-bold text-xl">R${productInfo?.price.toFixed(2)}</p>
        </div>
      </Card>

      <Card>
        <div className="w-full">
          <h1 className="font-bold text-xl">Pontos da Carne</h1>

          {meatDoneness.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 w-full p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-transparent has-[:checked]:border-amber-400 has-[:checked]:my-3"
            >
              <input
                type="radio"
                className="w-4 h-4 rounded-full accent-amber-400 cursor-pointer"
                name="meatDoneness"
                value={option.label}
                onChange={() => handleOptionClick(option)}
              />

              <div>{option.label}</div>
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <div className="w-full">
          <h1 className="font-bold text-xl">Adicionais</h1>
          {extras.map((extra) => (
            <label
              key={extra.id}
              className="flex items-center gap-3 w-full p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-transparent has-[:checked]:border-amber-400 has-[:checked]:my-3 "
            >
              <input
                type="checkbox"
                className="w-4 h-4 accent-amber-400 cursor-pointer"
                value={extra.id}
                checked={selectd.includes(extra)}
                onChange={() => handleExtrasOptions(extra)}
              />

              <div className="flex justify-between w-full items-center">
                <span className="text-gray-700 font-medium">{extra.label}</span>
                <span className="text-gray-500 text-sm">{`+R$ ${extra.price.toFixed(2)}`}</span>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <div className="w-full">
          <h1 className="font-bold text-xl">Observações</h1>
          <textarea
            placeholder="Sem cebola, carne bem passada..."
            className=" gap-3 justify-start items-start border rounded-xl text-gray-400 focus:outline-none focus:border-amber-400 transition-colors my-3 p-3 h-22 w-full"
          />
        </div>
      </Card>
    </Container>
  );
}
