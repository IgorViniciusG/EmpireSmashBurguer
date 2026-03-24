import { Clock, MapPin } from 'lucide-react';

export function StoreHeader() {
  return (
    <section className="justify-start flex flex-col gap-3">
      <h1 className="font-bold text-2xl pt-7">Empire Smash Burguer</h1>
      <div className="flex gap-5 text-sm mb-5">
        <p className="flex gap-3 text-gray-600 items-center ">
          <MapPin size={14} />
          Rua das Burgers, 123 - Centro
        </p>
        <p className="flex gap-3 text-green-600 items-center">
          <Clock size={14} />
          Aberto até às 23:00
        </p>
      </div>
    </section>
  );
}
