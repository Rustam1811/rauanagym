'use client';

import { Dumbbell, Trophy, Target, Flame, Calendar } from 'lucide-react';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJButton,
  HJTabBar,
  HJWorkoutCard,
  HJAchievementCard,
  HJLeaderboardCard,
  HJStatCard,
  HJBadge,
  HJProgress,
  HJTabs,
} from '@/components/ui/hj';

export default function HJAdvancedExample() {
  // Mock data
  const workouts = [
    {
      title: 'Full Body Strength',
      description: 'Комплексная силовая тренировка на все группы мышц',
      duration: 45,
      calories: 380,
      difficulty: 'intermediate' as const,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      isPremium: true,
      onStart: () => console.log('Start workout'),
    },
    {
      title: 'HIIT Cardio Blast',
      description: 'Интенсивная кардио-тренировка для жиросжигания',
      duration: 30,
      calories: 450,
      difficulty: 'advanced' as const,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      onStart: () => console.log('Start workout'),
    },
  ];

  const achievements = [
    {
      title: 'Первые 10 тренировок',
      description: 'Завершите 10 тренировок подряд',
      progress: 7,
      maxProgress: 10,
      reward: '100 XP',
    },
    {
      title: 'Чемпион недели',
      description: 'Тренируйтесь 7 дней подряд',
      progress: 7,
      maxProgress: 7,
      reward: '500 XP + Значок',
      isUnlocked: true,
    },
  ];

  const leaderboard = [
    {
      id: '1',
      name: 'Александр Иванов',
      avatar: 'https://i.pravatar.cc/150?img=12',
      score: 15420,
      rank: 1,
      change: 2,
    },
    {
      id: '2',
      name: 'Мария Петрова',
      avatar: 'https://i.pravatar.cc/150?img=47',
      score: 14850,
      rank: 2,
      change: -1,
    },
    {
      id: '3',
      name: 'Дмитрий Сидоров',
      avatar: 'https://i.pravatar.cc/150?img=33',
      score: 13900,
      rank: 3,
      change: 0,
    },
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Обзор',
      content: (
        <div className="space-y-4">
          <HJCard>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-hj-textMain">
                  Ваш прогресс сегодня
                </h3>
                <HJBadge variant="success" size="sm">
                  На треке
                </HJBadge>
              </div>
              <HJProgress
                value={750}
                max={1000}
                label="Калории"
                showPercentage
                variant="primary"
              />
              <HJProgress
                value={45}
                max={60}
                label="Время тренировок (мин)"
                showPercentage
                variant="success"
              />
            </div>
          </HJCard>

          <div className="grid grid-cols-2 gap-3">
            <HJStatCard
              icon={<Flame className="w-5 h-5 text-orange-500" />}
              label="Калории"
              value="750"
              description="из 1000 цели"
            />
            <HJStatCard
              icon={<Trophy className="w-5 h-5 text-hj-primary" />}
              label="XP"
              value="2,450"
              description="+150 сегодня"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'stats',
      label: 'Статистика',
      content: (
        <div className="space-y-3">
          <HJCard>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-hj-textSoft">
                  Тренировки в неделю
                </span>
                <span className="text-lg font-bold text-hj-primary">5/7</span>
              </div>
              <HJProgress value={5} max={7} variant="success" />
            </div>
          </HJCard>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-3xl bg-hj-cardSoft p-3 text-center shadow-hj backdrop-blur-xl border border-white/10">
              <Calendar className="w-5 h-5 text-hj-primary mx-auto mb-1" />
              <p className="text-xs font-medium text-hj-textSoft">Дни</p>
              <p className="text-lg font-bold text-hj-textMain">45</p>
            </div>
            <div className="rounded-3xl bg-hj-cardSoft p-3 text-center shadow-hj backdrop-blur-xl border border-white/10">
              <Dumbbell className="w-5 h-5 text-hj-primary mx-auto mb-1" />
              <p className="text-xs font-medium text-hj-textSoft">Тренировок</p>
              <p className="text-lg font-bold text-hj-textMain">128</p>
            </div>
            <div className="rounded-3xl bg-hj-cardSoft p-3 text-center shadow-hj backdrop-blur-xl border border-white/10">
              <Target className="w-5 h-5 text-hj-primary mx-auto mb-1" />
              <p className="text-xs font-medium text-hj-textSoft">Цели</p>
              <p className="text-lg font-bold text-hj-textMain">23</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <HJScreen>
        {/* Hero Section with HJ shadows */}
        <HJSection>
          <HJCard className="bg-gradient-to-br from-hj-primary to-hj-primarySoft text-white border-none shadow-hj-strong rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Привет, Спортсмен!</h1>
                <p className="text-sm opacity-90">
                  Готов к новым достижениям?
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl shadow-hj">
                <Trophy className="w-7 h-7" />
              </div>
            </div>
          </HJCard>
        </HJSection>

        {/* Tabs with Stats */}
        <HJSection>
          <HJTabs tabs={tabs} defaultTab="overview" />
        </HJSection>

        {/* Workouts */}
        <HJSection title="Рекомендованные тренировки">
          <div className="space-y-3">
            {workouts.map((workout, index) => (
              <HJWorkoutCard key={index} {...workout} />
            ))}
          </div>
        </HJSection>

        {/* Achievements */}
        <HJSection title="Достижения">
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <HJAchievementCard key={index} {...achievement} />
            ))}
          </div>
        </HJSection>

        {/* Leaderboard */}
        <HJSection title="Топ недели">
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <HJLeaderboardCard
                key={user.id}
                user={user}
                isCurrentUser={user.id === '1'}
                showRankChange
              />
            ))}
          </div>
          <div className="mt-3">
            <HJButton label="Посмотреть все" variant="secondary" />
          </div>
        </HJSection>
      </HJScreen>

      <HJTabBar />
    </>
  );
}
