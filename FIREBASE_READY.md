# 🔥 Firebase Integration - Quick Start

## ✅ Что уже сделано

### 1. Firebase Модули (100% готово)
Созданы профессиональные модули для работы с Firebase:

- ✅ **`src/lib/firebase/users.ts`** - Управление пользователями
  - Создание/обновление профиля
  - Система XP и уровней
  - Streak tracking
  - Таблица лидеров
  
- ✅ **`src/lib/firebase/workouts.ts`** - Управление тренировками
  - Получение по категориям
  - Фильтрация по сложности
  - Популярные тренировки
  - Поиск
  
- ✅ **`src/lib/firebase/exercises.ts`** - Библиотека упражнений
  - Фильтрация по мышцам
  - Фильтрация по оборудованию
  - Расчет калорий
  
- ✅ **`src/lib/firebase/programs.ts`** - Программы тренировок
  - Рекомендации по целям
  - Premium/Free фильтры
  - Прогресс программ
  
- ✅ **`src/lib/firebase/sessions.ts`** - Активные сессии
  - Создание сессии
  - Отслеживание прогресса
  - Завершение с начислением XP
  - История тренировок

### 2. TypeScript типы обновлены
- ✅ Расширенный `User` интерфейс с gamification полями
- ✅ Обновленный `Session` с duration и calories
- ✅ Поддержка Firestore Timestamps

### 3. Seed скрипт готов
- ✅ `scripts/seed-firebase.mts` - заполнение тестовыми данными
- ✅ 6 упражнений
- ✅ 3 тренировки
- ✅ 2 программы

---

## 🚀 Что делать дальше (3 простых шага)

### Шаг 1: Проверить Firebase Config (5 мин)

```bash
# Откройте .env.local и убедитесь что все переменные заполнены
code .env.local
```

Если нужно получить config:
- Откройте: https://console.firebase.google.com/project/rauanagym/settings/general
- См. подробности в `SETUP_RU.md`

### Шаг 2: Включить Firebase сервисы (10 мин)

1. **Authentication** (SMS + Email):
   - https://console.firebase.google.com/project/rauanagym/authentication/providers
   - Enable "Email/Password"
   - Enable "Phone" (потребует настройки)

2. **Firestore Database**:
   - https://console.firebase.google.com/project/rauanagym/firestore
   - Создайте database в "test mode"
   - Регион: europe-west

3. **Storage**:
   - https://console.firebase.google.com/project/rauanagym/storage
   - Enable Storage

### Шаг 3: Залить тестовые данные (2 мин)

```bash
# Установить зависимости (если еще не установлены)
npm install

# Запустить seed скрипт
npm run seed-firebase
```

Это создаст:
- 6 упражнений (грудь, спина, ноги, кардио)
- 3 тренировки (верх тела, ноги, HIIT)
- 2 программы (силовая для начинающих, кардио-блиц)

---

## 📝 Как использовать модули

### Пример 1: Загрузка тренировок

```typescript
import { getAllWorkouts, getWorkoutsByCategory } from '@/lib/firebase';

// Все тренировки
const workouts = await getAllWorkouts();

// По категории
const strengthWorkouts = await getWorkoutsByCategory('strength');
```

### Пример 2: Начало тренировки

```typescript
import { createSession, completeSession } from '@/lib/firebase';

// Создать сессию
const sessionId = await createSession(userId, workoutId);

// Завершить с начислением XP
const result = await completeSession(sessionId, {
  userId,
  workoutId,
  workoutName: 'Силовая тренировка',
  duration: 45,
  caloriesBurned: 380,
  xpEarned: 150,
  completedExercises: ['ex1', 'ex2', 'ex3'],
});

console.log(`Level ${result.newLevel}, XP: ${result.xpEarned}`);
if (result.leveledUp) {
  console.log('🎉 Level Up!');
}
```

### Пример 3: Работа с пользователем

```typescript
import { getUserProfile, addXP, updateStreak } from '@/lib/firebase';

// Получить профиль
const profile = await getUserProfile(userId);

// Добавить XP
const { newLevel, leveledUp } = await addXP(userId, 150);

// Обновить streak
const { currentStreak, isNewRecord } = await updateStreak(userId);
```

---

## 🔄 Интеграция в страницы

### Обновление существующих страниц

Нужно заменить mock данные на реальные Firebase запросы в:

1. ✅ `/hero/workouts/page.tsx` - заменить mock на `getAllWorkouts()`
2. ✅ `/hero/programs/page.tsx` - заменить mock на `getAllPrograms()`
3. ✅ `/hero/workout/[id]/page.tsx` - заменить mock на `getWorkoutById(id)`
4. ✅ `/hero/session/active/page.tsx` - добавить `updateSessionProgress()`
5. ✅ `/hero/session/complete/page.tsx` - добавить `completeSession()`
6. ✅ `/hero/profile/page.tsx` - заменить mock на `getUserProfile()`
7. ✅ `/hero/arena/page.tsx` - заменить mock на `getLeaderboard()`
8. ✅ `/hero/stats/page.tsx` - добавить `getUserWorkoutHistory()`

### Шаблон замены

**Было (mock):**
```typescript
const workouts = [
  { id: '1', name: 'Workout 1', ... },
  { id: '2', name: 'Workout 2', ... },
];
```

**Стало (Firebase):**
```typescript
import { getAllWorkouts } from '@/lib/firebase';

const [workouts, setWorkouts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadWorkouts = async () => {
    try {
      const data = await getAllWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  loadWorkouts();
}, []);
```

---

## 🛡️ Security Rules

После тестирования, deploy production rules:

```bash
# Установить Firebase CLI
npm install -g firebase-tools

# Логин
firebase login

# Deploy правила
firebase deploy --only firestore:rules,storage:rules
```

Затем назначьте первого админа (см. `SET_ADMIN_GUIDE.md`).

---

## 📊 Следующие шаги

### Неделя 1: Базовая интеграция
- [ ] Обновить страницу workouts
- [ ] Обновить страницу programs
- [ ] Обновить страницу profile
- [ ] Обновить arena (leaderboard)

### Неделя 2: Sessions & Stats
- [ ] Интегрировать active session
- [ ] Интегрировать completion page
- [ ] Добавить history на stats странице
- [ ] Добавить real-time updates

### Неделя 3: Polish
- [ ] Loading states везде
- [ ] Error handling
- [ ] Оптимизация запросов
- [ ] Кэширование

---

## 🐛 Troubleshooting

### "Permission denied"
**Решение:** В test mode все разрешено. Если используете production rules - проверьте authentication.

### "Collection not found"
**Решение:** Запустите `npm run seed-firebase` для создания коллекций.

### "API key not valid"
**Решение:** Обновите `.env.local` реальными значениями из Firebase Console.

---

## 📚 Полезные ссылки

- [Все Firebase модули](./src/lib/firebase/)
- [Детальная инструкция](./FIREBASE_INTEGRATION_GUIDE.md)
- [Production checklist](./PRODUCTION_CHECKLIST.md)
- [Firebase Console](https://console.firebase.google.com/project/rauanagym)

---

**🎯 Статус:** Вся инфраструктура готова! Осталось только интегрировать в UI.

**⏱️ Время интеграции:** 2-3 дня

**Следующий файл для редактирования:** `src/app/hero/workouts/page.tsx`
