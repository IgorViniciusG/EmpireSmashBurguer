import { Bag } from '../../components/Bag';
import { CartSummary } from '../../components/CartSummary';
import { Container } from '../../components/Container';

import { Menu } from '../../components/Menu/Menu';
import { StoreInfos } from '../../components/StoreInfos/StoreInfos';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="lg:hidden">
          <Bag />
        </div>
        <StoreInfos />
        <div className="grid grid-cols-12 gap-8 w-full">
          <div className="col-span-8">
            <Menu />
          </div>

          <div className="col-span-4 h-fit sticky top-37 hidden md:block">
            <CartSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
