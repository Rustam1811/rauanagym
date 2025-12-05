import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Validate Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required config values are present
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('🔥 Firebase configuration is missing! Check environment variables.');
  console.error('Current config:', {
    apiKey: firebaseConfig.apiKey ? '✓ Set' : '✗ Missing',
    authDomain: firebaseConfig.authDomain ? '✓ Set' : '✗ Missing',
    projectId: firebaseConfig.projectId ? '✓ Set' : '✗ Missing',
    storageBucket: firebaseConfig.storageBucket ? '✓ Set' : '✗ Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✓ Set' : '✗ Missing',
    appId: firebaseConfig.appId ? '✓ Set' : '✗ Missing',
  });
} else {
  console.log('✅ Firebase configuration loaded successfully');
  console.log('📦 Project ID:', firebaseConfig.projectId);
}

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// CRITICAL: Wait for Firestore to go online before using it
let firestoreReady: Promise<void> | null = null;

if (typeof window !== 'undefined') {
  // Set auth persistence
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.warn('Failed to set auth persistence:', error);
  });
  
  // Force Firestore online and wait for it
  firestoreReady = enableNetwork(db)
    .then(() => {
      console.log('🌐 Firestore online mode enabled');
    })
    .catch((error) => {
      console.error('❌ Failed to enable Firestore network:', error);
    });
}

// Export a promise that resolves when Firestore is ready
export const waitForFirestore = () => {
  if (typeof window === 'undefined') return Promise.resolve();
  return firestoreReady || Promise.resolve();
};

// Configure Google provider
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleProvider };
