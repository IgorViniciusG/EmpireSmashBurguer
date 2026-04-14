import { SearchIcon } from 'lucide-react';

export function Header() {
  return (
    <div className="flex justify-around items-center p-5 border-b border-gray-300 font-sans bg-white h-fit sticky top-0 z-50">
      <img className="w-15 h-15 rounded-full" src="/images/Logo.png" alt="" />
      <div className=" flex gap-3 border p-2 rounded-4xl text-gray-400 w-1/4 focus-within:border-amber-300 transition-colors">
        <SearchIcon />
        <input
          type="search"
          className="focus:outline-none w-full"
          placeholder="Buscar no cardápio"
        />
      </div>

      <ul className="flex gap-6 font-semibold ">
        <li className="hover:text-amber-300 cursor-pointer transition duration-300 ease-in-out">
          Início
        </li>
        <li className="hover:text-amber-300 cursor-pointer transition duration-300 ease-in-out">
          Pedidos
        </li>
        <li className="hover:text-amber-300 cursor-pointer transition duration-300 ease-in-out">
          Perfil
        </li>
      </ul>
    </div>
  );
}
