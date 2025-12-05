/**
 * Firebase Sessions Management Module
 * Handles active workout sessions and their completion
 */

import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebaseClient';
import type { Session } from '@/types';
import { addXP, updateStreak, incrementWorkoutStats } from './users';

export interface SessionData {
  userId: string;
  workoutId: string;
  workoutName: string;
  duration: number; // in minutes
  caloriesBurned: number;
  xpEarned: number;
  completedExercises: string[];
}

/**
 * Create a new active session
 */
export async function createSession(
  userId: string,
  workoutId: string,
  programId?: string
): Promise<string> {
  try {
    const sessionsRef = collection(db, 'sessions');
    const docRef = await addDoc(sessionsRef, {
      userId,
      workoutId,
      programId: programId || null,
      startedAt: serverTimestamp(),
      status: 'in_progress',
      completedExercises: [],
      earnedXp: 0,
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

/**
 * Get active session for user
 */
export async function getActiveSession(userId: string): Promise<Session | null> {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('userId', '==', userId),
      where('status', '==', 'in_progress'),
      orderBy('startedAt', 'desc'),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Session;
    }
    return null;
  } catch (error) {
    console.error('Error getting active session:', error);
    throw error;
  }
}

/**
 * Update session progress (save completed exercises)
 */
export async function updateSessionProgress(
  sessionId: string,
  completedExercises: string[]
): Promise<void> {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      completedExercises,
    });
  } catch (error) {
    console.error('Error updating session progress:', error);
    throw error;
  }
}

/**
 * Complete a session and award XP
 */
export async function completeSession(
  sessionId: string,
  data: SessionData
): Promise<{
  xpEarned: number;
  newLevel: number;
  leveledUp: boolean;
  currentStreak: number;
  isNewRecord: boolean;
}> {
  try {
    // 1. Update session status
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      finishedAt: serverTimestamp(),
      status: 'completed',
      earnedXp: data.xpEarned,
      duration: data.duration,
      caloriesBurned: data.caloriesBurned,
      completedExercises: data.completedExercises,
    });

    // 2. Award XP to user
    const xpResult = await addXP(data.userId, data.xpEarned);

    // 3. Update streak
    const streakResult = await updateStreak(data.userId);

    // 4. Increment workout stats
    await incrementWorkoutStats(data.userId, {
      calories: data.caloriesBurned,
      minutes: data.duration,
    });

    return {
      xpEarned: data.xpEarned,
      newLevel: xpResult.newLevel,
      leveledUp: xpResult.leveledUp,
      currentStreak: streakResult.currentStreak,
      isNewRecord: streakResult.isNewRecord,
    };
  } catch (error) {
    console.error('Error completing session:', error);
    throw error;
  }
}

/**
 * Abort a session
 */
export async function abortSession(sessionId: string): Promise<void> {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      status: 'aborted',
      finishedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error aborting session:', error);
    throw error;
  }
}

/**
 * Get user's workout history
 */
export async function getUserWorkoutHistory(
  userId: string,
  limitCount: number = 50
): Promise<Session[]> {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('userId', '==', userId),
      where('status', '==', 'completed'),
      orderBy('finishedAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Session[];
  } catch (error) {
    console.error('Error getting workout history:', error);
    throw error;
  }
}

/**
 * Get workout statistics for a specific workout
 */
export async function getWorkoutStats(
  workoutId: string,
  userId: string
): Promise<{
  totalCompletions: number;
  averageDuration: number;
  bestTime: number;
  lastCompleted: Date | null;
}> {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('userId', '==', userId),
      where('workoutId', '==', workoutId),
      where('status', '==', 'completed'),
      orderBy('finishedAt', 'desc')
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return {
        totalCompletions: 0,
        averageDuration: 0,
        bestTime: 0,
        lastCompleted: null,
      };
    }

    const sessions = snapshot.docs.map((doc) => doc.data() as Session);
    const totalCompletions = sessions.length;
    const durations = sessions
      .map((s) => s.duration || 0)
      .filter((d) => d > 0);
    
    const averageDuration = durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;
    
    const bestTime = durations.length > 0 ? Math.min(...durations) : 0;
    
    const lastSession = sessions[0];
    const lastCompleted = lastSession.finishedAt
      ? lastSession.finishedAt instanceof Date
        ? lastSession.finishedAt
        : (lastSession.finishedAt as unknown as Timestamp).toDate()
      : null;

    return {
      totalCompletions,
      averageDuration,
      bestTime,
      lastCompleted,
    };
  } catch (error) {
    console.error('Error getting workout stats:', error);
    throw error;
  }
}

/**
 * Get total workout time for today
 */
export async function getTodayWorkoutTime(userId: string): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('userId', '==', userId),
      where('status', '==', 'completed'),
      where('finishedAt', '>=', Timestamp.fromDate(today))
    );
    const snapshot = await getDocs(q);

    const totalMinutes = snapshot.docs.reduce((total, doc) => {
      const session = doc.data() as Session;
      return total + (session.duration || 0);
    }, 0);

    return totalMinutes;
  } catch (error) {
    console.error('Error getting today workout time:', error);
    return 0;
  }
}

/**
 * Calculate XP for a workout
 */
export function calculateWorkoutXP(
  duration: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  completionRate: number = 1.0
): number {
  const baseXP = {
    beginner: 100,
    intermediate: 150,
    advanced: 200,
  };

  const durationMultiplier = duration / 30; // Base: 30 minutes
  const xp = Math.round(baseXP[difficulty] * durationMultiplier * completionRate);

  return Math.max(50, xp); // Minimum 50 XP
}
