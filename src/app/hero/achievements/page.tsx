'use client';

import { Trophy, Award, Star, Target, TrendingUp, Calendar } from 'lucide-react';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJTabBar,
  HJBadge,
  HJProgress,
  HJAchievementCard,
  HJTabs,
} from '@/components/ui/hj';

export default function AchievementsPage() {
  const achievements = {
    unlocked: [
      {
        title: 'Первая тренировка',
        description: 'Завершите первую тренировку',
        progress: 1,
        maxProgress: 1,
        reward: '50 XP',
        isUnlocked: true,
        icon: <Star className="w-6 h-6 text-white" />,
      },
      {
        title: 'Чемпион недели',
        description: 'Тренируйтесь 7 дней подряд',
        progress: 7,
        maxProgress: 7,
        reward: '500 XP + Значок',
        isUnlocked: true,
        icon: <Trophy className="w-6 h-6 text-white" />,
      },
      {
        title: 'Первые 10 тренировок',
        description: 'Завершите 10 тренировок',
        progress: 10,
        maxProgress: 10,
        reward: '100 XP',
        isUnlocked: true,
        icon: <Award className="w-6 h-6 text-white" />,
      },
    ],
    inProgress: [
      {
        title: 'Железная воля',
        description: 'Тренируйтесь 30 дней подряд',
        progress: 12,
        maxProgress: 30,
        reward: '1000 XP + Значок',
        isUnlocked: false,
        icon: <Target className="w-6 h-6 text-hj-primary" />,
      },
      {
        title: '50 тренировок',
        description: 'Завершите 50 тренировок',
        progress: 28,
        maxProgress: 50,
        reward: '500 XP',
        isUnlocked: false,
        icon: <TrendingUp className="w-6 h-6 text-hj-primary" />,
      },
      {
        title: 'Марафонец',
        description: 'Тренируйтесь 100 дней подряд',
        progress: 12,
        maxProgress: 100,
        reward: '5000 XP + Эксклюзивный значок',
        isUnlocked: false,
        icon: <Calendar className="w-6 h-6 text-hj-primary" />,
      },
    ],
    locked: [
      {
        title: 'Легенда',
        description: 'Достигните 50 уровня',
        progress: 0,
        maxProgress: 50,
        reward: '10000 XP + Эксклюзивная аватарка',
        isUnlocked: false,
        icon: <Star className="w-6 h-6 text-hj-primary" />,
      },
    ],
  };

  const stats = [
    { label: 'Разблокировано', value: achievements.unlocked.length, total: achievements.unlocked.length + achievements.inProgress.length + achievements.locked.length },
    { label: 'В прогрессе', value: achievements.inProgress.length, total: achievements.unlocked.length + achievements.inProgress.length + achievements.locked.length },
    { label: 'Заблокировано', value: achievements.locked.length, total: achievements.unlocked.length + achievements.inProgress.length + achievements.locked.length },
  ];

  const tabs = [
    {
      id: 'all',
      label: 'Все',
      content: (
        <div className="space-y-3">
          {[...achievements.unlocked, ...achievements.inProgress, ...achievements.locked].map((achievement, index) => (
            <HJAchievementCard key={index} {...achievement} />
          ))}
        </div>
      ),
    },
    {
      id: 'unlocked',
      label: '✅ Разблокированные',
      content: (
        <div className="space-y-3">
          {achievements.unlocked.map((achievement, index) => (
            <HJAchievementCard key={index} {...achievement} />
          ))}
        </div>
      ),
    },
    {
      id: 'progress',
      label: '⏳ В процессе',
      content: (
        <div className="space-y-3">
          {achievements.inProgress.map((achievement, index) => (
            <HJAchievementCard key={index} {...achievement} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <HJScreen>
        {/* Header */}
        <HJSection>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-hj-textMain">Достижения</h1>
              <p className="text-sm text-hj-textSoft">Твой путь к успеху</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-hj-strong">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </HJSection>

        {/* Stats */}
        <HJSection>
          <HJCard className="bg-gradient-to-br from-hj-primary to-hj-primarySoft text-white border-none shadow-hj-strong">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-1">
                {achievements.unlocked.length}/{achievements.unlocked.length + achievements.inProgress.length + achievements.locked.length}
              </div>
              <p className="text-sm opacity-90">Достижений разблокировано</p>
            </div>

            <div className="space-y-2">
              <HJProgress
                value={achievements.unlocked.length}
                max={achievements.unlocked.length + achievements.inProgress.length + achievements.locked.length}
                variant="success"
                showPercentage
                className="bg-white/20"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </HJCard>
        </HJSection>

        {/* Categories */}
        <HJSection>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {[
              { emoji: '🏆', label: 'Тренировки', count: 5 },
              { emoji: '🔥', label: 'Серии', count: 3 },
              { emoji: '💪', label: 'Сила', count: 2 },
              { emoji: '🎯', label: 'Цели', count: 4 },
              { emoji: '⭐', label: 'Особые', count: 1 },
            ].map((category, index) => (
              <button
                key={index}
                className="flex-shrink-0 px-4 py-2 rounded-full bg-hj-cardSoft border border-white/40 text-sm font-medium text-hj-textMain hover:bg-hj-primary hover:text-white transition-colors"
              >
                {category.emoji} {category.label} ({category.count})
              </button>
            ))}
          </div>
        </HJSection>

        {/* Achievements Tabs */}
        <HJSection>
          <HJTabs tabs={tabs} defaultTab="all" />
        </HJSection>

        {/* Premium Achievements */}
        <HJSection title="⭐ Эксклюзивные достижения">
          <HJCard className="border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-3 shadow-hj-strong">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-base font-bold text-hj-textMain mb-2">
                Открой премиум достижения
              </h3>
              <p className="text-sm text-hj-textSoft mb-4">
                Разблокируй эксклюзивные челленджи и награды
              </p>
              <HJBadge variant="primary" size="md">
                ⭐ Требуется Premium
              </HJBadge>
            </div>
          </HJCard>
        </HJSection>

        <div className="h-20" /> {/* Spacer for bottom nav */}
      </HJScreen>

      <HJTabBar />
    </>
  );
}
