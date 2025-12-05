// components/ui/hj-stat-card.tsx
import type { ReactNode } from 'react';

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  gradient?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  gradient = 'from-hj-primary to-hj-primarySoft',
  subtitle,
  description,
  className = '',
}: StatCardProps) {
  return (
    <div className={`rounded-3xl bg-hj-cardSoft shadow-hj border border-white/40 p-4 flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} from-hj-primary/15 to-hj-primarySoft/20 shadow-hj-inner`}>
            {icon}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-hj-textSoft">{label}</span>
          <span className="text-lg font-semibold text-hj-textMain">
            {value}
          </span>
          {subtitle && (
            <span className="text-xs text-hj-textSoft">{subtitle}</span>
          )}
        </div>
      </div>
      {description && (
        <p className="text-[11px] leading-tight text-hj-textSoft">
          {description}
        </p>
      )}
    </div>
  );
}

