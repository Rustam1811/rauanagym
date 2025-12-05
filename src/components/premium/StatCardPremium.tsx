'use client';

import { LucideIcon } from 'lucide-react';
import GlassContainer from './GlassContainer';

interface StatCardPremiumProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  color?: 'blue' | 'cyan' | 'green' | 'orange' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCardPremium({
  icon: Icon,
  label,
  value,
  subtitle,
  color = 'blue',
  trend,
}: StatCardPremiumProps) {
  const colorConfig = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-accent-blue',
      gradient: 'from-blue-400 to-cyan-400',
    },
    cyan: {
      bg: 'bg-cyan-50',
      icon: 'text-accent-cyan',
      gradient: 'from-cyan-400 to-blue-400',
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-500',
      gradient: 'from-green-400 to-emerald-400',
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-500',
      gradient: 'from-orange-400 to-red-400',
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-500',
      gradient: 'from-purple-400 to-pink-400',
    },
  };

  const config = colorConfig[color];

  return (
    <GlassContainer className="p-5 hover" blur="md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`${config.bg} p-2.5 rounded-xl`}>
              <Icon className={`w-5 h-5 ${config.icon}`} />
            </div>
            <span className="text-sm font-medium text-gray-600">{label}</span>
          </div>
          
          <div className="space-y-1">
            <div className={`text-3xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
            trend.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            <span className="text-xs font-semibold">
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          </div>
        )}
      </div>
    </GlassContainer>
  );
}
