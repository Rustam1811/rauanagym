// components/ui/hj/HJBadge.tsx
import type { ReactNode } from 'react';

interface HJBadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  neutral: 'bg-hj-cardSoft text-hj-textMain',
};

const sizeClasses = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

export function HJBadge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}: HJBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-semibold
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
