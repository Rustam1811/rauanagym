'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import { Dumbbell, Search, Clock, Flame, TrendingUp, Crown } from 'lucide-react';
import { useWorkouts, useWorkoutsByCategory } from '@/hooks/useWorkouts';
import { WorkoutCardSkeleton } from '@/components/ui/Skeleton';
import { NoWorkoutsEmpty } from '@/components/ui/EmptyState';

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch workouts based on active tab
  const { data: allWorkouts, isLoading: allLoading, error: allError } = useWorkouts();
  const { data: strengthWorkouts, isLoading: strengthLoading } = useWorkoutsByCategory('strength');
  const { data: cardioWorkouts, isLoading: cardioLoading } = useWorkoutsByCategory('cardio');
  const { data: yogaWorkouts, isLoading: yogaLoading } = useWorkoutsByCategory('yoga');

  // Determine which data to show based on active tab
  let workouts = allWorkouts || [];
  let isLoading = allLoading;
  
  if (activeTab === 'strength') {
    workouts = strengthWorkouts || [];
    isLoading = strengthLoading;
  } else if (activeTab === 'cardio') {
    workouts = cardioWorkouts || [];
    isLoading = cardioLoading;
  } else if (activeTab === 'yoga') {
    workouts = yogaWorkouts || [];
    isLoading = yogaLoading;
  }

  // Filter by search query
  const filteredWorkouts = workouts.filter(workout =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workout.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {isLoading ? (
          <>
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
          </>
        ) : allError ? (
          <div className="text-center py-8 text-red-600">
            Ошибка загрузки тренировок. Попробуйте позже.
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <NoWorkoutsEmpty />
        ) : (
          filteredWorkouts.map((workout, index) => (
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
                    src={workout.coverImageUrl || '/placeholder-workout.jpg'}
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
                  {workout.difficulty && (
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10">
                      <span className="text-xs font-semibold text-white">{workout.difficulty}</span>
                    </div>
                  )}

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
                      <span className="text-sm font-semibold text-gray-900">{workout.estimatedDurationMinutes || 0} мин</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-gray-600" strokeWidth={2} />
                      <span className="text-sm font-semibold text-gray-900">{workout.caloriesBurned || 0} ккал</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-gray-600" strokeWidth={2} />
                      <span className="text-sm font-semibold text-gray-900">+{workout.xpReward || 0} XP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}
