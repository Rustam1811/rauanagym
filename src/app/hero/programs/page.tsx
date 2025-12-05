'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import { Target, Calendar, TrendingUp, CheckCircle, Crown, Play } from 'lucide-react';

export default function ProgramsPage() {
  const programs = [
    {
      id: 1,
      title: '30-Day Shred',
      description: 'Интенсивная программа для похудения за 30 дней',
      duration: '30 дней',
      progress: 12,
      maxProgress: 30,
      workouts: 45,
      difficulty: 'Сложный',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      isActive: true,
      isPremium: true,
    },
    {
      id: 2,
      title: 'Beginner Strength',
      description: 'Базовая программа для начинающих',
      duration: '8 недель',
      progress: 0,
      maxProgress: 24,
      workouts: 24,
      difficulty: 'Легкий',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      isActive: false,
    },
    {
      id: 3,
      title: 'Muscle Building Pro',
      description: 'Профессиональная программа набора массы',
      duration: '12 недель',
      progress: 8,
      maxProgress: 36,
      workouts: 48,
      difficulty: 'Средний',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      isPremium: true,
      isActive: false,
    },
    {
      id: 4,
      title: 'Yoga & Flexibility',
      description: 'Программа для развития гибкости и баланса',
      duration: '6 недель',
      progress: 0,
      maxProgress: 18,
      workouts: 30,
      difficulty: 'Легкий',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      isActive: false,
    },
  ];

  const activeProgram = programs.find(p => p.isActive);
  const availablePrograms = programs.filter(p => !p.isActive);

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Программы</h1>
              <p className="text-sm text-gray-600">Достигай целей по плану</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Active Program */}
      {activeProgram && (
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FDE68A] to-[#F9A8D4] flex items-center justify-center">
              <span className="text-lg">🔥</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Активная программа</h2>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={activeProgram.image}
                alt={activeProgram.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {activeProgram.isPremium && (
                  <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F9A8D4] flex items-center gap-1.5 shadow-lg">
                    <Crown className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    <span className="text-xs font-bold text-white">Premium</span>
                  </div>
                )}
                <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10">
                  <span className="text-xs font-semibold text-white">{activeProgram.difficulty}</span>
                </div>
              </div>

              {/* Active Badge */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-green-500/90 backdrop-blur-sm">
                <span className="text-xs font-bold text-white">⚡ Активна</span>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">{activeProgram.title}</h3>
                <p className="text-sm text-white/90">{activeProgram.description}</p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="p-5 space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Прогресс программы</span>
                  <span className="font-bold text-gray-900">
                    {Math.round((activeProgram.progress / activeProgram.maxProgress) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${(activeProgram.progress / activeProgram.maxProgress) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>День {activeProgram.progress} из {activeProgram.maxProgress}</span>
                  <span>{activeProgram.maxProgress - activeProgram.progress} дней осталось</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A78BFA]/20 to-[#F9A8D4]/20 flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-5 h-5 text-[#A78BFA]" strokeWidth={2} />
                  </div>
                  <div className="text-xs text-gray-600 mb-0.5">Длительность</div>
                  <div className="text-sm font-bold text-gray-900">{activeProgram.duration}</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={2} />
                  </div>
                  <div className="text-xs text-gray-600 mb-0.5">Тренировок</div>
                  <div className="text-sm font-bold text-gray-900">{activeProgram.workouts}</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" strokeWidth={2} />
                  </div>
                  <div className="text-xs text-gray-600 mb-0.5">Сложность</div>
                  <div className="text-sm font-bold text-gray-900">{activeProgram.difficulty}</div>
                </div>
              </div>

              {/* Continue Button */}
              <button className="w-full mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" strokeWidth={2.5} fill="white" />
                Продолжить программу
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Available Programs */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📋 Доступные программы</h2>
        
        <div className="space-y-4">
          {availablePrograms.map((program, index) => (
            <Link key={program.id} href={`/hero/program/${program.id}`}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-98 transition-all"
              >
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {program.isPremium && (
                      <div className="absolute top-2 left-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FDE68A] to-[#F9A8D4] flex items-center justify-center shadow-lg">
                          <Crown className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-0.5">
                        {program.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {program.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10">
                        <span className="text-xs font-semibold text-gray-900">{program.difficulty}</span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">
                        📅 {program.duration}
                      </span>
                      <span className="text-xs text-gray-600 font-medium">
                        💪 {program.workouts}
                      </span>
                    </div>

                    {program.progress > 0 && (
                      <div className="pt-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] rounded-full"
                              style={{ width: `${(program.progress / program.maxProgress) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#A78BFA]">
                            {Math.round((program.progress / program.maxProgress) * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Create Custom Program */}
      <div className="px-4 pb-6">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-full rounded-3xl border-2 border-dashed border-[#A78BFA]/50 bg-white/20 backdrop-blur-md hover:border-[#A78BFA] hover:bg-white/30 active:scale-98 transition-all p-6"
        >
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A78BFA]/20 to-[#F9A8D4]/20 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Target className="w-7 h-7 text-[#A78BFA]" strokeWidth={2} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Создать свою программу
            </h3>
            <p className="text-sm text-gray-600">
              Настрой тренировки под свои цели
            </p>
          </div>
        </motion.button>
      </div>

      <BottomTabBar />
    </div>
  );
}
