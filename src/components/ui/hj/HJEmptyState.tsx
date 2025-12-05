// components/ui/hj/HJEmptyState.tsx
'use client';

import type { ReactNode } from 'react';
import { HJButton } from '../../HJButton';

interface HJEmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function HJEmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: HJEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-hj-primary/10 to-hj-primarySoft/20 shadow-hj-inner mb-4">
        <div className="text-hj-primary">{icon}</div>
      </div>

      <h3 className="text-base font-semibold text-hj-textMain mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-hj-textSoft mb-6 max-w-sm">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <HJButton label={actionLabel} onClick={onAction} className="max-w-xs" />
      )}
    </div>
  );
}
