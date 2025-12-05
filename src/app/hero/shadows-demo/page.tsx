'use client';

import { Sparkles, Zap, Crown, Star, Award } from 'lucide-react';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJButton,
  HJBadge,
} from '@/components/ui/hj';

export default function ShadowsDemo() {
  return (
    <HJScreen>
      {/* Hero */}
      <HJSection>
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-hj-primary to-hj-primarySoft shadow-hj-strong mb-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-hj-textMain">
            Hero Journey Design System
          </h1>
          <p className="text-sm text-hj-textSoft">
            Демонстрация теней и премиум эффектов
          </p>
        </div>
      </HJSection>

      {/* Shadow Types */}
      <HJSection title="🎨 Типы теней">
        <div className="space-y-4">
          {/* shadow-hj */}
          <HJCard className="shadow-hj">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-hj">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-hj-textMain">shadow-hj</h3>
                <p className="text-xs text-hj-textSoft">Стандартная тень для карточек</p>
              </div>
            </div>
          </HJCard>

          {/* shadow-hj-strong */}
          <HJCard className="shadow-hj-strong">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hj-primary to-hj-primarySoft flex items-center justify-center shadow-hj-strong">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-hj-textMain">shadow-hj-strong</h3>
                <p className="text-xs text-hj-textSoft">Усиленная тень для акцентов</p>
              </div>
            </div>
          </HJCard>

          {/* shadow-hj-inner */}
          <HJCard>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-hj-primary/10 flex items-center justify-center shadow-hj-inner">
                <Star className="w-5 h-5 text-hj-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-hj-textMain">shadow-hj-inner</h3>
                <p className="text-xs text-hj-textSoft">Внутренняя тень для эффекта вдавливания</p>
              </div>
            </div>
          </HJCard>
        </div>
      </HJSection>

      {/* Custom Purple Shadows */}
      <HJSection title="💜 Кастомные фиолетовые тени">
        <div className="space-y-4">
          <HJCard className="border-2 border-hj-primary shadow-[0_8px_30px_rgba(124,58,237,0.2)] hover:shadow-[0_15px_50px_rgba(124,58,237,0.4)] transition-shadow duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hj-primary to-hj-primarySoft flex items-center justify-center shadow-[0_10px_30px_rgba(124,58,237,0.3)]">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-hj-textMain">Премиум карточка</h3>
                <p className="text-xs text-hj-textSoft">
                  shadow-[0_8px_30px_rgba(124,58,237,0.2)]
                </p>
              </div>
            </div>
          </HJCard>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-hj-primary to-hj-primarySoft shadow-[0_20px_60px_rgba(124,58,237,0.5)] hover:shadow-[0_25px_80px_rgba(124,58,237,0.6)] transition-shadow duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex w-14 h-14 rounded-full bg-white/20 items-center justify-center backdrop-blur-xl mb-2 shadow-hj">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Премиум подписка</h3>
              <p className="text-sm text-white/90">
                Разблокируйте все возможности
              </p>
            </div>
          </div>
        </div>
      </HJSection>

      {/* Badges with Shadows */}
      <HJSection title="🏷️ Badges с тенями">
        <div className="flex flex-wrap gap-2">
          <HJBadge variant="primary" className="shadow-hj">Primary</HJBadge>
          <HJBadge variant="success" className="shadow-hj">Success</HJBadge>
          <HJBadge variant="warning" className="shadow-hj">Warning</HJBadge>
          <HJBadge variant="error" className="shadow-hj">Error</HJBadge>
          <HJBadge variant="info" className="shadow-hj">Info</HJBadge>
        </div>
      </HJSection>

      {/* Rounded Corners */}
      <HJSection title="📐 Скругления углов">
        <div className="space-y-3">
          <div className="p-4 bg-hj-cardSoft rounded-2xl shadow-hj border border-white/40">
            <p className="text-xs text-hj-textSoft text-center">rounded-2xl (1rem)</p>
          </div>
          <div className="p-4 bg-hj-cardSoft rounded-3xl shadow-hj border border-white/40">
            <p className="text-xs text-hj-textSoft text-center">rounded-3xl (1.75rem)</p>
          </div>
          <div className="p-4 bg-hj-cardSoft rounded-4xl shadow-hj border border-white/40">
            <p className="text-xs text-hj-textSoft text-center">rounded-4xl (2.25rem)</p>
          </div>
        </div>
      </HJSection>

      {/* Buttons */}
      <HJSection title="🔘 Кнопки с тенями">
        <div className="space-y-3">
          <HJButton label="Primary Button (shadow-hj-strong)" variant="primary" />
          <HJButton label="Secondary Button (shadow-hj)" variant="secondary" />
          
          <button className="w-full py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.4)] active:scale-95 transition-all">
            Кастомная зеленая кнопка
          </button>

          <button className="w-full py-4 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-[0_10px_30px_rgba(239,68,68,0.3)] hover:shadow-[0_15px_40px_rgba(239,68,68,0.4)] active:scale-95 transition-all">
            Кастомная красная кнопка
          </button>
        </div>
      </HJSection>

      {/* Glassmorphism */}
      <HJSection title="🔮 Glassmorphism эффекты">
        <div className="space-y-3">
          <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/40 shadow-hj">
            <h3 className="text-sm font-semibold text-hj-textMain mb-2">Light Glass</h3>
            <p className="text-xs text-hj-textSoft">bg-white/10 backdrop-blur-xl</p>
          </div>

          <div className="p-6 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/20 shadow-hj">
            <h3 className="text-sm font-semibold text-hj-textMain mb-2">Dark Glass</h3>
            <p className="text-xs text-hj-textSoft">bg-black/20 backdrop-blur-xl</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-hj-primary/20 to-hj-primarySoft/20 backdrop-blur-xl border border-hj-primary/40 shadow-hj-strong">
            <h3 className="text-sm font-semibold text-hj-primary mb-2">Purple Glass</h3>
            <p className="text-xs text-hj-textSoft">from-hj-primary/20 to-hj-primarySoft/20</p>
          </div>
        </div>
      </HJSection>

      {/* Hover Effects */}
      <HJSection title="✨ Hover эффекты">
        <div className="space-y-3">
          <div className="p-6 rounded-3xl bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow duration-300 cursor-pointer">
            <p className="text-sm text-hj-textMain text-center font-medium">
              Наведи на меня - тень усилится
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-hj-primary to-hj-primarySoft shadow-hj-strong hover:shadow-[0_25px_60px_rgba(124,58,237,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer">
            <p className="text-sm text-white text-center font-medium">
              Hover + Scale эффект
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-hj-card border-2 border-transparent hover:border-hj-primary shadow-hj hover:shadow-[0_15px_40px_rgba(124,58,237,0.3)] transition-all duration-300 cursor-pointer">
            <p className="text-sm text-hj-textMain text-center font-medium">
              Появление фиолетовой рамки при hover
            </p>
          </div>
        </div>
      </HJSection>

      <div className="h-20" /> {/* Spacer for bottom nav */}
    </HJScreen>
  );
}
