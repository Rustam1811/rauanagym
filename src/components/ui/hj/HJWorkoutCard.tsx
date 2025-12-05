'use client';

// components/ui/hj/HJWorkoutCard.tsx
import Image from 'next/image';
import { Clock, Flame, TrendingUp } from 'lucide-react';
import { HJCard } from '../../HJCard';
import { HJBadge } from './HJBadge';

interface HJWorkoutCardProps {
  title: string;
  description?: string;
  duration: number;
  calories: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image?: string;
  isPremium?: boolean;
  onStart?: () => void;
  className?: string;
}

const difficultyLabels = {
  beginner: 'Новичок',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

const difficultyColors = {
  beginner: 'success' as const,
  intermediate: 'warning' as const,
  advanced: 'error' as const,
};

export function HJWorkoutCard({
  title,
  description,
  duration,
  calories,
  difficulty,
  image = '/images/workout-placeholder.jpg',
  isPremium = false,
  onStart,
  className = '',
}: HJWorkoutCardProps) {
  return (
    <HJCard className={`overflow-hidden p-0 group cursor-pointer hover:shadow-hj-strong transition-shadow ${className}`}>
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <HJBadge variant={difficultyColors[difficulty]} size="sm">
            {difficultyLabels[difficulty]}
          </HJBadge>
          {isPremium && (
            <HJBadge variant="primary" size="sm">
              ⭐ PRO
            </HJBadge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-base font-semibold text-hj-textMain mb-1 line-clamp-1">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-hj-textSoft line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-hj-textSoft">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">{duration} мин</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium">{calories} ккал</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium">+50 XP</span>
          </div>
        </div>

        {/* Action */}
        {onStart && (
          <button
            onClick={onStart}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white text-sm font-semibold shadow-hj active:scale-95 transition-transform"
          >
            Начать тренировку
          </button>
        )}
      </div>
    </HJCard>
  );
}
