import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#E6E8EB]/50 transition-all ${
        onClick ? 'cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] active:scale-[0.98]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
