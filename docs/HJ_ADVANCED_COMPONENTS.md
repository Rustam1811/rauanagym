# Hero Journey Design System - Advanced Components

## 🚀 Продвинутые компоненты

### HJModal
Модальное окно с backdrop blur и анимациями.

```tsx
import { HJModal, HJConfirmModal } from '@/components/ui/hj';

// Базовое модальное окно
<HJModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Настройки"
  size="md"
  footer={
    <div className="flex gap-2">
      <HJButton label="Отмена" variant="secondary" onClick={onClose} />
      <HJButton label="Сохранить" onClick={onSave} />
    </div>
  }
>
  <p>Контент модального окна</p>
</HJModal>

// Confirm Dialog
<HJConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  title="Удалить тренировку?"
  message="Это действие нельзя отменить"
  confirmLabel="Удалить"
  cancelLabel="Отмена"
/>
```

---

### HJInput
Стилизованный инпут с поддержкой иконок, ошибок и helper text.

```tsx
import { HJInput } from '@/components/ui/hj';
import { Mail, Eye } from 'lucide-react';

<HJInput
  label="Email"
  type="email"
  placeholder="your@email.com"
  leftIcon={<Mail className="w-4 h-4" />}
  error={errors.email}
  helperText="Мы не передаем email третьим лицам"
/>

<HJInput
  label="Пароль"
  type="password"
  rightIcon={<Eye className="w-4 h-4" />}
  error={errors.password}
/>
```

**С useHJForm:**
```tsx
import { useHJForm } from '@/hooks/useHJForm';

const form = useHJForm({
  email: {
    initialValue: '',
    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  password: {
    initialValue: '',
    validation: {
      required: true,
      minLength: 8,
    },
  },
});

<HJInput
  label="Email"
  value={form.values.email}
  onChange={(e) => form.handleChange('email', e.target.value)}
  onBlur={() => form.handleBlur('email')}
  error={form.errors.email}
/>
```

---

### HJBadge
Бейджи для статусов, категорий, уведомлений.

```tsx
import { HJBadge } from '@/components/ui/hj';

<HJBadge variant="primary" size="md">Новое</HJBadge>
<HJBadge variant="success">Завершено</HJBadge>
<HJBadge variant="warning">В процессе</HJBadge>
<HJBadge variant="error">Отменено</HJBadge>
<HJBadge variant="info" size="sm">Beta</HJBadge>
```

**Варианты:** `primary` | `success` | `warning` | `error` | `info` | `neutral`  
**Размеры:** `sm` | `md` | `lg`

---

### HJProgress
Прогресс бар с процентами и вариантами цветов.

```tsx
import { HJProgress } from '@/components/ui/hj';

<HJProgress
  value={75}
  max={100}
  label="Прогресс тренировки"
  showPercentage
  variant="primary"
  size="md"
/>

// С динамическим цветом
<HJProgress
  value={calories}
  max={targetCalories}
  variant={calories >= targetCalories ? 'success' : 'warning'}
  showPercentage
/>
```

---

### HJSkeleton
Skeleton loaders для состояния загрузки.

```tsx
import { HJSkeleton, HJCardSkeleton, HJStatCardSkeleton } from '@/components/ui/hj';

// Базовые скелетоны
<HJSkeleton variant="text" width="60%" />
<HJSkeleton variant="circular" width="40px" height="40px" />
<HJSkeleton variant="rectangular" height="200px" />

// Готовые композиции
<HJCardSkeleton />
<HJStatCardSkeleton />

// Сетка скелетонов
<div className="grid grid-cols-2 gap-3">
  <HJStatCardSkeleton />
  <HJStatCardSkeleton />
</div>
```

---

### HJToast
Уведомления с автоматическим скрытием.

```tsx
import { useHJToast } from '@/contexts/HJToastProvider';

function MyComponent() {
  const toast = useHJToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast.success('Данные сохранены!');
    } catch (error) {
      toast.error('Ошибка при сохранении');
    }
  };

  return (
    <HJButton label="Сохранить" onClick={handleSave} />
  );
}
```

**Методы:**
- `toast.success(message, duration?)` - Успех
- `toast.error(message, duration?)` - Ошибка
- `toast.warning(message, duration?)` - Предупреждение
- `toast.info(message, duration?)` - Информация

**Setup в layout.tsx:**
```tsx
import { HJToastProvider } from '@/contexts/HJToastProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <HJToastProvider>
          {children}
        </HJToastProvider>
      </body>
    </html>
  );
}
```

---

### HJTabs
Табы с анимированным переключением.

```tsx
import { HJTabs } from '@/components/ui/hj';
import { Home, User, Settings } from 'lucide-react';

const tabs = [
  {
    id: 'overview',
    label: 'Обзор',
    icon: <Home className="w-4 h-4" />,
    content: <OverviewContent />,
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: <User className="w-4 h-4" />,
    content: <ProfileContent />,
  },
];

<HJTabs
  tabs={tabs}
  defaultTab="overview"
  onChange={(tabId) => console.log('Selected:', tabId)}
/>
```

---

### HJBottomSheet
Модальное окно снизу (mobile-first).

```tsx
import { HJBottomSheet } from '@/components/ui/hj';

<HJBottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Выберите действие"
>
  <div className="space-y-3">
    <HJButton label="Редактировать" />
    <HJButton label="Удалить" variant="secondary" />
  </div>
</HJBottomSheet>
```

---

### HJEmptyState
Компонент для пустых состояний.

```tsx
import { HJEmptyState } from '@/components/ui/hj';
import { Dumbbell } from 'lucide-react';

<HJEmptyState
  icon={<Dumbbell className="w-8 h-8" />}
  title="Нет активных тренировок"
  description="Начните свою первую тренировку прямо сейчас"
  actionLabel="Начать тренировку"
  onAction={() => router.push('/workouts')}
/>
```

---

### HJWorkoutCard
Карточка тренировки с изображением, статистикой и кнопкой.

```tsx
import { HJWorkoutCard } from '@/components/ui/hj';

<HJWorkoutCard
  title="Full Body Workout"
  description="Комплексная тренировка на все группы мышц"
  duration={45}
  calories={350}
  difficulty="intermediate"
  image="/images/workout-1.jpg"
  isPremium
  onStart={() => startWorkout()}
/>
```

**Props:**
- `difficulty`: `'beginner'` | `'intermediate'` | `'advanced'`
- `isPremium`: boolean - Показать бейдж PRO
- `onStart`: Callback для кнопки "Начать"

---

### HJAchievementCard
Карточка достижения с прогрессом.

```tsx
import { HJAchievementCard } from '@/components/ui/hj';
import { Trophy } from 'lucide-react';

<HJAchievementCard
  title="Первые 10 тренировок"
  description="Завершите 10 тренировок подряд"
  icon={<Trophy className="w-7 h-7" />}
  progress={7}
  maxProgress={10}
  reward="100 XP + Значок"
  isUnlocked={false}
/>

// Разблокированное достижение
<HJAchievementCard
  title="Чемпион недели"
  description="Тренировались 7 дней подряд"
  progress={7}
  maxProgress={7}
  reward="500 XP"
  isUnlocked
/>
```

---

### HJLeaderboardCard
Карточка для таблицы лидеров.

```tsx
import { HJLeaderboardCard } from '@/components/ui/hj';

const users = [
  {
    id: '1',
    name: 'Иван Петров',
    avatar: '/avatars/1.jpg',
    score: 15420,
    rank: 1,
    change: 2, // Поднялся на 2 позиции
  },
  // ...
];

{users.map((user) => (
  <HJLeaderboardCard
    key={user.id}
    user={user}
    isCurrentUser={user.id === currentUserId}
    showRankChange
  />
))}
```

**Features:**
- Топ-3 с золотыми/серебряными/бронзовыми бейджами
- Индикатор изменения позиции (↑↓)
- Подсветка текущего пользователя

---

## 🎣 Продвинутые хуки

### useHJAnimation
Анимация появления при скролле.

```tsx
import { useHJAnimation } from '@/hooks/useHJAnimation';

function MyComponent() {
  const { ref, isVisible } = useHJAnimation({
    threshold: 0.2,
    delay: 100,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      Content
    </div>
  );
}
```

### useHJStaggerAnimation
Последовательная анимация списка.

```tsx
import { useHJStaggerAnimation } from '@/hooks/useHJAnimation';

function WorkoutList({ workouts }) {
  const { ref, visibleItems } = useHJStaggerAnimation(workouts.length, 100);

  return (
    <div ref={ref}>
      {workouts.map((workout, index) => (
        <div
          key={workout.id}
          className={`transition-all duration-500 ${
            visibleItems.includes(index)
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-4'
          }`}
        >
          <HJWorkoutCard {...workout} />
        </div>
      ))}
    </div>
  );
}
```

### useHJForm
Управление формами с валидацией.

```tsx
import { useHJForm } from '@/hooks/useHJForm';
import { HJInput, HJButton } from '@/components/ui/hj';

function LoginForm() {
  const form = useHJForm({
    email: {
      initialValue: '',
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
    password: {
      initialValue: '',
      validation: {
        required: true,
        minLength: 8,
        custom: (value) => {
          if (!/[A-Z]/.test(value)) {
            return 'Нужна хотя бы одна заглавная буква';
          }
        },
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validate()) {
      console.log('Form values:', form.values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <HJInput
        label="Email"
        type="email"
        value={form.values.email}
        onChange={(e) => form.handleChange('email', e.target.value)}
        onBlur={() => form.handleBlur('email')}
        error={form.errors.email}
      />

      <HJInput
        label="Пароль"
        type="password"
        value={form.values.password}
        onChange={(e) => form.handleChange('password', e.target.value)}
        onBlur={() => form.handleBlur('password')}
        error={form.errors.password}
      />

      <HJButton label="Войти" type="submit" />
    </form>
  );
}
```

---

## 🎨 Готовые паттерны

### Loading State с Skeleton
```tsx
import { HJCardSkeleton } from '@/components/ui/hj';

{isLoading ? (
  <div className="space-y-4">
    <HJCardSkeleton />
    <HJCardSkeleton />
  </div>
) : (
  workouts.map((workout) => <HJWorkoutCard key={workout.id} {...workout} />)
)}
```

### Empty State с действием
```tsx
{workouts.length === 0 ? (
  <HJEmptyState
    icon={<Dumbbell className="w-8 h-8" />}
    title="Нет тренировок"
    description="Добавьте свою первую тренировку"
    actionLabel="Добавить тренировку"
    onAction={() => setShowModal(true)}
  />
) : (
  <WorkoutList workouts={workouts} />
)}
```

### Confirm Dialog
```tsx
const [showDelete, setShowDelete] = useState(false);
const toast = useHJToast();

const handleDelete = async () => {
  try {
    await deleteWorkout(id);
    toast.success('Тренировка удалена');
  } catch (error) {
    toast.error('Ошибка при удалении');
  }
};

<HJConfirmModal
  isOpen={showDelete}
  onClose={() => setShowDelete(false)}
  onConfirm={handleDelete}
  title="Удалить тренировку?"
  message="Это действие нельзя отменить"
/>
```

### Табы с контентом
```tsx
const tabs = [
  {
    id: 'active',
    label: 'Активные',
    content: <ActiveWorkouts />,
  },
  {
    id: 'completed',
    label: 'Завершенные',
    content: <CompletedWorkouts />,
  },
];

<HJTabs tabs={tabs} defaultTab="active" />
```

---

## 🚀 Production Tips

1. **Оптимизация изображений**
```tsx
<HJWorkoutCard
  image="/images/workout.jpg"
  // Next.js автоматически оптимизирует через next/image
/>
```

2. **Lazy Loading для модалов**
```tsx
import dynamic from 'next/dynamic';

const HJModal = dynamic(() =>
  import('@/components/ui/hj').then((mod) => mod.HJModal)
);
```

3. **Мемоизация списков**
```tsx
const workoutCards = useMemo(
  () => workouts.map((w) => <HJWorkoutCard key={w.id} {...w} />),
  [workouts]
);
```

4. **Debounce для input**
```tsx
import { useDebouncedCallback } from 'use-debounce';

const handleSearch = useDebouncedCallback((value) => {
  setSearchQuery(value);
}, 300);

<HJInput
  placeholder="Поиск..."
  onChange={(e) => handleSearch(e.target.value)}
/>
```

---

**🎉 Теперь у вас полный набор продвинутых компонентов для Hero Journey!**
