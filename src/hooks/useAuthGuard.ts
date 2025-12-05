'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

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

    // Public pages that don't require auth
    const publicPaths = ['/auth', '/hero/phone-login', '/hero/email-login', '/hero/welcome'];
    const isPublicPage = publicPaths.some(path => pathname.startsWith(path));

    // Redirect unauthenticated users to /auth (but not if already on public page)
    if (!user && !isPublicPage) {
      router.replace('/auth');
      return;
    }

    // Redirect authenticated users away from /auth to home
    if (user && pathname === '/auth') {
      router.replace('/hero/home');
      return;
    }
  }, [user, loading, pathname, router]);

  return { user, loading };
}
