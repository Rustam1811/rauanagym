/**
 * Firebase Seed Script
 * Populates Firestore with initial data for testing
 * 
 * Run with: npm run seed-firebase
 */

import admin from 'firebase-admin';

// Initialize Firebase Admin
const serviceAccount = await import('../rauanagym-firebase-adminsdk-fbsvc-91ee72ab56.json', {
  assert: { type: 'json' }
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.default as admin.ServiceAccount),
});

const db = admin.firestore();

// Seed Exercises
async function seedExercises() {
  console.log('🏋️ Seeding exercises...');
  
  const exercises = [
    // Chest
    {
      title: 'Жим штанги лежа',
      description: 'Базовое упражнение для развития грудных мышц',
      videoUrl: 'https://example.com/bench-press.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
      type: 'reps',
      targetReps: 10,
      muscleGroup: 'chest',
      equipment: ['barbell', 'bench'],
      instructions: [
        'Лягте на скамью, стопы на полу',
        'Возьмите штангу чуть шире плеч',
        'Опустите штангу к груди',
        'Выжмите штангу вверх',
      ],
    },
    {
      title: 'Отжимания',
      description: 'Классическое упражнение с собственным весом',
      videoUrl: 'https://example.com/push-ups.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80',
      type: 'reps',
      targetReps: 15,
      muscleGroup: 'chest',
      equipment: ['bodyweight'],
      instructions: [
        'Примите упор лежа',
        'Опуститесь до касания грудью пола',
        'Отожмитесь вверх',
      ],
    },
    // Back
    {
      title: 'Тяга штанги в наклоне',
      description: 'Упражнение для развития широчайших мышц спины',
      videoUrl: 'https://example.com/rows.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      type: 'reps',
      targetReps: 10,
      muscleGroup: 'back',
      equipment: ['barbell'],
      instructions: [
        'Наклонитесь вперед, спина прямая',
        'Подтяните штангу к поясу',
        'Опустите контролируя движение',
      ],
    },
    {
      title: 'Подтягивания',
      description: 'Упражнение для спины и бицепсов',
      videoUrl: 'https://example.com/pull-ups.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80',
      type: 'reps',
      targetReps: 8,
      muscleGroup: 'back',
      equipment: ['pull-up-bar'],
      instructions: [
        'Повисните на турнике',
        'Подтянитесь до подбородка',
        'Опуститесь плавно вниз',
      ],
    },
    // Legs
    {
      title: 'Приседания со штангой',
      description: 'Базовое упражнение для ног',
      videoUrl: 'https://example.com/squats.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80',
      type: 'reps',
      targetReps: 12,
      muscleGroup: 'legs',
      equipment: ['barbell'],
      instructions: [
        'Штанга на плечах',
        'Опуститесь до параллели',
        'Выпрямите ноги',
      ],
    },
    // Cardio
    {
      title: 'Бег на месте',
      description: 'Кардио упражнение для разминки',
      videoUrl: 'https://example.com/running.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80',
      type: 'time',
      targetTimeSeconds: 300,
      muscleGroup: 'cardio',
      equipment: ['bodyweight'],
      instructions: [
        'Бегите на месте',
        'Высоко поднимайте колени',
        'Двигайте руками',
      ],
    },
  ];

  const batch = db.batch();
  
  exercises.forEach((exercise) => {
    const docRef = db.collection('exercises').doc();
    batch.set(docRef, {
      ...exercise,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  console.log(`✅ Seeded ${exercises.length} exercises`);
}

// Seed Workouts
async function seedWorkouts() {
  console.log('💪 Seeding workouts...');
  
  // Get some exercise IDs for references
  const exercisesSnapshot = await db.collection('exercises').limit(6).get();
  const exerciseIds = exercisesSnapshot.docs.map(doc => doc.id);

  const workouts = [
    {
      programId: 'beginner-strength',
      dayIndex: 1,
      title: 'Силовая тренировка верха тела',
      description: 'Комплексная тренировка для грудных мышц, плеч и спины',
      exerciseIds: exerciseIds.slice(0, 3),
      estimatedDurationMinutes: 45,
      category: 'strength',
      difficulty: 'intermediate',
      calories: 380,
      xp: 150,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      isPremium: false,
      completionCount: 0,
    },
    {
      programId: 'beginner-strength',
      dayIndex: 2,
      title: 'Тренировка ног',
      description: 'Интенсивная тренировка для нижней части тела',
      exerciseIds: [exerciseIds[4]],
      estimatedDurationMinutes: 40,
      category: 'strength',
      difficulty: 'beginner',
      calories: 320,
      xp: 120,
      image: 'https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?w=800&q=80',
      isPremium: false,
      completionCount: 0,
    },
    {
      programId: 'cardio-blast',
      dayIndex: 1,
      title: 'HIIT Кардио',
      description: 'Высокоинтенсивная интервальная тренировка',
      exerciseIds: [exerciseIds[5]],
      estimatedDurationMinutes: 30,
      category: 'hiit',
      difficulty: 'advanced',
      calories: 450,
      xp: 180,
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
      isPremium: true,
      completionCount: 0,
    },
  ];

  const batch = db.batch();
  
  workouts.forEach((workout) => {
    const docRef = db.collection('workouts').doc();
    batch.set(docRef, {
      ...workout,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  console.log(`✅ Seeded ${workouts.length} workouts`);
}

// Seed Programs
async function seedPrograms() {
  console.log('📋 Seeding programs...');
  
  // Get workout IDs
  const workoutsSnapshot = await db.collection('workouts').limit(3).get();
  const workoutIds = workoutsSnapshot.docs.map(doc => doc.id);

  const programs = [
    {
      title: 'Сила для начинающих',
      description: 'Программа силовых тренировок для новичков',
      level: 'beginner',
      goal: 'strength',
      durationWeeks: 8,
      workoutsPerWeek: 3,
      isPremium: false,
      workoutIds: workoutIds.slice(0, 2),
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    },
    {
      title: 'Кардио-блиц',
      description: 'Интенсивная программа для сжигания жира',
      level: 'intermediate',
      goal: 'fat_loss',
      durationWeeks: 4,
      workoutsPerWeek: 4,
      isPremium: true,
      workoutIds: [workoutIds[2]],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
  ];

  const batch = db.batch();
  
  programs.forEach((program) => {
    const docRef = db.collection('programs').doc();
    batch.set(docRef, {
      ...program,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  console.log(`✅ Seeded ${programs.length} programs`);
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Firebase seed...\n');
    
    await seedExercises();
    await seedWorkouts();
    await seedPrograms();
    
    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

main();
