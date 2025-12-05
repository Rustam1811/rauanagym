import { db } from '../../firebaseClient';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Program } from '@/types/admin';

const COLLECTION = 'programs';

export async function getPrograms(): Promise<Program[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Program));
}

export async function getProgramById(id: string): Promise<Program | null> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Program;
}

// Alias for consistency with other admin modules
export const getProgram = getProgramById;

export async function createProgram(
  data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const now = new Date().toISOString();
  const programData = {
    ...data,
    createdAt: now,
    updatedAt: now
  };
  
  const docRef = await addDoc(collection(db, COLLECTION), programData);
  
  return docRef.id;
}

export async function updateProgram(
  id: string,
  data: Partial<Omit<Program, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const updateData = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await updateDoc(docRef, updateData);
}

export async function deleteProgram(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}
