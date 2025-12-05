import { db } from '../../firebaseClient';
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { AdminUser } from '@/types/admin';

const COLLECTION = 'users';

export async function getUsers(): Promise<AdminUser[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as AdminUser));
}

export async function getUserById(id: string): Promise<AdminUser | null> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as AdminUser;
}

export async function updateUserRole(id: string, role: AdminUser['role']): Promise<AdminUser> {
  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, { role });
  
  const updated = await getUserById(id);
  if (!updated) {
    throw new Error(`User ${id} not found after update`);
  }
  
  return updated;
}
