'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainCard from '@/components/hero-journey/MainCard';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import AvatarCharacter from '@/components/hero-journey/AvatarCharacter';
import { Camera, Settings, Flame, Award, Users, TrendingUp, Dumbbell, Zap, Heart } from 'lucide-react';

const resultsIcons = [
  { icon: Dumbbell, color: 'from-neon-purple to-primary' },
  { icon: Zap, color: 'from-warning to-error' },
  { icon: Heart, color: 'from-error to-neon-pink' },
  { icon: TrendingUp, color: 'from-neon-blue to-accent-cyan' },
  { icon: Award, color: 'from-success to-neon-green' },
  { icon: Users, color: 'from-primary to-neon-purple' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'posts'>('profile');

  return (
    <div className="min-h-screen bg-bgLight pb-24">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-profile pt-8 pb-24 overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 bg-white/80 backdrop-blur-xl rounded-full shadow-soft">
            <Settings className="w-5 h-5 text-textPrimary" />
          </button>
        </div>

        {/* Avatar and user info */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full bg-white shadow-strong flex items-center justify-center">
              <AvatarCharacter size="xl" character="🥊" showBorder={false} />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-strong">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Пользователь</h1>
          <p className="text-sm text-textSecondary mb-3">Rookie 1</p>
          
          {/* Progress bar */}
          <div className="w-72 px-4">
            <div className="flex justify-between text-xs text-textSecondary mb-2">
              <span>0/400 XP</span>
              <span className="font-semibold">0%</span>
            </div>
            <div className="h-3 bg-white/60 rounded-full overflow-hidden backdrop-blur-xl shadow-inner">
              <div className="h-full bg-gradient-to-r from-primary to-primarySoft w-0 transition-all duration-500" />
            </div>
            <p className="text-xs text-textSecondary mt-2 text-center font-medium">
              4 занятия до повышения
            </p>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-borderSoft sticky top-0 z-20 -mt-20">
        <div className="flex gap-8 px-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-base font-bold tracking-tight transition-all relative ${
              activeTab === 'profile' ? 'text-textPrimary' : 'text-textSecondary'
            }`}
          >
            Профиль
            {activeTab === 'profile' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" 
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-4 text-base font-bold tracking-tight transition-all relative ${
              activeTab === 'posts' ? 'text-textPrimary' : 'text-textSecondary'
            }`}
          >
            Публикации
            {activeTab === 'posts' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" 
              />
            )}
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {activeTab === 'profile' && (
          <>
            {/* No subscription alert */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <MainCard variant="light" padding="default" className="border-l-4 border-accentYellow">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-textPrimary">
                    У Вас нет абонемента
                  </p>
                  <button className="text-primary font-bold text-sm">
                    Купить
                  </button>
                </div>
              </MainCard>
            </motion.div>

            {/* Photo required alert */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <MainCard variant="light" padding="default" className="border-l-4 border-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-textPrimary">
                      Требуется ваша фотография
                    </p>
                  </div>
                  <button className="text-primary font-bold text-sm">
                    Добавить
                  </button>
                </div>
              </MainCard>
            </motion.div>

            {/* My sessions - Calendar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <MainCard variant="light" padding="default">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-textPrimary">Мои занятия</h3>
                    <p className="text-xs text-textSecondary mt-1">Декабрь</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-primary">0</p>
                    <p className="text-xs text-textSecondary">занятий</p>
                  </div>
                </div>

                <div className="border-t border-borderSoft pt-4">
                  {/* Mini calendar */}
                  <div className="grid grid-cols-7 gap-1">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                      <div key={day} className="text-center text-xs text-textSecondary font-semibold py-1">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square flex items-center justify-center text-xs text-textPrimary rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </MainCard>
            </motion.div>

            {/* Discipline & Awards row */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* Discipline */}
              <MainCard variant="light" padding="default">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accentYellow/10 flex items-center justify-center shadow-inner">
                    <Flame className="w-4 h-4 text-accentYellow" />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight">Дисциплина</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-semibold text-accentYellow">0 нед.</p>
                    <p className="text-xs text-textSecondary">Текущая серия</p>
                  </div>
                  <div className="text-xs text-textSecondary space-y-1 border-t border-borderSoft pt-2">
                    <p>Рекорд идеальной – 0 нед.</p>
                    <p>Рекорд дисциплины – 0 нед.</p>
                  </div>
                </div>
              </MainCard>

              {/* Awards */}
              <Link href="/hero/achievements">
                <MainCard variant="light" padding="default" className="cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accentYellow/10 flex items-center justify-center shadow-inner">
                      <Award className="w-4 h-4 text-accentYellow" />
                    </div>
                    <h3 className="text-sm font-bold tracking-tight">Награды</h3>
                  </div>
                  <div className="flex items-center justify-center py-4">
                    <div className="text-center">
                      <div className="text-5xl mb-2">⭐</div>
                      <p className="text-sm font-semibold text-textPrimary">0/11</p>
                      <p className="text-xs text-textSecondary">Наград нет</p>
                    </div>
                  </div>
                </MainCard>
              </Link>
            </motion.div>

            {/* Friends & Results row */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* Friends */}
              <MainCard variant="light" padding="default">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/10 flex items-center justify-center shadow-inner">
                    <Users className="w-4 h-4 text-neon-blue" />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight">Друзья</h3>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-full bg-gray-200 shadow-inner" />
                  ))}
                </div>
                <p className="text-xs text-textSecondary text-center">0 друзей</p>
              </MainCard>

              {/* Results */}
              <Link href="/hero/stats">
                <MainCard variant="light" padding="default" className="cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accentGreen/10 flex items-center justify-center shadow-inner">
                      <TrendingUp className="w-4 h-4 text-accentGreen" />
                    </div>
                    <h3 className="text-sm font-bold tracking-tight">Результаты</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {resultsIcons.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-soft`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      );
                    })}
                  </div>
                </MainCard>
              </Link>
            </motion.div>

            {/* Records */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <MainCard variant="light" padding="default">
                <h3 className="text-lg font-bold tracking-tight mb-4">Рекорды</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-2xl font-semibold text-primary">0</p>
                    <p className="text-xs text-textSecondary mt-1">Всего занятий</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">0</p>
                    <p className="text-xs text-textSecondary mt-1">Тоннаж (кг)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">0</p>
                    <p className="text-xs text-textSecondary mt-1">Сожжено калорий</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-primary">0</p>
                    <p className="text-xs text-textSecondary mt-1">Макс. шагов</p>
                  </div>
                </div>
                <div className="border-t border-borderSoft mt-4 pt-4">
                  <p className="text-xs text-textSecondary text-center">
                    Дата обновления рекордов: 03.12.25
                  </p>
                </div>
              </MainCard>
            </motion.div>
          </>
        )}

        {activeTab === 'posts' && (
          <div className="text-center py-12">
            <p className="text-body-md text-gray-500">
              У вас пока нет публикаций
            </p>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}
