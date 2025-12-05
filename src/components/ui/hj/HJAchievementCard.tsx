// components/ui/hj/HJAchievementCard.tsx
import { Trophy } from 'lucide-react';
import { HJCard } from '../../HJCard';
import { HJProgress } from './HJProgress';

interface HJAchievementCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  progress: number;
  maxProgress: number;
  reward?: string;
  isUnlocked?: boolean;
  className?: string;
}

export function HJAchievementCard({
  title,
  description,
  icon,
  progress,
  maxProgress,
  reward,
  isUnlocked = false,
  className = '',
}: HJAchievementCardProps) {
  return (
    <HJCard
      className={`relative overflow-hidden transition-all duration-300 ${
        isUnlocked 
          ? 'border-2 border-hj-primary shadow-hj-strong hover:shadow-[0_20px_50px_rgba(124,58,237,0.4)]' 
          : 'hover:shadow-hj-strong'
      } ${className}`}
    >
      {/* Unlocked Badge */}
      {isUnlocked && (
        <div className="absolute top-2 right-2">
          <div className="bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-hj animate-pulse">
            <Trophy className="w-3 h-3" />
            РАЗБЛОКИРОВАНО
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center shadow-hj-inner transition-all duration-300 ${
            isUnlocked
              ? 'bg-gradient-to-br from-hj-primary to-hj-primarySoft shadow-[0_10px_30px_rgba(124,58,237,0.3)]'
              : 'bg-gradient-to-br from-hj-primary/10 to-hj-primarySoft/20 grayscale'
          }`}
        >
          {icon || <Trophy className={`w-7 h-7 ${isUnlocked ? 'text-white' : 'text-hj-primary'}`} />}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="text-sm font-semibold text-hj-textMain mb-0.5">
              {title}
            </h3>
            <p className="text-xs text-hj-textSoft">{description}</p>
          </div>

          {/* Progress */}
          {!isUnlocked && (
            <div className="space-y-1">
              <HJProgress
                value={progress}
                max={maxProgress}
                size="sm"
                variant="primary"
              />
              <div className="flex items-center justify-between text-[10px] text-hj-textSoft">
                <span>
                  {progress} / {maxProgress}
                </span>
                {reward && <span className="font-semibold">🎁 {reward}</span>}
              </div>
            </div>
          )}

          {isUnlocked && reward && (
            <div className="text-xs font-semibold text-hj-primary">
              🎁 Награда: {reward}
            </div>
          )}
        </div>
      </div>
    </HJCard>
  );
}
