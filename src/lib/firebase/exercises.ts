/**
 * Firebase Exercises Management Module
 * Handles all exercise-related operations
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
} from 'firebase/firestore';
import { db } from '../firebaseClient';
import type { Exercise } from '@/types';

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'glutes'
  | 'abs'
  | 'cardio'
  | 'full-body';

export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'kettlebell'
  | 'resistance-band'
  | 'pull-up-bar'
  | 'bench'
  | 'bodyweight'
  | 'machine'
  | 'cardio-equipment';

/**
 * Get exercise by ID
 */
export async function getExerciseById(id: string): Promise<Exercise | null> {
  try {
    const exerciseRef = doc(db, 'exercises', id);
    const exerciseSnap = await getDoc(exerciseRef);

    if (exerciseSnap.exists()) {
      return { id: exerciseSnap.id, ...exerciseSnap.data() } as Exercise;
    }
    return null;
  } catch (error) {
    console.error('Error getting exercise:', error);
    throw error;
  }
}

/**
 * Get multiple exercises by IDs
 */
export async function getExercisesByIds(ids: string[]): Promise<Exercise[]> {
  try {
    const exercises = await Promise.all(
      ids.map((id) => getExerciseById(id))
    );
    return exercises.filter((ex): ex is Exercise => ex !== null);
  } catch (error) {
    console.error('Error getting exercises by IDs:', error);
    throw error;
  }
}

/**
 * Get all exercises
 */
export async function getAllExercises(limitCount: number = 100): Promise<Exercise[]> {
  try {
    const exercisesRef = collection(db, 'exercises');
    const q = query(exercisesRef, orderBy('title', 'asc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Exercise[];
  } catch (error) {
    console.error('Error getting exercises:', error);
    throw error;
  }
}

/**
 * Get exercises by muscle group
 */
export async function getExercisesByMuscleGroup(
  muscleGroup: MuscleGroup,
  limitCount: number = 50
): Promise<Exercise[]> {
  try {
    const exercisesRef = collection(db, 'exercises');
    const q = query(
      exercisesRef,
      where('muscleGroup', '==', muscleGroup),
      orderBy('title', 'asc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Exercise[];
  } catch (error) {
    console.error('Error getting exercises by muscle group:', error);
    throw error;
  }
}

/**
 * Get exercises by equipment
 */
export async function getExercisesByEquipment(
  equipment: EquipmentType,
  limitCount: number = 50
): Promise<Exercise[]> {
  try {
    const exercisesRef = collection(db, 'exercises');
    const q = query(
      exercisesRef,
      where('equipment', 'array-contains', equipment),
      orderBy('title', 'asc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Exercise[];
  } catch (error) {
    console.error('Error getting exercises by equipment:', error);
    throw error;
  }
}

/**
 * Get bodyweight exercises (no equipment needed)
 */
export async function getBodyweightExercises(limitCount: number = 50): Promise<Exercise[]> {
  try {
    const exercisesRef = collection(db, 'exercises');
    const q = query(
      exercisesRef,
      where('equipment', 'array-contains', 'bodyweight'),
      orderBy('title', 'asc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Exercise[];
  } catch (error) {
    console.error('Error getting bodyweight exercises:', error);
    throw error;
  }
}

/**
 * Search exercises by title
 */
export async function searchExercises(searchTerm: string): Promise<Exercise[]> {
  try {
    const exercisesRef = collection(db, 'exercises');
    const q = query(
      exercisesRef,
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Exercise[];
  } catch (error) {
    console.error('Error searching exercises:', error);
    throw error;
  }
}

/**
 * Get exercise difficulty level based on various factors
 */
export function getExerciseDifficulty(exercise: Exercise): 'beginner' | 'intermediate' | 'advanced' {
  // This is a simple heuristic, can be improved
  const bodyweightExercises = ['push-up', 'squat', 'plank', 'lunge'];
  const advancedExercises = ['muscle-up', 'pistol-squat', 'handstand-push-up', 'dragon-flag'];
  
  const title = exercise.title.toLowerCase();
  
  if (advancedExercises.some(adv => title.includes(adv))) {
    return 'advanced';
  }
  
  if (bodyweightExercises.some(bw => title.includes(bw))) {
    return 'beginner';
  }
  
  return 'intermediate';
}

/**
 * Calculate calories burned for an exercise
 * Based on exercise type, duration, and intensity
 */
export function calculateExerciseCalories(
  exercise: Exercise,
  durationMinutes: number,
  userWeight: number = 70 // kg
): number {
  // MET (Metabolic Equivalent of Task) values
  const metValues: Record<string, number> = {
    'cardio': 8.0,
    'strength': 5.0,
    'yoga': 3.0,
    'hiit': 10.0,
    'full-body': 7.0,
  };

  const met = metValues[exercise.muscleGroup] || 6.0;
  
  // Formula: Calories = MET × weight(kg) × duration(hours)
  const calories = met * userWeight * (durationMinutes / 60);
  
  return Math.round(calories);
}
