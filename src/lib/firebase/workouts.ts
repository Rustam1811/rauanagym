/**
 * Firebase Workouts Management Module
 * Handles all workout-related operations
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebaseClient';
import type { Workout } from '@/types';

export type WorkoutCategory = 'all' | 'strength' | 'cardio' | 'yoga' | 'hiit' | 'flexibility';
export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Get all workouts
 */
export async function getAllWorkouts(limitCount: number = 50): Promise<Workout[]> {
  try {
    const workoutsRef = collection(db, 'workouts');
    const q = query(workoutsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error('Error getting workouts:', error);
    throw error;
  }
}

/**
 * Get workout by ID
 */
export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const workoutRef = doc(db, 'workouts', id);
    const workoutSnap = await getDoc(workoutRef);

    if (workoutSnap.exists()) {
      return { id: workoutSnap.id, ...workoutSnap.data() } as Workout;
    }
    return null;
  } catch (error) {
    console.error('Error getting workout:', error);
    throw error;
  }
}

/**
 * Get workouts by category
 */
export async function getWorkoutsByCategory(
  category: WorkoutCategory,
  limitCount: number = 20
): Promise<Workout[]> {
  try {
    const workoutsRef = collection(db, 'workouts');
    
    if (category === 'all') {
      return getAllWorkouts(limitCount);
    }

    const q = query(
      workoutsRef,
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error('Error getting workouts by category:', error);
    throw error;
  }
}

/**
 * Get workouts by difficulty
 */
export async function getWorkoutsByDifficulty(
  difficulty: WorkoutDifficulty,
  limitCount: number = 20
): Promise<Workout[]> {
  try {
    const workoutsRef = collection(db, 'workouts');
    const q = query(
      workoutsRef,
      where('difficulty', '==', difficulty),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error('Error getting workouts by difficulty:', error);
    throw error;
  }
}

/**
 * Get popular workouts (most completed)
 */
export async function getPopularWorkouts(limitCount: number = 20): Promise<Workout[]> {
  try {
    const workoutsRef = collection(db, 'workouts');
    const q = query(
      workoutsRef,
      orderBy('completionCount', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error('Error getting popular workouts:', error);
    throw error;
  }
}

/**
 * Get workouts for user (recommended based on level and goals)
 */
export async function getRecommendedWorkouts(
  userLevel: WorkoutDifficulty,
  limitCount: number = 20
): Promise<Workout[]> {
  try {
    // Get workouts matching user's level or one below
    const levels: WorkoutDifficulty[] = [];
    
    if (userLevel === 'advanced') {
      levels.push('advanced', 'intermediate');
    } else if (userLevel === 'intermediate') {
      levels.push('intermediate', 'beginner');
    } else {
      levels.push('beginner');
    }

    const workoutsRef = collection(db, 'workouts');
    const q = query(
      workoutsRef,
      where('difficulty', 'in', levels),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error('Error getting recommended workouts:', error);
    throw error;
  }
}

/**
 * Search workouts by title
 */
export async function searchWorkouts(searchTerm: string): Promise<Workout[]> {
  try {
    const workoutsRef = collection(db, 'workouts');
    const q = query(
      workoutsRef,
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workout[];
  } catch (error) {
    console.error('Error searching workouts:', error);
    throw error;
  }
}

/**
 * Get workouts with pagination
 */
export async function getWorkoutsPaginated(
  pageSize: number = 20,
  lastDoc?: QueryDocumentSnapshot
): Promise<{
  workouts: Workout[];
  lastDoc: QueryDocumentSnapshot | null;
  hasMore: boolean;
}> {
  try {
    const workoutsRef = collection(db, 'workouts');
    let q = query(
      workoutsRef,
      orderBy('createdAt', 'desc'),
      limit(pageSize + 1) // Get one extra to check if there's more
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const hasMore = snapshot.docs.length > pageSize;
    const workouts = snapshot.docs
      .slice(0, pageSize)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Workout[];

    return {
      workouts,
      lastDoc: snapshot.docs[pageSize - 1] || null,
      hasMore,
    };
  } catch (error) {
    console.error('Error getting paginated workouts:', error);
    throw error;
  }
}
