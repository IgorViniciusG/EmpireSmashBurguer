import { Link } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext/hooks';
import { toast } from 'sonner';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const closeMenu = () => setIsMenuOpen(false);

  return (

    <header className="flex justify-between items-center px-4 md:px-10 border-b border-gray-300 font-sans bg-white h-20 sticky top-0 z-50">
      <img
        className="w-16 h-16 rounded-full"
        src="/images/Logo.png"
        alt="Empire Logo"
      />


      <ul className="hidden md:flex items-center gap-6 font-semibold">
        <li className="hover:text-amber-400 cursor-pointer transition-colors duration-300">
          <Link to={'/'}>Início</Link>
        </li>

        {user ? (
          <li className="hover:text-amber-400 cursor-pointer transition-colors duration-300">
            <Link to={'/Pedidos'}>Pedidos</Link>
          </li>
        ) : (
          <li className="hover:text-amber-400 transition-colors duration-300">
            <Link
              to={'/Login'}
              className="cursor-not-allowed"
              onClick={() =>
                toast.error('Realize o Login para ver seus pedidos!')
              }
            >
              Pedidos
            </Link>
          </li>
        )}

        {user ? (
          <li className="flex items-center gap-4 pl-4 border-l border-gray-300 ml-2">
            <Link
              to={'/Perfil'}
              className="hover:text-amber-400 transition-colors"
            >
              Olá, {user.user_metadata.name?.split(' ')[0]}{' '}

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


      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

    
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg flex flex-col p-4 gap-4 font-semibold md:hidden z-40">
          <Link
            to={'/'}
            onClick={closeMenu}
            className="hover:text-amber-400 p-2"
          >
            Início
          </Link>

          {user ? (
            <Link
              to={'/Pedidos'}
              onClick={closeMenu}
              className="hover:text-amber-400 p-2"
            >
              Pedidos
            </Link>
          ) : (
            <button
              className="text-left p-2 hover:text-amber-400"
              onClick={() => {
                toast.error('Realize o Login para ver seus pedidos!');
                closeMenu();
              }}
            >
              Pedidos
            </button>
          )}

          <hr className="text-gray-100 my-2" />

          {user ? (
            <div className="flex flex-col gap-4">
              <Link
                to={'/Perfil'}
                onClick={closeMenu}
                className="hover:text-amber-400 p-2"
              >
                Meu Perfil ({user.user_metadata.name?.split(' ')[0]})
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="text-left p-2 text-red-500 font-bold"
              >
                Sair da Conta
              </button>
            </div>
          ) : (
            <Link
              to="/Login"
              onClick={closeMenu}
              className="bg-amber-400 text-center text-gray-900 py-3 rounded-full font-bold w-full"
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
