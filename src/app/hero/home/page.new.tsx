'use client';

import { motion } from 'framer-motion';
import { HJCard } from '@/components/HJCard';
import { HJButton } from '@/components/HJButton';
import { HJSection } from '@/components/HJSection';
import AvatarCharacter from '@/components/hero-journey/AvatarCharacter';
import BottomTabBar from '@/components/hero-journey/BottomTabBar';
import { Ticket, Dumbbell, Settings } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header with background image */}
      <div className="relative h-[320px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
        </div>
        
        {/* Top bar with glassmorphism */}
        <div className="relative z-10 flex items-center justify-between p-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.35)] border-2 border-[#9F6AEE]">
              <AvatarCharacter size="sm" character="🥊" />
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-white/20">
              <Ticket className="w-4 h-4 text-[#7C3AED]" strokeWidth={2.5} />
              <span className="text-sm font-bold tracking-tight">0</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-white/20">
              <Dumbbell className="w-4 h-4 text-[#7C3AED]" strokeWidth={2.5} />
              <span className="text-sm font-bold tracking-tight">0</span>
            </div>
            <button className="p-2.5 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-white/20 active:scale-95 transition-transform">
              <Settings className="w-5 h-5 text-gray-900" strokeWidth={2} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-20 relative z-10">
        {/* No active program banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HJCard>
            <div className="mb-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                У вас нет активной программы
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Сдайте тест чтобы определить подходящую программу
              </p>
            </div>
            <HJButton label="Подобрать программу" />
          </HJCard>
        </motion.div>

        {/* My sessions section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HJSection title="Мои занятия">
            <HJCard>
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#7C3AED]/10 to-[#A855F7]/10 flex items-center justify-center mx-auto mb-5 shadow-[inset_0_0_20px_rgba(255,255,255,0.15)]">
                  <Dumbbell className="w-10 h-10 text-[#7C3AED]" strokeWidth={1.5} />
                </div>
                <p className="text-base text-gray-600 mb-6 font-medium">
                  У вас нет активных записей
                </p>
                <div className="space-y-3">
                  <HJButton label="Приобрести абонемент" />
                  <button className="w-full py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-gray-900 font-semibold text-lg shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-95 transition-all">
                    Купить билеты
                  </button>
                </div>
              </div>
            </HJCard>
          </HJSection>
        </motion.div>
      </div>

      <BottomTabBar />
    </div>
  );
}
