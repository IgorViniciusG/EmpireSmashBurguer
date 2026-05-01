import { Check, Clock, Truck, Package } from 'lucide-react';

interface OrderTrackerProps {
  currentStatus?:
    | 'pendente'
    | 'preparando'
    | 'entregando'
    | 'entregue'
    | 'cancelado';
}

export function OrderTracker({ currentStatus }: OrderTrackerProps) {
  const statusOrder = ['pendente', 'preparando', 'entregando', 'entregue'];

  const currentStepIndex = statusOrder.indexOf(currentStatus ?? 'pendente');

  const steps = [
    {
      id: 1,
      title: 'Pedido Confirmado',
      description: 'Recebemos seu pedido.',
      icon: Check,

      done: currentStepIndex >= 0,
    },
    {
      id: 2,
      title: 'Preparando',
      description: 'Sua carne está na chapa!',
      icon: Clock,
      done: currentStepIndex >= 1,
    },
    {
      id: 3,
      title: 'Saiu para entrega',
      description: 'O motoboy está a caminho.',
      icon: Truck,
      done: currentStepIndex >= 2,
    },
    {
      id: 4,
      title: 'Entregue',
      description: 'Bom apetite!',
      icon: Package,
      done: currentStepIndex >= 3,
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
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                  step.done
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Icon size={20} />
              </span>

              {!isLast && (
                <div
                  className={`w-0.5 h-12 my-1 rounded-full transition-all duration-500 ${
                    steps[index + 1].done ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>

            <div className="pt-2 pb-6">
              <p
                className={`font-bold transition-colors ${
                  step.done ? 'text-gray-800' : 'text-gray-400'
                }`}
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
