import { Check, Clock, Truck, Package } from 'lucide-react';

export function OrderTracker() {
  const steps = [
    {
      id: 1,
      title: 'Pedido Confirmado',
      description: 'Recebemos seu pedido.',
      icon: Check,
      done: true,
    },
    {
      id: 2,
      title: 'Preparando',
      description: 'Sua carne está na chapa!',
      icon: Clock,
      done: true,
    },
    {
      id: 3,
      title: 'Saiu para entrega',
      description: 'O motoboy está a caminho.',
      icon: Truck,
      done: false,
    },
    {
      id: 4,
      title: 'Entregue',
      description: 'Bom apetite!',
      icon: Package,
      done: false,
    },
  ];

  return (
    <div className="flex flex-col mt-6 p-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  step.done
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Icon size={20} />
              </span>

              {!isLast && (
                <div
                  className={`w-0.5 h-12 my-1 rounded-full ${
                    step.done ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>

            <div className="pt-2 pb-6">
              {' '}
              <p
                className={`font-bold ${step.done ? 'text-gray-800' : 'text-gray-400'}`}
              >
                {step.title}
              </p>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
