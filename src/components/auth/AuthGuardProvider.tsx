'use client';

import { ReactNode } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';

interface AuthGuardProviderProps {
  children: ReactNode;
}

/**
 * Top-level auth guard provider component
 * Handles automatic redirects between /auth and protected routes
 * Shows loading state while checking authentication
 */
export function AuthGuardProvider({ children }: AuthGuardProviderProps) {
  const { loading } = useAuthGuard();

  // Show full-screen loader while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
