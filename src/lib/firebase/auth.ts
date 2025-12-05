import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebaseClient';
import { User } from '@/types';

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string): Promise<FirebaseUser> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user document in Firestore
  const userDoc: Partial<Omit<User, 'id'>> = {
    email: user.email!,
    subscription: 'free',
    streakDays: 0,
    totalWorkoutsCompleted: 0,
    xp: 0,
    badges: [],
    createdAt: new Date(),
  };

  if (user.displayName) {
    userDoc.displayName = user.displayName;
  }

  if (user.photoURL) {
    userDoc.photoURL = user.photoURL;
  }

  await setDoc(doc(db, 'users', user.uid), {
    ...userDoc,
    createdAt: serverTimestamp(),
  });

  return user;
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Sign in with Google using popup (no redirect!)
 */
export async function signInWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Check if user document exists, create if not
  const userDocRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    const newUserDoc: Partial<Omit<User, 'id'>> = {
      email: user.email!,
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      subscription: 'free',
      streakDays: 0,
      totalWorkoutsCompleted: 0,
      xp: 0,
      badges: [],
      createdAt: new Date(),
    };

    await setDoc(userDocRef, {
      ...newUserDoc,
      createdAt: serverTimestamp(),
    });
  }

  return user;
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Get current user
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  
  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();
  return {
    id: userDoc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    lastWorkoutDate: data.lastWorkoutDate?.toDate(),
  } as User;
}

/**
 * Check if user needs onboarding
 */
export async function needsOnboarding(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId);
  return !profile?.goal || !profile?.level || !profile?.currentProgramId;
}
