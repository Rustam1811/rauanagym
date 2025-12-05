'use client';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  colors?: [string, string]; // gradient colors
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  colors = ['#4F80FF', '#6CEFFF'],
  showLabel = true,
  label,
  animated = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className={animated ? 'transform -rotate-90' : ''}
      >
        <defs>
          <linearGradient id={`gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${size})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={animated ? 'transition-all duration-1000 ease-out' : ''}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold gradient-text">
            {Math.round(progress)}%
          </span>
          {label && (
            <span className="text-xs text-gray-500 mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
