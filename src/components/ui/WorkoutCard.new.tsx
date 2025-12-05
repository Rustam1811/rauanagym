import { Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import { Card } from './Card.new';

interface WorkoutCardProps {
  title: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
  completed?: boolean;
  onClick?: () => void;
}

export function WorkoutCard({ title, duration, difficulty, image, completed, onClick }: WorkoutCardProps) {
  const difficultyColors = {
    Beginner: 'text-green-600 bg-green-50',
    Intermediate: 'text-orange-600 bg-orange-50',
    Advanced: 'text-red-600 bg-red-50',
  };

  return (
    <Card onClick={onClick} className="overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-[#E8F1FF] to-[#3A7AFE]/10">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Zap className="w-16 h-16 text-[#3A7AFE]/20" strokeWidth={1.5} />
          </div>
        )}
        {completed && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-green-600">
            Completed
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#1C1F23] mb-3">{title}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
            <Clock className="w-4 h-4" strokeWidth={2} />
            <span>{duration} min</span>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
    </Card>
  );
}
