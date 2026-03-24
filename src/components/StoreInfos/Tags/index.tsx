import { Badge } from '../../Bagde';

export function Tags() {
  return (
    <div className="flex gap-3 text-amber-600">
      <Badge>Entrega</Badge>

      <Badge>Retirada</Badge>
    </div>
  );
}
