import { Link } from 'react-router';
import type { ProductType } from '../../../types/ProductType';
import { Card } from '../../Card';

interface ProductCardProps {
  item: ProductType;
}

export function ProductCard({ item }: ProductCardProps) {
  return (
    <Link to={`/Produto/${item.id}`}>
      <Card className="cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">
        <div className="text-gray-500 flex flex-col gap-2 max-w-md">
          <h1 className="font-semibold text-xl text-black">{item.name}</h1>
          <p className="text-sm leading-relaxed">{item.description}</p>
          <p className="text-sm mt-1">
            A partir de{' '}
            <span className="text-black font-semibold text-base">
              R$ {item.price.toFixed(2)}
            </span>
          </p>
        </div>
        <div>
          <img
            className="w-36 h-36 object-cover rounded-2xl"
            src={item.image}
            alt={item.name}
          />
        </div>
      </Card>
    </Link>
  );
}
