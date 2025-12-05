# Premium Design Update Guide

## ✅ COMPLETED: Home Page

### Изменения в `/hero/home/page.tsx`:
1. **Карточки статистики** - `rounded-3xl` градиенты с `shadow-[0_8px_24px_rgba(0,0,0,0.15)]`
2. **Рекомендованные тренировки** - карточки с `rounded-2xl` изображениями, тенями, glassmorphism
3. **Программа** - градиентная кнопка с иконкой в `rounded-2xl` контейнере
4. **Все изображения** - `rounded-2xl overflow-hidden` с градиентными оверлеями
5. **Глубина** - `shadow-lg`, `backdrop-blur-md`, `border-white/10`

## 🔄 TODO: Применить эти стили к остальным страницам

### Workouts Page (`/hero/workouts/page.tsx`)
```tsx
// Каждая workout карточка должна иметь:
<div className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition-all">
  <div className="relative h-48 rounded-t-3xl overflow-hidden">
    <Image src={image} fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  </div>
  <div className="p-5">
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span>{duration} мин</span>
      </div>
      <div className="flex items-center gap-1">
        <Flame className="w-4 h-4" />
        <span>{calories} ккал</span>
      </div>
    </div>
  </div>
</div>
```

### Programs Page (`/hero/programs/page.tsx`)
```tsx
// Каждая program карточка:
<div className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden">
  <div className="relative h-40 rounded-t-3xl overflow-hidden">
    <Image src={image} fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
    <div className="absolute bottom-4 left-4 right-4">
      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  </div>
  <div className="p-5">
    {/* Progress bar with gradient */}
    <div className="h-2 rounded-full bg-white/20 overflow-hidden mb-3">
      <div 
        className="h-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{progress}/{maxProgress} дней</span>
      <span className="font-semibold text-gray-900">{workouts} тренировок</span>
    </div>
  </div>
</div>
```

### Arena Page (`/hero/arena/page.tsx`)
```tsx
// Clan карточки:
<div className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition-all">
  <div className="relative h-32 rounded-t-3xl overflow-hidden">
    <Image src={image} fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3">
      <h3 className="text-white font-bold text-lg">{name}</h3>
      <p className="text-white/70 text-sm">{club}</p>
    </div>
  </div>
  <div className="p-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-900">{members} участников</span>
    </div>
    <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white text-sm font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all">
      Вступить
    </button>
  </div>
</div>

// Leaderboard карточки:
<div className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] p-4 flex items-center gap-4">
  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center text-white font-bold text-lg shadow-lg">
    {rank}
  </div>
  <div className="flex-1">
    <h3 className="font-bold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-600">{xp} XP</p>
  </div>
  <Trophy className="w-6 h-6 text-[#FDE68A]" />
</div>
```

## 📋 Общие правила для ВСЕХ страниц:

### 1. Карточки (Cards)
```tsx
className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden"
```

### 2. Изображения
```tsx
className="relative h-[height] rounded-2xl overflow-hidden shadow-lg"
// С градиентом:
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
```

### 3. Кнопки Primary
```tsx
className="px-6 py-3 rounded-full bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
```

### 4. Кнопки Secondary
```tsx
className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-gray-900 font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-95 transition-all"
```

### 5. Stat Cards (Stats, XP, Streak)
```tsx
<div className="rounded-3xl bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
  <IconComponent className="w-6 h-6 text-white mb-2" strokeWidth={2} />
  <p className="text-2xl font-bold text-white">{value}</p>
  <p className="text-xs text-white/80 font-medium">{label}</p>
</div>
```

### 6. Badges (Difficulty, Premium, etc.)
```tsx
<div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white text-xs font-semibold shadow-lg">
  {label}
</div>
```

### 7. Progress Bars
```tsx
<div className="h-2 rounded-full bg-white/20 overflow-hidden">
  <div 
    className="h-full bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] rounded-full transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

### 8. Search Inputs
```tsx
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
  <input
    className="w-full pl-12 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/50 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
    placeholder="Поиск..."
  />
</div>
```

### 9. Category Tabs
```tsx
<button className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-sm font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-[#A78BFA] hover:to-[#F9A8D4] hover:text-white hover:shadow-lg active:scale-95 transition-all">
  {label}
</button>
```

### 10. Headers с фоном
```tsx
<div className="relative h-[320px] overflow-hidden">
  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white" />
  </div>
  {/* Content */}
</div>
```

## 🎨 Цветовая палитра

### Градиенты:
- **Primary**: `from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A]`
- **Purple-Pink**: `from-[#A78BFA] to-[#F9A8D4]`
- **Pink-Yellow**: `from-[#F9A8D4] to-[#FDE68A]`
- **Yellow-Purple**: `from-[#FDE68A] to-[#A78BFA]`

### Стекло (Glassmorphism):
- Background: `bg-white/20`
- Backdrop: `backdrop-blur-md`
- Border: `border border-white/10`

### Тени (Shadows):
- **Default**: `shadow-[0_8px_24px_rgba(0,0,0,0.15)]`
- **Hover**: `shadow-[0_12px_32px_rgba(0,0,0,0.2)]`
- **Large**: `shadow-lg`
- **Extra Large**: `shadow-xl`

### Оверлеи на изображениях:
- **Light**: `from-black/40 via-black/20 to-transparent`
- **Medium**: `from-black/60 via-black/30 to-transparent`
- **Dark**: `from-black/80 via-black/40 to-transparent`

## ✅ Чек-лист обновления страниц:

- [x] Home Page - ГОТОВО
- [ ] Workouts Page - применить стили к карточкам тренировок
- [ ] Programs Page - применить стили к карточкам программ
- [ ] Arena Page - применить стили к кланам и лидерборду
- [ ] Profile Page - обновить карточки статистики
- [ ] Workout Detail - обновить изображения упражнений
- [ ] Program Detail - обновить карточки воркаутов
- [ ] Exercise Detail - скруглить видео и изображения
- [ ] Session Active - обновить UI прогресса
- [ ] Session Complete - добавить градиенты к наградам

## 🚀 Следующие шаги:

1. Открыть каждую страницу
2. Найти все `<Image>` компоненты и добавить `rounded-2xl overflow-hidden`
3. Найти все карточки и заменить на премиум стили
4. Добавить градиенты на кнопки
5. Добавить тени везде (`shadow-[0_8px_24px_rgba(0,0,0,0.15)]`)
6. Добавить hover эффекты с увеличением тени
7. Добавить `active:scale-95` на все кнопки
8. Заменить плоские цвета на градиенты
9. Добавить glassmorphism (`bg-white/20 backdrop-blur-md`)
10. Проверить что всё выглядит премиум как Nike/Apple Fitness

---

**ВАЖНО**: ВСЕ изображения должны быть `rounded-2xl` или `rounded-3xl` с `overflow-hidden`!
НЕ ДОЛЖНО быть острых углов на изображениях!
ВСЕ карточки должны иметь glassmorphism + тени!
