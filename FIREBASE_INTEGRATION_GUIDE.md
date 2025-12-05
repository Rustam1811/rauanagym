# 🚀 Firebase Integration Quick Start

## Обзор
Это пошаговое руководство по интеграции Firebase для запуска продукта.

## ⏱️ Время выполнения: 2-3 дня

---

## День 1: Firebase Setup & Authentication

### Шаг 1: Проверка Firebase Config (30 минут)

1. **Проверьте `.env.local`:**
```bash
# Убедитесь, что все переменные заполнены
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

2. **Если нет, получите config:**
   - Откройте: https://console.firebase.google.com/project/rauanagym/settings/general
   - Скопируйте Web SDK config
   - См. `SETUP_RU.md` для деталей

### Шаг 2: Включите Firebase сервисы (20 минут)

#### Authentication:
```
https://console.firebase.google.com/project/rauanagym/authentication/providers
```
- ✅ Email/Password → Enable
- ✅ Phone (SMS) → Enable (потребуется настройка)

#### Firestore:
```
https://console.firebase.google.com/project/rauanagym/firestore
```
- Создайте database в режиме "test mode"
- Регион: europe-west (или ближайший к вашим пользователям)

#### Storage:
```
https://console.firebase.google.com/project/rauanagym/storage
```
- Enable Storage
- Создайте bucket

### Шаг 3: Создайте Firestore коллекции (1 час)

**Структура базы данных:**

```
firestore/
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── displayName: string
│       ├── photoURL: string
│       ├── level: number
│       ├── xp: number
│       ├── streak: number
│       ├── role: string ('user' | 'admin')
│       ├── createdAt: timestamp
│       └── goals: array
│
├── programs/
│   └── {programId}/
│       ├── name: string
│       ├── description: string
│       ├── duration: number
│       ├── difficulty: string
│       ├── image: string
│       └── workouts: array
│
├── workouts/
│   └── {workoutId}/
│       ├── name: string
│       ├── description: string
│       ├── duration: number
│       ├── calories: number
│       ├── xp: number
│       ├── difficulty: string
│       ├── image: string
│       ├── category: string
│       └── exercises: array
│
├── exercises/
│   └── {exerciseId}/
│       ├── name: string
│       ├── description: string
│       ├── category: string
│       ├── difficulty: string
│       ├── videoUrl: string
│       ├── image: string
│       ├── equipment: array
│       ├── muscleGroups: array
│       └── instructions: array
│
├── sessions/
│   └── {sessionId}/
│       ├── userId: string
│       ├── workoutId: string
│       ├── startTime: timestamp
│       ├── endTime: timestamp
│       ├── duration: number
│       ├── caloriesBurned: number
│       ├── xpEarned: number
│       ├── completedExercises: array
│       └── status: string ('active' | 'completed')
│
└── achievements/
    └── {achievementId}/
        ├── userId: string
        ├── type: string
        ├── name: string
        ├── description: string
        ├── unlockedAt: timestamp
        └── xpReward: number
```

**Создание коллекций:**

Вручную создайте первый документ в каждой коллекции через Firebase Console или используйте seed скрипт.

### Шаг 4: Deploy Security Rules (30 минут)

1. **Установите Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Логин:**
```bash
firebase login
```

3. **Инициализируйте проект:**
```bash
firebase init
# Выберите: Firestore, Storage
# Используйте существующие файлы: firestore.rules, storage.rules
```

4. **Deploy правила:**
```bash
firebase deploy --only firestore:rules,storage:rules
```

5. **Проверьте правила:**
   - Откройте: https://console.firebase.google.com/project/rauanagym/firestore/rules
   - Убедитесь, что правила загружены

### Шаг 5: Реализуйте Authentication (3-4 часа)

#### Обновите `src/contexts/AuthContext.tsx`:

```typescript
// Замените mock функции на реальные Firebase вызовы

const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const signup = async (email: string, password: string, displayName: string) => {
  try {
    // 1. Create user
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. Update profile
    await updateProfile(result.user, { displayName });
    
    // 3. Create user document in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email,
      displayName,
      level: 1,
      xp: 0,
      streak: 0,
      role: 'user',
      createdAt: serverTimestamp(),
    });
    
    return result.user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
```

#### Обновите `src/app/hero/phone-login/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

export default function PhoneLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
      },
      auth
    );
  };

  const sendVerificationCode = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert('SMS отправлен!');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const verifyCode = async () => {
    try {
      await confirmationResult.confirm(verificationCode);
      // User signed in successfully
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {/* Form UI here */}
    </div>
  );
}
```

---

## День 2: Firestore Integration

### Шаг 6: Создайте Firebase модули (3-4 часа)

#### `src/lib/firebase/users.ts`:

```typescript
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseClient';
import type { User } from '@/types';

export async function getUserProfile(userId: string): Promise<User | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as User;
  }
  return null;
}

export async function updateUserProfile(userId: string, data: Partial<User>) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, data);
}

export async function addXP(userId: string, amount: number) {
  const profile = await getUserProfile(userId);
  if (!profile) return;
  
  const newXP = profile.xp + amount;
  const newLevel = calculateLevel(newXP);
  
  await updateUserProfile(userId, {
    xp: newXP,
    level: newLevel,
  });
}

function calculateLevel(xp: number): number {
  // 100 XP per level
  return Math.floor(xp / 100) + 1;
}
```

#### `src/lib/firebase/workouts.ts`:

```typescript
import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebaseClient';
import type { Workout } from '@/types';

export async function getAllWorkouts(): Promise<Workout[]> {
  const workoutsRef = collection(db, 'workouts');
  const snapshot = await getDocs(workoutsRef);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Workout[];
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const workoutRef = doc(db, 'workouts', id);
  const workoutSnap = await getDoc(workoutRef);
  
  if (workoutSnap.exists()) {
    return { id: workoutSnap.id, ...workoutSnap.data() } as Workout;
  }
  return null;
}

export async function getWorkoutsByCategory(category: string): Promise<Workout[]> {
  const workoutsRef = collection(db, 'workouts');
  const q = query(workoutsRef, where('category', '==', category), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Workout[];
}
```

#### `src/lib/firebase/sessions.ts`:

```typescript
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseClient';
import type { Session } from '@/types';

export async function createSession(userId: string, workoutId: string): Promise<string> {
  const sessionsRef = collection(db, 'sessions');
  const docRef = await addDoc(sessionsRef, {
    userId,
    workoutId,
    startTime: serverTimestamp(),
    status: 'active',
    completedExercises: [],
  });
  
  return docRef.id;
}

export async function completeSession(
  sessionId: string,
  data: {
    duration: number;
    caloriesBurned: number;
    xpEarned: number;
    completedExercises: string[];
  }
) {
  const sessionRef = doc(db, 'sessions', sessionId);
  await updateDoc(sessionRef, {
    ...data,
    endTime: serverTimestamp(),
    status: 'completed',
  });
}

export async function updateSessionProgress(
  sessionId: string,
  completedExercises: string[]
) {
  const sessionRef = doc(db, 'sessions', sessionId);
  await updateDoc(sessionRef, {
    completedExercises,
  });
}
```

### Шаг 7: Обновите страницы (2-3 часа)

#### Пример: `src/app/hero/workouts/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { getAllWorkouts, getWorkoutsByCategory } from '@/lib/firebase/workouts';
import type { Workout } from '@/types';

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    loadWorkouts();
  }, [category]);

  const loadWorkouts = async () => {
    setLoading(true);
    try {
      const data = category === 'all' 
        ? await getAllWorkouts() 
        : await getWorkoutsByCategory(category);
      setWorkouts(data);
    } catch (error) {
      console.error('Error loading workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <HJScreen>
      {/* Render workouts */}
    </HJScreen>
  );
}
```

---

## День 3: Content & Testing

### Шаг 8: Создайте seed скрипт (2-3 часа)

#### `scripts/seed-firebase.ts`:

```typescript
import admin from 'firebase-admin';
import serviceAccount from '../rauanagym-firebase-adminsdk-fbsvc-91ee72ab56.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

async function seedWorkouts() {
  const workouts = [
    {
      name: 'Силовая тренировка верха',
      description: 'Комплексная тренировка для грудных мышц, плеч и спины',
      duration: 45,
      calories: 380,
      xp: 150,
      difficulty: 'intermediate',
      category: 'strength',
      image: 'https://images.unsplash.com/photo-...',
      exercises: ['bench-press', 'rows', 'shoulder-press'],
    },
    // ... еще 9-14 тренировок
  ];

  const batch = db.batch();
  
  workouts.forEach(workout => {
    const docRef = db.collection('workouts').doc();
    batch.set(docRef, {
      ...workout,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  console.log('✅ Workouts seeded!');
}

async function seedExercises() {
  const exercises = [
    {
      name: 'Жим штанги лежа',
      description: 'Базовое упражнение для груди',
      category: 'chest',
      difficulty: 'intermediate',
      videoUrl: 'https://...',
      image: 'https://...',
      equipment: ['Штанга', 'Скамья'],
      muscleGroups: ['Грудные', 'Трицепс', 'Плечи'],
      instructions: [
        'Лягте на скамью',
        'Возьмите штангу чуть шире плеч',
        'Опустите штангу к груди',
        'Выжмите штангу вверх',
      ],
    },
    // ... еще 49-99 упражнений
  ];

  const batch = db.batch();
  
  exercises.forEach(exercise => {
    const docRef = db.collection('exercises').doc();
    batch.set(docRef, {
      ...exercise,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  console.log('✅ Exercises seeded!');
}

async function main() {
  await seedExercises();
  await seedWorkouts();
  console.log('🎉 All data seeded!');
  process.exit(0);
}

main();
```

**Запуск:**
```bash
npm run seed-firebase
```

### Шаг 9: Testing (2-3 часа)

**Тестовый чеклист:**
- [ ] Регистрация нового пользователя
- [ ] Вход существующего пользователя
- [ ] Загрузка списка тренировок
- [ ] Открытие детальной страницы тренировки
- [ ] Начало активной сессии
- [ ] Завершение тренировки
- [ ] Начисление XP
- [ ] Обновление уровня
- [ ] Проверка streak
- [ ] Таблица лидеров

**Debug tools:**
```typescript
// В любой странице
console.log('Current User:', auth.currentUser);
console.log('Firestore data:', await getDoc(doc(db, 'users', userId)));
```

---

## Troubleshooting

### Проблема: "Permission denied"
**Решение:** Проверьте firestore.rules, убедитесь что пользователь авторизован

### Проблема: "Failed to get document"
**Решение:** Проверьте имя коллекции и ID документа

### Проблема: "API key not valid"
**Решение:** Обновите `.env.local` реальными значениями из Firebase Console

### Проблема: Mock data still showing
**Решение:** 
1. Очистите cache браузера
2. Перезапустите dev server
3. Проверьте что импортируете правильные функции

---

## Следующие шаги

После завершения Firebase integration:

1. ✅ **Push notifications** (2 дня)
2. ✅ **PWA setup** (2 дня)
3. ✅ **Profile editing** (1 день)
4. ✅ **Achievements logic** (2 дня)
5. ✅ **Admin panel** (1 неделя)

---

## Полезные ссылки

- [Firebase Console](https://console.firebase.google.com/project/rauanagym)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Next.js + Firebase Guide](https://firebase.google.com/docs/hosting/nextjs)

---

**Успехов! 🚀**
