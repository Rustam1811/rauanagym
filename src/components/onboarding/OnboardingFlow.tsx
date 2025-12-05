/**
 * Onboarding Flow Component
 * 3-step wizard for new users
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Target, 
  Zap, 
  Heart, 
  TrendingUp, 
  Dumbbell,
  ArrowRight,
  Check
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

type Goal = 'fat_loss' | 'muscle_gain' | 'health' | 'strength' | 'endurance';
type Level = 'beginner' | 'intermediate' | 'advanced';

interface GoalOption {
  id: Goal;
  icon: typeof Target;
  title: string;
  description: string;
  color: string;
}

interface LevelOption {
  id: Level;
  title: string;
  description: string;
  duration: string;
}

const goals: GoalOption[] = [
  {
    id: 'fat_loss',
    icon: Zap,
    title: 'Похудение',
    description: 'Сжигание жира и формирование стройной фигуры',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'muscle_gain',
    icon: Dumbbell,
    title: 'Набор массы',
    description: 'Рост мышц и увеличение силы',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'health',
    icon: Heart,
    title: 'Здоровье',
    description: 'Улучшение общего самочувствия и энергии',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'strength',
    icon: TrendingUp,
    title: 'Сила',
    description: 'Развитие максимальной силы',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'endurance',
    icon: Target,
    title: 'Выносливость',
    description: 'Длительные нагрузки без усталости',
    color: 'from-indigo-500 to-purple-500',
  },
];

const levels: LevelOption[] = [
  {
    id: 'beginner',
    title: 'Новичок',
    description: 'Только начинаю свой путь',
    duration: '0-6 месяцев опыта',
  },
  {
    id: 'intermediate',
    title: 'Средний',
    description: 'Есть базовый опыт тренировок',
    duration: '6-24 месяца опыта',
  },
  {
    id: 'advanced',
    title: 'Продвинутый',
    description: 'Опытный атлет',
    duration: '2+ года опыта',
  },
];

export function OnboardingFlow() {
  const router = useRouter();
  const { user } = useAuth();
  const { success, error: showError } = useToast();
  const { setOnboardingGoal, setOnboardingLevel, completeOnboarding } = useAppStore();
  
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
    setOnboardingGoal(goal);
  };

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setOnboardingLevel(level);
  };

  const handleComplete = async () => {
    if (!user || !selectedGoal || !selectedLevel) return;

    setLoading(true);

    try {
      // Save to Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        goal: selectedGoal,
        experienceLevel: selectedLevel,
        onboardingCompleted: true,
        updatedAt: new Date(),
      });

      completeOnboarding();
      success('Профиль настроен! Добро пожаловать! 🎉');
      
      // Redirect to home
      setTimeout(() => {
        router.push('/hero/home');
      }, 1000);
    } catch (err) {
      showError('Не удалось сохранить настройки');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ width: '0%' }}
          animate={{ width: `${((step + 1) / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {/* Step 0: Welcome */}
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl"
                >
                  <Dumbbell className="w-12 h-12 text-white" />
                </motion.div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Добро пожаловать! 👋
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Я твой персональный AI тренер.<br />
                  Давай настроим твою программу тренировок!
                </p>

                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center gap-2 mx-auto"
                >
                  Начать
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 1: Goal Selection */}
            {step === 1 && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                  Какая у тебя цель?
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Это поможет подобрать идеальную программу
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {goals.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = selectedGoal === goal.id;

                    return (
                      <motion.button
                        key={goal.id}
                        onClick={() => handleGoalSelect(goal.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 rounded-3xl text-left transition-all ${
                          isSelected
                            ? 'bg-white shadow-2xl ring-4 ring-purple-600 ring-offset-2'
                            : 'bg-white/70 shadow-lg hover:shadow-xl'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}

                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {goal.description}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(0)}
                    className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedGoal}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Далее
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Level Selection */}
            {step === 2 && (
              <motion.div
                key="level"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                  Какой у тебя уровень?
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Программа адаптируется под твой опыт
                </p>

                <div className="space-y-4 mb-8">
                  {levels.map((level) => {
                    const isSelected = selectedLevel === level.id;

                    return (
                      <motion.button
                        key={level.id}
                        onClick={() => handleLevelSelect(level.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-6 rounded-3xl text-left transition-all ${
                          isSelected
                            ? 'bg-white shadow-2xl ring-4 ring-purple-600 ring-offset-2'
                            : 'bg-white/70 shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {level.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {level.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {level.duration}
                            </p>
                          </div>

                          {isSelected && (
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center ml-4">
                              <Check className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!selectedLevel || loading}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      <>
                        Завершить
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
