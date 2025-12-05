import { ClockIcon, FireIcon, BoltIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface WorkoutCardProps {
  id: string;
  name: string;
  duration: number; // minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  xp: number;
  imageSrc?: string;
  onStart?: () => void;
}

const difficultyColors = {
  Beginner: 'from-green-400 to-emerald-500',
  Intermediate: 'from-yellow-400 to-orange-500',
  Advanced: 'from-red-500 to-rose-600',
};

export function WorkoutCard({ name, duration, difficulty, category, xp, imageSrc, onStart }: WorkoutCardProps) {
  return (
    <div 
      onClick={onStart}
      className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
    >
      {/* Image or gradient header */}
      <div className={`h-40 bg-gradient-to-br ${difficultyColors[difficulty]} relative overflow-hidden`}>
        {imageSrc ? (
          <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BoltIcon className="w-20 h-20 text-white/20" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full">
          <span className="text-xs font-bold text-white uppercase tracking-wider">{difficulty}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{category}</p>
          </div>
          <ChevronRightIcon className="w-6 h-6 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

        <div className="flex items-center gap-6 text-base text-gray-300">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-gray-500" />
            <span className="font-bold">{duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <FireIcon className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-400">{xp} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
