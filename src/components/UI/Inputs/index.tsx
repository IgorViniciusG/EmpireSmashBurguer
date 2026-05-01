import { type ComponentProps, forwardRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1 w-full">
        <span className="font-medium text-gray-700">{label}</span>
        <input
          {...props}
          ref={ref}
          className={`border rounded-lg py-2 px-4 focus:outline-none transition-colors w-full
            ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-amber-400'}`}
        />
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </label>
    );
  },
);

Input.displayName = 'Input';
