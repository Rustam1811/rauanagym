// components/ui/hj-card.tsx
import type { ReactNode } from 'react';

interface HJCardProps {
  children: ReactNode;
  className?: string;
}

export function HJCard({ children, className = '' }: HJCardProps) {
  return (
    <div
      className={`rounded-3xl bg-hj-card shadow-hj border border-white/40 backdrop-blur-xl p-5 ${className}`}
    >
      {children}
    </div>
  );
}
