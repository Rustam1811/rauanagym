'use client';

import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

/**
 * Legacy AuthGuard component - now only handles content visibility and admin checks
 * Redirects are handled by AuthGuardProvider at the root level
 */
export function AuthGuard({ children, requireAuth = true, requireAdmin = false }: AuthGuardProps) {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (requireAdmin && (userProfile as User & { role?: string })?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
