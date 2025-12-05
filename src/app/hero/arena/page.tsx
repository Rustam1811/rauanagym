'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import { Trophy, Users, Target, Search, Crown, TrendingUp, Flame } from 'lucide-react';

export default function ArenaPage() {
  const [activeTab, setActiveTab] = useState<'clans' | 'leaderboard'>('clans');
  const [searchQuery, setSearchQuery] = useState('');

  const clans = [
    { 
      id: 1,
      name: 'Титаны', 
      club: 'Zeus Fitness', 
      members: 45, 
      level: 12,
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
      isRecommended: true,
    },
    { 
      id: 2,
      name: 'Спартанцы', 
      club: 'Arena Club', 
      members: 38, 
      level: 10,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
    { 
      id: 3,
      name: 'Воины', 
      club: 'Power Gym', 
      members: 52, 
      level: 15,
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
      isRecommended: true,
    },
    { 
      id: 4,
      name: 'Легион', 
      club: 'Fit Zone', 
      members: 29, 
      level: 8,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    },
  ];

  const leaderboard = [
    { 
      id: 1,
      rank: 1, 
      name: 'Александр', 
      xp: 12580, 
      level: 24,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      isYou: false,
    },
    { 
      id: 2,
      rank: 2, 
      name: 'Мария', 
      xp: 11240, 
      level: 22,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      isYou: false,
    },
    { 
      id: 3,
      rank: 3, 
      name: 'Дмитрий', 
      xp: 10890, 
      level: 21,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      isYou: false,
    },
    { 
      id: 4,
      rank: 4, 
      name: 'Вы', 
      xp: 9450, 
      level: 19,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      isYou: true,
    },
    { 
      id: 5,
      rank: 5, 
      name: 'Елена', 
      xp: 8920, 
      level: 18,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      isYou: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Арена</h1>
              <p className="text-sm text-gray-600">Соревнуйся и побеждай</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 relative">
            <button
              onClick={() => setActiveTab('clans')}
              className="relative pb-3 text-base font-bold transition-colors"
            >
              <span className={activeTab === 'clans' ? 'text-[#A78BFA]' : 'text-gray-600'}>
                Битва кланов
              </span>
              {activeTab === 'clans' && (
                <motion.div 
                  layoutId="activeArenaTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] rounded-full shadow-lg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="relative pb-3 text-base font-bold transition-colors"
            >
              <span className={activeTab === 'leaderboard' ? 'text-[#A78BFA]' : 'text-gray-600'}>
                Лидерборд
              </span>
              {activeTab === 'leaderboard' && (
                <motion.div 
                  layoutId="activeArenaTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] rounded-full shadow-lg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'clans' && (
        <>
          {/* Action Cards */}
          <div className="px-4 py-6">
            <div className="grid grid-cols-3 gap-3">
              <button className="text-center active:scale-95 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] shadow-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-gray-900">Создать клан</p>
              </button>
              <button className="text-center active:scale-95 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F9A8D4] to-[#FDE68A] shadow-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-gray-900">Заявки</p>
              </button>
              <button className="text-center active:scale-95 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FDE68A] to-[#A78BFA] shadow-lg flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-gray-900">Лиги</p>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="Поиск среди кланов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              />
            </div>
          </div>

          {/* Clans List */}
          <div className="px-4 space-y-4 pb-6">
            {clans.map((clan, index) => (
              <Link key={clan.id} href={`/hero/clan/${clan.id}`}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Clan Image */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                      <Image
                        src={clan.image}
                        alt={clan.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
                      {clan.isRecommended && (
                        <div className="absolute top-1.5 left-1.5">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FDE68A] to-[#F9A8D4] flex items-center justify-center shadow-lg">
                            <Crown className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-0.5">{clan.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{clan.club}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" strokeWidth={2} />
                          {clan.members}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
                          Lvl {clan.level}
                        </span>
                      </div>
                    </div>

                    {/* Join Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle join
                      }}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white text-sm font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                      Вступить
                    </button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </>
      )}

      {activeTab === 'leaderboard' && (
        <div className="px-4 py-6">
          {/* Top 3 Podium */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3 items-end">
              {/* Rank 2 */}
              <div className="text-center">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-2 shadow-lg border-2 border-gray-300">
                  <Image src={leaderboard[1].avatar} alt={leaderboard[1].name} fill className="object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-sm font-bold text-gray-700">2</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{leaderboard[1].name}</p>
                <p className="text-xs text-gray-600">{leaderboard[1].xp.toLocaleString()} XP</p>
              </div>

              {/* Rank 1 */}
              <div className="text-center">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-2 shadow-xl border-2 border-[#FDE68A]">
                  <Image src={leaderboard[0].avatar} alt={leaderboard[0].name} fill className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FDE68A] to-[#F9A8D4] flex items-center justify-center mx-auto mb-2 shadow-xl">
                  <Crown className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-base font-bold text-gray-900">{leaderboard[0].name}</p>
                <p className="text-sm text-gray-600">{leaderboard[0].xp.toLocaleString()} XP</p>
              </div>

              {/* Rank 3 */}
              <div className="text-center">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-2 shadow-lg border-2 border-orange-400">
                  <Image src={leaderboard[2].avatar} alt={leaderboard[2].name} fill className="object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{leaderboard[2].name}</p>
                <p className="text-xs text-gray-600">{leaderboard[2].xp.toLocaleString()} XP</p>
              </div>
            </div>
          </div>

          {/* Full Leaderboard */}
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`rounded-3xl ${user.isYou ? 'bg-gradient-to-r from-[#A78BFA]/20 via-[#F9A8D4]/20 to-[#FDE68A]/20 border-2 border-[#A78BFA]' : 'bg-white/20 backdrop-blur-md border border-white/10'} shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden p-4`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-full ${
                    user.rank === 1 ? 'bg-gradient-to-br from-[#FDE68A] to-[#F9A8D4]' :
                    user.rank === 2 ? 'bg-gray-300' :
                    user.rank === 3 ? 'bg-orange-400' :
                    'bg-white/20 backdrop-blur-md border border-white/10'
                  } flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className={`text-base font-bold ${
                      user.rank <= 3 ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user.rank}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-0.5">
                      {user.name} {user.isYou && '(Вы)'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" strokeWidth={2} />
                        {user.xp.toLocaleString()} XP
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
                        Lvl {user.level}
                      </span>
                    </div>
                  </div>

                  {/* Badge for You */}
                  {user.isYou && (
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] shadow-lg">
                      <span className="text-xs font-bold text-white">Это вы</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
