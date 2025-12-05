import Image from 'next/image';
import { HJScreen } from '@/components/ui/HJScreen';
import { HJCard } from '@/components/HJCard';
import { HJButton } from '@/components/HJButton';
import { HJSection } from '@/components/HJSection';
import { HJTabBar } from '@/components/ui/HJTabBar';
import { Dumbbell, Trophy, Calendar } from 'lucide-react';

export default function HJHomePage() {
  return (
    <>
      <HJScreen>
        {/* Hero Image */}
        <div className="mb-4 overflow-hidden rounded-4xl shadow-hj-strong">
          <div className="relative h-40 w-full">
            <Image
              src="/images/gym-hero.jpg"
              alt="Gym"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl font-bold mb-1">Welcome Back!</h1>
              <p className="text-sm opacity-90">Let&apos;s crush your goals today</p>
            </div>
          </div>
        </div>

        {/* Program Selection Section */}
        <HJSection>
          <HJCard>
            <div className="mb-4 space-y-1">
              <p className="text-sm font-semibold text-hj-textMain">
                У вас нет активной программы
              </p>
              <p className="text-xs text-hj-textSoft">
                Сдайте тест, чтобы подобрать программу, от которой не устанете
              </p>
            </div>
            <HJButton label="Подобрать программу" />
          </HJCard>
        </HJSection>

        {/* My Workouts Section */}
        <HJSection title="Мои занятия">
          <HJCard className="space-y-4">
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-hj-primary/15 to-hj-primarySoft/25 shadow-hj-inner">
                <Dumbbell className="w-6 h-6 text-hj-primary" />
              </div>
              <p className="text-xs text-hj-textSoft">
                У вас нет активных записей
              </p>
            </div>
            <div className="space-y-2">
              <HJButton label="Приобрести абонемент" />
              <HJButton label="Купить билеты" variant="secondary" />
            </div>
          </HJCard>
        </HJSection>

        {/* Stats Section */}
        <HJSection title="Ваша статистика">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-hj-cardSoft shadow-hj border border-white/40 p-4 flex flex-col items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-hj-primary/15 to-hj-primarySoft/20 shadow-hj-inner">
                <Trophy className="w-5 h-5 text-hj-primary" />
              </div>
              <span className="text-xs font-medium text-hj-textSoft">Тренировок</span>
              <span className="text-2xl font-bold text-hj-textMain">0</span>
            </div>
            <div className="rounded-3xl bg-hj-cardSoft shadow-hj border border-white/40 p-4 flex flex-col items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-hj-primary/15 to-hj-primarySoft/20 shadow-hj-inner">
                <Calendar className="w-5 h-5 text-hj-primary" />
              </div>
              <span className="text-xs font-medium text-hj-textSoft">Дней подряд</span>
              <span className="text-2xl font-bold text-hj-textMain">0</span>
            </div>
          </div>
        </HJSection>
      </HJScreen>

      <HJTabBar />
    </>
  );
}
