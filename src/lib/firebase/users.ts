/**
 * Firebase User Management Module
 * Handles all user-related operations with Firestore
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebaseClient';
import type { User } from '@/types';

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

/**
 * Create new user profile in Firestore
 */
export async function createUserProfile(
  userId: string,
  data: {
    email: string;
    displayName: string;
    photoURL?: string;
  }
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      level: 1,
      xp: 0,
      totalXP: 0,
      streak: 0,
      longestStreak: 0,
      totalWorkouts: 0,
      totalCalories: 0,
      totalMinutes: 0,
      role: 'user',
      isPremium: false,
      goals: [],
      lastWorkoutDate: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: Partial<User>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Add XP to user and update level
 */
export async function addXP(userId: string, amount: number): Promise<{
  newXP: number;
  newLevel: number;
  leveledUp: boolean;
}> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) throw new Error('User not found');

    const oldLevel = profile.level;
    const newTotalXP = profile.totalXP + amount;
    const newLevel = calculateLevel(newTotalXP);
    const leveledUp = newLevel > oldLevel;

    await updateUserProfile(userId, {
      totalXP: newTotalXP,
      level: newLevel,
    });

    return {
      newXP: newTotalXP,
      newLevel,
      leveledUp,
    };
  } catch (error) {
    console.error('Error adding XP:', error);
    throw error;
  }
}

/**
 * Calculate level based on total XP
 * Formula: level = floor(sqrt(totalXP / 100)) + 1
 */
export function calculateLevel(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 100)) + 1;
}

/**
 * Calculate XP needed for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  return (currentLevel * currentLevel) * 100;
}

/**
 * Update user streak
 */
export async function updateStreak(userId: string): Promise<{
  currentStreak: number;
  isNewRecord: boolean;
}> {
  try {
    const profile = await getUserProfile(userId);
    if (!profile) throw new Error('User not found');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWorkout = profile.lastWorkoutDate;
    let currentStreak = profile.streak || 0;
    let isNewRecord = false;

    if (lastWorkout) {
      const lastWorkoutDate = new Date(lastWorkout);
      lastWorkoutDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 0) {
        // Same day, no change
        return { currentStreak, isNewRecord: false };
      } else if (daysDiff === 1) {
        // Next day, increment streak
        currentStreak += 1;
      } else {
        // Streak broken
        currentStreak = 1;
      }
    } else {
      // First workout
      currentStreak = 1;
    }

    // Check if new record
    if (currentStreak > (profile.longestStreak || 0)) {
      isNewRecord = true;
      await updateUserProfile(userId, {
        streak: currentStreak,
        longestStreak: currentStreak,
        lastWorkoutDate: new Date(),
      });
    } else {
      await updateUserProfile(userId, {
        streak: currentStreak,
        lastWorkoutDate: new Date(),
      });
    }

    return { currentStreak, isNewRecord };
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
}

/**
 * Increment workout statistics
 */
export async function incrementWorkoutStats(
  userId: string,
  stats: {
    calories: number;
    minutes: number;
  }
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      totalWorkouts: increment(1),
      totalCalories: increment(stats.calories),
      totalMinutes: increment(stats.minutes),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error incrementing stats:', error);
    throw error;
  }
}

/**
 * Get leaderboard (top users by XP)
 */
export async function getLeaderboard(limitCount: number = 50): Promise<User[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      orderBy('totalXP', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
}

/**
 * Search users by display name
 */
export async function searchUsers(searchTerm: string): Promise<User[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('displayName', '>=', searchTerm),
      where('displayName', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

/**
 * Check if user is admin
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const profile = await getUserProfile(userId);
    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
