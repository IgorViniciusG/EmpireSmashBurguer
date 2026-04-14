import { ShoppingBag } from 'lucide-react';

import type { Dispatch, SetStateAction } from 'react';
import { useBagContext } from '../../../contexts/BagContext/hooks';

interface BagProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function BagIcon({ setIsOpen }: BagProps) {
  const { state } = useBagContext();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className=" cursor-pointer fixed bottom-4 right-4 m-3 p-4 rounded-full bg-amber-400 hover:bg-amber-500 hover:scale-110 hover:shadow-xl transition-all duration-200"
    >
      <span className="absolute -top-1 -right-1 bg-black text-white rounded-full p-3 text-xs font-bold h-4 w-4 flex justify-center items-center">
        {state.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
      <ShoppingBag size={26} />
    </button>
  );
}
