// components/ui/hj-screen.tsx
import type { ReactNode } from 'react';

interface HJScreenProps {
  children: ReactNode;
  className?: string;
}

export function HJScreen({ children, className = '' }: HJScreenProps) {
  return (
    <div className={`min-h-screen bg-hj-screen ${className}`}>
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-24 pt-4">
        {children}
      </div>
    </div>
  );
}
