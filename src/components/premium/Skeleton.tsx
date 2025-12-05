'use client';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'circle' | 'rect';
  width?: string;
  height?: string;
  className?: string;
}

export default function Skeleton({
  variant = 'rect',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    card: 'h-48 w-full rounded-2xl',
    circle: 'rounded-full',
    rect: 'rounded-xl',
  };

  const style = {
    width: width || (variant === 'circle' ? '48px' : undefined),
    height: height || (variant === 'circle' ? '48px' : undefined),
  };

  return (
    <div
      className={`skeleton ${variants[variant]} ${className}`}
      style={style}
    />
  );
}

// Composite skeleton components
export function WorkoutCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-0 overflow-hidden">
      <Skeleton variant="card" height="192px" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" height="24px" />
        <Skeleton variant="text" height="16px" />
        <div className="flex gap-4 pt-2">
          <Skeleton variant="text" width="60px" height="16px" />
          <Skeleton variant="text" width="60px" height="16px" />
          <Skeleton variant="text" width="60px" height="16px" />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-glass border border-white/20 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton variant="circle" width="40px" height="40px" />
        <Skeleton variant="text" width="80px" height="16px" />
      </div>
      <Skeleton variant="text" width="60px" height="32px" />
    </div>
  );
}
