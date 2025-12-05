import { db } from '../../firebaseClient';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { AppSettings } from '@/types/admin';

const COLLECTION = 'settings';
const DOC_ID = 'app';

export async function getSettings(): Promise<AppSettings> {
  const docRef = doc(db, COLLECTION, DOC_ID);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    const defaultSettings: AppSettings = {
      id: 'app',
      defaultXPPerWorkout: 100,
      defaultCaloriesPerMinute: 8,
      featureToggles: {
        enableArena: true,
        enablePrograms: true,
        enablePremium: true
      },
      updatedAt: new Date().toISOString()
    };
    
    await setDoc(docRef, defaultSettings);
    return defaultSettings;
  }
  
  return docSnap.data() as AppSettings;
}

export async function updateSettings(
  data: Partial<Omit<AppSettings, 'id'>>
): Promise<AppSettings> {
  const docRef = doc(db, COLLECTION, DOC_ID);
  const updateData = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await updateDoc(docRef, updateData);
  
  return getSettings();
}
