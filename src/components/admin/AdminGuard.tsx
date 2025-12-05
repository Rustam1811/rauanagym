'use client';

import { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simple localStorage check
    const adminPhone = localStorage.getItem('admin-phone');
    
    if (adminPhone !== '7777777777') {
      router.push('/hero/phone-login');
      return;
    }
    
    // Use startTransition to avoid cascading render warnings
    startTransition(() => {
      setIsAdmin(true);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-hj-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-hj-textSoft font-medium">Проверка доступа...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
