import { useState } from 'react';
import { BagDrawer } from './BagDrawer';
import { BagIcon } from './BagIcon';
import { useBagContext } from '../../contexts/BagContext/hooks';

export function Bag() {
  const { state } = useBagContext();
  const [isOpen, setIsOpen] = useState(false);

  function handleIsOpen(
    onClickisOpen: boolean | ((prevState: boolean) => boolean),
  ) {
    setIsOpen(onClickisOpen);
  }

  return (
    <div>
      {state.length ? (
        <BagIcon isOpen={isOpen} setIsOpen={handleIsOpen} />
      ) : null}
      <BagDrawer isOpen={isOpen} onClose={setIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
