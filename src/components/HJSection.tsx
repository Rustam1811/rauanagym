// components/ui/hj-section.tsx
import type { ReactNode } from 'react';

interface HJSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function HJSection({ title, children, className = '' }: HJSectionProps) {
  return (
    <section className={`mb-6 ${className}`}>
      {title && (
        <h2 className="mb-3 text-base font-semibold text-hj-textMain">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
