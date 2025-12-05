'use client';

import { ReactNode } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export default function GlassContainer({ 
  children, 
  className = '', 
  blur = 'md',
  hover = false 
}: GlassContainerProps) {
  const blurClass = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-glass',
    lg: 'backdrop-blur-xl',
  }[blur];

  return (
    <div
      className={`
        bg-white/70 ${blurClass}
        border border-white/20
        rounded-2xl
        ${hover ? 'card-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
