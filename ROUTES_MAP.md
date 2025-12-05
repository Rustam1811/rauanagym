# 🗺️ Hero Journey App - Полная карта роутов

## 📱 Структура приложения

### Главное навигационное меню (Bottom Tab Bar)

```
┌─────────────────────────────────────┐
│  🏠 Главная │ 💪 Тренировки │ 🏆 Арена │ 👤 Профиль │
└─────────────────────────────────────┘
```

---

## 📄 Все страницы приложения

### 1. **Главная страница** 🏠
**Роут:** `/hero/home`  
**Компоненты:** 
- Hero секция с приветствием и статусом
- Быстрая статистика (4 карточки)
- Быстрые действия (Начать тренировку, Программы, Арена)
- Челлендж дня
- CTA кнопки

**Фичи:**
- ✅ Уровень пользователя и XP
- ✅ Серия дней подряд
- ✅ Premium статус
- ✅ Статистика: калории, XP, серия, уровень
- ✅ Навигация к основным разделам

---

### 2. **Тренировки** 💪
**Роут:** `/hero/workouts`  
**Компоненты:**
- Поисковая строка
- Категории (Все, Сила, Кардио, Йога, HIIT)
- Статистика (тренировок/дней/успешных)
- Табы: Для тебя, Популярные, Новые
- Карточки тренировок (HJWorkoutCard)

**Фичи:**
- ✅ Поиск по названию
- ✅ Фильтр по категориям
- ✅ 3 таба с тренировками
- ✅ Difficulty badges
- ✅ Premium тренировки
- ✅ Статистика: длительность, калории, XP

---

### 3. **Программы** 📋
**Роут:** `/hero/programs`  
**Компоненты:**
- Активная программа (выделена)
- Прогресс бар активной программы
- Список доступных программ
- Кнопка "Создать свою программу"

**Фичи:**
- ✅ Активная программа с прогрессом
- ✅ Статистика программы (дни, тренировки, сложность)
- ✅ Difficulty badges
- ✅ Premium программы
- ✅ Прогресс выполнения

---

### 4. **Достижения** 🏆
**Роут:** `/hero/achievements`  
**Компоненты:**
- Общая статистика достижений
- Категории достижений
- Табы: Все, Разблокированные, В процессе
- Карточки достижений (HJAchievementCard)
- Премиум достижения

**Фичи:**
- ✅ Прогресс разблокировки
- ✅ Разблокированные/заблокированные состояния
- ✅ Награды (XP, значки)
- ✅ Категории: Тренировки, Серии, Сила, Цели, Особые
- ✅ Премиум достижения

---

### 5. **Статистика** 📊
**Роут:** `/hero/stats`  
**Компоненты:**
- Табы: Обзор, За всё время
- График активности за неделю
- Быстрая статистика
- Прогресс целей
- Рекорды
- Важные вехи

**Фичи:**
- ✅ Барчарт активности за неделю
- ✅ Прогресс целей (калории, тренировки, серия)
- ✅ Рекорды (макс калорий, серия, тренировок/неделю)
- ✅ Вехи (50, 100, 200 тренировок)
- ✅ All-time статистика

---

### 6. **Арена** ⚔️
**Роут:** `/hero/arena`  
**Компоненты:**
- Таблица лидеров (HJLeaderboardCard)
- Кланы/группы
- Челленджи
- Топ-3 с медалями

**Фичи:**
- ✅ Таблица лидеров
- ✅ Топ-3 с цветными медалями
- ✅ Изменение позиции (↑↓−)
- ✅ Подсветка текущего пользователя
- ✅ Кланы и группы

---

### 7. **Профиль** 👤
**Роут:** `/hero/profile`  
**Компоненты:**
- Аватар + информация
- Уровень и XP прогресс
- Статистика (тренировок, дни, достижения, XP)
- Последние достижения
- Настройки

**Фичи:**
- ✅ Редактирование профиля
- ✅ Premium статус
- ✅ Уровень и прогресс
- ✅ Статистика 2x2
- ✅ Последние достижения
- ✅ Выход из аккаунта

---

### 8. **Продвинутый пример** 🎨
**Роут:** `/hero/advanced`  
**Компоненты:**
- Демо всех компонентов
- Табы с контентом
- Workout cards
- Achievement cards
- Leaderboard cards
- Stats и progress bars

**Фичи:**
- ✅ Демонстрация 16+ компонентов
- ✅ Все типы теней
- ✅ Hover эффекты
- ✅ Transitions
- ✅ Glassmorphism

---

### 9. **Демо теней** ✨
**Роут:** `/hero/shadows-demo`  
**Компоненты:**
- Типы теней (shadow-hj, shadow-hj-strong, shadow-hj-inner)
- Кастомные фиолетовые тени
- Badges с тенями
- Скругления углов
- Glassmorphism эффекты
- Hover эффекты
- Цветные кнопки

**Фичи:**
- ✅ 10+ типов теней с примерами
- ✅ Glassmorphism (light, dark, purple)
- ✅ Hover + scale эффекты
- ✅ Rounded corners demo
- ✅ Цветные тени (зеленая, красная)

---

### 10. **Пример базовых компонентов** 📦
**Роут:** `/hero/hj-example`  
**Компоненты:**
- Базовые компоненты HJ
- Кнопки
- Карточки
- Секции
- Stat cards

**Фичи:**
- ✅ Демо базовых компонентов
- ✅ Кнопки (primary/secondary)
- ✅ Карточки с тенями
- ✅ Статистика

---

### 11. **Welcome / Onboarding** 🎉
**Роут:** `/hero/welcome`  
**Компоненты:**
- Экран приветствия
- Onboarding слайды
- Регистрация/вход

**Фичи:**
- ✅ Первый запуск
- ✅ Объяснение функций
- ✅ Начало путешествия

---

### 12. **Phone Login** 📱
**Роут:** `/hero/phone-login`  
**Компоненты:**
- Вход по номеру телефона
- Firebase Auth
- Верификация кода

**Фичи:**
- ✅ Аутентификация
- ✅ SMS код
- ✅ Безопасность

---

## 🗺️ Карта навигации

```
┌─────────────────────────────────────────────────┐
│                   /hero/home                     │
│                   (Главная) 🏠                    │
└──────────┬──────────────────────────────────────┘
           │
           ├─────► /hero/workouts (Тренировки) 💪
           │       └─► Workout Detail (будущее)
           │
           ├─────► /hero/programs (Программы) 📋
           │       └─► Program Detail (будущее)
           │
           ├─────► /hero/achievements (Достижения) 🏆
           │
           ├─────► /hero/stats (Статистика) 📊
           │
           ├─────► /hero/arena (Арена) ⚔️
           │       ├─► Clans
           │       └─► Challenges
           │
           ├─────► /hero/profile (Профиль) 👤
           │       ├─► Edit Profile
           │       └─► Settings
           │
           ├─────► /hero/advanced (Демо) 🎨
           │
           └─────► /hero/shadows-demo (Тени Демо) ✨
```

---

## 📊 Статистика страниц

| Категория | Кол-во страниц |
|-----------|----------------|
| Основные страницы | 7 |
| Демо/примеры | 3 |
| Auth страницы | 2 |
| **ВСЕГО** | **12** |

---

## 🎨 Использованные компоненты на каждой странице

### `/hero/home`
- ✅ HJScreen, HJSection, HJCard, HJButton, HJTabBar
- ✅ HJStatCard (x4)
- ✅ HJBadge (x2)

### `/hero/workouts`
- ✅ HJScreen, HJSection, HJCard, HJTabBar
- ✅ HJWorkoutCard (x5+)
- ✅ HJTabs (3 таба)
- ✅ Search input

### `/hero/programs`
- ✅ HJScreen, HJSection, HJCard, HJTabBar
- ✅ HJBadge, HJProgress
- ✅ Next.js Image
- ✅ Gradient overlays

### `/hero/achievements`
- ✅ HJScreen, HJSection, HJCard, HJTabBar
- ✅ HJAchievementCard (x6+)
- ✅ HJTabs (3 таба)
- ✅ HJProgress, HJBadge

### `/hero/stats`
- ✅ HJScreen, HJSection, HJCard, HJTabBar
- ✅ HJStatCard (x6)
- ✅ HJProgress (x3)
- ✅ HJTabs (2 таба)
- ✅ Custom bar chart

### `/hero/arena`
- ✅ HJScreen, HJSection, HJCard, HJTabBar
- ✅ HJLeaderboardCard (x10+)
- ✅ HJBadge, HJAvatar
- ✅ Топ-3 медали

### `/hero/profile`
- ✅ HJScreen, HJSection, HJCard, HJTabBar
- ✅ HJStatCard (x4)
- ✅ HJAchievementCard (x3)
- ✅ HJProgress, HJBadge
- ✅ Next.js Image

### `/hero/advanced`
- ✅ Все HJ компоненты (16+)
- ✅ Демонстрация всех фич

### `/hero/shadows-demo`
- ✅ Все типы теней
- ✅ Все эффекты
- ✅ 30+ примеров

---

## 🚀 Будущие страницы (Roadmap)

### Phase 2 ✅ COMPLETE
- [x] `/hero/workout/[id]` - Детальная страница тренировки
- [x] `/hero/program/[id]` - Детальная страница программы
- [x] `/hero/exercise/[id]` - Детальная страница упражнения
- [x] `/hero/session/active` - Активная тренировка
- [x] `/hero/session/complete` - Завершение тренировки

**Статус:** Все 5 страниц Phase 2 реализованы! См. `PHASE_2_COMPLETE.md` для деталей.

### Phase 3
- [ ] `/hero/social` - Социальная лента
- [ ] `/hero/friends` - Друзья
- [ ] `/hero/messages` - Сообщения
- [ ] `/hero/notifications` - Уведомления
- [ ] `/hero/settings` - Настройки

### Phase 4
- [ ] `/hero/premium` - Премиум подписка
- [ ] `/hero/shop` - Магазин
- [ ] `/hero/challenges` - Челленджи
- [ ] `/hero/coach` - AI тренер

---

## 🎯 Quick Links для тестирования

```
http://localhost:3000/hero/home              # Главная
http://localhost:3000/hero/workouts          # Тренировки
http://localhost:3000/hero/programs          # Программы
http://localhost:3000/hero/achievements      # Достижения
http://localhost:3000/hero/stats             # Статистика
http://localhost:3000/hero/arena             # Арена
http://localhost:3000/hero/profile           # Профиль
http://localhost:3000/hero/advanced          # Продвинутый демо
http://localhost:3000/hero/shadows-demo      # Демо теней
http://localhost:3000/hero/hj-example        # Базовые компоненты
```

---

## 📝 Conventions

### Naming
- Все роуты в lowercase с дефисами
- Страницы используют PascalCase (WorkoutsPage)
- Компоненты используют HJ prefix

### Structure
```
/hero/
  ├── home/page.tsx           # ✅ Created
  ├── workouts/page.tsx       # ✅ Created
  ├── programs/page.tsx       # ✅ Created
  ├── achievements/page.tsx   # ✅ Created
  ├── stats/page.tsx          # ✅ Created
  ├── arena/page.tsx          # ✅ Exists
  ├── profile/page.tsx        # ✅ Exists
  ├── advanced/page.tsx       # ✅ Created
  ├── shadows-demo/page.tsx   # ✅ Created
  ├── hj-example/page.tsx     # ✅ Exists
  ├── welcome/page.tsx        # ✅ Exists
  └── phone-login/page.tsx    # ✅ Exists
```

---

**📅 Последнее обновление:** 3 декабря 2024  
**✅ Статус:** 12 страниц готовы к использованию  
**🚀 Готовность:** Production-ready
