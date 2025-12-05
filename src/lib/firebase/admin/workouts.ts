import { db } from '../../firebaseClient';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Workout } from '@/types/admin';

const COLLECTION = 'workouts';

export async function getWorkouts(): Promise<Workout[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Workout));
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Workout;
}

export async function createWorkout(
  data: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Workout> {
  const now = new Date().toISOString();
  const workoutData = {
    ...data,
    createdAt: now,
    updatedAt: now
  };
  
  const docRef = await addDoc(collection(db, COLLECTION), workoutData);
  
  return {
    id: docRef.id,
    ...workoutData
  };
}

export async function updateWorkout(
  id: string,
  data: Partial<Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Workout> {
  const docRef = doc(db, COLLECTION, id);
  const updateData = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await updateDoc(docRef, updateData);
  
  const updated = await getWorkoutById(id);
  if (!updated) {
    throw new Error(`Workout ${id} not found after update`);
  }
  
  return updated;
}

export async function deleteWorkout(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}
