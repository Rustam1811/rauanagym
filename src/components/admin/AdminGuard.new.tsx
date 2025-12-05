'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/hero/phone-login');
        return;
      }

      const phoneNumber = user.phoneNumber;
      if (phoneNumber === '+77777777777') {
        setIsAdmin(true);
        setLoading(false);
      } else {
        router.push('/hero/home');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
