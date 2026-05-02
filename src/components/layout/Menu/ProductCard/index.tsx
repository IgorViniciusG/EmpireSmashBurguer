import { Link } from 'react-router';
import type { ProductType } from '../../../../types/ProductType';
import { Card } from '../../../UI/Card';

interface ProductCardProps {
  item: ProductType;
}

export function ProductCard({ item }: ProductCardProps) {
  return (
    <Link to={`/Produto/${item.id}`} className="flex w-full">
      <Card className="flex flex-row justify-between items-center w-full gap-4 cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">
        <div className="text-gray-500 flex flex-col gap-2 flex-1 min-w-0">
          <h1 className="font-semibold text-xl text-black leading-tight truncate">
            {item.name}
          </h1>
          <p className="text-sm leading-relaxed line-clamp-3">
            {item.description}
          </p>
          <p className="text-sm mt-1">
            A partir de{' '}
            <span className="text-black font-semibold text-base whitespace-nowrap">
              R$ {item.price.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="shrink-0">
          <img
            className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-2xl"
            src={item.image}
            alt={item.name}
          />
        </div>
      </Card>
    </Link>
  );
}
