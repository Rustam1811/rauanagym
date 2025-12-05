import { Badge } from '@/types';
import { updateUserProfile } from './firestore';
import { getUserProfile } from './auth';
import { differenceInDays } from 'date-fns';

// XP thresholds for each level
const XP_LEVELS = [
  0,     // Level 1
  100,   // Level 2
  250,   // Level 3
  500,   // Level 4
  1000,  // Level 5
  2000,  // Level 6
  3500,  // Level 7
  5500,  // Level 8
  8000,  // Level 9
  12000, // Level 10
];

// Calculate current level from XP
export function calculateLevel(xp: number): number {
  let level = 1;
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i]) {
      level = i + 1;
      break;
    }
  }
  return level;
}

// Get XP needed for next level
export function getXpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  if (currentLevel >= XP_LEVELS.length) {
    return XP_LEVELS[XP_LEVELS.length - 1];
  }
  return XP_LEVELS[currentLevel] - currentXp;
}

// Calculate XP reward for completing a workout
export function calculateWorkoutXp(estimatedDurationMinutes: number): number {
  const baseXp = 100;
  const durationBonus = Math.floor(estimatedDurationMinutes / 10) * 10;
  return baseXp + durationBonus;
}

// Award XP to user
export async function awardXp(userId: string, xpAmount: number): Promise<number> {
  const user = await getUserProfile(userId);
  if (!user) throw new Error('User not found');

  const newXp = user.xp + xpAmount;
  await updateUserProfile(userId, { xp: newXp });
  
  return newXp;
}

// Update streak days
export async function updateStreak(userId: string): Promise<number> {
  const user = await getUserProfile(userId);
  if (!user) throw new Error('User not found');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let newStreak = user.streak;

  if (!user.lastWorkoutDate) {
    // First workout ever
    newStreak = 1;
  } else {
    const lastWorkoutDate = new Date(user.lastWorkoutDate);
    lastWorkoutDate.setHours(0, 0, 0, 0);
    
    const daysDiff = differenceInDays(today, lastWorkoutDate);

    if (daysDiff === 0) {
      // Already worked out today, keep streak
      newStreak = user.streak;
    } else if (daysDiff === 1) {
      // Consecutive day, increment streak
      newStreak = user.streak + 1;
    } else {
      // Missed day(s), reset streak
      newStreak = 1;
    }
  }

  await updateUserProfile(userId, {
    streak: newStreak,
    lastWorkoutDate: new Date(),
  });

  return newStreak;
}

// Define available badges
export const BADGES: Badge[] = [
  {
    id: 'first_workout',
    title: 'First Step',
    description: 'Complete your first workout',
    requirement: 'Complete 1 workout',
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Complete 7 workouts',
    requirement: 'Complete 7 workouts',
  },
  {
    id: 'consistency_king',
    title: 'Consistency King',
    description: 'Maintain a 7-day streak',
    requirement: '7-day streak',
  },
  {
    id: 'dedication',
    title: 'Dedicated',
    description: 'Complete 30 workouts',
    requirement: 'Complete 30 workouts',
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 30-day streak',
    requirement: '30-day streak',
  },
  {
    id: 'century_club',
    title: 'Century Club',
    description: 'Complete 100 workouts',
    requirement: 'Complete 100 workouts',
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete 10 morning workouts',
    requirement: 'Complete 10 workouts before 10 AM',
  },
  {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5',
    requirement: 'Reach level 5',
  },
  {
    id: 'level_10',
    title: 'Fitness Legend',
    description: 'Reach level 10',
    requirement: 'Reach level 10',
  },
];

// Check and award badges based on user progress
export async function checkAndAwardBadges(
  userId: string,
  totalWorkouts: number,
  streak: number,
  xp: number
): Promise<string[]> {
  const user = await getUserProfile(userId);
  if (!user) throw new Error('User not found');

  const newBadges: string[] = [];
  const currentBadges = user.badges || [];
  const currentLevel = calculateLevel(xp);

  // Check each badge
  if (totalWorkouts >= 1 && !currentBadges.includes('first_workout')) {
    newBadges.push('first_workout');
  }

  if (totalWorkouts >= 7 && !currentBadges.includes('week_warrior')) {
    newBadges.push('week_warrior');
  }

  if (streak >= 7 && !currentBadges.includes('consistency_king')) {
    newBadges.push('consistency_king');
  }

  if (totalWorkouts >= 30 && !currentBadges.includes('dedication')) {
    newBadges.push('dedication');
  }

  if (streak >= 30 && !currentBadges.includes('streak_master')) {
    newBadges.push('streak_master');
  }

  if (totalWorkouts >= 100 && !currentBadges.includes('century_club')) {
    newBadges.push('century_club');
  }

  if (currentLevel >= 5 && !currentBadges.includes('level_5')) {
    newBadges.push('level_5');
  }

  if (currentLevel >= 10 && !currentBadges.includes('level_10')) {
    newBadges.push('level_10');
  }

  // Update user badges if any new badges were earned
  if (newBadges.length > 0) {
    const updatedBadges = [...currentBadges, ...newBadges];
    await updateUserProfile(userId, { badges: updatedBadges });
  }

  return newBadges;
}

// Complete a workout and update all gamification metrics
export async function completeWorkout(
  userId: string,
  workoutDurationMinutes: number
): Promise<{
  xpEarned: number;
  newStreak: number;
  newBadges: string[];
  newLevel: number;
}> {
  const user = await getUserProfile(userId);
  if (!user) throw new Error('User not found');

  // Award XP
  const xpEarned = calculateWorkoutXp(workoutDurationMinutes);
  const newXp = await awardXp(userId, xpEarned);

  // Update streak
  const newStreak = await updateStreak(userId);

  // Increment total workouts
  const newTotalWorkouts = user.totalWorkouts + 1;
  await updateUserProfile(userId, {
    totalWorkouts: newTotalWorkouts,
  });

  // Check for new badges
  const newBadges = await checkAndAwardBadges(userId, newTotalWorkouts, newStreak, newXp);

  // Calculate new level
  const newLevel = calculateLevel(newXp);

  return {
    xpEarned,
    newStreak,
    newBadges,
    newLevel,
  };
}
