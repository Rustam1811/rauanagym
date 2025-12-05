'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import { Dumbbell, Search, Clock, Flame, TrendingUp, Crown } from 'lucide-react';

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const workouts = [
    {
      id: 1,
      title: 'Full Body Strength',
      description: 'Комплексная силовая тренировка на все группы мышц',
      duration: 45,
      calories: 380,
      xp: 50,
      difficulty: 'Средний',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      isPremium: true,
    },
    {
      id: 2,
      title: 'HIIT Cardio Blast',
      description: 'Интенсивная кардио-тренировка для жиросжигания',
      duration: 30,
      calories: 450,
      xp: 60,
      difficulty: 'Сложный',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
    {
      id: 3,
      title: 'Yoga Flow',
      description: 'Расслабляющая йога для гибкости и восстановления',
      duration: 40,
      calories: 180,
      xp: 30,
      difficulty: 'Легкий',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    },
    {
      id: 4,
      title: 'Arms & Shoulders',
      description: 'Прокачка рук и плеч с гантелями',
      duration: 35,
      calories: 280,
      xp: 45,
      difficulty: 'Средний',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      isPremium: true,
    },
    {
      id: 5,
      title: 'Core Killer',
      description: 'Мощная тренировка пресса и кора',
      duration: 25,
      calories: 220,
      xp: 40,
      difficulty: 'Сложный',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    },
  ];

  const categories = [
    { id: 'all', label: 'Все', icon: '💪' },
    { id: 'strength', label: 'Сила', icon: '🏋️' },
    { id: 'cardio', label: 'Кардио', icon: '🏃' },
    { id: 'yoga', label: 'Йога', icon: '🧘' },
    { id: 'hiit', label: 'HIIT', icon: '🔥' },
  ];

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Тренировки</h1>
              <p className="text-sm text-gray-600">Выбери и начни прямо сейчас</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center shadow-lg">
              <Dumbbell className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Поиск тренировок..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 px-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white shadow-lg'
                  : 'bg-white/20 backdrop-blur-md border border-white/10 text-gray-700 hover:bg-white/30'
              }`}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <p className="text-2xl font-bold text-white">128</p>
            <p className="text-xs text-white/80 font-medium mt-1">Тренировок</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#F9A8D4] to-[#FDE68A] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <p className="text-2xl font-bold text-white">45</p>
            <p className="text-xs text-white/80 font-medium mt-1">Дней</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#FDE68A] to-[#A78BFA] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <p className="text-2xl font-bold text-white">89%</p>
            <p className="text-xs text-white/80 font-medium mt-1">Успешных</p>
          </div>
        </div>
      </div>

      {/* Workouts List */}
      <div className="px-4 space-y-4 pb-6">
        {workouts.map((workout, index) => (
          <Link key={workout.id} href={`/hero/workout/${workout.id}`}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-98 transition-all"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={workout.image}
                  alt={workout.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Premium Badge */}
                {workout.isPremium && (
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F9A8D4] flex items-center gap-1.5 shadow-lg">
                    <Crown className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    <span className="text-xs font-bold text-white">Рекомендуем</span>
                  </div>
                )}

                {/* Difficulty Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10">
                  <span className="text-xs font-semibold text-white">{workout.difficulty}</span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{workout.title}</h3>
                  <p className="text-sm text-white/90">{workout.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-600" strokeWidth={2} />
                    <span className="text-sm font-semibold text-gray-900">{workout.duration} мин</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-gray-600" strokeWidth={2} />
                    <span className="text-sm font-semibold text-gray-900">{workout.calories} ккал</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-gray-600" strokeWidth={2} />
                    <span className="text-sm font-semibold text-gray-900">+{workout.xp} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}
