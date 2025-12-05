'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Play, Info } from 'lucide-react';
import Image from 'next/image';
import {
  HJScreen,
  HJSection,
  HJCard,
  HJBadge,
} from '@/components/ui/hj';

export default function ExerciseDetailPage() {
  const params = useParams();
  const exerciseId = params.id;

  // Mock data
  const exercise = {
    id: exerciseId,
    name: 'Приседания со штангой',
    description: 'Базовое упражнение для развития мышц ног и ягодиц. Включает в работу квадрицепсы, бицепсы бедра, ягодичные мышцы и мышцы кора.',
    category: 'Ноги',
    difficulty: 'intermediate' as const,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
    videoUrl: 'https://example.com/video.mp4',
    equipment: ['Штанга', 'Стойки'],
    muscleGroups: ['Квадрицепсы', 'Ягодицы', 'Бицепс бедра', 'Кор'],
    caloriesPerRep: 0.8,
    tips: [
      'Держите спину прямой на протяжении всего движения',
      'Колени не должны выходить за носки',
      'Опускайтесь до параллели бедра с полом',
      'Вес распределяйте на пятки',
      'Держите грудь расправленной',
    ],
    commonMistakes: [
      'Округление спины',
      'Колени заваливаются внутрь',
      'Подъем на носки',
      'Неполная амплитуда',
    ],
    variations: [
      { name: 'Фронтальные приседания', difficulty: 'advanced' },
      { name: 'Приседания в машине Смита', difficulty: 'beginner' },
      { name: 'Приседания с гантелями', difficulty: 'beginner' },
    ],
  };

  const recommendedSets = {
    beginner: { sets: 3, reps: '8-10', rest: 120 },
    intermediate: { sets: 4, reps: '10-12', rest: 90 },
    advanced: { sets: 5, reps: '12-15', rest: 60 },
  };

  const difficultyColors = {
    beginner: 'success' as const,
    intermediate: 'warning' as const,
    advanced: 'error' as const,
  };

  const difficultyLabels = {
    beginner: 'Новичок',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };

  return (
    <HJScreen>
      {/* Header */}
      <HJSection>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-hj-cardSoft shadow-hj hover:shadow-hj-strong transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-hj-textMain" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-hj-textMain">{exercise.name}</h1>
            <p className="text-xs text-hj-textSoft">{exercise.category}</p>
          </div>
        </div>
      </HJSection>

      {/* Video/Image */}
      <HJSection>
        <div className="relative h-64 -mx-5 rounded-3xl overflow-hidden shadow-hj-strong">
          <Image
            src={exercise.image}
            alt={exercise.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-hj-strong hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-hj-primary ml-1" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <HJBadge variant={difficultyColors[exercise.difficulty]} size="sm">
              {difficultyLabels[exercise.difficulty]}
            </HJBadge>
          </div>
        </div>
      </HJSection>

      {/* Description */}
      <HJSection title="📖 Описание">
        <HJCard>
          <p className="text-sm text-hj-textMain leading-relaxed">
            {exercise.description}
          </p>
        </HJCard>
      </HJSection>

      {/* Equipment & Muscles */}
      <HJSection title="🏋️ Детали">
        <HJCard>
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold text-hj-textSoft mb-2">Оборудование</h4>
              <div className="flex flex-wrap gap-2">
                {exercise.equipment.map((item, index) => (
                  <HJBadge key={index} variant="neutral" size="sm">
                    {item}
                  </HJBadge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-hj-textSoft mb-2">Работающие мышцы</h4>
              <div className="flex flex-wrap gap-2">
                {exercise.muscleGroups.map((muscle, index) => (
                  <HJBadge key={index} variant="primary" size="sm">
                    {muscle}
                  </HJBadge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-hj-textSoft mb-2">Калории</h4>
              <p className="text-sm text-hj-textMain">
                ~{exercise.caloriesPerRep} ккал за повторение
              </p>
            </div>
          </div>
        </HJCard>
      </HJSection>

      {/* Recommended Sets */}
      <HJSection title="📊 Рекомендации">
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(recommendedSets).map(([level, data]) => (
            <HJCard 
              key={level}
              className={`text-center ${
                level === exercise.difficulty 
                  ? 'border-2 border-hj-primary bg-hj-primary/5' 
                  : ''
              }`}
            >
              <div className="text-xs font-semibold text-hj-textSoft mb-2 capitalize">
                {difficultyLabels[level as keyof typeof difficultyLabels]}
              </div>
              <div className="text-lg font-bold text-hj-primary">{data.sets}×{data.reps}</div>
              <div className="text-[10px] text-hj-textSoft mt-1">{data.rest}с отдых</div>
            </HJCard>
          ))}
        </div>
      </HJSection>

      {/* Tips */}
      <HJSection title="💡 Техника выполнения">
        <HJCard>
          <ul className="space-y-2">
            {exercise.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-sm text-hj-textMain flex-1">{tip}</span>
              </li>
            ))}
          </ul>
        </HJCard>
      </HJSection>

      {/* Common Mistakes */}
      <HJSection title="⚠️ Частые ошибки">
        <HJCard>
          <ul className="space-y-2">
            {exercise.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span className="text-sm text-hj-textMain flex-1">{mistake}</span>
              </li>
            ))}
          </ul>
        </HJCard>
      </HJSection>

      {/* Variations */}
      <HJSection title="🔄 Вариации">
        <div className="space-y-2">
          {exercise.variations.map((variation, index) => (
            <HJCard key={index} className="hover:shadow-hj-strong transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-hj-textMain">{variation.name}</h4>
                </div>
                <HJBadge 
                  variant={difficultyColors[variation.difficulty as keyof typeof difficultyColors]} 
                  size="sm"
                >
                  {difficultyLabels[variation.difficulty as keyof typeof difficultyLabels]}
                </HJBadge>
              </div>
            </HJCard>
          ))}
        </div>
      </HJSection>

      {/* Info Box */}
      <HJSection>
        <HJCard className="bg-blue-500/10 border-blue-500/30">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-hj-textMain mb-1">
                Совет профессионала
              </h4>
              <p className="text-xs text-hj-textSoft">
                Начинайте с малого веса, чтобы отработать технику. Правильная техника важнее большого веса!
              </p>
            </div>
          </div>
        </HJCard>
      </HJSection>

      <div className="h-20" /> {/* Spacer */}
    </HJScreen>
  );
}
