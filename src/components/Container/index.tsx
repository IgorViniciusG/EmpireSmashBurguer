import type { PropsWithChildren } from 'react';

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-start px-4">
      {children}
    </div>
  );
}
