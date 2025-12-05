'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext.new';

/**
 * Clean auth guard hook using popup-based flow
 * - No redirect loops
 * - Single source of truth (AuthContext)
 * - Simple redirect logic
 */
export function useAuthGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    const isAuthPage = pathname === '/auth';

    // Redirect unauthenticated users to /auth
    if (!user && !isAuthPage) {
      router.replace('/auth');
      return;
    }

    // Redirect authenticated users away from /auth
    if (user && isAuthPage) {
      router.replace('/');
      return;
    }
  }, [user, loading, pathname, router]);

  return { user, loading };
}
