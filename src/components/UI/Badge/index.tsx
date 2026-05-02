import type { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="bg-amber-100 border border-amber-200 rounded-full text-xs py-1 px-3 flex items-center justify-center gap-1">
      {children}
    </span>
  );
}
