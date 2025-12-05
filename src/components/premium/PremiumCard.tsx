'use client';

import { ReactNode } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export default function PremiumCard({
  children,
  className = '',
  hover = true,
  gradient = false,
  glass = false,
  onClick,
}: PremiumCardProps) {
  const isClickable = !!onClick;

  return (
    <div
      className={`
        ${glass ? 'glass' : 'bg-white'}
        ${gradient ? 'gradient-border' : 'border border-gray-200'}
        rounded-2xl p-6
        shadow-card
        ${hover ? 'card-hover' : ''}
        ${isClickable ? 'cursor-pointer active:scale-98' : ''}
        transition-smooth
        ${className}
      `}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {children}
    </div>
  );
}
