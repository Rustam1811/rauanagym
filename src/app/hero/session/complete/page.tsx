'use client';

import { useRouter } from 'next/navigation';
import { Trophy, Flame, Zap, Clock, Award, Share2, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJBadge,
  HJProgress,
} from '@/components/ui/hj';

export default function SessionCompletePage() {
  const router = useRouter();

  // Mock session data
  const sessionData = {
    workoutName: 'Силовая тренировка верха тела',
    duration: 48, // minutes
    caloriesBurned: 380,
    xpEarned: 150,
    exercisesCompleted: 4,
    totalSets: 14,
    personalRecords: 2,
    streakDays: 7,
    level: 12,
    xpToNextLevel: 850,
    currentXP: 650,
    achievements: [
      {
        id: '1',
        name: 'Огненная неделя',
        description: '7 дней подряд',
        icon: '🔥',
        isNew: true,
      },
      {
        id: '2',
        name: 'Железный человек',
        description: '50 силовых тренировок',
        icon: '💪',
        isNew: true,
      },
    ],
    nextWorkout: {
      name: 'Тренировка ног',
      duration: 45,
      difficulty: 'intermediate',
    },
  };

  // Trigger confetti on mount
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const levelProgress = (sessionData.currentXP / sessionData.xpToNextLevel) * 100;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Моя тренировка',
        text: `Я только что завершил "${sessionData.workoutName}" - сжег ${sessionData.caloriesBurned} калорий за ${sessionData.duration} минут! 💪`,
      });
    }
  };

  return (
    <HJScreen className="bg-gradient-to-b from-hj-primary/10 via-hj-bg to-hj-bg">
      {/* Hero Section */}
      <HJSection>
        <div className="text-center py-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-hj-strong animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-hj-textMain mb-2">
            Отличная работа!
          </h1>
          <p className="text-hj-textSoft">
            Вы завершили тренировку
          </p>
          <p className="text-sm font-semibold text-hj-primary mt-1">
            {sessionData.workoutName}
          </p>
        </div>
      </HJSection>

      {/* Main Stats */}
      <HJSection title="📊 Статистика тренировки">
        <div className="grid grid-cols-2 gap-3">
          <HJCard className="text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-hj-primary">{sessionData.duration}</div>
            <div className="text-xs text-hj-textSoft">Минут</div>
          </HJCard>

          <HJCard className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-hj-primary">{sessionData.caloriesBurned}</div>
            <div className="text-xs text-hj-textSoft">Калорий</div>
          </HJCard>

          <HJCard className="text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-hj-primary">+{sessionData.xpEarned}</div>
            <div className="text-xs text-hj-textSoft">XP заработано</div>
          </HJCard>

          <HJCard className="text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-hj-primary">{sessionData.totalSets}</div>
            <div className="text-xs text-hj-textSoft">Подходов</div>
          </HJCard>
        </div>
      </HJSection>

      {/* Level Progress */}
      <HJSection title="⚡ Прогресс уровня">
        <HJCard className="bg-gradient-to-br from-hj-primary/10 to-hj-primarySoft/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-hj-textSoft">Уровень {sessionData.level}</div>
              <div className="text-xs text-hj-textSoft">
                {sessionData.currentXP} / {sessionData.xpToNextLevel} XP
              </div>
            </div>
            <HJBadge variant="primary" size="sm">
              +{sessionData.xpEarned} XP
            </HJBadge>
          </div>
          <HJProgress value={levelProgress} />
          <div className="text-xs text-hj-textSoft text-center mt-2">
            {sessionData.xpToNextLevel - sessionData.currentXP} XP до уровня {sessionData.level + 1}
          </div>
        </HJCard>
      </HJSection>

      {/* Achievements */}
      {sessionData.achievements.length > 0 && (
        <HJSection title="🏆 Новые достижения">
          <div className="space-y-2">
            {sessionData.achievements.map((achievement) => (
              <HJCard 
                key={achievement.id}
                className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border-yellow-500/30 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-hj-strong">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-hj-textMain">{achievement.name}</h4>
                      {achievement.isNew && (
                        <HJBadge variant="warning" size="sm">НОВОЕ</HJBadge>
                      )}
                    </div>
                    <p className="text-xs text-hj-textSoft">{achievement.description}</p>
                  </div>
                </div>
              </HJCard>
            ))}
          </div>
        </HJSection>
      )}

      {/* Streak */}
      <HJSection title="🔥 Серия">
        <HJCard className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-hj-strong">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-hj-primary">{sessionData.streakDays} дней</div>
                <div className="text-xs text-hj-textSoft">Продолжай в том же духе!</div>
              </div>
            </div>
          </div>
        </HJCard>
      </HJSection>

      {/* Personal Records */}
      {sessionData.personalRecords > 0 && (
        <HJSection>
          <HJCard className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-hj-strong">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-hj-textMain">
                  {sessionData.personalRecords} личных рекорда!
                </h4>
                <p className="text-xs text-hj-textSoft">Ты превзошел себя!</p>
              </div>
            </div>
          </HJCard>
        </HJSection>
      )}

      {/* Next Workout */}
      <HJSection title="⏭️ Что дальше?">
        <HJCard className="hover:shadow-hj-strong transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-hj-textMain">{sessionData.nextWorkout.name}</h4>
              <p className="text-xs text-hj-textSoft">
                ~{sessionData.nextWorkout.duration} минут
              </p>
            </div>
            <HJBadge variant="primary" size="sm">
              Рекомендуем
            </HJBadge>
          </div>
        </HJCard>
      </HJSection>

      {/* Action Buttons */}
      <HJSection>
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className="w-full py-4 rounded-full bg-hj-cardSoft text-hj-primary font-bold shadow-hj hover:shadow-hj-strong transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Поделиться результатом
          </button>

          <button
            onClick={() => router.push('/hero/home')}
            className="w-full py-4 rounded-full bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white font-bold shadow-hj-strong hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            На главную
          </button>
        </div>
      </HJSection>

      <div className="h-20" /> {/* Spacer */}
    </HJScreen>
  );
}
