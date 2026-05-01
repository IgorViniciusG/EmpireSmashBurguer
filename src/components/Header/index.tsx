
import { Link } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext/hooks';
import { toast } from 'sonner';

export function Header() {
  const { user, logout } = useAuthContext();

  return (
    <div className="flex justify-between items-center px-10 border-b border-gray-300 font-sans bg-white h-20 sticky top-0 z-50">
      <img
        className="w-16 h-16 rounded-full"
        src="/images/Logo.png"
        alt="Empire Logo"
      />

      <ul className="flex items-center gap-6 font-semibold">
        <li className="hover:text-amber-400 cursor-pointer transition-colors duration-300">
          <Link to={'/'}>Início</Link>
        </li>

        {user ? (
          <li className="hover:text-amber-400 cursor-pointer transition-colors duration-300">
            <Link to={'/Pedidos'}>Pedidos</Link>
          </li>
        ) : (
          <li className="hover:text-amber-400  transition-colors duration-300">
            <Link
              to={'/Login'}
              className="cursor-not-allowed"
              onClick={() =>
                toast.error('Realize o Login para ver seus pedidos!')
              }
            >
              Pedidos
            </Link>
            {}
          </li>
        )}

        {user ? (
          <li className="flex items-center gap-4 pl-4 border-l border-gray-300 ml-2">
            <Link
              to={'/Perfil'}
              className="hover:text-amber-400 transition-colors"
            >
              Olá, {user.user_metadata.name}
            </Link>
            <button
              title="sair"
              onClick={logout}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 py-1 px-3 rounded-md text-sm transition-colors cursor-pointer"
            >
              Sair
            </button>
          </li>
        ) : (
          <li className="ml-2">
            <Link
              to="/Login"
              className="bg-amber-400 hover:bg-amber-500 transition-colors text-gray-900 py-2 px-6 rounded-full font-bold"
            >
              Entrar
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
