// components/ui/hj/HJLeaderboardCard.tsx
import { HJAvatar } from '../HJAvatar';
import { HJCard } from '../../HJCard';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  rank: number;
  change?: number; // Изменение позиции: положительное - вверх, отрицательное - вниз
}

interface HJLeaderboardCardProps {
  user: LeaderboardUser;
  isCurrentUser?: boolean;
  showRankChange?: boolean;
  className?: string;
}

const rankColors = {
  1: 'from-yellow-400 to-yellow-600',
  2: 'from-gray-300 to-gray-500',
  3: 'from-orange-400 to-orange-600',
};

export function HJLeaderboardCard({
  user,
  isCurrentUser = false,
  showRankChange = true,
  className = '',
}: HJLeaderboardCardProps) {
  const isTopThree = user.rank <= 3;

  return (
    <HJCard
      className={`transition-all duration-300 hover:shadow-hj-strong ${
        isCurrentUser 
          ? 'border-2 border-hj-primary bg-hj-primary/5 shadow-[0_8px_30px_rgba(124,58,237,0.2)]' 
          : ''
      } ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-10 text-center">
          {isTopThree ? (
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                rankColors[user.rank as keyof typeof rankColors]
              } flex items-center justify-center shadow-hj-strong hover:scale-110 transition-transform duration-300`}
            >
              <Trophy className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
          ) : (
            <div className="text-2xl font-bold text-hj-textSoft">
              {user.rank}
            </div>
          )}
        </div>

        {/* Avatar */}
        <HJAvatar src={user.avatar} alt={user.name} size="md" />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-hj-textMain truncate">
              {user.name}
            </h3>
            {isCurrentUser && (
              <span className="text-[10px] font-bold text-hj-primary bg-hj-primary/10 px-2 py-0.5 rounded-full">
                ВЫ
              </span>
            )}
          </div>
          <p className="text-xs text-hj-textSoft">{user.score.toLocaleString()} XP</p>
        </div>

        {/* Rank Change */}
        {showRankChange && user.change !== undefined && (
          <div className="flex-shrink-0">
            {user.change > 0 && (
              <div className="flex items-center gap-0.5 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold">+{user.change}</span>
              </div>
            )}
            {user.change < 0 && (
              <div className="flex items-center gap-0.5 text-red-600">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs font-semibold">{user.change}</span>
              </div>
            )}
            {user.change === 0 && (
              <div className="flex items-center gap-0.5 text-hj-textSoft">
                <Minus className="w-4 h-4" />
              </div>
            )}
          </div>
        )}
      </div>
    </HJCard>
  );
}
