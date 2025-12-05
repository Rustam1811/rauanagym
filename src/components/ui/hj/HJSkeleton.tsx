// components/ui/hj/HJSkeleton.tsx
interface HJSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  className?: string;
}

export function HJSkeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
}: HJSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-hj-cardSoft via-white/50 to-hj-cardSoft bg-[length:200%_100%] animate-shimmer';

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-2xl',
    card: 'rounded-3xl',
  };

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '40px' : '100px'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Skeleton compositions
export function HJCardSkeleton() {
  return (
    <div className="rounded-3xl bg-hj-card shadow-hj border border-white/40 p-5 space-y-3">
      <HJSkeleton variant="text" width="60%" />
      <HJSkeleton variant="text" width="40%" />
      <HJSkeleton variant="rectangular" height="120px" />
      <div className="flex gap-2">
        <HJSkeleton variant="rectangular" height="40px" />
        <HJSkeleton variant="rectangular" height="40px" />
      </div>
    </div>
  );
}

export function HJStatCardSkeleton() {
  return (
    <div className="rounded-3xl bg-hj-cardSoft shadow-hj border border-white/40 p-4">
      <div className="flex items-center gap-3">
        <HJSkeleton variant="circular" width="44px" height="44px" />
        <div className="flex-1 space-y-2">
          <HJSkeleton variant="text" width="50%" />
          <HJSkeleton variant="text" width="70%" />
        </div>
      </div>
    </div>
  );
}
