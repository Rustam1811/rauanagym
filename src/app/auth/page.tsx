'use client';

import { useEffect } from 'react';

/**
 * Auth landing page - redirects to phone login
 * This page exists to satisfy AuthGuardProvider redirects
 */
export default function AuthPage() {
  useEffect(() => {
    // Redirect to actual login page
    window.location.href = '/hero/phone-login';
  }, []);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-sm">Redirecting to login...</p>
      </div>
    </div>
  );
}
