# 🎨 Hero Journey Design System

> **Production-Ready Design System для Next.js 14+ фитнес приложения**

Enterprise-уровень дизайн система с 20+ компонентами, 3 кастомными хуками, полной TypeScript поддержкой и готовыми паттернами.

---

## 🚀 Quick Start

### 1. Импорт компонентов

```tsx
import {
  HJScreen,
  HJCard,
  HJButton,
  HJSection,
  HJTabBar,
  HJWorkoutCard,
} from '@/components/ui/hj';
```

### 2. Базовая страница

```tsx
export default function MyPage() {
  return (
    <>
      <HJScreen>
        <HJSection title="Welcome">
          <HJCard>
            <p className="text-hj-textMain">Hello World!</p>
            <HJButton label="Get Started" />
          </HJCard>
        </HJSection>
      </HJScreen>
      <HJTabBar />
    </>
  );
}
```

### 3. Setup Toast Provider (в app/layout.tsx)

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

## 📦 Компоненты (20+)

### 🎯 Layout Components
- **HJScreen** - Полноэкранная обертка с градиентом
- **HJSection** - Секция с опциональным заголовком
- **HJTabBar** - Нижняя навигация

### 🎨 Basic Components
- **HJCard** - Glassmorphic карточка
- **HJButton** - Primary/Secondary кнопки
- **HJAvatar** - Аватар с градиентной рамкой
- **HJStatCard** - Карточка со статистикой

### 🔥 Advanced Components
- **HJModal** / **HJConfirmModal** - Модальные окна
- **HJInput** - Стилизованный input с валидацией
- **HJBadge** - Бейджи (6 вариантов)
- **HJProgress** - Прогресс бар
- **HJSkeleton** - Loading состояния
- **HJToast** - Уведомления (4 типа)
- **HJTabs** - Табы с контентом
- **HJBottomSheet** - Bottom sheet для mobile
- **HJEmptyState** - Пустые состояния

### 🎮 Composite Components
- **HJWorkoutCard** - Карточка тренировки
- **HJAchievementCard** - Карточка достижения
- **HJLeaderboardCard** - Карточка лидерборда

---

## 🎣 Hooks (3)

### useHJAnimation
```tsx
const { ref, isVisible } = useHJAnimation({ threshold: 0.2, delay: 100 });
```

### useHJStaggerAnimation
```tsx
const { ref, visibleItems } = useHJStaggerAnimation(items.length, 150);
```

### useHJForm
```tsx
const form = useHJForm({
  email: {
    initialValue: '',
    validation: { required: true, pattern: /email-regex/ }
  }
});
```

---

## 🎨 Design Tokens

### Colors (Tailwind)
```
bg-hj-primary        #7C3AED
bg-hj-primarySoft    #A855F7
bg-hj-card           #FFFFFF
bg-hj-cardSoft       #F1F2F7
text-hj-textMain     #111827
text-hj-textSoft     #6B7280
```

### Shadows
```
shadow-hj            Базовая тень
shadow-hj-strong     Сильная тень
shadow-hj-inner      Внутренняя подсветка
```

### Border Radius
```
rounded-3xl          28px
rounded-4xl          36px
```

---

## 📚 Примеры использования

### Form с валидацией
```tsx
'use client';

import { useHJForm } from '@/hooks/useHJForm';
import { HJInput, HJButton } from '@/components/ui/hj';
import { useHJToast } from '@/contexts/HJToastProvider';

export function LoginForm() {
  const toast = useHJToast();
  
  const form = useHJForm({
    email: {
      initialValue: '',
      validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    },
    password: {
      initialValue: '',
      validation: { required: true, minLength: 8 },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validate()) return;

    try {
      await login(form.values);
      toast.success('Welcome!');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <HJInput
        label="Email"
        value={form.values.email}
        onChange={(e) => form.handleChange('email', e.target.value)}
        onBlur={() => form.handleBlur('email')}
        error={form.errors.email}
      />
      <HJButton label="Login" type="submit" />
    </form>
  );
}
```

### Список с анимацией
```tsx
'use client';

import { useHJStaggerAnimation } from '@/hooks/useHJAnimation';
import { HJWorkoutCard } from '@/components/ui/hj';

export function WorkoutList({ workouts }) {
  const { ref, visibleItems } = useHJStaggerAnimation(workouts.length, 150);

  return (
    <div ref={ref} className="space-y-3">
      {workouts.map((workout, i) => (
        <div
          key={workout.id}
          className={`transition-all duration-500 ${
            visibleItems.includes(i)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <HJWorkoutCard {...workout} />
        </div>
      ))}
    </div>
  );
}
```

### Modal с подтверждением
```tsx
const [showConfirm, setShowConfirm] = useState(false);
const toast = useHJToast();

<HJConfirmModal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={async () => {
    await deleteItem();
    toast.success('Deleted!');
  }}
  title="Delete item?"
  message="This action cannot be undone"
/>
```

---

## 📖 Документация

### Базовая документация
- **[HERO_JOURNEY_DESIGN_SYSTEM.md](./docs/HERO_JOURNEY_DESIGN_SYSTEM.md)** - Полное руководство
- **[HJ_QUICK_REFERENCE.md](./docs/HJ_QUICK_REFERENCE.md)** - Быстрая справка

### Продвинутая документация
- **[HJ_ADVANCED_COMPONENTS.md](./docs/HJ_ADVANCED_COMPONENTS.md)** - Все продвинутые компоненты
- **[SENIOR_IMPLEMENTATION_COMPLETE.md](./SENIOR_IMPLEMENTATION_COMPLETE.md)** - Senior-level гайд

---

## 🎯 Demo Pages

### Просмотр примеров:
- `/hero/hj-example` - Базовый пример
- `/hero/advanced` - Продвинутые компоненты

---

## 🔧 Технологии

- **Next.js 14+** - App Router
- **TypeScript** - Strict mode
- **Tailwind CSS** - Mobile-first
- **Lucide React** - Icons
- **React Hooks** - Custom hooks

---

## 🎨 Features

✅ **20+ компонентов** - Полный набор UI элементов  
✅ **3 custom hooks** - Анимации, формы, валидация  
✅ **TypeScript** - Полная типизация  
✅ **Mobile-first** - Responsive дизайн  
✅ **Dark mode ready** - Поддержка темной темы  
✅ **Glassmorphism** - Современный дизайн  
✅ **Animations** - Плавные переходы  
✅ **Production ready** - Готово для продакшена  

---

## 🚀 Best Practices

### 1. Используйте HJScreen для всех страниц
```tsx
<HJScreen>
  {/* Your content */}
</HJScreen>
```

### 2. Всегда добавляйте HJTabBar внизу
```tsx
<>
  <HJScreen>{/* content */}</HJScreen>
  <HJTabBar />
</>
```

### 3. Используйте design tokens
```tsx
import { designTokens } from '@/lib/design-tokens';
```

### 4. Группируйте импорты
```tsx
import {
  HJScreen,
  HJCard,
  HJButton,
  // ...
} from '@/components/ui/hj';
```

---

## 🎯 Готовые паттерны

### Loading State
```tsx
{isLoading ? <HJCardSkeleton /> : <YourContent />}
```

### Empty State
```tsx
{items.length === 0 ? (
  <HJEmptyState
    icon={<Icon />}
    title="No items"
    actionLabel="Add item"
    onAction={handleAdd}
  />
) : (
  <ItemList items={items} />
)}
```

### Toast Notifications
```tsx
const toast = useHJToast();

toast.success('Success!');
toast.error('Error!');
toast.warning('Warning!');
toast.info('Info!');
```

---

## 📂 Структура файлов

```
src/
├── components/
│   ├── HJButton.tsx
│   ├── HJCard.tsx
│   ├── HJSection.tsx
│   ├── StatCard.tsx
│   └── ui/
│       ├── HJScreen.tsx
│       ├── HJTabBar.tsx
│       ├── HJAvatar.tsx
│       └── hj/
│           ├── index.ts          # Barrel export
│           ├── HJModal.tsx
│           ├── HJInput.tsx
│           ├── HJBadge.tsx
│           ├── HJProgress.tsx
│           ├── HJSkeleton.tsx
│           ├── HJToast.tsx
│           ├── HJTabs.tsx
│           ├── HJBottomSheet.tsx
│           ├── HJEmptyState.tsx
│           ├── HJWorkoutCard.tsx
│           ├── HJAchievementCard.tsx
│           └── HJLeaderboardCard.tsx
├── contexts/
│   └── HJToastProvider.tsx
├── hooks/
│   ├── useHJAnimation.ts
│   └── useHJForm.ts
└── lib/
    └── design-tokens.ts
```

---

## 🔥 For Copilot

Теперь GitHub Copilot понимает дизайн систему. Просто скажите:

> "Создай страницу профиля используя HJ компоненты"

> "Добавь форму с валидацией через useHJForm"

> "Создай список с HJWorkoutCard и анимацией"

---

## 💡 Tips

1. **Lazy Loading** для модалов
```tsx
const HJModal = dynamic(() => import('@/components/ui/hj').then(m => m.HJModal));
```

2. **Memoization** для списков
```tsx
const cards = useMemo(() => items.map(i => <HJCard key={i.id} {...i} />), [items]);
```

3. **Debounce** для input
```tsx
const handleSearch = useDebouncedCallback((value) => setQuery(value), 300);
```

---

## 📊 Stats

- **Components**: 20+
- **Custom Hooks**: 3
- **Lines of Documentation**: 4000+
- **Code Examples**: 50+
- **Production Patterns**: 15+

---

## 🎉 Успехов!

**Hero Journey Design System готов для production. Создавайте крутые фитнес приложения! 💪**

---

## 📞 Support

Для вопросов и предложений:
- Читайте документацию в `/docs`
- Смотрите примеры в `/hero/hj-example` и `/hero/advanced`
- Используйте GitHub Copilot для генерации кода

---

**Built with ❤️ for Hero Journey Fitness App**
