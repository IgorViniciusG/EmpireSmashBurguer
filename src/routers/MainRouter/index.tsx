import { Routes, Route, BrowserRouter } from 'react-router';
import { Home } from '../../pages/Home';
import { ProductPage } from '../../pages/ProductPage';
import { Header } from '../../components/Header';

export function MainRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/Produto/:id`} element={<ProductPage />} />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/cart" />
        <Route path="/product" />
      </Routes>
    </BrowserRouter>
  );
}
