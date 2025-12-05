'use client';

import { TrendingUp, Calendar, Flame, Award, Target, Activity } from 'lucide-react';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJTabBar,
  HJStatCard,
  HJProgress,
  HJTabs,
} from '@/components/ui/hj';

export default function StatsPage() {
  const weekStats = [
    { day: 'Пн', calories: 450, workouts: 1 },
    { day: 'Вт', calories: 380, workouts: 1 },
    { day: 'Ср', calories: 0, workouts: 0 },
    { day: 'Чт', calories: 520, workouts: 1 },
    { day: 'Пт', calories: 410, workouts: 1 },
    { day: 'Сб', calories: 600, workouts: 2 },
    { day: 'Вс', calories: 340, workouts: 1 },
  ];

  const maxCalories = Math.max(...weekStats.map(d => d.calories));

  const overviewTab = {
    id: 'overview',
    label: 'Обзор',
    content: (
      <div className="space-y-4">
        {/* Weekly Chart */}
        <HJCard>
          <h3 className="text-sm font-semibold text-hj-textMain mb-4">📊 Активность за неделю</h3>
          <div className="flex items-end justify-between gap-2 h-40 mb-3">
            {weekStats.map((stat, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex-1 flex flex-col justify-end">
                  <div 
                    className="w-full bg-gradient-to-t from-hj-primary to-hj-primarySoft rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{ height: `${(stat.calories / maxCalories) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-hj-textSoft">{stat.day}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs text-hj-textSoft">
              Всего калорий: <span className="font-semibold text-hj-primary">{weekStats.reduce((sum, d) => sum + d.calories, 0)} ккал</span>
            </p>
          </div>
        </HJCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <HJStatCard
            icon={<Flame className="w-5 h-5 text-orange-500" />}
            label="Калорий/день"
            value="430"
            description="Среднее за неделю"
          />
          <HJStatCard
            icon={<Activity className="w-5 h-5 text-green-500" />}
            label="Тренировок"
            value="7"
            description="На этой неделе"
          />
        </div>

        {/* Goals Progress */}
        <HJCard>
          <h3 className="text-sm font-semibold text-hj-textMain mb-3">🎯 Прогресс целей</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-hj-textSoft">Калории за неделю</span>
                <span className="font-semibold text-hj-primary">2700 / 3000</span>
              </div>
              <HJProgress value={2700} max={3000} variant="primary" />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-hj-textSoft">Тренировок в месяц</span>
                <span className="font-semibold text-green-600">18 / 20</span>
              </div>
              <HJProgress value={18} max={20} variant="success" />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-hj-textSoft">Серия дней</span>
                <span className="font-semibold text-orange-600">7 / 30</span>
              </div>
              <HJProgress value={7} max={30} variant="warning" />
            </div>
          </div>
        </HJCard>
      </div>
    ),
  };

  const allTimeTab = {
    id: 'all-time',
    label: 'За всё время',
    content: (
      <div className="space-y-4">
        {/* All Time Stats */}
        <div className="grid grid-cols-2 gap-3">
          <HJStatCard
            icon={<Calendar className="w-5 h-5 text-hj-primary" />}
            label="Всего дней"
            value="128"
            description="С момента старта"
          />
          <HJStatCard
            icon={<Activity className="w-5 h-5 text-green-500" />}
            label="Тренировок"
            value="256"
            description="Всего завершено"
          />
          <HJStatCard
            icon={<Flame className="w-5 h-5 text-orange-500" />}
            label="Калорий"
            value="98K"
            description="Всего сожжено"
          />
          <HJStatCard
            icon={<Award className="w-5 h-5 text-yellow-500" />}
            label="Достижений"
            value="23"
            description="Разблокировано"
          />
        </div>

        {/* Records */}
        <HJCard>
          <h3 className="text-sm font-semibold text-hj-textMain mb-3">🏆 Рекорды</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-hj-textMain">Максимум калорий/день</p>
                  <p className="text-[10px] text-hj-textSoft">15 ноября 2024</p>
                </div>
              </div>
              <span className="text-lg font-bold text-orange-500">850</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-hj-textMain">Самая длинная серия</p>
                  <p className="text-[10px] text-hj-textSoft">Июль 2024</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-500">21</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-hj-primary/10 to-hj-primarySoft/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-hj-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-hj-textMain">Тренировок/неделю</p>
                  <p className="text-[10px] text-hj-textSoft">Октябрь 2024</p>
                </div>
              </div>
              <span className="text-lg font-bold text-hj-primary">9</span>
            </div>
          </div>
        </HJCard>

        {/* Milestones */}
        <HJCard>
          <h3 className="text-sm font-semibold text-hj-textMain mb-3">🎯 Важные вехи</h3>
          <div className="space-y-2">
            {[
              { label: 'Первая тренировка', date: 'Январь 2024', icon: '🎉' },
              { label: '50 тренировок', date: 'Март 2024', icon: '🏅' },
              { label: '100 тренировок', date: 'Июнь 2024', icon: '🎖️' },
              { label: '200 тренировок', date: 'Ноябрь 2024', icon: '🏆' },
            ].map((milestone, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-xl bg-hj-cardSoft">
                <span className="text-2xl">{milestone.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-hj-textMain">{milestone.label}</p>
                  <p className="text-[10px] text-hj-textSoft">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </HJCard>
      </div>
    ),
  };

  const tabs = [overviewTab, allTimeTab];

  return (
    <>
      <HJScreen>
        {/* Header */}
        <HJSection>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-hj-textMain">Статистика</h1>
              <p className="text-sm text-hj-textSoft">Твой прогресс и достижения</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-hj-primary to-hj-primarySoft shadow-hj">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </HJSection>

        {/* Tabs */}
        <HJSection>
          <HJTabs tabs={tabs} defaultTab="overview" />
        </HJSection>

        <div className="h-20" /> {/* Spacer for bottom nav */}
      </HJScreen>

      <HJTabBar />
    </>
  );
}
