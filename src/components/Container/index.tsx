interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`w-full max-w-7xl min-h-[calc(95vh-5rem)] mx-auto px-4 ${className}`}
    >
      {children}
    </div>
  );
}
