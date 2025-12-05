// components/ui/hj/HJInput.tsx
'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface HJInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const HJInput = forwardRef<HTMLInputElement, HJInputProps>(
  (
    { label, error, helperText, leftIcon, rightIcon, className = '', ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-hj-textMain mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-hj-textSoft">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full rounded-2xl bg-hj-cardSoft border
              ${error ? 'border-red-400' : 'border-white/40'}
              px-4 py-3
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              text-sm text-hj-textMain placeholder:text-hj-textSoft/60
              focus:outline-none focus:ring-2 focus:ring-hj-primary/50 focus:border-hj-primary
              transition-all duration-200
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-hj-textSoft">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-xs text-hj-textSoft">{helperText}</p>
        )}
      </div>
    );
  }
);

HJInput.displayName = 'HJInput';
