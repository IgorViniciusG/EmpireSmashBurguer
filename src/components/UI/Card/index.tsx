interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white p-4 md:p-6 my-3 w-full rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
