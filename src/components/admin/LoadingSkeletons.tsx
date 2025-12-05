'use client';

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div 
          key={i} 
          className="h-16 bg-white/5 rounded-xl animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl lg:rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/5 p-4 lg:p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/5 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/5 rounded w-1/3" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-5/6" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl lg:rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/5 p-3 lg:p-6 animate-pulse">
      <div className="space-y-3 lg:space-y-4">
        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white/5 rounded-xl" />
        <div className="space-y-2">
          <div className="h-3 bg-white/5 rounded w-20" />
          <div className="h-8 bg-white/5 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-white/5 rounded w-40 animate-pulse" />
        <div className="h-4 bg-white/5 rounded w-64 animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
