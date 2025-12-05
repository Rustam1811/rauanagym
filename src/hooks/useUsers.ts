import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { User } from '@/types';

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
  leaderboard: () => [...userKeys.all, 'leaderboard'] as const,
  friends: (userId: string) => [...userKeys.all, 'friends', userId] as const,
};

// Fetch user by ID
async function fetchUser(id: string): Promise<User | undefined> {
  const userRef = doc(db, 'users', id);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return undefined;
  return { id: snapshot.id, ...snapshot.data() } as User;
}

// Fetch leaderboard (top 10 users by XP)
async function fetchLeaderboard(): Promise<User[]> {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  
  // Sort by totalXP descending, take top 10
  return users
    .sort((a, b) => (b.totalXP || 0) - (a.totalXP || 0))
    .slice(0, 10);
}

// Fetch user's friends
async function fetchUserFriends(_userId: string): Promise<User[]> {
  // TODO: Implement friends system when ready
  // For now, return empty array
  return [];
}

// Update user profile
async function updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// Update user stats (XP, level, workouts)
async function updateUserStats(
  userId: string, 
  stats: { xpGained?: number; workoutCompleted?: boolean; caloriesBurned?: number }
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) return;
  
  const userData = userDoc.data() as User;
  
  const newTotalXP = userData.totalXP + (stats.xpGained || 0);
  const newLevel = Math.floor(newTotalXP / 1000) + 1;
  const newXP = newTotalXP % 1000;
  
  await updateDoc(userRef, {
    totalXP: newTotalXP,
    xp: newXP,
    level: newLevel,
    totalWorkouts: userData.totalWorkouts + (stats.workoutCompleted ? 1 : 0),
    totalCalories: userData.totalCalories + (stats.caloriesBurned || 0),
    updatedAt: Timestamp.now(),
  });
}

// Hooks
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
    staleTime: 3 * 60 * 1000, // 3 minutes
    enabled: !!id,
  });
}

export function useLeaderboard() {
  return useQuery({
    queryKey: userKeys.leaderboard(),
    queryFn: fetchLeaderboard,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUserFriends(userId: string) {
  return useQuery({
    queryKey: userKeys.friends(userId),
    queryFn: () => fetchUserFriends(userId),
    staleTime: 5 * 60 * 1000,
    enabled: !!userId,
  });
}

// Mutations
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<User> }) =>
      updateUserProfile(userId, updates),
    onSuccess: (_, variables) => {
      // Invalidate user query to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
    },
  });
}

export function useUpdateUserStats() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      userId, 
      stats 
    }: { 
      userId: string; 
      stats: { xpGained?: number; workoutCompleted?: boolean; caloriesBurned?: number } 
    }) => updateUserStats(userId, stats),
    onSuccess: (_, variables) => {
      // Invalidate user and leaderboard queries
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.leaderboard() });
    },
  });
}
