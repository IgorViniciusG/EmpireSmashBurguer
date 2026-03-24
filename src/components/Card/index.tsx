interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`flex w-full justify-between bg-white p-5 my-3 rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
