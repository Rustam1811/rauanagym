'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export default function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: PremiumButtonProps) {
  const baseStyles = 'font-semibold rounded-2xl transition-smooth btn-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variants = {
    primary: 'bg-gradient-accent text-white shadow-button hover:shadow-glow active:scale-95',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95',
    outline: 'bg-transparent border-2 border-gray-200 text-gray-900 hover:border-accent-blue hover:text-accent-blue active:scale-95',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
