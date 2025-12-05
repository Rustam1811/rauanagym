import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from '../rauanagym-firebase-adminsdk-fbsvc-91ee72ab56.json';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any)
  });
}

const db = getFirestore();

const workouts = [
  {
    id: 'strength-basics-1',
    title: 'Базовая Силовая',
    slug: 'strength-basics-1',
    description: 'Фундаментальная силовая тренировка для новичков. Включает базовые упражнения со штангой и гантелями.',
    category: 'strength',
    difficulty: 'beginner',
    durationMinutes: 45,
    equipment: ['barbell', 'dumbbells', 'bench'],
    muscleGroups: ['chest', 'legs', 'back'],
    exercises: ['bench-press', 'squats', 'deadlift'],
    xp: 100,
    level: 1,
    videoUrl: 'https://example.com/workout1.mp4',
    thumbnailUrl: 'https://example.com/thumb1.jpg',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hiit-cardio-1',
    title: 'HIIT Кардио Взрыв',
    slug: 'hiit-cardio-1',
    description: 'Интенсивная кардио тренировка с высокой интенсивностью. Сжигает жир за 30 минут!',
    category: 'cardio',
    difficulty: 'intermediate',
    durationMinutes: 30,
    equipment: ['none'],
    muscleGroups: ['fullbody'],
    exercises: ['burpees', 'jumping-jacks', 'mountain-climbers'],
    xp: 150,
    level: 3,
    videoUrl: 'https://example.com/workout2.mp4',
    thumbnailUrl: 'https://example.com/thumb2.jpg',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'yoga-flexibility-1',
    title: 'Йога для Гибкости',
    slug: 'yoga-flexibility-1',
    description: 'Расслабляющая йога-сессия для улучшения гибкости и снятия стресса.',
    category: 'flexibility',
    difficulty: 'beginner',
    durationMinutes: 60,
    equipment: ['mat'],
    muscleGroups: ['fullbody'],
    exercises: ['downward-dog', 'warrior-pose', 'tree-pose'],
    xp: 80,
    level: 1,
    videoUrl: 'https://example.com/workout3.mp4',
    thumbnailUrl: 'https://example.com/thumb3.jpg',
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'upper-body-power',
    title: 'Верх Тела: Сила',
    slug: 'upper-body-power',
    description: 'Мощная тренировка для развития верхней части тела. Грудь, плечи, руки.',
    category: 'strength',
    difficulty: 'advanced',
    durationMinutes: 50,
    equipment: ['barbell', 'dumbbells', 'pullup-bar'],
    muscleGroups: ['chest', 'shoulders', 'arms'],
    exercises: ['bench-press', 'overhead-press', 'pullups'],
    xp: 200,
    level: 5,
    videoUrl: 'https://example.com/workout4.mp4',
    thumbnailUrl: 'https://example.com/thumb4.jpg',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'legs-day',
    title: 'День Ног: Масса',
    slug: 'legs-day',
    description: 'Убийственная тренировка ног. Приседы, выпады, румынская тяга.',
    category: 'strength',
    difficulty: 'intermediate',
    durationMinutes: 55,
    equipment: ['barbell', 'dumbbells'],
    muscleGroups: ['legs', 'glutes'],
    exercises: ['squats', 'lunges', 'leg-press'],
    xp: 180,
    level: 4,
    videoUrl: 'https://example.com/workout5.mp4',
    thumbnailUrl: 'https://example.com/thumb5.jpg',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const programs = [
  {
    id: 'beginner-strength-program',
    title: 'Программа для Новичков',
    slug: 'beginner-strength-program',
    description: '8-недельная программа для начинающих. Основы силового тренинга.',
    level: 'beginner',
    durationDays: 56,
    durationWeeks: 8,
    totalWorkouts: 24,
    workoutsPerWeek: 3,
    workoutIds: ['strength-basics-1', 'upper-body-power'],
    workouts: ['strength-basics-1', 'upper-body-power'],
    xp: 500,
    coverImageUrl: 'https://example.com/program1.jpg',
    thumbnailUrl: 'https://example.com/program1.jpg',
    isPremium: false,
    isPublished: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'fat-loss-program',
    title: 'Жиросжигание 6 недель',
    slug: 'fat-loss-program',
    description: 'Интенсивная программа для быстрого сжигания жира. HIIT + силовые.',
    level: 'intermediate',
    durationDays: 42,
    durationWeeks: 6,
    totalWorkouts: 30,
    workoutsPerWeek: 5,
    workoutIds: ['hiit-cardio-1', 'upper-body-power', 'legs-day'],
    workouts: ['hiit-cardio-1', 'upper-body-power', 'legs-day'],
    xp: 800,
    coverImageUrl: 'https://example.com/program2.jpg',
    thumbnailUrl: 'https://example.com/program2.jpg',
    isPremium: true,
    isPublished: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mass-building-program',
    title: 'Набор Массы: 12 недель',
    slug: 'mass-building-program',
    description: 'Продвинутая программа для набора мышечной массы. Тяжелые веса.',
    level: 'advanced',
    durationDays: 84,
    durationWeeks: 12,
    totalWorkouts: 48,
    workoutsPerWeek: 4,
    workoutIds: ['upper-body-power', 'legs-day', 'strength-basics-1'],
    workouts: ['upper-body-power', 'legs-day', 'strength-basics-1'],
    xp: 1200,
    coverImageUrl: 'https://example.com/program3.jpg',
    thumbnailUrl: 'https://example.com/program3.jpg',
    isPremium: true,
    isPublished: false,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const clans = [
  {
    id: 'warriors-clan',
    name: 'Воины',
    slug: 'warriors',
    description: 'Клан для сильных духом. Побеждаем вместе!',
    memberCount: 127,
    level: 15,
    xp: 45000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'titans-clan',
    name: 'Титаны',
    slug: 'titans',
    description: 'Элитный клан профессионалов. Только хардкор.',
    memberCount: 89,
    level: 22,
    xp: 78000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'beginners-clan',
    name: 'Новички',
    slug: 'beginners',
    description: 'Дружное сообщество для начинающих. Учимся вместе!',
    memberCount: 234,
    level: 8,
    xp: 18000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const users = [
  {
    uid: 'user-1',
    phoneNumber: '+77777777777',
    displayName: 'Админ',
    photoURL: 'https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff',
    role: 'admin',
    xp: 5000,
    level: 25
  },
  {
    uid: 'user-2',
    phoneNumber: '+71234567890',
    displayName: 'Иван Петров',
    photoURL: 'https://ui-avatars.com/api/?name=Ivan+Petrov&background=10b981&color=fff',
    role: 'user',
    xp: 1200,
    level: 8
  },
  {
    uid: 'user-3',
    phoneNumber: '+79876543210',
    displayName: 'Мария Смирнова',
    photoURL: 'https://ui-avatars.com/api/?name=Maria+Smirnova&background=f59e0b&color=fff',
    role: 'user',
    xp: 2800,
    level: 15
  }
];

const settings = {
  appName: 'GYM Hero',
  appVersion: '1.0.0',
  maintenanceMode: false,
  updatedAt: new Date().toISOString()
};

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Seed Workouts
    console.log('📝 Seeding workouts...');
    for (const workout of workouts) {
      await db.collection('workouts').doc(workout.id).set(workout);
      console.log(`  ✅ Created workout: ${workout.title}`);
    }

    // Seed Programs
    console.log('\n📚 Seeding programs...');
    for (const program of programs) {
      await db.collection('programs').doc(program.id).set(program);
      console.log(`  ✅ Created program: ${program.title}`);
    }

    // Seed Clans
    console.log('\n🛡️  Seeding clans...');
    for (const clan of clans) {
      await db.collection('clans').doc(clan.id).set(clan);
      console.log(`  ✅ Created clan: ${clan.name}`);
    }

    // Seed Users
    console.log('\n👥 Seeding users...');
    for (const user of users) {
      await db.collection('users').doc(user.uid).set(user);
      console.log(`  ✅ Created user: ${user.displayName}`);
    }

    // Seed Settings
    console.log('\n⚙️  Seeding settings...');
    await db.collection('settings').doc('app').set(settings);
    console.log('  ✅ Created app settings');

    console.log('\n✨ Database seed completed successfully! ✨\n');
    console.log('Summary:');
    console.log(`  - Workouts: ${workouts.length}`);
    console.log(`  - Programs: ${programs.length}`);
    console.log(`  - Clans: ${clans.length}`);
    console.log(`  - Users: ${users.length}`);
    console.log('  - Settings: 1\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
