'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebaseClient';
import { User } from '@/types';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  refreshProfile: async () => {},
  isAdmin: false,
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin (phone number +77777777777)
  const isAdmin = user?.phoneNumber === '+77777777777';

  const fetchProfile = async (firebaseUser: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          id: userDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastWorkoutDate: data.lastWorkoutDate?.toDate(),
        } as User);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await fetchProfile(firebaseUser);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, refreshProfile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
