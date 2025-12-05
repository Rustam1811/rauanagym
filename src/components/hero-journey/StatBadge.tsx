import { LucideIcon } from 'lucide-react';

interface StatBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: 'purple' | 'pink' | 'blue' | 'green' | 'orange';
}

export default function StatBadge({ icon: Icon, label, value, color = 'purple' }: StatBadgeProps) {
  const colorClasses = {
    purple: 'from-primarySoft/20 to-primary/20 text-primary',
    pink: 'from-neon-pink/20 to-primary/20 text-neon-pink',
    blue: 'from-neon-blue/20 to-accent-blue/20 text-neon-blue',
    green: 'from-accentGreen/20 to-success/20 text-accentGreen',
    orange: 'from-accentYellow/20 to-accentRed/20 text-accentYellow',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-4 flex flex-col items-center justify-center text-center min-h-[80px] shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-strong hover:scale-[1.02]`}>
      <Icon className="w-6 h-6 mb-2" strokeWidth={2.5} />
      <div className="text-title-md font-bold tracking-tight">{value}</div>
      <div className="text-caption text-textSecondary mt-0.5">{label}</div>
    </div>
  );
}
