'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HJCard } from '@/components/HJCard';
import { HJButton } from '@/components/HJButton';
import { HJSection } from '@/components/HJSection';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import AvatarCharacter from '@/components/hero-journey/AvatarCharacter';
import { Search, Users, Trophy, Target } from 'lucide-react';

const arenaClans = [
  { 
    name: 'Титаны', 
    club: 'Zeus Fitness', 
    members: 45, 
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80',
  },
  { 
    name: 'Спартанцы', 
    club: 'Arena Club', 
    members: 38, 
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
  },
  { 
    name: 'Воины', 
    club: 'Power Gym', 
    members: 52, 
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
  },
];

export default function ArenaPage() {
  const [activeTab, setActiveTab] = useState<'clans' | 'leaderboard'>('clans');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header */}
      <div className="fixed top-0 inset-x-0 h-auto backdrop-blur-xl bg-white/50 dark:bg-black/30 z-20 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-5 tracking-tight text-gray-900">Арена</h1>
          
          {/* Tabs */}
          <div className="flex gap-8 relative">
            <button
              onClick={() => setActiveTab('clans')}
              className={`pb-3 text-base font-bold tracking-tight transition-colors relative ${
                activeTab === 'clans' ? 'text-[#7C3AED]' : 'text-gray-600'
              }`}
            >
              Битва кланов
              {activeTab === 'clans' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#7C3AED] rounded-full shadow-[0_4px_12px_rgba(124,58,237,0.5)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`pb-3 text-base font-bold tracking-tight transition-colors relative ${
                activeTab === 'leaderboard' ? 'text-[#7C3AED]' : 'text-gray-600'
              }`}
            >
              Лидерборд
              {activeTab === 'leaderboard' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#7C3AED] rounded-full shadow-[0_4px_12px_rgba(124,58,237,0.5)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="pt-36 px-5">
        {activeTab === 'clans' && (
          <>
            {/* Action cards */}
            <motion.div 
              className="grid grid-cols-3 gap-3 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-[28px] bg-[#9F6AEE] shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center mx-auto mb-2">
                  <Users className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold tracking-tight text-gray-900">Создать клан</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-[28px] bg-[#EF4444] shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center mx-auto mb-2">
                  <Target className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold tracking-tight text-gray-900">Заявки</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-[28px] bg-[#EAB308] shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold tracking-tight text-gray-900">Лиги</p>
              </div>
            </motion.div>

            {/* Search */}
            <motion.div 
              className="flex items-center gap-3 bg-white rounded-3xl px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.16)] border border-white/20 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Search className="w-5 h-5 text-gray-500" strokeWidth={2} />
              <input
                type="text"
                placeholder="Поиск среди кланов"
                className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400"
              />
            </motion.div>

            {/* Clans list */}
            <HJSection title="Кланы">
              {arenaClans.map((clan, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <HJCard>
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${clan.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold tracking-tight mb-0.5 text-gray-900">{clan.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{clan.club}</p>
                        <p className="text-xs text-gray-500">{clan.members} участников</p>
                      </div>
                      <button className="text-[#7C3AED] font-bold text-sm px-5 py-2.5 bg-[#7C3AED]/10 rounded-full active:scale-95 transition-transform shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                        Вступить
                      </button>
                    </div>
                  </HJCard>
                </motion.div>
              ))}
            </HJSection>
          </>
        )}

        {activeTab === 'leaderboard' && (
          <>
            {/* Winners */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HJSection title="Рекорды за вчерашний день">
                <HJCard>
                  <div className="space-y-4">
                    {[
                      { name: 'Александр', score: 1250, avatar: '💪' },
                      { name: 'Мария', score: 1180, avatar: '🏃‍♀️' },
                    ].map((winner, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-base shadow-[0_16px_40px_rgba(0,0,0,0.35)] ${i === 0 ? 'bg-[#EAB308]' : 'bg-gray-300'}`}>
                          {i + 1}
                        </div>
                        <div className="rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.35)] border-2 border-[#9F6AEE]">
                          <AvatarCharacter size="sm" character={winner.avatar} showBorder={false} />
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-semibold tracking-tight text-gray-900">{winner.name}</p>
                        </div>
                        <div className="text-xl font-bold text-[#7C3AED] tracking-tight">
                          {winner.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </HJCard>
              </HJSection>
            </motion.div>

            {/* Filters */}
            <motion.div 
              className="flex gap-2 overflow-x-auto pb-2 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white rounded-full text-sm font-bold whitespace-nowrap shadow-[0_10px_30px_rgba(124,58,237,0.4)] tracking-tight">
                Среди похожих
              </button>
              <button className="px-5 py-2.5 bg-white rounded-full text-sm font-bold whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.18)] tracking-tight border border-white/20 text-gray-900">
                За неделю
              </button>
              <button className="px-5 py-2.5 bg-white rounded-full text-sm font-bold whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.18)] tracking-tight border border-white/20 text-gray-900">
                За месяц
              </button>
            </motion.div>

            {/* Leaderboard list */}
            <HJSection title="Общий рейтинг">
              <HJCard>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 text-center text-sm font-bold text-gray-500">
                        {i + 3}
                      </div>
                      <div className="rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                        <AvatarCharacter size="sm" character="🥊" showBorder={false} />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold tracking-tight text-gray-900">Пользователь {i + 3}</p>
                      </div>
                      <div className="text-base font-bold tracking-tight text-gray-900">
                        {1100 - i * 50}
                      </div>
                    </div>
                  ))}
                </div>
              </HJCard>
            </HJSection>

            {/* Current user position */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <HJCard>
                <div className="flex items-center gap-3 bg-gradient-to-r from-[#7C3AED]/10 to-[#A855F7]/10 -m-6 p-6 rounded-3xl">
                  <div className="w-8 text-center text-sm font-bold text-[#7C3AED]">
                    —
                  </div>
                  <div className="rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.35)] border-2 border-[#7C3AED]">
                    <AvatarCharacter size="sm" character="🥊" showBorder={false} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold tracking-tight text-gray-900">Вы</p>
                  </div>
                  <div className="text-base font-bold text-[#7C3AED] tracking-tight">
                    0
                  </div>
                </div>
              </HJCard>
            </motion.div>
          </>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}
