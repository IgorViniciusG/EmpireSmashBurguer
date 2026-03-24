import { Container } from '../../components/Container';

import { Menu } from '../../components/Menu/Menu';
import { StoreInfos } from '../../components/StoreInfos/StoreInfos';

export function Home() {
  return (
    <>
      <Container>
        <StoreInfos />
        <Menu />
      </Container>
    </>
  );
}
