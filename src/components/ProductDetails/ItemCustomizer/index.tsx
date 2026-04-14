import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../../Container';
import { Card } from '../../Card';
import { extras, meatDoneness } from '../../../constants/productOptions';
import { useState } from 'react';

import type { ExtrasType } from '../../../types/ExtrasType';
import type { DonenessType } from '../../../types/DonenessType';
import type { ProductType } from '../../../types/ProductType';
import type { BagItensType } from '../../../types/BagItensType';

interface ProductProps {
  productInfo: ProductType;
  onChangeDoneness: (value: DonenessType) => void;
  onChangeExtras: (value: ExtrasType[]) => void;
  doneness: DonenessType;
  selectedExtras: ExtrasType[];
  isEditing: boolean;
  bagItem: BagItensType;
}

export function ItemCustomizer({
  productInfo,
  onChangeDoneness,
  onChangeExtras,
  doneness,
  selectedExtras,
  isEditing,
}: ProductProps) {
  const [selected, setSelected] = useState<ExtrasType[]>(selectedExtras);

  function handleOptionClick(event: DonenessType) {
    onChangeDoneness(event);
  }

  function handleExtrasOptions(extra: ExtrasType) {
    const isAlreadySelected = selected.some((item) => item.id === extra.id);

    const updated = isAlreadySelected
      ? selected.filter((item) => item.id !== extra.id)
      : [...selected, extra];

    setSelected(updated);
    onChangeExtras(updated);
  }

  return (
    <Container>
      <Link
        to="/"
        className="flex items-center gap-2 text-sm my-5 hover:text-amber-500 transition-colors"
      >
        <ArrowLeft size={14} /> Voltar ao cardápio
      </Link>

      <img
        className="h-96 w-full object-cover rounded-xl"
        src={productInfo?.banner}
        alt={productInfo?.name}
      />

      <Card>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">{productInfo?.name}</h1>
          <p className="text-sm text-gray-600">{productInfo?.description}</p>
          <p className="font-bold text-xl">
            R$ {productInfo?.price.toFixed(2)}
          </p>
        </div>
      </Card>

      <Card>
        <form action="" className="w-full">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl mb-3">Pontos da Carne</h1>
            <p className="text-red-600">*</p>
          </div>

          {isEditing
            ? meatDoneness.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 w-full p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-transparent has-[:checked]:border-amber-400 has-[:checked]:my-3"
                >
                  <input
                    type="radio"
                    className="w-4 h-4 rounded-full accent-amber-400 cursor-pointer"
                    name="meatDoneness"
                    value={option.label}
                    checked={doneness.label === option.label}
                    onChange={() => handleOptionClick(option)}
                  />
                  <div>{option.label}</div>
                </label>
              ))
            : meatDoneness.map((option) => (
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
        </form>
      </Card>

      <Card>
        <form action="" className="w-full">
          <h1 className="font-bold text-xl mb-3">Adicionais</h1>
          {isEditing
            ? extras.map((extra) => (
                <label
                  key={extra.id}
                  className="flex items-center gap-3 w-full p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-transparent has-[:checked]:border-amber-400 has-[:checked]:my-3 "
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-amber-400 cursor-pointer"
                    value={extra.id}
                    checked={selectedExtras.some(
                      (item) => item.id === extra.id,
                    )}
                    onChange={() => handleExtrasOptions(extra)}
                  />

                  <div className="flex justify-between w-full items-center">
                    <span className="text-gray-700 font-medium">
                      {extra.label}
                    </span>
                    <span className="text-gray-500 text-sm">{`+R$ ${extra.price.toFixed(2)}`}</span>
                  </div>
                </label>
              ))
            : extras.map((extra) => (
                <label
                  key={extra.id}
                  className="flex items-center gap-3 w-full p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl border border-transparent has-[:checked]:border-amber-400 has-[:checked]:my-3 "
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-amber-400 cursor-pointer"
                    value={extra.id}
                    checked={selected.some((item) => item.id === extra.id)}
                    onChange={() => handleExtrasOptions(extra)}
                  />

                  <div className="flex justify-between w-full items-center">
                    <span className="text-gray-700 font-medium">
                      {extra.label}
                    </span>
                    <span className="text-gray-500 text-sm">{`+R$ ${extra.price.toFixed(2)}`}</span>
                  </div>
                </label>
              ))}
        </form>
      </Card>
    </Container>
  );
}
