import { db } from '../../firebaseClient';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Clan } from '@/types/admin';

const COLLECTION = 'clans';

export async function getClans(): Promise<Clan[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Clan));
}

export async function getClanById(id: string): Promise<Clan | null> {
  const docRef = doc(db, COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Clan;
}

export async function createClan(
  data: Omit<Clan, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Clan> {
  const now = new Date().toISOString();
  const clanData = {
    ...data,
    createdAt: now,
    updatedAt: now
  };
  
  const docRef = await addDoc(collection(db, COLLECTION), clanData);
  
  return {
    id: docRef.id,
    ...clanData
  };
}

export async function updateClan(
  id: string,
  data: Partial<Omit<Clan, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Clan> {
  const docRef = doc(db, COLLECTION, id);
  const updateData = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await updateDoc(docRef, updateData);
  
  const updated = await getClanById(id);
  if (!updated) {
    throw new Error(`Clan ${id} not found after update`);
  }
  
  return updated;
}

export async function deleteClan(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}
