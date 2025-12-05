/**
 * Beautiful Empty State Components
 * Encourages user action instead of showing blank screens
 */

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Calendar, 
  Award, 
  Users, 
  Search, 
  Zap,
  Heart,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  illustration?: 'workout' | 'program' | 'achievement' | 'social' | 'search';
}

const illustrations = {
  workout: Dumbbell,
  program: Calendar,
  achievement: Award,
  social: Users,
  search: Search,
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  illustration,
}: EmptyStateProps) {
  const Icon = illustration ? illustrations[illustration] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shadow-lg">
          {icon || (Icon && <Icon className="w-12 h-12 text-purple-600" strokeWidth={1.5} />)}
        </div>
        
        {/* Decorative circles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-purple-200"
        />
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>

      {/* Action Button */}
      {(actionLabel && (actionHref || onAction)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {actionHref ? (
            <Link href={actionHref}>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all">
                {actionLabel}
              </button>
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              {actionLabel}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Preset Empty States
export function NoWorkoutsEmpty() {
  return (
    <EmptyState
      illustration="workout"
      title="Нет доступных тренировок"
      description="Начни свой путь к здоровью с первой тренировки! Мы подобрали программы специально для тебя."
      actionLabel="Выбрать программу"
      actionHref="/hero/programs"
    />
  );
}

export function NoProgramsEmpty() {
  return (
    <EmptyState
      illustration="program"
      title="Программы не найдены"
      description="Скоро здесь появятся персональные программы тренировок для достижения твоих целей."
      actionLabel="Создать программу"
      actionHref="/hero/programs/new"
    />
  );
}

export function NoAchievementsEmpty() {
  return (
    <EmptyState
      illustration="achievement"
      title="Ещё нет достижений"
      description="Начни тренироваться, чтобы открывать новые достижения и получать награды!"
      actionLabel="Начать тренировку"
      actionHref="/hero/workouts"
    />
  );
}

export function NoSearchResultsEmpty() {
  return (
    <EmptyState
      illustration="search"
      title="Ничего не найдено"
      description="Попробуй изменить параметры поиска или выбери другую категорию."
    />
  );
}

export function NoFriendsEmpty() {
  return (
    <EmptyState
      illustration="social"
      title="Нет друзей"
      description="Добавь друзей, чтобы соревноваться и мотивировать друг друга!"
      actionLabel="Найти друзей"
      actionHref="/hero/friends"
    />
  );
}

// Animated motivation cards
export function MotivationCard({ type }: { type: 'start' | 'continue' | 'comeback' }) {
  const content = {
    start: {
      icon: Zap,
      title: 'Начни прямо сейчас!',
      description: 'Первый шаг - самый важный. Выбери тренировку и начни менять свою жизнь.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    continue: {
      icon: Heart,
      title: 'Продолжай в том же духе!',
      description: 'Ты на правильном пути. Каждая тренировка приближает тебя к цели.',
      gradient: 'from-pink-500 to-rose-500',
    },
    comeback: {
      icon: Target,
      title: 'Рады видеть снова!',
      description: 'Не важно, сколько времени прошло. Важно, что ты вернулся. Давай начнём!',
      gradient: 'from-purple-500 to-indigo-500',
    },
  };

  const { icon: Icon, title, description, gradient } = content[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 text-white shadow-2xl`}
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12" />

      {/* Content */}
      <div className="relative">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
