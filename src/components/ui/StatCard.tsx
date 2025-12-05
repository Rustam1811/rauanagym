import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
  accent?: boolean;
}

export function StatCard({ label, value, icon, subtitle, accent }: StatCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#E6E8EB]/50 transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${accent ? 'border-l-4 border-l-[#3A7AFE]' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-[#6B7280] uppercase tracking-wider">{label}</p>
        {icon && <div className="text-[#3A7AFE]">{icon}</div>}
      </div>
      <p className="text-4xl font-bold text-[#1C1F23] mb-1">{value}</p>
      {subtitle && <p className="text-sm text-[#6B7280]">{subtitle}</p>}
    </div>
  );
}
