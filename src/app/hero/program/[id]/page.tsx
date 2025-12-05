'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, TrendingUp, Target, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJBadge,
  HJProgress,
} from '@/components/ui/hj';

export default function ProgramDetailPage() {
  const params = useParams();
  const programId = params.id;

  // Mock data
  const program = {
    id: programId,
    title: '30-Day Shred',
    description: 'Интенсивная 30-дневная программа для трансформации тела. Включает кардио, силовые тренировки и растяжку. Результаты видны уже через 2 недели!',
    duration: '30 дней',
    totalWorkouts: 45,
    progress: 12,
    maxProgress: 30,
    difficulty: 'advanced' as const,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    instructor: 'Мария Иванова',
    level: 'Продвинутый',
    goals: ['Похудение', 'Тонус мышц', 'Выносливость'],
    schedule: '5 дней/неделю',
    avgDuration: 45,
    isActive: true,
  };

  const weeks = [
    {
      week: 1,
      title: 'Неделя 1: Адаптация',
      workouts: [
        { day: 1, title: 'Full Body Intro', duration: 40, completed: true },
        { day: 2, title: 'Cardio Blast', duration: 35, completed: true },
        { day: 3, title: 'Отдых', isRest: true },
        { day: 4, title: 'Upper Body', duration: 45, completed: true },
        { day: 5, title: 'Lower Body', duration: 45, completed: false },
        { day: 6, title: 'HIIT Session', duration: 30, completed: false },
        { day: 7, title: 'Отдых', isRest: true },
      ],
    },
    {
      week: 2,
      title: 'Неделя 2: Интенсивность',
      workouts: [
        { day: 8, title: 'Full Body Power', duration: 45, completed: false },
        { day: 9, title: 'Cardio HIIT', duration: 40, completed: false },
        { day: 10, title: 'Отдых', isRest: true },
        { day: 11, title: 'Push Day', duration: 50, completed: false },
        { day: 12, title: 'Pull Day', duration: 50, completed: false },
        { day: 13, title: 'Leg Day', duration: 55, completed: false },
        { day: 14, title: 'Отдых', isRest: true },
      ],
    },
  ];

  const stats = {
    completedWorkouts: weeks.reduce((acc, week) => 
      acc + week.workouts.filter(w => w.completed).length, 0
    ),
    totalWorkouts: program.totalWorkouts,
    daysCompleted: program.progress,
    streak: 3,
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
        <div className="flex items-center gap-3">
          <Link href="/hero/programs">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow">
              <ArrowLeft className="w-5 h-5 text-hj-textMain" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-hj-textMain">{program.title}</h1>
            <p className="text-xs text-hj-textSoft">{program.instructor}</p>
          </div>
        </div>
      </HJSection>

      {/* Hero Image & Info */}
      <HJSection>
        <HJCard className="p-0 overflow-hidden">
          <div className="relative h-48">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute top-3 left-3 flex gap-2">
              <HJBadge variant={difficultyColors[program.difficulty]} size="sm">
                {program.level}
              </HJBadge>
              {program.isActive && (
                <HJBadge variant="primary" size="sm">
                  ⚡ Активна
                </HJBadge>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 text-white text-xs mb-2">
                <Calendar className="w-4 h-4" />
                <span>{program.duration}</span>
                <span>•</span>
                <span>{program.totalWorkouts} тренировок</span>
                <span>•</span>
                <span>{program.schedule}</span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm text-hj-textMain leading-relaxed">
              {program.description}
            </p>

            <div>
              <h4 className="text-xs font-semibold text-hj-textSoft mb-2">Цели программы</h4>
              <div className="flex flex-wrap gap-2">
                {program.goals.map((goal, index) => (
                  <HJBadge key={index} variant="primary" size="sm">
                    🎯 {goal}
                  </HJBadge>
                ))}
              </div>
            </div>
          </div>
        </HJCard>
      </HJSection>

      {/* Progress Stats */}
      <HJSection title="📊 Прогресс">
        <HJCard className="bg-gradient-to-br from-hj-primary to-hj-primarySoft text-white border-none shadow-hj-strong">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{program.progress}/{program.maxProgress}</div>
                <div className="text-sm opacity-90">Дней завершено</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{stats.completedWorkouts}/{stats.totalWorkouts}</div>
                <div className="text-sm opacity-90">Тренировок</div>
              </div>
            </div>

            <HJProgress 
              value={program.progress} 
              max={program.maxProgress} 
              variant="success"
              showPercentage
              className="bg-white/20"
            />

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20">
              <div className="text-center">
                <Target className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs opacity-90">Осталось</div>
                <div className="text-lg font-bold">{program.maxProgress - program.progress} дней</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs opacity-90">Серия</div>
                <div className="text-lg font-bold">{stats.streak} дня 🔥</div>
              </div>
            </div>
          </div>
        </HJCard>
      </HJSection>

      {/* Weekly Schedule */}
      <HJSection title="📅 План тренировок">
        <div className="space-y-4">
          {weeks.map((week) => (
            <div key={week.week}>
              <h3 className="text-sm font-semibold text-hj-textMain mb-3">
                {week.title}
              </h3>
              <div className="space-y-2">
                {week.workouts.map((workout, index) => (
                  <HJCard 
                    key={index}
                    className={`${
                      workout.isRest 
                        ? 'bg-hj-cardSoft/50' 
                        : workout.completed 
                        ? 'border-l-4 border-green-500 bg-green-500/5'
                        : 'hover:shadow-hj-strong transition-shadow cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Day Number */}
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                        ${workout.isRest 
                          ? 'bg-hj-textSoft/20 text-hj-textSoft' 
                          : workout.completed
                          ? 'bg-green-500 text-white shadow-hj'
                          : 'bg-gradient-to-br from-hj-primary to-hj-primarySoft text-white shadow-hj'
                        }
                      `}>
                        {workout.isRest ? '💤' : workout.day}
                      </div>

                      {/* Workout Info */}
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-hj-textMain">
                          {workout.title}
                        </h4>
                        {!workout.isRest && (
                          <p className="text-xs text-hj-textSoft">
                            {workout.duration} минут
                          </p>
                        )}
                      </div>

                      {/* Status */}
                      {workout.completed && (
                        <div className="flex items-center gap-1 text-green-500 text-xs font-semibold">
                          ✓ Завершено
                        </div>
                      )}
                      {!workout.completed && !workout.isRest && workout.day === program.progress + 1 && (
                        <Link href={`/hero/session/active?workout=${workout.day}`}>
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white text-xs font-semibold shadow-hj">
                            <Play className="w-3 h-3" />
                            Начать
                          </button>
                        </Link>
                      )}
                    </div>
                  </HJCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </HJSection>

      {/* Continue Button */}
      {program.isActive && (
        <HJSection>
          <Link href={`/hero/session/active?program=${program.id}&day=${program.progress + 1}`}>
            <button className="w-full py-4 rounded-full bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white text-sm font-semibold shadow-hj-strong hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              <span>Продолжить программу</span>
            </button>
          </Link>
        </HJSection>
      )}

      <div className="h-20" /> {/* Spacer */}
    </HJScreen>
  );
}
