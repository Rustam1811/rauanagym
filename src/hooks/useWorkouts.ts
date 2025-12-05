/**
 * React Query hooks for Workouts
 * Centralized data fetching with caching
 */

import { useQuery } from '@tanstack/react-query';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { Workout } from '@/types';

// Query Keys
export const workoutKeys = {
  all: ['workouts'] as const,
  lists: () => [...workoutKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...workoutKeys.lists(), filters] as const,
  details: () => [...workoutKeys.all, 'detail'] as const,
  detail: (id: string) => [...workoutKeys.details(), id] as const,
  recommended: () => [...workoutKeys.all, 'recommended'] as const,
};

// Fetch all workouts
async function fetchWorkouts(): Promise<Workout[]> {
  const q = query(
    collection(db, 'workouts'),
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate(),
    } as Workout;
  });
}

// Fetch workouts by category
async function fetchWorkoutsByCategory(category: string): Promise<Workout[]> {
  const q = query(
    collection(db, 'workouts'),
    where('isPublished', '==', true),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate(),
    } as Workout;
  });
}

// Fetch recommended workouts
async function fetchRecommendedWorkouts(): Promise<Workout[]> {
  const q = query(
    collection(db, 'workouts'),
    where('isPublished', '==', true),
    where('isRecommended', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate(),
    } as Workout;
  });
}

// Fetch workout by ID
async function fetchWorkoutById(id: string): Promise<Workout | null> {
  const docRef = doc(db, 'workouts', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate(),
  } as Workout;
}

// Hooks
export function useWorkouts() {
  return useQuery({
    queryKey: workoutKeys.lists(),
    queryFn: fetchWorkouts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useWorkoutsByCategory(category: string) {
  return useQuery({
    queryKey: workoutKeys.list({ category }),
    queryFn: () => fetchWorkoutsByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRecommendedWorkouts() {
  return useQuery({
    queryKey: workoutKeys.recommended(),
    queryFn: fetchRecommendedWorkouts,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useWorkout(id: string) {
  return useQuery({
    queryKey: workoutKeys.detail(id),
    queryFn: () => fetchWorkoutById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
