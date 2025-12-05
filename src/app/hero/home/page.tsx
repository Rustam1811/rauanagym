'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import AvatarCharacter from '@/components/hero-journey/AvatarCharacter';
import { Ticket, Dumbbell, Settings, Target, TrendingUp, Flame, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRecommendedWorkouts } from '@/hooks/useWorkouts';
import { WorkoutCardSkeleton } from '@/components/ui/Skeleton';
import { NoWorkoutsEmpty } from '@/components/ui/EmptyState';

export default function HomePage() {
  const { userProfile } = useAuth();
  const { data: workouts, isLoading, error } = useRecommendedWorkouts();

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header with background image */}
      <div className="relative h-[320px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white" />
        </div>
        
        {/* Top bar with glassmorphism */}
        <div className="relative z-10 flex items-center justify-between p-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.3)] border-2 border-white/20">
              <AvatarCharacter size="sm" character="🥊" />
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-md rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-white/10">
              <Ticket className="w-4 h-4 text-white" strokeWidth={2.5} />
              <span className="text-sm font-bold text-white tracking-tight">0</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-md rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-white/10">
              <Dumbbell className="w-4 h-4 text-white" strokeWidth={2.5} />
              <span className="text-sm font-bold text-white tracking-tight">0</span>
            </div>
            <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-white/10 active:scale-95 transition-transform">
              <Settings className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-24 relative z-10 space-y-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="rounded-3xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <Flame className="w-6 h-6 text-white mb-2" strokeWidth={2} />
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-white/80 font-medium">Streak</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#F9A8D4] to-[#FDE68A] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <TrendingUp className="w-6 h-6 text-white mb-2" strokeWidth={2} />
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-white/80 font-medium">XP</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#FDE68A] to-[#A78BFA] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <Dumbbell className="w-6 h-6 text-white mb-2" strokeWidth={2} />
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs text-white/80 font-medium">Workouts</p>
          </div>
        </motion.div>

        {/* No active program banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA]/10 via-[#F9A8D4]/10 to-[#FDE68A]/10" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Начни программу</h3>
                  <p className="text-sm text-gray-600">Персональный план тренировок</p>
                </div>
              </div>
              <Link href="/hero/programs">
                <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all">
                  Подобрать программу
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recommended Workouts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Рекомендуем</h2>
            <Link href="/hero/workouts" className="text-sm font-semibold bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] bg-clip-text text-transparent">
              Все
            </Link>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <WorkoutCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-6 rounded-3xl bg-red-50 border border-red-200">
              <p className="text-red-600 text-center">
                Не удалось загрузить тренировки
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && (!workouts || workouts.length === 0) && (
            <NoWorkoutsEmpty />
          )}

          {/* Workout List */}
          {!isLoading && !error && workouts && workouts.length > 0 && (
            <div className="space-y-4">
              {workouts.map((workout, index) => (
              <Link key={workout.id} href={`/hero/workout/${workout.id}`}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-98 transition-all"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      {workout.coverImageUrl ? (
                        <Image
                          src={workout.coverImageUrl}
                          alt={workout.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-base font-bold text-gray-900 mb-1">{workout.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" strokeWidth={2} />
                          <span className="font-medium">{workout.estimatedDurationMinutes} мин</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" strokeWidth={2} />
                          <span className="font-medium">{workout.caloriesBurned || 0} ккал</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
            </div>
          )}
        </motion.div>

        {/* Quick Start Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/hero/workouts">
            <button className="w-full py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-gray-900 font-semibold text-lg shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-95 transition-all">
              <div className="flex items-center justify-center gap-2">
                <Dumbbell className="w-5 h-5" strokeWidth={2} />
                <span>Начать тренировку</span>
              </div>
            </button>
          </Link>
        </motion.div>
      </div>

      <BottomTabBar />
    </div>
  );
}
