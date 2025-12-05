import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, query, where, orderBy, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Session } from '@/types';

// Query Keys
export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  user: (userId: string) => [...sessionKeys.all, 'user', userId] as const,
  detail: (id: string) => [...sessionKeys.all, 'detail', id] as const,
  recent: (userId: string) => [...sessionKeys.all, 'recent', userId] as const,
  stats: (userId: string) => [...sessionKeys.all, 'stats', userId] as const,
};

// Fetch user's sessions
async function fetchUserSessions(userId: string): Promise<Session[]> {
  const sessionsRef = collection(db, 'sessions');
  const q = query(
    sessionsRef, 
    where('userId', '==', userId),
    orderBy('completedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session));
}

// Fetch recent sessions (last 7 days)
async function fetchRecentSessions(userId: string): Promise<Session[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const sessionsRef = collection(db, 'sessions');
  const q = query(
    sessionsRef,
    where('userId', '==', userId),
    where('completedAt', '>=', Timestamp.fromDate(sevenDaysAgo)),
    orderBy('completedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session));
}

// Fetch session by ID
async function fetchSession(id: string): Promise<Session | undefined> {
  const sessionRef = doc(db, 'sessions', id);
  const snapshot = await getDoc(sessionRef);
  if (!snapshot.exists()) return undefined;
  return { id: snapshot.id, ...snapshot.data() } as Session;
}

// Calculate user stats from sessions
async function calculateUserStats(userId: string): Promise<{
  totalWorkouts: number;
  totalMinutes: number;
  totalCalories: number;
  currentStreak: number;
  longestStreak: number;
}> {
  const sessions = await fetchUserSessions(userId);
  
  const totalWorkouts = sessions.length;
  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalCalories = sessions.reduce((sum, s) => sum + (s.caloriesBurned || 0), 0);
  
  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: Date | null = null;
  
  sessions.forEach(session => {
    const sessionDate = session.finishedAt instanceof Date ? session.finishedAt : new Date(session.finishedAt || Date.now());
    if (!sessionDate) return;
    
    if (!lastDate) {
      tempStreak = 1;
    } else {
      const diffDays = Math.floor((lastDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    lastDate = sessionDate;
  });
  
  longestStreak = Math.max(longestStreak, tempStreak);
  currentStreak = tempStreak;
  
  return {
    totalWorkouts,
    totalMinutes,
    totalCalories,
    currentStreak,
    longestStreak,
  };
}

// Create new session
async function createSession(sessionData: Omit<Session, 'id'>): Promise<Session> {
  const sessionsRef = collection(db, 'sessions');
  const docRef = await addDoc(sessionsRef, {
    ...sessionData,
    completedAt: Timestamp.now(),
  });
  return { id: docRef.id, ...sessionData } as Session;
}

// Update session
async function updateSession(id: string, updates: Partial<Session>): Promise<void> {
  const sessionRef = doc(db, 'sessions', id);
  await updateDoc(sessionRef, updates);
}

// Hooks
export function useUserSessions(userId: string) {
  return useQuery({
    queryKey: sessionKeys.user(userId),
    queryFn: () => fetchUserSessions(userId),
    staleTime: 2 * 60 * 1000, // 2 minutes (more dynamic)
    enabled: !!userId,
  });
}

export function useRecentSessions(userId: string) {
  return useQuery({
    queryKey: sessionKeys.recent(userId),
    queryFn: () => fetchRecentSessions(userId),
    staleTime: 2 * 60 * 1000,
    enabled: !!userId,
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: () => fetchSession(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

export function useUserStats(userId: string) {
  return useQuery({
    queryKey: sessionKeys.stats(userId),
    queryFn: () => calculateUserStats(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId,
  });
}

// Mutations
export function useCreateSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      // Invalidate user sessions to refetch
      queryClient.invalidateQueries({ queryKey: sessionKeys.user(data.userId) });
      queryClient.invalidateQueries({ queryKey: sessionKeys.recent(data.userId) });
      queryClient.invalidateQueries({ queryKey: sessionKeys.stats(data.userId) });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Session> }) => 
      updateSession(id, updates),
    onSuccess: (_, variables) => {
      // Invalidate specific session
      queryClient.invalidateQueries({ queryKey: sessionKeys.detail(variables.id) });
    },
  });
}
