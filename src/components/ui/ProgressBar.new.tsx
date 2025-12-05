interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'blue' | 'green' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ProgressBar({ progress, color = 'blue', size = 'md', showLabel = false }: ProgressBarProps) {
  const colorClasses = {
    blue: 'bg-[#3A7AFE]',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#6B7280]">Progress</span>
          <span className="text-sm font-bold text-[#1C1F23]">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-[#E8F1FF] rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`${heightClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
