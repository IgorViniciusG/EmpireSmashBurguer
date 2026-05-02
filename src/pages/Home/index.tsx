
import { Bag } from "../../components/checkout/Bag";
import { CartSummary } from "../../components/checkout/BagSummary";
import { Container } from "../../components/layout/Container";
import { Menu } from "../../components/layout/Menu/Menu";
import { StoreInfos } from "../../components/products/StoreInfos";

export function Home() {
  return (
    <div className="pt-5 pb-10 bg-gray-50">
      <Container>
        <div className="lg:hidden">
          <Bag />
        </div>
        <StoreInfos />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          <div className="md:col-span-8 w-full">
            <Menu />
          </div>

          <div className="md:col-span-4 h-fit sticky top-37 hidden md:block">
            <CartSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
