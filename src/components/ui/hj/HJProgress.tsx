// components/ui/hj/HJProgress.tsx
interface HJProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const variantClasses = {
  primary: 'from-hj-primary to-hj-primarySoft',
  success: 'from-green-500 to-green-600',
  warning: 'from-yellow-500 to-yellow-600',
  error: 'from-red-500 to-red-600',
};

export function HJProgress({
  value,
  max = 100,
  label,
  showPercentage = false,
  size = 'md',
  variant = 'primary',
  className = '',
}: HJProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-xs font-medium text-hj-textMain">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-xs font-semibold text-hj-primary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full bg-hj-cardSoft rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full bg-gradient-to-r ${variantClasses[variant]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
