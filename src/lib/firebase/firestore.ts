import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import {
  User,
  Program,
  Workout,
  Exercise,
  Session,
  Story,
  UserGoal,
  UserLevel,
} from '@/types';

// Helper to convert Firestore timestamps to Date
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertTimestamps(data: any): any {
  const converted = { ...data };
  Object.keys(converted).forEach(key => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate();
    }
  });
  return converted;
}

// ===== USER OPERATIONS =====

export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function completeOnboarding(
  userId: string,
  goal: UserGoal,
  experienceLevel: UserLevel,
  programId: string
): Promise<void> {
  await updateUserProfile(userId, {
    goal,
    experienceLevel,
    currentProgramId: programId,
  });
}

// ===== PROGRAM OPERATIONS =====

export async function getProgram(programId: string): Promise<Program | null> {
  const programDoc = await getDoc(doc(db, 'programs', programId));
  if (!programDoc.exists()) return null;
  
  return {
    id: programDoc.id,
    ...convertTimestamps(programDoc.data()),
  } as Program;
}

export async function getAllPrograms(): Promise<Program[]> {
  const programsSnap = await getDocs(collection(db, 'programs'));
  return programsSnap.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Program[];
}

export async function getProgramsByLevelAndGoal(
  level: UserLevel,
  goal: UserGoal
): Promise<Program[]> {
  const q = query(
    collection(db, 'programs'),
    where('level', '==', level),
    where('goal', '==', goal)
  );
  const programsSnap = await getDocs(q);
  return programsSnap.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Program[];
}

export async function createProgram(programData: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const programRef = doc(collection(db, 'programs'));
  await setDoc(programRef, {
    ...programData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return programRef.id;
}

export async function updateProgram(programId: string, updates: Partial<Program>): Promise<void> {
  await updateDoc(doc(db, 'programs', programId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProgram(programId: string): Promise<void> {
  await deleteDoc(doc(db, 'programs', programId));
}

// ===== WORKOUT OPERATIONS =====

export async function getWorkout(workoutId: string): Promise<Workout | null> {
  const workoutDoc = await getDoc(doc(db, 'workouts', workoutId));
  if (!workoutDoc.exists()) return null;
  
  return {
    id: workoutDoc.id,
    ...convertTimestamps(workoutDoc.data()),
  } as Workout;
}

export async function getWorkoutsByProgram(programId: string): Promise<Workout[]> {
  const q = query(
    collection(db, 'workouts'),
    where('programId', '==', programId),
    orderBy('dayIndex', 'asc')
  );
  const workoutsSnap = await getDocs(q);
  return workoutsSnap.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Workout[];
}

export async function getAllWorkouts(): Promise<Workout[]> {
  const workoutsSnap = await getDocs(collection(db, 'workouts'));
  return workoutsSnap.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Workout[];
}

export async function createWorkout(workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const workoutRef = doc(collection(db, 'workouts'));
  await setDoc(workoutRef, {
    ...workoutData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return workoutRef.id;
}

export async function updateWorkout(workoutId: string, updates: Partial<Workout>): Promise<void> {
  await updateDoc(doc(db, 'workouts', workoutId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteWorkout(workoutId: string): Promise<void> {
  await deleteDoc(doc(db, 'workouts', workoutId));
}

// ===== EXERCISE OPERATIONS =====

export async function getExercise(exerciseId: string): Promise<Exercise | null> {
  const exerciseDoc = await getDoc(doc(db, 'exercises', exerciseId));
  if (!exerciseDoc.exists()) return null;
  
  return {
    id: exerciseDoc.id,
    ...convertTimestamps(exerciseDoc.data()),
  } as Exercise;
}

export async function getExercisesByIds(exerciseIds: string[]): Promise<Exercise[]> {
  const exercises = await Promise.all(
    exerciseIds.map(id => getExercise(id))
  );
  return exercises.filter(ex => ex !== null) as Exercise[];
}

export async function getAllExercises(): Promise<Exercise[]> {
  const exercisesSnap = await getDocs(collection(db, 'exercises'));
  return exercisesSnap.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Exercise[];
}

export async function createExercise(exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const exerciseRef = doc(collection(db, 'exercises'));
  await setDoc(exerciseRef, {
    ...exerciseData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return exerciseRef.id;
}

export async function updateExercise(exerciseId: string, updates: Partial<Exercise>): Promise<void> {
  await updateDoc(doc(db, 'exercises', exerciseId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteExercise(exerciseId: string): Promise<void> {
  await deleteDoc(doc(db, 'exercises', exerciseId));
}

// ===== SESSION OPERATIONS =====

export async function createSession(sessionData: Omit<Session, 'id'>): Promise<string> {
  const sessionRef = doc(collection(db, 'sessions'));
  await setDoc(sessionRef, {
    ...sessionData,
    startedAt: serverTimestamp(),
  });
  return sessionRef.id;
}

export async function updateSession(sessionId: string, updates: Partial<Session>): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = { ...updates };
  if (updates.finishedAt) {
    updateData.finishedAt = serverTimestamp();
  }
  await updateDoc(doc(db, 'sessions', sessionId), updateData);
}

export async function getUserSessions(userId: string, limitCount: number = 10): Promise<Session[]> {
  const q = query(
    collection(db, 'sessions'),
    where('userId', '==', userId),
    orderBy('startedAt', 'desc'),
    limit(limitCount)
  );
  const sessionsSnap = await getDocs(q);
  return sessionsSnap.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Session[];
}

// ===== STORY OPERATIONS =====

export async function getAllStories(): Promise<Story[]> {
  const q = query(
    collection(db, 'stories'),
    orderBy('order', 'asc')
  );
  const storiesSnap = await getDocs(q);
  return storiesSnap.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Story[];
}

export async function getStoriesForUser(userLevel?: UserLevel, isPremium: boolean = false): Promise<Story[]> {
  const allStories = await getAllStories();
  const now = new Date();
  
  return allStories.filter(story => {
    // Filter expired stories
    if (story.expiresAt && story.expiresAt < now) return false;
    
    // Filter by segment
    if (story.segment === 'all') return true;
    if (story.segment === 'premium' && isPremium) return true;
    if (story.segment === userLevel) return true;
    
    return false;
  });
}

export async function createStory(storyData: Omit<Story, 'id' | 'createdAt'>): Promise<string> {
  const storyRef = doc(collection(db, 'stories'));
  await setDoc(storyRef, {
    ...storyData,
    createdAt: serverTimestamp(),
  });
  return storyRef.id;
}

export async function updateStory(storyId: string, updates: Partial<Story>): Promise<void> {
  await updateDoc(doc(db, 'stories', storyId), updates);
}

export async function deleteStory(storyId: string): Promise<void> {
  await deleteDoc(doc(db, 'stories', storyId));
}
