'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, Flame, TrendingUp, Play, Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJBadge,
  HJProgress,
} from '@/components/ui/hj';

export default function WorkoutDetailPage() {
  const params = useParams();
  const workoutId = params.id;

  // Mock data - в реальном приложении будет fetch из Firebase
  const workout = {
    id: workoutId,
    title: 'Full Body Strength',
    description: 'Комплексная силовая тренировка на все группы мышц. Эта программа разработана для максимального эффекта и включает упражнения на все основные мышечные группы.',
    duration: 45,
    calories: 380,
    xp: 150,
    difficulty: 'intermediate' as const,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    isPremium: true,
    instructor: 'Алексей Петров',
    equipment: ['Гантели', 'Штанга', 'Скамья'],
    muscleGroups: ['Грудь', 'Спина', 'Ноги', 'Руки'],
    completedTimes: 12,
    rating: 4.8,
    reviews: 234,
  };

  const exercises = [
    { name: 'Приседания со штангой', sets: 4, reps: 12, rest: 90, image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80' },
    { name: 'Жим лежа', sets: 4, reps: 10, rest: 90, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
    { name: 'Становая тяга', sets: 3, reps: 8, rest: 120, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
    { name: 'Подтягивания', sets: 3, reps: 10, rest: 60, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80' },
    { name: 'Отжимания на брусьях', sets: 3, reps: 12, rest: 60, image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80' },
  ];

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

  return (
    <HJScreen>
      {/* Header */}
      <HJSection>
        <div className="flex items-center justify-between mb-4">
          <Link href="/hero/workouts">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow">
              <ArrowLeft className="w-5 h-5 text-hj-textMain" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow">
              <Bookmark className="w-5 h-5 text-hj-textMain" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow">
              <Share2 className="w-5 h-5 text-hj-textMain" />
            </button>
          </div>
        </div>
      </HJSection>

      {/* Hero Image */}
      <HJSection>
        <div className="relative h-64 -mx-5 rounded-3xl overflow-hidden shadow-hj-strong">
          <Image
            src={workout.image}
            alt={workout.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <HJBadge variant={difficultyColors[workout.difficulty]} size="sm">
              {difficultyLabels[workout.difficulty]}
            </HJBadge>
            {workout.isPremium && (
              <HJBadge variant="primary" size="sm">
                ⭐ PRO
              </HJBadge>
            )}
          </div>

          {/* Info overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2">{workout.title}</h1>
            <div className="flex items-center gap-3 text-sm">
              <span>⭐ {workout.rating}</span>
              <span>•</span>
              <span>{workout.reviews} отзывов</span>
              <span>•</span>
              <span>{workout.completedTimes} завершений</span>
            </div>
          </div>
        </div>
      </HJSection>

      {/* Quick Stats */}
      <HJSection>
        <div className="grid grid-cols-3 gap-3">
          <HJCard className="text-center">
            <Clock className="w-6 h-6 text-hj-primary mx-auto mb-2" />
            <div className="text-xs text-hj-textSoft mb-1">Время</div>
            <div className="text-lg font-bold text-hj-textMain">{workout.duration} мин</div>
          </HJCard>
          <HJCard className="text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-xs text-hj-textSoft mb-1">Калории</div>
            <div className="text-lg font-bold text-hj-textMain">{workout.calories}</div>
          </HJCard>
          <HJCard className="text-center">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-xs text-hj-textSoft mb-1">XP</div>
            <div className="text-lg font-bold text-hj-textMain">+{workout.xp}</div>
          </HJCard>
        </div>
      </HJSection>

      {/* Description */}
      <HJSection title="📖 Описание">
        <HJCard>
          <p className="text-sm text-hj-textMain leading-relaxed">
            {workout.description}
          </p>
        </HJCard>
      </HJSection>

      {/* Details */}
      <HJSection title="ℹ️ Детали">
        <HJCard>
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-hj-textSoft mb-2">Инструктор</h4>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hj-primary to-hj-primarySoft flex items-center justify-center shadow-hj">
                  <span className="text-sm font-bold text-white">{workout.instructor[0]}</span>
                </div>
                <span className="text-sm font-medium text-hj-textMain">{workout.instructor}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-hj-textSoft mb-2">Необходимое оборудование</h4>
              <div className="flex flex-wrap gap-2">
                {workout.equipment.map((item, index) => (
                  <HJBadge key={index} variant="neutral" size="sm">
                    {item}
                  </HJBadge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-hj-textSoft mb-2">Группы мышц</h4>
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle, index) => (
                  <HJBadge key={index} variant="primary" size="sm">
                    {muscle}
                  </HJBadge>
                ))}
              </div>
            </div>
          </div>
        </HJCard>
      </HJSection>

      {/* Exercises List */}
      <HJSection title={`💪 Упражнения (${exercises.length})`}>
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <HJCard key={index} className="hover:shadow-hj-strong transition-shadow duration-300">
              <div className="flex gap-3">
                {/* Exercise Image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-hj">
                  <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Exercise Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-hj-textMain">{exercise.name}</h3>
                      <p className="text-xs text-hj-textSoft">Упражнение {index + 1}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-hj-textSoft">
                    <span>{exercise.sets} подхода</span>
                    <span>•</span>
                    <span>{exercise.reps} повторений</span>
                    <span>•</span>
                    <span>{exercise.rest}с отдых</span>
                  </div>
                </div>
              </div>
            </HJCard>
          ))}
        </div>
      </HJSection>

      {/* Progress */}
      <HJSection title="📈 Ваш прогресс">
        <HJCard>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-hj-textSoft">Завершено</span>
              <span className="font-semibold text-hj-primary">{workout.completedTimes} раз</span>
            </div>
            <HJProgress value={workout.completedTimes} max={20} variant="primary" />
            <p className="text-xs text-hj-textSoft text-center">
              {20 - workout.completedTimes} до следующей награды 🏆
            </p>
          </div>
        </HJCard>
      </HJSection>

      {/* Start Button */}
      <HJSection>
        <Link href={`/hero/session/active?workout=${workout.id}`}>
          <button className="w-full py-4 rounded-full bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white text-sm font-semibold shadow-hj-strong hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            <span>Начать тренировку</span>
          </button>
        </Link>
      </HJSection>

      <div className="h-20" /> {/* Spacer */}
    </HJScreen>
  );
}
