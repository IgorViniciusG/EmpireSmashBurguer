interface CategoryTabs {
  active: string;
  onTabChange: (tab: string) => void;
}

export function CategoryTabs({ active, onTabChange }: CategoryTabs) {
  const tabs = ['Burguers', 'Combos', 'Acompanhamento'];

  return (
    <div className="border-y border-gray-200 w-full  mt-4">
      <ul className="flex gap-6 font-semibold text-gray-600 ">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-4 cursor-pointer transition-colors ${active === tab ? 'text-amber-400  border-b-2' : 'text-gray-700'}`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
}
