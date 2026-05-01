import { Outlet, Navigate } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext/hooks';

export function ProtectedRoutes() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl text-amber-500 font-bold">Carregando...</h1>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/Login" replace />;
}
