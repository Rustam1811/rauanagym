'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, SkipForward, Check, Info } from 'lucide-react';
import Image from 'next/image';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJBadge,
  HJProgress,
} from '@/components/ui/hj';

export default function ActiveSessionPage() {
  const router = useRouter();
  
  // Mock workout data
  const workout = {
    id: '1',
    name: 'Силовая тренировка верха тела',
    exercises: [
      {
        id: '1',
        name: 'Жим штанги лежа',
        sets: 4,
        reps: '10-12',
        rest: 90,
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
      },
      {
        id: '2',
        name: 'Тяга штанги в наклоне',
        sets: 4,
        reps: '10-12',
        rest: 90,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      },
      {
        id: '3',
        name: 'Жим гантелей на наклонной',
        sets: 3,
        reps: '12-15',
        rest: 60,
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80',
      },
      {
        id: '4',
        name: 'Подтягивания',
        sets: 3,
        reps: 'до отказа',
        rest: 120,
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80',
      },
    ],
    totalCalories: 380,
    totalXP: 150,
  };

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [completedSets, setCompletedSets] = useState<number[]>([]);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSetsCount = completedSets.length;
  const progress = (completedSetsCount / totalSets) * 100;

  // Elapsed timer
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Rest timer
  useEffect(() => {
    if (!isResting || isPaused || restTime <= 0) return;

    const timer = setInterval(() => {
      setRestTime(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setIsResting(false);
        }
        return Math.max(0, next);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, isPaused, restTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteSet = () => {
    const setId = currentExerciseIndex * 100 + currentSet;
    setCompletedSets([...completedSets, setId]);

    if (currentSet < currentExercise.sets) {
      // Start rest
      setIsResting(true);
      setRestTime(currentExercise.rest);
      setCurrentSet(currentSet + 1);
    } else {
      // Move to next exercise
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(true);
        setRestTime(workout.exercises[currentExerciseIndex + 1].rest);
      } else {
        // Workout complete
        router.push('/hero/session/complete');
      }
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTime(0);
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
      setRestTime(0);
    } else {
      router.push('/hero/session/complete');
    }
  };

  const handleQuit = () => {
    if (confirm('Вы уверены, что хотите завершить тренировку?')) {
      router.push('/hero/workouts');
    }
  };

  return (
    <HJScreen className="bg-gradient-to-b from-hj-bg to-hj-cardSoft">
      {/* Header */}
      <HJSection>
        <div className="flex items-center justify-between">
          <button 
            onClick={handleQuit}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-hj-textMain" />
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-hj-textMain">{formatTime(elapsedTime)}</div>
            <div className="text-xs text-hj-textSoft">Время тренировки</div>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow"
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-hj-primary ml-0.5" />
            ) : (
              <Pause className="w-5 h-5 text-hj-primary" />
            )}
          </button>
        </div>
      </HJSection>

      {/* Progress */}
      <HJSection>
        <HJCard>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-hj-textSoft">Прогресс</span>
              <span className="font-semibold text-hj-primary">
                {completedSetsCount} / {totalSets} подходов
              </span>
            </div>
            <HJProgress value={progress} />
            <div className="text-xs text-hj-textSoft text-center">
              Упражнение {currentExerciseIndex + 1} из {workout.exercises.length}
            </div>
          </div>
        </HJCard>
      </HJSection>

      {/* Rest Timer (shows when resting) */}
      {isResting && (
        <HJSection>
          <HJCard className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-hj-primary mb-2">
                {formatTime(restTime)}
              </div>
              <div className="text-sm text-hj-textSoft mb-4">Отдых</div>
              <button
                onClick={handleSkipRest}
                className="px-6 py-2 rounded-full bg-hj-cardSoft text-hj-primary font-semibold shadow-hj hover:shadow-hj-strong transition-shadow"
              >
                Пропустить отдых
              </button>
            </div>
          </HJCard>
        </HJSection>
      )}

      {/* Current Exercise */}
      <HJSection title={`💪 ${currentExercise.name}`}>
        <HJCard className="overflow-hidden">
          <div className="relative h-48 -mx-4 -mt-4 mb-4">
            <Image
              src={currentExercise.image}
              alt={currentExercise.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hj-card via-transparent to-transparent" />
            
            {/* Exercise info overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <HJBadge variant="primary" size="sm">
                  Подход {currentSet} / {currentExercise.sets}
                </HJBadge>
              </div>
              <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-hj-strong">
                <Info className="w-6 h-6 text-hj-primary" />
              </button>
            </div>
          </div>

          {/* Sets & Reps */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 rounded-2xl bg-hj-cardSoft">
              <div className="text-2xl font-bold text-hj-primary">{currentExercise.sets}</div>
              <div className="text-xs text-hj-textSoft">Подходов</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-hj-cardSoft">
              <div className="text-2xl font-bold text-hj-primary">{currentExercise.reps}</div>
              <div className="text-xs text-hj-textSoft">Повторений</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleCompleteSet}
              disabled={isResting || isPaused}
              className={`w-full py-4 rounded-full font-bold shadow-hj-strong transition-all flex items-center justify-center gap-2 ${
                isResting || isPaused
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-[0_15px_40px_rgba(34,197,94,0.4)]'
              }`}
            >
              <Check className="w-5 h-5" />
              Подход выполнен
            </button>

            <button
              onClick={handleSkipExercise}
              className="w-full py-3 rounded-full bg-hj-cardSoft text-hj-textSoft font-semibold shadow-hj hover:shadow-hj-strong transition-shadow flex items-center justify-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              Пропустить упражнение
            </button>
          </div>
        </HJCard>
      </HJSection>

      {/* Upcoming Exercises */}
      {currentExerciseIndex < workout.exercises.length - 1 && (
        <HJSection title="⏭️ Следующие упражнения">
          <div className="space-y-2">
            {workout.exercises.slice(currentExerciseIndex + 1).map((exercise, index) => (
              <HJCard key={exercise.id} className="hover:shadow-hj-strong transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={exercise.image}
                      alt={exercise.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-hj-textMain truncate">
                      {exercise.name}
                    </h4>
                    <p className="text-xs text-hj-textSoft">
                      {exercise.sets} × {exercise.reps}
                    </p>
                  </div>
                  <HJBadge variant="neutral" size="sm">
                    {index + 2}
                  </HJBadge>
                </div>
              </HJCard>
            ))}
          </div>
        </HJSection>
      )}

      {/* Stats Preview */}
      <HJSection title="📊 Статистика">
        <div className="grid grid-cols-3 gap-2">
          <HJCard className="text-center">
            <div className="text-xl font-bold text-hj-primary">
              {Math.round((elapsedTime / 60))}
            </div>
            <div className="text-[10px] text-hj-textSoft">Минут</div>
          </HJCard>
          <HJCard className="text-center">
            <div className="text-xl font-bold text-orange-500">
              ~{Math.round(workout.totalCalories * (progress / 100))}
            </div>
            <div className="text-[10px] text-hj-textSoft">Калорий</div>
          </HJCard>
          <HJCard className="text-center">
            <div className="text-xl font-bold text-purple-500">
              ~{Math.round(workout.totalXP * (progress / 100))}
            </div>
            <div className="text-[10px] text-hj-textSoft">XP</div>
          </HJCard>
        </div>
      </HJSection>

      <div className="h-20" /> {/* Spacer */}
    </HJScreen>
  );
}
