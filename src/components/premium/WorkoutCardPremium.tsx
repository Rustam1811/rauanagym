'use client';

import Image from 'next/image';
import { Clock, Flame, TrendingUp } from 'lucide-react';
import PremiumCard from './PremiumCard';

interface WorkoutCardPremiumProps {
  id: string;
  title: string;
  description?: string;
  duration: number;
  calories: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  progress?: number;
  isPremium?: boolean;
  onClick?: () => void;
}

export default function WorkoutCardPremium({
  title,
  description,
  duration,
  calories,
  difficulty,
  imageUrl,
  progress,
  isPremium,
  onClick,
}: WorkoutCardPremiumProps) {
  const difficultyConfig = {
    beginner: { label: 'Beginner', color: 'bg-green-500' },
    intermediate: { label: 'Intermediate', color: 'bg-yellow-500' },
    advanced: { label: 'Advanced', color: 'bg-red-500' },
  };

  const diff = difficultyConfig[difficulty];

  return (
    <PremiumCard
      className="overflow-hidden p-0 group"
      gradient={isPremium}
      onClick={onClick}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${diff.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {diff.label}
          </span>
          {isPremium && (
            <span className="bg-gradient-accent text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              ⭐ Premium
            </span>
          )}
        </div>

        {/* Progress Bar (if in progress) */}
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-gradient-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 group-hover:gradient-text transition-all">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        )}

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{calories} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-accent-blue" />
            <span className="capitalize">{difficulty}</span>
          </div>
        </div>

        {/* Progress Text */}
        {progress !== undefined && progress > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm font-medium gradient-text">
              {progress}% Complete
            </span>
          </div>
        )}
      </div>
    </PremiumCard>
  );
}
