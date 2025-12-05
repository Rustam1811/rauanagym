import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const serviceAccount = require('../rauanagym-firebase-adminsdk-fbsvc-91ee72ab56.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  // 1. Create Programs
  console.log('📚 Creating programs...');
  
  const beginnerProgram = await db.collection('programs').add({
    title: 'Beginner Full Body',
    description: 'Perfect for those just starting their fitness journey. 3 workouts per week focusing on basic movements.',
    level: 'beginner',
    goal: 'health',
    durationWeeks: 4,
    workoutsPerWeek: 3,
    isPremium: false,
    workoutIds: [],
    createdAt: Timestamp.now(),
  });

  const weightLossProgram = await db.collection('programs').add({
    title: 'Fat Loss Circuit',
    description: 'High-intensity workouts designed to maximize fat burning. 4 workouts per week with cardio emphasis.',
    level: 'intermediate',
    goal: 'fat_loss',
    durationWeeks: 8,
    workoutsPerWeek: 4,
    isPremium: false,
    workoutIds: [],
    createdAt: Timestamp.now(),
  });

  const muscleProgram = await db.collection('programs').add({
    title: 'Muscle Building Pro',
    description: 'Advanced hypertrophy program for serious muscle gain. 5 workouts per week with progressive overload.',
    level: 'advanced',
    goal: 'muscle_gain',
    durationWeeks: 12,
    workoutsPerWeek: 5,
    isPremium: true,
    workoutIds: [],
    createdAt: Timestamp.now(),
  });

  console.log(`✅ Created 3 programs\n`);

  // 2. Create Exercises
  console.log('💪 Creating exercises...');

  const exercises = [
    {
      title: 'Push-ups',
      description: 'Classic bodyweight exercise for chest, shoulders, and triceps',
      type: 'reps',
      defaultReps: 15,
      muscleGroup: 'chest',
      targets: ['chest', 'shoulders', 'triceps'],
      difficulty: 'beginner',
      videoUrl: '',
      thumbnailUrl: '',
    },
    {
      title: 'Squats',
      description: 'Fundamental lower body exercise',
      type: 'reps',
      defaultReps: 20,
      muscleGroup: 'legs',
      targets: ['quads', 'glutes', 'hamstrings'],
      difficulty: 'beginner',
      videoUrl: '',
      thumbnailUrl: '',
    },
    {
      title: 'Plank',
      description: 'Core stability exercise',
      type: 'time',
      defaultDuration: 30,
      muscleGroup: 'core',
      targets: ['abs', 'core'],
      difficulty: 'beginner',
      videoUrl: '',
      thumbnailUrl: '',
    },
    {
      title: 'Burpees',
      description: 'Full body cardio exercise',
      type: 'reps',
      defaultReps: 10,
      muscleGroup: 'full_body',
      targets: ['full_body', 'cardio'],
      difficulty: 'intermediate',
      videoUrl: '',
      thumbnailUrl: '',
    },
    {
      title: 'Mountain Climbers',
      description: 'Dynamic core and cardio exercise',
      type: 'time',
      defaultDuration: 30,
      muscleGroup: 'core',
      targets: ['core', 'cardio'],
      difficulty: 'intermediate',
      videoUrl: '',
      thumbnailUrl: '',
    },
    {
      title: 'Lunges',
      description: 'Unilateral leg exercise',
      type: 'reps',
      defaultReps: 12,
      muscleGroup: 'legs',
      targets: ['quads', 'glutes'],
      difficulty: 'beginner',
      videoUrl: '',
      thumbnailUrl: '',
    },
  ];

  const exerciseRefs = [];
  for (const exercise of exercises) {
    const ref = await db.collection('exercises').add({
      ...exercise,
      createdAt: Timestamp.now(),
    });
    exerciseRefs.push(ref);
  }

  console.log(`✅ Created ${exercises.length} exercises\n`);

  // 3. Create Workouts for Beginner Program
  console.log('🏋️ Creating workouts...');

  const workouts = [
    {
      title: 'Day 1: Upper Body',
      description: 'Focus on chest, shoulders, and arms',
      programId: beginnerProgram.id,
      dayIndex: 0,
      estimatedDurationMinutes: 30,
      exercises: [
        { exerciseId: exerciseRefs[0].id, order: 0, sets: 3, reps: 15 },
        { exerciseId: exerciseRefs[2].id, order: 1, sets: 3, duration: 30 },
      ],
    },
    {
      title: 'Day 2: Lower Body',
      description: 'Leg day with squats and lunges',
      programId: beginnerProgram.id,
      dayIndex: 2,
      estimatedDurationMinutes: 35,
      exercises: [
        { exerciseId: exerciseRefs[1].id, order: 0, sets: 3, reps: 20 },
        { exerciseId: exerciseRefs[5].id, order: 1, sets: 3, reps: 12 },
      ],
    },
    {
      title: 'Day 3: Full Body Circuit',
      description: 'Complete workout hitting all muscle groups',
      programId: beginnerProgram.id,
      dayIndex: 4,
      estimatedDurationMinutes: 40,
      exercises: [
        { exerciseId: exerciseRefs[3].id, order: 0, sets: 3, reps: 10 },
        { exerciseId: exerciseRefs[4].id, order: 1, sets: 3, duration: 30 },
        { exerciseId: exerciseRefs[0].id, order: 2, sets: 2, reps: 12 },
      ],
    },
  ];

  const workoutIds = [];
  for (const workout of workouts) {
    const ref = await db.collection('workouts').add({
      ...workout,
      createdAt: Timestamp.now(),
    });
    workoutIds.push(ref.id);
  }

  // Update program with workout IDs
  await db.collection('programs').doc(beginnerProgram.id).update({
    workoutIds: workoutIds,
  });

  console.log(`✅ Created ${workouts.length} workouts\n`);

  // 4. Create Stories
  console.log('📱 Creating stories...');

  const stories = [
    {
      type: 'video' as const,
      title: 'Welcome to FitCoach!',
      mediaUrl: '',
      segment: 'motivation',
      order: 0,
      isPremium: false,
      expiresAt: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      createdAt: Timestamp.now(),
    },
    {
      type: 'image' as const,
      title: 'Quick Tip: Stay Hydrated',
      mediaUrl: '',
      segment: 'tips',
      order: 1,
      isPremium: false,
      expiresAt: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      createdAt: Timestamp.now(),
    },
  ];

  for (const story of stories) {
    await db.collection('stories').add(story);
  }

  console.log(`✅ Created ${stories.length} stories\n`);

  console.log('✨ Database seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Programs: 3`);
  console.log(`   - Exercises: ${exercises.length}`);
  console.log(`   - Workouts: ${workouts.length}`);
  console.log(`   - Stories: ${stories.length}`);
}

seedDatabase()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  });
