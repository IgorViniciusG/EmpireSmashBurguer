import { Routes, Route, BrowserRouter } from 'react-router';
import { Home } from '../../pages/Home';
import { ProductPage } from '../../pages/ProductPage';
import { Header } from '../../components/layout/Header';
import { OrdersPage } from '../../pages/OrdersPage';
import { OrderDetailsPage } from '../../pages/OrderDetailsPage';
import { Register } from '../../pages/Register';
import { Login } from '../../pages/Login';
import { ProtectedRoutes } from '../../utils/ProtectedRoutes';
import { AddressPage } from '../../pages/AddressPage';
import { PerfilPage } from '../../pages/PerfilPage';

export function MainRouter() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/Produto/:id`} element={<ProductPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Pedidos" element={<OrdersPage />} />
          <Route path="/Pedidos/:id" element={<OrderDetailsPage />} />
          <Route path="/Endereços" element={<AddressPage />} />
          <Route path="/Perfil" element={<PerfilPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
