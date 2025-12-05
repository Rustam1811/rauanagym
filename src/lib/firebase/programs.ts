/**
 * Firebase Programs Management Module
 * Handles all training program operations
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
import type { Program, UserGoal, UserLevel } from '@/types';

/**
 * Get program by ID
 */
export async function getProgramById(id: string): Promise<Program | null> {
  try {
    const programRef = doc(db, 'programs', id);
    const programSnap = await getDoc(programRef);

    if (programSnap.exists()) {
      return { id: programSnap.id, ...programSnap.data() } as Program;
    }
    return null;
  } catch (error) {
    console.error('Error getting program:', error);
    throw error;
  }
}

/**
 * Get all programs
 */
export async function getAllPrograms(limitCount: number = 50): Promise<Program[]> {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(programsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  } catch (error) {
    console.error('Error getting programs:', error);
    throw error;
  }
}

/**
 * Get programs by goal
 */
export async function getProgramsByGoal(
  goal: UserGoal,
  limitCount: number = 20
): Promise<Program[]> {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(
      programsRef,
      where('goal', '==', goal),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  } catch (error) {
    console.error('Error getting programs by goal:', error);
    throw error;
  }
}

/**
 * Get programs by level
 */
export async function getProgramsByLevel(
  level: UserLevel,
  limitCount: number = 20
): Promise<Program[]> {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(
      programsRef,
      where('level', '==', level),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  } catch (error) {
    console.error('Error getting programs by level:', error);
    throw error;
  }
}

/**
 * Get recommended programs for user
 */
export async function getRecommendedPrograms(
  userGoal: UserGoal,
  userLevel: UserLevel,
  limitCount: number = 10
): Promise<Program[]> {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(
      programsRef,
      where('goal', '==', userGoal),
      where('level', '==', userLevel),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  } catch (error) {
    console.error('Error getting recommended programs:', error);
    // Fallback: get programs by goal only
    return getProgramsByGoal(userGoal, limitCount);
  }
}

/**
 * Get free programs (non-premium)
 */
export async function getFreePrograms(limitCount: number = 20): Promise<Program[]> {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(
      programsRef,
      where('isPremium', '==', false),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  } catch (error) {
    console.error('Error getting free programs:', error);
    throw error;
  }
}

/**
 * Get premium programs
 */
export async function getPremiumPrograms(limitCount: number = 20): Promise<Program[]> {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(
      programsRef,
      where('isPremium', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  } catch (error) {
    console.error('Error getting premium programs:', error);
    throw error;
  }
}

/**
 * Search programs by title
 */
export async function searchPrograms(searchTerm: string): Promise<Program[]> {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(
      programsRef,
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Program[];
  } catch (error) {
    console.error('Error searching programs:', error);
    throw error;
  }
}

/**
 * Calculate program completion percentage
 */
export function calculateProgramProgress(
  completedWorkouts: number,
  totalWorkouts: number
): number {
  if (totalWorkouts === 0) return 0;
  return Math.round((completedWorkouts / totalWorkouts) * 100);
}

/**
 * Get program difficulty description
 */
export function getProgramDifficultyDescription(level: UserLevel): string {
  const descriptions = {
    beginner: 'Для начинающих. Простые упражнения, медленный темп.',
    intermediate: 'Для опытных. Умеренная интенсивность, разнообразные упражнения.',
    advanced: 'Для профи. Высокая интенсивность, сложные движения.',
  };
  
  return descriptions[level] || descriptions.beginner;
}

/**
 * Estimate program duration in days
 */
export function estimateProgramDays(
  durationWeeks: number,
  workoutsPerWeek: number
): {
  totalDays: number;
  activeDays: number;
  restDays: number;
} {
  const totalDays = durationWeeks * 7;
  const activeDays = durationWeeks * workoutsPerWeek;
  const restDays = totalDays - activeDays;

  return {
    totalDays,
    activeDays,
    restDays,
  };
}
