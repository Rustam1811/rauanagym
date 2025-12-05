'use client';

interface AchievementItemProps {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function AchievementItem({
  icon,
  title,
  description,
  unlocked,
  progress,
  rarity = 'common',
}: AchievementItemProps) {
  const rarityConfig = {
    common: {
      border: 'border-gray-300',
      bg: 'bg-gray-100',
      glow: '',
    },
    rare: {
      border: 'border-blue-400',
      bg: 'bg-blue-50',
      glow: 'shadow-[0_0_15px_rgba(79,128,255,0.3)]',
    },
    epic: {
      border: 'border-purple-400',
      bg: 'bg-purple-50',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    },
    legendary: {
      border: 'border-yellow-400',
      bg: 'bg-yellow-50',
      glow: 'shadow-[0_0_20px_rgba(251,191,36,0.4)] animate-pulse-glow',
    },
  };

  const config = rarityConfig[rarity];

  return (
    <div
      className={`
        relative p-4 rounded-2xl border-2 transition-all duration-300
        ${unlocked ? `${config.border} ${config.bg} ${config.glow}` : 'border-gray-200 bg-gray-50 opacity-60'}
        ${unlocked ? 'hover:scale-105 cursor-pointer' : ''}
      `}
    >
      {/* Icon */}
      <div className="flex flex-col items-center text-center space-y-2">
        <div
          className={`
            text-5xl mb-2 transition-transform duration-300
            ${unlocked ? 'scale-100' : 'scale-90 grayscale'}
          `}
        >
          {icon}
        </div>

        {/* Title */}
        <h4 className={`font-bold text-sm ${unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
          {title}
        </h4>

        {/* Description */}
        <p className={`text-xs ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
          {description}
        </p>

        {/* Progress Bar (if not unlocked) */}
        {!unlocked && progress !== undefined && (
          <div className="w-full mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Rarity Badge */}
        {unlocked && rarity !== 'common' && (
          <span className={`
            absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold rounded-full
            ${rarity === 'rare' ? 'bg-blue-100 text-blue-700' : ''}
            ${rarity === 'epic' ? 'bg-purple-100 text-purple-700' : ''}
            ${rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' : ''}
          `}>
            {rarity.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
