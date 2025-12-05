import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Program } from '@/types';

// Query Keys
export const programKeys = {
  all: ['programs'] as const,
  lists: () => [...programKeys.all, 'list'] as const,
  list: (filters: string) => [...programKeys.lists(), { filters }] as const,
  details: () => [...programKeys.all, 'detail'] as const,
  detail: (id: string) => [...programKeys.details(), id] as const,
  byCategory: (category: string) => [...programKeys.all, 'category', category] as const,
  recommended: () => [...programKeys.all, 'recommended'] as const,
  userPrograms: (userId: string) => [...programKeys.all, 'user', userId] as const,
};

// Fetch all programs
async function fetchPrograms(): Promise<Program[]> {
  const programsRef = collection(db, 'programs');
  const snapshot = await getDocs(programsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
}

// Fetch programs by category
async function fetchProgramsByCategory(category: string): Promise<Program[]> {
  const programsRef = collection(db, 'programs');
  const q = query(programsRef, where('category', '==', category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
}

// Fetch programs by goal
async function fetchProgramsByGoal(goal: string): Promise<Program[]> {
  const programsRef = collection(db, 'programs');
  const q = query(programsRef, where('goal', '==', goal));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
}

// Fetch programs by difficulty level
async function fetchProgramsByLevel(level: string): Promise<Program[]> {
  const programsRef = collection(db, 'programs');
  const q = query(programsRef, where('difficulty', '==', level));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
}

// Fetch recommended programs (top rated)
async function fetchRecommendedPrograms(): Promise<Program[]> {
  const programsRef = collection(db, 'programs');
  const q = query(programsRef, orderBy('rating', 'desc'), limit(5));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
}

// Fetch single program by ID
async function fetchProgram(id: string): Promise<Program | undefined> {
  const programRef = doc(db, 'programs', id);
  const snapshot = await getDoc(programRef);
  if (!snapshot.exists()) return undefined;
  return { id: snapshot.id, ...snapshot.data() } as Program;
}

// Fetch user's enrolled programs
async function fetchUserPrograms(userId: string): Promise<Program[]> {
  const programsRef = collection(db, 'programs');
  const q = query(programsRef, where('enrolledUsers', 'array-contains', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
}

// Hooks
export function usePrograms() {
  return useQuery({
    queryKey: programKeys.lists(),
    queryFn: fetchPrograms,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProgramsByCategory(category: string) {
  return useQuery({
    queryKey: programKeys.byCategory(category),
    queryFn: () => fetchProgramsByCategory(category),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProgramsByGoal(goal: string) {
  return useQuery({
    queryKey: programKeys.list(goal),
    queryFn: () => fetchProgramsByGoal(goal),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProgramsByLevel(level: string) {
  return useQuery({
    queryKey: programKeys.list(level),
    queryFn: () => fetchProgramsByLevel(level),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecommendedPrograms() {
  return useQuery({
    queryKey: programKeys.recommended(),
    queryFn: fetchRecommendedPrograms,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProgram(id: string) {
  return useQuery({
    queryKey: programKeys.detail(id),
    queryFn: () => fetchProgram(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

export function useUserPrograms(userId: string) {
  return useQuery({
    queryKey: programKeys.userPrograms(userId),
    queryFn: () => fetchUserPrograms(userId),
    staleTime: 3 * 60 * 1000, // 3 minutes (more dynamic)
    enabled: !!userId,
  });
}
