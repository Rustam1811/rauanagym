import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Exercise } from '@/types';

// Query Keys
export const exerciseKeys = {
  all: ['exercises'] as const,
  lists: () => [...exerciseKeys.all, 'list'] as const,
  detail: (id: string) => [...exerciseKeys.all, 'detail', id] as const,
  byMuscleGroup: (muscleGroup: string) => [...exerciseKeys.all, 'muscle', muscleGroup] as const,
  byEquipment: (equipment: string) => [...exerciseKeys.all, 'equipment', equipment] as const,
  byDifficulty: (difficulty: string) => [...exerciseKeys.all, 'difficulty', difficulty] as const,
};

// Fetch all exercises
async function fetchExercises(): Promise<Exercise[]> {
  const exercisesRef = collection(db, 'exercises');
  const snapshot = await getDocs(exercisesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
}

// Fetch exercises by muscle group
async function fetchExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
  const exercisesRef = collection(db, 'exercises');
  const q = query(
    exercisesRef,
    where('muscleGroups', 'array-contains', muscleGroup),
    orderBy('name')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
}

// Fetch exercises by equipment
async function fetchExercisesByEquipment(equipment: string): Promise<Exercise[]> {
  const exercisesRef = collection(db, 'exercises');
  const q = query(
    exercisesRef,
    where('equipment', '==', equipment),
    orderBy('name')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
}

// Fetch exercises by difficulty
async function fetchExercisesByDifficulty(difficulty: string): Promise<Exercise[]> {
  const exercisesRef = collection(db, 'exercises');
  const q = query(
    exercisesRef,
    where('difficulty', '==', difficulty),
    orderBy('name')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
}

// Fetch single exercise by ID
async function fetchExercise(id: string): Promise<Exercise | undefined> {
  const exerciseRef = doc(db, 'exercises', id);
  const snapshot = await getDoc(exerciseRef);
  if (!snapshot.exists()) return undefined;
  return { id: snapshot.id, ...snapshot.data() } as Exercise;
}

// Hooks
export function useExercises() {
  return useQuery({
    queryKey: exerciseKeys.lists(),
    queryFn: fetchExercises,
    staleTime: 10 * 60 * 1000, // 10 minutes (exercises rarely change)
  });
}

export function useExercisesByMuscleGroup(muscleGroup: string) {
  return useQuery({
    queryKey: exerciseKeys.byMuscleGroup(muscleGroup),
    queryFn: () => fetchExercisesByMuscleGroup(muscleGroup),
    staleTime: 10 * 60 * 1000,
    enabled: !!muscleGroup,
  });
}

export function useExercisesByEquipment(equipment: string) {
  return useQuery({
    queryKey: exerciseKeys.byEquipment(equipment),
    queryFn: () => fetchExercisesByEquipment(equipment),
    staleTime: 10 * 60 * 1000,
    enabled: !!equipment,
  });
}

export function useExercisesByDifficulty(difficulty: string) {
  return useQuery({
    queryKey: exerciseKeys.byDifficulty(difficulty),
    queryFn: () => fetchExercisesByDifficulty(difficulty),
    staleTime: 10 * 60 * 1000,
    enabled: !!difficulty,
  });
}

export function useExercise(id: string) {
  return useQuery({
    queryKey: exerciseKeys.detail(id),
    queryFn: () => fetchExercise(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
